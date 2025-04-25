import React from 'react';
import { Button, ThemeContext, ThemeFactory, LIGHT_THEME, DARK_THEME } from '@skbkontur/react-ui';
import { ShowcaseGroup } from '@skbkontur/react-ui/internal/ThemePlayground/ShowcaseGroup';

import type { Meta, Story } from '../../../typings/stories';
import * as ALL_LIGHT_THEMES from '../../../lib/theming/themes/LightTheme';
import * as ALL_DARK_THEMES from '../../../lib/theming/themes/DarkTheme';
import { parseVersionFromThemeName } from '../../../lib/theming/ThemeVersions';

export default {
  title: 'Information/Theme/ThemeContext',
  parameters: { creevey: { skip: true } },
} as Meta;

export const Example1: Story = () => {
  const myTheme = ThemeFactory.create({ btnBorderRadiusSmall: '10px' });

  return (
    <ThemeContext.Provider value={myTheme}>
      <div style={{ height: '100%', background: '#fff', padding: '16px' }}>
        <ShowcaseGroup title="My Theme" />
      </div>
    </ThemeContext.Provider>
  );
};
Example1.storyName = 'Создание собственной темы';

export const Example2: Story = () => {
  function ButtonLinkWrapper(props) {
    const theme = React.useContext(ThemeContext);

    return (
      <Button use="link" {...props}>
        {props.children}
        <span style={{ color: theme.textColorDefault }}> ↗</span>
      </Button>
    );
  }

  return <ButtonLinkWrapper>ButtonLinkWrapper</ButtonLinkWrapper>;
};
Example2.storyName = 'Использование темы в своих компонентах';

export const Example3: Story = () => {
  const MyThemeContext = React.createContext(ThemeFactory.create<{ myTextColor: string }>({ myTextColor: 'orange' }));

  MyThemeContext.displayName = 'MyThemeContext';

  function ButtonLinkWrapper(props) {
    const theme = React.useContext(MyThemeContext);

    return (
      <Button use="link" {...props}>
        {props.children}
        <span style={{ color: theme.myTextColor }}> ↗</span>
      </Button>
    );
  }

  return <ButtonLinkWrapper>ButtonLinkWrapper</ButtonLinkWrapper>;
};
Example3.storyName = 'Добавление своих переменных';

export const Example4: Story = () => {
  const CombinedComponents = () => (
    <>
      <div style={{ height: '100%', background: '#fff', padding: '16px' }}>
        <ThemeContext.Provider value={LIGHT_THEME}>
          <div>
            <ShowcaseGroup title="LIGHT_THEME" />
          </div>
        </ThemeContext.Provider>
      </div>
      <div style={{ height: '100%', background: '#000', padding: '16px' }}>
        <ThemeContext.Provider value={DARK_THEME}>
          <div>
            <ShowcaseGroup title="DARK_THEME" />
          </div>
        </ThemeContext.Provider>
      </div>
    </>
  );
  return <CombinedComponents />;
};
Example4.storyName = 'Несколько тем одновременно';

export const Example5: Story = () => {
  const wrapperStyles = {
    border: '1px solid rgb(188, 187, 187)',
    padding: '0 15px 15px',
    marginTop: 25,
  };

  const NestedThemes = () => (
    <ThemeContext.Provider value={LIGHT_THEME}>
      <div style={{ ...wrapperStyles, width: 750, background: '#fff' }}>
        <ShowcaseGroup title="LIGHT_THEME" />
        <ThemeContext.Provider value={DARK_THEME}>
          <div style={{ ...wrapperStyles, background: '#000', color: '#fff' }}>
            <ShowcaseGroup title="DARK_THEME" />
          </div>
        </ThemeContext.Provider>
      </div>
    </ThemeContext.Provider>
  );
  return <NestedThemes />;
};
Example5.storyName = 'Вложенные темы';

export const ThemesList: Story = () => {
  const { LIGHT_THEME, ...REST_LIGHT_THEMES } = ALL_LIGHT_THEMES;
  const { DARK_THEME, ...REST_DARK_THEMES } = ALL_DARK_THEMES;

  return (
    <table>
      <thead>
        <tr>
          <th>Имя</th>
          <th>Описание</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            <code>LIGHT_THEME</code>
          </td>
          <td>Текущая светлая тема. Содержит все актуальные визуальные изменения. Включена по умолчанию.</td>
        </tr>
        {Object.keys(REST_LIGHT_THEMES).map((name) => {
          const version = parseVersionFromThemeName(name);
          return (
            <tr>
              <td>
                <code>{name}</code>
              </td>
              <td>
                Светлая тема на момент версии библиотеки{' '}
                <code>
                  {version?.major}.{version?.minor}
                </code>
              </td>
            </tr>
          );
        })}
        <tr>
          <td>
            <code>DARK_THEME</code>
          </td>
          <td>Текущая темная тема. Содержит все актуальные визуальные изменения.</td>
        </tr>
        {Object.keys(REST_DARK_THEMES).map((name) => {
          const version = parseVersionFromThemeName(name);
          return (
            <tr>
              <td>
                <code>{name}</code>
              </td>
              <td>
                Темная тема на момент версии библиотеки{' '}
                <code>
                  {version?.major}.{version?.minor}
                </code>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
Example5.storyName = 'Список тем';
