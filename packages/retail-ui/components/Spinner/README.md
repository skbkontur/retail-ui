```js
const { default: Gapped } = require('../Gapped');
const reactNodeCaption = (
  <div>
    <Spinner type="mini" caption={null} /> <span style={{ color: 'tomato', fontSize: '1.3em' }}>З</span>
    агрузка ...
  </div>
);

<Gapped>
  <Spinner type="big" caption="big" />
  <Spinner type="normal" caption="normal" />
  <Spinner type="mini" caption="mini" />
  <Spinner type="mini" dimmed caption="mini dimmed" />
  <Spinner type="big" caption={reactNodeCaption} />
</Gapped>;
```

#### Локали по умолчанию (см. `LocaleProvider`)

```typescript
interface SpinnerLocale {
  loading?: React.ReactNode;
}

const ru_RU = {
  loading: 'Загрузка',
};

const en_EN = {
  loading: 'Loading',
};
```
