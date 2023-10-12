```jsx harmony
const items = ['Grey Face', 'Grey Space', 'Kappa', 'Keepo', 'Resident Sleeper'];

const [value, setValue] = React.useState('Kappa');

<Autocomplete source={items} value={value} onValueChange={setValue} />;
```

Очистить значение в `Autocomplete` можно только с помощью пустой строки
```jsx harmony
import { Button, Group } from '@skbkontur/react-ui';

const items = ['Grey Face', 'Grey Space', 'Kappa', 'Keepo', 'Resident Sleeper'];

const [value, setValue] = React.useState('Kappa');

<Group>
  <Autocomplete source={items} value={value} onValueChange={setValue} />
  <Button onClick={() => setValue('')}>Очистить</Button>
</Group>
```

У Autocomplete есть 3 стандартных размера.
```jsx harmony
import { Gapped } from '@skbkontur/react-ui';

const items = ['Маленький', 'Средний', 'Большой'];

const [valueSmall, setValueSmall] = React.useState('Маленький');
const [valueMedium, setValueMedium] = React.useState('Средний');
const [valueLarge, setValueLarge] = React.useState('Большой');

<Gapped vertical>
  <Autocomplete source={items} value={valueSmall} onValueChange={setValueSmall} size={'small'}/>
  <Autocomplete source={items} value={valueMedium} onValueChange={setValueMedium} size={'medium'}/>
  <Autocomplete source={items} value={valueLarge} onValueChange={setValueLarge} size={'large'}/>
</Gapped>
```
