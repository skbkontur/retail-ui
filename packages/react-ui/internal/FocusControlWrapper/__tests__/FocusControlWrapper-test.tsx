import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { FocusControlWrapper } from '../FocusControlWrapper';
import { CommonWrapper } from '../../CommonWrapper';

interface Props {
  disabled?: boolean;
  onBlurWhenDisabled(): void;
  onBlur?: React.FocusEventHandler;
  onFocus?: React.FocusEventHandler;
}

const FocusControlTestWrapper = ({ disabled, onBlurWhenDisabled, onBlur, onFocus }: Props) => (
  <FocusControlWrapper onBlurWhenDisabled={onBlurWhenDisabled}>
    <input disabled={disabled} onBlur={onBlur} onFocus={onFocus} />
  </FocusControlWrapper>
);

describe('FocusControlWrapper', () => {
  it("onblur event doesn't fire when input disabled [bug in react https://github.com/facebook/react/issues/9142]", async () => {
    const getInput = () => screen.getByRole('textbox');

    const handleBlur = jest.fn(() => (getInput().style.border = 'none'));
    const handleFocus = jest.fn(() => (getInput().style.border = '1px solid blue'));

    render(<input disabled={false} onBlur={handleBlur} onFocus={handleFocus} />);

    const input = getInput();

    await userEvent.click(input);
    expect(handleFocus).toHaveBeenCalledTimes(1);
    expect(input).toHaveFocus();

    input.setAttribute('disabled', '');
    await userEvent.tab();
    expect(handleBlur).not.toHaveBeenCalled();
    expect(input).toHaveStyle('border: 1px solid blue;');
  });

  it('works correct with common wrapper', () => {
    const handleBlurWhenDisabled = jest.fn();
    render(
      <CommonWrapper
        data-tid="CommonWrapper"
        data-commonwrapper="true"
        className="CommonWrapper"
        style={{ padding: 10 }}
      >
        <FocusControlWrapper onBlurWhenDisabled={handleBlurWhenDisabled}>
          <input data-tid="Input" data-input="true" className="Input" style={{ margin: 10 }} />
        </FocusControlWrapper>
      </CommonWrapper>,
    );

    const input = screen.getByRole('textbox');
    expect(input).toBeInTheDocument();
    expect(input).toHaveClass('Input CommonWrapper');
    expect(input).toHaveAttribute('data-commonwrapper', 'true');
    expect(input).toHaveAttribute('data-input', 'true');
    expect(input).toHaveAttribute('data-tid', 'CommonWrapper');
    expect(input).toHaveStyle('margin: 10px; padding: 10px;');
  });

  it('called onBlurWhenDisabled only when disabled', async () => {
    const handleFocus = jest.fn();
    const handleBlur = jest.fn();
    const handleBlurWhenDisabled = jest.fn();

    const { rerender } = render(
      <FocusControlTestWrapper
        disabled={false}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onBlurWhenDisabled={handleBlurWhenDisabled}
      />,
    );
    expect(handleBlurWhenDisabled).not.toHaveBeenCalled();

    const element = screen.getByRole('textbox');
    await userEvent.click(element);
    expect(handleFocus).toHaveBeenCalledTimes(1);
    await userEvent.tab();
    expect(handleBlur).toHaveBeenCalledTimes(1);
    expect(handleBlurWhenDisabled).not.toHaveBeenCalled();

    await userEvent.click(element);
    expect(handleFocus).toHaveBeenCalledTimes(2);
    rerender(
      <FocusControlTestWrapper
        disabled
        onFocus={handleFocus}
        onBlur={handleBlur}
        onBlurWhenDisabled={handleBlurWhenDisabled}
      />,
    );
    expect(handleBlurWhenDisabled).toHaveBeenCalledTimes(1);
  });
});
