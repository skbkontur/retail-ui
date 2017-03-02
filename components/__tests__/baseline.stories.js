// @flow
import React from 'react';
import { storiesOf } from '@kadira/storybook';

import Button from '../Button';
import Link from '../Link';
import Input from '../Input';

storiesOf('Baseline', module)
  .add('Button and text', () => (
    <div>
      <Button>Ok</Button> Simple text
    </div>
  ))
  .add('Medium Button and text', () => (
    <div>
      <Button size="medium">yay</Button> Simple text
    </div>
  ))
  .add('Large Button and text', () => (
    <div>
      <Button size="large">Yay</Button> Simple text
    </div>
  ))
  .add('Button and link', () => (
    <div>
      <Button>Ok</Button>
      {' '}
      <Link>Ok</Link>
    </div>
  ))
  .add('Input and text', () => (
    <div>
      <Input /> Plain text
    </div>
  ));
