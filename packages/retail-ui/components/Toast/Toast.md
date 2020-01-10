Вызов статических методов

```jsx
import Button from '@skbkontur/react-ui/Button';

function showComplexNotification() {
  Toast.push('Successfully saved', {
    label: 'Cancel',
    handler: () => Toast.push('Canceled'),
  });
}

<Button onClick={showComplexNotification}>Show notification</Button>;
```

Использование `ref`

```jsx
import Button from '@skbkontur/react-ui/Button';

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
