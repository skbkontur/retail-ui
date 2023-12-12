```jsx harmony
<MaskedInput mask={'+7 999 999-99-99'} placeholder={"Номер телефона"} />;
```

Можно изменить символ значения с маской
```jsx harmony
<MaskedInput mask={'9999 9999 9999 9999'} maskChar={'X'}  />;
```

**alwaysShowMask** позволяет показывать маску всегда. Placeholder в этом случае игнорируется.
```jsx harmony
<MaskedInput mask={'9999 9999 9999 9999'} maskChar={'X'} placeholder={"Номер карты"} />;
```

Получить значение без форматирования можно с помощью **unmask**
```jsx harmony
const [value, setValue] = useState('9999');


<div>
  <div>value: {value}</div>
  <MaskedInput mask={'+7 (999) 999-99-99'} unmask value={value} onValueChange={setValue} />
</div>;
```

Для форматирования по маске используется пакет [iMask](https://imask.js.org/). Используйте особенности пакета принимая всю ответственность на себя.

`MaskedInput` гарантирует поддержку работы 3 пропов:  **mask**, **maskChar**, **alwaysShowMask** с заданными по-умолчанию **formatChars**.

Остальное поведение может меняться в мажорных релизах.

Например, iMask позволяет добавлять в значение без форматирования константы с помощью фиурных скобок.

Использовать этот вариант **НЕ РЕКОМЕНДУЕТСЯ**.
```jsx harmony
const [value, setValue] = useState('9999');

<div>
  <div>value: {value}</div>
  <MaskedInput mask={'{+7} (999) 999-99-99'} unmask value={value} onValueChange={setValue} />
</div>;
```
