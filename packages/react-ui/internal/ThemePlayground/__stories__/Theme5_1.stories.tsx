import React from 'react';

import { Story, Meta } from '../../../typings/stories';
import { ThemeContext } from '../../../lib/theming/ThemeContext';
import { LIGHT_THEME_5_1 } from '../../../lib/theming/themes/LightTheme';
import { DARK_THEME_5_1 } from '../../../lib/theming/themes/DarkTheme';
import { Modal } from '../../../components/Modal';
import { MiniModal } from '../../../components/MiniModal';
import { Button } from '../../../components/Button';

export default {
  title: 'ThemeVersions/5_1',
  decorators: [
    (Story) => (
      <ThemeContext.Provider value={LIGHT_THEME_5_1}>
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

export const MiniModalMobile5_1: Story = () => (
  <MiniModal>
    <MiniModal.Header>Title mobile</MiniModal.Header>
    <MiniModal.Body>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Earum, officia?</MiniModal.Body>
    <MiniModal.Footer>
      <Button size="medium" use="primary">
        Main
      </Button>
      <Button size="medium">Alt</Button>
      <MiniModal.Indent />
      <Button size="medium">Cancel</Button>
    </MiniModal.Footer>
  </MiniModal>
);
MiniModalMobile5_1.parameters = {
  viewport: { defaultViewport: 'iphone' },
  creevey: { captureElement: null },
};

export const ModalMobile5_1: Story = () => (
  <Modal>
    <Modal.Header>Воспользуйтесь другим браузером</Modal.Header>
    <Modal.Body>
      Некоторые функции не работают в вашем браузере. Чтобы все работало, установите один из этих браузеров: Firefox,
      Opera, Chrome.
    </Modal.Body>
    <Modal.Footer panel>
      <Button>Ок</Button>
    </Modal.Footer>
  </Modal>
);
ModalMobile5_1.parameters = {
  viewport: { defaultViewport: 'iphone' },
  creevey: { captureElement: null },
};

export const ModalWithStickyHeaderAndStickyFooter5_1 = () => (
  <ThemeContext.Provider value={DARK_THEME_5_1}>
    <Modal>
      <Modal.Header sticky>Header</Modal.Header>
      <Modal.Body>
        {new Array(200).fill('Use rxjs operators with react hooks.').map((item, index) => (
          <p key={index}>{item}</p>
        ))}
      </Modal.Body>
      <Modal.Footer sticky panel>
        Footer
      </Modal.Footer>
    </Modal>
  </ThemeContext.Provider>
);
ModalWithStickyHeaderAndStickyFooter5_1.parameters = {
  creevey: {
    skip: {
      'no themes': { in: /^(?!\b(chrome2022Dark|firefox2022Dark)\b)/ },
    },
  },
};

export const ModalWithStickyHeaderAndStickyFooterColored5_1: Story = () => {
  return (
    <Modal>
      <Modal.Header style={{ background: 'green' }}>Header</Modal.Header>
      <Modal.Body>
        <div style={{ height: '1000px', backgroundColor: 'lightblue', overflow: 'hidden' }}>выпадашка</div>
      </Modal.Body>
      <Modal.Footer style={{ background: 'green' }}>Footer</Modal.Footer>
    </Modal>
  );
};
