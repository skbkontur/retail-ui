import React from 'react';

import { Meta } from '../../../typings/stories';
import { Spinner } from '../Spinner';
import { CheckAIcon16Regular } from '../../../internal/icons2022/CheckAIcon/CheckAIcon16Regular';

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
    <CheckAIcon16Regular />
    Загрузка
  </>
);

export default {
  title: 'Spinner',
  component: Spinner,
  parameters: {
    creevey: {
      skip: {
        'kind-skip-0': { stories: ['Big', 'Mini', 'Mini dimmed'] },
      },
    },
  },
  decorators: [
    (Story: () => JSX.Element) => (
      <div style={{ height: 150, width: 200, padding: 4 }}>
        <Story />
      </div>
    ),
  ],
} as Meta;

export const Normal = () => <Spinner />;
export const Big = () => <Spinner type="big" />;
export const Mini = () => <Spinner type="mini" />;
export const MiniDimmed = () => <Spinner type="mini" dimmed />;
export const WithCaption = () => <Spinner caption={'Loading'} />;
export const WithCustomColor = () => <Spinner type="big" color={'pink'} />;
export const WithCustomWidth = () => <Spinner type="big" width={10} />;
MiniDimmed.storyName = 'Mini dimmed';

export const WithReactNodeInCaption = () => <Spinner type="big" caption={reactNodeCaption} />;
WithReactNodeInCaption.storyName = 'With ReactNode in caption';

export const SpinnerAndIconSameSizes = () => <SpinnerLikeIcon />;
SpinnerAndIconSameSizes.storyName = 'Spinner and Icon same sizes';
