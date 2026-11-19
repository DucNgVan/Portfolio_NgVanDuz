import { spawn } from 'child_process';
import fs from 'fs';

async function verifyInterleavedCinematic() {
  const edgePath = '/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge';
  const userDataDir = '/tmp/edge-interleaved-' + Date.now();
  const port = 9225;

  const edgeProc = spawn(edgePath, [
    '--headless=new',
    '--enable-webgl',
    '--use-gl=angle',
    `--remote-debugging-port=${port}`,
    `--user-data-dir=${userDataDir}`,
    '--window-size=1440,900',
    'http://localhost:5173',
  ]);

  let targetWs = null;
  for (let i = 0; i < 30; i++) {
    await new Promise((r) => setTimeout(r, 300));
    try {
      const res = await fetch(`http://127.0.0.1:${port}/json`);
      const data = await res.json();
      const pageTarget = data.find((t) => t.type === 'page');
      if (pageTarget?.webSocketDebuggerUrl) {
        targetWs = pageTarget.webSocketDebuggerUrl;
        break;
      }
    } catch (e) {}
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

  await new Promise((r) => { ws.onopen = r; });

  ws.onmessage = (event) => {
    const msg = JSON.parse(event.data);
    if (msg.id && callbacks.has(msg.id)) {
      const { resolve, reject } = callbacks.get(msg.id);
      callbacks.delete(msg.id);
      if (msg.error) reject(msg.error);
      else resolve(msg.result);
    }
  };

  await send('Runtime.enable');
  await send('Page.enable');

  console.log('Waiting for preloader (4.5s)...');
  await new Promise((r) => setTimeout(r, 4500));

  async function capture(filename) {
    const res = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(filename, Buffer.from(res.data, 'base64'));
    console.log(`Saved screenshot ${filename} (${Math.round(res.data.length * 0.75 / 1024)} KB)`);
  }

  // Scene 1: Prologue (0%) - UI Left, Model Right
  console.log('Capturing Scene 1...');
  await capture('screen_interleaved_s1.png');

  // Scene 2: Workstation Core (30%) - Model Left (Zoomed In), UI Right
  console.log('Scrubbing to Scene 2 (30%)...');
  await send('Runtime.evaluate', {
    expression: `window.scrollTo({ top: (document.documentElement.scrollHeight - window.innerHeight) * 0.30, behavior: 'instant' });`,
  });
  await new Promise((r) => setTimeout(r, 900));
  await capture('screen_interleaved_s2.png');

  // Scene 3: Projects Vault (54%) - UI Left, Model Right (Zoomed Out)
  console.log('Scrubbing to Scene 3 (54%)...');
  await send('Runtime.evaluate', {
    expression: `window.scrollTo({ top: (document.documentElement.scrollHeight - window.innerHeight) * 0.54, behavior: 'instant' });`,
  });
  await new Promise((r) => setTimeout(r, 900));
  await capture('screen_interleaved_s3.png');

  // Test opening Project Details Modal
  console.log('Opening project details modal...');
  await send('Runtime.evaluate', {
    expression: `(() => {
      const btn = Array.from(document.querySelectorAll('button')).find(b => b.innerText.includes('Details'));
      if (btn) btn.click();
    })()`,
  });
  await new Promise((r) => setTimeout(r, 800));
  await capture('screen_interleaved_s3_modal.png');

  // Close modal
  await send('Runtime.evaluate', {
    expression: `(() => {
      const btn = Array.from(document.querySelectorAll('button')).find(b => b.innerText.includes('Close'));
      if (btn) btn.click();
    })()`,
  });
  await new Promise((r) => setTimeout(r, 400));

  // Scene 4: Honors (76%) - Model Left (Medium Zoom), UI Right
  console.log('Scrubbing to Scene 4 (76%)...');
  await send('Runtime.evaluate', {
    expression: `window.scrollTo({ top: (document.documentElement.scrollHeight - window.innerHeight) * 0.76, behavior: 'instant' });`,
  });
  await new Promise((r) => setTimeout(r, 900));
  await capture('screen_interleaved_s4.png');

  // Scene 5: Contact (96%) - UI Left, Model Right
  console.log('Scrubbing to Scene 5 (96%)...');
  await send('Runtime.evaluate', {
    expression: `window.scrollTo({ top: (document.documentElement.scrollHeight - window.innerHeight) * 0.96, behavior: 'instant' });`,
  });
  await new Promise((r) => setTimeout(r, 900));
  await capture('screen_interleaved_s5.png');

  ws.close();
  edgeProc.kill();
  console.log('Verification completed!');
}

verifyInterleavedCinematic().catch(console.error);
