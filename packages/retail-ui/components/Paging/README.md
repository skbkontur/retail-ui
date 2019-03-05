Управление с клавиатуры работает в двух вариантах:

- **useGlobalListener === true** слушатель keydown событий на document, если на стринице несколько компонентов Paging,
  обработчик будет срабатывать на каждом
- **useGlobalListener === false** обработка нажатия клавиш будет работать только когда компонент в фокусе.

Навигационные подсказки появляются когда доступно управлнеие с клавиатуры и `withoutNavigationHint != true`

```js
class Paginator3000 extends React.Component {
  constructor() {
    super();
    this.state = { active: 1 };
    this._handlePageChange = this._handlePageChange.bind(this);
  }

  render() {
    return (
      <Paging
        activePage={this.state.active}
        onPageChange={this._handlePageChange}
        pagesCount={12}
      />
    );
  }

  _handlePageChange(pageNumber) {
    this.setState({ active: pageNumber });
  }
}

<Paginator3000 />;
```

#### Локали по умолчанию (см. `LocaleContext`)
```typescript
const ru_RU = {
  Paging: {
    forward: 'Дальше'    
  }
};

const en_EN = {
  Paging: {
    forward: 'Forward'
  }
};

```
