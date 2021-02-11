```jsx harmony
let initialState = { checked: false };

let toggle = () => setState(state => ({ checked: !state.checked }));

<div>
  <Toggle checked={state.checked} onValueChange={toggle} /> {state.checked ? 'On' : 'Off'}
</div>;
```

В компонент можно передать `children`, который будет отображаться рядом с переключателем.
Положение `children` относительно переключателя указывается в `captionPosition`.

```jsx harmony
let initialState = { checked: false };

let toggle = () => setState(state => ({ checked: !state.checked }));

<div>
  <Toggle checked={state.checked} onValueChange={toggle} captionPosition="left">
    <span>Показывать уведомления</span>
  </Toggle>
</div>;
```
