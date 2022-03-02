# Адаптивность компонентов

Начиная с версии 4.0 многие компоненты, такие как `Modal`, `SidePage`, `ComboBox`, `Autocomplete`, `Select`, `Hint`, `Tooltip`, `Kebab`, `Dropdown` и `DropdownMenu`, стали адаптивными, получив новую верстку, которая активируются на мобильных устройствах.

Механизм адаптивности основан на [медиазапросах](https://developer.mozilla.org/en-US/docs/Web/CSS/Media_Queries) и управляется переменной темы `mobileMediaQuery`. В зависимости от того, удовлетворяет текущее устройство медиазапросу из переменной или нет, компоненты переходят в мобильный режим и обратно. По умолчанию, значение переменной равно `(max-width: 576px) and (hover: none) and (pointer: coarse)`, т.е. опирается на ширину вьюпорта и наличие сенсорного экрана.

## Настройка адаптивности

Управлять значением переменной `mobileMediaQuery` можно через `ThemeContext`.

```jsx static
import { ThemeContext, ThemeFactory } from '@skbkontur/react-ui';

<ThemeContext.Provider value={ThemeFactory.create({ mobileMediaQuery: '(max-width: 768px)' })}>
      /* ... */
</ThemeContext.Provider>
```

### Отключение адаптивности

Чтобы полностью отключить адаптивность компонентов достаточно изменить значение переменной на `not all`.

## Определение текущего режима

Для определения текущего режима предусмотрен хук `useResponsiveLayout`. Он возвращает объект с флагами активности текущих режимов (пока реализован только мобильный):

```ts static
interface ResponsiveLayoutFlags {
  isMobile: boolean;
}
```


```jsx static
import { useResponsiveLayout } from '@skbkontur/react-ui';

function SomeComponent(props) {
  const { isMobile } = useResponsiveLayout();

  if (isMobile) {
    return /* ... */
  } else {
    return /* ... */
  }
}
```

Как альтернативу можно использовать отдельный компонент [ResponsiveLayout](https://ui.gitlab-pages.kontur.host/docs/4.0/react-ui/#/Components/ResponsiveLayout).
