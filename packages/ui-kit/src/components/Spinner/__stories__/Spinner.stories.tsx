import * as React from 'react';
import { storiesOf } from '@storybook/react';
import Spinner from '../Spinner';

storiesOf('Spinner', module)
  .add('Just spin', () => <Spinner />)
  .add('With custom size', () => <Spinner size={32} />);
