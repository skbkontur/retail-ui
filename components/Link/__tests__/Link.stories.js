// @flow
import React from 'react';
import { storiesOf } from '@kadira/storybook';
import Link from '../Link';
import Toast from '../../Toast';

storiesOf('Link', module)
  .add('Simple', () => (
    <Link>Simple Link</Link>
  ))
  .add('With Icon', () => (
    <Link icon="ok">Simple Link</Link>
  ))
  .add('Danger', () => (
    <Link icon="ok" use="danger">Simple Link</Link>
  ))
  .add('With onClick', () => (
    <Link onClick={() => Toast.push('Clicked!')}>Simple Link</Link>
  ));
