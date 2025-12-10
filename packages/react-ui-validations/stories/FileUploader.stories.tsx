import React, { useState } from 'react';
import type { Meta } from '@storybook/react';
import { FileUploader } from '@skbkontur/react-ui/components/FileUploader/FileUploader.js';
import type { FileUploaderAttachedFile } from '@skbkontur/react-ui/internal/FileUploaderControl/fileUtils.js';

import type { ValidationInfo } from '../index.js';
import { ValidationContainer, ValidationWrapper } from '../index.js';
import type { Nullable } from '../typings/Types.js';

const meta: Meta = {
  title: 'FileUploader',
};

export default meta;

export const Required = () => {
  const [value, setValue] = useState<FileUploaderAttachedFile[]>([]);

  const validateValue = (): Nullable<ValidationInfo> => {
    if (!value.length) {
      return { message: 'Поле обязательно', type: 'lostfocus' };
    }
    return null;
  };

  return (
    <div style={{ padding: 20 }}>
      <ValidationContainer>
        <ValidationWrapper validationInfo={validateValue()}>
          <FileUploader multiple onValueChange={setValue} />
        </ValidationWrapper>
      </ValidationContainer>
    </div>
  );
};
