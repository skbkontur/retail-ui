Локализация компонентов с помощью полифила [`create-react-context`](https://github.com/jamiebuilds/create-react-context)

### Props
```typescript jsx
interface LocaleProviderProps {
  locale?: LocaleControls
  langCode?: LangCodes;
}
```
Доступные языки
```typescript jsx
enum LangCodes {
  ru_RU = 'ru_RU',
  en_EN = 'en_EN',
}
```

<details><summary>LocaleControls</summary>

```typescript jsx
interface LocaleControls {
  Spinner?: {
    loading?: React.ReactNode;
  };
  TokenInput?: {
    addButtonComment?: string;
    addButtonTitle?: string;
  };
  ComboBox?: {
    notFound?: string;
    errorNetworkButton?: string;
    errorNetworkMessage?: string;
  };
  TopBar?: {
    logout?: string;
    cabinetTitle?: string;
    cabinetSettings?: string;
    cabinetCertificates?: string;
    cabinetServices?: string;
  };
  Select?: {
    placeholder?: React.ReactNode;
  };
  Paging?: {
    forward?: string;
  };
  Logotype?: {
    suffix?: string;
    prefix?: string;
  }
}
```

</details>

### Использование

Нативная локализация `<TokenInput />`
```jsx
const { default: LocaleProvider, LangCodes } = require('./components/LocaleProvider');
const { TokenInputType } = require('./components/TokenInput');
const delay = ms => v => new Promise(resolve => setTimeout(resolve, ms, v));

<LocaleProvider langCode={LangCodes.en_EN}>
  <TokenInput
    type={TokenInputType.Combined}
    getItems={() => Promise.resolve([]).then(delay(500))}
  />
</LocaleProvider>;
```

Кастомная локализация `<TokenInput />`
```jsx
const { default: LocaleProvider, LangCodes } = require('./components/LocaleProvider');
const { TokenInputType } = require('./components/TokenInput');
const delay = ms => v => new Promise(resolve => setTimeout(resolve, ms, v));

const customLocale = {
  TokenInput: {
    addButtonComment: 'Press Enter or type Spacebar'
  }
};

<LocaleProvider locale={customLocale} langCode={LangCodes.en_EN}>
  <TokenInput
    type={TokenInputType.Combined}
    delimiters={[' ']}
    getItems={() => Promise.resolve([]).then(delay(500))}
  />
</LocaleProvider>;
```


Некоторые контролы используют компоненты других контролов.
<br/>
Для инкапсуляции локализации можно использовать несколько контекстов.
```jsx
const { default: LocaleProvider, LangCodes } = require('./components/LocaleProvider');
const { TokenInputType } = require('./components/TokenInput');
const delay = ms => v => new Promise(resolve => setTimeout(resolve, ms, v));

const customLocale = {
  Spinner: {
    loading: 'awaiting...'
  }
};

<LocaleProvider langCode={LangCodes.en_EN}>
  <Gapped vertical gap={10}>
    <LocaleProvider locale={customLocale} langCode={LangCodes.en_EN}>
      <TokenInput
        getItems={() => Promise.resolve([]).then(delay(1500))}
      />
    </LocaleProvider>
    <TokenInput
      getItems={() => Promise.resolve([]).then(delay(1500))}
    />
    <Spinner />
  </Gapped>
</LocaleProvider>;
```

### Обзор всех доступных контролов

```jsx
const { TokenInputType } = require('./components/TokenInput');
const { default: LocaleProvider, LangCodes } = require('./components/LocaleProvider');

const delay = ms => v => new Promise(resolve => setTimeout(resolve, ms, v));

const items = [
  {label: 'aaa', value: 1},
  {label: 'bbb', value: 2},
  {label: 'ccc', value: 3},
];

const LocalizationControlNames = {
  ComboBox: 'ComboBox',
  Spinner: 'Spinner',
  TokenInput: 'TokenInput',
  TopBar: 'TopBar',
  Select: 'Select',
  Paging: 'Paging',
  Logotype: 'Logotype'
};

class LocalizationControls extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
        langCode: LangCodes.ru_RU,
        controlName: null
      };
  }

  render() {
    const customLocaleRU = {

    };
    const customLocaleEN = {

    };

    const locale = this.state.langCode === LangCodes.en_EN ? customLocaleEN : customLocaleRU;

    return (
      <Gapped vertical gap={10}>
        <ComboBox
          placeholder='Выбрать язык'
          getItems={() => Promise.resolve(Object.values(LangCodes).map((label, value) => ({ label, value })))}
          onChange={(_, { label: langCode }) => this.setState({ langCode })}
        />
        <ComboBox
          placeholder='Выбрать контрол'
          getItems={() => Promise.resolve(Object.values(LocalizationControlNames).map((label, value) => ({ label, value })))}
          onChange={(_, { label: controlName }) => this.setState({ controlName })}
        />
        <LocaleProvider langCode={this.state.langCode} locale={locale}>
          {this.getControl(this.state.controlName)}
        </LocaleProvider>
      </Gapped>
    );
  }

  getControl(controlName) {
    switch (controlName) {
      case LocalizationControlNames.ComboBox:
        return <ComboBox
          getItems={str => Promise.resolve(items.filter(({label}) => label.includes(str))).then(delay(500))}
          onChange={(_, { label: langCode }) => this.setState({ langCode })}
        />;

      case LocalizationControlNames.TokenInput:
        return <TokenInput
          type={TokenInputType.Combined}
          getItems={() => Promise.resolve([]).then(delay(500))}
        />;

      case LocalizationControlNames.Spinner:
        return <Spinner />;

      case LocalizationControlNames.TopBar:
        return (
          <TopBar>
            <TopBar.Start>
              <TopBar.ItemStatic>
                <Logotype suffix="ui" withWidget />
              </TopBar.ItemStatic>
            </TopBar.Start>
            <TopBar.End>
              <TopBar.User userName="Alexander The Great" />
              <TopBar.Divider />
              <TopBar.Logout onClick={() => alert('Logout!')} />
            </TopBar.End>
          </TopBar>
      );

      case LocalizationControlNames.Logotype:
        return <Logotype />;

      case LocalizationControlNames.Select:
        return <Select />;

      case LocalizationControlNames.Paging:
        return <Paging activePage={1} pagesCount={12} onPageChange={value => value} />;
    }
    return null;
  }
}

<LocalizationControls />;

```
