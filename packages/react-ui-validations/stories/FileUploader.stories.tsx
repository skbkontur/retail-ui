import { storiesOf } from '@storybook/react';
import React from 'react';
import { FileUploader } from '@skbkontur/react-ui/components/FileUploader';
import { FileUploaderAttachedFile } from '@skbkontur/react-ui/internal/FileUploaderControl/fileUtils';

import { ValidationContainer, ValidationInfo, ValidationWrapper } from '../src';
import { Nullable } from '../typings/Types';

interface FileUploaderStoryState {
  value: FileUploaderAttachedFile[];
}

class Example1 extends React.Component<{}, FileUploaderStoryState> {
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

class Example2 extends React.Component<{}, {}> {
  public validateValue = (file: FileUploaderAttachedFile): Nullable<ValidationInfo> => {
    if (file) {
      return { message: 'Файл коряв', type: 'immediate' };
    }
    return null;
  }

  private renderFile = (file: FileUploaderAttachedFile, fileNode: React.ReactElement): React.ReactNode => {
    return (
      <ValidationContainer>
        <ValidationWrapper validationInfo={this.validateValue(file)}>
          {fileNode}
        </ValidationWrapper>
      </ValidationContainer>
    );
  }

  public render() {
    return (
      <div style={{ padding: '20px 20px' }}>
          <FileUploader multiple renderFile={this.renderFile} />
      </div>
    );
  }
}

class Example3 extends React.Component<{}, {}> {
  public validateValue = (file: FileUploaderAttachedFile): Nullable<ValidationInfo> => {
    if (file) {
      return { message: 'Файл коряв', type: 'immediate' };
    }
    return null;
  }

  private renderFile = (file: FileUploaderAttachedFile, fileNode: React.ReactElement): React.ReactNode => {
    return (
      <ValidationContainer>
        <ValidationWrapper validationInfo={this.validateValue(file)}>
          {fileNode}
        </ValidationWrapper>
      </ValidationContainer>
    );
  }

  public render() {
    return (
      <div style={{ padding: '20px 20px' }}>
        <FileUploader renderFile={this.renderFile} />
      </div>
    );
  }
}

storiesOf('FileUploader', module)
  .add('#1. Валидация контрола', () => <Example1 />)
  .add('#2. Валидация файлика', () => <Example2 />)
  .add('#3. Валидация одиночного контрола', () => <Example3 />);
