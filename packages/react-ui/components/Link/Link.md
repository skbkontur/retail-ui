Базовый пример ссылки.

```jsx harmony
<Link>Обычная ссылка</Link>
```

Ссылка может иметь различные темы, а также быть отключенной.

```jsx harmony
import { Gapped } from '@skbkontur/react-ui';

<Gapped gap={15}>
  <Link>Обычная ссылка</Link>
  <Link use="success">Успешная ссылка</Link>
  <Link use="danger">Опасная ссылка</Link>
  <Link use="grayed">Работающая ссылка серого цвета</Link>
  <Link disabled>Отключенная ссылка</Link>
</Gapped>;
```

Пример ссылки с иконкой.

```jsx harmony
import OkIcon from '@skbkontur/react-icons/Ok';

<Link icon={<OkIcon />}>Ссылка с иконкой</Link>
```

Пример ссылок ведущих на внешние ресурсы.

_Примечание_:

Если в контрол `Link` передана ссылка, ведущая на внешний ресурс, контрол `Link` неявно добавит атрибут `rel` со значением необходимым для внешних ссылок, при этом не трогая атрибут `target`.

Открытие ссылки в новой вкладке остаётся на усмотрение разработчика.

```jsx harmony
import { Gapped } from '@skbkontur/react-ui';

<Gapped>
  <Link href="https://www.youtube.com/">
    Откроется <span style={{ color: "#e3071c" }}>в этой</span> вкладке
  </Link>
  <Link target="_blank" href="https://www.youtube.com/">
    Откроется <span style={{ color: "#3f9726" }}>в новой</span> вкладке
  </Link>
</Gapped>
```

Ссылка в состоянии загрузки.

**Поведение**:

Если у ссылки есть иконка, она заменяется на спиннер.

```jsx harmony
import { Gapped, Button } from '@skbkontur/react-ui';
import OkIcon from '@skbkontur/react-icons/Ok';

const [isLoading, setIsLoading] = React.useState(false);

<Gapped vertical gap={15}>
  <Button onClick={() => setIsLoading(!isLoading)}>{isLoading ? "Прекратить загрузку!" : "Начать загрузку!"}</Button>
  <Gapped gap={20}>
    <Link loading={isLoading} icon={<OkIcon/>}>С иконкой</Link>
    <Link loading={isLoading}>Без иконки</Link>
  </Gapped>
</Gapped>
```

Ссылка может иметь кастомное действие при нажатии.

```jsx harmony
import { Toast } from '@skbkontur/react-ui';

<Link onClick={() => Toast.push("Ты нажал на ссылку!")}>Ссылка с кастомным действием</Link>
```
