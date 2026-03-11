/* eslint-disable jsx-a11y/anchor-has-content */
import React from 'react';
import { Tab, ThemeContext, ThemeFactory, Button, Tabs, Gapped } from '@skbkontur/react-ui';

import type { Meta, Story } from '../../../typings/stories';

export default {
  title: 'Display data/Tabs/Tab',
  component: Tab,
  parameters: { creevey: { skip: true } },
} as Meta;

export const BasicExample: Story = () => {
  return (
    <Tabs value="tab">
      <Tab id="tab">Tab</Tab>
    </Tabs>
  );
};

/** С помощью пропа `component` можно изменять корневой элемент `<Tab />`.
Проп может принимать компоненты, функции и строки. */
export const ComponentPropExample: Story = () => {
  const [active, setActive] = React.useState('/fuji');

  const NavLink = (props: Record<string, unknown>) => <a {...props} />;

  return (
    <Tabs value={active} onValueChange={setActive}>
      {/** Кастомный компонент **/}
      <Tabs.Tab component={(props) => <NavLink {...props} />} id="/fuji">
        Кастомный компонент
      </Tabs.Tab>
      {/** Функция **/}
      <Tabs.Tab component={(props) => <a {...props} />} id="/tahat">
        Функция
      </Tabs.Tab>
      {/** Строка **/}
      <Tabs.Tab component="a" id="/alps">
        Строка
      </Tabs.Tab>
    </Tabs>
  );
};
ComponentPropExample.storyName = 'Изменение корневого компонента Tab';

/**
 * Проп `disabled` блокирует таб, делая его недоступным для нажатия.
 */
export const DisabledExample: Story = () => {
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
DisabledExample.storyName = 'Блокировка таба';

/**
 * Пропсы `primary`, `success`, `warning` и `error` задают визуальное состояние выбранного таба.
 */
export const VisualStateExample: Story = () => {
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
VisualStateExample.storyName = 'Визуальные состояния выбранного таба: primary, success, warning, error';

/** Используя переменные `tabColorPrimary`, `tabColorSuccess`, `tabColorWarning` и `tabColorError` можно изменить цвет активного состояния, а библиотека автоматически подберёт цвет подчёркивания при наведении. */
export const CustomizationExample: Story = () => {
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
          {(theme) => {
            return (
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
            );
          }}
        </ThemeContext.Consumer>
        <Button onClick={() => setColors(updateColors)}>Получить новый набор цветов</Button>
      </div>
    </>
  );
};
CustomizationExample.storyName = 'Кастомизация: цвет активного состояния';
