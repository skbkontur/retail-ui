import * as fs from 'fs';
import * as path from 'path';

import * as DEFAULT_SWATCH from '../lib/consts/default-swatch.js';
import { getColorsBase } from '../lib/get-colors-base.js';
import { getColors } from '../lib/get-colors.js';
import { camelCaseToKebabCase } from '../lib/utils/format-variable.js';
import { saveTokens } from './create-tokens-files.js';

const SNAPSHOTS_ROOT = path.join(import.meta.dirname, '..', '__snapshots__');
const TOKENS_DIR = path.join(SNAPSHOTS_ROOT, 'tokens');
const BASE_DIR = path.join(SNAPSHOTS_ROOT, 'tokens-base');

[TOKENS_DIR, BASE_DIR].forEach((dir) => {
  if (fs.existsSync(dir)) {
    fs.rmSync(dir, { recursive: true, force: true });
  }
  fs.mkdirSync(dir, { recursive: true });
});

for (const accentVariant of ['brand', 'gray']) {
  for (const brandColorKey in DEFAULT_SWATCH.brand) {
    if (accentVariant === 'brand' && (brandColorKey === 'red' || brandColorKey === 'orange')) {
      continue;
    }

    const brandFileName = camelCaseToKebabCase(brandColorKey);
    const snapshotFileName = `brand-${brandFileName}_accent-${accentVariant.toLowerCase()}`;

    const semanticTokens = {
      light: {
        hex: getColors({
          brand: brandColorKey,
          accent: accentVariant,
          theme: 'light',
          format: 'hex/rgba',
        }),
        oklch: getColors({
          brand: brandColorKey,
          accent: accentVariant,
          theme: 'light',
          format: 'oklch',
        }),
      },
      dark: {
        hex: getColors({
          brand: brandColorKey,
          accent: accentVariant,
          theme: 'dark',
          format: 'hex/rgba',
        }),
        oklch: getColors({
          brand: brandColorKey,
          accent: accentVariant,
          theme: 'dark',
          format: 'oklch',
        }),
      },
    };

    saveTokens({
      tokens: semanticTokens,
      colorBrand: brandFileName,
      colorAccent: accentVariant,
      fileOutputDir: TOKENS_DIR,
      fileFormat: 'json-snapshot',
      fileSingleOutputName: path.join(TOKENS_DIR, `${snapshotFileName}.json`),
    });

    const baseTokens = {
      hex: getColorsBase({ brand: brandColorKey, accent: accentVariant, format: 'hex/rgba' }),
      oklch: getColorsBase({ brand: brandColorKey, accent: accentVariant, format: 'oklch' }),
    };

    saveTokens({
      tokens: baseTokens,
      colorBrand: brandFileName,
      colorAccent: accentVariant,
      fileOutputDir: BASE_DIR,
      fileFormat: 'json-base-snapshot',
      fileSingleOutputName: path.join(BASE_DIR, `${snapshotFileName}.json`),
    });
  }
}
