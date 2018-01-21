```js
const { default: Gapped } = require("../Gapped");
const { default: Tooltip } = require("../Tooltip");

<Gapped vertical>
  <div>Имя показывается при наведении:</div>
  <Gapped>
    {Icon.getAllNames().map(name => (
      <Tooltip key={name} render={() => name}>
        <Icon name={name} />
      </Tooltip>
    ))}
  </Gapped>
</Gapped>;
```
