# Включение и отключение отдельных фич через `ValidationsFeatureFlagsContext`

## Доступные флаги

    export interface ValidationsFeatureFlags {
      validationsDivWrapper?: boolean;
    }

Механизм работы: новая функциональность применяется или не применяется в зависимости от того, был ли передан со значением true соответствующий флаг или нет.

Флаги задаются с помощью `ValidationsFeatureFlagsContext.Provider`.

    import { ValidationsFeatureFlagsContext } from '@skbkontur/react-ui-validations'

    <ValidationsFeatureFlagsContext.Provider value={{ validationsDivWrapper: true }}>{/* ... */}</ValidationsFeatureFlagsContext.Provider>;

## Использование

### validationsDivWrapper

В ValidationContainer, ValidationWrapper и ValidationText span в корне заменён на div.
Это позволяет
В Validations 2.0 фича будет применена по умолчанию.

    !!DemoWithCode!!FeatureFlagsExampleValidationsRemoveDivWrapper

## Объект со всеми флагами

Чтобы получить объект со всеми флагами, необходимо применить вспомогательную функцию getFullValidationsFlagsContext к объекту заданных флагов:

    const allFlags = getFullValidationsFlagsContext(useContext(ValidationsFeatureFlagsContext));
