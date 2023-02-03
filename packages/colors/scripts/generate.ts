import * as fs from 'fs';
import { KonturColors as inputColors, TKonturColor } from './../src/colors';

const generateLess = (inputColors: { [key in TKonturColor]: string }) => {
  const res: string[] = [];
  Object.keys(inputColors).map((colorName) => {
    const colorValue = inputColors[colorName as TKonturColor];
    res.push(`@${colorName}: ${colorValue};`);
  });
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  fs.writeFile('./colors.less', `${res.join('')}`, () => {});
};

const generateCssVar = (inputColors: { [key in TKonturColor]: string }) => {
  const res: string[] = [];
  Object.keys(inputColors).map((colorName) => {
    const colorValue = inputColors[colorName as TKonturColor];
    res.push(`--${colorName}: ${colorValue};`);
  });
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  fs.writeFile('./colors.css', `:root {${res.join('')}}`, () => {});
};

generateLess(inputColors);
generateCssVar(inputColors);
