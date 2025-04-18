import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { LangCodes } from '../../../lib/locale';
import { Button } from '../../Button';
import { SingleToast } from '../SingleToast';
import { ToastDataTids } from '../../Toast';
import { ToastLocaleHelper } from '../../Toast/locale';

describe('SingleToast', () => {
  describe('a11y', () => {
    it('has correct aria-label on close button', async () => {
      function showComplexNotification() {
        SingleToast.push(
          'Successfully saved',
          {
            label: 'Cancel',
            handler: () => SingleToast.push('Canceled'),
          },
          15000,
        );
      }
      render(
        <>
          <SingleToast />
          <Button onClick={showComplexNotification}>Show notification</Button>
        </>,
      );

      await userEvent.click(screen.getByRole('button'));

      expect(screen.getByTestId(ToastDataTids.close)).toHaveAttribute(
        'aria-label',
        ToastLocaleHelper.get(LangCodes.ru_RU).closeButtonAriaLabel,
      );
    });

    it('sets value for aria-label attribute (action button)', async () => {
      const ariaLabel = 'aria-label';
      const buttonName = 'button';
      function showComplexNotification() {
        SingleToast.push(
          'Successfully saved',
          {
            label: 'Cancel',
            handler: () => SingleToast.push('Canceled'),
            'aria-label': ariaLabel,
          },
          15000,
        );
      }
      render(
        <>
          <SingleToast />
          <Button onClick={showComplexNotification}>{buttonName}</Button>
        </>,
      );

      await userEvent.click(screen.getByRole('button', { name: buttonName }));

      expect(screen.getByTestId(ToastDataTids.action)).toHaveAttribute('aria-label', ariaLabel);
    });
  });

  it('change showCloseIcon in SingleInput', async () => {
    render(
      <>
        <SingleToast />
        <Button onClick={() => SingleToast.push('Static SingleToast', null, 5000, true)}>
          Показать статический тост c крестиком
        </Button>
        <Button onClick={() => SingleToast.push('Static SingleToast', null, 5000, false)}>
          Показать статический тост без крестика
        </Button>
      </>,
    );

    const buttons = screen.getAllByRole('button');

    await userEvent.click(buttons[0]);
    expect(screen.queryByTestId(ToastDataTids.close)).toBeInTheDocument();

    await userEvent.click(buttons[1]);
    expect(screen.queryByTestId(ToastDataTids.close)).not.toBeInTheDocument();
  });
});
