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

Кнопка в состоянии загрузки

```jsx harmony
import OkIcon from '@skbkontur/react-icons/Ok';
import { Button } from '@skbkontur/react-ui';

const [loading, setLoading] = React.useState(false);
const [success, setSuccess] = React.useState(false);

const delay = time => args => new Promise(resolve => setTimeout(resolve, time, args));

const handleLoadingStart = () => {
  delay(2000)()
    .then(() => {
      setLoading(false);
      setSuccess(true);
    })
    .then(delay(1000))
    .then(() => setSuccess(false));
};

const handleClick = () => {
  setLoading(true);
  setSuccess(false);
  handleLoadingStart();
};

<Button width={150} onClick={handleClick} loading={loading}>
  {success ? <OkIcon /> : 'Сохранить'}
</Button>;
```
