Пример использования.

```jsx harmony
import { Switcher, Gapped } from '@skbkontur/react-ui';

const [alignAt, setAlignAt] = React.useState("center");

<Gapped vertical gap="12px">
  <Switcher
    items={[
      {label: "Слева", value: "left"},
      {label: "По центру", value: "center"},
      {label: "Справа", value: "right"}
    ]}
    value={alignAt}
    onValueChange={setAlignAt}
  />

  <Center
    align={alignAt}
    style={{ background: '#fdd', height: 150 }}
  >
    <div style={{ background: 'black', width: 30, height: 30 }} />
  </Center>
</Gapped>
```
