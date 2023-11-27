`<SingleToast>` можно добавить в единственном месте в проекте, а статические методы будут всегда использовать последний отрендеренный экземпляр `<Toast>`.

_На внешний вид этого примера влияет следующий пример_

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


const CustomToast = () => (
  <ThemeContext.Consumer>
    {(theme) => {
      return <ThemeContext.Provider
        value={ThemeFactory.create(
          {
            toastBg: "#000000",
          },
          theme
        )}
      >
        <SingleToast />
      </ThemeContext.Provider>
    }}
  </ThemeContext.Consumer>
);

const rand = () => "Пример тёмного тоста № " + Math.round(Math.random() * 100).toString();

const pushToast = () => {
  SingleToast.push(rand(), {
    label: "Cancel",
    handler: () => SingleToast.push("Canceled")
  });
};

<div>
  <CustomToast />
  <Button onClick={pushToast}>
    Показать тост с тёмным фоном
  </Button>
</div>
```
