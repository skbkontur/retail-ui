### Базовый пример
```jsx harmony
const [active, setActive] = React.useState('fuji');

<Tabs value={active} onValueChange={setActive}>
  <Tabs.Tab id="fuji">🌋 Fuji</Tabs.Tab>
  <Tabs.Tab id="tahat">⛰ Tahat</Tabs.Tab>
  <Tabs.Tab id="alps">🗻 Alps</Tabs.Tab>
</Tabs>;
```

### Расположение табов
Компонент может отображать табы двумя способами: горизонтально (по умолчанию) и вертикально.
```jsx harmony
const [active, setActive] = React.useState('fuji');

<Tabs vertical value={active} onValueChange={setActive}>
  <Tabs.Tab id="fuji">🌋 Fuji</Tabs.Tab>
  <Tabs.Tab id="tahat">⛰ Tahat</Tabs.Tab>
  <Tabs.Tab id="alps">🗻 Alps</Tabs.Tab>
</Tabs>;
```

### Размер
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
