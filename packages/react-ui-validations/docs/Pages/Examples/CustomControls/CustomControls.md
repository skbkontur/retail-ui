# Кастомные Контролы

Валидации можно использовать с собственными контролами. Или с обёртками над контролами из библиотеки [react-ui](https://tech.skbkontur.ru/react-ui/#/Readme).

Для этого в таком контроле/обёртке необходимо обеспечить следующие пропы:

1. `ref` - DOM элемент нужен для правильной авто-прокрутки страницы до элемента с ошибкой ([подробнее](#/scroll-to-validation)).
1. `error` - сеттит true, для соответствующего уровня валидации.
1. `warning` - сеттит true, для соответствующего уровня валидации.
1. `onBlur` - обеспечивает работу зависимых валидаций ([подробнее](#/dependent-validation)).
1. `onChange` - отслеживается начало процесса ввода данных.

В типах их можно представить так:

    interface CustomControlProps<Elem = HTMLElement> {
        ref?: React.ForwardedRef<Elem>;
        error?: boolean;
        warning?: boolean;
        onBlur?: React.FocusEventHandler<Elem>;
        onChange?: React.ChangeEventHandler<Elem>;
    }

Для контролов `react-ui` также прокидывается проп `onValueChange`. Чтобы избежать предупреждения в консоле (`Unknown event handler property 'onValueChange'`), этот проп можно "вырезать" из пропов (см. пример). 

### Пример
    
    !!DemoWithCode!!./CustomControls
