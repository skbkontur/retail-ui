// @flow
import * as React from 'react';
import { storiesOf } from '@storybook/react';
import Link from '../Link';
import Toast from '../../Toast';

storiesOf('Link', module)
  .add('Simple', () => <Link>Simple Link</Link>)
  .add('With Icon', () => <Link icon="ok">Simple Link</Link>)
  .add('Danger', () =>
    <Link icon="ok" use="danger">
      Simple Link
    </Link>
  )
  .add('Grayed', () => <Link use="grayed">Simple link</Link>)
  .add('Disabled', () => <Link disabled>Simple link</Link>)
  .add('With onClick', () =>
    <Link onClick={() => Toast.push('Clicked!')}>Simple Link</Link>
  );
