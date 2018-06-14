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
