```jsx harmony
import { Gapped, Spinner } from '@skbkontur/react-ui';

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
  <Spinner type="big" caption="custom" width={8} color={'#538A1B'}/>
</Gapped>;
```

#### Локали по умолчанию

```typescript static
interface SpinnerLocale {
  loading?: React.ReactNode;
}

const ru_RU = {
  loading: 'Загрузка',
};

const en_GB = {
  loading: 'Loading',
};
```
