```js
const { default: Gapped } = require('../Gapped');
<Gapped vertical>
  <Logotype suffix="edi" color="#1E79BE" />
  <Logotype suffix="бухгалтерия" color="#A23A99" withWidget />
  <Logotype suffix="диадок" color="#1fab90" />
  <Logotype suffix="экстерн" color="#F15600" />
  <Logotype suffix="фокус" color="#56916E" />
  <div style={{ background: '#56916E' }}>
    <Logotype suffix="фокус" color="#FFF" textColor="#FFF" />
  </div>
</Gapped>;
```

Примеры использования логотипов продуктов из пакета `@skbkontur/logos`:

```jsx harmony
const { Kontur, KonturEN, Buhgalteria, Diadoc, Billing, Extern, Focus, FocusEN } = require ('@skbkontur/logos');
const { default: Gapped } = require('../Gapped');

<Gapped vertical>
  <Logotype konturLogo={<Kontur />} productLogo={<Buhgalteria color="#A23A99" />} />
  <Logotype konturLogo={<Kontur />} productLogo={<Diadoc color="#1fab90" />} withWidget />
  <Logotype konturLogo={<Kontur color="#D92932" />} productLogo={<Extern />} />
  <Logotype konturLogo={<Kontur />} productLogo={<Focus />} />
  <div style={{ background: '#56916E' }}>
    <Logotype konturLogo={<Kontur color="#fff" />} productLogo={<Focus color="#fff" />} />
  </div>
  <Logotype konturLogo={<KonturEN />} productLogo={<FocusEN color="#56916E" />} />
  <Logotype size={28} konturLogo={<Kontur />} productLogo={<Billing />} />
  <Logotype size={32} konturLogo={<Kontur />} />
</Gapped>;
```

#### Локали по умолчанию (см. `LocaleProvider`)

```typescript
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
