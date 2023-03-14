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

Значения `small`, `medium` и `large` позволяют использовать спиннер как обычную иконку.
Размеры соответствуют встроенным иконкам, которые зависят от пропа `size` в теме 
`THEME_2022`.
Например, стрелки в `<Button>`.
```jsx harmony
import { Gapped, Spinner, Button } from '@skbkontur/react-ui';

<Gapped vertical>
    <Gapped>
      <Spinner type="small" caption={null} dimmed />
      <Spinner type="small" caption="small" />
      <Button size="small" arrow>Button</Button>
    </Gapped>
    <Gapped>
      <Spinner type="medium" caption={null} dimmed />
      <Spinner type="medium" caption="medium" />
      <Button size="medium" arrow>Button</Button>
    </Gapped>
    <Gapped>
      <Spinner type="large" caption={null} dimmed />
      <Spinner type="large" caption="large" />
      <Button size="large" arrow>Button</Button>
    </Gapped>
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
