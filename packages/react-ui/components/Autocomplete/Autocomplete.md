```jsx harmony
import { Autocomplete } from '@skbkontur/react-ui';

const items = ['Grey Face', 'Grey Space', 'Kappa', 'Keepo', 'Resident Sleeper'];

const [value, setValue] = React.useState('Kappa');

<Autocomplete source={items} value={value} onValueChange={setValue} />;
```

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

У Autocomplete есть 3 стандартных размера.
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

Можно выделять введеное значение при фокусе.
```jsx harmony
import { Autocomplete } from '@skbkontur/react-ui';

const items = ['Grey Face', 'Grey Space', 'Kappa', 'Keepo', 'Resident Sleeper'];

const [value, setValue] = React.useState('');

<Autocomplete source={items} value={value} onValueChange={setValue} selectAllOnFocus />
```

Расположение иконки слева и справа.
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

Изменение ширины меню.
```jsx harmony
import { Autocomplete } from '@skbkontur/react-ui';

const items = ['Grey Face', 'Grey Space', 'Kappa', 'Keepo', 'Resident Sleeper'];

const [value, setValue] = React.useState('');

<Autocomplete source={items} value={value} onValueChange={setValue} menuWidth={'80%'} />
```

Расположение выпадающего окна Autocomplete.
```jsx harmony
import { Autocomplete } from '@skbkontur/react-ui';

const items = ['Grey Face', 'Grey Space', 'Kappa', 'Keepo', 'Resident Sleeper'];

const [value, setValue] = React.useState('');

<Autocomplete source={items} value={value} onValueChange={setValue} menuPos={'top'} />
```

Отрисовка тени у выпадающего меню.
```jsx harmony
import { Autocomplete } from '@skbkontur/react-ui';

const items = ['Grey Face', 'Grey Space', 'Kappa', 'Keepo', 'Resident Sleeper'];

const [value, setValue] = React.useState('');

<Autocomplete source={items} value={value} onValueChange={setValue} hasShadow />
```

Использование режима прозрачной рамки.
```jsx harmony
import { Autocomplete } from '@skbkontur/react-ui';

const items = ['Grey Face', 'Grey Space', 'Kappa', 'Keepo', 'Resident Sleeper'];

const [value, setValue] = React.useState('Kappa');

<Autocomplete source={items} value={value} onValueChange={setValue} borderless />
```
