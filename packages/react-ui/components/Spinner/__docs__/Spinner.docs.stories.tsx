import React from 'react';
import { Spinner, Gapped, ThemeContext, ThemeFactory } from '@skbkontur/react-ui';

import type { Meta, Story } from '../../../typings/stories.js';

const meta: Meta = {
  title: 'Display data/Spinner',
  component: Spinner,
  parameters: { creevey: { skip: true } },
};

export default meta;

export const ExampleBasic: Story = () => <Spinner />;
ExampleBasic.storyName = 'Базовый пример';

/**
 * Проп `type` меняет размер индикатора и текста.
 */
export const ExampleType: Story = () => {
  return (
    <Gapped>
      <Spinner type="big" />
      <Spinner type="normal" />
      <Spinner type="mini" />
    </Gapped>
  );
};
ExampleType.storyName = 'Размер спиннера и текста';

/**
 * Проп `width` задаёт толщину индикатора в пикселях.
 */
export const ExampleWidth: Story = () => <Spinner width={5} type="mini" />;
ExampleWidth.storyName = 'Толщина индикатора';

/**
 * Проп `caption` добавляет текст рядом с индикатором.
 */
export const ExampleCaption: Story = () => {
  return (
    <Gapped>
      <Spinner type="big" caption="big" />
      <Spinner type="normal" caption="normal" />
      <Spinner type="mini" caption="mini" />
    </Gapped>
  );
};
ExampleCaption.storyName = 'Подпись';

/**
 * Проп `inline` уменьшает размер индикатора для работы в строках.
 */
export const ExampleInline: Story = () => {
  return (
    <span>
      <span>span </span>
      <Spinner inline />
      <span> span</span>
    </span>
  );
};
ExampleInline.storyName = 'Инлайновый режим';

/**
 * Проп `color` делает индикатор одноцветным, позволяя напрямую задать цвет.
 *
 * Альтернативой является проп `dimmed`, который включает одноцветный режим.
 * По умолчанию цвета становятся приглушёнными, но их можно изменить через тему.
 */
export const ExampleColor: Story = () => {
  return (
    <Gapped>
      <Spinner color="blue" caption="caption" />
      <Spinner dimmed caption="caption" />
      <ThemeContext.Provider
        value={ThemeFactory.create({
          spinnerCaptionColor: 'green',
          spinnerDimmedColor: 'green',
        })}
      >
        <Spinner dimmed caption="caption" />
      </ThemeContext.Provider>
    </Gapped>
  );
};
ExampleColor.storyName = 'Кастомизация: одноцветный режим';
