import React from 'react';
import { Meta, Story } from '../../../typings/stories';

import { FileUploader } from '@skbkontur/react-ui';

export default {
  title: 'Input data/FileUploader',
  component: FileUploader,
  parameters: { creevey: { skip: true } },
} as Meta;

export const Example1: Story = () => {

  return (
    <FileUploader  />
  );

};
Example1.storyName = 'Синхронный контрол';

export const Example2: Story = () => {

  const request = () => Promise.resolve();

  return (
    <FileUploader request={request} />
  );

};
Example2.storyName = 'Асинхронный контрол';

export const Example3: Story = () => {

  const request = () => Promise.reject();

  return (
    <FileUploader request={request} multiple />
  );

};
Example3.storyName = 'Multiple контрол';

export const Example4: Story = () => {

  return (
    <FileUploader multiple accept="image/*" />
  );

};
Example4.storyName = 'Использование `accept`';

export const Example5: Story = () => {

  return (
    <FileUploader
      multiple
      validateBeforeUpload={({ originalFile }) => {
        return Promise.resolve(`У файла ${originalFile.name} неверный формат`);
      }}
    />
  );

};
Example5.storyName = 'Валидация файла в списке';

export const Example6: Story = () => {

  return (
    <FileUploader multiple error />
  );

};
Example6.storyName = 'Валидация контрола';

