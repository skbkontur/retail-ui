import { URL, fileURLToPath } from 'url';
import { readdirSync } from 'fs';
import { resolve, sep, join } from 'path';

import { copySync } from 'fs-extra';

const src = fileURLToPath(new URL('.creevey/images/Button/', import.meta.url));
const dst = fileURLToPath(new URL('.hermione/images2/Button', import.meta.url));
const browsers = [
  'chrome',
  'chrome8px',
  'chromeDark',
  'chromeFlat8px',
  'firefox',
  'firefox8px',
  'firefoxDark',
  'firefoxFlat8px',
  'ie11',
  'ie118px',
  'ie11Dark',
  'ie11Flat8px',
  'chromeMobile',
];

async function* getFiles(dir) {
  const dirents = readdirSync(dir, { withFileTypes: true });
  for (const dirent of dirents) {
    const res = resolve(dir, dirent.name);
    if (dirent.isDirectory()) {
      yield* getFiles(res);
    } else {
      yield res;
    }
  }
}

for await (const f of getFiles(src)) {
  const dirs = f.replace(src, '').split(sep);
  let [filename, ext] = dirs.pop().split('.');
  if (browsers.includes(filename)) {
    dirs.push(filename);
    filename = '$static';
  }
  const newPath = join(dst, dirs.join(sep), filename) + '.' + ext;
  console.log(f.replace(src, ''), newPath.replace(dst, ''));
  copySync(f, newPath, { overwrite: true });
}
