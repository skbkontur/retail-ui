import * as React from 'react';
import { ITheme } from '../../../lib/theming/Theme';
import ThemeProvider from '../ThemeProvider';
import Button from '../../Button';
import Tabs from '../../Tabs/Tabs';
import { ThemeType } from './enums';
import Gapped from '../../Gapped/Gapped';
import Link from '../../Link/Link';

import styles from './styles.less';

export interface IComponentsListProps {
  theme: ITheme;
  activeThemeId: ThemeType;
  onThemeChange: ((ev: { target: { value: string; }; }, value: string) => void)
  onEditLinkClick: () => void;
}

export const Playground = (props: IComponentsListProps) => {
  const { theme, activeThemeId, onThemeChange, onEditLinkClick } = props;

  return (
    <ThemeProvider value={theme}>
      <Gapped vertical gap={30}>
        <TabsGroup activeThemeId={activeThemeId} onEditLinkClick={onEditLinkClick} onThemeChange={onThemeChange}/>
        <ButtonsGroup/>
      </Gapped>
    </ThemeProvider>
  );
};

interface ITabsGroupProps {
  activeThemeId: ThemeType;
  onThemeChange: ((ev: { target: { value: string; }; }, value: string) => void)
  onEditLinkClick: () => void;
}

const TabsGroup = (props: ITabsGroupProps) => (
  <Gapped vertical={false} verticalAlign={'middle'} gap={80}>
    <Tabs value={props.activeThemeId} onChange={props.onThemeChange} vertical={false}>
      <Tabs.Tab id={ThemeType.Default}>Дефолтная тема</Tabs.Tab>
      <Tabs.Tab id={ThemeType.Flat}>Плоская тема</Tabs.Tab>
      <Tabs.Tab id={ThemeType.Custom}>Своя тема</Tabs.Tab>
    </Tabs>
    <Link onClick={props.onEditLinkClick}>Изменить свою тему</Link>
  </Gapped>
);

const ButtonsGroup = () => {
  const components = [
    <Button size={'small'}>Small</Button>,
    <Button size={'medium'}>Medium</Button>,
    <Button size={'large'}>Large</Button>,
  ];
  return renderComponentsGroup('Кнопки', components);
};

const renderComponentsGroup = (title: string, components: React.ReactNode[]) => (
  <Gapped vertical={false} verticalAlign={'top'} gap={10}>
    <div className={styles.title}>{title}</div>
    <div>
      <Gapped verticalAlign={'middle'} gap={20}>
        {components}
      </Gapped>
    </div>
  </Gapped>
);
