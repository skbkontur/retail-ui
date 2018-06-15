Button example

```js
<Button icon="Ok">Ok</Button>
```

Button has different use styles

```js
const Gapped = require("../Gapped").default;

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
const Gapped = require("../Gapped").default;

<Gapped>
  <Button size="small">Small</Button>
  <Button size="medium">Medium</Button>
  <Button size="large">Large</Button>
</Gapped>;
```
