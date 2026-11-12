import { readFile, writeFile, mkdir, cp, readdir, rm } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

export const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

export function buildOptions(production = false) {
  return {
    absWorkingDir: root,
    entryPoints: ['src/main.jsx'],
    outdir: production ? 'dist/assets' : '.cache/dev/assets',
    entryNames: production ? 'app-[hash]' : 'app',
    bundle: true,
    minify: production,
    sourcemap: !production,
    metafile: true,
    target: ['es2020'],
    define: { 'process.env.NODE_ENV': JSON.stringify(production ? 'production' : 'development') },
    logLevel: 'info',
  };
}

export async function prepare({ clean = false, development = false } = {}) {
  const output = path.join(root, development ? '.cache/dev' : 'dist');
  await mkdir(output, { recursive: true });
  if (clean) {
    // Only remove previous generated asset files inside this project's dist/assets.
    const assets = path.join(output, 'assets');
    for (const entry of await readdir(assets, { withFileTypes: true }).catch(() => [])) {
      if (entry.isFile()) await rm(path.join(assets, entry.name));
    }
  }
  await cp(path.join(root, 'public'), output, { recursive: true });
}

export async function writeIndex(result, development = false) {
  const outputDirectory = development ? '.cache/dev' : 'dist';
  const entries = Object.entries(result.metafile.outputs);
  const script = entries.find(([, value]) => value.entryPoint)?.[0];
  const style = entries.find(([name]) => name.endsWith('.css'))?.[0];
  if (!script || !style) throw new Error('No se generaron los archivos JavaScript y CSS.');
  const assetUrl = file => '/' + path.relative(outputDirectory, file).split(path.sep).join('/');
  let html = await readFile(path.join(root, 'index.html'), 'utf8');
  html = html.replace('<script type="module" src="/src/main.jsx"></script>', `<link rel="stylesheet" href="${assetUrl(style)}" />\n    <script type="module" src="${assetUrl(script)}"></script>`);
  if (development) html = html.replace('</body>', '<script>new EventSource("/esbuild").addEventListener("change", () => location.reload());</script></body>');
  await writeFile(path.join(root, outputDirectory, 'index.html'), html, 'utf8');
}
