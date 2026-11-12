import { context } from 'esbuild';
import { root, prepare, buildOptions, writeIndex } from './config.mjs';

await prepare({ development: true });
const ctx = await context({
  ...buildOptions(),
  plugins: [{ name: 'html', setup(build) { build.onEnd(async result => { if (!result.errors.length) await writeIndex(result, true); }); } }],
});
await ctx.watch();
const server = await ctx.serve({ servedir: `${root}/.cache/dev`, host: '127.0.0.1', port: Number(process.env.PORT || 5173) });
console.log(`\nBORÓ — http://127.0.0.1:${server.port}\n`);
for (const signal of ['SIGINT', 'SIGTERM']) process.on(signal, async () => { await ctx.dispose(); process.exit(0); });
