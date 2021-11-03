Локализации компонентов через контекст `React.Context<LocaleContextProps>`

```typescript static
interface LocaleContextProps {
  locale?: LocaleControls;
  langCode?: LangCodes;
}
```

Доступные языки

```typescript static
enum LangCodes {
  ru_RU = 'ru_RU',
  en_GB = 'en_GB',
}
```

LocaleControls

```typescript static
interface LocaleControls {
  Spinner?: SpinnerLocale;
  TokenInput?: TokenInputLocale;
  ComboBox?: ComboBoxLocale;
  Select?: SelectLocale;
  Paging?: PagingLocale;
  DatePicker?: DatePickerLocale;
}
```

### Использование

Дефолтная локализация `<TokenInput />`

```jsx harmony
import { LangCodes, LocaleContext, TokenInput, TokenInputType } from '@skbkontur/react-ui';

const delay = time => args => new Promise(resolve => setTimeout(resolve, time, args));

<LocaleContext.Provider value={{ langCode: LangCodes.en_GB }}>
  <TokenInput type={TokenInputType.Combined} getItems={() => Promise.resolve([]).then(delay(500))} />
</LocaleContext.Provider>;
```

Кастомная локализация `<TokenInput />`

```jsx harmony
import { LocaleContext, TokenInput, TokenInputType } from '@skbkontur/react-ui';

const delay = time => args => new Promise(resolve => setTimeout(resolve, time, args));

const customLocale = {
  TokenInput: {
    addButtonComment: 'Press Enter or type Spacebar',
  },
};

<LocaleContext.Provider value={{ locale: customLocale }}>
  <TokenInput type={TokenInputType.Combined} delimiters={[' ']} getItems={() => Promise.resolve([]).then(delay(500))} />
</LocaleContext.Provider>;
```

Некоторые контролы используют компоненты других контролов.
<br/>
Для инкапсуляции локализации можно использовать несколько контекстов.

```jsx harmony
import { Gapped, LangCodes, LocaleContext, Spinner, TokenInput } from '@skbkontur/react-ui';

const delay = time => args => new Promise(resolve => setTimeout(resolve, time, args));

const customLocale = {
  Spinner: {
    loading: 'awaiting...',
  },
};

<LocaleContext.Provider value={{ langCode: LangCodes.en_GB }}>
  <Gapped vertical gap={10}>
    <LocaleContext.Provider value={{ locale: customLocale }}>
      <TokenInput getItems={() => Promise.resolve([]).then(delay(1500))} />
    </LocaleContext.Provider>
    <TokenInput getItems={() => Promise.resolve([]).then(delay(1500))} />
    <Spinner />
  </Gapped>
</LocaleContext.Provider>;
```

Локализация функционального компонента через useContext.

```jsx harmony
import { useContext } from 'react';
import { LangCodes, LocaleContext } from '@skbkontur/react-ui';

const languages = {
  [LangCodes.ru_RU]: 'Русский',
  [LangCodes.en_GB]: 'English',
};

function LocalizedByHook() {
  const { langCode } = useContext(LocaleContext);
  return <div>{languages[langCode]}</div>;
}

<LocaleContext.Provider value={{ langCode: LangCodes.en_GB }}>
  <LocalizedByHook />
</LocaleContext.Provider>;
```

### Обзор всех доступных контролов

```jsx harmony
import {
  ComboBox,
  DateInput,
  DatePicker,
  Gapped,
  LocaleContext,
  Paging,
  Select,
  Spinner,
  TokenInput,
  LangCodes,
} from '@skbkontur/react-ui';
import { TokenInputType } from '@skbkontur/react-ui/components/TokenInput';

const delay = time => args => new Promise(resolve => setTimeout(resolve, time, args));

const items = [
  { label: 'aaa', value: 1 },
  { label: 'bbb', value: 2 },
  { label: 'ccc', value: 3 },
];

const LocalizationControlNames = {
  ComboBox: 'ComboBox',
  Spinner: 'Spinner',
  TokenInput: 'TokenInput',
  Select: 'Select',
  Paging: 'Paging',
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
    // попробуйте кастомизировать локаль любого контрола
    const customLocaleRU = {};
    const customLocaleEN = {};

    const locale = this.state.langCode === LangCodes.en_GB ? customLocaleEN : customLocaleRU;

    return (
      <Gapped vertical gap={10}>
        <Select
          value={this.state.langCode}
          placeholder="Выбрать язык"
          items={Object.values(LangCodes)}
          onValueChange={langCode => this.setState({ langCode })}
        />
        <Select
          value={this.state.controlName}
          placeholder="Выбрать контрол"
          items={Object.values(LocalizationControlNames)}
          onValueChange={controlName => this.setState({ controlName })}
        />
        <LocaleContext.Provider value={{ langCode: this.state.langCode, locale: locale }}>
          {this.getControl(this.state.controlName)}
        </LocaleContext.Provider>
      </Gapped>
    );
  }

  getControl(controlName) {
    switch (controlName) {
      case LocalizationControlNames.ComboBox:
        return (
          <ComboBox
            getItems={str => Promise.resolve(items.filter(({ label }) => label.includes(str))).then(delay(500))}
            onValueChange={({ label: langCode }) => this.setState({ langCode })}
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

### Локализация @skbkontur/react-ui-addons

Компоненты `@skbkontur/react-ui-addons` так же поддерживают локализацию через `LocaleContext` из `@skbkontur/react-ui`.
См. пример с кастомной локализацией. Дефолтные локали описаны для каждого компонента в [докумендации аддонов](https://ui.gitlab-pages.kontur.host/docs/#/react-ui-addons).
