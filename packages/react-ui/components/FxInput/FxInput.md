```jsx harmony
const [auto, setAuto] = React.useState(false);
const [value, setValue] = React.useState();

function handleValueChange(value) {
  setAuto(false);
  setValue(value);
}

function handleRestore() {
  setAuto(true);
  setValue('auto');
}

<FxInput auto={auto} value={value} onValueChange={handleValueChange} onRestore={handleRestore} />;
```

Очистить значение в `FxInput`'е можно с помощью пустой строки или `undefined`
```jsx harmony
import { Group, Button } from '@skbkontur/react-ui';

const [value, setValue] = React.useState(12345);

<Group>
  <FxInput value={value} onValueChange={setValue} />
  <Button onClick={() => setValue(undefined)}>Undefined</Button>
  <Button onClick={() => setValue('')}>Пустая строка</Button>
</Group>
```
