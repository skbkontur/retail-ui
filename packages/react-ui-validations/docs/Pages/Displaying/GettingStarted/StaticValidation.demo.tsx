import * as React from 'react';
import Input from 'retail-ui/components/Input';
import { ValidationContainer, ValidationWrapperV1 } from '../../../../src';
import Form from '../../../Common/Form';

export default class StaticValidationDemo extends React.Component {
  public render() {
    return (
      <ValidationContainer>
        <Form>
          <Form.Line title="Поле с ошибкой">
            <ValidationWrapperV1 validationInfo={{ message: <b>Ошибка</b> }}>
              <Input value={'bad'} />
            </ValidationWrapperV1>
          </Form.Line>
          <Form.Line title="Поле без ошибки">
            <ValidationWrapperV1 validationInfo={null}>
              <Input value={'ok'} />
            </ValidationWrapperV1>
          </Form.Line>
        </Form>
      </ValidationContainer>
    );
  }
}
