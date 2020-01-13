```jsx
<DateInput value="27.04.1992" />
```

```jsx
<DateInput value={state.value} onChange={(_, v) => setState({ value: v })} />
```

```jsx
<DateInput disabled value="27.04.1992" />
```

### Форматирование даты при смене локали

```jsx
import Gapped from '@skbkontur/react-ui/Gapped';
import Select from '@skbkontur/react-ui/Select';
import LocaleProvider, { LangCodes } from '@skbkontur/react-ui/LocaleProvider';

class DateInputFormatting2 extends React.Component {
  constructor() {
    this.state = {
      langCode: LangCodes.ru_RU,
      value: '21.12.2012',
    };
  }

  render() {
    return (
      <Gapped vertical gap={10}>
        <div>
          <span style={{ width: '300px', display: 'inline-block' }}>
            Локаль (<tt>LangCodes</tt>)
          </span>
          <Select
            value={this.state.langCode}
            placeholder="Выбрать язык"
            items={Object.values(LangCodes)}
            onChange={(_, langCode) => this.setState({ langCode })}
          />
        </div>
        <LocaleProvider langCode={this.state.langCode}>
          <DateInput onChange={(a, value) => this.setState({ value })} value={this.state.value} />
        </LocaleProvider>
      </Gapped>
    );
  }
}

<DateInputFormatting2 />;
```

### Ручное форматирование даты

```jsx
import Gapped from '@skbkontur/react-ui/Gapped';
import Select from '@skbkontur/react-ui/Select';
import LocaleProvider, { DateOrder, DateSeparator } from '@skbkontur/react-ui/LocaleProvider';

class DateInputFormatting extends React.Component {
  constructor() {
    this.state = {
      order: DateOrder.YMD,
      separator: 'Dot',
      value: '21.12.2012',
    };
  }

  render() {
    return (
      <Gapped vertical gap={10}>
        <div>
          <span style={{ width: '300px', display: 'inline-block' }}>
            Порядок компонентов (<tt>DateOrder</tt>)
          </span>
          <Select
            value={this.state.order}
            items={Object.keys(DateOrder)}
            onChange={(_, order) => this.setState({ order })}
          />
        </div>
        <div>
          <span style={{ width: '300px', display: 'inline-block' }}>
            Разделитель (<tt>DateSeparator</tt>)
          </span>
          <Select
            value={this.state.separator}
            items={Object.keys(DateSeparator)}
            onChange={(_, separator) => this.setState({ separator })}
          />
        </div>
        <LocaleProvider
          locale={{
            DatePicker: {
              separator: DateSeparator[this.state.separator],
              order: this.state.order,
            },
          }}
        >
          <DateInput onChange={(a, value) => this.setState({ value })} value={this.state.value} />
        </LocaleProvider>
      </Gapped>
    );
  }
}

<DateInputFormatting />;
```
