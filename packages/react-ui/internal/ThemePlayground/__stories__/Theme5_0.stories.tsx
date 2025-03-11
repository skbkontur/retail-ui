import React, { useContext } from 'react';

import { Story, Meta } from '../../../typings/stories';
import { ThemeContext } from '../../../lib/theming/ThemeContext';
import { LIGHT_THEME_5_0 } from '../../../lib/theming/themes/LightTheme';
import { Modal } from '../../../components/Modal';
import { SidePage } from '../../../components/SidePage';
import { ThemeFactory } from '../../../lib/theming/ThemeFactory';

export default {
  title: 'ThemeVersions/5_0',
  decorators: [
    (Story) => (
      <ThemeContext.Provider value={LIGHT_THEME_5_0}>
        <Story />
      </ThemeContext.Provider>
    ),
  ],
  parameters: {
    creevey: {
      captureElement: 'body',
      skip: {
        'no themes': { in: /^(?!\b(chrome2022|chromeMobile)\b)/ },
      },
    },
  },
} as Meta;

export const Modal5_0: Story = () => {
  return (
    <Modal disableFocusLock>
      <Modal.Header>Крестик в модалке</Modal.Header>
      <Modal.Body>
        <span>Тестируем в 5.0</span>
      </Modal.Body>
    </Modal>
  );
};

export const ModalMobile5_0: Story = () => {
  const theme = useContext(ThemeContext);

  return (
    <ThemeContext.Provider
      value={ThemeFactory.create(
        {
          mobileMediaQuery: '(max-width: 576px)',
        },
        theme,
      )}
    >
      <Modal>
        <Modal.Header>Крестик в мобильной модалке</Modal.Header>
        <Modal.Body>
          <span>Тестируем в 5.0</span>
        </Modal.Body>
      </Modal>
    </ThemeContext.Provider>
  );
};
ModalMobile5_0.parameters = {
  viewport: { defaultViewport: 'iphone' },
};

export const SidePage5_0: Story = () => {
  return (
    <SidePage>
      <SidePage.Header>Крестик в сайдпейдже</SidePage.Header>
      <SidePage.Body>
        <span>Тестируем в 5.0</span>
      </SidePage.Body>
    </SidePage>
  );
};

export const SidePageMobile5_0: Story = () => {
  const theme = useContext(ThemeContext);

  return (
    <ThemeContext.Provider
      value={ThemeFactory.create(
        {
          mobileMediaQuery: '(max-width: 576px)',
        },
        theme,
      )}
    >
      <SidePage>
        <SidePage.Header>Крестик в мобильном сайдпейдже</SidePage.Header>
        <SidePage.Body>
          <span>Тестируем в 5.0</span>
        </SidePage.Body>
      </SidePage>
    </ThemeContext.Provider>
  );
};
SidePageMobile5_0.parameters = {
  viewport: { defaultViewport: 'iphone' },
};
