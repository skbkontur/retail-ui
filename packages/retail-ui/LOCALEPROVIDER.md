Локализация компонентов с помощью полифила [`create-react-context`](https://github.com/jamiebuilds/create-react-context)

### Props

```typescript
interface LocaleProviderProps {
  locale?: LocaleControls;
  langCode?: LangCodes;
}
```

Доступные языки

```typescript
enum LangCodes {
  ru_RU = 'ru_RU',
  en_GB = 'en_GB',
}
```

<details><summary>LocaleControls</summary>

```typescript
interface LocaleControls {
  Spinner?: SpinnerLocale;
  TokenInput?: TokenInputLocale;
  ComboBox?: ComboBoxLocale;
  TopBar?: TopBarLocale;
  Select?: SelectLocale;
  Paging?: PagingLocale;
  Logotype?: LogotypeLocale;
  DatePicker?: DatePickerLocale;
  Fias?: FiasLocale;
}
```

</details>

### Использование

Дефолтная локализация `<TokenInput />`

```jsx
import LocaleProvider, { LangCodes } from '@skbkontur/react-ui/LocaleProvider';
import TokenInput, { TokenInputType } from '@skbkontur/react-ui/TokenInput';
const delay = ms => v => new Promise(resolve => setTimeout(resolve, ms, v));

<LocaleProvider langCode={LangCodes.en_GB}>
  <TokenInput type={TokenInputType.Combined} getItems={() => Promise.resolve([]).then(delay(500))} />
</LocaleProvider>;
```

Кастомная локализация `<TokenInput />`

```jsx
import LocaleProvider, { LangCodes } from '@skbkontur/react-ui/LocaleProvider';
import TokenInput, { TokenInputType } from '@skbkontur/react-ui/TokenInput';
const delay = ms => v => new Promise(resolve => setTimeout(resolve, ms, v));

const customLocale = {
  TokenInput: {
    addButtonComment: 'Press Enter or type Spacebar',
  },
};

<LocaleProvider locale={customLocale} langCode={LangCodes.en_GB}>
  <TokenInput type={TokenInputType.Combined} delimiters={[' ']} getItems={() => Promise.resolve([]).then(delay(500))} />
</LocaleProvider>;
```

Некоторые контролы используют компоненты других контролов.
<br/>
Для инкапсуляции локализации можно использовать несколько контекстов.

```jsx
import LocaleProvider, { LangCodes } from '@skbkontur/react-ui/LocaleProvider';
import TokenInput, { TokenInputType } from '@skbkontur/react-ui/TokenInput';
import Gapped from '@skbkontur/react-ui/Gapped';
import Spinner from '@skbkontur/react-ui/Spinner';

const delay = ms => v => new Promise(resolve => setTimeout(resolve, ms, v));

const customLocale = {
  Spinner: {
    loading: 'awaiting...',
  },
};

<LocaleProvider langCode={LangCodes.en_GB}>
  <Gapped vertical gap={10}>
    <LocaleProvider locale={customLocale} langCode={LangCodes.en_GB}>
      <TokenInput getItems={() => Promise.resolve([]).then(delay(1500))} />
    </LocaleProvider>
    <TokenInput getItems={() => Promise.resolve([]).then(delay(1500))} />
    <Spinner />
  </Gapped>
</LocaleProvider>;
```

### Обзор всех доступных контролов

```jsx
import TokenInput, { TokenInputType } from '@skbkontur/react-ui/TokenInput';
import LocaleProvider, { LangCodes } from '@skbkontur/react-ui/LocaleProvider';
import Gapped from '@skbkontur/react-ui/Gapped';
import Select from '@skbkontur/react-ui/Select';
import ComboBox from '@skbkontur/react-ui/ComboBox';
import Spinner from '@skbkontur/react-ui/Spinner';
import TopBar from '@skbkontur/react-ui/TopBar';
import Paging from '@skbkontur/react-ui/Paging';
import Logotype from '@skbkontur/react-ui/Logotype';
import DatePicker from '@skbkontur/react-ui/DatePicker';
import DateInput from '@skbkontur/react-ui/DateInput';
import Fias from '@skbkontur/react-ui/Fias';

const delay = ms => v => new Promise(resolve => setTimeout(resolve, ms, v));

const items = [
  { label: 'aaa', value: 1 },
  { label: 'bbb', value: 2 },
  { label: 'ccc', value: 3 },
];

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
  Fias: 'Fias',
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

    const locale = this.state.langCode === LangCodes.en_GB ? customLocaleEN : customLocaleRU;

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

      case LocalizationControlNames.Fias:
        return <Fias />;
    }
    return null;
  }
}

<LocalizationControls />;
```
