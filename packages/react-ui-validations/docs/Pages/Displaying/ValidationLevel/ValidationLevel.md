# Уровни валидаций

Уровень валидации задаётся с помощью свойства `level` в объекте `validationInfo`

    <ValidationWrapper validationInfo={{level: "...", message: "..."}}>
      //...
    </ValidationWrapper>

Допустимые значения: `"error" | "warning"`.

Значение по умолчанию: `"error"`.

## Ошибка

    <ValidationWrapper
      validationInfo={{
        message: 'Ошибка',
        level: 'error',
      }}
      >
      //...
    </ValidationWrapper>

### Пример

    !!DemoWithCode!!./ValidationError

## Предупреждение

    <ValidationWrapper
      validationInfo={{
        message: 'Предупреждение',
        level: 'warning',
      }}
      >
      //...
    </ValidationWrapper>

### Пример

    !!DemoWithCode!!./ValidationWarning
