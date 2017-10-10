# Changelog

### 0.8.7 -> 0.9.0
#### 01.09.2017
- **NOTE** Всюду заменили экспорт компонент на `export default`
- Kebab - [@slawwan](https://github.com/slawwan) сделал его красивым, аккуратно выровненным
- Kebab - добавлен пропс `disabled` (by [@slawwan](https://github.com/slawwan))
- Popup - починили метод определяющий помещается попап на экран или нет (by [@slawwan](https://github.com/slawwan))
- Flow - обновили до 0.53.1
- TS - поправили экспорт компонент в дефинишенаx, добавлены дефинешены для Center & Spinner (by [@slawwan](https://github.com/slawwan))
- Autocomplete - починили отправку лишних запрососв на сервер, если текст в поле не изменился
- Modal - если открыты несколько модалок, то `Escape` теперь закрывает не все модалки сразу, а последовательно

### 0.8.6 -> 0.8.7
- Tabs - вынесли цвет индикатора в отдельную переменную ([@wKich](https://github.com/wKich) - молодец)
- Button - поправили цвет кнопке в состоянии checked при ховере в IE8 (спасибо [@kholstinin](https://github.com/kholstinin))
- Icon - запилили workaround, для коррекетной es3-фикации в бабеле (спасибо [@wKich](https://github.com/wKich))
- [@slawwan](https://github.com/slawwan) починил тайпскриптовые дефинишены
- Select - добавили пропс `areValuesEqual` (спасибо [@BooleT37](https://github.com/BooleT37))
- [@sorovlad](https://github.com/sorovlad) оптимизировал большое количество подписок создаваемых в RenderLayer
- обновили зависимости

### 0.8.5 -> 0.8.6
- Icon - нейминг в соответствии гайдам

### 0.8.4 -> 0.8.5
- **Paging** - зарелизили наконец (спасибо [@BooleT37](https://github.com/BooleT37), [@slawwan](https://github.com/slawwan))
- Hint - поправили создание множественных таймеров
- RadioGroup - поправили обработку нажатия Enter
- Input - поправили внешний вид на iOS (спасибо [@alatielle](https://github.com/alatielle))
- Autocomplete - починили выбор элементов при работе с сенсорных устройств
- Добавили TS дефинишены для Gapped, Icon, Input, Link, Select (спасибо [@LakeVostok](https://github.com/LakeVostok))

### 0.8.0 -> 0.8.4
- TopBar - появилась возможность задать ссылку и компонент логотипу
- Починили темизацию

### 0.7.6 -> 0.8.0
#### 26.06.2017
- **BREAKING**: удалили папку *web_modules* и чуть изменили способ [темизации](https://github.com/skbkontur/retail-ui#Хотим-другой-цвет-кнопки) библиотечки
- Научились собирать библиотечку, собранная версия доступна в **npm** под именем **@skbkontur/react-ui**
- Добавили компоненты
  - [Tabs](http://tech.skbkontur.ru/react-ui/#/components/Tabs)
  - [Kebab](http://tech.skbkontur.ru/react-ui/#/components/Kebab)
- Checkbox - поправили выравнивание текста при нескольких строках, поправлен цвет в IE8
- Spinner - поправили совместимость с react@15
- Button - добавили TypeScript дефинишены, методы `focus` и `blur`, а также пропс `autoFocus`
- DatePicker - добавили метод `blur`
- Select/Dropdown - добавили метод `close`

### 0.7.5 -> 0.7.6
#### 5.05.2017
- **Перешли на использование пакета prop-types**. Требуется реакт 0.14.9 или 15.5.х
- Input - Исправлен полифилл плейсхолдера
- RadioGroup - Исправлен фокус
- Tooltip - Исправлено определение начальной позиции
- Logotype - `suffix` теперь необязательный

### 0.7.4 -> 0.7.5
#### 20.04.2017
- ComboBox - добавлен пропс `menuAlign: 'left' | 'right'`
- Flow - обновлен до 0.44.1

### 0.7.3 -> 0.7.4
#### 10.04.2017
- Tooltip - поправлена баг, при котором вызывался setState на анмаунченной компоненте
- DatePicker - поправлен баг, при котором стиралось значение
- RadioGroup - поправлено отображаение фокуса

### 0.7.2 -> 0.7.3
#### 4.04.2017
- Modal - теперь центрируется вертикально в соотношение 40/60
- MenuItem - задизейбленный элемент больше не является ссылкой
- Textarea - добавлен placeholder в IE

### 0.7.0 -> 0.7.2
#### 30.03.2017
- Combobox - поправлены баги
- Input - поправлен placeholder в IE
- Modal - поправлен баг, при коротом широкая модалка проваливалась вниз

### 0.6.19-0 -> 0.7.0
#### 22.03.2017
- **Combobox - [BreakingChange] изменено апи, старая комбобок переехал в ComboBoxOld**
- Tooltip - в IE8 добавлен border
- Gapped - добавлен пропс verticalAlign
- Autocomplete - добавлен метод focus

### 0.6.17 -> 0.6.19-0
#### 7.03.2017
- RenderLayer - компонент слушающий клики на элементе и всех вложенных порталах
- ComboBox, DatePicker, Select, Dropdown, Tooltip - теперь используют RenderLayer

### 0.6.15 -> 0.6.17
- Combobox - добавлено свойство `debounceInterval`
- Hint - добавлено свойство `maxWidth`
- Hint - теперь может быть контроллируемым при помощи свойств `manual` и `opened`

### 0.6.14 -> 0.6.15
- Button - добавлен пропс линк
- Modal - поправлена иконка закрытия в IE8
- Radio - поправлен цвет задизейбленной кнопки

### 0.6.13 -> 0.6.14
- Button, Link - изменен механизм отображения фокуса
- Документация претерпела небольшой редизайн
- Radio - поправлено отображение в IE8
- Checkbox - убран отступ слева
- Поправлены некоторые баги

### 0.6.12 -> 0.6.13
- DatePicker - добавлен пропс onUnexpectedInput и оптимизированы вызовы onFocus, onBlur и onChange
- RadioGroup - поправлена работа пропса renderItem
- Dropdown, Select - добавлены пропсы maxMenuHeight, disablePortal
- ScrollContainer - установлена минимальная высота ползунка скролбара
- Tooltip - учитывает клики по элементам портала

### 0.6.11 -> 0.6.12
Поправлена ошибка при деплое

### 0.6.10 -> 0.6.11
Обновлены для соответстивая гайдам:
- Radio [153400aa48f552a17a9bea4e86f13b2a947af5a1]
- RadioGroup [153400aa48f552a17a9bea4e86f13b2a947af5a1]
- DatePicker [0bbe9757e385994705e21f0b6ca291a8b740b6f9]

Button - добавлен параметр `arrow` включающий отображение стрелки [77d35434c09254c05ec0eeff9063b27fa18f6f10]

Поправлен вызов метода `blur` у `document.body` при клике на кнопку или ссылку [a5caa6eed8a45dd04dcf7f7fedee20e6f26f71d2]
