### Базовый пример
```jsx harmony
import { Autocomplete } from '@skbkontur/react-ui';

const items = ['Grey Face', 'Grey Space', 'Kappa', 'Keepo', 'Resident Sleeper'];

const [value, setValue] = React.useState('Kappa');

<Autocomplete source={items} value={value} onValueChange={setValue} />;
```

### Очистка Autocomplete
Очистить значение в `Autocomplete` можно только с помощью пустой строки.
```jsx harmony
import { Autocomplete, Button, Group } from '@skbkontur/react-ui';

const items = ['Grey Face', 'Grey Space', 'Kappa', 'Keepo', 'Resident Sleeper'];

const [value, setValue] = React.useState('Kappa');

<Group>
  <Autocomplete source={items} value={value} onValueChange={setValue} />
  <Button onClick={() => setValue('')}>Очистить</Button>
</Group>
```

### Размер
```jsx harmony
import { Autocomplete, Gapped } from '@skbkontur/react-ui';

const items = ['Маленький', 'Средний', 'Большой'];

const [valueSmall, setValueSmall] = React.useState('Маленький');
const [valueMedium, setValueMedium] = React.useState('Средний');
const [valueLarge, setValueLarge] = React.useState('Большой');

<Gapped vertical>
  <Autocomplete source={items} value={valueSmall} onValueChange={setValueSmall} size={'small'} />
  <Autocomplete source={items} value={valueMedium} onValueChange={setValueMedium} size={'medium'} />
  <Autocomplete source={items} value={valueLarge} onValueChange={setValueLarge} size={'large'} />
</Gapped>
```

### Выделение введеного значения при фокусе
```jsx harmony
import { Autocomplete } from '@skbkontur/react-ui';

const items = ['Grey Face', 'Grey Space', 'Kappa', 'Keepo', 'Resident Sleeper'];

const [value, setValue] = React.useState('');

<Autocomplete source={items} value={value} onValueChange={setValue} selectAllOnFocus />
```

### Иконка
```jsx harmony
import { Autocomplete, Gapped } from '@skbkontur/react-ui';
import { SearchLoupeIcon16Regular } from '@skbkontur/icons/SearchLoupeIcon16Regular';

const items = ['Grey Face', 'Grey Space', 'Kappa', 'Keepo', 'Resident Sleeper'];

const [valueLeft, setValueLeft] = React.useState('');
const [valueRight, setValueRight] = React.useState('');

<Gapped>
  <Autocomplete source={items} value={valueLeft} onValueChange={setValueLeft} leftIcon={<SearchLoupeIcon16Regular />} />
  <Autocomplete source={items} value={valueRight} onValueChange={setValueRight} rightIcon={<SearchLoupeIcon16Regular />} />
</Gapped>
```

### Ширина меню
```jsx harmony
import { Autocomplete } from '@skbkontur/react-ui';

const items = ['Grey Face', 'Grey Space', 'Kappa', 'Keepo', 'Resident Sleeper'];

const [value, setValue] = React.useState('');

<Autocomplete source={items} value={value} onValueChange={setValue} menuWidth={'80%'} />
```

### Расположение выпадающего окна Autocomplete
```jsx harmony
import { Autocomplete } from '@skbkontur/react-ui';

const items = ['Grey Face', 'Grey Space', 'Kappa', 'Keepo', 'Resident Sleeper'];

const [value, setValue] = React.useState('');

<Autocomplete source={items} value={value} onValueChange={setValue} menuPos={'top'} />
```

### Тень у выпадающего меню
```jsx harmony
import { Autocomplete } from '@skbkontur/react-ui';

const items = ['Grey Face', 'Grey Space', 'Kappa', 'Keepo', 'Resident Sleeper'];

const [value, setValue] = React.useState('');

<Autocomplete source={items} value={value} onValueChange={setValue} hasShadow />
```

### Режима прозрачной рамки
```jsx harmony
import { Autocomplete } from '@skbkontur/react-ui';

const items = ['Grey Face', 'Grey Space', 'Kappa', 'Keepo', 'Resident Sleeper'];

const [value, setValue] = React.useState('Kappa');

<Autocomplete source={items} value={value} onValueChange={setValue} borderless />
```
