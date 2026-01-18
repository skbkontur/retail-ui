import React from 'react';
import { Toggle, Gapped } from '@skbkontur/react-ui';

import type { Meta, Story } from '../../../typings/stories';

export default {
  title: 'Input data/Toggle',
  component: Toggle,
  parameters: { creevey: { skip: true } },
} as Meta;

export const ExampleBasic: Story = () => {
  const [checked, setChecked] = React.useState(false);

  return (
    <Toggle checked={checked} onValueChange={setChecked}>
      {checked ? 'Включен' : 'Выключен'}
    </Toggle>
  );
};

export const ExampleSize: Story = () => {
  return (
    <Gapped vertical>
      <Toggle size="small">Маленький</Toggle>
      <Toggle size="medium">Средний</Toggle>
      <Toggle size="large">Большой</Toggle>
    </Gapped>
  );
};
ExampleSize.storyName = 'Размер';

/** Проп `captionPosition` определяет, с какой стороны от переключателя находится его название. */
export const ExampleCaptionPosition: Story = () => {
  const [checked, setChecked] = React.useState(false);

  return (
    <Gapped vertical>
      <Toggle checked={checked} onValueChange={setChecked} captionPosition="right">
        Название справа
      </Toggle>
      <Toggle checked={checked} onValueChange={setChecked} captionPosition="left">
        Название слева
      </Toggle>
    </Gapped>
  );
};
ExampleCaptionPosition.storyName = 'Расположение надписи';

export const ExampleLabel: Story = () => {
  const [checked, setChecked] = React.useState(false);

  return (
    <Gapped>
      <Toggle id="toggle-id" checked={checked} onValueChange={setChecked} />
      <label htmlFor="toggle-id">Внешний label</label>
    </Gapped>
  );
};
ExampleLabel.storyName = 'Тогл с внешним `<label/>`';

/** Проп `disabled` переводит тогл в состояние блокировки. */
export const ExampleDisabled: Story = () => {
  return <Toggle disabled>Заблокированный</Toggle>;
};
ExampleDisabled.storyName = 'Состояние блокировки';

/** Проп `loading` переводит тогл в состояние загрузки. */
export const ExampleLoading: Story = () => {
  return <Toggle loading>Загрузка</Toggle>;
};
ExampleLoading.storyName = 'Состояние загрузки';

/** Проп `disableAnimations` отключает анимацию при переключении тогла. По умолчанию тогл переключается с анимацией: круг плавно перемещается, фон движется за ним. */
export const ExampleDisableAnimations: Story = () => {
  return <Toggle disableAnimations>Без анимации</Toggle>;
};
ExampleDisableAnimations.storyName = 'Отключение анимации';
