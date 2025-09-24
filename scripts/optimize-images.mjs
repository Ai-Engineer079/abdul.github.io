import fs from 'fs/promises';
import path from 'path';
import sharp from 'sharp';

const exts = new Set(['.jpg', '.jpeg', '.png']);
const roots = [
  'assets/images',
  'assets/certificates'
];

async function* walk(dir){
  try {
    const entries = await fs.readdir(dir, { withFileTypes: true });
    for (const e of entries){
      const p = path.join(dir, e.name);
      if (e.isDirectory()) yield* walk(p);
      else yield p;
    }
  } catch {}
}

async function convertOne(file){
  const ext = path.extname(file).toLowerCase();
  if (!exts.has(ext)) return;
  const base = file.slice(0, -ext.length);
  const webp = `${base}.webp`;
  const avif = `${base}.avif`;
  try {
    const input = sharp(file, { failOnError: false });
    const meta = await input.metadata();
    const pipeline = meta.width && meta.width > 1600 ? input.resize(1600) : input.clone();
    // WebP
    await pipeline.clone().webp({ quality: 82, effort: 4 }).toFile(webp);
    // AVIF
    await pipeline.clone().avif({ quality: 50, effort: 4 }).toFile(avif);
    console.log(`Optimized: ${path.basename(file)} -> .webp/.avif`);
  } catch (err){
    console.warn(`Skip ${file}:`, err?.message || err);
  }
}

async function main(){
  for (const r of roots){
    for await (const f of walk(r)){
      await convertOne(f);
    }
  }
}

main();

