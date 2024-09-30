### Базовый пример

```jsx harmony
<Link href="https://kontur.ru" target="_blank">Обычная ссылка</Link>
```

### Корневой элемент
Cсылка может рендерить кнопку в качестве корневого элемента, c помощью пропа `component`. Cсылка принимает все пропы переданного в `component` компонента.
Рекомендуется к использованию вместо кнопки с `use=link`, если нужна кнопка с визуалом ссылки.

```jsx harmony
import { Link } from '@skbkontur/react-ui';

<Link component='button'>Кнопка, но выглядит как ссылка</Link>
```

### Проп `component`
С помощью пропа `component`, ссылка может рендерить компонент `Link` из `react router` в качестве корневого элемента.

```jsx static
import { Link } from '@skbkontur/react-ui';
import { Link as RouterLink, BrowserRouter } from 'react-router-dom';

<BrowserRouter>
  <Link to='/dashboard' component={RouterLink}>react-router-dom link</Link>
</BrowserRouter>
```

### Стили и disabled

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

### Иконка

```jsx harmony
import { Gapped } from '@skbkontur/react-ui';
import { CheckAIcon16Light } from '@skbkontur/icons/CheckAIcon16Light';

<Gapped gap={20}>
  <Link icon={<CheckAIcon16Light />}>Ссылка с иконкой слева</Link>
  <Link icon={<CheckAIcon16Light />} rightIcon={<CheckAIcon16Light />}>Ссылка с двумя иконками</Link>
  <Link rightIcon={<CheckAIcon16Light />}>Ссылка с иконкой справа</Link>
</Gapped>
```

### Ссылки, ведущие на внешние ресурсы

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

### Состояние загрузки

**Поведение**: если у ссылки есть иконка, она заменяется на спиннер, когда иконки две заменяется только левая.

```jsx harmony
import { Gapped, Button } from '@skbkontur/react-ui';
import { CheckAIcon16Light } from '@skbkontur/icons/CheckAIcon16Light';

const [isLoading, setIsLoading] = React.useState(false);

<Gapped vertical gap={15}>
  <Button onClick={() => setIsLoading(!isLoading)}>{isLoading ? "Прекратить загрузку!" : "Начать загрузку!"}</Button>
  <Gapped gap={20}>
    <Link loading={isLoading} icon={<CheckAIcon16Light />}>С иконкой слева</Link>
    <Link loading={isLoading} icon={<CheckAIcon16Light />} rightIcon={<CheckAIcon16Light />}>С двумя иконками</Link>
    <Link loading={isLoading} rightIcon={<CheckAIcon16Light />}>С иконкой справа</Link>
    <Link loading={isLoading}>Без иконки</Link>
  </Gapped>
</Gapped>
```

### Кастомное действие при нажатии

```jsx harmony
import { Toast } from '@skbkontur/react-ui';

<Link onClick={() => Toast.push("Ты нажал на ссылку!")}>Ссылка с кастомным действием</Link>
```

### Проп `theme`

```jsx harmony
import { Link, Gapped } from '@skbkontur/react-ui';

<Gapped>
  <Link theme={{linkColor: '#C00000'}}>Ok</Link>
  <Link>Ok</Link>
</Gapped>
```


### Кастомизация ссылки

```jsx harmony
import { Toast, Button } from "@skbkontur/react-ui";
import { CopyIcon16Regular } from "@skbkontur/icons/CopyIcon16Regular"

const textDecorationStyles = {
  linkTextUnderlineOffset: '1px'
}

const underlineOnHoverStyles = {
  linkTextDecorationColor: 'transparent',
}

const differentColorStyles = {
  linkColor: 'blue',
  linkHoverColor: 'blue',
  linkActiveColor: 'blue',
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
          <td style={tdStyle}><Link theme={styles}>Link</Link></td>
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
