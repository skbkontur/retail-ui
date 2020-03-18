Компонент поиска может использоваться отдельно.

```jsx harmony
import isEqual from 'lodash.isequal';
import { Component } from 'react';
import { FiasSearch, FiasAPI, FiasAddress } from '@skbkontur/react-ui';

class MyCustomFias extends Component {
  constructor(props) {
    super(props);
    this.api = new FiasAPI(props.baseUrl);
    this.state = {
      address: new FiasAddress(),
    };
    this.handleValueChange = this.handleValueChange.bind(this);
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
        onValueChange={this.handleValueChange}
        width={width}
        error={error}
        warning={warning}
        placeholder="Начните вводить адрес, например: Москва, Внуково"
      />
    );
  }

  handleValueChange(address) {
    this.setState({ address });
    if (this.props.onValueChange) {
      this.props.onValueChange(address.getValue());
    }
  }

  updateAddress() {
    FiasAddress.getAddress(this.api, this.props.value).then(address => {
      this.setState({
        address,
      });
    });
  }
}

initialState = {
  value: {},
};
const handleValueChange = value => setState({ value });

<MyCustomFias baseUrl="https://api.kontur.ru/fias/v1/" value={state.value} onValueChange={handleValueChange} />;
```

#### Локали по умолчанию (см. `LocaleProvider`)

```typescript
interface FiasLocale {
  searchNotFound: string;
}

const ru_RU = {
  searchNotFound: 'Адрес не найден',
};
```
