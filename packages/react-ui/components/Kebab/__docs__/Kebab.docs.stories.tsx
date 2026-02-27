import React from 'react';
import { Kebab, MenuItem, MenuHeader, Toast } from '@skbkontur/react-ui';
import { CheckAIcon16Light } from '@skbkontur/icons/icons/CheckAIcon';
import { PlusIcon16Light } from '@skbkontur/icons/icons/PlusIcon';

import type { Meta, Story } from '../../../typings/stories';

export default {
  title: 'Menu/Kebab',
  component: Kebab,
  parameters: { creevey: { skip: true } },
} as Meta;

export const ExampleBasic: Story = () => {
  return (
    <Kebab>
      <MenuItem>Действие 1</MenuItem>
      <MenuItem>Действие 2</MenuItem>
      <MenuItem>Действие 3</MenuItem>
    </Kebab>
  );
};
ExampleBasic.storyName = 'Базовый пример';

/** Проп `size` задаёт размер кнопки. По умолчанию: `'small'`. */
export const ExampleSize: Story = () => {
  return (
    <div style={{ display: 'flex', alignItems: 'end', gap: '24px' }}>
      <Kebab size="small">
        <MenuItem>Действие 1</MenuItem>
        <MenuItem>Действие 2</MenuItem>
        <MenuItem>Действие 3</MenuItem>
      </Kebab>
      <Kebab size="medium">
        <MenuItem>Действие 1</MenuItem>
        <MenuItem>Действие 2</MenuItem>
        <MenuItem>Действие 3</MenuItem>
      </Kebab>
      <Kebab size="large">
        <MenuItem>Действие 1</MenuItem>
        <MenuItem>Действие 2</MenuItem>
        <MenuItem>Действие 3</MenuItem>
      </Kebab>
    </div>
  );
};
ExampleSize.storyName = 'Размер';

/** Проп `positions` задаёт список доступных позиций выпадающего меню относительно кнопки.
 * По умолчанию: `['bottom left', 'bottom right', 'top left', 'top right']`.
 *
 * Если во всех позициях в списке выпадающее меню вылезает за пределы `viewport`, будет использована первая.
 */
export const ExamplePositions: Story = () => {
  return (
    <div style={{ display: 'flex', gap: '24px' }}>
      <div>
        <span>bottom left</span>
        <Kebab positions={['bottom left']}>
          <MenuItem>Действие 1</MenuItem>
          <MenuItem>Действие 2</MenuItem>
          <MenuItem>Действие 3</MenuItem>
        </Kebab>
      </div>
      <div>
        <span>top center</span>
        <Kebab positions={['top center']}>
          <MenuItem>Действие 1</MenuItem>
          <MenuItem>Действие 2</MenuItem>
          <MenuItem>Действие 3</MenuItem>
        </Kebab>
      </div>
      <div>
        <span>right bottom</span>
        <Kebab positions={['right bottom']}>
          <MenuItem>Действие 1</MenuItem>
          <MenuItem>Действие 2</MenuItem>
          <MenuItem>Действие 3</MenuItem>
        </Kebab>
      </div>
    </div>
  );
};
ExamplePositions.storyName = 'Позиционирование';

/** Пропом `menuMaxHeight` можно задать максимальную высоту выпадающего меню в пикселях. */
export const ExampleMaxHeight: Story = () => {
  return (
    <Kebab menuMaxHeight={200}>
      <MenuItem>Действие 1</MenuItem>
      <MenuItem>Действие 2</MenuItem>
      <MenuItem>Действие 3</MenuItem>
      <MenuItem>Действие 4</MenuItem>
      <MenuItem>Действие 5</MenuItem>
      <MenuItem>Действие 6</MenuItem>
      <MenuItem>Действие 7</MenuItem>
      <MenuItem>Действие 8</MenuItem>
      <MenuItem>Действие 9</MenuItem>
    </Kebab>
  );
};
ExampleMaxHeight.storyName = 'Максимальная высота меню';

/** Проп `preventIconsOffset` отключает выравнивание текста пунктов меню относительно иконок в других пунктах. */
export const ExampleIconsOffset: Story = () => {
  return (
    <div style={{ display: 'flex', gap: '24px' }}>
      <div>
        <span>preventIconsOffset="false"</span>
        <Kebab>
          <MenuHeader>Заголовок</MenuHeader>
          <MenuItem icon={<CheckAIcon16Light />}>Действие 1</MenuItem>
          <MenuItem>Действие 2</MenuItem>
          <MenuItem>Действие 3</MenuItem>
        </Kebab>
      </div>
      <div>
        <span>preventIconsOffset="true"</span>
        <Kebab preventIconsOffset>
          <MenuHeader>Заголовок</MenuHeader>
          <MenuItem icon={<CheckAIcon16Light />}>Действие 1</MenuItem>
          <MenuItem>Действие 2</MenuItem>
          <MenuItem>Действие 3</MenuItem>
        </Kebab>
      </div>
    </div>
  );
};
ExampleIconsOffset.storyName = 'Выравнивание пунктов меню';

/** Пропом `icon` можно задать свою иконку кнопке. */
export const ExampleIcon: Story = () => {
  return (
    <Kebab icon={<PlusIcon16Light />}>
      <MenuItem>Действие 1</MenuItem>
      <MenuItem>Действие 2</MenuItem>
      <MenuItem>Действие 3</MenuItem>
    </Kebab>
  );
};
ExampleIcon.storyName = 'Кастомная иконка у кнопки';

/** Проп `disabled` блокирует кнопку, делая её недоступной для нажатия. */
export const ExampleDisabled: Story = () => {
  return (
    <Kebab disabled>
      <MenuItem>Действие 1</MenuItem>
      <MenuItem>Действие 2</MenuItem>
      <MenuItem>Действие 3</MenuItem>
    </Kebab>
  );
};
ExampleDisabled.storyName = 'Состояние блокировки';

/** Проп `disableAnimations` отключает анимацию выпадающего меню. */
export const ExampleDisableAnimations: Story = () => {
  return (
    <Kebab disableAnimations>
      <MenuItem>Действие 1</MenuItem>
      <MenuItem>Действие 2</MenuItem>
      <MenuItem>Действие 3</MenuItem>
    </Kebab>
  );
};
ExampleDisableAnimations.storyName = 'Отключение анимации';

/** Коллбеки `onOpen` и `onClose` вызываются при открытии и закрытии кебаб-меню. */
export const ExampleOnOpenAndClose: Story = () => {
  const [isOpened, setIsOpened] = React.useState(false);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
      <span>Кебаб-меню {isOpened ? 'открыто' : 'закрыто'}.</span>
      <Kebab onOpen={() => setIsOpened(true)} onClose={() => setIsOpened(false)}>
        <MenuItem>Действие 1</MenuItem>
        <MenuItem>Действие 2</MenuItem>
        <MenuItem>Действие 3</MenuItem>
      </Kebab>
    </div>
  );
};
ExampleOnOpenAndClose.storyName = 'События открытия и закрытия';
