import { IconCheckARegular16 } from '@skbkontur/icons/IconCheckARegular16';
import { IconUiMenuBars3HRegular32 } from '@skbkontur/icons/IconUiMenuBars3HRegular32';
import { Button, Gapped, MenuHeader, MenuItem, MenuSeparator, DropdownMenu, Checkbox } from '@skbkontur/react-ui';
import type { PopupMenuCaptionProps } from '@skbkontur/react-ui';
import React from 'react';

import type { Meta, Story } from '../../../typings/stories.js';

const meta: Meta = {
  title: 'Menu/DropdownMenu',
  component: DropdownMenu,
  parameters: { creevey: { skip: true } },
};

export default meta;

export const ExampleBasic: Story = () => {
  return (
    <DropdownMenu caption={<Button use="accent">Открыть меню</Button>}>
      <MenuHeader>Заголовок меню</MenuHeader>
      <MenuSeparator />
      <MenuItem>Раз</MenuItem>
      <MenuItem>Два</MenuItem>
      <MenuItem>Три</MenuItem>
      <MenuSeparator />
      <MenuItem>Раз</MenuItem>
      <MenuItem>Два</MenuItem>
      <MenuItem>Три</MenuItem>
    </DropdownMenu>
  );
};
ExampleBasic.storyName = 'Базовый пример';

/** В проп `caption` можно передать любой элемент для кнопки открытия. */
export const ExampleCaption: Story = () => {
  return (
    <DropdownMenu caption={<Button icon={<IconUiMenuBars3HRegular32 />} aria-label="Открыть меню" />} menuWidth="300px">
      <MenuItem>Раз</MenuItem>
      <MenuItem>Два</MenuItem>
      <MenuItem>Три</MenuItem>
    </DropdownMenu>
  );
};
ExampleCaption.storyName = 'Кнопка открытия меню';

/** В проп `caption` помимо компонента можно передать функцию, возвращающую компонент, с помощью которой можно управлять текущим состоянием тултип-меню через аргументы `opened`, `openMenu`, `closeMenu` и `toggleMenu`. */
export const ExampleState: Story = () => {
  return (
    <DropdownMenu
      caption={({ opened, openMenu, closeMenu, toggleMenu }) => {
        return (
          <Gapped vertical>
            <>DropdownMenu opened: {String(opened)}</>
            <Button onClick={() => toggleMenu()}>Переключить меню</Button>
            <Button onClick={() => openMenu()}>Открыть меню</Button>
            <Button onClick={() => closeMenu()}>Закрыть меню</Button>
          </Gapped>
        );
      }}
    >
      <MenuHeader>Заголовок меню</MenuHeader>
      <MenuSeparator />
      <MenuItem>Пункт 1</MenuItem>
      <MenuItem>Пункт 2</MenuItem>
      <MenuSeparator />
      <MenuItem>Пункт 3</MenuItem>
    </DropdownMenu>
  );
};
ExampleState.storyName = 'Управление состоянием тултип-меню';

/**
 * Проп `width` управляет шиирой меню.
 */
export const ExampleWidth: Story = () => {
  return (
    <DropdownMenu menuWidth={350} caption={<Button use="accent">Открыть меню</Button>}>
      <MenuHeader>Заголовок меню</MenuHeader>
      <MenuSeparator />
      <MenuItem>Пункт 1</MenuItem>
      <MenuItem>Пункт 2</MenuItem>
      <MenuSeparator />
      <MenuItem>Пункт 3</MenuItem>
    </DropdownMenu>
  );
};
ExampleWidth.storyName = 'Ширина';

/**
 * Проп `menuMaxHeight` управляет максимальной высотой меню. Если элементы не помещаются, показывается кроллбар.
 */
export const ExampleMaxHeight: Story = () => {
  return (
    <DropdownMenu caption={<Button use="accent">Открыть меню</Button>} menuMaxHeight={150}>
      <MenuHeader>Заголовок меню</MenuHeader>
      <MenuSeparator />
      <MenuItem>Раз</MenuItem>
      <MenuItem>Два</MenuItem>
      <MenuItem>Три</MenuItem>
      <MenuSeparator />
      <MenuItem>Раз</MenuItem>
      <MenuItem>Два</MenuItem>
      <MenuItem>Три</MenuItem>
    </DropdownMenu>
  );
};
ExampleMaxHeight.storyName = 'Максимальная высота';

/**
 * Проп `positions` определяет список позиций доступных для расположения выпадашки относительно `caption`
 */
export const ExampleMenuPos: Story = () => {
  return (
    <Gapped vertical>
      <DropdownMenu
        caption={<Button use="accent">Открыть меню "right top"</Button>}
        menuWidth="300px"
        positions={['right top', 'right middle', 'right bottom']}
      >
        <MenuItem>Раз</MenuItem>
        <MenuItem>Два</MenuItem>
        <MenuItem>Три</MenuItem>
      </DropdownMenu>

      <DropdownMenu
        caption={<Button use="accent">Открыть меню "top right"</Button>}
        menuWidth="300px"
        positions={['top right']}
      >
        <MenuItem>Раз</MenuItem>
        <MenuItem>Два</MenuItem>
        <MenuItem>Три</MenuItem>
      </DropdownMenu>
    </Gapped>
  );
};
ExampleMenuPos.storyName = 'Позиционирование';

/**
 * В пропы `header` и `footer` вкладывается контент шапки и подвала.
 */
export const ExampleHeaderFooter: Story = () => {
  return (
    <DropdownMenu
      header={<p>Заголовок</p>}
      footer={<Button>Подвал</Button>}
      caption={<Button use="accent">Открыть меню</Button>}
    >
      <MenuItem>Раз</MenuItem>
      <MenuItem>Два</MenuItem>
      <MenuItem>Три</MenuItem>
    </DropdownMenu>
  );
};
ExampleHeaderFooter.storyName = 'Шапка и подвал меню';

/**
 * Проп `preventIconsOffset` отключает выравнивание иконок у пунктов. По умолчанию пункты без иконок выравниваются по тексту пунктов с иконками.
 */
export const ExampleIconsAlign: Story = () => {
  return (
    <Gapped vertical>
      <DropdownMenu caption={<Button use="accent">Автовыравнивание иконок</Button>}>
        <MenuHeader>Заголовок</MenuHeader>
        <MenuItem icon={<IconCheckARegular16 />}>Пункт меню</MenuItem>
        <MenuItem icon={<IconCheckARegular16 />}>Пункт меню</MenuItem>
        <MenuItem>Пункт меню</MenuItem>
      </DropdownMenu>

      <DropdownMenu preventIconsOffset caption={<Button use="accent">Без автовыравнивания</Button>}>
        <MenuHeader>Заголовок</MenuHeader>
        <MenuItem icon={<IconCheckARegular16 />}>Пункт меню</MenuItem>
        <MenuItem icon={<IconCheckARegular16 />}>Пункт меню</MenuItem>
        <MenuItem>Пункт меню</MenuItem>
      </DropdownMenu>
    </Gapped>
  );
};
ExampleIconsAlign.storyName = 'Иконки и автовыравнивание';

/**
 * Проп `disableAnimations` отключает анимацию открытия меню.
 */
export const ExampleDisableAnimations: Story = () => {
  return (
    <DropdownMenu disableAnimations caption={<Button use="accent">Открыть меню</Button>}>
      <MenuHeader>Заголовок меню</MenuHeader>
      <MenuSeparator />
      <MenuItem>Раз</MenuItem>
      <MenuItem>Два</MenuItem>
      <MenuItem>Три</MenuItem>
    </DropdownMenu>
  );
};
ExampleDisableAnimations.storyName = 'Отключение анимации';

/** Если клик по `MenuItem` не должен закрывать меню, вызовите `event.preventDefault()`. */
export const ExamplePreventClose: Story = () => {
  const [onlyActive, setOnlyActive] = React.useState(false);
  const closeMenuRef = React.useRef<PopupMenuCaptionProps['closeMenu']>(() => undefined);

  const renderCaption = ({ openMenu, closeMenu }: PopupMenuCaptionProps) => {
    closeMenuRef.current = closeMenu;

    return (
      <Button use="primary" onClick={() => openMenu()}>
        Настроить фильтр
      </Button>
    );
  };

  return (
    <DropdownMenu caption={renderCaption}>
      <MenuItem
        onClick={(event) => {
          event.preventDefault();
          setOnlyActive(!onlyActive);
        }}
      >
        <Checkbox checked={onlyActive}>Только активные</Checkbox>
      </MenuItem>
      <MenuSeparator />
      <MenuItem
        onClick={(event) => {
          event.preventDefault();
          closeMenuRef.current();
        }}
      >
        Применить
      </MenuItem>
    </DropdownMenu>
  );
};
ExamplePreventClose.storyName = 'Пункт без закрытия меню';

/** Коллбеки `onOpen` и `onClose` вызываются при открытии и закрытии меню. */
export const ExampleOpenCloseCallbacks: Story = () => {
  const [status, setStatus] = React.useState('Закрыто');

  return (
    <Gapped vertical>
      <DropdownMenu
        caption={<Button use="primary">Открыть меню</Button>}
        onOpen={() => setStatus('Открыто')}
        onClose={() => setStatus('Закрыто')}
      >
        <MenuItem>Пункт 1</MenuItem>
        <MenuItem>Пункт 2</MenuItem>
      </DropdownMenu>
      <span>{`Статус меню: ${status}`}</span>
    </Gapped>
  );
};
ExampleOpenCloseCallbacks.storyName = 'События открытия и закрытия';

/** Публичные методы `open()` и `close()` доступны через `ref`. */
export const ExampleRefMethods: Story = () => {
  const dropdownMenuRef = React.useRef<DropdownMenu>(null);

  return (
    <Gapped>
      <button type="button" onClick={() => dropdownMenuRef.current?.open()}>
        Открыть через ref
      </button>
      <button type="button" onClick={() => dropdownMenuRef.current?.close()}>
        Закрыть через ref
      </button>
      <DropdownMenu ref={dropdownMenuRef} caption={<Button use="primary">Меню</Button>}>
        <MenuItem>Пункт 1</MenuItem>
        <MenuItem>Пункт 2</MenuItem>
      </DropdownMenu>
    </Gapped>
  );
};
ExampleRefMethods.storyName = 'Кастомизация: управление через ref';
