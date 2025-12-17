import React from 'react';
import { FileUploader } from '@skbkontur/react-ui/components/FileUploader';
import { createFile } from '@skbkontur/react-ui/internal/FileUploaderControl/fileUtils';

import type { Story, Meta } from '../../../typings/stories';
import { ThemeContext } from '../../../lib/theming/ThemeContext';
import { LIGHT_THEME_5_4 } from '../../../lib/theming/themes/LightTheme';

export default {
  title: 'ThemeVersions/5_4',
  decorators: [
    (Story) => (
      <ThemeContext.Provider value={LIGHT_THEME_5_4}>
        <Story />
      </ThemeContext.Provider>
    ),
  ],
  parameters: {
    creevey: {
      captureElement: '#test-element',
      skip: {
        'no themes': { in: /^(?!\b(chrome2022)\b)/ },
      },
    },
  },
} as Meta;

export const FileUploaderSingle5_4: Story = () => {
  return (
    <FileUploader
      id="test-element"
      initialFiles={[createFile('оченьоченьоченьоченьоченьоченьоченьоченьоченьочень.txt')]}
    />
  );
};

export const FileUploaderMultiple5_4: Story = () => {
  return (
    <FileUploader
      id="test-element"
      multiple
      initialFiles={[
        createFile('оченьоченьоченьоченьоченьоченьоченьоченьоченьочень.txt'),
        createFile('оченьоченьоченьоченьоченьоченьоченьоченьоченьочень.txt'),
        createFile('оченьоченьоченьоченьоченьоченьоченьоченьоченьочень.txt'),
      ]}
    />
  );
};
