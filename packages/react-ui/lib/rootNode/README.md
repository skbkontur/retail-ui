### Суть проблемы
Для поддержки библиотекой `StrictMode` нужно было
избавиться от использования `ReactDOM.findDOMNode` для получения DOM-ноды компонентов.


Статьи про [findDOMNode](https://ru.reactjs.org/docs/react-dom.html#finddomnode) и
[проблемы](https://ru.reactjs.org/docs/strict-mode.html#warning-about-deprecated-finddomnode-usage),
связанные с ним.

### Решение

Для каждого компонента библиотеки отпределить дополнительные публичные методы:
- `setRootNode = (instance: Nullable<React.ReactInstance>) => void` - метод для установки
DOM-ноды компонента
- `getRootNode = () => Nullable<HTMLElement>` - метод для получения DOM-ноды компонента

Для уменьшения дублирования кода добавлен классовый декоратор
[@rootNode](https://github.com/skbkontur/retail-ui/tree/master/packages/react-ui/lib/rootNode/rootNodeDecorator.tsx),
который определяет методы `setRootNode` и `getRootNode`. Дополнительно, определена функция
[getRootNode = (instance: Nullable<React.ReactInstance>): Nullable<HTMLElement>](https://github.com/skbkontur/retail-ui/tree/master/packages/react-ui/lib/rootNode/getRootNode.ts),
заменяющая по сути `ReactDOM.findDOMNode`.

