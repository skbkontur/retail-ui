Простой пример.

```jsx harmony
const [value, setValue] = React.useState();

const items = [Select.static(() => <Select.Item>Not selectable</Select.Item>), 'One', 'Two', 'Three', Select.SEP, 'Four'];

<Select items={items} value={value} onValueChange={setValue} />;
```

Очистить значение в `Select`'е можно только с помощью `null`
```jsx harmony
import { Button, Group } from '@skbkontur/react-ui';

const [value, setValue] = React.useState();

const items = ['One', 'Two', 'Three', 'Four'];

<Group>
  <Select items={items} value={value} onValueChange={setValue} />
  <Button onClick={() => setValue(null)}>Очистить</Button>
</Group>
```

Пример с полем поиска.

```jsx harmony
const [value, setValue] = React.useState();

const items = ['One', 'Two', 'Three', Select.SEP, 'Four'];

<Select items={items} value={value} onValueChange={setValue} search />;
```

Пример использования пропа `_renderButton`:

```jsx harmony
import { Link } from '@skbkontur/react-ui';
import PeopleIcon from '@skbkontur/react-icons/People';

const [value, setValue] = React.useState();

const  items = [Select.static(() => <Select.Item>Not selectable</Select.Item>), 'One', 'Two', 'Three', Select.SEP, 'Four'];

const renderLinkButton = params => {
  const linkProps = {
    disabled: params.disabled,
    icon: <PeopleIcon />,
    _button: true,
    _buttonOpened: params.opened,

    onClick: params.onClick,
    onKeyDown: params.onKeyDown,
  };

  return <Link {...linkProps}>{params.label}</Link>;
};

<Select
  items={items}
  value={value}
  onValueChange={setValue}
  _renderButton={renderLinkButton}
/>;
```

#### Локали по умолчанию

```typescript static
interface SelectLocale {
  placeholder?: React.ReactNode;
}

const ru_RU = {
  placeholder: 'Ничего не выбрано',
};

const en_GB = {
  placeholder: 'Nothing selected',
};
```

У Select есть 3 стандартных размера.
```jsx harmony
import { Gapped } from '@skbkontur/react-ui';

const [valueSmall, setValueSmall] = React.useState('Маленький');
const [valueMedium, setValueMedium] = React.useState('Средний');
const [valueLarge, setValueLarge] = React.useState('Большой');

const items = ['Маленький', 'Средний', 'Большой'];

<Gapped vertical>
  <Select items={items} value={valueSmall} onValueChange={setValueSmall} size={'small'} />
  <Select items={items} value={valueMedium} onValueChange={setValueMedium} size={'medium'} />
  <Select items={items} value={valueLarge} onValueChange={setValueLarge} size={'large'} />
</Gapped>
```
