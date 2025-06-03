### Базовый пример

```jsx harmony
import { Token } from '@skbkontur/react-ui';

<Token>Example</Token>;
```

### Состояние валидации

```jsx harmony
import { Gapped, Token } from '@skbkontur/react-ui';

<Gapped gap={20} vertical>
  <Gapped gap={10}>
    <Token>Correct</Token>
    <Token warning>Warned</Token>
    <Token error>Errored</Token>
  </Gapped>
  <Gapped gap={10}>
    <Token isActive>Correct</Token>
    <Token isActive warning>
      Warned
    </Token>
    <Token isActive error>
      Errored
    </Token>
  </Gapped>
</Gapped>;
```

### Размер

```jsx harmony
import { Gapped, Token } from '@skbkontur/react-ui';

<Gapped vertical>
  <Token size="small">
    Маленький
  </Token>
  <Token size="medium">
    Средний
  </Token>
  <Token size="large">
    Большой
  </Token>
</Gapped>
```
