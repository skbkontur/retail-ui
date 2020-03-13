import React from 'react';
import { action } from '@storybook/addon-actions';

import { ToastView as Toast } from '../ToastView';

export default { title: 'ToastView', parameters: { creevey: { captureElement: "[data-tid='ToastView__root']" } } };

export const SimpleToast = () => <Toast>Changes saved</Toast>;
SimpleToast.story = { name: 'simple toast' };

export const WithAction = () => (
  <Toast action={{ label: 'Cancel', handler: action('action') }} onClose={action('close')}>
    Changes saved
  </Toast>
);
WithAction.story = { name: 'with action' };
