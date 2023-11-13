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

Пример кнопок с иконками. Иконка может находиться как слева от текста, так и справа.

```jsx harmony
import { Button, Gapped } from '@skbkontur/react-ui';
import { XIcon16Regular } from '@skbkontur/react-ui/internal/icons2022/XIcon/XIcon16Regular';

<Gapped gap={5}>
  <Button icon={<XIcon16Regular />}>Закрыть</Button>
  <Button rightIcon={<XIcon16Regular />}>Закрыть</Button>
</Gapped>
```

У кнопки есть 3 стандартных размера.

```jsx harmony
<div
  style={{
    display: "flex",
    alignItems: "end",
    justifyContent: "space-between",
    width: "330px"
  }}>
  <Button size="small">Маленькая</Button>
  <Button size="medium">Средняя</Button>
  <Button size="large">Большая</Button>
</div>
```

Кнопки в виде стрелок.

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

Если в кнопке есть иконка, на время загрузки иконка заменяется на спиннер, если иконки нет - весь контент кнопки заменяется на спиннер.

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
