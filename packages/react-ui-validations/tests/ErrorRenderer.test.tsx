import { Input } from '@skbkontur/react-ui/components/Input/Input';
import { fireEvent, render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import React from 'react';
import { afterEach, vi } from 'vitest';

import { text, tooltip } from '../src/ErrorRenderer.js';
import { ValidationTooltip } from '../src/ValidationTooltip.js';
import type { ValidationInfo } from '../src/ValidationWrapper.js';
import { ValidationWrapper } from '../src/ValidationWrapper.js';
import type { RenderErrorMessage } from '../src/ValidationWrapperInternal.js';
import type { Nullable } from '../typings/Types.js';

const validate = (): Nullable<ValidationInfo> => {
  return { message: 'Только цифры', type: 'immediate' };
};

const CustomInput = (props: React.ComponentProps<typeof Input>) => <Input {...props} />;

const customTooltip: RenderErrorMessage = (control, hasError, validation) => (
  <ValidationTooltip error={hasError} render={() => validation?.message}>
    {control}
  </ValidationTooltip>
);

afterEach(() => {
  vi.restoreAllMocks();
});

describe('ErrorRenderer', () => {
  it('should pass custom data-tid to tooltip', async () => {
    const dataTid = 'data-tid';
    render(
      <ValidationWrapper data-tid={dataTid} validationInfo={validate()} renderMessage={tooltip('left bottom')}>
        <Input />
      </ValidationWrapper>,
    );

    await userEvent.click(screen.getByRole('textbox'));

    expect(screen.getByTestId(dataTid)).toBeInTheDocument();
  });

  it('should pass custom data-tid to text', async () => {
    const dataTid = 'data-tid';
    render(
      <ValidationWrapper data-tid={dataTid} validationInfo={validate()} renderMessage={text('right')}>
        <Input />
      </ValidationWrapper>,
    );

    await userEvent.click(screen.getByRole('textbox'));

    expect(screen.getByTestId(dataTid)).toBeInTheDocument();
  });

  it('should not render text error message when validationInfo is not provided', async () => {
    const dataTid = 'data-tid';
    render(
      <ValidationWrapper data-tid={dataTid} validationInfo={null} renderMessage={text('right')}>
        <Input />
      </ValidationWrapper>,
    );

    await userEvent.click(screen.getByRole('textbox'));

    expect(screen.getByTestId(dataTid)).toBeEmptyDOMElement();
  });

  it('should not render tooltip error message when validationInfo is not provided', async () => {
    const dataTid = 'data-tid';
    render(
      <ValidationWrapper data-tid={dataTid} validationInfo={null} renderMessage={tooltip('left bottom')}>
        <Input />
      </ValidationWrapper>,
    );

    await userEvent.click(screen.getByRole('textbox'));

    expect(screen.queryByTestId(dataTid)).not.toBeInTheDocument();
  });

  it.each([
    ['built-in tooltip renderer', tooltip('left middle')],
    ['custom ValidationTooltip renderer', customTooltip],
  ])('anchors %s to the rendered root of a function component', async (_, renderMessage) => {
    const addEventListener = vi.spyOn(Element.prototype, 'addEventListener');

    render(
      <ValidationWrapper validationInfo={validate()} renderMessage={renderMessage}>
        <CustomInput />
      </ValidationWrapper>,
    );

    const textbox = screen.getByRole('textbox');
    const controlRoot = textbox.closest('label');
    const validationWrapper = controlRoot?.parentElement;

    expect(controlRoot).not.toBeNull();
    expect(validationWrapper).not.toBeNull();
    expect(validationWrapper).toHaveStyle({ display: 'inline' });
    expect(validationWrapper).toContainElement(controlRoot);
    expect(validationWrapper?.children).toHaveLength(1);

    const mouseEnterTargets = addEventListener.mock.calls.flatMap((call, index) =>
      call[0] === 'mouseenter' ? [addEventListener.mock.contexts[index]] : [],
    );
    expect(mouseEnterTargets).toContain(controlRoot);
    expect(mouseEnterTargets).not.toContain(validationWrapper);

    fireEvent.mouseEnter(controlRoot as HTMLElement);

    expect(await screen.findByText('Только цифры')).toBeInTheDocument();
  });

  it('leaves the text renderer DOM unchanged', () => {
    render(
      <ValidationWrapper data-tid="validation-text" validationInfo={validate()} renderMessage={text('right')}>
        <CustomInput />
      </ValidationWrapper>,
    );

    const message = screen.getByTestId('validation-text');
    expect(message).toHaveAttribute('data-validation-message', 'text');
    expect(message.parentElement).toHaveStyle({ display: 'inline-block' });
  });
});
