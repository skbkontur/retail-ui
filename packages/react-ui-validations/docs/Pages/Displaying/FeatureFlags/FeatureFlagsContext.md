# Включение и отключение отдельных фич через `ValidationsFeatureFlagsContext`

## Доступные флаги

    export interface ValidationsFeatureFlags {
    }

Механизм работы: новая функциональность применяется или не применяется в зависимости от того, был ли передан со значением true соответствующий флаг или нет.

Флаги задаются с помощью `ValidationsFeatureFlagsContext.Provider`.

    import { ValidationsFeatureFlagsContext } from '@skbkontur/react-ui-validations'

    <ValidationsFeatureFlagsContext.Provider value={{ featureFlagName: true }}>{/* ... */}</ValidationsFeatureFlagsContext.Provider>;

## Использование

При появлении фиче-флагов их применение будет показано здесь.

## Объект со всеми флагами

Чтобы получить объект со всеми флагами, необходимо применить вспомогательную функцию getFullValidationsFlagsContext к объекту заданных флагов:

    const allFlags = getFullValidationsFlagsContext(useContext(ValidationsFeatureFlagsContext));
