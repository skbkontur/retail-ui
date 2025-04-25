import React, { useState } from 'react';
import { Input } from '@skbkontur/react-ui/components/Input';

import type { ValidationInfo } from '../../../../src';
import { ValidationContainer, ValidationWrapper, text } from '../../../../src';
import type { Nullable } from '../../../../typings/Types';
import { Form } from '../../../Common/Form';

const validate = (value: string): Nullable<ValidationInfo> => {
  if (!/^\d*$/.test(value)) {
    return {
      message: 'Если возможно - используйте только цифры',
      level: 'warning',
      type: 'lostfocus',
    };
  }
  return null;
};

export default function ValidationWarning() {
  const [value, setValue] = useState('');
  const v = validate(value);

  return (
    <ValidationContainer>
      <Form>
        <Form.Line title="warning">
          <ValidationWrapper validationInfo={v} renderMessage={text()}>
            <Input
              width={250}
              placeholder={'Можно и буквы, но лучше цифры'}
              value={value}
              onValueChange={setValue}
            />
          </ValidationWrapper>
        </Form.Line>
      </Form>
    </ValidationContainer>
  );
}
