import { Button, Gapped, Tab, Tabs, ThemeContext, ThemeFactory } from '@skbkontur/react-ui';
import React from 'react';

import type { Meta, Story } from '../../../typings/stories.js';

const meta: Meta = {
  title: 'Display data/Tabs',
  component: Tab,
  parameters: { creevey: { skip: true } },
};

export default meta;

export const ExampleTabBasic: Story = () => {
  return (
    <Tabs value="tab">
      <Tab id="tab">Tab</Tab>
    </Tabs>
  );
};

/** С помощью пропа `component` можно изменять корневой элемент `<Tab />`.
Проп может принимать компоненты, функции и строки. */
export const ExampleComponentProp: Story = () => {
  const [active, setActive] = React.useState('/fuji');

  const NavLink = (props: React.ComponentProps<'a'>) => <a {...props}>{props.children}</a>;

  return (
    <Tabs value={active} onValueChange={setActive}>
      {/** Кастомный компонент **/}
      <Tabs.Tab component={(props) => <NavLink {...props} />} id="/fuji">
        Кастомный компонент
      </Tabs.Tab>
      {/** Функция **/}
      <Tabs.Tab component={(props) => <a {...props}>{props.children}</a>} id="/tahat">
        Функция
      </Tabs.Tab>
      {/** Строка **/}
      <Tabs.Tab component="a" id="/alps">
        Строка
      </Tabs.Tab>
    </Tabs>
  );
};
ExampleComponentProp.storyName = 'Изменение корневого компонента';

/**
 * Проп `disabled` блокирует таб, делая его недоступным для нажатия.
 */
export const ExampleDisabled: Story = () => {
  const [active, setActive] = React.useState('/tab');
  return (
    <Tabs value={active} onValueChange={setActive}>
      <Tab id="tab">Tab</Tab>
      <Tab id="tab2" disabled>
        Tab
      </Tab>
    </Tabs>
  );
};
ExampleDisabled.storyName = 'Блокировка таба';

/**
 * Пропсы `primary`, `success`, `warning` и `error` задают визуальное состояние выбранного таба.
 */
export const ExampleVisualState: Story = () => {
  return (
    <Gapped gap={10}>
      <Tabs value="primary">
        <Tabs.Tab primary id="primary">
          Primary
        </Tabs.Tab>
      </Tabs>
      <Tabs value="success">
        <Tabs.Tab success id="success">
          Success
        </Tabs.Tab>
      </Tabs>
      <Tabs value="warning">
        <Tabs.Tab warning id="warning">
          Warning
        </Tabs.Tab>
      </Tabs>
      <Tabs value="error">
        <Tabs.Tab error id="error">
          Error
        </Tabs.Tab>
      </Tabs>
    </Gapped>
  );
};
ExampleVisualState.storyName = 'Визуальные состояния выбранного таба';

/** Используя переменные `tabColorPrimary`, `tabColorSuccess`, `tabColorWarning` и `tabColorError` можно изменить цвет активного состояния, а библиотека автоматически подберёт цвет подчёркивания при наведении. */
export const ExampleCustomization: Story = () => {
  const getRandomColor = () => '#' + Math.random().toString(16).substr(-6);
  const updateColors = () => {
    return {
      tabColorPrimary: getRandomColor(),
      tabColorSuccess: getRandomColor(),
      tabColorWarning: getRandomColor(),
      tabColorError: getRandomColor(),
    };
  };

  const [activeRandom, setActiveRandom] = React.useState('primary');
  const [colors, setColors] = React.useState(updateColors());

  return (
    <>
      <p style={{ fontSize: '17px' }}>Случайный цвет активного состояния</p>
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
ExampleCustomization.storyName = 'Кастомизация: цвет активного состояния';
