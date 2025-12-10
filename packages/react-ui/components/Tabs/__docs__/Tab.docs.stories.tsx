import React from 'react';
import { Tab, ThemeContext, ThemeFactory, Button, Tabs } from '@skbkontur/react-ui';

import type { Meta, Story } from '../../../typings/stories.js';

const meta: Meta = {
  title: 'Display data/Tabs/Tab',
  component: Tab,
  parameters: { creevey: { skip: true } },
};

export default meta;

/** Используя переменные `tabColorPrimary`, `tabColorSuccess`, `tabColorWarning` и `tabColorError` можно изменить активный цвет состояния, а библиотека автоматически подберёт цвет подчёркивания при наведении. */
export const Example1: Story = () => {
  const getRandomColor = () => '#' + Math.random().toString(16).substr(-6);
  const updateColors = () => {
    return {
      tabColorPrimary: getRandomColor(),
      tabColorSuccess: getRandomColor(),
      tabColorWarning: getRandomColor(),
      tabColorError: getRandomColor(),
    };
  };

  const [activeBase, setActiveBase] = React.useState('error');
  const [activeRandom, setActiveRandom] = React.useState('error');
  const [colors, setColors] = React.useState(updateColors());

  return (
    <>
      <p style={{ fontSize: '17px' }}>C цветами по умолчанию</p>
      <Tabs value={activeBase} onValueChange={setActiveBase}>
        <Tabs.Tab primary id="primary">
          Primary
        </Tabs.Tab>
        <Tabs.Tab success id="success">
          Success
        </Tabs.Tab>
        <Tabs.Tab warning id="warning">
          Warning
        </Tabs.Tab>
        <Tabs.Tab error id="error">
          Error
        </Tabs.Tab>
      </Tabs>

      <p style={{ fontSize: '17px' }}>Со случайным основным цветом</p>
      <div
        style={{ display: 'inline-flex', flexDirection: 'column', justifyContent: 'space-between', height: '100px' }}
      >
        <ThemeContext.Consumer>
          {(theme) => (
            <ThemeContext.Provider value={ThemeFactory.create(colors, theme)}>
              <Tabs value={activeRandom} onValueChange={setActiveRandom}>
                <Tabs.Tab primary id="primary">
                  Primary
                </Tabs.Tab>
                <Tabs.Tab success id="success">
                  Success
                </Tabs.Tab>
                <Tabs.Tab warning id="warning">
                  Warning
                </Tabs.Tab>
                <Tabs.Tab error id="error">
                  Error
                </Tabs.Tab>
              </Tabs>
            </ThemeContext.Provider>
          )}
        </ThemeContext.Consumer>
        <Button onClick={() => setColors(updateColors)}>Получить новый набор цветов</Button>
      </div>
    </>
  );
};
Example1.storyName = 'Кастомизация';

/** С помощью пропа `component` можно изменять корневой элемент `<Tab />`.
Проп может принимать: компоненты, функции и строки. */
export const Example2: Story = () => {
  const [active, setActive] = React.useState('/fuji');

  const NavLink = ({ children, ...props }: React.ComponentProps<'a'>) => <a {...props}>{children}</a>;

  return (
    <Tabs value={active} onValueChange={setActive}>
      {/* Кастомный компонент */}
      <Tabs.Tab component={NavLink} id="/fuji">
        🌋 Fuji
      </Tabs.Tab>

      {/* Функция */}
      <Tabs.Tab component={({ children, ...props }) => <a {...props}>{children}</a>} id="/tahat">
        ⛰ Tahat
      </Tabs.Tab>

      {/* Строка */}
      <Tabs.Tab component="a" id="/alps">
        🗻 Alps
      </Tabs.Tab>
    </Tabs>
  );
};
Example2.storyName = 'Изменение корневого компонента Tab';
