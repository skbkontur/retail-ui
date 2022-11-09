```jsx harmony
import { Tooltip, Hint } from '@skbkontur/react-ui';
const [value, setValue] = React.useState();
const items = [
  {
    label: 'One',
    value: '111',
    buttonProps: {
      'data-tid': '1-1-1',
      use:'primary',
    },
  },
  {
    label: 'Two',
    value: '222',
    buttonProps: {
      'data-tid': '2-2-2',
      disabled: true,
    },
  },
  {
    label: 'Three',
    value: '333',
    buttonProps: {
      'data-tid': '3-3-3',
      use:'danger',
    },
  }
];
const renderItem = (label, value, buttonProps, renderDefault) => {
  if (value === '111') {
    return <Hint text="Текст Хинта">{renderDefault()}</Hint>;
  }
  if (value === '333') {
    return (
      <Tooltip trigger='opened' render={() => '⚠️ Лучше не трогай...'}>
        {renderDefault()}
      </Tooltip>
    );
  }
  return renderDefault();
};
<Switcher
  caption="Switch the switcher"
  items={items}
  value={value}
  onValueChange={setValue}
  renderItem={renderItem}
/>;
```
