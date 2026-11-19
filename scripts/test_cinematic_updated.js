import { spawn } from 'child_process';
import fs from 'fs';

async function verifyCinematic() {
  const edgePath = '/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge';
  const userDataDir = '/tmp/edge-verify-' + Date.now();
  const port = 9224;

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

  // Scene 1: Prologue (0%)
  console.log('Capturing Scene 1...');
  await capture('screen_scene1_new.png');

  // Scene 2: Architecture Core (30%)
  console.log('Scrubbing to Scene 2 (30%)...');
  await send('Runtime.evaluate', {
    expression: `window.scrollTo({ top: (document.documentElement.scrollHeight - window.innerHeight) * 0.30, behavior: 'instant' });`,
  });
  await new Promise((r) => setTimeout(r, 800));
  await capture('screen_scene2_new.png');

  // Test expanding Telemetry in Scene 2
  console.log('Clicking to expand Architecture Telemetry in Scene 2...');
  await send('Runtime.evaluate', {
    expression: `(() => {
      const cards = Array.from(document.querySelectorAll('div')).filter(d => d.innerText.includes('PostgreSQL 3NF'));
      if (cards.length > 0) cards[cards.length - 1].click();
    })()`,
  });
  await new Promise((r) => setTimeout(r, 600));
  await capture('screen_scene2_expanded.png');

  // Scene 3: System Vault Projects (54%)
  console.log('Scrubbing to Scene 3 (54%)...');
  await send('Runtime.evaluate', {
    expression: `window.scrollTo({ top: (document.documentElement.scrollHeight - window.innerHeight) * 0.54, behavior: 'instant' });`,
  });
  await new Promise((r) => setTimeout(r, 800));
  await capture('screen_scene3_new.png');

  // Test clicking "Xem chi tiết" on NÉT in Scene 3
  console.log('Clicking "Xem chi tiết" project modal in Scene 3...');
  await send('Runtime.evaluate', {
    expression: `(() => {
      const btn = Array.from(document.querySelectorAll('button')).find(b => b.innerText.includes('Xem chi tiết') || b.innerText.includes('View Details'));
      if (btn) btn.click();
    })()`,
  });
  await new Promise((r) => setTimeout(r, 800));
  await capture('screen_scene3_modal.png');

  // Close modal
  await send('Runtime.evaluate', {
    expression: `(() => {
      const closeBtn = Array.from(document.querySelectorAll('button')).find(b => b.innerText.includes('Đóng') || b.innerText.includes('Close'));
      if (closeBtn) closeBtn.click();
    })()`,
  });
  await new Promise((r) => setTimeout(r, 400));

  // Scene 4: Hall of Honors (76%)
  console.log('Scrubbing to Scene 4 (76%)...');
  await send('Runtime.evaluate', {
    expression: `window.scrollTo({ top: (document.documentElement.scrollHeight - window.innerHeight) * 0.76, behavior: 'instant' });`,
  });
  await new Promise((r) => setTimeout(r, 800));
  await capture('screen_scene4_new.png');

  // Test clicking certificate to open Lightbox in Scene 4
  console.log('Clicking certificate in Scene 4 to open Lightbox...');
  await send('Runtime.evaluate', {
    expression: `(() => {
      const certCard = Array.from(document.querySelectorAll('div')).find(d => d.innerText.includes('Top 3 Student of Summer 2024'));
      if (certCard) certCard.click();
    })()`,
  });
  await new Promise((r) => setTimeout(r, 800));
  await capture('screen_scene4_lightbox.png');

  // Close lightbox
  await send('Runtime.evaluate', {
    expression: `(() => {
      const closeBtn = document.querySelector('div[class*="backdrop-blur-2xl"] button');
      if (closeBtn) closeBtn.click();
    })()`,
  });
  await new Promise((r) => setTimeout(r, 400));

  // Scene 5: Transmission (96%)
  console.log('Scrubbing to Scene 5 (96%)...');
  await send('Runtime.evaluate', {
    expression: `window.scrollTo({ top: (document.documentElement.scrollHeight - window.innerHeight) * 0.96, behavior: 'instant' });`,
  });
  await new Promise((r) => setTimeout(r, 800));
  await capture('screen_scene5_new.png');

  ws.close();
  edgeProc.kill();
  console.log('All verification snapshots captured successfully!');
}

verifyCinematic().catch(console.error);
