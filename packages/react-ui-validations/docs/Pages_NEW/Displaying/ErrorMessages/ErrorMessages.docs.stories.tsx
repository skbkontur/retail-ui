import { Meta, Story } from '@skbkontur/react-ui/typings/stories';
import React from 'react';
import { Input } from '@skbkontur/react-ui/components/Input';

import { ValidationContainer, ValidationWrapper, ValidationInfo, text, tooltip } from '../../../../src';
import { Nullable } from '../../../../typings/Types';
import { Form } from '../../../Common/Form';

export default {
  title: 'Отображение/Сообщения об ошибках',
  parameters: { creevey: { skip: true } },
} as Meta;

export const TextValidation: Story = () => {
  class TextValidationDemo extends React.Component {
    public state = {
      value: '',
    };

    public render() {
      const v = this.validate(this.state.value);
      return (
        <ValidationContainer>
          <Form>
            <Form.Line title="text()">
              <ValidationWrapper validationInfo={v} renderMessage={text()}>
                {this.renderInput()}
              </ValidationWrapper>
            </Form.Line>
            <Form.Line title="text('right')">
              <ValidationWrapper validationInfo={v} renderMessage={text('right')}>
                {this.renderInput()}
              </ValidationWrapper>
            </Form.Line>
            <Form.Line title="text('bottom')">
              <ValidationWrapper validationInfo={v} renderMessage={text('bottom')}>
                {this.renderInput()}
              </ValidationWrapper>
            </Form.Line>
          </Form>
        </ValidationContainer>
      );
    }

    private renderInput = () => {
      return (
        <Input
          placeholder={'Только цифры'}
          value={this.state.value}
          onValueChange={(value) => this.setState({ value })}
        />
      );
    };

    private validate = (value: string): Nullable<ValidationInfo> => {
      if (!/^\d*$/.test(value)) {
        return { message: 'Только цифры', type: 'lostfocus' };
      }
      return null;
    };
  }

  return <TextValidationDemo />;
};

export const TooltipValidation: Story = () => {
  interface TooltipValidationDemoState {
    value: string;
  }

  class TooltipValidationDemo extends React.Component {
    public state: TooltipValidationDemoState = {
      value: '',
    };

    public render() {
      const v = this.validate(this.state.value);
      return (
        <ValidationContainer>
          <Form>
            <Form.Line title="default">
              <ValidationWrapper validationInfo={v}>{this.renderInput()}</ValidationWrapper>
            </Form.Line>
            <Form.Line title="tooltip('right top')">
              <ValidationWrapper validationInfo={v} renderMessage={tooltip('right top')}>
                {this.renderInput()}
              </ValidationWrapper>
            </Form.Line>
            <Form.Line title="tooltip('top left')">
              <ValidationWrapper validationInfo={v} renderMessage={tooltip('top left')}>
                {this.renderInput()}
              </ValidationWrapper>
            </Form.Line>
          </Form>
        </ValidationContainer>
      );
    }

    private renderInput = () => {
      return (
        <Input
          placeholder={'Только цифры'}
          value={this.state.value}
          onValueChange={(value) => this.setState({ value })}
        />
      );
    };

    private validate = (value: string): Nullable<ValidationInfo> => {
      if (!/^\d*$/.test(value)) {
        return { message: 'Только цифры', type: 'lostfocus' };
      }
      return null;
    };
  }

  return <TooltipValidationDemo />;
};
