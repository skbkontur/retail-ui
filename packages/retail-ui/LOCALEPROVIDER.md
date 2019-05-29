Локализация компонентов с помощью полифила [`create-react-context`](https://github.com/jamiebuilds/create-react-context)

### Props

```typescript jsx
interface LocaleProviderProps {
  locale?: LocaleControls;
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
  Spinner?: SpinnerLocale;
  TokenInput?: TokenInputLocale;
  ComboBox?: ComboBoxLocale;
  TopBar?: TopBarLocale;
  Select?: SelectLocale;
  Paging?: PagingLocale;
  Logotype?: LogotypeLocale;
  DatePicker?: DatePickerLocale;
}
```

</details>

### Использование

Дефолтная локализация `<TokenInput />`

```jsx
const { default: LocaleProvider, LangCodes } = require('./components/LocaleProvider');
const { TokenInputType } = require('./components/TokenInput');
const delay = ms => v => new Promise(resolve => setTimeout(resolve, ms, v));

<LocaleProvider langCode={LangCodes.en_EN}>
  <TokenInput type={TokenInputType.Combined} getItems={() => Promise.resolve([]).then(delay(500))} />
</LocaleProvider>;
```

Кастомная локализация `<TokenInput />`

```jsx
const { default: LocaleProvider, LangCodes } = require('./components/LocaleProvider');
const { TokenInputType } = require('./components/TokenInput');
const delay = ms => v => new Promise(resolve => setTimeout(resolve, ms, v));

const customLocale = {
  TokenInput: {
    addButtonComment: 'Press Enter or type Spacebar',
  },
};

<LocaleProvider locale={customLocale} langCode={LangCodes.en_EN}>
  <TokenInput type={TokenInputType.Combined} delimiters={[' ']} getItems={() => Promise.resolve([]).then(delay(500))} />
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
    loading: 'awaiting...',
  },
};

<LocaleProvider langCode={LangCodes.en_EN}>
  <Gapped vertical gap={10}>
    <LocaleProvider locale={customLocale} langCode={LangCodes.en_EN}>
      <TokenInput getItems={() => Promise.resolve([]).then(delay(1500))} />
    </LocaleProvider>
    <TokenInput getItems={() => Promise.resolve([]).then(delay(1500))} />
    <Spinner />
  </Gapped>
</LocaleProvider>;
```

### Обзор всех доступных контролов

```jsx
const { TokenInputType } = require('./components/TokenInput');
const { default: LocaleProvider, LangCodes } = require('./components/LocaleProvider');

const delay = ms => v => new Promise(resolve => setTimeout(resolve, ms, v));

const items = [{ label: 'aaa', value: 1 }, { label: 'bbb', value: 2 }, { label: 'ccc', value: 3 }];

const LocalizationControlNames = {
  ComboBox: 'ComboBox',
  Spinner: 'Spinner',
  TokenInput: 'TokenInput',
  TopBar: 'TopBar',
  Select: 'Select',
  Paging: 'Paging',
  Logotype: 'Logotype',
  DatePicker: 'DatePicker',
  DateInput: 'DateInput',
};

class LocalizationControls extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      langCode: LangCodes.ru_RU,
      controlName: null,
    };
  }

  render() {
    const customLocaleRU = {};
    const customLocaleEN = {};

    const locale = this.state.langCode === LangCodes.en_EN ? customLocaleEN : customLocaleRU;

    return (
      <Gapped vertical gap={10}>
        <Select
          value={this.state.langCode}
          placeholder="Выбрать язык"
          items={Object.values(LangCodes)}
          onChange={(_, langCode) => this.setState({ langCode })}
        />
        <Select
          value={this.state.controlName}
          placeholder="Выбрать контрол"
          items={Object.values(LocalizationControlNames)}
          onChange={(_, controlName) => this.setState({ controlName })}
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
        return (
          <ComboBox
            getItems={str => Promise.resolve(items.filter(({ label }) => label.includes(str))).then(delay(500))}
            onChange={(_, { label: langCode }) => this.setState({ langCode })}
          />
        );

      case LocalizationControlNames.TokenInput:
        return <TokenInput type={TokenInputType.Combined} getItems={() => Promise.resolve([]).then(delay(500))} />;

      case LocalizationControlNames.Spinner:
        return <Spinner />;

      case LocalizationControlNames.DatePicker:
        return <DatePicker value="30.12.2012" />;

      case LocalizationControlNames.DateInput:
        return <DateInput value="30.12.2012" />;

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
