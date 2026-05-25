import { IconNatureFxLightningALight16 } from '@skbkontur/icons/IconNatureFxLightningALight16';
import { IconUiFilterFunnelRegular16 } from '@skbkontur/icons/IconUiFilterFunnelRegular16';
import { Dropdown, Gapped, MenuHeader, MenuItem, MenuSeparator } from '@skbkontur/react-ui';
import React from 'react';

import type { Meta, Story } from '../../../typings/stories.js';

const meta: Meta = {
  title: 'Menu/Dropdown',
  component: Dropdown,
  parameters: { creevey: { skip: true } },
};

export default meta;

/** Базовый пример с подписью и элементами меню в `children`. */
export const ExampleBasic: Story = () => {
  return (
    <Dropdown caption="Открыть меню">
      <MenuHeader>Действия</MenuHeader>
      <MenuSeparator />
      <MenuItem>Пункт 1</MenuItem>
      <MenuItem comment="С дополнительным описанием">Пункт 2</MenuItem>
      <MenuSeparator />
      <MenuItem>Пункт 3</MenuItem>
    </Dropdown>
  );
};
ExampleBasic.storyName = 'Базовый пример';

/** Проп `size` задаёт размер кнопки-меню. */
export const ExampleSize: Story = () => {
  return (
    <Gapped vertical>
      <Dropdown caption="Маленький" size="small">
        <MenuItem>Пункт 1</MenuItem>
        <MenuItem>Пункт 2</MenuItem>
      </Dropdown>
      <Dropdown caption="Средний" size="medium">
        <MenuItem>Пункт 1</MenuItem>
        <MenuItem>Пункт 2</MenuItem>
      </Dropdown>
      <Dropdown caption="Большой" size="large">
        <MenuItem>Пункт 1</MenuItem>
        <MenuItem>Пункт 2</MenuItem>
      </Dropdown>
    </Gapped>
  );
};
ExampleSize.storyName = 'Размер';

/** Проп `use` задаёт визуальный стиль кнопки-меню.
 * Доступные стили соответствуют кнопке, подробнее в [Button](https://tech.skbkontur.ru/kontur-ui/?path=/docs/react-ui_button-button--docs#%D1%81%D1%82%D0%B8%D0%BB%D1%8C). */
export const ExampleUse: Story = () => {
  return (
    <Gapped>
      <Dropdown caption="Accent" use="accent">
        <MenuItem>Пункт 1</MenuItem>
        <MenuItem>Пункт 2</MenuItem>
      </Dropdown>
      <Dropdown caption="Outline" use="outline">
        <MenuItem>Пункт 1</MenuItem>
        <MenuItem>Пункт 2</MenuItem>
      </Dropdown>
      <Dropdown caption="Success" use="success">
        <MenuItem>Пункт 1</MenuItem>
        <MenuItem>Пункт 2</MenuItem>
      </Dropdown>
    </Gapped>
  );
};
ExampleUse.storyName = 'Стиль кнопки';

/** Проп `icon` добавляет иконку слева от подписи кнопки. */
export const ExampleIcon: Story = () => {
  return (
    <Dropdown caption="С иконкой" icon={<IconUiFilterFunnelRegular16 />}>
      <MenuItem>Пункт 1</MenuItem>
      <MenuItem>Пункт 2</MenuItem>
    </Dropdown>
  );
};
ExampleIcon.storyName = 'Иконка';

/** Проп `width` задаёт ширину кнопки-меню. Может быть в пикселях, процентах или других конкретных единицах. Заданная ширина применяется к полю и выпадающему списку. */
export const ExampleWidth: Story = () => {
  return (
    <Gapped>
      <Dropdown caption="Кнопка шириной 220px" width={220}>
        <MenuItem>Пункт 1</MenuItem>
        <MenuItem>Пункт 2</MenuItem>
      </Dropdown>
      <Dropdown caption="Кнопка шириной 50%" width={'50%'}>
        <MenuItem>Пункт 1</MenuItem>
        <MenuItem>Пункт 2</MenuItem>
      </Dropdown>
    </Gapped>
  );
};
ExampleWidth.storyName = 'Ширина кнопки';

/** Проп `menuWidth` задаёт ширину выпадающего меню. */

export const ExampleMenuWidth: Story = () => {
  return (
    <Gapped>
      <Dropdown caption="Ширина меню 320px" menuWidth={320}>
        <MenuItem>Пункт 1</MenuItem>
        <MenuItem>Пункт 2</MenuItem>
      </Dropdown>
      <Dropdown caption="Ширина меню 150%" menuWidth={'150%'}>
        <MenuItem>Пункт 1</MenuItem>
        <MenuItem>Пункт 2</MenuItem>
      </Dropdown>
    </Gapped>
  );
};
ExampleMenuWidth.storyName = 'Ширина меню';

/** Проп `maxMenuHeight` ограничивает максимальную высоту меню. */
export const ExampleMaxMenuHeight: Story = () => {
  return (
    <Dropdown caption="Высота меню" maxMenuHeight={120}>
      <MenuItem>Пункт 1</MenuItem>
      <MenuItem>Пункт 2</MenuItem>
      <MenuItem>Пункт 3</MenuItem>
      <MenuItem>Пункт 4</MenuItem>
      <MenuItem>Пункт 5</MenuItem>
      <MenuItem>Пункт 6</MenuItem>
      <MenuItem>Пункт 7</MenuItem>
      <MenuItem>Пункт 8</MenuItem>
    </Dropdown>
  );
};
ExampleMaxMenuHeight.storyName = 'Максимальная высота меню';

/** Проп `menuPos` фиксирует расположение выпадающего меню. Оно может быть под полем — `"bottom"` или над полем — `"top"`.
 * По умолчанию меню раскрывается под полем, а если меню находится близко к нижней границе страницы, то оно динамически меняет расположение и раскрывается над полем. */
export const ExampleMenuPos: Story = () => {
  return (
    <Gapped>
      <Dropdown caption="Меню снизу" menuPos="bottom">
        <MenuItem>Пункт 1</MenuItem>
        <MenuItem>Пункт 2</MenuItem>
      </Dropdown>
      <Dropdown caption="Меню сверху" menuPos="top">
        <MenuItem>Пункт 1</MenuItem>
        <MenuItem>Пункт 2</MenuItem>
      </Dropdown>
    </Gapped>
  );
};
ExampleMenuPos.storyName = 'Расположение выпадающего меню';

/** Проп `menuAlign` выравнивает выпадающий список. Выпадающий список может быть прикреплен к левому краю — `"left"` или к правому — `"right"`. */
export const ExampleMenuAlign: Story = () => {
  return (
    <Gapped>
      <Dropdown caption="Выравнивание слева" menuAlign="left" menuWidth={260}>
        <MenuItem>Пункт 1</MenuItem>
        <MenuItem>Пункт 2</MenuItem>
      </Dropdown>
      <Dropdown caption="Выравнивание справа" menuAlign="right" menuWidth={260}>
        <MenuItem>Пункт 1</MenuItem>
        <MenuItem>Пункт 2</MenuItem>
      </Dropdown>
    </Gapped>
  );
};
ExampleMenuAlign.storyName = 'Выравнивание выпадающего меню';

/** Проп `preventIconsOffset` отключает выравнивание текста пунктов меню относительно иконок в других пунктах. */
export const ExamplePreventIconsOffset: Story = () => {
  return (
    <Gapped>
      <Dropdown caption="Без выравнивания" preventIconsOffset>
        <MenuItem icon={<IconNatureFxLightningALight16 />}>Пункт 1</MenuItem>
        <MenuItem>Пункт 2</MenuItem>
        <MenuItem>Пункт 3</MenuItem>
      </Dropdown>
      <Dropdown caption="С выравниванием">
        <MenuItem icon={<IconNatureFxLightningALight16 />}>Пункт 1</MenuItem>
        <MenuItem>Пункт 2</MenuItem>
        <MenuItem>Пункт 3</MenuItem>
      </Dropdown>
    </Gapped>
  );
};
ExamplePreventIconsOffset.storyName = 'Выравнивание пунктов меню';

/** Проп `disablePortal` отключает рендер через портал. */
export const ExampleDisablePortal: Story = () => {
  return (
    <Dropdown caption="Без портала" disablePortal>
      <MenuItem>Пункт 1</MenuItem>
      <MenuItem>Пункт 2</MenuItem>
    </Dropdown>
  );
};
ExampleDisablePortal.storyName = 'Отключение портала';

/** Проп `disabled` переводит компонент в недоступное состояние. */
export const ExampleDisabled: Story = () => {
  return (
    <Dropdown caption="Недоступно" disabled>
      <MenuItem>Пункт 1</MenuItem>
      <MenuItem>Пункт 2</MenuItem>
    </Dropdown>
  );
};
ExampleDisabled.storyName = 'Состояние блокировки';

/** Проп `error` показывает состояние ошибки. */
export const ExampleError: Story = () => {
  return (
    <Dropdown caption="Ошибка" error>
      <MenuItem>Пункт 1</MenuItem>
      <MenuItem>Пункт 2</MenuItem>
    </Dropdown>
  );
};
ExampleError.storyName = 'Состояние ошибки';

/** Проп `warning` показывает состояние предупреждения. */
export const ExampleWarning: Story = () => {
  return (
    <Dropdown caption="Предупреждение" warning>
      <MenuItem>Пункт 1</MenuItem>
      <MenuItem>Пункт 2</MenuItem>
    </Dropdown>
  );
};
ExampleWarning.storyName = 'Состояние предупреждения';

/** Коллбеки `onOpen` и `onClose` вызываются при открытии и закрытии меню. */
export const ExampleOpenCloseCallbacks: Story = () => {
  const [status, setStatus] = React.useState('Закрыто');

  return (
    <Gapped vertical>
      <Dropdown caption="Открыть" onOpen={() => setStatus('Открыто')} onClose={() => setStatus('Закрыто')}>
        <MenuItem>Пункт 1</MenuItem>
        <MenuItem>Пункт 2</MenuItem>
      </Dropdown>
      <span>{`Статус меню: ${status}`}</span>
    </Gapped>
  );
};
ExampleOpenCloseCallbacks.storyName = 'События открытия и закрытия';

/** Публичные методы `open()` и `close()` доступны через `ref`. */
export const ExampleRefMethods: Story = () => {
  const dropdownRef = React.useRef<Dropdown>(null);

  return (
    <Gapped>
      <Dropdown ref={dropdownRef} caption="Меню">
        <MenuItem>Пункт 1</MenuItem>
        <MenuItem>Пункт 2</MenuItem>
      </Dropdown>
      <button type="button" onClick={() => dropdownRef.current?.open()}>
        Открыть через ref
      </button>
      <button type="button" onClick={() => dropdownRef.current?.close()}>
        Закрыть через ref
      </button>
    </Gapped>
  );
};
ExampleRefMethods.storyName = 'Кастомизация: управление через ref';
