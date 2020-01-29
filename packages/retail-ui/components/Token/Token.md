Token example

```jsx harmony
import { Token } from '@skbkontur/react-ui';

<Token>Example</Token>;
```

You can control color of each token

```jsx harmony
import { Gapped, Token } from '@skbkontur/react-ui';

const colors = {
  default: {
    idle: 'defaultIdle',
    active: 'defaultActive',
  },
  gray: {
    idle: 'grayIdle',
    active: 'grayActive',
  },
  blue: {
    idle: 'blueIdle',
    active: 'blueActive',
  },
  green: {
    idle: 'greenIdle',
    active: 'greenActive',
  },
  yellow: {
    idle: 'yellowIdle',
    active: 'yellowActive',
  },
  red: {
    idle: 'redIdle',
    active: 'redActive',
  },
  mono: {
    idle: 'white',
    active: 'black',
  },
};

<Gapped gap={20} vertical>
  <Gapped gap={10}>
    <Token colors={colors.default}>Default</Token>
    <Token isActive colors={colors.default}>
      Default
    </Token>
  </Gapped>
  <Gapped gap={10}>
    <Token colors={colors.gray}>Gray</Token>
    <Token isActive colors={colors.gray}>
      Gray
    </Token>
  </Gapped>
  <Gapped gap={10}>
    <Token colors={colors.blue}>Blue</Token>
    <Token isActive colors={colors.blue}>
      Blue
    </Token>
  </Gapped>
  <Gapped gap={10}>
    <Token colors={colors.green}>Green</Token>
    <Token isActive colors={colors.green}>
      Green
    </Token>
  </Gapped>
  <Gapped gap={10}>
    <Token colors={colors.yellow}>Yellow</Token>
    <Token isActive colors={colors.yellow}>
      Yellow
    </Token>
  </Gapped>
  <Gapped gap={10}>
    <Token colors={colors.red}>Red</Token>
    <Token isActive colors={colors.red}>
      Red
    </Token>
  </Gapped>
  <Gapped gap={10}>
    <Token colors={colors.mono}>Monochrome</Token>
    <Token isActive colors={colors.mono}>
      Monochrome
    </Token>
  </Gapped>
</Gapped>;
```

Can accept validation state

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
