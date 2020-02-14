import React from 'react';
import { Input } from '@skbkontur/react-ui/components/Input';

import { ValidationContainer, ValidationWrapper } from '../../../../src';
import { Form } from '../../../Common/Form';

export default class StaticValidationDemo extends React.Component {
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
