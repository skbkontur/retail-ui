// @flow
import React from 'react';
import {storiesOf, action} from '@kadira/storybook';
import Toast from '../../components/Toast/ToastView';

storiesOf('ToastView', module).
  add('simple toast', () => (
    <Toast>Changes saved</Toast>
  )).
  add('with action', () => (
    <Toast
      action={{label: 'Cancel', handler: action('action')}}
      onClose={action('close')}
    >
      Changes saved
    </Toast>
  ));
