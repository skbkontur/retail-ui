### Базовый пример
По умолчанию, кнопка принимает все пропы `HTMLButtonElement`.

```jsx harmony
import { Button } from '@skbkontur/react-ui';

<Button onClick={alert} name="report">Создать отчёт</Button>;
```

### Корневой компонент
Кнопка может рендерить ссылку в качестве корневого элемента, c помощью пропа `component`. Кнопка принимает все пропы переданного в `component` компонента.

```jsx harmony
import { Button } from '@skbkontur/react-ui';

<Button component='a' href='https://kontur.ru' target="_blank">Ссылка, но выглядит как кнопка</Button>
```

### Различные стили

```jsx harmony
import { Gapped } from '@skbkontur/react-ui';

const bgStyle = {
  backgroundImage: `linear-gradient(to right, rgba(130, 130, 130, 0.5) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(130, 130, 130, 0.5) 1px, transparent 1px)`,
  backgroundSize: `16px 16px`,
  backgroundPosition: `-8px -8px`,
  padding: 16
};

<Gapped vertical>
  <Gapped>
    <Button use="default">Default</Button>
    <Button use="primary">Primary</Button>
    <Button use="success">Success</Button>
    <Button use="danger">Danger</Button>
    <Button use="pay">Pay</Button>
    <Button use="text">Text</Button>
    <Button use="backless">Backless</Button>
    <Button use="link">Link</Button>
  </Gapped>
  <Gapped style={bgStyle}>
    <Button use="default">Default</Button>
    <Button use="primary">Primary</Button>
    <Button use="success">Success</Button>
    <Button use="danger">Danger</Button>
    <Button use="pay">Pay</Button>
    <Button use="text">Text</Button>
    <Button use="backless">Backless</Button>
    <Button use="link">Link</Button>
  </Gapped>
</Gapped>
```

### Иконка
В кнопку можно передать иконку. Иконка может находиться как слева от текста кнопки, так и справа и даже в обоих позициях одновременно.

```jsx harmony
import { Button, Gapped } from '@skbkontur/react-ui';
import { XIcon16Regular } from '@skbkontur/icons/XIcon16Regular';

<Gapped gap={5}>
  <Button icon={<XIcon16Regular />}>Закрыть</Button>
  <Button icon={<XIcon16Regular />} rightIcon={<XIcon16Regular />}>Закрыть</Button>
  <Button rightIcon={<XIcon16Regular />}>Закрыть</Button>
</Gapped>
```

### Размер

```jsx harmony
<div
  style={{
    display: "flex",
    alignItems: "end",
    gap: '10px',
  }}
>
  <Button size="small">Маленькая</Button>
  <Button size="medium">Средняя</Button>
  <Button size="large">Большая</Button>
</div>
```

### Ширина

```jsx harmony
<Button width={40}>Закрыть</Button>
```

### Состояние валидации

```jsx harmony
import { Gapped, Button } from '@skbkontur/react-ui';
<Gapped gap={5}>
  <Button warning>Закрыть</Button>
  <Button error>Закрыть</Button>
</Gapped>
```

### Стрелка

```jsx harmony
import { Gapped, Button } from '@skbkontur/react-ui';

<Gapped gap={5}>
  <Button arrow="left" size="medium">
    Назад
  </Button>
  <Button arrow size="medium">
    Далее
  </Button>
</Gapped>
```

### Состояние загрузки

**Поведение:**
Кнопка на время нахождения в состоянии загрузки отключается.
Если в кнопке есть иконка, на время загрузки иконка заменяется на спиннер, если иконки нет — весь контент кнопки заменяется на спиннер. Когда иконки две — заменяется только левая.

```jsx harmony
import { Button, Gapped } from '@skbkontur/react-ui';
import { MinusCircleIcon16Light } from '@skbkontur/icons/MinusCircleIcon16Light';

const [loading, setLoading] = React.useState(false);

const delay = time => args => new Promise(resolve => setTimeout(resolve, time, args));

const handleLoadingStart = () => {
  delay(2000)()
    .then(() => {
      setLoading(false);
    })
};

const handleClick = () => {
  setLoading(true);
  handleLoadingStart();
};

<Gapped>
  <Button width={150} onClick={handleClick} loading={loading}>
    Удалить
  </Button>
  <Button icon={<MinusCircleIcon16Light />} width={150} onClick={handleClick} loading={loading}>
    Удалить
  </Button>
  <Button rightIcon={<MinusCircleIcon16Light />} width={150} onClick={handleClick} loading={loading}>
    Удалить
  </Button>
  <Button icon={<MinusCircleIcon16Light />} rightIcon={<MinusCircleIcon16Light />} width={150} onClick={handleClick} loading={loading}>
    Удалить
  </Button>
</Gapped>

```

### Проп темы

```jsx harmony
import { Button, Gapped } from '@skbkontur/react-ui';

<Gapped>
  <Button theme={{textColorDefault: '#C00000'}}>Ok</Button>
  <Button use="link" theme={{linkColor: '#C00000'}}>Ok</Button>
  <Button>Ok</Button>
</Gapped>
```

### Кастомизация кнопки-ссылки

```jsx harmony
import { Toast } from "@skbkontur/react-ui";
import { CopyIcon16Regular } from "@skbkontur/icons/CopyIcon16Regular"

const textDecorationStyles = {
  btnLinkTextUnderlineOffset: '1px',
}

const underlineOnHoverStyles = {
  btnLinkTextDecorationColor: 'transparent',
}

const differentColorStyles = {
  btnLinkColor: 'blue',
  btnLinkHoverColor: 'blue',
  btnLinkActiveColor: 'blue',
}

const stringify = (styles) => {
  return `${Object.entries(styles).map(([key, value]) => `${key}: "${value}"`).join(", ")}`
}

const copyStyles = (styles) => {
  navigator.clipboard.writeText(stringify(styles));
  Toast.push('Copied');
}

const tableStyle = {
  borderCollapse: 'collapse',
  width: '100%',
};

const tdStyle = {
  border: '1px solid',
  padding: '8px',
};

const renderExampleRow = (title, styles) => {
  return (
    <tr>
      <td style={tdStyle}>{title}</td>
      <td style={tdStyle}><Button use={'link'} theme={styles}>Button-link</Button></td>
      <td style={tdStyle}>
        <div style={{display: 'flex'}}>
          <div style={{width: '80%', whiteSpace: 'pre-line'}}>{stringify(styles).replace(/, /g, '\n')}</div>
          <Button icon={<CopyIcon16Regular />} use={'text'} onClick={() => copyStyles(styles)}/>
        </div>
      </td>
    </tr>
  )
}

<table style={tableStyle}>
  <tr style={{textAlign: 'left'}}>
    <th style={tdStyle}></th>
    <th style={tdStyle}>Пример</th>
    <th style={tdStyle}>Переменные темы</th>
  </tr>
  {renderExampleRow('Ссылка с подчеркиванием без отступа', textDecorationStyles)}
  {renderExampleRow('Ссылка с подчеркиванием при наведении', underlineOnHoverStyles)}
  {renderExampleRow('Изменение цвета ссылки', differentColorStyles)}
</table>
```

### Узкая Кнопка

```jsx harmony
import { Button } from '@skbkontur/react-ui';

<Button narrow>
  Создать отчет
</Button>
```

### Состояния валидации

```jsx harmony
import { Button, Gapped } from '@skbkontur/react-ui';

<Gapped gap={5}>
  <Button warning>
    Warning
  </Button>
  <Button error>
    Error
  </Button>
</Gapped>
```
