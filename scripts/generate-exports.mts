import { readFileSync, writeFileSync } from 'fs';
import { join, normalize, isAbsolute } from 'path';
import { argv, cwd } from 'process';
import { fileURLToPath } from 'url';

/**
 * Скрипт для генерации поля "exports" из поля "exports-to-generate" в package.json.
 *
 * Первым аргументом принимает путь до директории c файлом package.json, в который будет записано поле.
 *
 * По умолчанию в "exports" генерируется только одно стандартное вхождение, которое должно быть во всех пакетах, это "./package.json".
 *
 * Если в найденном package.json присутствует поле "exports-to-generate", то его значение будет добавлено к генерируемому.
 *
 * Использование "exports-to-generate" вместо "exports" позволяет сохранить работоспособность пакетов внутри монорепы.
 *
 * Если поле "exports" уже существует, то оно оставляется без изменений.
 * 
 * Например, такое поле в package.json:

  {
    "exports-to-generate": {
      ".": "./entry.js"
    }
  }

  превращается в такое поле "exports":

  {
    "exports": {
      "./package.json",
      ".": "./entry.js"
    }
  }

 */

export const generateExports = (packageJsonPath: string): void => {
  const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf-8'));

  const exports = packageJson['exports'];

  for (const entry in exports) {
    exports[entry] = exports[entry].replace(/\.tsx?$/, '.js');
  }

  packageJson.exports = {
    ...exports,
    './package.json': './package.json',
  };

  writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
};

const runningScriptPath = normalize(argv[1]);
const __filename = fileURLToPath(import.meta.url);
const pathFromArgs = argv[2];

// Запускаем генерацию, если текущий модуль был запущен как скрипт (например, `node generate-exports.mts`),
// а не загружен импортом (`import { generateExports } from './generate-exports.mts'`), например, в тестах.
if (runningScriptPath === __filename) {
  if (!pathFromArgs) {
    throw new Error('Missing package.json path as first argument.');
  }

  const packageJsonPath = isAbsolute(pathFromArgs) ? pathFromArgs : join(cwd(), pathFromArgs);
  generateExports(packageJsonPath);
}
