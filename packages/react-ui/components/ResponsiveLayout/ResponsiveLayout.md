```ts static
interface ResponsiveLayoutFlags {
  isMobile: boolean;
}
```

Компонент ожидает в себя функцию, в которую аргументом передается объект с флагом лэйаута.

```jsx static
import { ResponsiveLayout } from '@skbkontur/react-ui';

class SomeComponent {
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

В компонент можно передать проп `options: ResponsiveLayoutOptions`, который позволяет кастомизировать возвращаемые флаги:
```ts static
export interface ResponsiveLayoutOptions {
  customMediaQueries: Record<string, string>;
}

```
1. Без кастомизации есть только флаг isMobile
2. Поля из `ResponsiveLayoutOptions` дополняют список возвращаемых флагов в `ResponsiveLayoutFlags`
3. При добавлении кастомного флага isMobile, значение дефолтного флага перезаписывается в пользу кастомного

Также существует проп `onLayoutChange`, который вызывает переданный в него коллбэк при изменении лэйаута. Аргументом передается объект с флагом.

```jsx static
import { ResponsiveLayout } from '@skbkontur/react-ui';

class SomeComponent {
  public render() {
    return (
      <div>
        <ResponsiveLayout onLayoutChange={({ isMobile }) => console.log(isMobile)} />
      </div>
    )
  }
}
```

Как альтернативу можно использовать хук [useResponsiveLayout](#/Mobiles).
