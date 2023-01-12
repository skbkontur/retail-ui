import React from 'react';
import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';
import { Input } from '@skbkontur/react-ui';

import { tooltip, text } from '../src/ErrorRenderer';
import { ValidationInfo, ValidationWrapper } from '../src/ValidationWrapper';
import { Nullable } from '../typings/Types';

const validate = (): Nullable<ValidationInfo> => {
  return { message: 'Только цифры', type: 'immediate' };
};

describe('ErrorRenderer', () => {
  it('should pass custom data-tid to tooltip', () => {
    const dataTid = 'data-tid';
    render(
      <ValidationWrapper validationInfo={validate()} renderMessage={tooltip('left bottom', { dataTid })}>
        <Input />
      </ValidationWrapper>,
    );

    userEvent.click(screen.getByRole('textbox'));

    expect(screen.getByTestId(dataTid)).toBeInTheDocument();
  });

  it('should pass custom data-tid to text', () => {
    const dataTid = 'data-tid';
    render(
      <ValidationWrapper validationInfo={validate()} renderMessage={text('right', { dataTid })}>
        <Input />
      </ValidationWrapper>,
    );

    userEvent.click(screen.getByRole('textbox'));

    expect(screen.getByTestId(dataTid)).toBeInTheDocument();
  });

  it('should not render text error message when validationInfo is not provided', () => {
    const input = render(
      <ValidationWrapper validationInfo={null} renderMessage={text('right')}>
        <Input />
      </ValidationWrapper>,
    );

    userEvent.click(screen.getByRole('textbox'));

    expect(input.container.querySelector('[data-validation-message="text"]')).toBeEmptyDOMElement();
  });

  it('should not render tooltip error message when validationInfo is not provided', () => {
    const dataTid = 'data-tid';
    render(
      <ValidationWrapper validationInfo={null} renderMessage={tooltip('left bottom', { dataTid })}>
        <Input />
      </ValidationWrapper>,
    );

    userEvent.click(screen.getByRole('textbox'));

    expect(screen.queryByTestId(dataTid)).not.toBeInTheDocument();
  });
});
