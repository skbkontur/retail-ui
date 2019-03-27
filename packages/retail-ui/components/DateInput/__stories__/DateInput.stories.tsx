import React from 'react';
import { storiesOf } from '@storybook/react';
import DateInput from '../DateInput';

storiesOf('DateInput', module)
  .add('simple', () => <DateInput value="01.02.2017" />)
  .add('disabled', () => <DateInput disabled value="01.02.2017" />)
  .add('with width', () => <DateInput width="50px" value="01.02.2017" />);
