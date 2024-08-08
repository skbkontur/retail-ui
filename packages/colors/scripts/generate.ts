import * as fs from 'fs';
import { KonturColors as inputColors, TKonturColor } from './../src/colors';

const camelCaseToDashed = (input: string) =>
  input
    .replace(/[A-Z]/g, (m: string) => '-' + m.toLowerCase())
    .replace(/\d/, (m) => `-${m}`)
    .replace('f-f-f', 'fff');

const generateLess = (inputColors: { [key in TKonturColor]: string }) => {
  const res: string[] = [];
  Object.keys(inputColors).map((colorName) => {
    const colorValue = inputColors[colorName as TKonturColor];
    res.push(`@${camelCaseToDashed(colorName)}: ${colorValue};`);
  });
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  fs.writeFile('./colors.less', `${res.join('')}`, () => {});
};

const generateCssVar = (inputColors: { [key in TKonturColor]: string }) => {
  const res: string[] = [];
  Object.keys(inputColors).map((colorName) => {
    const colorValue = inputColors[colorName as TKonturColor];
    res.push(`--kontur-${camelCaseToDashed(colorName)}: ${colorValue};`);
  });
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  fs.writeFile('./colors.css', `:root {${res.join('')}}`, () => {});
};

const generateScss = (inputColors: { [key in TKonturColor]: string }) => {
  const res: string[] = [];
  Object.keys(inputColors).map((colorName) => {
    const colorValue = inputColors[colorName as TKonturColor];
    res.push(`$${camelCaseToDashed(colorName)}: ${colorValue};`);
  });
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  fs.writeFile('./colors.scss', `${res.join('')}`, () => {});
};

[generateLess, generateCssVar, generateScss].forEach((callBack) => {
  callBack(inputColors);
});
