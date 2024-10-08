У компонента `<Tabs.Tab />` есть несколько визуальных состояний, в которых компонент может находиться: `primary`, `success`, `warning` и `error`. Чтобы перевести контрол в нужное состояние передайте компоненту булевый проп с соответсвующим названием.

### Кастомизация
Используя переменные `tabColorPrimary`, `tabColorSuccess`, `tabColorWarning` и `tabColorError` можно изменить активный цвет состояния, а библиотека автоматически подберёт цвет подчёркивания при наведении.
```jsx harmony
import { ThemeContext, ThemeFactory, Button, Tabs } from '@skbkontur/react-ui';

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

### Изменение корневого компонента Tab
С помощью пропа `component` можно изменять корневой элемент `<Tab />`.

Проп может принимать: компоненты, функции и строки.
```jsx harmony
import { Tabs } from '@skbkontur/react-ui';

const [active, setActive] = React.useState('/fuji');

const NavLink = props => <a {...props} />;

<Tabs value={active} onValueChange={setActive}>
  {/** Кастомный компонент **/}
  <Tabs.Tab  component={(props) => <NavLink {...props} />} id="/fuji">🌋 Fuji</Tabs.Tab>
  {/** Функция **/}
  <Tabs.Tab component={(props) => <a {...props} />} id="/tahat">⛰ Tahat</Tabs.Tab>
  {/** Строка **/}
  <Tabs.Tab component="a" id="/alps">🗻 Alps</Tabs.Tab>
</Tabs>;
```
