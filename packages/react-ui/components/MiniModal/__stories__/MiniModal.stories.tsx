import React, { useState } from 'react';
import { TrashCanIcon64Regular } from '@skbkontur/icons/TrashCanIcon64Regular';
import { TechPhoneSmartIcon64Regular } from '@skbkontur/icons/TechPhoneSmartIcon64Regular';

import { MiniModal } from '../MiniModal';
import { Button } from '../../Button';
import { Modal } from '../../Modal';
import { Meta, Story } from '../../../typings/stories';
import { ThemeContext } from '../../../lib/theming/ThemeContext';
import { LIGHT_THEME } from '../../../lib/theming/themes/LightTheme';
import { ThemeFactory } from '../../../lib/theming/ThemeFactory';

export default {
  title: 'MiniModal',
  component: MiniModal,
  parameters: { creevey: { captureElement: '[data-tid="modal-content"]' } },
} as Meta;

export const Simple = () => {
  const [isOpened, setIsOpened] = useState(false);

  const open = () => setIsOpened(true);
  const close = () => setIsOpened(false);

  return (
    <>
      {isOpened && (
        <MiniModal>
          <MiniModal.Header>Заголовок</MiniModal.Header>
          <MiniModal.Footer>
            <Button size="medium" use="primary" onClick={close}>
              Главная
            </Button>
          </MiniModal.Footer>
        </MiniModal>
      )}
      <Button onClick={open}>Открыть МиниМодалку</Button>
    </>
  );
};

export const MobileFullset: Story = () => (
  <ThemeContext.Consumer>
    {(theme) => (
      <ThemeContext.Provider value={ThemeFactory.create(theme, LIGHT_THEME)}>
        <MiniModal>
          <MiniModal.Header icon={<TechPhoneSmartIcon64Regular />}>Title mobile</MiniModal.Header>
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
      </ThemeContext.Provider>
    )}
  </ThemeContext.Consumer>
);
MobileFullset.parameters = {
  viewport: { defaultViewport: 'iphone' },
  creevey: { captureElement: null },
};

export const Description = () => (
  <MiniModal>
    <MiniModal.Header>Title</MiniModal.Header>
    <MiniModal.Body>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tempore, voluptatibus?</MiniModal.Body>
    <MiniModal.Footer>
      <Button size="medium" use="primary">
        Main
      </Button>
    </MiniModal.Footer>
  </MiniModal>
);

export const TwoButtons = () => (
  <MiniModal>
    <MiniModal.Header>Title</MiniModal.Header>
    <MiniModal.Footer>
      <Button size="medium" use="primary">
        Main
      </Button>
      <Button size="medium">Alt</Button>
    </MiniModal.Footer>
  </MiniModal>
);

export const Column = () => (
  <MiniModal>
    <MiniModal.Header>Title</MiniModal.Header>
    <MiniModal.Footer direction="column">
      <Button size="medium" use="primary">
        Main
      </Button>
      <Button size="medium">Alt</Button>
    </MiniModal.Footer>
  </MiniModal>
);

export const ThreeButtons = () => (
  <MiniModal>
    <MiniModal.Header>Title</MiniModal.Header>
    <MiniModal.Footer>
      <Button size="medium" use="primary">
        Main
      </Button>
      <Button size="medium">Alt</Button>
      <Button size="medium">Cancel</Button>
    </MiniModal.Footer>
  </MiniModal>
);

export const Indent = () => (
  <MiniModal>
    <MiniModal.Header>Title</MiniModal.Header>
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

export const Icon = () => (
  <MiniModal>
    <MiniModal.Header icon={<TrashCanIcon64Regular />}>Title</MiniModal.Header>
    <MiniModal.Footer>
      <Button size="medium" use="primary">
        Main
      </Button>
    </MiniModal.Footer>
  </MiniModal>
);

export const Custom = () => (
  <MiniModal>
    <MiniModal.Header icon={null}>Delete?</MiniModal.Header>
    <Modal.Footer gap={24}>
      <Button size="medium" use="danger">
        Yes
      </Button>
      <Button size="medium">No</Button>
    </Modal.Footer>
  </MiniModal>
);
