import React from 'react';
import { Meta } from '@storybook/react';
import { FileUploader } from '@skbkontur/react-ui/components/FileUploader';
import { FileUploaderAttachedFile } from '@skbkontur/react-ui/internal/FileUploaderControl/fileUtils';

import { ValidationContainer, ValidationInfo, ValidationWrapper } from '../src';
import { Nullable } from '../typings/Types';

export default {
  title: 'FileUploader',
} as Meta;

interface FileUploaderStoryState {
  value: FileUploaderAttachedFile[];
}

export const Required = () => {
  class FileUploaderStory extends React.Component {
    public state: FileUploaderStoryState = {
      value: [],
    };

    public validateValue(): Nullable<ValidationInfo> {
      const { value } = this.state;
      if (!value.length) {
        return { message: 'Поле обязательно', type: 'lostfocus' };
      }
      return null;
    }

    public render() {
      return (
        <div style={{ padding: '20px 20px' }}>
          <ValidationContainer>
            <ValidationWrapper validationInfo={this.validateValue()}>
              <FileUploader multiple onValueChange={(files) => this.setState({ value: files })} />
            </ValidationWrapper>
          </ValidationContainer>
        </div>
      );
    }
  }

  return <FileUploaderStory />;
};
