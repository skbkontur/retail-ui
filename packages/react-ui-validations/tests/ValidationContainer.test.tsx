import React from 'react';
import { render, screen } from '@testing-library/react';
import {
  ComboBox,
  DatePicker,
  FileUploader,
  Input,
  RadioGroup,
  Switcher,
  TokenInput,
  TokenInputType,
} from '@skbkontur/react-ui';

import {
  FocusMode,
  ValidationContainer,
  ValidationContainerProps,
  ValidationsFeatureFlagsContext,
  ValidationWrapper,
} from '../src';
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
});
