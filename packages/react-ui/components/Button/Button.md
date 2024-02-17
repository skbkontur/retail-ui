Базовый пример кнопки.

```jsx harmony
import { Button } from '@skbkontur/react-ui';

<Button>Создать отчёт</Button>;
```

У кнопки есть различные стили.

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

В кнопку можно передать иконку. Иконка может находиться как слева от текста кнопки, так и справа и даже в обоих позициях одновременно.

```jsx harmony
import { Button, Gapped } from '@skbkontur/react-ui';
import { XIcon16Regular } from '@skbkontur/react-ui/internal/icons2022/XIcon/XIcon16Regular';

<Gapped gap={5}>
  <Button icon={<XIcon16Regular />}>Закрыть</Button>
  <Button icon={<XIcon16Regular />} rightIcon={<XIcon16Regular />}>Закрыть</Button>
  <Button rightIcon={<XIcon16Regular />}>Закрыть</Button>
</Gapped>
```

У кнопки есть 3 стандартных размера.

```jsx harmony
import { MinusCircleIcon16Light } from '@skbkontur/react-ui/internal/icons2022/MinusCircleIcon/MinusCircleIcon16Light';

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

Кнопки могут принимать вид стрелок. В таком случае иконка привязывается к краю кнопки.

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

Кнопка в состоянии загрузки.

**Поведение:**

Кнопка на время нахождения в состоянии загрузки отключается.

Если в кнопке есть иконка, на время загрузки иконка заменяется на спиннер, если иконки нет — весь контент кнопки заменяется на спиннер. Когда иконки две — заменяется только левая.

```jsx harmony
import { Button, Gapped } from '@skbkontur/react-ui';
import OkIcon from '@skbkontur/react-icons/Ok';
import { MinusCircleIcon16Light } from '@skbkontur/react-ui/internal/icons2022/MinusCircleIcon/MinusCircleIcon16Light';

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

Пример кнопки с пропом `theme`

```jsx harmony
import { Button, Gapped } from '@skbkontur/react-ui';

<Gapped>
  <Button theme={{textColorDefault: '#C00000'}}>Ok</Button>
  <Button use="link" theme={{linkColor: '#C00000'}}>Ok</Button>
  <Button>Ok</Button>
</Gapped>
```


Пример кастомизации кнопки-ссылки

```jsx harmony
import { Toast } from "@skbkontur/react-ui";
import { Copy } from "@skbkontur/react-icons"

const textDecorationStyles = {
  btnLinkLineBorderBottomWidth: '0',
  btnLinkHoverTextDecoration: 'underline'
}

const underlineOnHoverStyles = {
  btnLinkLineBorderBottomColor: 'transparent',
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

const renderExampleRow = (title, styles, index) => {
    return (
        <tr>
          <td style={tdStyle}>{title}</td>
          <td style={tdStyle}><Button use={'link'} theme={styles}>Button-link</Button></td>
          <td style={tdStyle}>
            <div style={{display: 'flex'}}>
              <div style={{width: '80%', whiteSpace: 'pre-line'}}>{stringify(styles).replace(/, /g, '\n')}</div>
              <Button icon={<Copy />} use={'text'} onClick={() => copyStyles(styles)}/>
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
  {renderExampleRow('Ссылка с подчеркиванием через text-decoration', textDecorationStyles)}
  {renderExampleRow('Ссылка с подчеркиванием при наведении', underlineOnHoverStyles)}
  {renderExampleRow('Изменение цвета ссылки', differentColorStyles)}
</table>
```
