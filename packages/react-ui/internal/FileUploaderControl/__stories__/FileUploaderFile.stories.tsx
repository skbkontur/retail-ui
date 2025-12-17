import React from 'react';
import { action } from '@storybook/addon-actions';

import type { Story } from '../../../typings/stories';
import { Gapped } from '../../../components/Gapped';
import type { FileUploaderAttachedFile } from '../../../components/FileUploader';
import { FileUploaderFile } from '../FileUploaderFile/FileUploaderFile';
import { FileUploaderFileStatus } from '../fileUtils';

export default {
  title: 'FileUploaderFile',
  decorators: [
    (storyFn: () => JSX.Element) => {
      return <div style={{ padding: '30px', width: '400px' }}>{storyFn()}</div>;
    },
  ],
};

function createFile(filename: string, content = 'content'): File {
  return new File([content], filename);
}

function createFileUploaderFile(attachedFile?: Partial<FileUploaderAttachedFile>): FileUploaderAttachedFile {
  return {
    id: '',
    originalFile: createFile('test.txt'),
    status: FileUploaderFileStatus.Attached,
    validationResult: { isValid: true },
    ...attachedFile,
  };
}

export const DifferentSizes = () => {
  const file = createFileUploaderFile();
  const props = { file, showSize: true, onRemove: action('onRemove') };
  return (
    <Gapped vertical gap={24}>
      <Gapped>
        <div style={{ width: 300, position: 'relative', padding: '4px 0' }}>
          <FileUploaderFile {...props} size="small" />
        </div>
        small
      </Gapped>
      <Gapped>
        <div style={{ width: 300, position: 'relative', padding: '6px 0' }}>
          <FileUploaderFile {...props} size="medium" />
        </div>
        medium
      </Gapped>
      <Gapped>
        <div style={{ width: 300, position: 'relative', padding: '8px 0' }}>
          <FileUploaderFile {...props} size="large" />
        </div>
        large
      </Gapped>
    </Gapped>
  );
};

export const FileUploaderFileWithValidationError: Story = () => {
  return (
    <div style={{ width: '250px' }}>
      <Gapped vertical gap={24}>
        <div style={{ position: 'relative', padding: '4px 0' }}>
          <FileUploaderFile
            file={createFileUploaderFile({
              status: FileUploaderFileStatus.Error,
              validationResult: { isValid: false, message: 'Валидация с тултипом' },
            })}
            size="small"
            withValidationTooltip
            validationTooltipPosition="right middle"
            onRemove={action('onRemove')}
          />
        </div>
        <div style={{ position: 'relative', padding: '4px 0' }}>
          <FileUploaderFile
            file={createFileUploaderFile({
              status: FileUploaderFileStatus.Error,
              validationResult: { isValid: false, message: 'Валидация без тултипа' },
            })}
            size="small"
            onRemove={action('onRemove')}
          />
        </div>
      </Gapped>
    </div>
  );
};

export const fileUploaderTileWithValidationError: Story = () => {
  return (
    <div style={{ width: '250px' }}>
      <Gapped vertical gap={24}>
        <div style={{ position: 'relative', padding: '4px 0', width: '100px' }}>
          <FileUploaderFile
            file={createFileUploaderFile({
              status: FileUploaderFileStatus.Error,
              validationResult: { isValid: false, message: 'Валидация исключительно в тултипе' },
            })}
            size="small"
            view="tile"
            validationTooltipPosition="right middle"
            onRemove={action('onRemove')}
          />
        </div>
      </Gapped>
    </div>
  );
};

export const FileUploaderFileWithValidationWarning: Story = () => {
  return (
    <div style={{ width: '250px' }}>
      <Gapped vertical gap={24}>
        <div style={{ position: 'relative', padding: '4px 0' }}>
          <FileUploaderFile
            file={createFileUploaderFile({
              status: FileUploaderFileStatus.Warning,
              validationResult: { isValid: false, message: 'Валидация с тултипом' },
            })}
            size="small"
            withValidationTooltip
            validationTooltipPosition="right middle"
            onRemove={action('onRemove')}
          />
        </div>
        <div style={{ position: 'relative', padding: '4px 0' }}>
          <FileUploaderFile
            file={createFileUploaderFile({
              status: FileUploaderFileStatus.Warning,
              validationResult: { isValid: false, message: 'Валидация без тултипа' },
            })}
            size="small"
            onRemove={action('onRemove')}
          />
        </div>
        <div style={{ position: 'relative', padding: '4px 0' }}>
          <FileUploaderFile
            file={createFileUploaderFile({
              status: FileUploaderFileStatus.Warning,
              validationResult: { isValid: false, message: 'Ворнинг c иконкой' },
            })}
            withWarningIcon
            size="small"
            onRemove={action('onRemove')}
          />
        </div>
      </Gapped>
    </div>
  );
};

export const fileUploaderTileWithValidationWarning: Story = () => {
  return (
    <div style={{ width: '250px' }}>
      <Gapped vertical gap={24}>
        <div style={{ position: 'relative', padding: '4px 0', width: '100px' }}>
          <FileUploaderFile
            file={createFileUploaderFile({
              status: FileUploaderFileStatus.Warning,
              validationResult: { isValid: false, message: 'Валидация исключительно в тултипе' },
            })}
            size="small"
            view="tile"
            validationTooltipPosition="right middle"
            onRemove={action('onRemove')}
          />
        </div>
      </Gapped>
    </div>
  );
};
