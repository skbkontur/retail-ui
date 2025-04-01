import React from 'react';
import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeFactory } from '@skbkontur/react-ui';

import type { ValidationInfo } from '../src';
import { ValidationContainer, ValidationWrapper, text } from '../src';
import { ThemeContext } from '../src/ReactUiDetection';

function setup(jsx: any) {
  return {
    user: userEvent.setup(),
    ...render(jsx),
  };
}

const InputLike = React.forwardRef<
  HTMLInputElement,
  {
    onFocus?: () => void;
    onBlur?: () => void;
    onChange?: () => void;
    onValueChange?: () => void;
    autoCall?: boolean;
    'data-tid'?: string;
  }
>(function InputLike({ onFocus, onBlur, onChange, onValueChange, autoCall }, ref) {
  autoCall && onFocus?.();
  autoCall && onBlur?.();
  autoCall && onChange?.();
  autoCall && onValueChange?.();

  return <input ref={ref} {...{ onFocus, onBlur, onChange }} />;
});

const ComboBoxLike = React.forwardRef<
  HTMLSpanElement,
  {
    onInputValueChange: () => string;
  }
>(function ComboBoxLike({ onInputValueChange }, ref) {
  const [value, setValue] = React.useState<string>('');
  React.useEffect(() => {
    setValue(onInputValueChange());
  }, [value]);

  return <span ref={ref}>{value}</span>;
});
// @ts-expect-error: required to detect ComboBox
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
            <InputLike {...{ [propName]: propValue }} autoCall />
          </ValidationWrapper>
        </ValidationContainer>,
      );

      expect(propValue).toHaveBeenCalledTimes(1);
    });

    it('should work when `ref` is hook', async () => {
      let inputLikeRef: React.RefObject<HTMLInputElement>;
      const InputLikeUseRef = () => {
        inputLikeRef = React.useRef<HTMLInputElement>(null);
        return (
          <ValidationContainer>
            <ValidationWrapper validationInfo={null}>
              <InputLike ref={inputLikeRef} />
            </ValidationWrapper>
          </ValidationContainer>
        );
      };
      render(<InputLikeUseRef />);
      // @ts-expect-error: Variable 'spanRef' is used before being assigned
      expect(inputLikeRef.current).toBeInTheDocument();
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
  });

  describe('update `validationInfo` prop', () => {
    const ValidationInfoUpdater = ({
      initialValidationInfo,
      nextValidationInfo,
      children,
    }: React.PropsWithChildren<{
      initialValidationInfo: ValidationInfo;
      nextValidationInfo: ValidationInfo;
    }>) => {
      const [validationInfo, setValidationInfo] = React.useState<ValidationInfo>(initialValidationInfo);
      const inputLikeRef = React.useRef<HTMLInputElement>(null);

      return (
        <ThemeContext.Provider
          value={ThemeFactory.create({
            validationsTextColorWarning: 'orange',
            validationsTextColorError: 'red',
          })}
        >
          <ValidationContainer>
            <ValidationWrapper validationInfo={validationInfo} renderMessage={text('bottom')}>
              <InputLike ref={inputLikeRef} />
            </ValidationWrapper>
            {children}
          </ValidationContainer>
          <button
            data-tid="update-validation-info"
            onClick={() => {
              setValidationInfo(nextValidationInfo);
            }}
          >
            button
          </button>
        </ThemeContext.Provider>
      );
    };

    it('should change `level`', async () => {
      const validationInfo: ValidationInfo = {
        type: 'immediate',
        level: 'error',
        message: 'message',
      };

      render(
        <ValidationInfoUpdater
          initialValidationInfo={validationInfo}
          nextValidationInfo={{
            ...validationInfo,
            level: 'warning',
          }}
        />,
      );

      expect(screen.queryByText('message')).toHaveStyle('color: red');

      act(() => {
        screen.getByTestId('update-validation-info').click();
      });

      expect(screen.queryByText('message')).toHaveStyle('color: orange');
    });

    it('should change `type`', async () => {
      const validationInfo: ValidationInfo = {
        type: 'submit',
        message: 'message',
      };

      render(
        <ValidationInfoUpdater
          initialValidationInfo={validationInfo}
          nextValidationInfo={{
            ...validationInfo,
            type: 'immediate',
          }}
        />,
      );

      expect(screen.queryByText('message')).not.toBeInTheDocument();

      act(() => {
        screen.getByRole('button').click();
      });

      expect(screen.queryByText('message')).toBeInTheDocument();
    });

    it('should change `message`', async () => {
      const validationInfo: ValidationInfo = {
        type: 'immediate',
        message: 'message 1',
      };
      render(
        <ValidationInfoUpdater
          initialValidationInfo={validationInfo}
          nextValidationInfo={{
            ...validationInfo,
            message: 'message 2',
          }}
        />,
      );

      expect(screen.queryByText('message 1')).toBeInTheDocument();
      expect(screen.queryByText('message 2')).not.toBeInTheDocument();

      act(() => {
        screen.getByRole('button').click();
      });

      expect(screen.queryByText('message 1')).not.toBeInTheDocument();
      expect(screen.queryByText('message 2')).toBeInTheDocument();
    });

    it('should change `independent`', async () => {
      const validationInfo: ValidationInfo = {
        type: 'lostfocus',
        message: 'message 1',
        independent: true,
      };
      const { user } = setup(
        <ValidationInfoUpdater
          initialValidationInfo={validationInfo}
          nextValidationInfo={{
            ...validationInfo,
            independent: false,
          }}
        >
          <ValidationWrapper
            validationInfo={{
              ...validationInfo,
              message: 'message 2',
              independent: false,
            }}
            renderMessage={text('bottom')}
          >
            <InputLike />
          </ValidationWrapper>
        </ValidationInfoUpdater>,
      );

      screen.getAllByRole('textbox')[0]?.focus();
      await user.click(document.body);

      expect(screen.queryByText('message 1')).toBeInTheDocument();
      expect(screen.queryByText('message 2')).not.toBeInTheDocument();

      await user.click(screen.getByRole('button'));
      screen.getAllByRole('textbox').at(0)?.focus();
      await user.click(document.body);

      expect(screen.queryByText('message 1')).toBeInTheDocument();
      expect(screen.queryByText('message 2')).toBeInTheDocument();
    });
  });
});
