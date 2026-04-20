# Kontur UI ![NPM Version](https://img.shields.io/npm/v/%40skbkontur%2Freact-ui)

Набор готовых React-компонентов, шаблонов и принципов, которые помогают разработчикам быстро и предсказуемо собирать пользовательские интерфейсы.

- [Документация](https://tech.skbkontur.ru/kontur-ui)
- [Быстрый старт](https://tech.skbkontur.ru/kontur-ui/?path=/docs/getting-started--docs)
- [Темизатор](https://tech.skbkontur.ru/kontur-ui/?path=/docs/react-ui_information-themeplayground--docs)
- [Контур.Гайды](https://guides.kontur.ru/)

## Установка

```
npm i @skbkontur/react-ui
```

Для изучения компонентов дизайн-системы без установки, вы можете воспользоваться одной из [готовых песочниц](https://tech.skbkontur.ru/kontur-ui/?path=/docs/getting-started--docs) с настроенными Vite/Webpack/Next.js.

## Использование

В библиотеке собраны полностью готовые компоненты, разработчики могут использовать их как есть с гибкой настройкой вида или поведения. Про кастомизацию, адаптивность, a11y, локали Ru/En, валидации компонентов и другие возможности более подробно [в документации](https://tech.skbkontur.ru/kontur-ui/?path=/docs/getting-started--docs#%D0%B8%D1%81%D0%BF%D0%BE%D0%BB%D1%8C%D0%B7%D0%BE%D0%B2%D0%B0%D0%BD%D0%B8%D0%B5-%D0%BA%D0%BE%D0%BC%D0%BF%D0%BE%D0%BD%D0%B5%D0%BD%D1%82%D0%B0).

```jsx
import { Button } from '@skbkontur/react-ui/components/Button';

export function Page() {
  return (
    <Button size="medium" onClick={() => console.log('Создать отчёт')}>
      Создать отчёт
    </Button>
  );
}
```

## Другие npm-пакеты Kontur UI

Это основной пакет со всеми компонентами. Его можно использовать не только внутри экосистемы Контура, но и в любых проектах с указанием авторства. Другие пакеты, содержащие элементы фирменного стиля, доступны только для проектов Контура или партнеров.

| Пакет                                                                                                                              | Описание                                                           | NPM                                                                                                                                               |
| :--------------------------------------------------------------------------------------------------------------------------------- | :----------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------ |
| [`@skbkontur/react-ui`](https://tech.skbkontur.ru/kontur-ui/?path=/docs/react-ui_reactui--docs)                                    | Базовый набор контролов для дизайна продуктов Контура              | [![NPM Version](https://img.shields.io/npm/v/%40skbkontur%2Freact-ui)](https://www.npmjs.com/package/@skbkontur/react-ui)                         |
| [`@skbkontur/react-ui-validations`](https://tech.skbkontur.ru/kontur-ui/?path=/docs/react-ui-validations_reactuivalidations--docs) | Библиотека для реализации поведения валидаций и отображения ошибок | [![NPM Version](https://img.shields.io/npm/v/%40skbkontur%2Freact-ui-validations)](https://www.npmjs.com/package/@skbkontur/react-ui-validations) |
| [`@skbkontur/react-ui-addons`](https://tech.skbkontur.ru/kontur-ui/?path=/docs/react-ui-addons_reactuiaddons--docs)                | Дополнения: Logotype, TopBar, UserAvatar                           | [![NPM Version](https://img.shields.io/npm/v/%40skbkontur%2Freact-ui-addons)](https://www.npmjs.com/package/@skbkontur/react-ui-addons)           |
| [`@skbkontur/side-menu`](https://tech.skbkontur.ru/kontur-ui/?path=/docs/side-menu_sidemenu--docs)                                 | Боковое меню сервисов Контура                                      | [![NPM Version](https://img.shields.io/npm/v/%40skbkontur%2Fside-menu)](https://www.npmjs.com/package/@skbkontur/side-menu)                       |
| [`@skbkontur/logos`](https://tech.skbkontur.ru/kontur-ui/?path=/docs/logos_logos--docs)                                            | Логотипы продуктов Контура                                         | [![NPM Version](https://img.shields.io/npm/v/%40skbkontur%2Flogos)](https://www.npmjs.com/package/@skbkontur/logos)                               |
| [`@skbkontur/icons`](https://tech.skbkontur.ru/kontur-ui/?path=/docs/icons_icons--docs)                                            | Набор интерфейсных иконок                                          | [![NPM Version](https://img.shields.io/npm/v/%40skbkontur%2Ficons)](https://www.npmjs.com/package/@skbkontur/icons)                               |
| [`@skbkontur/ui-cdn-components`](https://tech.skbkontur.ru/kontur-ui/?path=/docs/ui-cdn-components_uicdncomponents--docs)          | Компоненты для работы с ресурсами сервера статики                  | [![NPM Version](https://img.shields.io/npm/v/%40skbkontur%2Fui-cdn-components)](https://www.npmjs.com/package/@skbkontur/ui-cdn-components)       |
| [`@skbkontur/typography`](https://tech.skbkontur.ru/kontur-ui/?path=/docs/typography_typography--docs)                             | Стили текста для шрифта Lab Grotesque K                            | [![NPM Version](https://img.shields.io/npm/v/%40skbkontur%2Ftypography)](https://www.npmjs.com/package/@skbkontur/typography)                     |
| [`@skbkontur/colors`](https://tech.skbkontur.ru/kontur-ui/?path=/docs/colors_colors--docs)                                         | Библиотека цветов Контура                                          | [![NPM Version](https://img.shields.io/npm/v/%40skbkontur%2Fcolors)](https://www.npmjs.com/package/@skbkontur/colors)                             |
| [`@skbkontur/react-error-pages`](https://tech.skbkontur.ru/kontur-ui/?path=/docs/react-error-pages_reacterrorpages--docs)          | HTML-шаблоны и компоненты страниц ошибок                           | [![NPM Version](https://img.shields.io/npm/v/%40skbkontur%2Freact-error-pages)](https://www.npmjs.com/package/@skbkontur/react-error-pages)       |
| [`@skbkontur/empty-state`](https://tech.skbkontur.ru/kontur-ui/?path=/docs/empty-state_emptystate--docs)                           | Заглушки для пустых состояний                                      | [![NPM Version](https://img.shields.io/npm/v/%40skbkontur%2Fempty-state)](https://www.npmjs.com/package/@skbkontur/empty-state)                   |
| [`@skbkontur/mass-actions-panel`](https://tech.skbkontur.ru/kontur-ui/?path=/docs/mass-actions-panel_massactionspanel--docs)       | Плашка массовых действий                                           | [![NPM Version](https://img.shields.io/npm/v/%40skbkontur%2Fmass-actions-panel)](https://www.npmjs.com/package/@skbkontur/mass-actions-panel)     |
| [`@skbkontur/hidden-links`](https://tech.skbkontur.ru/kontur-ui/?path=/docs/hidden-links_hiddenlinks--docs)                        | Скрытые ссылки, доступные через Tab и скринридеры                  | [![NPM Version](https://img.shields.io/npm/v/%40skbkontur%2Fhidden-links)](https://www.npmjs.com/package/@skbkontur/hidden-links)                 |
| [`@skbkontur/mini-skeleton`](https://tech.skbkontur.ru/kontur-ui/?path=/docs/mini-skeleton_miniskeleton--docs)                     | SVG-заглушки для состояния загрузки контента                       | [![NPM Version](https://img.shields.io/npm/v/%40skbkontur%2Fmini-skeleton)](https://www.npmjs.com/package/@skbkontur/mini-skeleton)               |
| [`@skbkontur/table`](https://tech.skbkontur.ru/kontur-ui/?path=/docs/table_table--docs)                                            | Компоненты и хуки для вёрстки сложных таблиц                       | [![NPM Version](https://img.shields.io/npm/v/%40skbkontur%2Ftable)](https://www.npmjs.com/package/@skbkontur/table)                               |

## Поддерживаемые версии

Библиотека совместима с React 16.9–19.x и поддерживает браузеры:

- Chrome ≥ 64
- Firefox ≥ 69
- Safari ≥ 11.1

---

Библиотека Kontur UI — это открытый проект и результат совместных усилий [большого количества людей](https://github.com/skbkontur/retail-ui/graphs/contributors). Мы ценим вклад каждого и приглашаем принять участие в его развитии. Подробнее в разделе [CONTRIBUTING.md](https://github.com/skbkontur/retail-ui/blob/master/contributing.md).
