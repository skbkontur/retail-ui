import React from 'react';
import { action } from '@storybook/addon-actions';

import type { Story } from '../../../typings/stories';
import { FileUploaderFile } from '../FileUploaderFile/FileUploaderFile';
import { FileUploaderFileStatus } from '../fileUtils';

export default {
  title: 'FileUploaderFile',
  decorators: [
    (storyFn: () => JSX.Element) => {
      return <div style={{ padding: '30px', width: '250px' }}>{storyFn()}</div>;
    },
  ],
};

export const FileUploaderFileWithValidationError: Story = () => {
  return (
    <div style={{ width: '50px' }}>
      <FileUploaderFile
        file={{
          id: '',
          originalFile: {
            lastModified: 0,
            name: 'test',
            size: 0,
            type: '',
            text: () => Promise.resolve(''),
            webkitRelativePath: '',
            arrayBuffer: () => Promise.resolve(new ArrayBuffer(0)),
            slice: () => new Blob(),
            stream: () => new ReadableStream(),
          },
          status: FileUploaderFileStatus.Error,
          validationResult: { isValid: false, message: 'Валидация не прошла' },
        }}
        size="small"
        onRemove={action('onRemove')}
      />
    </div>
  );
};
