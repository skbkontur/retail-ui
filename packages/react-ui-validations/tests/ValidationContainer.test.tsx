import React from 'react';
import { act, render, screen } from '@testing-library/react';
import {
  Button,
  ComboBox,
  DatePicker,
  FileUploader,
  Input,
  RadioGroup,
  Switcher,
  TokenInput,
  TokenInputType,
} from '@skbkontur/react-ui';

import { FocusMode, ValidationContainer, ValidationInfo, ValidationContainerProps, ValidationWrapper } from '../src';
import { smoothScrollIntoView } from '../src/smoothScrollIntoView';

describe('ValidationContainer', () => {
  it('renders passed data-tid on container', () => {
    render(
      <ValidationContainer data-tid="passed-container">
        <div />
      </ValidationContainer>,
    );

    expect(screen.getByTestId('passed-container')).toBeInTheDocument();
  });

  it('renders passed children', () => {
    render(
      <ValidationContainer>
        <div data-tid="passed-div" />
      </ValidationContainer>,
    );

    expect(screen.getByTestId('passed-div')).toBeInTheDocument();
  });

  describe('scroll into view on submit', () => {
    beforeEach(() => {
      (smoothScrollIntoView as jest.Mock).mockReset();
    });

    const renderValidationContainer = (
      input: React.ReactElement,
      props?: ValidationContainerProps,
    ): React.RefObject<ValidationContainer> => {
      const containerRef = React.createRef<ValidationContainer>();
      render(
        <ValidationContainer ref={containerRef} {...props}>
          <ValidationWrapper validationInfo={{ message: 'message', level: 'error' }}>{input}</ValidationWrapper>
        </ValidationContainer>,
      );
      return containerRef;
    };

    it('doesn`t get called if it is disabled', async () => {
      const containerRef = renderValidationContainer(<Input />, { disableSmoothScroll: true });

      await containerRef.current?.submit();

      expect(smoothScrollIntoView).not.toBeCalled();
    });

    describe('gets called if itsn`t disabled', () => {
      it.each([
        ['Input', <Input key="Input" />],
        ['TokenInput', <TokenInput type={TokenInputType.WithoutReference} key="TokenInput" />],
        ['FileUploader', <FileUploader key="FileUploader" />],
        ['Switcher', <Switcher items={[]} key="Switcher" />],
        ['DatePicker', <DatePicker onValueChange={() => null} key="DatePicker" />],
        ['ComboBox', <ComboBox getItems={() => Promise.resolve([])} key="ComboBox" />],
        ['RadioGroup', <RadioGroup items={[]} key="RadioGroup" />],
      ])('%s', async (_, input) => {
        const containerRef = renderValidationContainer(input, { disableSmoothScroll: false });

        await containerRef.current?.submit();

        expect(smoothScrollIntoView).toBeCalled();
      });
    });
  });

  describe('on warning level', () => {
    const renderValidationContainer = (
      input: React.ReactElement,
      props?: ValidationContainerProps,
    ): React.RefObject<ValidationContainer> => {
      const containerRef = React.createRef<ValidationContainer>();
      render(
        <ValidationContainer ref={containerRef} {...props}>
          <ValidationWrapper validationInfo={{ message: 'warning message', level: 'warning' }}>
            {input}
          </ValidationWrapper>
        </ValidationContainer>,
      );
      return containerRef;
    };

    it('validate form', async () => {
      const containerRef = renderValidationContainer(<Input />);

      const result = await containerRef.current?.validate();

      expect(result).toEqual(true);
    });

    it('with autofocus', async () => {
      const containerRef = renderValidationContainer(<Input />);

      await containerRef.current?.validate({ focusMode: FocusMode.ErrorsAndWarnings });

      expect(screen.getByRole('textbox')).toHaveFocus();
    });

    it('without autofocus', async () => {
      const containerRef = renderValidationContainer(<Input />);

      await containerRef.current?.validate();

      expect(screen.getByRole('textbox')).not.toHaveFocus();
    });

    it('without autofocus', async () => {
      const containerRef = renderValidationContainer(<Input />);

      await containerRef.current?.validate(false);

      expect(screen.getByRole('textbox')).not.toHaveFocus();
    });
  });

  describe('on validation updated', () => {
    const renderValidationContainer = (
      children: React.ReactElement,
      props?: ValidationContainerProps,
    ): React.RefObject<ValidationContainer> => {
      const containerRef = React.createRef<ValidationContainer>();
      render(
        <ValidationContainer ref={containerRef} {...props}>
          {children}
        </ValidationContainer>,
      );
      return containerRef;
    };
    const validate = (value: string) => {
      return value.includes('bad') ? ({ message: 'Ошибка', type: 'submit' } as ValidationInfo) : null;
    };

    it('works with one field', async () => {
      const ValidationForm = () => {
        const [value1, setValue1] = React.useState('bad');

        return (
          <>
            <ValidationWrapper validationInfo={validate(value1)}>
              <Input value={value1} onValueChange={setValue1} />
            </ValidationWrapper>
            <button onClick={() => setValue1('good')}>Repair</button>
          </>
        );
      };

      const onValidationUpdated = jest.fn();
      const containerRef = renderValidationContainer(<ValidationForm />, { onValidationUpdated });
      await containerRef.current?.submit();
      expect(onValidationUpdated).toBeCalledWith(false);

      act(() => screen.getByRole('button', { name: 'Repair' }).click());
      expect(onValidationUpdated).toBeCalledWith(true);
    });

    it('works with multiple fields', async () => {
      const ValidationForm = () => {
        const [value1, setValue1] = React.useState('bad');
        const [value2, setValue2] = React.useState('bad');
        const validationContainerRef = React.useRef<ValidationContainer>(null);

        return (
          <>
            <ValidationWrapper validationInfo={validate(value1)}>
              <Input value={value1} onValueChange={setValue1} />
            </ValidationWrapper>
            <ValidationWrapper validationInfo={validate(value2)}>
              <Input value={value2} onValueChange={setValue2} />
            </ValidationWrapper>
            <button onClick={() => setValue1('good')}>Partial Repair</button>
            <button
              onClick={() => {
                setValue1('good');
                setValue2('good');
              }}
            >
              Repair
            </button>
            <Button onClick={() => validationContainerRef.current?.submit()}>Submit</Button>
          </>
        );
      };

      const onValidationUpdated = jest.fn();
      const containerRef = renderValidationContainer(<ValidationForm />, { onValidationUpdated });
      await containerRef.current?.submit();

      expect(onValidationUpdated).toBeCalledWith(false);

      act(() => screen.getByRole('button', { name: 'Partial Repair' }).click());
      expect(onValidationUpdated).toBeCalledWith(false);

      act(() => screen.getByRole('button', { name: 'Repair' }).click());
      expect(onValidationUpdated).toBeCalledWith(true);
    });
  });
});
