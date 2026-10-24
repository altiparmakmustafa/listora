/* eslint-disable @typescript-eslint/no-require-imports */
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

async function main() {
  const svgPath = path.join(__dirname, '../src/app/icon.svg');
  const svgBuffer = fs.readFileSync(svgPath);

  const publicDir = path.join(__dirname, '../public');
  const appDir = path.join(__dirname, '../src/app');

  const sizes = [16, 32, 48, 64, 180, 192, 512];
  for (const s of sizes) {
    const outPng = path.join(publicDir, `icon-${s}.png`);
    await sharp(svgBuffer).resize(s, s).png().toFile(outPng);
  }

  // Also create apple-touch-icon.png in public and apple-icon.png in src/app
  await sharp(svgBuffer).resize(180, 180).png().toFile(path.join(publicDir, 'apple-touch-icon.png'));
  await sharp(svgBuffer).resize(180, 180).png().toFile(path.join(appDir, 'apple-icon.png'));

  console.log('PNG files generated successfully.');

  // Now run python script to build multi-size .ico from 16, 32, 48 PNGs
  const pythonScript = `
from PIL import Image
import os

sizes = [(16, 16), (32, 32), (48, 48)]
img = Image.open('public/icon-512.png')

img.save('public/favicon.ico', format='ICO', sizes=sizes)
img.save('src/app/favicon.ico', format='ICO', sizes=sizes)
print('favicon.ico successfully generated for public/ and src/app/')
`;
  fs.writeFileSync(path.join(__dirname, 'build-ico.py'), pythonScript);
  execSync('python3 scripts/build-ico.py', { stdio: 'inherit', cwd: path.join(__dirname, '..') });
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
