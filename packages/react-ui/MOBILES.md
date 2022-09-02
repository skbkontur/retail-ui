# Адаптивность компонентов

Начиная с версии 4.0 многие компоненты, такие как `Modal`, `SidePage`, `ComboBox`, `Autocomplete`, `Select`, `Hint`, `Tooltip`, `Kebab`, `Dropdown` и `DropdownMenu`, стали адаптивными, получив новую верстку, которая активируются на мобильных устройствах.

Механизм адаптивности основан на [медиазапросах](https://developer.mozilla.org/en-US/docs/Web/CSS/Media_Queries) и управляется переменной темы `mobileMediaQuery`. В зависимости от того, удовлетворяет текущее устройство медиазапросу из переменной или нет, компоненты переходят в мобильный режим и обратно. По умолчанию, значение переменной равно `(max-width: 576px) and (hover: none) and (pointer: coarse)`, т.е. опирается на ширину вьюпорта и наличие сенсорного экрана.
Так же можно передавать свои медиазапросы в хук `useResponsiveLayout` или через проп `options` в [ResponsiveLayout](https://ui.gitlab-pages.kontur.host/docs/4.0/react-ui/#/Components/ResponsiveLayout)

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

Для определения текущего режима предусмотрен хук `useResponsiveLayout`.
Он возвращает объект с флагами активности текущих режимов, по умолчанию пока реализован только мобильный флаг.

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

Так же можно передать в него параметр `options: ResponsiveLayoutOptions`,
значения из которого дополнят список флагов в `ResponsiveLayoutFlags`:

```ts static
export type MediaQueriesType = Record<string, string>;

export interface ResponsiveLayoutOptions<MQ extends MediaQueriesType> {
  customMediaQueries?: MQ;
}
```

На основе `useResponsiveLayout` можно создать свой специфичный хук:
```jsx static
import { useResponsiveLayout as useResponsiveLayoutOrigin } from '@skbkontur/react-ui';

const customMediaQueries = {
  isTablet: '(min-width: 577px)',
  isDesktop: '(min-width: 1280px)',
};

const useResponsiveLayout = () => {
	return useResponsiveLayoutOrigin({ customMediaQueries })
};

function SomeComponent(props) {
  const { isMobile, isTablet, isDesktop } = useResponsiveLayout();

  if (isMobile) {
    return /* ... */
  } else if (isTablet) {
    return /* ... */
  } else {
    return /* ... */
  }
}
```

Как альтернативу можно использовать отдельный компонент [ResponsiveLayout](https://ui.gitlab-pages.kontur.host/docs/4.0/react-ui/#/Components/ResponsiveLayout).
