# Включение и отключение отдельных фич через `ValidationsFeatureFlagsContext`

## Доступные флаги

    export interface ValidationsFeatureFlags {
      validationsRemoveExtraSpans?: boolean;
    }

Механизм работы: новая функциональность применяется или не применяется в зависимости от того, был ли передан со значением true соответствующий флаг или нет.

Флаги задаются с помощью `ValidationsFeatureFlagsContext.Provider`.

    import { ValidationsFeatureFlagsContext } from '@skbkontur/react-ui

    <ValidationsFeatureFlagsContext.Provider value={{ validationsRemoveExtraSpans: true }}>{/* ... */}</ValidationsFeatureFlagsContext.Provider>;

## Использование

### validationsRemoveExtraSpans

В ValidationContainer, ValidationWrapper и ValidationText из корня удалён лишний span.
В Validations 2.0 фича будет применена по умолчанию.

    !!DemoWithCode!!FeatureFlagsExamplevalidationsRemoveExtraSpans

## Объект со всеми флагами

Чтобы получить объект со всеми флагами, необходимо применить вспомогательную функцию getFullValidationsFlagsContext к объекту заданных флагов:

    const allFlags = getFullValidationsFlagsContext(useContext(ValidationsFeatureFlagsContext));
