import React from 'react';
import { CheckAIcon } from '@skbkontur/icons/icons/CheckAIcon';
import { HandThumbDownIcon } from '@skbkontur/icons/icons/HandThumbDownIcon';
import { TechPhoneSmartIcon } from '@skbkontur/icons/icons/TechPhoneSmartIcon';
import { MenuItem, Button, DropdownMenu, Link, Gapped } from '@skbkontur/react-ui';

import { Meta, Story } from '../../../typings/stories';

export default {
  title: 'Menu/MenuItem',
  component: MenuItem,
  parameters: { creevey: { skip: true } },
} as Meta;

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
      <MenuItem icon={<CheckAIcon />}>Базовый элемент меню c иконкой</MenuItem>
      <MenuItem disabled icon={<HandThumbDownIcon />}>
        Отключённый элемент меню с иконкой
      </MenuItem>
      <MenuItem icon={<TechPhoneSmartIcon />} comment="А слева вы можете видеть икону 21-го века">
        Элемент меню с описанием и иконкой
      </MenuItem>
    </DropdownMenu>
  );
};
Example5.storyName = 'Иконки в элементах';

export const Example6: Story = () => {
  const LinkMenuItem = ({ link, title }) => {
    return (
      <MenuItem
        href={link}
        component={({ href, ...rest }) => {
          return <Link target="_blank" rel="noopener noreferrer" href={href} {...rest} />;
        }}
      >
        {title}
      </MenuItem>
    );
  };

  return (
    <DropdownMenu caption={<Button use="primary">Открыть меню с ссылками</Button>}>
      <LinkMenuItem link="http://tech.skbkontur.ru/react-ui/" title="Начало документации" />
      <LinkMenuItem link="https://guides.kontur.ru/" title="Контур Гайды" />
      <LinkMenuItem link="https://github.com/skbkontur/retail-ui/graphs/contributors" title="Список прекрасных людей" />
    </DropdownMenu>
  );
};
Example6.storyName = 'Меню с элементами меню обёрнутыми в контрол ссылки';

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
