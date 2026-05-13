import { IconCheckARegular16 } from '@skbkontur/icons/IconCheckARegular16';
import { IconUiMenuBars3HRegular32 } from '@skbkontur/icons/IconUiMenuBars3HRegular32';
import { Button, Gapped, MenuHeader, MenuItem, MenuSeparator, TooltipMenu } from '@skbkontur/react-ui';
import React from 'react';

import type { Meta, Story } from '../../../typings/stories.js';

const meta: Meta = {
  title: 'Menu/TooltipMenu',
  component: TooltipMenu,
  parameters: { creevey: { skip: true } },
};

export default meta;

export const ExampleBasic: Story = () => {
  return (
    <TooltipMenu caption={<Button use="accent">Открыть меню</Button>}>
      <MenuHeader>Заголовок меню</MenuHeader>
      <MenuSeparator />
      <MenuItem>Раз</MenuItem>
      <MenuItem>Два</MenuItem>
      <MenuItem>Три</MenuItem>
      <MenuSeparator />
      <MenuItem>Раз</MenuItem>
      <MenuItem>Два</MenuItem>
      <MenuItem>Три</MenuItem>
    </TooltipMenu>
  );
};
ExampleBasic.storyName = 'Базовый пример';

/** В проп `caption` можно передать любой элемент для кнопки открытия. */
export const ExampleCaption: Story = () => {
  return (
    <TooltipMenu caption={<Button icon={<IconUiMenuBars3HRegular32 />} aria-label="Открыть меню" />} menuWidth="300px">
      <MenuItem>Раз</MenuItem>
      <MenuItem>Два</MenuItem>
      <MenuItem>Три</MenuItem>
    </TooltipMenu>
  );
};
ExampleCaption.storyName = 'Кнопка открытия меню';

/** В проп `caption` помимо компонента можно передать функцию, возвращающую компонент, с помощью которой можно управлять текущим состоянием тултип-меню через аргументы `opened`, `openMenu`, `closeMenu` и `toggleMenu`. */
export const ExampleState: Story = () => {
  return (
    <TooltipMenu
      caption={({ opened, openMenu, closeMenu, toggleMenu }) => {
        return (
          <Gapped vertical>
            <>TooltipMenu opened: {String(opened)}</>
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
    </TooltipMenu>
  );
};
ExampleState.storyName = 'Управление состоянием тултип-меню';

/**
 * Проп `width` управляет шиирой меню.
 */
export const ExampleWidth: Story = () => {
  return (
    <TooltipMenu menuWidth={350} caption={<Button use="accent">Открыть меню</Button>}>
      <MenuHeader>Заголовок меню</MenuHeader>
      <MenuSeparator />
      <MenuItem>Пункт 1</MenuItem>
      <MenuItem>Пункт 2</MenuItem>
      <MenuSeparator />
      <MenuItem>Пункт 3</MenuItem>
    </TooltipMenu>
  );
};
ExampleWidth.storyName = 'Ширина';

/**
 * Проп `menuMaxHeight` управляет максимальной высотой меню. Если элементы не помещаются, показывается кроллбар.
 */
export const ExampleMaxHeight: Story = () => {
  return (
    <TooltipMenu caption={<Button use="accent">Открыть меню</Button>} menuMaxHeight={150}>
      <MenuHeader>Заголовок меню</MenuHeader>
      <MenuSeparator />
      <MenuItem>Раз</MenuItem>
      <MenuItem>Два</MenuItem>
      <MenuItem>Три</MenuItem>
      <MenuSeparator />
      <MenuItem>Раз</MenuItem>
      <MenuItem>Два</MenuItem>
      <MenuItem>Три</MenuItem>
    </TooltipMenu>
  );
};
ExampleMaxHeight.storyName = 'Максимальная высота';

/**
 * Проп `disableAnimations` отключает анимацию открытия меню.
 */
export const ExampleDisableAnimations: Story = () => {
  return (
    <TooltipMenu disableAnimations caption={<Button use="accent">Открыть меню</Button>}>
      <MenuHeader>Заголовок меню</MenuHeader>
      <MenuSeparator />
      <MenuItem>Раз</MenuItem>
      <MenuItem>Два</MenuItem>
      <MenuItem>Три</MenuItem>
    </TooltipMenu>
  );
};
ExampleDisableAnimations.storyName = 'Отключение анимации';

/**
 * Проп `positions` определяет список позиций доступных для расположения выпадашки относительно `caption`.
 */
export const ExampleMenuPos: Story = () => {
  return (
    <Gapped vertical>
      <TooltipMenu
        caption={<Button use="accent">Открыть меню "right top"</Button>}
        menuWidth="300px"
        positions={['right top', 'right middle', 'right bottom']}
      >
        <MenuItem>Раз</MenuItem>
        <MenuItem>Два</MenuItem>
        <MenuItem>Три</MenuItem>
      </TooltipMenu>

      <TooltipMenu
        caption={<Button use="accent">Открыть меню "top right"</Button>}
        menuWidth="300px"
        positions={['top right']}
      >
        <MenuItem>Раз</MenuItem>
        <MenuItem>Два</MenuItem>
        <MenuItem>Три</MenuItem>
      </TooltipMenu>
    </Gapped>
  );
};
ExampleMenuPos.storyName = 'Позиционирование';

/**
 * В пропы `header` и `footer` вкладывается контент шапки и подвала.
 */
export const ExampleHeaderFooter: Story = () => {
  return (
    <TooltipMenu
      header={<p>Заголовок</p>}
      footer={<Button>Подвал</Button>}
      caption={<Button use="accent">Открыть меню</Button>}
    >
      <MenuItem>Раз</MenuItem>
      <MenuItem>Два</MenuItem>
      <MenuItem>Три</MenuItem>
    </TooltipMenu>
  );
};
ExampleHeaderFooter.storyName = 'Меню c шапкой и подвалом';

/**
 * Проп `preventIconsOffset` отключает выравнивание иконок у пунктов.
 */
export const ExampleIconsAlign: Story = () => {
  return (
    <Gapped vertical>
      <TooltipMenu caption={<Button use="accent">Автовыравнивание иконок</Button>}>
        <MenuHeader>Заголовок</MenuHeader>
        <MenuItem icon={<IconCheckARegular16 />}>Пункт меню</MenuItem>
        <MenuItem icon={<IconCheckARegular16 />}>Пункт меню</MenuItem>
        <MenuItem>Пункт меню</MenuItem>
      </TooltipMenu>

      <TooltipMenu preventIconsOffset caption={<Button use="accent">Без автовыравнивания</Button>}>
        <MenuHeader>Заголовок</MenuHeader>
        <MenuItem icon={<IconCheckARegular16 />}>Пункт меню</MenuItem>
        <MenuItem icon={<IconCheckARegular16 />}>Пункт меню</MenuItem>
        <MenuItem>Пункт меню</MenuItem>
      </TooltipMenu>
    </Gapped>
  );
};
ExampleIconsAlign.storyName = 'Иконки и автовыравнивание';
