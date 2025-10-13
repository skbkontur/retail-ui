import React from 'react';
import { SingleToast, Button, Gapped, Checkbox } from '@skbkontur/react-ui';

import type { Meta, Story } from '../../../typings/stories';

export default {
  title: 'Overlay/SingleToast',
  component: SingleToast,
  parameters: { creevey: { skip: true } },
} as Meta;

export const Default: Story = () => {
  const customTheme = {
    toastBg: '#00BEA2',
    toastColor: '#ffff',
  };

  const [isCustomTheme, setIsCustomTheme] = React.useState(false);

  return (
    <>
      <SingleToast theme={isCustomTheme ? customTheme : undefined} />

      <Gapped gap={16}>
        <Button onClick={() => SingleToast.push('Тост')}>Показать тост</Button>
        <Checkbox checked={isCustomTheme} onValueChange={setIsCustomTheme}>
          Кастомная тема
        </Checkbox>
      </Gapped>
    </>
  );
};
Default.storyName = 'Базовый пример';

export const SingleToastWithAction: Story = () => {
  return (
    <Button
      onClick={() =>
        SingleToast.push('Тост с кнопкой действия', {
          action: { label: 'Cancel', handler: () => alert('Действие было отменено') },
        })
      }
    >
      Тост c кнопкой действия
    </Button>
  );
};
SingleToastWithAction.storyName = 'Тост с кнопкой действия';

export const SingleToastWithCross = () => {
  return (
    <Gapped>
      <Button onClick={() => SingleToast.push('Тост с крестиком', { showCloseIcon: true })}>Тост c крестиком</Button>
      <Button onClick={() => SingleToast.push('Тост без крестика', { showCloseIcon: false })}>Тост без крестика</Button>
    </Gapped>
  );
};
SingleToastWithCross.storyName = 'Тост с крестиком';

export const SingleToastWithUseError = () => {
  return (
    <Button onClick={() => SingleToast.push('Тост в состоянии ошибки', { use: 'error' })}>
      Тост в состоянии ошибки
    </Button>
  );
};
SingleToastWithUseError.storyName = 'Тост в состоянии ошибки';
