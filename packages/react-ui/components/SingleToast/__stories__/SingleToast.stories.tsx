import React from 'react';

import type { Meta } from '../../../typings/stories';
import { SingleToast } from '../SingleToast';
import { Button } from '../../Button';

export default {
  title: 'SingleToast',
  component: SingleToast,
  parameters: {
    creevey: {
      skip: {
        'kind-skip-0': { stories: 'static method' },
      },
    },
  },
  decorators: [
    (Story: () => JSX.Element) => (
      <div
        // make some space for SingleToast
        style={{
          padding: '30px 0',
        }}
      >
        <Story />
      </div>
    ),
  ],
} as Meta;

export const StaticMethod = () => (
  <div>
    <SingleToast />
    <Button onClick={() => SingleToast.push('Статический тост')}>Показать статический тост</Button>
  </div>
);
StaticMethod.storyName = 'static method';
