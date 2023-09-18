У `<Tabs.Tab />` есть несколько визуальных состояний, в которых компонент может находиться: `primary`, `success`, `warning` и `error`. Чтобы перевести контрол в нужное состояние передайте компоненту булевый проп с соответсвующим названием.

Используя переменные `tabColorPrimary`, `tabColorSuccess`, `tabColorWarning` и `tabColorError` можно изменить активный цвет состояния, а библиотека автоматически подберёт цвет подчёркивания при наведении.

```jsx harmony
import { ThemeContext, ThemeFactory, Button } from '@skbkontur/react-ui';

const getRandomColor = () => '#' + Math.random().toString(16).substr(-6);
const updateColors = () => {
  return {
    tabColorPrimary: getRandomColor(),
    tabColorSuccess: getRandomColor(),
    tabColorWarning: getRandomColor(),
    tabColorError: getRandomColor(),
  }
};

const [activeBase, setActiveBase] = React.useState('error');
const [activeRandom, setActiveRandom] = React.useState('error');
const [colors, setColors] = React.useState(updateColors());

<>
  <p style={{ fontSize: '17px' }}>C цветами по умолчанию</p>
  <Tabs value={activeBase} onValueChange={setActiveBase}>
    <Tabs.Tab primary id="primary">Primary</Tabs.Tab>
    <Tabs.Tab success id="success">Success</Tabs.Tab>
    <Tabs.Tab warning id="warning">Warning</Tabs.Tab>
    <Tabs.Tab error id="error">Error</Tabs.Tab>
  </Tabs>

  <p style={{ fontSize: '17px' }}>Со случайным основным цветом</p>
  <div style={{ display: 'inline-flex', flexDirection: 'column', justifyContent: 'space-between', height: '100px' }}>
    <ThemeContext.Consumer>
      {(theme) => {
        return (
          <ThemeContext.Provider
            value={ThemeFactory.create(colors,theme)}
          >
            <Tabs value={activeRandom} onValueChange={setActiveRandom}>
            <Tabs.Tab primary id="primary">Primary</Tabs.Tab>
            <Tabs.Tab success id="success">Success</Tabs.Tab>
            <Tabs.Tab warning id="warning">Warning</Tabs.Tab>
            <Tabs.Tab error id="error">Error</Tabs.Tab>
          </Tabs>
          </ThemeContext.Provider>
        );
      }}
    </ThemeContext.Consumer>
    <Button onClick={() => setColors(updateColors)}>Получить новый набор цветов</Button>
  </div>
</>
```



Можно передавать свои компоненты в качестве табов, например `NavLink` из `react-router`

```jsx harmony
const [active, setActive] = React.useState('/fuji');

const NavLink = props => (
  <a
    {...props}
    onClick={e => {
      e.preventDefault();
      props.onClick(e);
    }}
  />
);
const TabLink = ({ id, children }) => (
  <Tabs.Tab id={id} component={props => <NavLink {...props} to={props.id} />}>
    {children}
  </Tabs.Tab>
);

<Tabs value={active} onValueChange={setActive}>
  <TabLink id="/fuji">🌋 Fuji</TabLink>
  <TabLink id="/tahat">⛰ Tahat</TabLink>
  <TabLink id="/alps">🗻 Alps</TabLink>
</Tabs>;
```

У табов есть 3 стандартных размера
```jsx harmony
const [active, setActive] = React.useState('fuji');
const renderCaption = (caption) => <span style={{display: "inline-block", width: 60}}>{caption}</span>;
<div>
  <div>
    {renderCaption("small")}
    <Tabs value={active} onValueChange={setActive} size="small">
      <Tabs.Tab id="fuji">🌋 Fuji</Tabs.Tab>
      <Tabs.Tab id="tahat">⛰ Tahat</Tabs.Tab>
      <Tabs.Tab id="alps">🗻 Alps</Tabs.Tab>
    </Tabs>
  </div>
  <div>
    {renderCaption("medium")}
    <Tabs value={active} onValueChange={setActive} size="medium">
      <Tabs.Tab id="fuji">🌋 Fuji</Tabs.Tab>
      <Tabs.Tab id="tahat">⛰ Tahat</Tabs.Tab>
      <Tabs.Tab id="alps">🗻 Alps</Tabs.Tab>
    </Tabs>
  </div>
  <div>
    {renderCaption("large")}
    <Tabs value={active} onValueChange={setActive} size="large">
      <Tabs.Tab id="fuji">🌋 Fuji</Tabs.Tab>
      <Tabs.Tab id="tahat">⛰ Tahat</Tabs.Tab>
      <Tabs.Tab id="alps">🗻 Alps</Tabs.Tab>
    </Tabs>
  </div>
</div>;
```
