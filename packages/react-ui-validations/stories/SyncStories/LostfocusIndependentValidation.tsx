import React, { useRef, useState } from 'react';
import { Button } from '@skbkontur/react-ui/components/Button';
import { Gapped } from '@skbkontur/react-ui/components/Gapped';
import { Input } from '@skbkontur/react-ui/components/Input';

import type { ValidationInfo } from '../../src';
import { createValidator, ValidationContainer, ValidationWrapper } from '../../src';
import type { Nullable } from '../../typings/Types';

import type { ValidationState } from './ValidationHelper';

interface ObjectType {
  value3: string;
  value4: string;
}

export const LostfocusIndependentValidation = () => {
  const refContainer = useRef<ValidationContainer>(null);

  const [value1, setValue1] = useState<string>('');
  const [value2, setValue2] = useState<string>('');
  const [object, setObject] = useState<ObjectType>({
    value3: '',
    value4: '',
  });
  const [validation, setValidation] = useState<ValidationState>('none');

  const validate = (v: string): Nullable<ValidationInfo> => {
    if (v === '') {
      return { message: 'Не должно быть пустым', type: 'lostfocus', independent: false };
    }
    if (!/^\d*$/.test(v)) {
      return { message: 'Только цифры', type: 'lostfocus', independent: false };
    }
    return null;
  };

  const validateObject = createValidator<ObjectType>((b) => {
    b.prop(
      (x) => x.value3,
      (b) => {
        b.invalid((x) => !x, 'Не должно быть пустым', undefined, undefined, true);
        b.invalid((x) => !/^\d*$/.test(x), 'Только цифры', undefined, undefined, true);
      },
    );
    b.prop(
      (x) => x.value4,
      (b) => {
        b.invalid((x) => !x, 'Не должно быть пустым', undefined, undefined, false);
        b.invalid((x) => !/^\d*$/.test(x), 'Только цифры', undefined, undefined, false);
      },
    );
  });

  const handleSubmit = async (): Promise<void> => {
    if (!refContainer.current) {
      throw new Error('invalid state');
    }
    const isValid = await refContainer.current?.validate(false);
    setValidation(isValid ? 'valid' : 'invalid');
  };

  const validationData = validateObject(object);

  return (
    <ValidationContainer ref={refContainer}>
      <Gapped vertical>
        <ValidationWrapper validationInfo={validate(value1)}>
          <Input placeholder="Только цифры" value={value1} onValueChange={setValue1} />
        </ValidationWrapper>
        <ValidationWrapper validationInfo={validate(value2)}>
          <Input placeholder="Только цифры" value={value2} onValueChange={setValue2} />
        </ValidationWrapper>
        <ValidationWrapper validationInfo={validationData.getNode((x) => x.value3).get()}>
          <Input
            placeholder="Только цифры"
            value={object.value3}
            onValueChange={(value3) => setObject((prev) => ({ ...prev, value3 }))}
          />
        </ValidationWrapper>
        <ValidationWrapper validationInfo={validationData.getNode((x) => x.value4).get()}>
          <Input
            placeholder="Только цифры"
            value={object.value4}
            onValueChange={(value4) => setObject((prev) => ({ ...prev, value4 }))}
          />
        </ValidationWrapper>
        <Gapped wrap verticalAlign="middle">
          <Button use="primary" onClick={handleSubmit}>
            Submit
          </Button>
          <span data-tid={'ValidationState'}>{validation}</span>
        </Gapped>
      </Gapped>
    </ValidationContainer>
  );
};
