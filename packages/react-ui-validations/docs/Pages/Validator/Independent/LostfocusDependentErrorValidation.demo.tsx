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

const validate = (value: string): Nullable<ValidationInfo> => {
  if (!/^\+7\(\d{3}\)-\d{3}-\d{2}-\d{2}$/.test(value))
    return { message: 'Неправильный номер', type: 'lostfocus' };
  return null;
};

export default () => {
  const [tel1, setTel1] = React.useState('+7(');
  const [tel2, setTel2] = React.useState('+7(123)');

  return (
    <ValidationContainer>
      <Form>
        <Form.Line title="1-й номер телефона">
          <ValidationWrapper
            validationInfo={validate(tel1)}
            renderMessage={text('right')}
          >
            <Input
              mask={'+7(999)-999-99-99'}
              alwaysShowMask
              value={tel1}
              onValueChange={setTel1}
            />
          </ValidationWrapper>
        </Form.Line>
        <Form.Line title="2-й номер телефона">
          <ValidationWrapper
            validationInfo={validate(tel2)}
            renderMessage={text('right')}
          >
            <Input
              mask={'+7(999)-999-99-99'}
              alwaysShowMask
              value={tel2}
              onValueChange={setTel2}
            />
          </ValidationWrapper>
        </Form.Line>
      </Form>
    </ValidationContainer>
  );
};
