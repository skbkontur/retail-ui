import {
  Button,
  FileUploader,
  FileUploaderFile,
  Gapped,
  ThemeContext,
  ThemeFactory,
  Toggle,
} from '@skbkontur/react-ui';
import React from 'react';

import type { Meta, Story } from '../../../typings/stories.js';
import { type FileUploaderAttachedFile, FileUploaderFileStatus, createFile } from '../fileUtils.js';

const meta: Meta = {
  title: 'Input data/FileUploader/FileUploader',
  component: FileUploader,
  parameters: { creevey: { skip: true } },
};

export default meta;

export const ExampleBasic: Story = () => {
  return <FileUploader />;
};
ExampleBasic.storyName = 'Базовый пример';

/** Проп `size` задаёт размер контрола. По умолчанию `"small"`. */
export const ExampleSize: Story = () => {
  return (
    <Gapped vertical gap={24}>
      <FileUploader size="small" />
      <FileUploader size="medium" />
      <FileUploader size="large" />
    </Gapped>
  );
};
ExampleSize.storyName = 'Размер';

/** Проп `width` задаёт ширину контрола. */
export const ExampleWidth: Story = () => {
  return <FileUploader width={400} />;
};
ExampleWidth.storyName = 'Ширина';

/** Проп `multiple` включает мультивыбор, который позволяет выбрать несколько файлов за одно действие и отобразить список вложений. */
export const ExampleMultiple: Story = () => {
  return <FileUploader multiple />;
};
ExampleMultiple.storyName = 'Мультивыбор';

/** Проп `view` включает плиточный вид. По умолчанию `"list"`. */
export const ExampleViewTile: Story = () => {
  const initialFiles = [createFile('test1.txt'), createFile('test2.txt')];
  return <FileUploader multiple view="tile" initialFiles={initialFiles} />;
};
ExampleViewTile.storyName = 'Плиточный вид';

/** Проп `uploadButtonPosition` задаёт расположение кнопки загрузки. По умолчанию `"start"`. */
export const ExampleUploadButtonPosition: Story = () => {
  const initialFiles = [createFile('test1.txt'), createFile('test2.txt')];
  return <FileUploader multiple initialFiles={initialFiles} uploadButtonPosition="end" />;
};
ExampleUploadButtonPosition.storyName = 'Расположение кнопки загрузки';

/** Проп `uploaderText` задаёт текст на кнопке выбора. По умолчанию `"Выберите файл"`. */
export const ExampleUploaderText: Story = () => {
  return <FileUploader uploaderText="Добавить файл" />;
};
ExampleUploaderText.storyName = 'Текст кнопки выбора';

/** `initialFiles` — файлы, которые будут показаны при первом рендере компонента, в одиночном режиме используется только первый файл. */
export const ExampleInitialFiles: Story = () => {
  const initialFiles = [createFile('test1.txt'), createFile('test2.txt')];
  return <FileUploader multiple initialFiles={initialFiles} />;
};
ExampleInitialFiles.storyName = 'Начальные файлы';

/** Проп `accept` ограничивает типы файлов для загрузки. Принимает значения HTML-атрибута [accept](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/accept). */
export const ExampleAccept: Story = () => {
  return <FileUploader multiple accept="image/*" />;
};
ExampleAccept.storyName = 'Ограничение типов файлов';

/** Проп `validateBeforeUpload` задаёт сообщения валидации файлов перед отправкой. */
export const ExampleValidationList: Story = () => {
  return (
    <FileUploader
      uploaderText="Попробуйте выбрать файл"
      validateBeforeUpload={({ originalFile }) => {
        return Promise.resolve(`У файла ${originalFile.name} неверный формат`);
      }}
    />
  );
};
ExampleValidationList.storyName = 'Валидация файлов перед отправкой';

/** Проп `withValidationTooltip` задаёт отображение текста валидации файла во всплывающей подсказке.*/
export const ExampleValidationTooltip: Story = () => {
  return (
    <FileUploader
      uploaderText="Попробуйте выбрать файл"
      withValidationTooltip
      validateBeforeUpload={({ originalFile }) => {
        return Promise.resolve(`У файла ${originalFile.name} неверный формат`);
      }}
    />
  );
};
ExampleValidationTooltip.storyName = 'Сообщение валидации в тултипе';

/** Проп `error` переводит поле в состояние валидации «Ошибка». */
export const ExampleError: Story = () => {
  return <FileUploader error />;
};
ExampleError.storyName = 'Состояние ошибки';

/** Пропсы `validationSummary`, `validationSummaryStart` управляют показом блока с результатом валидации загруженных файлов. */
export const ExampleValidationSummary: Story = () => {
  function containsCyrillicLetters(str: string): boolean {
    const regex = /[\u0400-\u04FF]/;
    return regex.test(str);
  }

  function containsDigits(str: string): boolean {
    const regex = /\d/;
    return regex.test(str);
  }

  const validateBeforeUpload = (file: FileUploaderAttachedFile) => {
    let status = FileUploaderFileStatus.Uploaded;
    let message = '';
    const { name } = file.originalFile;

    if (containsCyrillicLetters(name)) {
      status = FileUploaderFileStatus.Error;
      message = 'Имя файла содержит кириллицу';
    } else if (containsDigits(name)) {
      status = FileUploaderFileStatus.Warning;
      message = 'Имя файла содержит цифры';
    }

    return Promise.resolve(status !== FileUploaderFileStatus.Uploaded ? { message, status } : message);
  };

  return (
    <FileUploader
      multiple
      validationSummary={'enabled'}
      validationSummaryStart={6}
      validateBeforeUpload={validateBeforeUpload}
    />
  );
};
ExampleValidationSummary.storyName = 'Результат валидации загруженных файлов';

/** Проп `request` включает асинхронны режим. Прикреплённые файлы отправляются на сервер асинхронно сразу после выбора.
 *  Выполненный промис считается успешной загрузкой файла, отклонённый — ошибкой. */
export const ExampleAsyncRequest: Story = () => {
  const request = () => Promise.resolve();

  return <FileUploader request={request} />;
};
ExampleAsyncRequest.storyName = 'Асинхронный режим';

/**  Пропсы `onRequestError`, `onRequestSuccess` позволяют управлять состоянием формы. */
export const ExampleValidationRequestError: Story = () => {
  const [error, setError] = React.useState(false);
  const [showError, setShowError] = React.useState(false);

  const request = () =>
    new Promise<void>((resolve, reject) => {
      setTimeout(() => (showError ? reject() : resolve()), 1000);
    });
  const reject = () => setError(true);

  return (
    <Gapped vertical>
      <FileUploader
        multiple
        error={error}
        onRemove={() => setError(false)}
        request={request}
        onRequestError={reject}
        onRequestSuccess={() => alert('Файл успешно загружен')}
      />
      <Toggle checked={showError} onValueChange={setShowError}>
        Показывать ошибку загрузки
      </Toggle>
    </Gapped>
  );
};
ExampleValidationRequestError.storyName = 'Обработка результата загрузки в асинхронном режиме';

/** Отрисовку строк файлов можно настраивать — менять разметку и параметры по умолчанию.
 *  Подробнее на странице [FileUploaderFile](https://tech.skbkontur.ru/kontur-ui/?path=/docs/input-data-fileuploader-fileuploaderfile--docs). */
export const ExampleRenderFile: Story = () => {
  const initialFiles = [createFile('test1.txt'), createFile('test2.txt')];
  return (
    <FileUploader
      multiple
      initialFiles={initialFiles}
      renderFile={(props) => <FileUploaderFile {...props} showSize />}
    />
  );
};
ExampleRenderFile.storyName = 'Собственная отрисовка файла';

/** Проп `hideFiles` позволяет скрыть список файлов. Полезно для реализации своего списка файлов. */
export const ExampleManualList: Story = () => {
  const fileUploaderRef = React.useRef<FileUploader>(null);
  const [fileList, setFileList] = React.useState<FileUploaderAttachedFile[]>([]);
  return (
    <div style={{ display: 'inline-grid', gap: '10px' }}>
      <FileUploader ref={fileUploaderRef} hideFiles multiple onValueChange={(files) => setFileList(files)} />
      {fileList.map((file) => {
        return (
          <Button key={file.id} onClick={() => fileUploaderRef.current?.removeFile(file.id)}>
            Delete file {file.originalFile.name}
          </Button>
        );
      })}
    </div>
  );
};
ExampleManualList.storyName = 'Скрытие списка файлов';

/** Переменные темы `fileUploaderLinkColor`, `fileUploaderBorderRadius`, `fileUploaderBorderStyle`. */
export const ExampleCustomizationTheme: Story = () => {
  const initialFiles = [createFile('test1.txt'), createFile('test2.txt')];
  return (
    <ThemeContext.Provider
      value={ThemeFactory.create({
        fileUploaderLinkColor: 'green',
        fileUploaderBorderRadius: '0',
        fileUploaderBorderStyle: 'dotted',
      })}
    >
      <FileUploader multiple initialFiles={initialFiles} />
    </ThemeContext.Provider>
  );
};
ExampleCustomizationTheme.storyName = 'Кастомизация: тема';
