```jsx harmony
<PasswordInput />
```

Пример с отслеживанием нажатия CapsLock:

```jsx harmony
<PasswordInput detectCapsLock />
```

#### Локали по умолчанию

```typescript static
interface PasswordInputLocale {
  'eye-opened-aria-label'?: string;
  'eye-closed-aria-label'?: string;
}

const ru_RU = {
  'eye-opened-aria-label': 'Скрыть символы пароля',
  'eye-closed-aria-label': 'Отобразить символы пароля',
}

const en_GB = {
  'eye-opened-aria-label': 'Hide password symbols',
  'eye-closed-aria-label': 'Show password symbols',
}
```
