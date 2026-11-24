import { spawn } from 'child_process';
import fs from 'fs';

async function runResponsiveVerification() {
  console.log('1. Starting vite server on port 5176...');
  const viteProc = spawn('npx', ['vite', '--port', '5176'], { stdio: 'pipe' });

  // Give server 2.5 seconds to bind
  await new Promise((r) => setTimeout(r, 2500));

  const edgePath = '/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge';
  const userDataDir = '/tmp/edge-resp-' + Date.now();
  const cdpPort = 9224;

  console.log('2. Launching headless browser...');
  const edgeProc = spawn(edgePath, [
    '--headless=new',
    '--enable-webgl',
    '--use-gl=angle',
    '--ignore-certificate-errors',
    '--allow-insecure-localhost',
    `--remote-debugging-port=${cdpPort}`,
    `--user-data-dir=${userDataDir}`,
    'https://localhost:5176',
  ]);

  let targetWs = null;
  for (let i = 0; i < 30; i++) {
    await new Promise((r) => setTimeout(r, 300));
    try {
      const res = await fetch(`http://127.0.0.1:${cdpPort}/json`);
      const data = await res.json();
      const pageTarget = data.find((t) => t.type === 'page');
      if (pageTarget?.webSocketDebuggerUrl) {
        targetWs = pageTarget.webSocketDebuggerUrl;
        break;
      }
    } catch (e) {}
  }

  if (!targetWs) {
    console.error('Failed to connect to DevTools');
    edgeProc.kill();
    previewProc.kill();
    process.exit(1);
  }

  const ws = new WebSocket(targetWs);
  let idCounter = 1;
  const callbacks = new Map();

  function send(method, params = {}) {
    return new Promise((resolve, reject) => {
      const id = idCounter++;
      callbacks.set(id, { resolve, reject });
      ws.send(JSON.stringify({ id, method, params }));
    });
  }

  await new Promise((resolve) => { ws.onopen = resolve; });

  const consoleLogs = [];
  ws.onmessage = (event) => {
    const msg = JSON.parse(event.data);
    if (msg.method === 'Runtime.consoleAPICalled') {
      const text = msg.params.args.map((a) => a.value || a.description).join(' ');
      consoleLogs.push({ type: msg.params.type, text });
      console.log(`[Browser Console ${msg.params.type}]:`, text);
    }
    if (msg.id && callbacks.has(msg.id)) {
      const { resolve, reject } = callbacks.get(msg.id);
      callbacks.delete(msg.id);
      if (msg.error) reject(msg.error);
      else resolve(msg.result);
    }
  };

  await send('Runtime.enable');
  await send('Page.enable');

  const viewports = [
    { name: 'mobile_390x844', width: 390, height: 844, isMobile: true },
    { name: 'tablet_820x1180', width: 820, height: 1180, isMobile: true },
    { name: 'laptop_1280x800', width: 1280, height: 800, isMobile: false },
    { name: 'desktop_1440x900', width: 1440, height: 900, isMobile: false },
  ];

  mkdirIfNotExists('/tmp/portfolio-screens');

  for (const vp of viewports) {
    console.log(`\nTesting viewport: ${vp.name} (${vp.width}x${vp.height})...`);
    await send('Emulation.setDeviceMetricsOverride', {
      width: vp.width,
      height: vp.height,
      deviceScaleFactor: 1,
      mobile: vp.isMobile,
    });

    await send('Page.navigate', { url: 'https://localhost:5176' });
    // Wait for preloader to complete and fade out completely
    await new Promise((r) => setTimeout(r, 4200));

    const evalResult = await send('Runtime.evaluate', {
      expression: `({
        title: document.title,
        hasCanvas: !!document.querySelector('canvas'),
        isCinematicView: !!document.querySelector('nav'),
        bodyTextSnippet: document.body.innerText.slice(0, 150)
      })`,
      returnByValue: true
    });
    console.log(`Result for ${vp.name}:`, evalResult.result.value);

    // Capture screenshot
    const screenshot = await send('Page.captureScreenshot', { format: 'png' });
    const filePath = `/tmp/portfolio-screens/${vp.name}.png`;
    fs.writeFileSync(filePath, Buffer.from(screenshot.data, 'base64'));
    console.log(`Saved screenshot: ${filePath}`);
  }

  console.log('\n--- VERIFICATION COMPLETED ---');
  edgeProc.kill();
  viteProc.kill();
  process.exit(0);
}

function mkdirIfNotExists(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

runResponsiveVerification().catch((err) => {
  console.error('Test error:', err);
  process.exit(1);
});
