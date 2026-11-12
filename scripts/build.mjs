import { build } from 'esbuild';
import { prepare, buildOptions, writeIndex } from './config.mjs';

await prepare({ clean: true });
const result = await build(buildOptions(true));
await writeIndex(result);
console.log('Landing de BORÓ compilada en dist/.');
if (process.argv.includes('--verify')) await import('./verify.mjs');
