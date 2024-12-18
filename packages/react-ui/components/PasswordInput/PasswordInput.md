### Базовый пример
```jsx harmony
<PasswordInput />
```

### Отслеживание нажатия CapsLock

```jsx harmony
<PasswordInput detectCapsLock />
```

### Локали по умолчанию

```typescript static
interface PasswordInputLocale {
  eyeOpenedAriaLabel?: string;
  eyeClosedAriaLabel?: string;
}

const ru_RU = {
  eyeOpenedAriaLabel: 'Скрыть символы пароля',
  eyeClosedAriaLabel: 'Отобразить символы пароля',
}

const en_GB = {
  eyeOpenedAriaLabel: 'Hide password symbols',
  eyeClosedAriaLabel: 'Show password symbols',
}
```
