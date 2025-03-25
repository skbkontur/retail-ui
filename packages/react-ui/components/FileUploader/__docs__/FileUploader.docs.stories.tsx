import React from 'react';
import { FileUploader, FileUploaderRef, Button } from '@skbkontur/react-ui';

import { Meta, Story } from '../../../typings/stories';
import { FileUploaderAttachedFile } from '../../../internal/FileUploaderControl/fileUtils';

export default {
  title: 'Input data/FileUploader',
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
  function createFile(filename: string) {
    return new File(['content'], filename, { type: 'text/plain' });
  }

  const initialFiles = [createFile('test1.txt'), createFile('test2.txt')];
  return <FileUploader multiple initialFiles={initialFiles} />;
};
Example4.storyName = 'Файлы по умолчанию';

export const Example5: Story = () => {
  function createFile(filename: string) {
    return new File(['content'], filename, { type: 'text/plain' });
  }

  const initialFiles = [createFile('test1.txt'), createFile('test2.txt')];
  return (
    <FileUploader
      multiple
      initialFiles={initialFiles}
      renderFile={(file, fileNode) => React.cloneElement(fileNode, { showSize: false })}
    />
  );
};
Example5.storyName = 'Файлы по умолчанию с кастомизацией рендеринга';

export const Example6: Story = () => {
  return <FileUploader multiple accept="image/*" />;
};
Example6.storyName = 'Использование `accept`';

export const Example7: Story = () => {
  return (
    <FileUploader
      multiple
      validateBeforeUpload={({ originalFile }) => {
        return Promise.resolve(`У файла ${originalFile.name} неверный формат`);
      }}
    />
  );
};
Example7.storyName = 'Валидация файла в списке';

export const Example8: Story = () => {
  return <FileUploader multiple error />;
};
Example8.storyName = 'Валидация контрола';

/**
 * В критичных случаях, если нужно удалить файлы можно удалить вручную, используя метод removeFile из ref.
 * Обратите внимание, что при вызове removeFile вызываются коллбэки onRemove и onValueChange.
 */
export const Example9: Story = () => {
  const fileUploaderRef = React.useRef<FileUploaderRef>(null);
  const [fileList, setFileList] = React.useState<FileUploaderAttachedFile[]>([]);
  return (
    <div style={{ display: 'inline-grid', gap: '10px' }}>
      <FileUploader ref={fileUploaderRef} multiple onValueChange={(files) => setFileList(files)} />
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

Example9.storyName = 'Ручное удаление файлов';
