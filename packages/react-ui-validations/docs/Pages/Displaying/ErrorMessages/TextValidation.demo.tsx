import * as React from 'react';
import Input from 'retail-ui/components/Input';
import {
  ValidationContainer,
  ValidationWrapper,
  ValidationInfo,
  text,
} from '../../../../src';
import { Nullable } from '../../../../typings/Types';
import Form from '../../../Common/Form';

interface State {
  value: string;
}

export default class TextValidationDemo extends React.Component<{}, State> {
  public state: State = {
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
        onChange={(_, value) => this.setState({ value })}
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
