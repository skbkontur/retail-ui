`<ToastStatic>` можно добавить в единственном месте в проекте, а статические методы будут всегда использовать последний отрендеренный экземпляр `<Toast>`.

```jsx harmony
import { Button, ToastStatic } from '@skbkontur/react-ui';

<div>
  <ToastStatic />
  <Button onClick={() => ToastStatic.push('Статический тост')}>
    Показать статический тост
  </Button>
</div>
```

`<ToastStatic>` можно кастомизировать с помощью переменных темы для `toast`.
```jsx harmony
import { Button, ToastStatic, ThemeContext, ThemeFactory, THEME_2022 } from '@skbkontur/react-ui';


const RedToast = () => (
  <ThemeContext.Consumer>
    {(theme) => {
      return <ThemeContext.Provider
        value={ThemeFactory.create(
          {
            toastBg: "rgba(210, 15, 0, 0.76)",
            toastLinkBgActive: "rgba(210, 15, 0, 0.76)"
          },
          theme
        )}
      >
        <ToastStatic />
      </ThemeContext.Provider>
    }}
  </ThemeContext.Consumer>
);

const rand = () => "Пример красного тоста №" + Math.round(Math.random() * 100).toString();

const pushToast = () => {
  ToastStatic.push(rand(), {
    label: "Cancel",
    handler: () => ToastStatic.push("Canceled")
  });
};

<div>
  <RedToast />
  <Button onClick={pushToast}>
    Показать красный тост
  </Button>
</div>
```
