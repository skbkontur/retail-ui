import React from 'react';
import { render, screen } from '@testing-library/react';

import { ValidationContainer, ValidationWrapper } from '../src';

const InputLike = React.forwardRef<
  HTMLSpanElement,
  {
    onFocus?: () => void;
    onBlur?: () => void;
    onChange?: () => void;
    onValueChange?: () => void;
  }
>(function InputLike({ onFocus, onBlur, onChange, onValueChange }, ref) {
  onFocus?.();
  onBlur?.();
  onChange?.();
  onValueChange?.();

  return <span ref={ref} />;
});

const ComboBoxLike: React.FunctionComponent<{
  onInputValueChange: () => string;
}> = ({ onInputValueChange }) => {
  const [value, setValue] = React.useState<string>('');
  React.useEffect(() => {
    setValue(onInputValueChange());
  }, [value]);

  return <span>{value}</span>;
};
// @ts-expect-error: 1
ComboBoxLike.__KONTUR_REACT_UI__ = 'ComboBox';

describe('ValidationWrapper', () => {
  describe('should properly clone props', () => {
    it.each([
      ['ref', jest.fn()],
      ['onFocus', jest.fn()],
      ['onBlur', jest.fn()],
      ['onChange', jest.fn()],
      ['onValueChange', jest.fn()],
    ])('%s', async (propName, propValue) => {
      render(
        <ValidationContainer>
          <ValidationWrapper validationInfo={null}>
            <InputLike {...{ [propName]: propValue }} />
          </ValidationWrapper>
        </ValidationContainer>,
      );

      expect(propValue).toHaveBeenCalledTimes(1);
    });

    it('onInputValueChange', async () => {
      const inputValue = 'inputValue';
      const onInputValueChange = () => inputValue;
      render(
        <ValidationContainer>
          <ValidationWrapper validationInfo={null}>
            <ComboBoxLike onInputValueChange={onInputValueChange} />
          </ValidationWrapper>
        </ValidationContainer>,
      );
      expect(screen.queryByText(inputValue)).toBeInTheDocument();
    });
  });
});
