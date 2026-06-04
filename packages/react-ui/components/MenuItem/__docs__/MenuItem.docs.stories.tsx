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

export const ExampleBasic: Story = () => {
  return (
    <DropdownMenu caption={<Button use="accent">Открыть меню</Button>}>
      <MenuItem>Пункт 1</MenuItem>
      <MenuItem>Пункт 2</MenuItem>
      <MenuItem>Пункт 3</MenuItem>
    </DropdownMenu>
  );
};
ExampleBasic.storyName = 'Меню с базовыми элементами меню';

/** Проп `size` задаёт размер. */
export const ExampleSize: Story = () => {
  return (
    <Gapped vertical gap={20}>
      <DropdownMenu
        caption={
          <Button size="small" use="accent">
            Маленький
          </Button>
        }
      >
        <MenuItem size="small">Пункт 1</MenuItem>
        <MenuItem size="small">Пункт 2</MenuItem>
      </DropdownMenu>

      <DropdownMenu
        caption={
          <Button size="medium" use="accent">
            Средний
          </Button>
        }
      >
        <MenuItem size="medium">Пункт 1</MenuItem>
        <MenuItem size="medium">Пункт 2</MenuItem>
      </DropdownMenu>

      <DropdownMenu
        caption={
          <Button size="large" use="accent">
            Большой
          </Button>
        }
      >
        <MenuItem size="large">Пункт 1</MenuItem>
        <MenuItem size="large">Пункт 2</MenuItem>
      </DropdownMenu>
    </Gapped>
  );
};
ExampleSize.storyName = 'Размер';

/**
 * Проп `comment` добавляет описания к пунктам.
 */
export const ExampleDescription: Story = () => {
  return (
    <DropdownMenu caption={<Button use="primary">Открыть меню</Button>}>
      <MenuItem comment="Описание пункта">Пункт меню</MenuItem>
      <MenuItem comment="Описание пункта">Пункт меню</MenuItem>
      <MenuItem comment="Описание пункта">Пункт меню</MenuItem>
      <MenuItem comment="Описание пункта">Пункт меню</MenuItem>
      <MenuItem comment="Описание пункта">Пункт меню</MenuItem>
      <MenuItem comment="Описание пункта">Пункт меню</MenuItem>
    </DropdownMenu>
  );
};
ExampleDescription.storyName = 'Описание элементов';

/** Проп `disabled` делает пункты неактивными и перекрашивает в серый цвет. */
export const ExampleDisabled: Story = () => {
  return (
    <DropdownMenu caption={<Button use="primary">Открыть меню</Button>}>
      <MenuItem>Пункт меню</MenuItem>
      <MenuItem>Пункт меню</MenuItem>
      <MenuItem disabled>Заблокированный пункт меню</MenuItem>
      <MenuItem disabled>И снова заблокированный</MenuItem>
      <MenuItem>Пункт меню</MenuItem>
    </DropdownMenu>
  );
};
ExampleDisabled.storyName = 'Заблокированные пункты';

/** Проп `isNotSelectable` запрещает выделение и выбор пункта меню. */
export const Example3: Story = () => {
  return (
    <DropdownMenu caption={<Button use="primary">Открыть меню</Button>}>
      <MenuItem>Пункт меню</MenuItem>
      <MenuItem>Пункт меню</MenuItem>
      <MenuItem isNotSelectable>Пункт меню без выделения и выбора</MenuItem>
      <MenuItem isNotSelectable>Пункт меню без выделения и выбора</MenuItem>
    </DropdownMenu>
  );
};
Example3.storyName = 'Запрет выделения';

/** Проп `icon` добавляет иконку слева. */
export const ExampleIcons: Story = () => {
  return (
    <DropdownMenu caption={<Button use="primary">Открыть меню с иконками</Button>}>
      <MenuItem icon={<IconCheckARegular16 />}>Пункт меню</MenuItem>
      <MenuItem icon={<IconTechPhoneSmartRegular16 />} comment="Подпись">
        Пункт меню
      </MenuItem>
      <MenuItem disabled icon={<IconHandThumbDownRegular16 />}>
        Пункт меню
      </MenuItem>
    </DropdownMenu>
  );
};
ExampleIcons.storyName = 'Иконки в элементах';

/** Для указания ссылки используйте `href`. Рекомендуется выделять такие элементы иконками. */
export const ExampleLink: Story = () => {
  return (
    <DropdownMenu caption={<Button use="primary">Открыть меню со ссылкой</Button>}>
      <MenuItem>Пункт 1</MenuItem>
      <MenuItem>Пункт 2</MenuItem>
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
ExampleLink.storyName = 'Ссылки';
