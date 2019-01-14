Для использования иконок необходимо установить пакет `@skbkontur/react-icons`

<details><summary>Props</summary>

```ts
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

```jsx
const { default: Gapped } = require('retail-ui/components/Gapped');
const { default: Tooltip } = require('retail-ui/components/Tooltip');
const { default: Icon } = require('@skbkontur/react-icons');

<Gapped vertical>
  <div>Имя показывается при наведении:</div>
  <Gapped>
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

```jsx
const { default: OkIcon } = require('@skbkontur/react-icons/Ok');
const { default: Icon } = require('@skbkontur/react-icons');

<Gapped gap={20}>
  <OkIcon size={16} color="red" />
  <Icon.Ok size={24} color="green" />
  <Icon name="Ok" size={32} color="blue" />
</Gapped>;
```
