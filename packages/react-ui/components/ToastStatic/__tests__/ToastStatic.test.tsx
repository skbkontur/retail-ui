import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Button } from '../../../components/Button';
import { ToastStatic } from '../ToastStatic';
import { ToastDataTids } from '../../../components/Toast';
import { componentsLocales as ToastViewLocaleRu } from '../../../components/Toast/locale/locales/ru';

describe('ToastView', () => {
  describe('a11y', () => {
    it('has correct aria-label on close button', () => {
      function showComplexNotification() {
        ToastStatic.push(
          'Successfully saved',
          {
            label: 'Cancel',
            handler: () => ToastStatic.push('Canceled'),
          },
          15000,
        );
      }
      render(
        <>
          <ToastStatic />
          <Button onClick={showComplexNotification}>Show notification</Button>
        </>,
      );

      userEvent.click(screen.getByRole('button'));

      expect(screen.getByTestId(ToastDataTids.close)).toHaveAttribute(
        'aria-label',
        ToastViewLocaleRu.closeButtonAriaLabel,
      );
    });

    it('sets value for aria-label attribute (action button)', async () => {
      const ariaLabel = 'aria-label';
      const buttonName = 'button';
      function showComplexNotification() {
        ToastStatic.push(
          'Successfully saved',
          {
            label: 'Cancel',
            handler: () => ToastStatic.push('Canceled'),
            'aria-label': ariaLabel,
          },
          15000,
        );
      }
      render(
        <>
          <ToastStatic />
          <Button onClick={showComplexNotification}>{buttonName}</Button>
        </>,
      );

      userEvent.click(screen.getByRole('button', { name: buttonName }));

      expect(screen.getByTestId(ToastDataTids.action)).toHaveAttribute('aria-label', ariaLabel);
    });
  });
});
