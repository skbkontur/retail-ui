### Базовый пример
```jsx harmony
const [value, setValue] = React.useState();

<Switcher
  caption="Switch the switcher"
  items={['One', 'Two', 'Three']}
  value={value}
  onValueChange={setValue}
/>;
```

### items в виде объектов
Случай, когда `items` принимает объект типа `{ label: string, value: string }`

```jsx harmony
const [value, setValue] = React.useState();
const items = [
  {
    label: 'One',
    value: '111',
  },
  {
    label: 'Two',
    value: '222',
  },
  {
    label: 'Three',
    value: '333',
  }
];

<Switcher
  caption="Switch the switcher"
  items={items}
  value={value}
  onValueChange={setValue}
/>;
```

### Кастомизация кнопки
Вариант `items` с полем `buttonProps`, который позволяет кастомизировать кнопку

```jsx harmony
const [value, setValue] = React.useState();
const items = [
  {
    label: 'One',
    value: '111',
    buttonProps: {
      'data-tid': "1-1-1",
      disabled: true,
    }
  },
  {
    label: 'Three',
    value: '333',
    buttonProps: {
      'data-tid': "1-1-1",
      use: "primary",
    }
  },
  {
    label: 'Two',
    value: '222',
    buttonProps: {
      'data-tid': "1-1-1",
      arrow: true,
    }
  }
];

<Switcher
  caption="Switch the switcher"
  items={items}
  value={value}
  onValueChange={setValue}
/>;
```

### Кастомизация items
Пример с методом `renderItem` для кастомизации `items`:

```jsx harmony
import {Hint, Tooltip} from '@skbkontur/react-ui';

const [value, setValue] = React.useState();
const items = ['One', 'Two', 'Three'];

const renderItem = (label, value, buttonProps, renderDefault) => {
  if (value === 'One') {
    return <Hint pos="bottom" text="Подсказка" opened manual>{renderDefault()}</Hint>;
  }
  if (value === 'Three') {
    return (
      <Tooltip pos="right middle" trigger="opened" render={() => 'Тултип'}>
        {renderDefault()}
      </Tooltip>
    );
  }
  return renderDefault();
}

<Switcher
  caption="Switch the switcher"
  items={items}
  value={value}
  onValueChange={setValue}
  renderItem={renderItem}
/>;
```
