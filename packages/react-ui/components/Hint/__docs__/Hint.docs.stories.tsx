import { Button, Hint, Gapped } from '@skbkontur/react-ui';
import React from 'react';

import type { Meta, Story } from '../../../typings/stories.js';

const meta: Meta = {
  title: 'Overlay/Hint',
  component: Hint,
  parameters: { creevey: { skip: true } },
};

export default meta;

export const ExampleBasic: Story = () => {
  return <Hint text="Подсказка">Элемент</Hint>;
};
ExampleBasic.storyName = 'Базовый пример';

/** Проп `maxWidth` задаёт максимальную ширину подсказки */
export const ExampleMaxWidth: Story = () => {
  return (
    <Hint maxWidth="150px" text="Очень длинная подсказка, описывающая этот непонятный элемент">
      Элемент
    </Hint>
  );
};
ExampleMaxWidth.storyName = 'Максимальная ширина';

/** Проп `pos` позиционирует подсказку относительно элемента.
 *
 * Возможные значения:
 * + `top`, `top center`, `top left`, `top right`;
 * + `bottom`, `bottom center`, `bottom left`, `bottom right`;
 * + `left`, `left middle`, `left top`, `left bottom`;
 * + `right`, `right middle`, `right top`, `right bottom`. */
export const ExamplePos: Story = () => {
  return (
    <Hint pos={'right'} text="Всплывает справа">
      Элемент
    </Hint>
  );
};
ExamplePos.storyName = 'Позиционирование';

/** С помощью пропа `allowedPositions` можно определить список доступных позиций для отображения подсказки.
 * Если подсказка в определенной позиции выходит за край экрана, используется следующая.
 *
 * Попробуйте пример ниже с разным положением элемента относительно краёв экрана.
 */
export const ExampleAllowedPositions: Story = () => {
  return (
    <Hint
      pos={'right middle'}
      allowedPositions={['right middle', 'top', 'bottom']}
      text="Подсказка, которая может вылезти за экран"
    >
      <div style={{ border: '1px black solid', padding: '4px', textAlign: 'center' }}>Элемент</div>
    </Hint>
  );
};
ExampleAllowedPositions.storyName = 'Доступные позиции для отображения';

/** Через проп `manual` можно управлять отображением подсказки вручную. Для этого нужно передавать значения в проп `opened`. */
export const ExampleManual: Story = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <Hint opened={isOpen} manual text="Подсказка">
      <Button onClick={() => setIsOpen(!isOpen)}>{`${isOpen ? 'Скрыть' : 'Показать'} подсказку`}</Button>
    </Hint>
  );
};
ExampleManual.storyName = 'Ручное управление';

/** Проп `disableAnimations` отключает анимацию всплывающей подсказки. */
export const ExampleDisableAnimations: Story = () => {
  return (
    <Hint disableAnimations text={'Подсказка'}>
      Элемент
    </Hint>
  );
};
ExampleDisableAnimations.storyName = 'Всплытие без анимации';

/** С помощью пропа `useWrapper` можно обернуть вложенные элементы в `<span />`.
 *
 * Это особенно полезно в двух сценариях:
 * + для правильного позиционирования двух или более вложенных объектов;
 * + для отображения подсказки у отключённых нативных элементов (аттрибут `disabled` блокирует события мыши).
 */
export const ExampleUseWrapper: Story = () => {
  return (
    <Hint useWrapper text="Подсказка">
      <button disabled>Нативная кнопка</button>
    </Hint>
  );
};
ExampleUseWrapper.storyName = 'Встроенная обёртка';

/** Поскольку встроенная обёртка из пропа `useWrapper` — это простой `<span />` без стилей, она может работать некорректно.
В таких случаях стоит использовать собственную обёртку: */
export const ExampleCustomWrapper: Story = () => {
  return (
    <Gapped vertical>
      <Hint useWrapper text="Подсказка">
        <button disabled style={{ height: 40 }}>
          Проп useWrapper
        </button>
      </Hint>

      <Hint text="Подсказка">
        <span style={{ display: 'inline-block' }}>
          <button disabled style={{ height: 40 }}>
            Своя обёртка
          </button>
        </span>
      </Hint>
    </Gapped>
  );
};
ExampleCustomWrapper.storyName = 'Кастомизация: собственная обёртка';
