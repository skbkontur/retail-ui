
import * as React from 'react';
import { storiesOf } from '@storybook/react';
import Spinner from '../Spinner';

storiesOf('Spinner', module).addDecorator(story => (
    <div style={{ height: 150, width: 200, padding: 4 }}>{story()}</div>
  )).add('Simple', () => <Spinner />);
