import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Button } from '../../../components/Button';
import { ToastDataTids } from '../Toast';
import { componentsLocales as ToastViewLocaleRu } from '../locale/locales/ru';
import { SingleToast } from '../../../components/SingleToast';

describe('ToastView', () => {
  describe('a11y', () => {
    it('has correct aria-label on close button', async () => {
      function showComplexNotification() {
        SingleToast.push('Successfully saved', {
          action: {
            label: 'Cancel',
            handler: () => SingleToast.push('Canceled'),
          },
          showTime: 15_000,
        });
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
        ToastViewLocaleRu.closeButtonAriaLabel,
      );
    });

    it('sets value for aria-label attribute (action button)', async () => {
      const ariaLabel = 'aria-label';
      const buttonName = 'button';
      function showComplexNotification() {
        SingleToast.push('Successfully saved', {
          action: {
            label: 'Cancel',
            handler: () => SingleToast.push('Canceled'),
            'aria-label': ariaLabel,
          },
          showTime: 15_000,
        });
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
});
