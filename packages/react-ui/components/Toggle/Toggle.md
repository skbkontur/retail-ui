```jsx harmony
const [checked, setChecked] = React.useState(false);

<div>
  <Toggle checked={checked} onValueChange={setChecked} /> {checked ? 'On' : 'Off'}
</div>;
```

В компонент можно передать `children`, который будет отображаться рядом с переключателем.
Положение `children` относительно переключателя указывается в `captionPosition`.

```jsx harmony
const [checked, setChecked] = React.useState(false);

<div>
  <Toggle checked={checked} onValueChange={setChecked} captionPosition="left">
    <span>Показывать уведомления</span>
  </Toggle>
</div>;
```
