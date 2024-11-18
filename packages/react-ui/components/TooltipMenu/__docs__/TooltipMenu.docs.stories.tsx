import React from 'react';
import MenuIcon from '@skbkontur/react-icons/Menu';
import LightbulbIcon from '@skbkontur/react-icons/Lightbulb';
import OkIcon from '@skbkontur/react-icons/Ok';
import { TooltipMenu, Button, MenuHeader, MenuItem, MenuSeparator, Gapped } from '@skbkontur/react-ui';

import { Meta, Story } from '../../../typings/stories';

export default {
  title: 'Menu/TooltipMenu',
  component: TooltipMenu,
  parameters: { creevey: { skip: true } },
} as Meta;

export const Example1: Story = () => {
  return (
    <TooltipMenu caption={<Button use="primary">Открыть меню</Button>}>
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
Example1.storyName = 'Базовый пример';

/** В проп `caption` помимо компонента можно передать функцию, возвращающую компонент, с помощью которой можно управлять текущим состоянием тултип-меню. */
export const Example2: Story = () => {
  return (
    <TooltipMenu
      caption={({ opened, openMenu, closeMenu, toggleMenu }) => {
        return (
          <>
            <p>Сейчас тултип-меню {opened ? 'окрыто' : 'закрыто'}</p>
            <Button onClick={toggleMenu}>Переключить меню</Button>
            <Button onClick={openMenu}>Открыть меню</Button>
            <Button onClick={closeMenu}>Закрыть меню</Button>
          </>
        );
      }}
    >
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
Example2.storyName = 'Управление состоянием тултип-меню';

export const Example3: Story = () => {
  return (
    <TooltipMenu caption={<Button use="primary">Открыть меню с заданной шириной</Button>} menuWidth={350}>
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
Example3.storyName = 'Ширина';

export const Example4: Story = () => {
  return (
    <TooltipMenu caption={<Button use="primary">Открыть меню с заданной высотой</Button>} menuMaxHeight={150}>
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
Example4.storyName = 'Максимальная высота';

export const Example5: Story = () => {
  return (
    <TooltipMenu disableAnimations caption={<Button use="primary">Открыть меню без анимации</Button>}>
      <MenuHeader>Заголовок меню</MenuHeader>
      <MenuSeparator />
      <MenuItem>Раз</MenuItem>
      <MenuItem>Два</MenuItem>
      <MenuItem>Три</MenuItem>
    </TooltipMenu>
  );
};
Example5.storyName = 'Отключенная анимация';

/** В `caption` можно передать любой элемент. */
export const Example6: Story = () => {
  return (
    <TooltipMenu
      caption={
        <span style={{ display: 'inline-block' }} tabIndex="0">
          <MenuIcon size={32} />
        </span>
      }
      menuWidth="300px"
    >
      <MenuItem>Раз</MenuItem>
      <MenuItem>Два</MenuItem>
      <MenuItem>Три</MenuItem>
    </TooltipMenu>
  );
};
Example6.storyName = 'Подпись';

export const Example7: Story = () => {
  return (
    <TooltipMenu
      caption={
        <span style={{ display: 'inline-block' }} tabIndex="0">
          <LightbulbIcon size={32} />
        </span>
      }
      menuWidth="300px"
      positions={['right top', 'right middle', 'right bottom']}
    >
      <MenuItem>Раз</MenuItem>
      <MenuItem>Два</MenuItem>
      <MenuItem>Три</MenuItem>
    </TooltipMenu>
  );
};
Example7.storyName = 'Тултип-меню всегда всплывающее справа от `caption`';

export const Example8: Story = () => {
  return (
    <TooltipMenu
      caption={
        <span style={{ display: 'inline-block' }} tabIndex="0">
          <LightbulbIcon size={32} />
        </span>
      }
      menuWidth="300px"
      positions={['top right']}
    >
      <MenuItem>Раз</MenuItem>
      <MenuItem>Два</MenuItem>
      <MenuItem>Три</MenuItem>
    </TooltipMenu>
  );
};
Example8.storyName = 'Тултип-меню всегда всплывающее сверху от `caption` и выравненное по правому краю `caption`';

export const Example9: Story = () => {
  return (
    <TooltipMenu
      header={<p>Это шапка в виде обычного текста</p>}
      footer={<Button>А это подвал в виде кнопки</Button>}
      caption={<Button use="primary">Открыть меню</Button>}
    >
      <MenuItem>Раз</MenuItem>
      <MenuItem>Два</MenuItem>
      <MenuItem>Три</MenuItem>
    </TooltipMenu>
  );
};
Example9.storyName = 'Тултип-меню c шапкой и подвалом';

export const Example10: Story = () => {
  return (
    <TooltipMenu caption={<Button use="primary">Открыть меню</Button>}>
      <MenuHeader>MenuHeader</MenuHeader>
      <MenuItem icon={<OkIcon />}>MenuItem1</MenuItem>
      <MenuItem icon={<OkIcon />}>MenuItem2</MenuItem>
      <MenuItem>MenuItem3</MenuItem>
    </TooltipMenu>
  );
};
Example10.storyName = 'Иконки и автовыравнивание';

export const Example11: Story = () => {
  return (
    <TooltipMenu preventIconsOffset caption={<Button use="primary">Открыть меню</Button>}>
      <MenuHeader>MenuHeader</MenuHeader>
      <MenuItem icon={<OkIcon />}>MenuItem1</MenuItem>
      <MenuItem icon={<OkIcon />}>MenuItem2</MenuItem>
      <MenuItem>MenuItem3</MenuItem>
    </TooltipMenu>
  );
};
Example11.storyName = 'Иконки и автовыравнивание';

/** (с сохранением поведения [MenuItem](#/Components/MenuItem)). */
export const Example12: Story = () => {
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

      <TooltipMenu caption={<Button use="primary">Открыть меню</Button>}>
        <MenuItem>Меня видно всегда</MenuItem>
        <MenuItem>Меня тоже</MenuItem>
        <MenuItem>Ага, и меня!</MenuItem>
        {showItems && hiddenItems}
      </TooltipMenu>
    </Gapped>
  );
};
Example12.storyName = 'Условный рендер элементов тултип-меню';
