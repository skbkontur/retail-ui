### Вызов статических методов

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

### Кастомный showTime

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

### Кастомный showTime без action


```jsx harmony
import { Button, Toast } from '@skbkontur/react-ui';

function showComplexNotification() {
  Toast.push('Successfully saved', null, 15000);
}

<Button onClick={showComplexNotification}>Show notification</Button>;
```

### Использование `ref`

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
