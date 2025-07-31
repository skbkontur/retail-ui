import React from 'react';
import { CheckAIcon } from '@skbkontur/icons/icons/CheckAIcon';
import { UiMenuBars3HIcon32Regular } from '@skbkontur/icons/icons/UiMenuBars3HIcon';
import {
  DropdownMenu,
  Button,
  MenuHeader,
  MenuItem,
  MenuSeparator,
  Checkbox,
  ThemeContext,
  ThemeFactory,
  Gapped,
} from '@skbkontur/react-ui';

import type { Meta, Story } from '../../../typings/stories';

export default {
  title: 'Menu/DropdownMenu',
  component: DropdownMenu,
  parameters: { creevey: { skip: true } },
} as Meta;

export const Example1: Story = () => {
  return (
    <DropdownMenu caption={<Button use="primary">Открыть меню</Button>}>
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
Example1.storyName = 'Базовый пример меню';

export const Example2: Story = () => {
  return (
    <DropdownMenu caption={<Button use="primary">Открыть меню c заданной шириной</Button>} menuWidth={350}>
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
Example2.storyName = 'Ширина';

export const Example3: Story = () => {
  return (
    <DropdownMenu caption={<Button use="primary">Открыть меню c заданной высотой</Button>} menuMaxHeight={150}>
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
Example3.storyName = 'Максимальная высота';

export const Example4: Story = () => {
  return (
    <DropdownMenu positions={['left middle']} caption={<Button use="primary">Открыть меню</Button>}>
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
Example4.storyName = 'Выпадашка слева по центру';

export const Example5: Story = () => {
  return (
    <DropdownMenu
      header={<p>Это шапка в виде обычного текста</p>}
      footer={<Button>А это подвал в виде кнопки</Button>}
      caption={<Button use="primary">Открыть меню</Button>}
    >
      <MenuItem>Раз</MenuItem>
      <MenuItem>Два</MenuItem>
      <MenuItem>Три</MenuItem>
    </DropdownMenu>
  );
};
Example5.storyName = 'Меню c шапкой и подвалом';

export const Example6: Story = () => {
  return (
    <DropdownMenu caption={<Button use="primary">Открыть меню</Button>}>
      <MenuHeader>MenuHeader</MenuHeader>
      <MenuItem icon={<CheckAIcon />}>MenuItem1</MenuItem>
      <MenuItem icon={<CheckAIcon />}>MenuItem2</MenuItem>
      <MenuItem>MenuItem3</MenuItem>
    </DropdownMenu>
  );
};
Example6.storyName = 'Иконка и автовыравнивание текста';

export const Example7: Story = () => {
  return (
    <DropdownMenu preventIconsOffset caption={<Button use="primary">Открыть меню</Button>}>
      <MenuHeader>MenuHeader</MenuHeader>
      <MenuItem icon={<CheckAIcon />}>MenuItem1</MenuItem>
      <MenuItem icon={<CheckAIcon />}>MenuItem2</MenuItem>
      <MenuItem>MenuItem3</MenuItem>
    </DropdownMenu>
  );
};
Example7.storyName = 'Иконка и отключенное автовыравнивание текста';

export const Example8: Story = () => {
  return (
    <DropdownMenu disableAnimations caption={<Button use="primary">Открыть меню без анимации</Button>}>
      <MenuHeader>Заголовок меню</MenuHeader>
      <MenuSeparator />
      <MenuItem>Раз</MenuItem>
      <MenuItem>Два</MenuItem>
      <MenuItem>Три</MenuItem>
    </DropdownMenu>
  );
};
Example8.storyName = 'Отключенная анимация';

/** В `caption` можно передать любой элемент. */
export const Example9: Story = () => {
  return (
    <DropdownMenu
      caption={
        <span style={{ display: 'inline-block' }} tabIndex="0">
          <UiMenuBars3HIcon32Regular />
        </span>
      }
      menuWidth="300px"
    >
      <MenuItem>Раз</MenuItem>
      <MenuItem>Два</MenuItem>
      <MenuItem>Три</MenuItem>
    </DropdownMenu>
  );
};
Example9.storyName = 'Подпись';

export const Example10: Story = () => {
  const [checked, setChecked] = React.useState(false);

  let close;

  const renderCaption = ({ openMenu, closeMenu }) => {
    close = closeMenu;
    return (
      <Button onClick={openMenu} use="primary">
        Открыть меню
      </Button>
    );
  };

  return (
    <DropdownMenu caption={renderCaption}>
      <MenuItem onClick={(e) => e.preventDefault()}>Просто пункт</MenuItem>
      <ThemeContext.Provider value={ThemeFactory.create({ menuItemHoverBg: 'initial' })}>
        <MenuItem
          onClick={(e) => {
            e.preventDefault();
            setChecked(!checked);
          }}
        >
          <Checkbox checked={checked}>с чекбоксом</Checkbox>
        </MenuItem>
      </ThemeContext.Provider>
      <MenuItem
        onClick={(e) => {
          e.preventDefault();
          close();
        }}
      >
        Закрыть
      </MenuItem>
    </DropdownMenu>
  );
};
Example10.storyName = 'Чекбокс внутри MenuItem';

/** (с сохранением поведения MenuItem) */
export const Example11: Story = () => {
  const [showItems, setShowItems] = React.useState(false);

  const hiddenItems = [
    <MenuSeparator />,
    <MenuItem>А я скрываюсь</MenuItem>,
    <MenuItem>И я</MenuItem>,
    <MenuItem>Я с вами</MenuItem>,
  ];

  return (
    <Gapped>
      <Button onClick={() => setShowItems(!showItems)}>{showItems ? 'Спрятать' : 'Показать'} элементы</Button>

      <DropdownMenu caption={<Button use="primary">Открыть меню</Button>}>
        <MenuItem>Меня видно всегда</MenuItem>
        <MenuItem>Меня тоже</MenuItem>
        <MenuItem>Ага, и меня!</MenuItem>
        {showItems && hiddenItems}
      </DropdownMenu>
    </Gapped>
  );
};
Example11.storyName = 'Условный рендер элементов меню';
