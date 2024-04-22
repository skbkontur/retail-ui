import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Button } from '../../../components/Button';
import { Toast, ToastDataTids } from '../Toast';
import { componentsLocales as ToastViewLocaleRu } from '../locale/locales/ru';

describe('ToastView', () => {
  describe('a11y', () => {
    it('has correct aria-label on close button', async () => {
      function showComplexNotification() {
        Toast.push(
          'Successfully saved',
          {
            label: 'Cancel',
            handler: () => Toast.push('Canceled'),
          },
          15000,
        );
      }
      render(<Button onClick={showComplexNotification}>Show notification</Button>);

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
        Toast.push(
          'Successfully saved',
          {
            label: 'Cancel',
            handler: () => Toast.push('Canceled'),
            'aria-label': ariaLabel,
          },
          15000,
        );
      }
      render(<Button onClick={showComplexNotification}>{buttonName}</Button>);

      await userEvent.click(screen.getByRole('button', { name: buttonName }));

      expect(screen.getByTestId(ToastDataTids.action)).toHaveAttribute('aria-label', ariaLabel);
    });
  });
});
