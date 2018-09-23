# react-ui-testing #

Набор инструментов для тестирования фронтэнд приложений написаных на React-е, в том числе с использованием библиотеки
[react-ui](https://github.com/skbkontur/retail-ui).

## Как это работает ## 

Библиотека состоит из двух частей:

* [Скрипт](#/expose-tids-to-dom), поключаемый на страницу, который транслирует props и другую полезную информацию о React-компонентах в DOM.
* [Набор PageObject'ов](#/page-objects-dot-net) для доступа к [компонентам react-ui](https://github.com/skbkontur/retail-ui) через [Selenium для .NET](http://www.seleniumhq.org/docs/03_webdriver.jsp#c).

## А что дальше?

* Прочитайте [инструкцию по быстрому старту](#/quick-start), чтобы проверить что всё работает
* Узнайте как [подключить скрипт](#/expose-tids-to-dom) к своему приложению
* Используйте [API reference по PageObject'ам для .NET](#/page-objects-dot-net)
* Используйте [Bookmarket](#/bookmarklet) для просмотра tid-атрибутов страницы.
