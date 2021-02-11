Button example

```jsx harmony
import OkIcon from '@skbkontur/react-icons/Ok';
import { Button } from '@skbkontur/react-ui';

<Button icon={<OkIcon />}>Ok</Button>;
```

Button has different use styles

```jsx harmony
import { Gapped } from '@skbkontur/react-ui';

<Gapped>
  <Button use="default">Default</Button>
  <Button use="primary">Primary</Button>
  <Button use="success">Success</Button>
  <Button use="danger">Danger</Button>
  <Button use="pay">Pay</Button>
  <Button use="link">Link</Button>
</Gapped>;
```

Button can have different sizes

```jsx harmony
import { Gapped } from '@skbkontur/react-ui';

<Gapped>
  <Button size="small">Small</Button>
  <Button size="medium">Medium</Button>
  <Button size="large">Large</Button>
</Gapped>;
```

Кнопки-стрелки

```jsx harmony
import { Gapped, Button } from '@skbkontur/react-ui';

<Gapped gap={25}>
  <Gapped gap={5}>
    <Button arrow="left" size="medium">
      Назад
    </Button>
    <Button arrow size="medium">
      Далее
    </Button>
  </Gapped>
  <Gapped gap={5}>
    <Button arrow="left" size="large">
      Назад
    </Button>
    <Button arrow size="large">
      Далее
    </Button>
  </Gapped>
</Gapped>;
```

Кнопка в сочетании со спиннером

```jsx harmony
import OkIcon from '@skbkontur/react-icons/Ok';
import { Button, Spinner } from '@skbkontur/react-ui';

const initialState = {
  loading: false,
  success: false,
};

const delay = (time = 0) => data => new Promise(resolve => setTimeout(resolve, time, data));

const handleLoadingStart = () => {
  delay(2000)()
    .then(() => new Promise(resolve => setState({ loading: false, success: true }, resolve)))
    .then(delay(1000))
    .then(() => setState({ success: false }));
};

const handleClick = () => {
  setState({ loading: true, success: false }, handleLoadingStart);
};

<Button width={150} onClick={handleClick} disabled={state.loading}>
  {state.loading ? <Spinner type="mini" caption={null} /> : state.success ? <OkIcon /> : 'Сохранить'}
</Button>;
```
