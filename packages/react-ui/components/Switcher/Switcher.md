```jsx harmony
const [value, setValue] = React.useState();

<Switcher
  caption="Switch the switcher"
  items={['One', 'Two', 'Three']}
  value={value}
  onValueChange={setValue}
/>;
```
