import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { SpinnerOld } from '../SpinnerOld';
import { OkIcon } from '../../internal/icons/16px';

const reactNodeCaption = (
  <div>
    <SpinnerOld type="mini" caption={null} /> <span style={{ color: 'tomato', fontSize: '1.3em' }}>З</span>
    агрузка ...
  </div>
);
const SpinnerOldLikeIcon = () => (
  <>
    <SpinnerOld type="mini" caption={null} />
    Загрузка
    <br />
    <OkIcon />
    Загрузка
  </>
);

storiesOf('SpinnerOld', module)
  .addDecorator(story => <div style={{ height: 150, width: 200, padding: 4 }}>{story()}</div>)
  .add('Normal', () => <SpinnerOld />)
  .add('Big', () => <SpinnerOld type="big" />)
  .add('Mini', () => <SpinnerOld type="mini" />)
  .add('Mini dimmed', () => <SpinnerOld type="mini" dimmed />)
  .add('With ReactNode in caption', () => <SpinnerOld type="big" caption={reactNodeCaption} />)
  .add('Spinner and Icon same sizes', () => <SpinnerOldLikeIcon />);
