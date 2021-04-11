```jsx harmony
<DateInput value="27.04.1992" />
```

```jsx harmony
const [value, setValue] = React.useState();

<DateInput value={value} onValueChange={setValue} />
```

```jsx harmony
<DateInput disabled value="27.04.1992" />
```

### Форматирование даты при смене локали

```jsx harmony
import { Gapped, LangCodes, LocaleContext, Select } from '@skbkontur/react-ui';

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
            onValueChange={langCode => this.setState({ langCode })}
          />
        </div>
        <LocaleContext.Provider value={{ langCode: this.state.langCode }}>
          <DateInput onValueChange={value => this.setState({ value })} value={this.state.value} />
        </LocaleContext.Provider>
      </Gapped>
    );
  }
}

<DateInputFormatting2 />;
```

### Ручное форматирование даты

```jsx harmony
import { DateOrder, DateSeparator, Gapped, LocaleContext, Select } from '@skbkontur/react-ui';

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
            onValueChange={order => this.setState({ order })}
          />
        </div>
        <div>
          <span style={{ width: '300px', display: 'inline-block' }}>
            Разделитель (<tt>DateSeparator</tt>)
          </span>
          <Select
            value={this.state.separator}
            items={Object.keys(DateSeparator)}
            onValueChange={separator => this.setState({ separator })}
          />
        </div>
        <LocaleContext.Provider value={{
          locale:{
            DatePicker: {
              separator: DateSeparator[this.state.separator],
              order: this.state.order,
            },
          }}}
        >
          <DateInput onValueChange={value => this.setState({ value })} value={this.state.value} />
        </LocaleContext.Provider>
      </Gapped>
    );
  }
}

<DateInputFormatting />;
```
