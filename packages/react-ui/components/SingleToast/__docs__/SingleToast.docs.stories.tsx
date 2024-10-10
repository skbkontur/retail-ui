import React from 'react';
import { Meta, Story } from '../../../typings/stories';

import { SingleToast, Button, ThemeContext, ThemeFactory, THEME_2022 } from '@skbkontur/react-ui';

export default {
  title: 'Overlay/SingleToast',
  component: SingleToast,
  parameters: { creevey: { skip: true } },
} as Meta;

export const Example1: Story = () => {

  return (
    <div>
      <SingleToast />
      <Button onClick={() => SingleToast.push('Статический тост')}>
        Показать статический тост
      </Button>
    </div>
  );

};
Example1.storyName = 'Базовый пример';

/** `<SingleToast>` можно кастомизировать с помощью переменных темы для `toast`. */
export const Example2: Story = () => {

  const rand = () => "Пример жёлтого тоста № " + Math.round(Math.random() * 100).toString();

  const pushToast = () => {
    SingleToast.push(rand(), {
      label: "Cancel",
      handler: () => SingleToast.push("Canceled")
    });
  };

  return (
    <div>
      <SingleToast theme={{ toastBg: '#f1c40f' }} />
      <Button onClick={pushToast}>
        Показать тост с жёлтым фоном
      </Button>
    </div>
  );

};
Example2.storyName = 'Кастомизация';

