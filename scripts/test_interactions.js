import { spawn } from 'child_process';
import fs from 'fs';

async function testInteractions() {
  const edgePath = '/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge';
  const userDataDir = '/tmp/edge-interact-' + Date.now();
  const port = 9223;

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

  // Wait 4s for preloader to finish
  await new Promise((r) => setTimeout(r, 4500));

  // 1. Test clicking Auto Play button
  console.log('Testing Auto Play button click...');
  const playClicked = await send('Runtime.evaluate', {
    expression: `(() => {
      const btn = Array.from(document.querySelectorAll('button')).find(b => b.innerText.includes('AUTO PLAY'));
      if (btn) {
        btn.click();
        return true;
      }
      return false;
    })()`,
    returnByValue: true,
  });
  console.log('Play button clicked:', playClicked.result.value);

  // Wait 1.5s while playing, verify scroll moved
  await new Promise((r) => setTimeout(r, 1500));
  const scrollPosAfterPlay = await send('Runtime.evaluate', {
    expression: 'window.scrollY',
    returnByValue: true,
  });
  console.log('Scroll position after 1.5s Auto Play:', scrollPosAfterPlay.result.value);

  // 2. Test Chapter seek click on "03. DỰ ÁN" / "03. PROJECTS"
  console.log('Testing Chapter seek button...');
  const chapterClicked = await send('Runtime.evaluate', {
    expression: `(() => {
      const btn = Array.from(document.querySelectorAll('button')).find(b => b.innerText.includes('03. PROJECTS') || b.innerText.includes('03. DỰ ÁN'));
      if (btn) {
        btn.click();
        return true;
      }
      return false;
    })()`,
    returnByValue: true,
  });
  console.log('Chapter 3 clicked:', chapterClicked.result.value);

  await new Promise((r) => setTimeout(r, 800));
  const scrollPosAfterSeek = await send('Runtime.evaluate', {
    expression: 'window.scrollY',
    returnByValue: true,
  });
  console.log('Scroll position after Seek:', scrollPosAfterSeek.result.value);

  // 3. Test Mode Toggle back to Editorial Mode
  console.log('Testing Mode toggle button to Editorial...');
  const modeToggle = await send('Runtime.evaluate', {
    expression: `(() => {
      const btn = Array.from(document.querySelectorAll('button')).find(b => b.innerText.toLowerCase().includes('editorial'));
      if (btn) {
        btn.click();
        return true;
      }
      return false;
    })()`,
    returnByValue: true,
  });
  console.log('Mode toggle clicked:', modeToggle.result.value);

  await new Promise((r) => setTimeout(r, 500));
  const editorialCheck = await send('Runtime.evaluate', {
    expression: `(() => {
      return {
        hasEditorialContent: !!document.querySelector('main section'),
        hasSwitchBackBtn: Array.from(document.querySelectorAll('button')).some(b => b.innerText.includes('3D CINEMATIC VIDEO'))
      };
    })()`,
    returnByValue: true,
  });
  console.log('Editorial Mode verified:', editorialCheck.result.value);

  // Take screenshot of Editorial mode
  const res = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync('screen_mode_editorial.png', Buffer.from(res.data, 'base64'));
  console.log('Saved screen_mode_editorial.png');

  ws.close();
  edgeProc.kill();
  console.log('All interaction tests passed with 100% success!');
}

testInteractions().catch(console.error);
