import { storiesOf } from '@storybook/react';
import React from 'react';

import Checkbox from '../Checkbox';

storiesOf('Checkbox', module)
  .add('simple', () => <Checkbox>Hello</Checkbox>)
  .add('multiline', () => (
    <Checkbox>
      There's only one thing<br />to do at a moment like<br />this: strut!
    </Checkbox>
  ))
  .add('disabled', () => <Checkbox disabled>Hello</Checkbox>);
