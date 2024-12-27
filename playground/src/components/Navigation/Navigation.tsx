import { Kontur, Product } from '@skbkontur/logos';
import { MenuItem, MenuSeparator } from '@skbkontur/react-ui';
import { StackHDownIcon24Regular } from '@skbkontur/icons/icons/StackHDownIcon/StackHDownIcon24Regular';
import { SettingsGearIcon24Regular } from '@skbkontur/icons/icons/SettingsGearIcon/SettingsGearIcon24Regular';
import { AttachLinkIcon } from '@skbkontur/icons/icons/AttachLinkIcon';
import { WarningCircleIcon } from '@skbkontur/icons/icons/WarningCircleIcon';
import { DocTextIcon } from '@skbkontur/icons/icons/DocTextIcon';
import { ArrowCollapseTrianglesHOpenIcon } from '@skbkontur/icons/icons/ArrowCollapseTrianglesHOpenIcon';
import { FC } from 'react';
import { SideMenu } from '@skbkontur/side-menu';
import { SideMenuRouterLink } from './SideMenuRouterLink';

export const Navigation: FC = () => {
  return (
    <SideMenu style={{ height: '100vh' }}>
      <SideMenu.Header konturLogo={<Kontur />} productLogo={<Product />} />
      <SideMenu.Body>
        <SideMenuRouterLink icon={<AttachLinkIcon />} href={'/'} caption={'Home'} />
        <SideMenuRouterLink icon={<WarningCircleIcon />} href={'/error'} caption={'Error'} />
        <SideMenuRouterLink icon={<DocTextIcon />} href={'/expirements'} caption={'Expirements'} />
        <SideMenuRouterLink
          icon={<ArrowCollapseTrianglesHOpenIcon />}
          href={'/mass-actions-panel'}
          caption={'MassActionsPanel'}
        />
      </SideMenu.Body>
      <SideMenu.Footer>
        <SideMenu.Organisations icon={<StackHDownIcon24Regular />}>
          <MenuItem>СКБ Контур</MenuItem>
          <MenuItem>Промэлектроника</MenuItem>
          <MenuSeparator />
          <MenuItem>Список организаций</MenuItem>
        </SideMenu.Organisations>
        <SideMenu.Item icon={<SettingsGearIcon24Regular />} caption={'Реквизиты и настройки'} />
        <SideMenu.Avatar userName={'Пользотель Пользовательский'}>
          <MenuItem href={'https://cabinet.kontur.ru'} target="_blank">
            Личный кабинет
          </MenuItem>
          <MenuItem>Безопасность</MenuItem>
          <MenuSeparator />
          <MenuItem>Выйти</MenuItem>
        </SideMenu.Avatar>
      </SideMenu.Footer>
    </SideMenu>
  );
};
