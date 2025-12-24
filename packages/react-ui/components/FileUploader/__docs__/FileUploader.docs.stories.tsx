import React from 'react';
import {
  ThemeContext,
  ThemeFactory,
  FileUploaderFile,
  FileUploader,
  Button,
  Toggle,
  Gapped,
} from '@skbkontur/react-ui';

import type { Meta, Story } from '../../../typings/stories';
import { type FileUploaderAttachedFile, FileUploaderFileStatus } from '../../../internal/FileUploaderControl/fileUtils';
import { createFile } from '../../../internal/FileUploaderControl/fileUtils';

export default {
  title: 'Input data/FileUploader/FileUploader',
  component: FileUploader,
  parameters: { creevey: { skip: true } },
} as Meta;

export const Example1: Story = () => {
  return <FileUploader />;
};
Example1.storyName = 'Синхронный контрол';

export const Example2: Story = () => {
  const request = () => Promise.resolve();

  return <FileUploader request={request} />;
};
Example2.storyName = 'Асинхронный контрол';

export const Example3: Story = () => {
  const request = () => Promise.reject();

  return <FileUploader request={request} multiple />;
};
Example3.storyName = 'Multiple контрол';

export const Example4: Story = () => {
  const initialFiles = [createFile('test1.txt'), createFile('test2.txt')];
  return <FileUploader multiple initialFiles={initialFiles} />;
};
Example4.storyName = 'Файлы по умолчанию';

/**
 *  Для кастомизации отображения файлов можно использовать проп `renderFile`.
 *  Есть два способа кастомизации отображения файла с помощью этого пропа:
 *
 * 1. Клонирование аргумента `fileNode` с заменой нужных пропов.
 * 2. Использование аргумента `props` вместе с компонентом `FileUploaderFile`.
 *
 * Второй вариант станет основным в следующей мажорной версии, `6.0`.
 *
 * Более подробные примеры кастомизации отображения файлов можно посмотреть на [странице](https://tech.skbkontur.ru/kontur-ui/?path=/docs/input-data-fileuploader-fileuploaderfile--docs) компонента `FileUploaderFile`.
 */
export const Example5: Story = () => {
  const initialFiles = [createFile('test1.txt'), createFile('test2.txt')];
  return (
    <FileUploader
      multiple
      initialFiles={initialFiles}
      renderFile={(_file, _fileNode, props) => {
        // return React.cloneElement(fileNode, { showSize: true });
        return <FileUploaderFile {...props} showSize />;
      }}
    />
  );
};
Example5.storyName = 'Кастомизация отображения файлов';

export const Example6: Story = () => {
  return <FileUploader multiple accept="image/*" />;
};
Example6.storyName = 'Использование `accept`';

export const Example7: Story = () => {
  return (
    <FileUploader
      withValidationTooltip
      validateBeforeUpload={({ originalFile }) => {
        return Promise.resolve(`У файла ${originalFile.name} неверный формат`);
      }}
    />
  );
};
Example7.storyName = 'Валидация файла (ошибка в тултипе)';

export const Example8: Story = () => {
  return (
    <FileUploader
      multiple
      validateBeforeUpload={({ originalFile }) => {
        return Promise.resolve(`У файла ${originalFile.name} неверный формат`);
      }}
    />
  );
};
Example8.storyName = 'Валидация файлов в списке перед отправкой на сервер';

/**
 * Чтобы указать на ошибку загрузки файла на сервер, функция `request` должна вернуть `Promise` в состоянии `rejected`.
 * Тогда рядом с файлом появится иконка ошибки.
 *
 * Проп `onRequestError` можно использовать для переключения состояния ошибки всей формы.
 */
export const Example9: Story = () => {
  const [error, setError] = React.useState(false);
  const [showError, setShowError] = React.useState(false);

  const request = () =>
    new Promise<void>((resolve, reject) => {
      setTimeout(() => (showError ? reject() : resolve()), 1000);
    });
  const reject = () => setError(true);

  return (
    <Gapped vertical>
      <FileUploader multiple error={error} onRemove={() => setError(false)} request={request} onRequestError={reject} />
      <Toggle checked={showError} onValueChange={setShowError}>
        Показывать ошибку загрузки
      </Toggle>
    </Gapped>
  );
};
Example9.storyName = 'Валидация файлов в списке на сервере';

export const Example10: Story = () => {
  return <FileUploader multiple error />;
};
Example10.storyName = 'Валидация контрола';

/**
 * В компоненте есть возможность скрыть дефолтный список файлов и нарисовать свой, используя пропы `hideFiles`, `onAttach`, `onRemove` или `onValueChange`.
 *
 * Если требуется удалить файлы вручную, можно использовать метод `removeFile` из `ref`.
 *
 * При его вызове автоматически вызываются колбэки `onValueChange` и `onRemove`.
 */
export const Example11: Story = () => {
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
Example11.storyName = 'Ручное управление списком файлов';

/**
 * Саммари будет показано автоматически, если загружено больше 5 файлов (по умолчанию). Работает с версией темы >= 5_5.
 * Попробуй загрузить несколько файлов, в примере уже дописан обработчик на валидацию файлов.
 */
export const Example14: Story = () => {
  function containsCyrillicLetters(str: string): boolean {
    // Регулярное выражение для проверки наличия символов кириллицы
    const regex = /[\u0400-\u04FF]/;
    return regex.test(str);
  }

  function containsDigits(str: string): boolean {
    // Регулярное выражение для проверки наличия цифр
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

Example14.storyName = 'Саммари с количеством ошибок и предупреждений';

/**
 * Обновленное отображение плиткой.
 * При мультизагрузке можно настроить позиционирование для области загрузки файла - добавить на старт или в конец
 */
export const Example15 = () => {
  const initialFiles = [createFile('test1.txt'), createFile('test2.txt')];
  return <FileUploader multiple width={400} view="tile" uploadButtonPosition="end" initialFiles={initialFiles} />;
};

Example15.storyName = 'Отображение файлов плиткой';

/**
 * Внешний вид контрола, в том числе цвет текстов, можно настроить через `ThemeContext`.
 *
 * Заменить текст можно через `uploaderText`, а иконку через `uploaderIcon`
 */
export const Customization: Story = () => {
  const initialFiles = [createFile('test1.txt'), createFile('test2.txt')];
  return (
    <ThemeContext.Provider
      value={ThemeFactory.create({
        fileUploaderLinkColor: 'green',
        fileUploaderBorderRadius: '0',
        fileUploaderBorderStyle: 'dotted',
      })}
    >
      <FileUploader multiple initialFiles={initialFiles} uploaderText="Добавь файл" />
    </ThemeContext.Provider>
  );
};

Customization.storyName = 'Кастомизация внешнего вида';
