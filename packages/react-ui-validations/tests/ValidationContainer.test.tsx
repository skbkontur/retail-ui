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

import { ValidationContainer, ValidationContainerProps, ValidationWrapper } from '../src';
import { smoothScrollIntoView } from '../src/smoothScrollIntoView';

describe('ValidationContainer', () => {
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
});
