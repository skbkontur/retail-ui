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

  it('should pass custom data-tid to text', () => {
    const dataTid = 'data-tid';
    render(
      <ValidationWrapper data-tid={dataTid} validationInfo={validate()} renderMessage={text('right')}>
        <Input />
      </ValidationWrapper>,
    );

    userEvent.click(screen.getByRole('textbox'));

    expect(screen.getByTestId(dataTid)).toBeInTheDocument();
  });

  it('should not render text error message when validationInfo is not provided', () => {
    const dataTid = 'data-tid';
    render(
      <ValidationWrapper data-tid={dataTid} validationInfo={null} renderMessage={text('right')}>
        <Input />
      </ValidationWrapper>,
    );

    userEvent.click(screen.getByRole('textbox'));

    expect(screen.getByTestId(dataTid)).toBeEmptyDOMElement();
  });

  it('should not render tooltip error message when validationInfo is not provided', () => {
    const dataTid = 'data-tid';
    render(
      <ValidationWrapper data-tid={dataTid} validationInfo={null} renderMessage={tooltip('left bottom')}>
        <Input />
      </ValidationWrapper>,
    );

    userEvent.click(screen.getByRole('textbox'));

    expect(screen.queryByTestId(dataTid)).not.toBeInTheDocument();
  });
});
