Механизм работы основан на переменной темы `mobileMediaQuery`.
<br/>
По умолчанию ее значение проверяет наличие сенсорного экрана и минимальную ширину. <br/>
В случае, если данный медиа-запрос выполняется, то флаг мобильного лэйаута `isMobile` будет в значении `true`.

## Отключение адаптивности компонентов

Для этого достаточно изменить значение переменной `mobileMediaQuery` в теме на `not all`

```jsx static
import { ThemeContext, ThemeFactory } from '@skbkontur/react-ui';

<ThemeContext.Provider value={ThemeFactory.create({ mobileMediaQuery: 'not all' })} >
      /* ... */
</ThemeContext.Provider>
```

## Получение флага текущего лэйаута

### Функциональный компонент

В этом случае будет удобно использовать хук `useResponsiveLayout`. <br/>
Он возвращает объект со свойством `isMobile`.

```jsx static
import { useResponsiveLayout } from '@skbkontur/react-ui';

function SomeComponent(props) {
  const layout = useResponsiveLayout();

  if (layout.isMobile) {
    return /* ... */
  } else {
    return /* ... */
  }
}
```

### Классовый компонент

В этом случае можно использовать компонент `ResponsiveLayout`.

Компонент ожидает в себя функцию, в которую аргументом передает объект с флагом лэйаута

```jsx static
import { ResponsiveLayout } from '@skbkontur/react-ui';

class SomeComponent {

  /* ... */

  public render() {
    return (
      <ResponsiveLayout>
        {
          ({ isMobile }) => {
            /* ... */
          }
        }
      </ResponsiveLayout>
    )
  }
}
```

Еще есть проп `onLayoutChange`, который вызывает переданный в него коллбэк при изменении лэйаута. Аргументом передается объект с флагом.

```jsx static
import { ResponsiveLayout } from '@skbkontur/react-ui';

class SomeComponent {

  /* ... */

  public render() {
    return (
      <div>
        /* ... */
        <ResponsiveLayout onLayoutChange={(layout) => console.log(layout)} />
      </div>
    )
  }
}
```
