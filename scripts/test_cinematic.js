import { spawn } from 'child_process';
import fs from 'fs';

async function run() {
  const edgePath = '/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge';
  const userDataDir = '/tmp/edge-cdp-' + Date.now();
  const port = 9222;

  console.log('Launching Edge headless...');
  const edgeProc = spawn(edgePath, [
    '--headless=new',
    '--enable-webgl',
    '--use-gl=angle',
    `--remote-debugging-port=${port}`,
    `--user-data-dir=${userDataDir}`,
    '--window-size=1440,900',
    'http://localhost:5173',
  ]);

  edgeProc.stderr.on('data', (d) => {
    // console.log('Edge err:', d.toString());
  });

  // Wait for remote debugging to be ready
  let targetWs = null;
  for (let i = 0; i < 30; i++) {
    await new Promise((r) => setTimeout(r, 300));
    try {
      const res = await fetch(`http://127.0.0.1:${port}/json`);
      const data = await res.json();
      const pageTarget = data.find((t) => t.type === 'page');
      if (pageTarget && pageTarget.webSocketDebuggerUrl) {
        targetWs = pageTarget.webSocketDebuggerUrl;
        break;
      }
    } catch (e) {}
  }

  if (!targetWs) {
    console.error('Could not connect to Edge DevTools target');
    edgeProc.kill();
    process.exit(1);
  }

  console.log('Connected to DevTools:', targetWs);
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

  await new Promise((resolve) => {
    ws.onopen = resolve;
  });

  ws.onmessage = (event) => {
    const msg = JSON.parse(event.data);
    if (msg.method === 'Runtime.consoleAPICalled') {
      const text = msg.params.args.map((a) => a.value || a.description).join(' ');
      console.log(`[Browser Console ${msg.params.type}]:`, text);
    } else if (msg.method === 'Runtime.exceptionThrown') {
      console.error('[Browser Uncaught Exception]:', msg.params.exceptionDetails.text, msg.params.exceptionDetails.exception?.description);
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

  console.log('Waiting for preloader and initial load (4.5s)...');
  await new Promise((r) => setTimeout(r, 4500));

  // Check state of DOM
  const evalResult = await send('Runtime.evaluate', {
    expression: `({
      title: document.title,
      bodyText: document.body.innerText.slice(0, 200),
      hasCanvas: !!document.querySelector('canvas'),
      scrollY: window.scrollY,
      scrollHeight: document.documentElement.scrollHeight
    })`,
    returnByValue: true,
  });
  console.log('Page State:', evalResult.result.value);

  // Take screenshot 1: Prologue
  async function capture(filename) {
    const res = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(filename, Buffer.from(res.data, 'base64'));
    console.log(`Saved screenshot ${filename} (${Math.round(res.data.length * 0.75 / 1024)} KB)`);
  }

  await capture('screen_cinematic_s1.png');

  // Scroll to Scene 2: Workstation Architecture (28%)
  console.log('Scrubbing to Scene 2 (28%)...');
  await send('Runtime.evaluate', {
    expression: `window.scrollTo({ top: (document.documentElement.scrollHeight - window.innerHeight) * 0.28, behavior: 'instant' });`,
  });
  await new Promise((r) => setTimeout(r, 1000));
  await capture('screen_cinematic_s2.png');

  // Scroll to Scene 3: System Vault Projects (52%)
  console.log('Scrubbing to Scene 3 (52%)...');
  await send('Runtime.evaluate', {
    expression: `window.scrollTo({ top: (document.documentElement.scrollHeight - window.innerHeight) * 0.52, behavior: 'instant' });`,
  });
  await new Promise((r) => setTimeout(r, 1000));
  await capture('screen_cinematic_s3.png');

  // Scroll to Scene 4: Hall of Honors (74%)
  console.log('Scrubbing to Scene 4 (74%)...');
  await send('Runtime.evaluate', {
    expression: `window.scrollTo({ top: (document.documentElement.scrollHeight - window.innerHeight) * 0.74, behavior: 'instant' });`,
  });
  await new Promise((r) => setTimeout(r, 1000));
  await capture('screen_cinematic_s4.png');

  // Scroll to Scene 5: Transmission (96%)
  console.log('Scrubbing to Scene 5 (96%)...');
  await send('Runtime.evaluate', {
    expression: `window.scrollTo({ top: (document.documentElement.scrollHeight - window.innerHeight) * 0.96, behavior: 'instant' });`,
  });
  await new Promise((r) => setTimeout(r, 1000));
  await capture('screen_cinematic_s5.png');

  ws.close();
  edgeProc.kill();
  console.log('Verification finished successfully!');
}

run().catch((err) => {
  console.error('Test error:', err);
  process.exit(1);
});
