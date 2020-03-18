import React from 'react';
import { StoryFn } from '@storybook/addons';

import { SpinnerOld } from '../SpinnerOld';
import { OkIcon } from '../../icons/16px';

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

export default {
  title: 'SpinnerOld',
  parameters: { creevey: { skip: [true] } },
  decorators: [(story: StoryFn<JSX.Element>) => <div style={{ height: 150, width: 200, padding: 4 }}>{story()}</div>],
};

export const Normal = () => <SpinnerOld />;
export const Big = () => <SpinnerOld type="big" />;
export const Mini = () => <SpinnerOld type="mini" />;
export const MiniDimmed = () => <SpinnerOld type="mini" dimmed />;
MiniDimmed.story = { name: 'Mini dimmed' };

export const WithReactNodeInCaption = () => <SpinnerOld type="big" caption={reactNodeCaption} />;
WithReactNodeInCaption.story = { name: 'With ReactNode in caption' };

export const SpinnerAndIconSameSizes = () => <SpinnerOldLikeIcon />;
SpinnerAndIconSameSizes.story = { name: 'Spinner and Icon same sizes' };
