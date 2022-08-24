```jsx harmony
const items = ['Grey Face', 'Grey Space', 'Kappa', 'Keepo', 'Resident Sleeper'];

const [value, setValue] = React.useState('Kappa');

<Autocomplete source={items} value={value} onValueChange={setValue} />;
```

Очистить значение в `Autocomplete` можно только с помощью строки
```jsx harmony
import { Button, Group } from '@skbkontur/react-ui';

const items = ['Grey Face', 'Grey Space', 'Kappa', 'Keepo', 'Resident Sleeper'];

const [value, setValue] = React.useState('Kappa');

<Group>
  <Autocomplete source={items} value={value} onValueChange={setValue} />
  <Button onClick={() => setValue('')}>Очистить</Button>
</Group>
```
