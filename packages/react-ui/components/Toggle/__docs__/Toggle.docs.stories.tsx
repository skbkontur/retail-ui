import React from 'react';
import { Meta, Story } from '../../../typings/stories';

import { Toggle, Gapped, Toast } from '@skbkontur/react-ui';

export default {
  title: 'Input data/Toggle',
  component: Toggle,
  parameters: { creevey: { skip: true } },
} as Meta;

export const Example1: Story = () => {
  const [checked, setChecked] = React.useState(false);

  return (
    <Toggle checked={checked} onValueChange={setChecked}>
      {checked ? 'On' : 'Off'}
    </Toggle>
  );

};
Example1.storyName = 'Базовый пример';

export const Example2: Story = () => {
  return (
    <Toggle defaultChecked>
      Включен по умолчанию
    </Toggle>
  );

};
Example2.storyName = 'Тогл включенный по умолчанию';

export const Example3: Story = () => {
  const [checked, setChecked] = React.useState(false);

  return (
    <Toggle checked={checked} onValueChange={setChecked} captionPosition="left">
      Показывать уведомления
    </Toggle>
  );

};
Example3.storyName = 'Надпись слева от переключателя';

export const Example4: Story = () => {

  const [checked, setChecked] = React.useState(false);

  return (
    <Gapped>
      <Toggle id="toggle-1" checked={checked} onValueChange={setChecked}/>
      <label htmlFor="toggle-1">Внешний label</label>
    </Gapped>
  );

};
Example4.storyName = 'Тогл с внешним `<label/>`';

export const Example5: Story = () => {
  return (
    <Toggle autoFocus>
      Сразу с фокусом
    </Toggle>
  );

};
Example5.storyName = 'Получение фокуса после загрузки страницы';

export const Example6: Story = () => {

  return (
    <Gapped gap="20px">
      <Toggle warning>
        Warning
      </Toggle>
      <Toggle error>
        Error
      </Toggle>
      <Toggle loading>
        Loading
      </Toggle>
      <Toggle disabled>
        Disabled
      </Toggle>
    </Gapped>
  );

};
Example6.storyName = 'Стили';

export const Example7: Story = () => {

  return (
    <Gapped vertical>
      <Toggle size="small">
        Маленький
      </Toggle>
      <Toggle size="medium">
        Средний
      </Toggle>
      <Toggle size="large">
        Большой
      </Toggle>
    </Gapped>
  );

};
Example7.storyName = 'Размер';

export const Example8: Story = () => {

  return (
    <Toggle
      onFocus={() => Toast.push('Я получил фокус!')}
      onBlur={() => Toast.push('И потерял его...')}
      >
      С кастомными действиями при фокусе и его потере
    </Toggle>
  );

};
Example8.storyName = 'Кастомное действие при получении и потере фокуса';

export const Example9: Story = () => {

  return (
    <Toggle onChange={() => Toast.push("Запускаю кастомное действие")}>
      Кастомное действие при переключении
    </Toggle>
  );

};
Example9.storyName = 'Кастомное действие при переключении';

