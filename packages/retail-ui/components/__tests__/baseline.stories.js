
import * as React from 'react';
import { storiesOf } from '@storybook/react';

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
      <Button>Ok</Button> <Link>Ok</Link>
    </div>
  ))
  .add('Input and text', () => (
    <div>
      <Input /> Plain text
    </div>
  ))
  .add('Button without content in flex-container', () => (
    <div style={{ display: 'flex', alignItems: 'baseline' }}>
      <Button /> Plain text
    </div>
  ))
  .add('Button with content in flex-container', () => (
    <div style={{ display: 'flex', alignItems: 'baseline' }}>
      <Button children="Hello" /> Plain text
    </div>
  ));
