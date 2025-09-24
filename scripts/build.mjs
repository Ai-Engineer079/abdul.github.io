import fs from 'fs/promises';
import path from 'path';
import { minify as minifyCSS } from 'csso';
import { minify as minifyHTML } from 'html-minifier-terser';
import esbuild from 'esbuild';

const root = process.cwd();
const dist = path.join(root, 'dist');

async function ensureDir(p){ await fs.mkdir(p, { recursive: true }); }

async function copyDir(src, dest){
  await ensureDir(dest);
  const entries = await fs.readdir(src, { withFileTypes: true });
  for (const e of entries){
    const s = path.join(src, e.name);
    const d = path.join(dest, e.name);
    if (e.isDirectory()) await copyDir(s, d);
    else await fs.copyFile(s, d);
  }
}

async function buildCSS(){
  const cssPath = path.join(root, 'styles.css');
  const cssOut = path.join(dist, 'styles.min.css');
  const css = await fs.readFile(cssPath, 'utf8');
  const { css: min } = minifyCSS(css, { restructure: true, comments: false });
  await fs.writeFile(cssOut, min);
}

async function buildJS(){
  const entry = path.join(root, 'main.js');
  const out = path.join(dist, 'main.min.js');
  await esbuild.build({
    entryPoints: [entry],
    outfile: out,
    minify: true,
    bundle: false,
    format: 'iife',
    target: ['es2018']
  });
}

async function copyConfig(){
  await fs.copyFile(path.join(root, 'site.config.js'), path.join(dist, 'site.config.js'));
}

async function processHTML(){
  const htmlPath = path.join(root, 'index.html');
  let html = await fs.readFile(htmlPath, 'utf8');
  // Point to minified assets and keep defer
  html = html
    .replace(/<link[^>]*href=\"styles\.css\"[^>]*>/, '<link rel="stylesheet" href="styles.min.css" />')
    .replace(/<script[^>]*src=\"site\.config\.js\"[^>]*><\/script>/, '<script src="site.config.js" defer></script>')
    .replace(/<script[^>]*src=\"main\.js\"[^>]*><\/script>/, '<script src="main.min.js" defer></script>');
  const min = await minifyHTML(html, {
    collapseWhitespace: true,
    removeComments: true,
    minifyCSS: true,
    minifyJS: true
  });
  await fs.writeFile(path.join(dist, 'index.html'), min);
}

async function main(){
  await fs.rm(dist, { recursive: true, force: true });
  await ensureDir(dist);
  // Copy assets unchanged (already optimized via separate script)
  await copyDir(path.join(root, 'assets'), path.join(dist, 'assets'));
  await buildCSS();
  await buildJS();
  await copyConfig();
  await processHTML();
  console.log('Built to dist/');
}

main().catch((e) => { console.error(e); process.exit(1); });

