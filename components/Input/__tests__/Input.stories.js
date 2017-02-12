// @flow
import React from 'react';
import { storiesOf } from '@kadira/storybook';

import Input from '../Input';

storiesOf('Input', module)
  .add('Small Input', () => (
      <Input size="small" />
  ))
  .add('Medium Input', () => (
      <Input size="medium" />
  ))
  .add('Large Input', () => (
      <Input size="large" />
  ));
