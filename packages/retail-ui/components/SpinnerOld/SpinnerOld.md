```jsx
import Gapped from '@skbkontur/react-ui/Gapped';
import { SpinnerOld } from '@skbkontur/react-ui/SpinnerOld';

const reactNodeCaption = (
  <div>
    <SpinnerOld type="mini" caption={null} /> <span style={{ color: 'tomato', fontSize: '1.3em' }}>З</span>
    агрузка ...
  </div>
);

<Gapped>
  <SpinnerOld type="big" caption="big" />
  <SpinnerOld type="normal" caption="normal" />
  <SpinnerOld type="mini" caption="mini" />
  <SpinnerOld type="mini" dimmed caption="mini dimmed" />
  <SpinnerOld type="big" caption={reactNodeCaption} />
</Gapped>;
```

#### Локали по умолчанию (см. `LocaleProvider`)

```typescript
interface SpinnerOldLocale {
  loading?: React.ReactNode;
}

const ru_RU = {
  loading: 'Загрузка',
};

const en_GB = {
  loading: 'Loading',
};
```
