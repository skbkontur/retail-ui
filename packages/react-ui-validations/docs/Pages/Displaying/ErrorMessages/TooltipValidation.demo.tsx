import React from 'react';
import { Input } from '@skbkontur/react-ui/components/Input';

import {
  ValidationContainer,
  ValidationWrapper,
  ValidationInfo,
  tooltip,
} from '../../../../src';
import { Nullable } from '../../../../typings/Types';
import { Form } from '../../../Common/Form';

interface State {
  value: string;
}

export default class TooltipValidationDemo extends React.Component<{}, State> {
  public state: State = {
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
