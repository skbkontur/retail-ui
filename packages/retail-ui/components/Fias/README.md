Базовое использование.

```jsx
let initialState = {
  home: {}
};

let handleChange = value => setState({ home: value });

<Fias
  baseUrl={'https://api.kontur.ru/fias/v1/'}
  value={state.home}
  onChange={handleChange}
/>;
```

Поле поиска.

```jsx
let initialState = {
  home: {}
};

let handleChange = value => setState({ home: value });

<Fias
  baseUrl={'https://api.kontur.ru/fias/v1/'}
  value={state.home}
  onChange={handleChange}
  search={true}
/>;
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
          code: '6600000100000'
        }
      }
    }
  }
};

let handleChange = value => setState({ home: value });

<Fias
  baseUrl={'https://api.kontur.ru/fias/v1/'}
  value={state.home}
  onChange={handleChange}
  allowNotVerified={false}
/>;
```

Произвольные адреса.

```jsx
let initialState = {
  home: {
    address: {
      city: {
        name: 'Санкт-Контурбург'
      }
    }
  }
};

let handleChange = value => setState({ home: value });

<Fias
  baseUrl={'https://api.kontur.ru/fias/v1/'}
  value={state.home}
  onChange={handleChange}
  formValidation={'None'}
/>;
```

Пользовательская валидация ошибок верификации

```jsx
let initialState = {
  home: {
    address: {
      city: {
        name: 'Санкт-Контурбург'
      }
    },
    addressErrors: {
      city: 'Адрес не найден'
    }
  },
  warning: true
};

let handleChange = value =>
  setState({
    home: value,
    warning: Boolean(Object.keys(value.addressErrors).length)
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

Возможности кастомизации

```jsx
let initialState = {
  home: {}
};

let handleChange = value => setState({ home: value });

const locale = {
  modalTitle: '🏛️',
  modalButtonOk: '👍',
  modalButtonCancel: '👎'
};
const BriefcaseIcon = () => '💼';

<Fias
  baseUrl={'https://api.kontur.ru/fias/v1/'}
  value={state.home}
  onChange={handleChange}
  label={'Юридический адрес'}
  icon={<BriefcaseIcon />}
  locale={locale}
/>;
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
  room = 'room'
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
        code: '6600000000000'
      }
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
        code: '6600000100000'
      }
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
        code: '66000001000155300'
      }
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
        structureNumber: '2'
      }
    },
    room: {
      name: '10'
    }
  },
  addressString:
    'Свердловская область, город Екатеринбург, улица Малопрудная, дом 5 строение 2',
  addressErrors: {},
  fiasId: '2c9c38a3-e2b1-45d7-993d-d41be557a097'
};
```

Текстовые константы по умолчанию (`locale`):

```typescript
const defaultLocale = {
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
  planningstructureNotFound:
    'Не найдены иные территории по указанному выше расположению',
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
  houseFillBefore:
    'Заполните улицу или иную территорию, чтобы выбрать номер дома',
  housePlaceholder: '',

  roomLabel: 'Квартира, офис',
  roomPlaceholder: ''
};
```
