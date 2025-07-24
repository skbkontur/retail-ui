import React from 'react';

import type { Story, Meta } from '../../../typings/stories';
import { ThemeContext } from '../../../lib/theming/ThemeContext';
import { LIGHT_THEME_5_2 } from '../../../lib/theming/themes/LightTheme';
import { MiniModal } from '../../../components/MiniModal';
import { Button } from '../../../components/Button';

export default {
  title: 'ThemeVersions/5_2',
  decorators: [
    (Story) => (
      <ThemeContext.Provider value={LIGHT_THEME_5_2}>
        <Story />
      </ThemeContext.Provider>
    ),
  ],
  parameters: {
    creevey: {
      captureElement: 'body',
      skip: {
        'no themes': { in: /^(?!\b(chrome2022)\b)/ },
      },
    },
  },
} as Meta;

export const MiniModal5_2: Story = () => (
  <MiniModal>
    <MiniModal.Header>Title</MiniModal.Header>
    <MiniModal.Body>Text in the body with font-size: inherit and line-height: normal.</MiniModal.Body>
    <MiniModal.Footer>
      <Button size="medium">Button</Button>
    </MiniModal.Footer>
  </MiniModal>
);
