```jsx harmony
import { Gapped } from '@skbkontur/react-ui';

<Gapped vertical>
  <Logotype suffix="edi" color="#1E79BE" />
  <Logotype suffix="бухгалтерия" color="#A23A99" />
  <Logotype suffix="диадок" color="#1fab90" />
  <Logotype suffix="экстерн" color="#F15600" />
  <Logotype suffix="фокус" color="#56916E" />
  <div style={{ background: '#56916E' }}>
    <Logotype suffix="фокус" color="#FFF" textColor="#FFF" />
  </div>
</Gapped>;
```

#### Локали по умолчанию (см. `LocaleProvider`)

```typescript static
interface LogotypeLocale {
  suffix?: string;
  prefix?: string;
}

const ru_RU = {
  prefix: 'к',
  suffix: 'нтур',
};

const en_GB = {
  prefix: 'k',
  suffix: 'ntur',
};
```
