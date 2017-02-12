// @flow
import React from 'react';
import { storiesOf } from '@kadira/storybook';
import Checkbox from '../Checkbox';

storiesOf('Checkbox', module)
  .add('unchecked', () => <Checkbox>Unchecked</Checkbox>)
  .add('checked', () => <Checkbox checked>Checked</Checkbox>)
  .add('disabled', () => <Checkbox disabled>Disabled</Checkbox>)
  .add('disabled checked', () => (
    <Checkbox disabled checked>Disabled and checked</Checkbox>
  ))
  .add('error', () => <Checkbox error>Error</Checkbox>)
  .add('with mouse enter/leave handlers', () => (
    <Checkbox
      onMouseEnter={() => console.count('enter')}
      onMouseLeave={() => console.count('leave')}
    >
      Hover me
    </Checkbox>
  ));
