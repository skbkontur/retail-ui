Базовый пример кнопки.

```jsx harmony
import { Button } from '@skbkontur/react-ui';

<Button>Создать отчёт</Button>;
```

У кнопки есть различные темы.

```jsx harmony
import { Gapped } from '@skbkontur/react-ui';

<Gapped>
  <Button use="default">Default</Button>
  <Button use="primary">Primary</Button>
  <Button use="success">Success</Button>
  <Button use="danger">Danger</Button>
  <Button use="pay">Pay</Button>
  <Button use="link">Link</Button>
</Gapped>;
```

Пример кнопки с иконкой.

```jsx harmony
import PrintIcon from '@skbkontur/react-icons/Print';
import { Button } from '@skbkontur/react-ui';

<Button icon={<PrintIcon />}>Напечатать</Button>;
```

Пример кнопки-чекбокса.

```jsx harmony
import BookmarkIcon from '@skbkontur/react-icons/Bookmark';
import BookmarkLiteIcon from '@skbkontur/react-icons/BookmarkLite';
import { Button } from '@skbkontur/react-ui';

const [isChecked, setIsChecked] = React.useState(false);

<Button
  checked={isChecked}
  icon={isChecked ? <BookmarkLiteIcon /> : <BookmarkIcon />}
  onClick={() => setIsChecked(!isChecked)}
  >
  {isChecked ? "Удалить из закладок" : "Сохранить в закладках"}
</Button>;
```

Пример кнопки, которая получит фокус после загрузки страницы.

```jsx harmony
import { Button } from '@skbkontur/react-ui';

<Button autoFocus>Создать отчёт</Button>;
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

<Gapped gap={25}>
  <Gapped gap={5}>
    <Button arrow="left" size="medium">
      Назад
    </Button>
    <Button arrow size="medium">
      Далее
    </Button>
  </Gapped>
</Gapped>;
```

Кнопка в состоянии загрузки.

**Поведение:**

Кнопка на время нахождения в состоянии загрузки отключается.

Если в кнопке есть иконка, на время загрузки иконка заменяется на спиннер, если иконки нет - весь контент кнопки заменяется на спиннер.

```jsx harmony
import { Button, Gapped } from '@skbkontur/react-ui';
import OkIcon from '@skbkontur/react-icons/Ok';
import BookmarkIcon from '@skbkontur/react-icons/Bookmark';

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
    Сохранить
  </Button>
  <Button icon={<BookmarkIcon />} width={150} onClick={handleClick} loading={loading}>
    Сохранить
  </Button>
</Gapped>

```
