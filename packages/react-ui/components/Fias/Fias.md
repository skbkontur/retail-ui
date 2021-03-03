Базовое использование.

```jsx harmony
let initialState = {
  home: {},
};

let handleValueChange = value => setState({ home: value });

<Fias baseUrl={'https://api.kontur.ru/fias/v1/'} value={state.home} onValueChange={handleValueChange} />;
```

Поле поиска.

```jsx harmony
let initialState = {
  home: {},
};

let handleValueChange = value => setState({ home: value });

<Fias baseUrl={'https://api.kontur.ru/fias/v1/'} value={state.home} onValueChange={handleValueChange} search={true} />;
```

Только верифицированные адреса.

```jsx harmony
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

let handleValueChange = value => setState({ home: value });

<Fias
  baseUrl={'https://api.kontur.ru/fias/v1/'}
  value={state.home}
  onValueChange={handleValueChange}
  allowNotVerified={false}
/>;
```

Произвольные адреса.

```jsx harmony
let initialState = {
  home: {
    address: {
      city: {
        name: 'Санкт-Контурбург',
      },
    },
  },
};

let handleValueChange = value => setState({ home: value });

<Fias
  baseUrl={'https://api.kontur.ru/fias/v1/'}
  value={state.home}
  onValueChange={handleValueChange}
  formValidation={'None'}
/>;
```

Настройка полей. Почтовый индекс.

```jsx harmony
let initialState = {
  home: {
    fiasId: '22ead39c-ddcc-4c46-951d-f958750810fd',
  },
};

let handleValueChange = value => setState({ home: value });

<Fias
  baseUrl={'https://api.kontur.ru/fias/v1/'}
  value={state.home}
  onValueChange={handleValueChange}
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

```jsx harmony
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

let handleValueChange = value => setState({ home: value });

<Fias
  baseUrl={'https://api.kontur.ru/fias/v1/'}
  value={state.home}
  onValueChange={handleValueChange}
  countrySelector={true}
/>;
```

Пользовательская валидация ошибок верификации

```jsx harmony
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

let handleValueChange = value =>
  setState({
    home: value,
    warning: Boolean(Object.keys(value.addressErrors).length),
  });

<Fias
  baseUrl={'https://api.kontur.ru/fias/v1/'}
  value={state.home}
  onValueChange={handleValueChange}
  formValidation={'Warning'}
  warning={state.warning}
  feedback={'Заполнено не по справочнику адресов'}
/>;
```

Формат данных:

```typescript static
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
    };
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

```typescript static
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
  steadFillBefore: 'Заполните город или населенный пункт, чтобы выбрать номер участка',
  steadPlaceholder: '',

  houseLabel: 'Дом, сооружение',
  houseNotFound: 'Не найдены дома по указанному выше расположению',
  houseFillBefore: 'Заполните город или населенный пункт, чтобы выбрать номер дома',
  housePlaceholder: '',

  roomLabel: 'Квартира, офис',
  roomNotFound: 'Не найдены помещения по указанному выше расположению',
  roomFillBefore: 'Заполните номер дома, чтобы выбрать квартиру',
  roomPlaceholder: '',

  postalcodeLabel: 'Индекс',
  postalcodePlaceholder: '',
  postalcodeNotFound: 'Заполнено не по справочнику адресов',
  postalcodeNotValid: 'Значение не соответствует формату',
  postalcodeReplace: 'Заменить справочным',

  foreignAddressLabel: 'Адрес',
  foreignAddressPlaceholder: '',

  countryLabel: 'Страна',
  countryPlaceholder: 'Начните вводить название страны',
};
```
