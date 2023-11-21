`<SingleToast>` можно добавить в единственном месте в проекте, а статические методы будут всегда использовать последний отрендеренный экземпляр `<Toast>`.

```jsx harmony
import { Button, SingleToast } from '@skbkontur/react-ui';

<div>
  <SingleToast />
  <Button onClick={() => SingleToast.push('Статический тост')}>
    Показать статический тост
  </Button>
</div>
```

`<SingleToast>` можно кастомизировать с помощью переменных темы для `toast`.
```jsx harmony
import { Button, SingleToast, ThemeContext, ThemeFactory, THEME_2022 } from '@skbkontur/react-ui';


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
        <SingleToast />
      </ThemeContext.Provider>
    }}
  </ThemeContext.Consumer>
);

const rand = () => "Пример красного тоста №" + Math.round(Math.random() * 100).toString();

const pushToast = () => {
  SingleToast.push(rand(), {
    label: "Cancel",
    handler: () => SingleToast.push("Canceled")
  });
};

<div>
  <RedToast />
  <Button onClick={pushToast}>
    Показать красный тост
  </Button>
</div>
```
