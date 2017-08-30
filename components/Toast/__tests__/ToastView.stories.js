// @flow
import * as React from 'react';
import { storiesOf, action } from '@storybook/react';
import Toast from '../ToastView';

storiesOf('ToastView', module)
  .add('simple toast', () => <Toast>Changes saved</Toast>)
  .add('with action', () =>
    <Toast
      action={{ label: 'Cancel', handler: action('action') }}
      onClose={action('close')}
    >
      Changes saved
    </Toast>
  );
