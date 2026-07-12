const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

const dirs = process.argv.slice(2);
if (dirs.length === 0) {
  console.error("Usage: node scripts/compress-images.cjs <dir1> <dir2> ...");
  process.exit(1);
}

async function compress(dir) {
  const files = fs.readdirSync(dir).filter(f => /\.(jpe?g|png|webp)$/i.test(f));
  for (const file of files) {
    const input = path.join(dir, file);
    const ext = path.extname(file).toLowerCase();
    const base = path.basename(file, ext);
    const out = path.join(dir, `${base}.webp`);
    if (fs.existsSync(out)) {
      console.log(`${file}: already exists, skipping`);
      continue;
    }
    try {
      const img = sharp(input);
      const meta = await img.metadata();
      const width = Math.min(meta.width, 1600);
      await img
        .resize({ width, withoutEnlargement: true })
        .webp({ quality: 80, effort: 4 })
        .toFile(out);
      const oldSize = fs.statSync(input).size;
      const newSize = fs.statSync(out).size;
      console.log(`${file}: ${(oldSize / 1024).toFixed(0)}KB → ${(newSize / 1024).toFixed(0)}KB (${((1 - newSize / oldSize) * 100).toFixed(0)}% saved)`);
    } catch (err) {
      console.error(`${file}: SKIPPED — ${err.message}`);
    }
  }
}

(async () => {
  for (const dir of dirs) {
    console.log(`\nCompressing: ${dir}`);
    await compress(dir);
  }
})();
