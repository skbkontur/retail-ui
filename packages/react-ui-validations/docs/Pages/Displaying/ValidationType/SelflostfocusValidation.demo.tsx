import React from 'react';
import { Input } from '@skbkontur/react-ui/components/Input';

import {
  ValidationContainer,
  ValidationWrapper,
  ValidationInfo,
  text,
} from '../../../../src';
import { Nullable } from '../../../../typings/Types';
import { Form } from '../../../Common/Form';

interface State {
  value1: string;
  value2: string;
}

export default class LostfocusValidationDemo extends React.Component<{}, State> {
  public state: State = {
    value1: '',
    value2: '',
  };

  public render() {
    return (
      <ValidationContainer>
        <Form>
          <Form.Line title="Номер 1">
            <ValidationWrapper
              validationInfo={this.validate(this.state.value1)}
              renderMessage={text('right')}
            >
              <Input
                placeholder={'Только цифры'}
                value={this.state.value1}
                onValueChange={(value1) => this.setState({ value1 })}
                onBlur={() => console.log('onBlur Номер 1')}
                data-tid="Номер 1"
              />
            </ValidationWrapper>
          </Form.Line>
          <Form.Line title="Номер 2">
            <ValidationWrapper
              validationInfo={this.validate(this.state.value2)}
              renderMessage={text('right')}
            >
              <Input
                placeholder={'Только цифры'}
                value={this.state.value2}
                onValueChange={(value2) => this.setState({ value2 })}
                onBlur={() => console.log('onBlur Номер 2')}
                data-tid="Номер 2"
              />
            </ValidationWrapper>
          </Form.Line>
        </Form>
      </ValidationContainer>
    );
  }

  private validate = (value: string): Nullable<ValidationInfo> => {
    // if (!value) return { message: 'Не должно быть пустым', type: 'selflostfocus' };
    // if (!/^\d*$/.test(value)) return { message: 'Только цифры', type: 'selflostfocus' };
    console.log('value', value);
    if (this.state.value1 === this.state.value2)
      return { message: 'Номера не должны совпадать', type: 'selflostfocus' };
    return null;
  };
}
