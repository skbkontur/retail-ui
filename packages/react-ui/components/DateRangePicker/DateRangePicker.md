Компонент `DateRangePicker` состоит из двух [DateInput](#/Components/DateInput) и одного общего [Calendar](#/Components/Calendar).

- Период задается через `from` и `to`
- Минимальное и максимальные даты указываются через `minDate` и `maxDate`
- Значения задаются строкой в формате `dd.mm.yyyy`
- Пустыми значениями считаются `""`, `null` и `undefined`

```jsx harmony
const [fromValue, setFromValue] = React.useState();
const [toValue, setToValue] = React.useState();
const minDate = "08.07.2024";
const maxDate = "18.08.2024";

<DateRangePicker
  from={fromValue}
  to={toValue}
  minDate={minDate}
  maxDate={maxDate}
  onValueChange={console.log}
  onFromValueChange={setFromValue}
  onToValueChange={setToValue}
/>
```

<br />

## Внешний вид

Внешний вид кастомизируется через [дизайн-токены](#/Customization/ThemeShowcase) `dateInput*` и `calendar*`.


### Размеры

Через параметр `size` доступны размеры `large`, `medium` и `small`.

```jsx harmony
import { Gapped, ThemeContext, ThemeFactory } from '@skbkontur/react-ui';

const theme = React.useContext(ThemeContext);
const createTheme = (tokens) => ThemeFactory.create(tokens, theme);

<Gapped vertical gap={16}>
  <ThemeContext.Provider value={createTheme({ calendarCellWidth: '44px', calendarCellHeight: '44px' })}>
    <DateRangePicker size="large" />
  </ThemeContext.Provider>
  
  <ThemeContext.Provider value={createTheme({ calendarCellWidth: '36px', calendarCellHeight: '36px' })}>
    <DateRangePicker size="medium" />
  </ThemeContext.Provider>

  <DateRangePicker size="small" />
</Gapped>

```

### Адаптивность

На мобильных устройствах доступны 2 варианта отображения:

- Адаптивная версия в попапе (по умолчанию)
- 2 нативных календаря через `useMobileNativeDatePicker`. Ограничение: [календарь в iOS не поддерживает параметры min и max](https://bugs.webkit.org/show_bug.cgi?id=225639)

<br />
<br />

## Произвольная настройка полей

Для более гибкой кастомизации каждого из полей доступны дочерние элементы:
- `<DateRangePicker.From />` — поле «от», настройки как у [DateInput](#/Components/DateInput)
- `<DateRangePicker.To />` — поле «до», настройки как у [DateInput](#/Components/DateInput)
- `<DateRangePicker.Separator />` — разделитель

<br />

### Поля без тире

```jsx harmony
<DateRangePicker>
  <DateRangePicker.From style={{ borderRadius: 0 }} />
  <DateRangePicker.To style={{ marginLeft: -1, borderRadius: 0 }} />
</DateRangePicker>
```

### Вертикальное расположение

```jsx harmony
import { Gapped } from '@skbkontur/react-ui';

<DateRangePicker>
    <Gapped gap={4} vertical>
      <DateRangePicker.From />
      <DateRangePicker.To />
    </Gapped>
</DateRangePicker>
```


### Открытые даты начала или конца

Для полей достпен параметр `optional`, чтобы указывать поля открытыми.

```jsx harmony
import { Checkbox } from '@skbkontur/react-ui';

<DateRangePicker>
  <DateRangePicker.From optional />
  <DateRangePicker.Separator />
  <DateRangePicker.To optional />
</DateRangePicker>
```


<!--
TODO: ручное форатирование даты
-->

<br />

## Форматирование даты


```jsx harmony
import { DateInput, DateOrder, DateSeparator, Gapped, LocaleContext, Select } from '@skbkontur/react-ui';

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
          <DateRangePicker onValueChange={value => this.setState({ value })} from={this.state.value} />
        </LocaleContext.Provider>
      </Gapped>
    );
  }
}

<DateInputFormatting />;
```

<!--
TODO: раздел валидации
-->

<br />

### Выбор дат с ценами

Пример с кастомизацией темы и кастомным рендером дня 

```jsx harmony
import { ThemeContext, ThemeFactory, CalendarDay } from '@skbkontur/react-ui';

const theme = React.useContext(ThemeContext);

function renderDay(props) {
  const [date, month] = props.date.split('.').map(Number);
  const randomDay = date % 6 === 0 || date % 7 === 0 || date % 8 === 0;
  const randomPrice = Math.round((date / month) * 1000);

  return (
    <CalendarDay {...props}>
      <div style={{ fontSize: theme.calendarCellFontSize }}>{date}</div>
      <div style={{ fontSize: '11px', fontFeatureSettings: 'tnum', fontVariantNumeric: 'tabular-nums' }}>
        {randomDay ? <>{randomPrice}&thinsp;₽</> : <span style={{ color: theme.tokenTextColorDisabled }}>—</span>}
      </div>
    </CalendarDay>
  );
}

 const [fromValue, setFromValue] = React.useState();
 const [toValue, setToValue] = React.useState();
 const minDate = "08.07.2024";
 const maxDate = "18.08.2024";

<ThemeContext.Provider
  value={ThemeFactory.create({
    calendarCellWidth: '48px',
    calendarCellHeight: '48px',
    calendarCellLineHeight: '18px',
    calendarWrapperHeight: '700px',
    calendarCellBorderRadius: '10px'
  }, theme)}
>
  <DateRangePicker
    from={fromValue}
    to={toValue}
    minDate={minDate}
    maxDate={maxDate}
    size="medium"
    onValueChange={console.log}
    onFromValueChange={setFromValue}
    onToValueChange={setToValue}
    renderDay={renderDay}
  />
</ThemeContext.Provider>
```

## Локали по умолчанию

```typescript static
interface DatePickerLocale {
  today?: string;
  months?: string[];
  order?: DateOrder;
  separator?: DateSeparator;
  todayAriaLabel?: string
  selectMonthAriaLabel?: string;
  selectYearAriaLabel?: string;
  selectChosenAriaLabel?: string;
  dayCellChooseDateAriaLabel?: string;
}

const ru_RU = {
  today: 'Сегодня',
  months: [
  'Январь',
  'Февраль',
  'Март',
  'Апрель',
  'Май',
  'Июнь',
  'Июль',
  'Август',
  'Сентябрь',
  'Октябрь',
  'Ноябрь',
  'Декабрь',
  ],
  order: DateOrder.DMY,
  separator: DateSeparator.Dot,
  todayAriaLabel: 'Перейти к сегодняшней дате',
  selectMonthAriaLabel: 'месяц',
  selectYearAriaLabel: 'год',
  selectChosenAriaLabel: 'Выбранный',
  dayCellChooseDateAriaLabel: 'Выбрать дату',
};

const en_GB = {
  today: 'Today',
  months: [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
  ],
  order: DateOrder.MDY,
  separator: DateSeparator.Slash,
  todayAriaLabel: "Go to today's date",
  selectMonthAriaLabel: 'month',
  selectYearAriaLabel: 'year',
  selectChosenAriaLabel: 'Chosen',
  dayCellChooseDateAriaLabel: 'Choose date',
};
```

