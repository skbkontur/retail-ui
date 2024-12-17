import React from 'react';
import { Button, ThemeContext, ThemeFactory, LIGHT_THEME, DARK_THEME } from '@skbkontur/react-ui';
import { ShowcaseGroup } from '@skbkontur/react-ui/internal/ThemePlayground/ShowcaseGroup';

import { Meta, Story } from '../../../typings/stories';

export default {
  title: 'Information/Theme',
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
  const MyThemeContext = React.createContext(ThemeFactory.create({ myTextColor: 'orange' }));

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
