import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Button } from '../../../components/Button';
import { Toast, ToastDataTids } from '../Toast';
import { TOAST_CLOSE_BUTTON_ARIA_LABEL } from '../ToastView';

describe('ToastView', () => {
  it('has correct aria-label on close button', () => {
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

    userEvent.click(screen.getByRole('button'));

    expect(screen.getByTestId(ToastDataTids.close)).toHaveAttribute('aria-label', TOAST_CLOSE_BUTTON_ARIA_LABEL);
  });
});
