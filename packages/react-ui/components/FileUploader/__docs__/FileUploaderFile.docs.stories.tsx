import React from 'react';
import { CheckAIcon16Light } from '@skbkontur/icons/icons/CheckAIcon/CheckAIcon16Light';

import type { Meta, Story } from '../../../typings/stories';
import { FileUploaderFile } from '../FileUploaderFile';
import { FileUploader } from '../FileUploader';
import { createFile } from '../../../internal/FileUploaderControl/fileUtils';
import { ThemeContext } from '../../../lib/theming/ThemeContext';
import { ThemeFactory } from '../../../lib/theming/ThemeFactory';

export default {
  title: 'Input data/FileUploader/FileUploaderFile',
  component: FileUploaderFile,
  parameters: { creevey: { skip: true } },
} as Meta;

export const Example1: Story = () => {
  return (
    <FileUploader
      initialFiles={[createFile('example.txt')]}
      renderFile={(_file, _fileNode, props) => <FileUploaderFile {...props} />}
    />
  );
};
Example1.storyName = 'Базовый пример';

/**
 * Показом размера файла можно управлять с помощью пропа `showSize`.
 */
export const Example2: Story = () => {
  const initialFile = createFile('text.txt');
  return (
    <FileUploader
      initialFiles={[initialFile]}
      renderFile={(_file, _fileNode, props) => <FileUploaderFile {...props} showSize />}
    />
  );
};

Example2.storyName = 'Отображение размера файла';

/**
 * Цвет иконок по умолчанию можно поменять через `ThemeContext`.
 */
export const Example3: Story = () => {
  const initialFiles = [createFile('test.pdf')];

  return (
    <ThemeContext.Provider value={ThemeFactory.create({ fileUploaderFileTypePdfIconColor: 'blue' })}>
      <FileUploader initialFiles={initialFiles} />
    </ThemeContext.Provider>
  );
};

Example3.storyName = 'Кастомизация цвета иконки типа файла';

/**
 * Для кастомизации иконки типа файла можно использовать проп `renderFile`.
 */
export const Example4: Story = () => {
  return (
    <FileUploader
      initialFiles={[new File(['content'], 'test.pdf')]}
      renderFile={(_file, _fileNode, props) => (
        <FileUploaderFile {...props} fileTypeIcon={<CheckAIcon16Light color="red" />} />
      )}
    />
  );
};

Example4.storyName = 'Кастомизация иконки по умолчанию';

/**
 * Управлять показом подсказки с полным именем файла можно пропом `showFilenameHint`.
 */
export const Example5: Story = () => {
  const initialFiles = [createFile(`${'long'.repeat(15)}.txt`)];
  return (
    <FileUploader
      initialFiles={initialFiles}
      renderFile={(_file, _fileNode, props) => <FileUploaderFile {...props} showFilenameHint={false} />}
    />
  );
};

Example5.storyName = 'Отключение подсказки с полным именем файла';

export const Example6: Story = () => {
  const initialFiles = ['.pdf', '.xml', '.jpg', '.pptx', '.xls', '.txt', '.zip', '.foo', ''].map((ext) =>
    createFile(`example file${ext}`, 'content', ''),
  );
  return <FileUploader multiple size="medium" initialFiles={initialFiles} />;
};

Example6.storyName = 'Все иконки типа файла';

/**
 * Обновленное отображение плиткой с возможностью показа превью файла (используй проп `previewImg` и изображение в пропорции 9х12)
 */
export const Example7 = () => {
  const initialFiles = [createFile('test1.txt'), createFile('test2.txt')];
  return (
    <FileUploader
      multiple
      width={400}
      view="tile"
      initialFiles={initialFiles}
      renderFile={(_file, _fileNode, props) => (
        <FileUploaderFile {...props} previewImg="https://tech.skbkontur.ru/kontur-ui/images/previewImg.png" />
      )}
    />
  );
};

Example7.storyName = 'Кастомизация превью файла';
