Управление с клавиатуры работает в двух вариантах:

- **useGlobalListener === true** слушатель keydown событий на document, если на стринице несколько компонентов Paging,
  обработчик будет срабатывать на каждом
- **useGlobalListener === false** обработка нажатия клавиш будет работать только когда компонент в фокусе.

Навигационные подсказки появляются когда доступно управление с клавиатуры и `withoutNavigationHint != true`

### Базовый пример
```jsx harmony
class Paginator3000 extends React.Component {
  constructor() {
    super();
    this.state = { active: 1 };
    this._handlePageChange = this._handlePageChange.bind(this);
  }

  render() {
    return <Paging activePage={this.state.active} onPageChange={this._handlePageChange} pagesCount={12} />;
  }

  _handlePageChange(pageNumber) {
    this.setState({ active: pageNumber });
  }
}

<Paginator3000 />;
```

### Пейджинг в отключенном состоянии

```jsx
const [activePage, setActivePage] = React.useState(3);

<Paging
  disabled
  onPageChange={(activePage) => setActivePage(activePage)}
  activePage={activePage}
  pagesCount={8}
/>
```

### Локали по умолчанию

```typescript static
interface PagingLocale {
  forward?: string;
}

const ru_RU = {
  forward: 'Дальше',
};

const en_GB = {
  forward: 'Forward',
};
```
