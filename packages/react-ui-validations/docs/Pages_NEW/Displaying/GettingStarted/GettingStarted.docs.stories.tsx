import { Meta, Story } from '@skbkontur/react-ui/typings/stories';
import React from 'react';
import { Input } from '@skbkontur/react-ui/components/Input';

import { ValidationContainer, ValidationWrapper } from '../../../../src';
import { Form } from '../../../Common/Form';

export default {
  title: 'Отображение/Начало работы',
  parameters: { creevey: { skip: true } },
} as Meta;

export const ConditionalValidation: Story = () => {
  interface ConditionalValidationDemoState {
    value: string;
  }
  class ConditionalValidationDemo extends React.Component {
    public state: ConditionalValidationDemoState = {
      value: '',
    };

    public render() {
      const { value } = this.state;

      const validationInfo = !/^\d*$/.test(value) ? { message: 'Только цифры' } : null;

      return (
        <ValidationContainer>
          <Form>
            <Form.Line title="Номер">
              <ValidationWrapper validationInfo={validationInfo}>
                <Input placeholder={'Только цифры'} value={value} onValueChange={(v) => this.setState({ value: v })} />
              </ValidationWrapper>
            </Form.Line>
          </Form>
        </ValidationContainer>
      );
    }
  }

  return <ConditionalValidationDemo />;
};

export const StaticValidation: Story = () => {
  class StaticValidationDemo extends React.Component {
    public render() {
      return (
        <ValidationContainer>
          <Form>
            <Form.Line title="Поле с ошибкой">
              <ValidationWrapper validationInfo={{ message: <b>Ошибка</b> }}>
                <Input value={'bad'} />
              </ValidationWrapper>
            </Form.Line>
            <Form.Line title="Поле без ошибки">
              <ValidationWrapper validationInfo={null}>
                <Input value={'ok'} />
              </ValidationWrapper>
            </Form.Line>
          </Form>
        </ValidationContainer>
      );
    }
  }

  return <StaticValidationDemo />;
};
