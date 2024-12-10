`<SingleToast>` можно добавить в единственном месте в проекте, а статические методы будут всегда использовать последний отрендеренный экземпляр `<Toast>`.

_На внешний вид этого примера влияет следующий пример_
### Базовый пример
```jsx harmony
import { Button, SingleToast } from '@skbkontur/react-ui';

<div>
  <SingleToast />
  <Button onClick={() => SingleToast.push('Статический тост')}>
    Показать статический тост
  </Button>
</div>
```

### Кастомизация
`<SingleToast>` можно кастомизировать с помощью переменных темы для `toast`.
```jsx harmony
import { Button, SingleToast, ThemeContext, ThemeFactory, THEME_2022 } from '@skbkontur/react-ui';

const rand = () => "Пример жёлтого тоста № " + Math.round(Math.random() * 100).toString();

const pushToast = () => {
  SingleToast.push(rand(), {
    label: "Cancel",
    handler: () => SingleToast.push("Canceled")
  });
};

<div>
  <SingleToast theme={{ toastBg: '#f1c40f' }} />
  <Button onClick={pushToast}>
    Показать тост с жёлтым фоном
  </Button>
</div>
```
