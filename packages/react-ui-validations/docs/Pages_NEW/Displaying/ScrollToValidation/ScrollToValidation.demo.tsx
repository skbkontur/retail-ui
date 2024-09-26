import React from 'react';
import { Button } from '@skbkontur/react-ui/components/Button';
import { Input } from '@skbkontur/react-ui/components/Input';

import { ValidationContainer, ValidationInfo, ValidationWrapper } from '../../../../src';
import { Form } from '../../../Common/Form';
import { SpaceFiller } from '../../../Common/SpaceFiller';
import { Nullable } from '../../../../typings/Types';

export default class ScrollToValidationDemo extends React.Component {
  public state = {
    value0: '',
    value1: '',
    value2: '',
    value3: '',
  };

  private container: Nullable<ValidationContainer> = null;

  public render() {
    return (
      <ValidationContainer ref={this.refContainer}>
        <Form>
          <SpaceFiller height={200}>Пустое место 200px</SpaceFiller>

          <Form.Line title={'value0'}>
            <ValidationWrapper validationInfo={this.validate(this.state.value0)}>
              <Input
                placeholder={'Только цифры'}
                value={this.state.value0}
                onValueChange={(value) => this.setState({ value0: value })}
              />
            </ValidationWrapper>
          </Form.Line>

          <Form.Line title={'value1'}>
            <ValidationWrapper validationInfo={this.validate(this.state.value1)}>
              <Input
                placeholder={'Только цифры'}
                value={this.state.value1}
                onValueChange={(value) => this.setState({ value1: value })}
              />
            </ValidationWrapper>
          </Form.Line>

          <SpaceFiller height={1600}>Пустое место 1600px</SpaceFiller>

          <Form.Line title={'value2'}>
            <ValidationWrapper validationInfo={this.validate(this.state.value2)}>
              <Input
                placeholder={'Только цифры'}
                value={this.state.value2}
                onValueChange={(value) => this.setState({ value2: value })}
              />
            </ValidationWrapper>
          </Form.Line>

          <Form.Line title={'value3'}>
            <ValidationWrapper validationInfo={this.validate(this.state.value3)}>
              <Input
                placeholder={'Только цифры'}
                value={this.state.value3}
                onValueChange={(value) => this.setState({ value3: value })}
              />
            </ValidationWrapper>
          </Form.Line>

          <Form.ActionsBar>
            <Button use={'primary'} onClick={this.handleSubmit}>
              Submit
            </Button>
          </Form.ActionsBar>
        </Form>
      </ValidationContainer>
    );
  }

  private validate = (value: string): Nullable<ValidationInfo> => {
    if (!value) {
      return { message: 'Укажите значение', type: 'submit' };
    }
    if (!/^\d*$/.test(value)) {
      return { message: 'Только цифры' };
    }
    return null;
  };

  private handleSubmit = async (): Promise<void> => {
    if (!this.container) {
      throw new Error('invalid state');
    }
    await this.container.submit();
  };

  private refContainer = (el: Nullable<ValidationContainer>) => (this.container = el);
}
