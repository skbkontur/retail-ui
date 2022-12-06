import React, { useState } from 'react';
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
  if (!/^\d*$/.test(value)) {
    return {
      message: 'Если возможно - удалите буквы',
      level: 'warning',
      type: 'lostfocus',
    };
  }
  return null;
};

export default function ValidationWithWarnings() {
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
