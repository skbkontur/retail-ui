import { IconCheckALight16 } from '@skbkontur/icons/IconCheckALight16';
import React from 'react';

import { ThemeContext } from '../../../lib/theming/ThemeContext.js';
import { ThemeFactory } from '../../../lib/theming/ThemeFactory.js';
import type { Meta, Story } from '../../../typings/stories.js';
import { FileUploader } from '../FileUploader.js';
import { FileUploaderFile } from '../FileUploaderFile.js';
import { createFile } from '../fileUtils.js';

const meta: Meta = {
  title: 'Input data/FileUploader',
  component: FileUploaderFile,
  parameters: { creevey: { skip: true } },
};

export default meta;

export const ExampleFileBasic: Story = () => {
  return <FileUploader initialFiles={[createFile('example.txt')]} />;
};
ExampleFileBasic.storyName = 'Базовый пример';

/** Проп `showSize` отображает размер файла. */
export const ExampleShowSize: Story = () => {
  const initialFile = createFile('text.txt');
  return <FileUploader initialFiles={[initialFile]} renderFile={(props) => <FileUploaderFile {...props} showSize />} />;
};
ExampleShowSize.storyName = 'Отображение размера файла';

/** Проп `showFilenameHint` отображает подсказку с полным именем файла, если оно было обрезано.
 */
export const ExampleShowFilenameHint: Story = () => {
  const initialFiles = [createFile(`${'long'.repeat(15)}.txt`)];
  return (
    <FileUploader
      initialFiles={initialFiles}
      renderFile={(props) => <FileUploaderFile {...props} showFilenameHint={false} />}
    />
  );
};
ExampleShowFilenameHint.storyName = 'Подсказка с полным именем';

/** Проп `fileTypeIcon` позволяет заменить стандартную иконку типа файла. */
export const ExampleFileTypeIcon: Story = () => {
  return (
    <FileUploader
      initialFiles={[new File(['content'], 'test.pdf')]}
      renderFile={(props) => <FileUploaderFile {...props} fileTypeIcon={<IconCheckALight16 color="red" />} />}
    />
  );
};
ExampleFileTypeIcon.storyName = 'Иконка типа файла';

/** Стандартные иконки для каждого типа файла. */
export const ExampleFileTypeIconsOverview: Story = () => {
  const initialFiles = ['.pdf', '.xml', '.jpg', '.pptx', '.xls', '.txt', '.zip', '.foo', ''].map((ext) =>
    createFile(`example file${ext}`, 'content', ''),
  );
  return <FileUploader multiple size="medium" initialFiles={initialFiles} />;
};
ExampleFileTypeIconsOverview.storyName = 'Все виды иконок типов файлов';

/** Проп `previewImg` позволяет задать превью в плиточном виде (соотношение сторон как в гайде). */
export const ExamplePreviewImg: Story = () => {
  const initialFiles = [createFile('test1.txt'), createFile('test2.txt')];
  return (
    <FileUploader
      multiple
      width={400}
      view="tile"
      initialFiles={initialFiles}
      renderFile={(props) => (
        <FileUploaderFile {...props} previewImg="https://tech.skbkontur.ru/kontur-ui/images/previewImg.png" />
      )}
    />
  );
};
ExamplePreviewImg.storyName = 'Превью в плиточном виде';

/** Переменные темы `fileUploaderFileType(FileType)IconColor` управляют цветом иконки типа файла (пример на PDF). */
export const ExampleCustomizationFileTypeIconColor: Story = () => {
  const initialFiles = [createFile('test.pdf')];

  return (
    <ThemeContext.Provider value={ThemeFactory.create({ fileUploaderFileTypePdfIconColor: 'blue' })}>
      <FileUploader initialFiles={initialFiles} />
    </ThemeContext.Provider>
  );
};
ExampleCustomizationFileTypeIconColor.storyName = 'Кастомизация цвета иконки типа файла';
