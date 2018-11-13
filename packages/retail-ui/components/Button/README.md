Button example

```js
const OkIcon = require('@skbkontur/react-icons/Ok').default;

<Button icon={<OkIcon />}>Ok</Button>;
```

Button has different use styles

```js
const Gapped = require('../Gapped').default;

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

```js
const Gapped = require('../Gapped').default;

<Gapped>
  <Button size="small">Small</Button>
  <Button size="medium">Medium</Button>
  <Button size="large">Large</Button>
</Gapped>;
```

Кнопки-стрелки

```jsx
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
</Gapped>
```
