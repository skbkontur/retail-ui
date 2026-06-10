import { Button, Gapped, MiniModal, RadioGroup, ThemeContext, ThemeFactory } from '@skbkontur/react-ui';
import type { MobileModalAppearance } from '@skbkontur/react-ui';
import React from 'react';

import type { Meta, Story } from '../../../typings/stories.js';

export default {
  title: 'Overlay/MiniModal/MiniModalMobile',
  parameters: { creevey: { skip: true } },
} as Meta;

export const ExampleMobile: Story = () => {
  const [opened, setOpened] = React.useState(false);
  const [position, setPosition] = React.useState<MobileModalAppearance>('center');

  const renderModal = () => (
    <ThemeContext.Provider
      value={ThemeFactory.create({
        mobileMediaQuery: '(max-width: 767.98px)',
      })}
    >
      <MiniModal mobileAppearance={position} onClose={() => setOpened(false)}>
        <MiniModal.Header>Мини-модалка</MiniModal.Header>
        <MiniModal.Body>
          Переключите mobileAppearance и откройте окно на узкой ширине вьюпорта, чтобы увидеть мобильный вид без
          реального устройства.
        </MiniModal.Body>
        <MiniModal.Footer>
          <Button size="medium" use="accent" onClick={() => setOpened(false)}>
            Понятно
          </Button>
        </MiniModal.Footer>
      </MiniModal>
    </ThemeContext.Provider>
  );

  return (
    <Gapped gap={16} vertical>
      {opened && renderModal()}
      <div>
        <b>mobileAppearance</b>
        <br />
        <br />
        <RadioGroup
          items={['auto', 'top', 'center', 'bottom', 'fullscreen-spacing', 'fullscreen']}
          value={position}
          onValueChange={setPosition}
        />
      </div>
      <Button onClick={() => setOpened(true)}>Открыть мини-модалку</Button>
    </Gapped>
  );
};
ExampleMobile.storyName = 'Мобильный вид';
