### Базовый пример

```jsx harmony
const [value, setValue] = React.useState();

const items = [Select.staticElement(() => <Select.Item>Not
  selectable</Select.Item>), 'One', 'Two', 'Three', Select.SEP, 'Four'];

<Select items={items} value={value} onValueChange={setValue}/>;
```

### Запрет выделения и выбора
В пункты меню можно передать проп `isNotSelectable`, чтобы запретить выделение и выбор этого пункта меню

```jsx harmony

const [value, setValue] = React.useState();

const items = [<Select.Item isNotSelectable>Not selectable</Select.Item>, 'One', 'Two', 'Three', Select.SEP, 'Four'];

<Select items={items} value={value} onValueChange={setValue} />
```

### Очистка значения
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

### Поле поиска

```jsx harmony
const [value, setValue] = React.useState();

const items = ['One', 'Two', 'Three', Select.SEP, 'Four'];

<Select items={items} value={value} onValueChange={setValue} search />;
```

### Пример использования пропа `_renderButton`:

```jsx harmony
import { Link } from '@skbkontur/react-ui';
import { People3Icon16Regular } from '@skbkontur/icons/icons/People3Icon/People3Icon16Regular';

const [value, setValue] = React.useState();

const items = [Select.staticElement(() => <Select.Item>Not
  selectable</Select.Item>), 'One', 'Two', 'Three', Select.SEP, 'Four'];

const renderLinkButton = params => {
  const linkProps = {
    disabled: params.disabled,
    icon: <People3Icon16Regular />,
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

### Локали по умолчанию

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

### Размер
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
