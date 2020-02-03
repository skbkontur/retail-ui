Для использования иконок необходимо установить пакет `@skbkontur/react-icons`

<details><summary>Props</summary>

```typescript
type IconProps = {
  color?: string;
  name: IconName;
  size?: number | string;
};

type IconName =
  | 'Menu'
  | 'Add'
  | 'ArchivePack'
  | 'ArchiveUnpack'
  | 'Attach'
  | 'Baby'
  | 'Backward'
  | 'BarcodeScanner'
  | 'Briefcase'
  | 'Calculator'
  | 'Calendar'
  | 'Card'
  | 'Certificate'
  | 'Clear'
  | ... 218 more ...
  | 'Infiniti';
```

</details>

Все иконки

```jsx harmony
import Icon from '@skbkontur/react-icons';
import { Gapped, Tooltip } from '@skbkontur/react-ui';

<Gapped vertical>
  <div>Имя показывается при наведении:</div>
  <Gapped wrap>
    {Object.keys(Icon).map(name => (
      <Tooltip key={name} render={() => name}>
        <Icon name={name} />
      </Tooltip>
    ))}
  </Gapped>
</Gapped>;
```

Варианты использования иконок.
Для уменьшения размера бандла рекомендуется использовать компонент с конкретной иконкой

```jsx harmony
import { Gapped } from '@skbkontur/react-ui';
import OkIcon from '@skbkontur/react-icons/Ok';
import Icon from '@skbkontur/react-icons';

<Gapped gap={20}>
  <OkIcon size={16} color="red" />
  <Icon.Ok size={24} color="green" />
  <Icon name="Ok" size={32} color="blue" />
</Gapped>;
```
