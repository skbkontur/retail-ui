const fs = require('fs');
const path = require('path');

// Функция для поиска файла chunk-*.mjs
function findChunkFile() {
  const distPath = path.join(process.cwd(), '..', '..', 'node_modules', '@storybook', 'theming', 'dist');
  try {
    const files = fs.readdirSync(distPath);
    const chunkFiles = files.filter((file) => file.startsWith('chunk-') && file.endsWith('.mjs'));

    if (chunkFiles.length === 0) {
      throw new Error('Не найдено ни одного файла chunk-*.mjs');
    }

    if (chunkFiles.length > 1) {
      chunkFiles.forEach((file, index) => {
        console.log(`${index + 1}. ${file}`);
      });
      throw new Error('Найдено несколько файлов');
    }

    return path.join(distPath, chunkFiles[0]);
  } catch (error) {
    console.error('Ошибка при поиске файла:', error.message);
    process.exit(1);
  }
}

// Асинхронная версия с Promise
async function replaceStringInFile() {
  const filePath = findChunkFile();
  try {
    const content = await fs.promises.readFile(filePath, 'utf8');
    const updatedContent = content.replace(/Nunito Sans/g, 'Lab Grotesque');

    await fs.promises.writeFile(filePath, updatedContent, 'utf8');
    console.log('Замена выполнена успешно!');
  } catch (error) {
    console.error('Ошибка при обработке файла:', error.message);
  }
}

replaceStringInFile();
