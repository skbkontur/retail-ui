```jsx harmony
const [value, setValue] = React.useState('');

<Textarea
  value={value}
  onValueChange={setValue}
  autoResize
  placeholder="Through faith we can reign in every area of life"
/>;
```

Очистить значение в `Textarea` можно только с помощью пустой строки

```jsx harmony
import { Group, Button } from '@skbkontur/react-ui';

const [value, setValue] = React.useState('Значение');

<Group>
  <Textarea
    value={value}
    onValueChange={setValue}
    autoResize
    rows={1}
    placeholder="Плейсхолдер"
  />
  <Button style={{ height: '52px' }} onClick={() => setValue('')}>Очистить значение</Button>
</Group>
```

Счетчик введенных символов

```jsx harmony
const [value, setValue] = React.useState('');

<Textarea
  value={value}
  onValueChange={setValue}
  placeholder="Счетчик появляется при фокусе"
  lengthCounter={10}
  showLengthCounter
  counterHelp="Hello 👋"
/>;
```
