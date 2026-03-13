import React from 'react';
import { UiFilterFunnelIcon16Regular } from '@skbkontur/icons/icons/UiFilterFunnelIcon/UiFilterFunnelIcon16Regular';
import { Dropdown, Gapped, MenuHeader, MenuItem, MenuSeparator } from '@skbkontur/react-ui';

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
        <MenuItem>Small 1</MenuItem>
        <MenuItem>Small 2</MenuItem>
      </Dropdown>
      <Dropdown caption="Средний" size="medium">
        <MenuItem>Medium 1</MenuItem>
        <MenuItem>Medium 2</MenuItem>
      </Dropdown>
      <Dropdown caption="Большой" size="large">
        <MenuItem>Large 1</MenuItem>
        <MenuItem>Large 2</MenuItem>
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
      <Dropdown caption="Default" use="default">
        <MenuItem>Default 1</MenuItem>
        <MenuItem>Default 2</MenuItem>
      </Dropdown>
      <Dropdown caption="Primary" use="primary">
        <MenuItem>Primary 1</MenuItem>
        <MenuItem>Primary 2</MenuItem>
      </Dropdown>
      <Dropdown caption="Danger" use="danger">
        <MenuItem>Danger 1</MenuItem>
        <MenuItem>Danger 2</MenuItem>
      </Dropdown>
    </Gapped>
  );
};
ExampleUse.storyName = 'Стиль кнопки';

/** Проп `icon` добавляет иконку слева от подписи кнопки. */
export const ExampleIcon: Story = () => {
  return (
    <Dropdown caption="С иконкой" icon={<UiFilterFunnelIcon16Regular />}>
      <MenuItem>Icon 1</MenuItem>
      <MenuItem>Icon 2</MenuItem>
    </Dropdown>
  );
};
ExampleIcon.storyName = 'Иконка';

/** Проп `disabled` переводит компонент в недоступное состояние. */
export const ExampleDisabled: Story = () => {
  return (
    <Dropdown caption="Недоступно" disabled>
      <MenuItem>Disabled 1</MenuItem>
      <MenuItem>Disabled 2</MenuItem>
    </Dropdown>
  );
};
ExampleDisabled.storyName = 'Состояние блокировки';

/** Проп `error` показывает состояние ошибки. */
export const ExampleError: Story = () => {
  return (
    <Dropdown caption="Ошибка" error>
      <MenuItem>Error 1</MenuItem>
      <MenuItem>Error 2</MenuItem>
    </Dropdown>
  );
};
ExampleError.storyName = 'Состояние ошибки';

/** Проп `warning` показывает состояние предупреждения. */
export const ExampleWarning: Story = () => {
  return (
    <Dropdown caption="Предупреждение" warning>
      <MenuItem>Warning 1</MenuItem>
      <MenuItem>Warning 2</MenuItem>
    </Dropdown>
  );
};
ExampleWarning.storyName = 'Состояние предупреждения';

/** Проп `width` задаёт ширину кнопки-меню. Может быть в пикселях, процентах или других конкретных единицах. Заданная ширина применяется к полю и выпадающему списку. */
export const ExampleWidth: Story = () => {
  return (
    <div>
      <Dropdown caption="Кнопка шириной 220px" width={220}>
        <MenuItem>Width 1</MenuItem>
        <MenuItem>Width 2</MenuItem>
      </Dropdown>
      <Dropdown caption="Кнопка шириной 50%" width={'50%'}>
        <MenuItem>Width 1</MenuItem>
        <MenuItem>Width 2</MenuItem>
      </Dropdown>
    </div>
  );
};
ExampleWidth.storyName = 'Ширина кнопки';

/** Проп `menuWidth` задаёт ширину выпадающего меню. */

export const ExampleMenuWidth: Story = () => {
  return (
    <div>
      <Dropdown caption="Ширина меню 320px" menuWidth={320}>
        <MenuItem>MenuWidth 1</MenuItem>
        <MenuItem>MenuWidth 2</MenuItem>
      </Dropdown>
      <Dropdown caption="Ширина меню 150%" menuWidth={'150%'}>
        <MenuItem>MenuWidth 1</MenuItem>
        <MenuItem>MenuWidth 2</MenuItem>
      </Dropdown>
    </div>
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
        <MenuItem>Bottom 1</MenuItem>
        <MenuItem>Bottom 2</MenuItem>
      </Dropdown>
      <Dropdown caption="Меню сверху" menuPos="top">
        <MenuItem>Top 1</MenuItem>
        <MenuItem>Top 2</MenuItem>
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
        <MenuItem>Left 1</MenuItem>
        <MenuItem>Left 2</MenuItem>
      </Dropdown>
      <Dropdown caption="Выравнивание справа" menuAlign="right" menuWidth={260}>
        <MenuItem>Right 1</MenuItem>
        <MenuItem>Right 2</MenuItem>
      </Dropdown>
    </Gapped>
  );
};
ExampleMenuAlign.storyName = 'Выравнивание выпадающего меню';

/** Проп `disablePortal` отключает рендер через портал. */
export const ExampleDisablePortal: Story = () => {
  return (
    <Dropdown caption="Без портала" disablePortal>
      <MenuItem>Portal 1</MenuItem>
      <MenuItem>Portal 2</MenuItem>
    </Dropdown>
  );
};
ExampleDisablePortal.storyName = 'Отключение портала';

/** Коллбеки `onOpen` и `onClose` вызываются при открытии и закрытии меню. */
export const ExampleOpenCloseCallbacks: Story = () => {
  const [status, setStatus] = React.useState('Закрыто');

  return (
    <Gapped vertical>
      <Dropdown caption="Открыть" onOpen={() => setStatus('Открыто')} onClose={() => setStatus('Закрыто')}>
        <MenuItem>Callbacks 1</MenuItem>
        <MenuItem>Callbacks 2</MenuItem>
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
      <button type="button" onClick={() => dropdownRef.current?.open()}>
        Открыть через ref
      </button>
      <button type="button" onClick={() => dropdownRef.current?.close()}>
        Закрыть через ref
      </button>
      <Dropdown ref={dropdownRef} caption="Меню">
        <MenuItem>Ref 1</MenuItem>
        <MenuItem>Ref 2</MenuItem>
      </Dropdown>
    </Gapped>
  );
};
ExampleRefMethods.storyName = 'Кастомизация: управление через ref';
