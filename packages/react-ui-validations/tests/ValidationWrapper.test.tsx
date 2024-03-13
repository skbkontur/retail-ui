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
}> & { __KONTUR_REACT_UI__: string } = ({ onInputValueChange }) => {
  const [value, setValue] = React.useState<string>('');
  React.useEffect(() => {
    setValue(onInputValueChange());
  }, [value]);

  return <span>{value}</span>;
};
ComboBoxLike.__KONTUR_REACT_UI__ = 'ComboBox';

describe('ValidationWrapper', () => {
  describe('clone props', () => {
    it.each([
      ['ref', jest.fn()],
      ['onFocus', jest.fn()],
      ['onBlur', jest.fn()],
      ['onChange', jest.fn()],
      ['onValueChange', jest.fn()],
    ])('should call `%s` method', async (propName, propValue) => {
      render(
        <ValidationContainer>
          <ValidationWrapper validationInfo={null}>
            <InputLike {...{ [propName]: propValue }} />
          </ValidationWrapper>
        </ValidationContainer>,
      );

      expect(propValue).toHaveBeenCalledTimes(1);
    });

    it('should work when `ref` is hook', async () => {
      let spanRef: React.RefObject<HTMLSpanElement>;
      const InputLikeUseRef = () => {
        spanRef = React.useRef<HTMLSpanElement>(null);
        return (
          <ValidationContainer>
            <ValidationWrapper validationInfo={null}>
              <InputLike ref={spanRef} />
            </ValidationWrapper>
          </ValidationContainer>
        );
      };
      render(<InputLikeUseRef />);
      // @ts-expect-error: Variable 'spanRef' is used before being assigned
      expect(spanRef.current).toBeInTheDocument();
    });

    it('should return value of `onInputValueChange` method in ComboBox', async () => {
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

    it('attribute data-component-validation-level not sets when validation null', () => {
      const { container } = render(
        <ValidationContainer>
          <ValidationWrapper validationInfo={null}>
            <div />
          </ValidationWrapper>
        </ValidationContainer>,
      );

      expect(container.querySelector("[data-component-validation-level]")).not.toBeInTheDocument();
    });

    it('attribute data-component-validation-level sets error on level error', () => {
      const { container } = render(
        <ValidationContainer>
          <ValidationWrapper validationInfo={{ type: 'immediate', message: 'error message', level: 'error' }}>
            <div />
          </ValidationWrapper>
        </ValidationContainer>,
      );

      expect(container.querySelector("[data-component-validation-level='error']")).toBeInTheDocument();
    });

    it('attribute data-component-validation-level sets warning on level warning', () => {
      const { container } = render(
        <ValidationContainer>
          <ValidationWrapper validationInfo={{ type: 'immediate', message: 'warning message', level: 'warning' }}>
            <div />
          </ValidationWrapper>
        </ValidationContainer>,
      );

      expect(container.querySelector("[data-component-validation-level='warning']")).toBeInTheDocument();
    });
  });
});
