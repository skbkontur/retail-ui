Компонент поиска может использоваться отдельно.

```jsx
const isEqual = require('lodash.isequal');
const { Component } = require('react');
const { FiasSearch, FiasAPI, Address } = require('../index');

class MyCustomFias extends Component {
  constructor(props) {
    super(props);
    this.api = new FiasAPI(props.baseUrl);
    this.state = {
      address: new Address(),
    };
    this.handleChange = this.handleChange.bind(this);
    this.updateAddress = this.updateAddress.bind(this);
  }

  componentDidMount() {
    this.updateAddress();
  }

  componentDidUpdate(prevProps) {
    if (!isEqual(prevProps.value, this.props.value)) {
      this.updateAddress();
    }
  }

  render() {
    const { width, error, warning } = this.props;
    return (
      <FiasSearch
        api={this.api}
        address={this.state.address}
        onChange={this.handleChange}
        width={width}
        error={error}
        warning={warning}
      />
    );
  }

  handleChange(address) {
    this.setState({ address });
    if (this.props.onChange) {
      this.props.onChange(address.getValue());
    }
  }

  updateAddress() {
    Address.getAddress(this.api, this.props.value).then(address => {
      this.setState({
        address,
      });
    });
  }
}

initialState = {
  value: {},
};
const handleChange = value => setState({ value });

<MyCustomFias baseUrl="https://api.kontur.ru/fias/v1/" value={state.value} onChange={handleChange} />;
```

#### Локали по умолчанию (см. `LocaleProvider`)

```typescript
interface FiasLocale {
  searchNotFound: string;
  searchPlaceholder: string;
}

const ru_RU = {
  searchNotFound: 'Адрес не найден',
  searchPlaceholder: 'Начните вводить адрес, например: Москва, Внуково',
};
```
