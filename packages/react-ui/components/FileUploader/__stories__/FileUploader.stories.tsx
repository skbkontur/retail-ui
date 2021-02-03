import React from 'react';
import { FileUploader } from '../FileUploader';

export default {
  title: 'FileUploader',
  decorators: [
    (storyFn: () => JSX.Element) => (
      <div style={{ padding: '5px', width: '300px' }}>{storyFn()}</div>
    ),
  ],
};

export const SyncUploader = () => (
  <FileUploader />
);
