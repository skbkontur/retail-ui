import React from 'react';
import { Hint, Button, Gapped } from '@skbkontur/react-ui';

import type { Meta, Story } from '../../../typings/stories';

export default {
  title: 'Overlay/Hint',
  component: Hint,
  parameters: { creevey: { skip: true } },
} as Meta;

export const Example1: Story = () => {
  return <Hint text="Подсказка">Базовая</Hint>;
};
Example1.storyName = 'Базовый пример';

export const Example2: Story = () => {
  return (
    <Hint text="Редактирование">
      <svg width="16" height="16" viewBox="0 0 16 16">
        <path
          fillRule="evenodd"
          d="M13 12V12.998H8V12H13ZM3 13V11L9 4.99999L11 6.99999L5 13H3ZM13 5L11.5 6.5L9.5 4.5L11 3L13 5Z"
          clipRule="evenodd"
        />
      </svg>
    </Hint>
  );
};
Example2.storyName = 'Иконка';

export const Example3: Story = () => {
  return (
    <Hint pos={'left'} text="Подсказка слева">
      Всегда всплывает слева
    </Hint>
  );
};
Example3.storyName = 'Сторона всплытия';

export const Example4: Story = () => {
  return (
    <Hint maxWidth="150px" text="Очень много текста, рассказывающего про этот очень непонятный элемент">
      Очень непонятный элемент
    </Hint>
  );
};
Example4.storyName = 'Ограниченная ширина';

export const Example5: Story = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <Gapped>
      <Hint opened={isOpen} manual text="Подсказка">
        Управляемая удалённо
      </Hint>
      <Button onClick={() => setIsOpen(!isOpen)}>{isOpen ? 'Закрыть подсказку' : 'Открыть подсказку'}</Button>
    </Gapped>
  );
};
Example5.storyName = 'Открытие подсказки кнопкой';

export const Example6: Story = () => {
  return (
    <Hint disableAnimations text={'Нет анимации :('}>
      Есть анимация?
    </Hint>
  );
};
Example6.storyName = 'Всплытие без анимации';

/** Подсказка должна отображаться даже на отключённых компонентах. Из коробки это работает только с контролами `react-ui`.
Нативные элементы, поддерживающие атрибут `disabled`, отключают необходимые события мыши.
В подобных случаях следуют использовать проп `useWrapper`: */
export const Example7: Story = () => {
  return (
    <Hint useWrapper text="Подсказа всё равно отображается">
      <button disabled>native button</button>
    </Hint>
  );
};
Example7.storyName = 'Встроеная обёртка';

/** Т.к. встроённая обёртка это `<span>` без стилей, то она может работать некорректно в определённых ситуациях.
В таких случаях стоит использовать собственную обётку: */
export const Example8: Story = () => {
  return (
    <>
      <Hint useWrapper text="Подсказа">
        <button disabled style={{ height: 40 }}>
          useWrapper prop
        </button>
      </Hint>
      <Hint text="Подсказа">
        <span style={{ display: 'inline-block' }}>
          <button disabled style={{ height: 40 }}>
            custom wrapper
          </button>
        </span>
      </Hint>
    </>
  );
};
Example8.storyName = 'Кастомная обертка';
