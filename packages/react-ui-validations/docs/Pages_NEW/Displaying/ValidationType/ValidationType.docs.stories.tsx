import { Meta, Story } from '@skbkontur/react-ui/typings/stories';
import React from 'react';
import { Button } from '@skbkontur/react-ui/components/Button';
import { Input } from '@skbkontur/react-ui/components/Input';

import { ValidationContainer, ValidationWrapper, ValidationInfo } from '../../../../src';
import { Nullable } from '../../../../typings/Types';
import { Form } from '../../../Common/Form';

export default {
  title: 'Отображение/Виды валидаций',
  parameters: { creevey: { skip: true } },
} as Meta;

export const ImmediateValidation: Story = () => {
  class ImmediateValidationDemo extends React.Component {
    public state = {
      value: '',
    };

    public render() {
      return (
        <ValidationContainer>
          <Form>
            <Form.Line title="Номер">
              <ValidationWrapper validationInfo={this.validate(this.state.value)}>
                <Input
                  placeholder={'Только цифры'}
                  value={this.state.value}
                  onValueChange={(value) => this.setState({ value })}
                />
              </ValidationWrapper>
            </Form.Line>
          </Form>
        </ValidationContainer>
      );
    }

    private validate = (value: string): Nullable<ValidationInfo> => {
      return !/^\d*$/.test(value) ? { message: 'Только цифры', type: 'immediate' } : null;
    };
  }
  return <ImmediateValidationDemo />;
};

export const LostfocusValidation: Story = () => {
  interface LostfocusValidationDemoState {
    value: string;
  }

  class LostfocusValidationDemo extends React.Component {
    public state: LostfocusValidationDemoState = {
      value: '',
    };

    public render() {
      return (
        <ValidationContainer>
          <Form>
            <Form.Line title="Номер">
              <ValidationWrapper validationInfo={this.validate(this.state.value)}>
                <Input
                  placeholder={'Только цифры'}
                  value={this.state.value}
                  onValueChange={(value) => this.setState({ value })}
                />
              </ValidationWrapper>
            </Form.Line>
          </Form>
        </ValidationContainer>
      );
    }

    private validate = (value: string): Nullable<ValidationInfo> => {
      return !/^\d*$/.test(value) ? { message: 'Только цифры', type: 'lostfocus' } : null;
    };
  }

  return <LostfocusValidationDemo />;
};

export const SubmitValidation: Story = () => {
  class SubmitValidationDemo extends React.Component {
    public state = {
      value: '',
    };

    private container: Nullable<ValidationContainer> = null;

    public render() {
      return (
        <ValidationContainer ref={this.refContainer}>
          <Form>
            <Form.Line title="Номер">
              <ValidationWrapper validationInfo={this.validate(this.state.value)}>
                <Input
                  placeholder={'Только цифры'}
                  value={this.state.value}
                  onValueChange={(value) => this.setState({ value })}
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
      return !/^\d*$/.test(value) ? { message: 'Только цифры', type: 'submit' } : null;
    };

    private handleSubmit = async (): Promise<void> => {
      if (!this.container) {
        throw new Error('invalid state');
      }
      await this.container.submit();
    };

    private refContainer = (el: Nullable<ValidationContainer>) => (this.container = el);
  }

  return <SubmitValidationDemo />;
};
