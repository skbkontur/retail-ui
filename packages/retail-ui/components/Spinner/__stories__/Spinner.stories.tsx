import * as React from 'react';
import { storiesOf } from '@storybook/react';
import Spinner from '../Spinner';

const reactNodeCaption = (
  <div>
    <Spinner type="mini" caption={null} /> <span style={{ color: 'tomato', fontSize: '1.3em' }}>З</span>
    агрузка ...
  </div>
);

storiesOf('Spinner', module)
  .addDecorator(story => <div style={{ height: 150, width: 200, padding: 4 }}>{story()}</div>)
  .add('Normal', () => <Spinner />)
  .add('Big', () => <Spinner type="big" />)
  .add('Mini', () => <Spinner type="mini" />)
  .add('Mini dimmed', () => <Spinner type="mini" dimmed />)
  .add('With ReactNode in caption', () => <Spinner type="big" caption={reactNodeCaption} />);
