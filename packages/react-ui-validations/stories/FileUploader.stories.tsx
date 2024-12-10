import React, { useState } from 'react';
import type { Meta } from '@storybook/react';
import { FileUploader } from '@skbkontur/react-ui/components/FileUploader';
import type { FileUploaderAttachedFile } from '@skbkontur/react-ui/internal/FileUploaderControl/fileUtils';

import type { ValidationInfo } from '../src';
import { ValidationContainer, ValidationWrapper } from '../src';
import type { Nullable } from '../typings/Types';

export default {
  title: 'FileUploader',
} as Meta;

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
