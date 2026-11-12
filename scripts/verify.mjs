import { spawn } from 'node:child_process';
import { mkdir, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { root } from './config.mjs';

// Run against the local dev server: npm run dev, then npm run build -- --verify.
const origin = process.env.BORO_VERIFY_URL || 'http://127.0.0.1:5173';
const chrome = process.env.CHROME_PATH || 'C:/Program Files/Google/Chrome/Application/chrome.exe';
if (!existsSync(chrome)) throw new Error('Define CHROME_PATH para ejecutar la verificación de navegador.');
const directory = path.join(root, '.verification');
await mkdir(directory, { recursive: true });
const browser = spawn(chrome, [
  '--headless=new', '--no-first-run', '--no-default-browser-check', '--disable-background-networking',
  '--disable-extensions', '--disable-component-update', '--remote-debugging-pipe',
  `--user-data-dir=${path.join(directory, 'chrome-profile')}`, 'about:blank',
], { stdio: ['ignore', 'ignore', 'pipe', 'pipe', 'pipe'], windowsHide: true });

let nextId = 0;
let buffer = '';
const pending = new Map();
const errors = [];
const warnings = [];
let session;
browser.stderr.on('data', () => {});
browser.on('error', error => { for (const { reject } of pending.values()) reject(error); });
browser.stdio[4].on('data', data => {
  buffer += data.toString();
  let end;
  while ((end = buffer.indexOf('\0')) >= 0) {
    const line = buffer.slice(0, end); buffer = buffer.slice(end + 1);
    if (!line) continue;
    const message = JSON.parse(line);
    if (message.id && pending.has(message.id)) {
      const request = pending.get(message.id); pending.delete(message.id); clearTimeout(request.timeout);
      if (message.error) request.reject(new Error(JSON.stringify(message.error))); else request.resolve(message.result);
    }
    if (message.method === 'Runtime.exceptionThrown') errors.push(message.params.exceptionDetails.text + ': ' + (message.params.exceptionDetails.exception?.description || ''));
    if (message.method === 'Log.entryAdded' && message.params.entry.level === 'error') errors.push(message.params.entry.text);
  }
});

function send(method, params = {}, page = true) {
  const id = ++nextId;
  return new Promise((resolve, reject) => {
    const timeout = setTimeout(() => { pending.delete(id); reject(new Error(`CDP timeout: ${method}`)); }, 20000);
    pending.set(id, { resolve, reject, timeout });
    browser.stdio[3].write(JSON.stringify({ id, method, params, ...(page && session ? { sessionId: session } : {}) }) + '\0');
  });
}

async function evaluate(expression) {
  const response = await send('Runtime.evaluate', { expression, awaitPromise: true, returnByValue: true, userGesture: true });
  if (response.exceptionDetails) throw new Error(JSON.stringify(response.exceptionDetails));
  return response.result?.value;
}
const check = (condition, message) => { if (!condition) throw new Error(message); console.log(`OK: ${message}`); };

try {
  const response = await fetch(origin);
  check(response.ok, 'El servidor local responde HTTP 200.');
  const target = await send('Target.createTarget', { url: 'about:blank' }, false);
  const attached = await send('Target.attachToTarget', { targetId: target.targetId, flatten: true }, false);
  session = attached.sessionId;
  await send('Page.enable'); await send('Runtime.enable'); await send('Log.enable');
  await send('Emulation.setEmulatedMedia', { features: [{ name: 'prefers-reduced-motion', value: 'reduce' }] });
  const results = [];
  for (const width of [1440, 1024, 768, 390, 320]) {
    await send('Emulation.setDeviceMetricsOverride', { width, height: 1000, deviceScaleFactor: 1, mobile: width < 681 });
    await send('Page.navigate', { url: origin });
    await evaluate(`new Promise((resolve, reject) => { const started = Date.now(); const timer = setInterval(() => { if (document.querySelector('h1')) { clearInterval(timer); resolve(true); } else if (Date.now() - started > 10000) { clearInterval(timer); reject('React no montó'); } }, 50); })`);
    await evaluate(`Promise.all([...document.images].map(im => { im.loading = 'eager'; return im.complete ? Promise.resolve() : new Promise(r => { im.onload = r; im.onerror = r; }); }))`);
    const layout = await evaluate(`({ width: innerWidth, document: document.documentElement.scrollWidth, title: document.querySelector('h1').innerText, images: [...document.images].filter(im => !im.complete || !im.naturalWidth).map(im => im.src), footer: document.querySelector('footer').innerText, overflow: [...document.querySelectorAll('body *')].filter(el => el.getClientRects().length && el.getBoundingClientRect().right > innerWidth + 2).slice(0,8).map(el => ({tag: el.tagName, class: el.className})) })`);
    check(layout.document <= width + 1, `Sin desbordamiento horizontal a ${width}px: ${JSON.stringify(layout.overflow)}.`);
    check(!layout.images.length, `Todas las imágenes cargan a ${width}px.`);
    check(layout.title.includes('Menos ruido.'), `React muestra el contenido a ${width}px.`);
    check(layout.footer.includes('Manuela Vargas Granobles'), `Autoría de Manuela visible a ${width}px.`);
    if (width === 1440 || width === 390) {
      const shot = await send('Page.captureScreenshot', { format: 'png', captureBeyondViewport: true });
      await writeFile(path.join(directory, `home-${width}.png`), Buffer.from(shot.data, 'base64'));
    }
    if (width < 681) {
      check(await evaluate(`document.querySelector('.menu-toggle').getAttribute('aria-expanded') === 'false'`), 'El menú móvil inicia cerrado.');
      await evaluate(`document.querySelector('.menu-toggle').click()`);
      check(await evaluate(`getComputedStyle(document.querySelector('.navigation')).display !== 'none'`), 'El menú móvil abre.');
      await evaluate(`document.querySelector('.navigation a[href="#servicios"]').click()`);
      check(await evaluate(`document.querySelector('.menu-toggle').getAttribute('aria-expanded') === 'false' && location.hash === '#servicios'`), 'La navegación móvil funciona y cierra el menú.');
    }
    for (const id of ['conexion', 'comunicacion', 'escucha']) {
      await evaluate(`document.getElementById('trigger-${id}').click()`);
      check(await evaluate(`document.getElementById('trigger-${id}').getAttribute('aria-expanded') === 'true' && !document.getElementById('panel-${id}').hidden`), `El servicio ${id} se despliega a ${width}px.`);
    }
    await evaluate(`document.querySelector('.project-expand').click()`);
    check(await evaluate(`!document.getElementById('project-details').hidden`), 'El detalle del proyecto abre.');
    await evaluate(`document.querySelector('.footer-bottom button').click()`);
    check(await evaluate(`document.querySelector('dialog').open`), 'El diálogo de créditos abre.');
    await evaluate(`document.querySelector('.credits-heading button').click()`);
    check(await evaluate(`!document.querySelector('dialog')`), 'El diálogo de créditos cierra.');
    results.push({ width, horizontalOverflow: false, imagesLoaded: true, interactions: 'passed' });
  }
  const destinations = await evaluate(`({ phone: document.querySelector('a[href^="tel:"]').href, whatsapp: [...document.querySelectorAll('a')].filter(a => a.href.startsWith('https://wa.me/')).map(a => a.href), instagram: [...document.querySelectorAll('a')].filter(a => a.href.includes('instagram.com')).map(a => a.href), brokenAnchors: [...document.querySelectorAll('a[href^="#"]')].filter(a => !document.getElementById(a.hash.slice(1))).map(a => a.hash) })`);
  check(destinations.phone === 'tel:+573052876627', 'El teléfono usa el número correcto.');
  check(destinations.whatsapp.length >= 2 && destinations.whatsapp.every(url => url.includes('/573052876627')), 'Los enlaces de WhatsApp usan el número correcto.');
  check(destinations.instagram.every(url => url === 'https://www.instagram.com/manuelavargas4/'), 'Los enlaces de Instagram usan el perfil correcto.');
  check(!destinations.brokenAnchors.length, 'Todos los enlaces internos tienen destino.');
  const pdf = await fetch(`${origin}/documents/boro-presentacion.pdf`);
  check(pdf.ok && Buffer.from(await pdf.arrayBuffer()).subarray(0,4).toString() === '%PDF', 'La presentación PDF se descarga correctamente.');
  check(!errors.length, `Sin errores JavaScript ni recursos fallidos: ${errors.join('; ')}`);
  await writeFile(path.join(directory, 'report.json'), JSON.stringify({ results, destinations, errors, warnings }, null, 2));
  console.log(`Verificación completada. Capturas y reporte: ${directory}`);
} finally {
  for (const request of pending.values()) clearTimeout(request.timeout);
  await send('Browser.close', {}, false).catch(() => browser.kill());
}
