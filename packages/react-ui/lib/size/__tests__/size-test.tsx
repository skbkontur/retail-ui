import React from 'react';
import { render } from '@testing-library/react';

import { SizeControlContext } from '../SizeControlContext';
import { Button } from '../../../components/Button/Button';
import { Input } from '../../../components/Input/Input';
import { Checkbox } from '../../../components/Checkbox/Checkbox';
import { Radio } from '../../../components/Radio/Radio';
import { Textarea } from '../../../components/Textarea/Textarea';
import { Toggle } from '../../../components/Toggle/Toggle';
import { PasswordInput } from '../../../components/PasswordInput/PasswordInput';
import { DateInput } from '../../../components/DateInput/DateInput';
import type { SizeProp } from '../../types/props';

const sizes: SizeProp[] = ['small', 'medium', 'large'];

describe('size context and overrides', () => {
  sizes.forEach((size) => {
    describe(`when size is ${size}`, () => {
      const refs = {
        Button: React.createRef<Button>(),
        Input: React.createRef<Input>(),
        Checkbox: React.createRef<Checkbox>(),
        Radio: React.createRef<Radio<string>>(),
        Textarea: React.createRef<Textarea>(),
        Toggle: React.createRef<Toggle>(),
        PasswordInput: React.createRef<PasswordInput>(),
        DateInput: React.createRef<DateInput>(),
      };

      beforeEach(() => {
        render(
          <SizeControlContext.Provider value={{ size }}>
            <div>
              <Button ref={refs.Button}>Btn</Button>
              <Input ref={refs.Input} />
              <Checkbox ref={refs.Checkbox} />
              <Radio ref={refs.Radio} value="test" />
              <Textarea ref={refs.Textarea} />
              <Toggle ref={refs.Toggle} />
              <PasswordInput ref={refs.PasswordInput} />
              <DateInput ref={refs.DateInput} />
            </div>
          </SizeControlContext.Provider>,
        );
      });

      test.each(Object.entries(refs))(`applies ${size} size from context to %s`, (componentName, componentRef) => {
        //@ts-expect-error: size is not public
        expect(componentRef.current?.size).toBe(size);
      });
    });
  });

  describe('when no context provided', () => {
    const refs = {
      Button: React.createRef<Button>(),
      Input: React.createRef<Input>(),
      Checkbox: React.createRef<Checkbox>(),
      Radio: React.createRef<Radio<string>>(),
      Textarea: React.createRef<Textarea>(),
      Toggle: React.createRef<Toggle>(),
      PasswordInput: React.createRef<PasswordInput>(),
      DateInput: React.createRef<DateInput>(),
    };

    beforeEach(() => {
      render(
        <div>
          <Button ref={refs.Button}>Btn</Button>
          <Input ref={refs.Input} />
          <Checkbox ref={refs.Checkbox} />
          <Radio ref={refs.Radio} value="test" />
          <Textarea ref={refs.Textarea} />
          <Toggle ref={refs.Toggle} />
          <PasswordInput ref={refs.PasswordInput} />
          <DateInput ref={refs.DateInput} />
        </div>,
      );
    });

    test.each(Object.entries(refs))(`applies default size to small`, (componentName, componentRef) => {
      //@ts-expect-error: size is not public
      expect(componentRef.current?.size).toBe('small');
    });
  });
});
