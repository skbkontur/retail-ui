Вызов статических методов

```jsx harmony
import { Button, Toast } from '@skbkontur/react-ui';

function showComplexNotification() {
  Toast.push('Successfully saved', {
    label: 'Cancel',
    handler: () => Toast.push('Canceled'),
  });
}

<Button onClick={showComplexNotification}>Show notification</Button>;
```

C кастомным timeout'ом

```jsx harmony
import { Button, Toast } from '@skbkontur/react-ui';

function showComplexNotification() {
  Toast.push('Successfully saved', {
    label: 'Cancel',
    handler: () => Toast.push('Canceled'),
  }, 15000);
}

<Button onClick={showComplexNotification}>Show notification</Button>;
```

C кастомным timeout'ом без action


```jsx harmony
import { Button, Toast } from '@skbkontur/react-ui';

function showComplexNotification() {
  Toast.push('Successfully saved', null, 15000);
}

<Button onClick={showComplexNotification}>Show notification</Button>;
```

Использование `ref`

```jsx harmony
import { Button, Toast } from '@skbkontur/react-ui';

class Toaster extends React.Component {
  showNotification() {
    this.notifier.push('Successfully');
  }

  render() {
    return (
      <div>
        <Toast
          ref={el => {
            this.notifier = el;
          }}
        />
        <Button onClick={() => this.showNotification()}>Show notification</Button>
      </div>
    );
  }
}

<Toaster />;
```

### SuperToast

Мы можете объединить удобство статических методов и кастамизируемость классического способа через `ref`.
Для этого можно добавить обёртку, которая позволяет Toast работать по примеру GlobalLoader.

Т.е. кастомный Toast можно добавить в единственном месте на проекте, а статические методы будут всегда использовать последний отрендеренный экземпляр Toast:

Также в обёртке можно изменить логику появления всплывашки, по рекомендации Гайдов:
https://guides.kontur.ru/components/toast/#08
```static
«Всегда показывается только 1 тост. Перед появлением следующего тоста, текущий скрывается, даже если время его показа еще не истекло»
```

Для этого немного изменим метод `SuperToast.close` с помощью специального метода `ReactDOM.flushSync`.

Итоговый вариант:
```js static
const SuperToast = (props) => <Toast ref={SuperToast.ref} {...props} />;
SuperToast.ref = React.createRef();
SuperToast.push = (...args) => {
  SuperToast.close();
  SuperToast.ref.current && SuperToast.ref.current.push(...args);
};
SuperToast.close = () => {
  ReactDOM.flushSync(() => {
    SuperToast.ref.current && SuperToast.ref.current.close();
  });
};

```


Версия на typescript:
```typescript static
class SuperToast extends React.Component<ToastProps> {
  public static ref = React.createRef<Toast>();
  public static push: typeof Toast.push = (...args) => {
    SuperToast.close();
    SuperToast.ref.current?.push(...args);
  };
  public static close: typeof Toast.close = () => {
    ReactDOM.flushSync(() => SuperToast.ref.current?.close());
  };
  render = () => {
    return <Toast ref={SuperToast.ref} {...this.props} />;
  };
}
```


```jsx harmony
import { Button, Toast, ThemeContext, ThemeFactory, THEME_2022 } from '@skbkontur/react-ui';
import ReactDOM from 'react-dom';

const SuperToast = (props) => <Toast ref={SuperToast.ref} {...props} />;
SuperToast.ref = React.createRef();
SuperToast.push = (...args) => {
  SuperToast.close();
  SuperToast.ref.current && SuperToast.ref.current.push(...args);
};
SuperToast.close = () => {
  ReactDOM.flushSync(() => {
    SuperToast.ref.current && SuperToast.ref.current.close();
  });
};

const RedToast = () => (
  <ThemeContext.Provider
    value={ThemeFactory.create(
      {
        toastBg: "#d94d45f5",
        toastBorderRadius: "4px"
      },
      THEME_2022
    )}
  >
    <SuperToast />
  </ThemeContext.Provider>
);

const rand = () => Math.round(Math.random() * 100).toString();

const push = () => {
  SuperToast.push(rand(), {
    label: "Cancel",
    handler: () => SuperToast.push("Canceled")
  });
};

<div>
  <RedToast />
  <span />
  <span />
  <span />
  <Button onClick={push}>
    Show super red toast
  </Button>
</div>
;
```
