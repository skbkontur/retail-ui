import React, { cloneElement } from 'react';
import { FileUploader } from '@skbkontur/react-ui';

import { Meta, Story } from '../../../typings/stories';

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
  function createFile(filename) {
    return new File(['content'], filename, { type: 'text/plain' });
  }

  const initialFiles = [createFile('test1.txt'), createFile('test2.txt')];
  return <FileUploader multiple initialFiles={initialFiles} />;
};
Example4.storyName = 'Файлы по умолчанию';

export const Example5: Story = () => {
  function createFile(filename) {
    return new File(['content'], filename, { type: 'text/plain' });
  }

  const initialFiles = [createFile('test1.txt'), createFile('test2.txt')];
  return (
    <FileUploader
      multiple
      initialFiles={initialFiles}
      renderFile={(file, fileNode) => cloneElement(fileNode, { showSize: false })}
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
