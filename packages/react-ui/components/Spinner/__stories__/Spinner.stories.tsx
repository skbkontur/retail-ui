import React from 'react';
import { StoryFn } from '@storybook/addons';

import { Spinner } from '../Spinner';
import { OkIcon } from '../../../internal/icons/16px';

const reactNodeCaption = (
  <div>
    <Spinner type="mini" caption={null} /> <span style={{ color: 'tomato', fontSize: '1.3em' }}>З</span>
    агрузка ...
  </div>
);
const SpinnerLikeIcon = () => (
  <>
    <Spinner type="mini" caption={null} />
    Загрузка
    <br />
    <OkIcon />
    Загрузка
  </>
);

export default {
  title: 'Spinner',
  parameters: { creevey: { skip: [{ stories: ['Big', 'Mini', 'Mini dimmed'] }] } },
  decorators: [(story: StoryFn<JSX.Element>) => <div style={{ height: 150, width: 200, padding: 4 }}>{story()}</div>],
};

export const Normal = () => <Spinner />;
export const Big = () => <Spinner type="big" />;
export const Mini = () => <Spinner type="mini" />;
export const MiniDimmed = () => <Spinner type="mini" dimmed />;
MiniDimmed.storyName = 'Mini dimmed';

export const WithReactNodeInCaption = () => <Spinner type="big" caption={reactNodeCaption} />;
WithReactNodeInCaption.storyName = 'With ReactNode in caption';

export const SpinnerAndIconSameSizes = () => <SpinnerLikeIcon />;
SpinnerAndIconSameSizes.storyName = 'Spinner and Icon same sizes';
