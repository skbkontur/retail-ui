import { converter, formatHex, clampChroma, type Rgb } from 'culori';

const toRgb = converter('rgb');

const LIGHTNESS_LEVELS = [97, 96, 92, 88, 84, 80, 76, 72, 68, 64, 60, 56, 52, 48, 44, 40, 36, 32, 28, 24, 20] as const;
const CHROMA_START = LIGHTNESS_LEVELS[0];
const DARKEST = LIGHTNESS_LEVELS[LIGHTNESS_LEVELS.length - 1];

const to8Bit = (value: number) => Math.round(Math.min(1, Math.max(0, value)) * 255);
const toRgba = ({ r, g, b }: Rgb, alpha: number) =>
  `rgba(${to8Bit(r)}, ${to8Bit(g)}, ${to8Bit(b)}, ${Number((to8Bit(alpha) / 255).toFixed(4))})`;

/**
 * Neutral palette tinted with `hue`.
 * Solid: OKLCH with exact lightness; chroma is linear between `chromaLight` (step 97) and `chromaDark` (step 20),
 * rounded to three decimals.
 * Black Alpha: matches the solid step on white. Alpha is the max of per-channel alphas against solid[20];
 * the base color under that alpha is solved per step. Alpha is stored in 8 bits (n / 255).
 */
export function getNeutralPalette(hue: number, chromaLight: number, chromaDark: number) {
  const solid = LIGHTNESS_LEVELS.map((level) => {
    const t = (CHROMA_START - level) / (CHROMA_START - DARKEST);
    const chroma = Number((chromaLight + t * (chromaDark - chromaLight)).toFixed(3));
    const color = clampChroma({ mode: 'oklch', l: level / 100, c: chroma, h: hue }, 'oklch');

    return { level, rgb: toRgb(color) as Rgb, hex: formatHex(color) };
  });

  const base = solid[solid.length - 1].rgb;

  const neutralSolid: Record<number, string> = { 100: '#ffffff', 0: '#000000' };
  const neutralAlpha: Record<number, string> = {};

  solid.forEach(({ level, rgb, hex }) => {
    neutralSolid[level] = hex;

    const channelAlphas = (['r', 'g', 'b'] as const).map((ch) => (1 - rgb[ch]) / (1 - base[ch]));
    const alpha = Math.min(1, Math.max(...channelAlphas));

    const color: Rgb =
      alpha >= 1
        ? base
        : {
            mode: 'rgb',
            r: (rgb.r - 1 + alpha) / alpha,
            g: (rgb.g - 1 + alpha) / alpha,
            b: (rgb.b - 1 + alpha) / alpha,
          };

    neutralAlpha[level] = toRgba(color, alpha);

    if (level === LIGHTNESS_LEVELS[0]) {
      neutralAlpha[100] = toRgba(color, 0);
    }
  });

  return { neutralSolid, neutralAlpha };
}
