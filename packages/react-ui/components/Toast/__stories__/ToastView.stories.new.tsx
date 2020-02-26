import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { ToastView as Toast } from '../ToastView';

export default {
  title: 'ToastView',
};

export const SimpleToast = () => <Toast>Changes saved</Toast>;

export const ToastWithAction = () => (
  <Toast action={{ label: 'Cancel', handler: action('action') }} onClose={action('close')}>
    Changes saved
  </Toast>
);
