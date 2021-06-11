```jsx harmony
let items = ['Grey Face', 'Grey Space', 'Kappa', 'Keepo', 'Resident Sleeper'];

const [value, setValue] = React.useState('Kappa');

<Autocomplete source={items} value={value} onValueChange={setValue} />;
```
