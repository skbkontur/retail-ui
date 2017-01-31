// @flow
import React from 'react';
import {storiesOf} from '@kadira/storybook';

import Button from '../../components/Button';
import Input from '../../components/Input';

storiesOf('Input', module).
  add('Small Input and small Button', () => (
    <div>
      <Input size="small" />
      {' '}
      <Button size="small">Small</Button>
    </div>
  )).
  add('Medium Input and Medium Button', () => (
    <div>
      <Input size="medium" />
      {' '}
      <Button size="medium">Medium</Button>
    </div>
  )).
  add('Large Input and Large Button', () => (
    <div>
      <Input size="large" />
      {' '}
      <Button size="large">Large</Button>
    </div>
  ));
