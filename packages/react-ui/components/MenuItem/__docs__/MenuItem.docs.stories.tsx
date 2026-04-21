import { IconArrowUiCornerOutUpRightRegular16 } from '@skbkontur/icons/IconArrowUiCornerOutUpRightRegular16';
import { IconCheckARegular16 } from '@skbkontur/icons/IconCheckARegular16';
import { IconHandThumbDownRegular16 } from '@skbkontur/icons/IconHandThumbDownRegular16';
import { IconTechPhoneSmartRegular16 } from '@skbkontur/icons/IconTechPhoneSmartRegular16';
import { Button, DropdownMenu, Gapped, MenuItem, MenuSeparator } from '@skbkontur/react-ui';
import React from 'react';

import type { Meta, Story } from '../../../typings/stories.js';

const meta: Meta = {
  title: 'Menu/MenuItem',
  component: MenuItem,
  parameters: { creevey: { skip: true } },
};

export default meta;

export const Example1: Story = () => {
  return (
    <DropdownMenu caption={<Button use="primary">Открыть меню с базовыми элементами меню</Button>}>
      <MenuItem>Базовый элемент меню</MenuItem>
      <MenuItem>Ещё один базовый элемент меню</MenuItem>
      <MenuItem>И ещё один</MenuItem>
    </DropdownMenu>
  );
};
Example1.storyName = 'Меню с базовыми элементами меню';

export const Example2: Story = () => {
  return (
    <DropdownMenu caption={<Button use="primary">Открыть меню с базовыми и заблокированными элементами</Button>}>
      <MenuItem>Это базовый элемент меню</MenuItem>
      <MenuItem disabled>А это заблокированный</MenuItem>
      <MenuItem>А это снова базовый</MenuItem>
      <MenuItem disabled>И снова заблокированный</MenuItem>
      <MenuItem disabled>И вот ещё один заблокированный</MenuItem>
    </DropdownMenu>
  );
};
Example2.storyName = 'Disabled';

/** В пункты меню можно передать проп `isNotSelectable`, чтобы запретить выделение и выбор этого пункта меню */
export const Example3: Story = () => {
  return (
    <DropdownMenu caption={<Button use="primary">Открыть меню с базовыми и отключёнными элементами</Button>}>
      <MenuItem>Это базовый элемент меню</MenuItem>
      <MenuItem isNotSelectable>А это отключённый</MenuItem>
      <MenuItem>А это снова базовый</MenuItem>
      <MenuItem isNotSelectable>И снова отключённый</MenuItem>
      <MenuItem isNotSelectable>И вот ещё один отключённый</MenuItem>
    </DropdownMenu>
  );
};
Example3.storyName = 'Запрет выделения';

export const Example4: Story = () => {
  return (
    <DropdownMenu caption={<Button use="primary">Открыть меню с причастными к Pied Piper</Button>}>
      <MenuItem comment="Системный инженер">Bertram Gilfoyle</MenuItem>
      <MenuItem comment="Hooli CEO">Gavin Belson</MenuItem>
      <MenuItem comment="Java-разработчик">Dinesh Chugtai</MenuItem>
      <MenuItem comment="Основатель Pied Piper">Richard Hendricks</MenuItem>
      <MenuItem comment="Владелец инкубатора">Erlich Bachman</MenuItem>
    </DropdownMenu>
  );
};
Example4.storyName = 'Описание элементов';

export const Example5: Story = () => {
  return (
    <DropdownMenu caption={<Button use="primary">Открыть меню с иконками</Button>}>
      <MenuItem icon={<IconCheckARegular16 />}>Базовый элемент меню c иконкой</MenuItem>
      <MenuItem disabled icon={<IconHandThumbDownRegular16 />}>
        Отключённый элемент меню с иконкой
      </MenuItem>
      <MenuItem icon={<IconTechPhoneSmartRegular16 />} comment="А слева вы можете видеть икону 21-го века">
        Элемент меню с описанием и иконкой
      </MenuItem>
    </DropdownMenu>
  );
};
Example5.storyName = 'Иконки в элементах';

/** В элементы меню можно передавать проп `href`, чтобы превратить их в ссылку. Лучше выделять такие элементы иконками. */
export const Example6: Story = () => {
  return (
    <DropdownMenu caption={<Button use="primary">Открыть меню с ссылками</Button>}>
      <MenuItem href="http://tech.skbkontur.ru/kontur-ui/" target="_blank" rel="noopener noreferrer">
        Начало документации
      </MenuItem>
      <MenuItem
        href="https://github.com/skbkontur/retail-ui/graphs/contributors"
        target="_blank"
        rel="noopener noreferrer"
      >
        Список прекрасных людей
      </MenuItem>
      <MenuSeparator />
      <MenuItem
        icon={<IconArrowUiCornerOutUpRightRegular16 />}
        href="https://guides.kontur.ru/"
        target="_blank"
        rel="noopener noreferrer"
      >
        Подробнее в Контур Гайдах
      </MenuItem>
    </DropdownMenu>
  );
};
Example6.storyName = 'Проп href';

export const Example7: Story = () => {
  return (
    <Gapped vertical>
      <MenuItem size={'small'}>Маленький</MenuItem>
      <MenuItem size={'medium'}>Средний</MenuItem>
      <MenuItem size={'large'}>Большой</MenuItem>
    </Gapped>
  );
};
Example7.storyName = 'Размер';
