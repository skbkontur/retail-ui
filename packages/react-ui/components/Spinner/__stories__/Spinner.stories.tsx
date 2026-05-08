import React, { type JSX } from 'react';

import { CheckAIcon16Regular } from '../../../internal/icons2022/CheckAIcon/CheckAIcon16Regular.js';
import type { Meta } from '../../../typings/stories.js';
import { Spinner } from '../Spinner.js';

const reactNodeCaption = (
  <div>
    <Spinner size="small" caption={null} /> <span style={{ color: 'tomato', fontSize: '1.3em' }}>З</span>
    агрузка ...
  </div>
);
const SpinnerLikeIcon = () => (
  <>
    <Spinner size="small" caption={null} />
    Загрузка
    <br />
    <CheckAIcon16Regular />
    Загрузка
  </>
);

const meta: Meta = {
  title: 'Spinner',
  component: Spinner,
  parameters: {
    creevey: {
      skip: {},
    },
  },
  decorators: [
    (Story: () => JSX.Element) => (
      <div style={{ height: 150, width: 200, padding: 4 }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;

export const Large = () => <Spinner size="large" />;
export const Medium = () => <Spinner size="medium" />;
export const Small = () => <Spinner size="small" />;
export const Dimmed = () => <Spinner dimmed />;
export const WithCaption = () => <Spinner caption={'Loading'} />;
export const WithCustomColor = () => <Spinner size="large" color={'pink'} />;
export const WithCustomWidth = () => <Spinner size="large" width={10} />;

export const WithReactNodeInCaption = () => <Spinner size="large" caption={reactNodeCaption} />;
WithReactNodeInCaption.storyName = 'With ReactNode in caption';

export const SpinnerAndIconSameSizes = () => <SpinnerLikeIcon />;
SpinnerAndIconSameSizes.storyName = 'Spinner and Icon same sizes';
