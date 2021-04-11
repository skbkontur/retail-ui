```jsx harmony
const [value, setValue] = React.useState();

<Switcher
  label="Switch the switcher"
  items={['One', 'Two', 'Three']}
  value={value}
  onValueChange={setValue}
/>;
```
