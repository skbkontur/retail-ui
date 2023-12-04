import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { LangCodes } from '../../../lib/locale';
import { Button } from '../../Button';
import { SingleToast } from '../SingleToast';
import { ToastDataTids } from '../../Toast';
import { ToastLocaleHelper } from '../../Toast/locale';

describe('ToastView', () => {
  describe('a11y', () => {
    it('has correct aria-label on close button', () => {
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

      userEvent.click(screen.getByRole('button'));

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

      userEvent.click(screen.getByRole('button', { name: buttonName }));

      expect(screen.getByTestId(ToastDataTids.action)).toHaveAttribute('aria-label', ariaLabel);
    });
  });
});
