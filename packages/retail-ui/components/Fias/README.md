Базовое использование.

```jsx
let initialState = {
  home: {},
};

let handleChange = value => setState({ home: value });

<Fias baseUrl={'https://api.kontur.ru/fias/v1/'} value={state.home} onChange={handleChange} />;
```

Поле поиска.

```jsx
let initialState = {
  home: {},
};

let handleChange = value => setState({ home: value });

<Fias baseUrl={'https://api.kontur.ru/fias/v1/'} value={state.home} onChange={handleChange} search={true} />;
```

Только верифицированные адреса.

```jsx
let initialState = {
  home: {
    address: {
      city: {
        name: 'Екатеринбург',
        data: {
          name: 'Екатеринбург',
          abbreviation: 'г',
          fiasId: '2763c110-cb8b-416a-9dac-ad28a55b4402',
          actuality: true,
          id: 'c2404c2a-0af3-440f-9320-9cbd160c4557',
          parentFiasId: '92b30014-4d52-4e2e-892d-928142b924bf',
          level: 'City',
          okato: '65401000000',
          oktmo: '65701000',
          code: '6600000100000',
        },
      },
    },
  },
};

let handleChange = value => setState({ home: value });

<Fias baseUrl={'https://api.kontur.ru/fias/v1/'} value={state.home} onChange={handleChange} allowNotVerified={false} />;
```

Произвольные адреса.

```jsx
let initialState = {
  home: {
    address: {
      city: {
        name: 'Санкт-Контурбург',
      },
    },
  },
};

let handleChange = value => setState({ home: value });

<Fias baseUrl={'https://api.kontur.ru/fias/v1/'} value={state.home} onChange={handleChange} formValidation={'None'} />;
```

Настройка полей. Почтовый индекс.

```jsx
let initialState = {
  home: {
    fiasId: '22ead39c-ddcc-4c46-951d-f958750810fd',
  },
};

let handleChange = value => setState({ home: value });

<Fias
  baseUrl={'https://api.kontur.ru/fias/v1/'}
  value={state.home}
  onChange={handleChange}
  search={true}
  fieldsSettings={{
    region: {
      visible: false,
    },
    district: {
      visible: false,
    },
    settlement: {
      visible: false,
    },
    intracityarea: {
      visible: false,
    },
    planningstructure: {
      visible: false,
    },
    stead: {
      visible: false,
    },
    room: {
      visible: false,
    },
    postalcode: {
      visible: true,
    },
  }}
/>;
```

Иностранные адреса.

```jsx
let initialState = {
  home: {
    country: {
      code: '124',
      fullName: 'Канада',
      shortName: 'Канада',
    },
    foreignAddress: '80 Wellington St Ottawa',
    postalCode: 'ON K1A 0A2',
  },
};

let handleChange = value => setState({ home: value });

<Fias baseUrl={'https://api.kontur.ru/fias/v1/'} value={state.home} onChange={handleChange} countrySelector={true} />;
```

Пользовательская валидация ошибок верификации

```jsx
let initialState = {
  home: {
    address: {
      city: {
        name: 'Санкт-Контурбург',
      },
    },
    addressErrors: {
      city: 'Адрес не найден',
    },
  },
  warning: true,
};

let handleChange = value =>
  setState({
    home: value,
    warning: Boolean(Object.keys(value.addressErrors).length),
  });

<Fias
  baseUrl={'https://api.kontur.ru/fias/v1/'}
  value={state.home}
  onChange={handleChange}
  formValidation={'Warning'}
  warning={state.warning}
  feedback={'Заполнено не по справочнику адресов'}
/>;
```

Есть возможность создавать свои контролы на основе Fias

```jsx
const isEqual = require('lodash.isequal');
const { Component } = require('react');
const { FiasSearch, FiasAPI, Address } = require('./index');

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

Формат данных:

```typescript
enum Fields {
  region = 'region',
  district = 'district',
  city = 'city',
  intracityarea = 'intracityarea',
  settlement = 'settlement',
  planningstructure = 'planningstructure',
  street = 'street',
  stead = 'stead',
  house = 'house',
  room = 'room',
}

enum ExtraFields {
  postalcode = 'postalcode',
}

interface FiasValue {
  address?: {
    [key in Fields]?: {
      name: string;
      data?: FiasObject;
    }
  };
  addressString?: string;
  addressErrors?: { [key in Fields]?: string };
  fiasId?: string;
  postalCode?: string;
  foreignAddress?: string;
  country?: FiasCountry;
}

interface FiasCountry {
  shortName: string;
  fullName: string;
  code: string;
}

const value: FiasValue = {
  address: {
    region: {
      name: 'Свердловская',
      data: {
        name: 'Свердловская',
        abbreviation: 'обл',
        fiasId: '92b30014-4d52-4e2e-892d-928142b924bf',
        actuality: true,
        id: 'e76abf09-3148-42f6-85db-51edb09e72b7',
        level: 'Region',
        okato: '65000000000',
        ifnsfl: '6600',
        ifnsul: '6600',
        postalCode: '620000',
        code: '6600000000000',
      },
    },
    city: {
      name: 'Екатеринбург',
      data: {
        name: 'Екатеринбург',
        abbreviation: 'г',
        fiasId: '2763c110-cb8b-416a-9dac-ad28a55b4402',
        actuality: true,
        id: 'c2404c2a-0af3-440f-9320-9cbd160c4557',
        parentFiasId: '92b30014-4d52-4e2e-892d-928142b924bf',
        level: 'City',
        okato: '65401000000',
        oktmo: '65701000',
        code: '6600000100000',
      },
    },
    street: {
      name: 'Малопрудная',
      data: {
        name: 'Малопрудная',
        abbreviation: 'ул',
        fiasId: '1de47f19-2de3-4d4b-9a3c-472fdc858975',
        actuality: true,
        id: '599b198f-4519-4c61-969a-c1bec6902724',
        parentFiasId: '2763c110-cb8b-416a-9dac-ad28a55b4402',
        level: 'Street',
        okato: '65401364000',
        oktmo: '65701000',
        ifnsfl: '6658',
        ifnsul: '6658',
        postalCode: '620036',
        code: '66000001000155300',
      },
    },
    house: {
      name: '5',
      data: {
        number: '5',
        fiasId: '2c9c38a3-e2b1-45d7-993d-d41be557a097',
        parentFiasId: '1de47f19-2de3-4d4b-9a3c-472fdc858975',
        id: '2c9c38a3-e2b1-45d7-993d-d41be557a097',
        structureStatus: 'Structure',
        estateStatus: 'House',
        postalCode: '620036',
        okato: '65401364000',
        oktmo: '65701000',
        ifnsfl: '6658',
        ifnsul: '6658',
        structureNumber: '2',
      },
    },
    room: {
      name: '10',
    },
  },
  addressString: 'Свердловская область, город Екатеринбург, улица Малопрудная, дом 5 строение 2',
  addressErrors: {},
  fiasId: '2c9c38a3-e2b1-45d7-993d-d41be557a097',
};
```

#### Локали по умолчанию (см. `LocaleProvider`)

```typescript
interface FiasLocale {
  modalTitle: string;
  modalButtonOk: string;
  modalButtonCancel: string;

  addressFill: string;
  addressEdit: string;
  addressNotVerified: string;
  addressNotFound: string;
  addressFillParentOrSearch: string;
  addressSelectItemFromList: string;

  searchNotFound: string;
  searchPlaceholder: string;

  regionLabel: string;
  regionNotFound: string;
  regionPlaceholder: string;

  districtLabel: string;
  districtNotFound: string;
  districtPlaceholder: string;

  cityLabel: string;
  cityNotFound: string;
  cityPlaceholder: string;

  intracityareaLabel: string;
  intracityareaNotFound: string;
  intracityareaPlaceholder: string;

  settlementLabel: string;
  settlementNotFound: string;
  settlementPlaceholder: string;

  planningstructureLabel: string;
  planningstructureNotFound: string;
  planningstructurePlaceholder: string;

  streetLabel: string;
  streetNotFound: string;
  streetFillBefore: string;
  streetPlaceholder: string;

  steadLabel: string;
  steadNotFound: string;
  steadFillBefore: string;
  steadPlaceholder: string;

  houseLabel: string;
  houseNotFound: string;
  houseFillBefore: string;
  housePlaceholder: string;

  roomLabel: string;
  roomNotFound: string;
  roomFillBefore: string;
  roomPlaceholder: string;

  postalcodeLabel: string;
  postalcodePlaceholder: string;
  postalcodeNotFound: string;
  postalcodeNotValid: string;
  postalcodeReplace: string;

  foreignAddressLabel: string;
  foreignAddressPlaceholder: string;

  countryLabel: string;
  countryPlaceholder: string;
}

const ru_RU = {
  modalTitle: 'Адрес',
  modalButtonOk: 'Сохранить',
  modalButtonCancel: 'Отменить',

  addressFill: 'Заполнить адрес',
  addressEdit: 'Изменить адрес',
  addressNotVerified: 'Адрес не найден в справочнике',
  addressNotFound: 'Адрес не найден',
  addressFillParentOrSearch: 'Заполните поля выше, либо воспользуйтесь поиском',
  addressSelectItemFromList: 'Выберите значение из списка',

  searchNotFound: 'Адрес не найден',
  searchPlaceholder: 'Начните вводить адрес, например: Москва, Внуково',

  regionLabel: 'Регион',
  regionNotFound: 'Регион не найден',
  regionPlaceholder: 'Можно вводить код или название',

  districtLabel: 'Район',
  districtNotFound: 'Район не найден',
  districtPlaceholder: '',

  cityLabel: 'Город',
  cityNotFound: 'Город не найден',
  cityPlaceholder: '',

  intracityareaLabel: 'Внутригородская территория',
  intracityareaNotFound: 'Внутригородская территория не найдена',
  intracityareaPlaceholder: '',

  settlementLabel: 'Населенный пункт',
  settlementNotFound: 'Населенный пункт не найден',
  settlementPlaceholder: 'Село, деревня, станица и другие',

  planningstructureLabel: 'Иная территория',
  planningstructureNotFound: 'Не найдены иные территории по указанному выше расположению',
  planningstructurePlaceholder: 'Сад, парк, санаторий и другие',

  streetLabel: 'Улица',
  streetNotFound: 'Не найдены улицы по указанному выше расположению',
  streetFillBefore: 'Заполните город или населенный пункт, чтобы выбрать улицу',
  streetPlaceholder: '',

  steadLabel: 'Земельный участок',
  steadNotFound: 'Не найдены участки по указанному выше расположению',
  steadFillBefore: 'Заполните улицу, чтобы выбрать номер участка',
  steadPlaceholder: '',

  houseLabel: 'Дом, сооружение',
  houseNotFound: 'Не найдены дома по указанному выше расположению',
  houseFillBefore: 'Заполните улицу или иную территорию, чтобы выбрать номер дома',
  housePlaceholder: '',

  roomLabel: 'Квартира, офис',
  roomPlaceholder: '',

  postalcodeLabel: 'Индекс',
  postalcodePlaceholder: '',
  postalcodeNotFound: 'Заполнено не по справочнику адресов',
  postalcodeReplace: 'Заменить справочным',
};
```
