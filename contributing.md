# Разработка Retail UI

Библиотека компонентов **Retail UI** — это открытый проект и результат совместных усилий [большого количества людей](https://github.com/skbkontur/retail-ui/graphs/contributors). Мы очень ценим вклад каждого и приглашаем всех желающих принять участие в его развитии. Этот гайд призван помочь новым участникам познакомиться с проектом и ответить на основные вопросы касательно его разработки.

## Содержание

- [Общие сведения](#общие-сведения)
- [Краткая инструкция](#краткая-инструкция)
- [Issues](#issues)
- [Начало работы](#начало-работы)
  - [Настройка](#настройка)
  - [Репозиторий](#репозиторий)
    - [Клонирование](#клонирование)
    - [Ветки](#ветки)
    - [Коммиты](#коммиты)
  - [Кодовая база](#кодовая-база)
    - [Структура файлов](#структура-файлов)
    - [Code Style](#code-style)
- [Тесты](#тесты)
  - [Unit-тесты](#unit-тесты)
  - [Storybook](#storybook)
  - [Скриншотные тесты](#скриншотные-тесты)
- [Документация](#документация)
- [Pull Request](#pull-request)
- [Помощь](#помощь)

## Общие сведения

### Полезные ссылки:

- Документация:
  - [Контролы](https://tech.skbkontur.ru/react-ui/)
  - [Валидации](https://tech.skbkontur.ru/react-ui-validations/)
- NPM-пакеты:
  - [retail-ui](https://npmjs.com/package/retail-ui) (больше не поддерживается, используйте `@skbkontur/react-ui`)
  - [@skbkontur/react-ui](https://www.npmjs.com/package/@skbkontur/react-ui)
  - [react-ui-validations](https://www.npmjs.com/package/react-ui-validations)
  - [@skbkontur/react-ui-validations](https://www.npmjs.com/package/@skbkontur/react-ui-validations)
  - [@skbkontur/react-icons](https://www.npmjs.com/package/@skbkontur/react-icons)
  - [react-ui-codemod](https://www.npmjs.com/package/react-ui-codemod)
- [Контур.Гайды](https://guides.kontur.ru/)

### Технологии

- JS: React, TypeScript;
- CSS: CSS-in-JS;
- Сборка: Babel;
- CI: TeamCity;

### Дизайн

Библиотека во многом опирается на стандарты и принципы дизайна, описанные в [Контур.Гайдах](https://guides.kontur.ru/). Как правило, все изменения, связанные с поведением или внешним видом компонентов, сперва согласуются с гайдами, и только потом реализуются в библиотеке. Контакты для решения подобных вопросов можно найти в разделе [помощь](#помощь).

### Планы

Наши планы по развитию описаны в [Roadmap](packages/react-ui/ROADMAP.md).

## Краткая инструкция

После [настройки](#настройка) и [клонирования](#клонирование) проекта работа над задачей в общем случае выглядит так:

1. Выбрать/Создать [Issue](#issues)
2. Выполнить задачу в отдельной ветке
3. Добавить [тесты](#тесты) и [документацию](#документация)
4. Прогнать [unit-тесты](#unit-тесты) и [линтеры](#code-style)
5. Оформить [pull request](#pull-request)

Команды, доступные в проектах:

- `yarn workspace @skbkontur/react-ui <command>` - контролы
  - `test` — unit-тесты `Jest` + `Enzyme`
  - `creevey:ui` — скриншотные тесты `Creevey`
  - `lint` — `tsc --noEmit` + `eslint` + `stylelint` + `prettier`
  - `build` — сборка библиотеки
  - `storybook` — Storybook
  - `storybook:test` — Storybook со стилями для тестов
  - `styleguide` — Styleguidist server
  - `fix` — форматирование кода по правилам eslint и prettier
- `yarn workspace react-ui-testing <command>` - интеграционные тесты
  - `start` — старт приложения для интеграционных тестов (используется собранная версия библиотеки)
  - `test` — интеграционные тесты с использованием `SeleniumTesting` (работает только во внутренней сети Контура)
- `yarn workspace react-ui-validations <command>` - валидации
  - `start:docs` — документация
  - `test` — unit-тесты
  - `lint` — линтеры + `prettier`
  - `storybook` — Storybook
  - `fix` — форматирование кода по правилам eslint и prettier

## Issues

[GitHub Issues](https://github.com/skbkontur/retail-ui/issues) используются для планирования задач и ведения багов. Они распределяются по [проектам](https://github.com/skbkontur/retail-ui/projects), которые позволяют следить за прогрессом их выполнения. Начав работу над issue, назначьте себя исполнителем и перетащите его в колонку "In progress" проекта. В "Done" они попадают автоматически после закрытия.

Выбирая себе issue для работы, следует обращать внимание на лейблы, которыми они помечены. Новичкам подойдут `good first issue` и `minor`. Как правило, такие задачи не предполагают большого количества работы и лучше подойдут для старта. `wait design` и `help wanted` ожидают какого-то вердикта и пока не готовы к выполнению.

Если вы планируете работу над задачей, у которой пока нет своего issue, то настоятельно рекомендуется его завести. Это очень помогает сохранять историю принятия решений, а также собирать статистику по проекту.

## Начало работы

### Настройка

Для начала необходимо иметь установленными следующие инструменты:

- [Node.js](https://nodejs.org/)
- [Yarn](https://yarnpkg.com)
- [Git](https://git-scm.com/)
- [Git LFS](https://git-lfs.github.com)

### Репозиторий

Вся разработка ведется на [GitHub](https://github.com/skbkontur/retail-ui). Монорепозиторий на базе [lerna](https://github.com/lerna/lerna) помимо самой [библиотеки контролов](https://github.com/skbkontur/retail-ui/tree/master/packages/react-ui) содержит также [библиотеку валидаций](https://github.com/skbkontur/retail-ui/tree/master/packages/react-ui-validations) и инструменты тестирования.

Права на запись в репозиторий имеет ограниченный круг разработчиков. Информацию о том, как стать одним из них, вы найдете разделе [помощь](#помощь). А пока можно сделать [Fork](https://guides.github.com/activities/forking/) и работать через него.

#### Клонирование

Перейдите в выбранную директорию для [клонирования](https://help.github.com/en/articles/cloning-a-repository) и выполните команду:

```
git clone https://github.com/skbkontur/retail-ui.git
```

Или, в случае форка:

```
git clone https://github.com/%YOUR_USER_NAME%/retail-ui.git
```

Работая с форком, полезно добавить upstream в качестве удаленного репозитория:

```
 git remote add upstream https://github.com/skbkontur/retail-ui.git
```

Теперь легко можно [синхронизировать](https://help.github.com/en/articles/syncing-a-fork) свой форк с основным репозиторием:

```
 git fetch upstream
 git checkout master
 git merge upstream/master
```

#### Ветки

Начиная работу над задачей, создайте для нее отдельную ветку от мастера.

#### Коммиты

Особое внимание стоит уделить коммитам. В проекте используется [commitlint](https://github.com/conventional-changelog/commitlint) с конфигурацией [config-conventional](https://github.com/conventional-changelog/commitlint/tree/master/@commitlint/config-conventional). Это означает, что сообщения ваших коммитов должны соответствовать следующему формату:

```
тип(scope?): короткое описание
```

Например:

```
feat(ComboBox): new prop 'searchOnFocus'
fix(Button): fix icon padding
chore: update dependencies
```

**тип** должен быть одним из следующих ключевых слов:

- `feat`: новая функциональность
- `fix`: исправление бага
- `test`: добавление и корректировка тестов
- `refactor`: рефакторинг
- `docs`: изменение документации
- `build`: изменения в системе сборки или внешних зависимостях
- `perf`: улучшение производительности кода
- `style`: изменение стиля кода (именование, форматирование и прочее)
- `ci`: изменения конфигурационных файлов и скриптов CI
- `chore`: прочие изменения

**scope** - опциональный параметр, указывающий на область изменений. Это может быть имя компонента или пакета.

**короткое описание** - минимальное сообщение на русском или английском языке, отражающее суть внесенных изменений.

Все три поля в сумме составляют заголовок коммита, который не должен превышать **72 символа**. Более подробное описание можно оставить в теле коммита, отступив одну пустую строку от заголовка. Например:

```
fix(RenderLayer): add touchstart handling

iOS mouse events don't bubble up, use touchstart event instead

Closes #1439
```

В футере, через пустую строку от тела коммита, можно оставить [ссылки](https://help.github.com/articles/closing-issues-via-commit-messages/) на связанные issue.

Также, для составления правильного сообщения коммита можно воспользоваться интерактивной командой `yarn commit`.

**Важно!** Все коммиты типа `feat` и `fix` попадают в [changelog](https://github.com/skbkontur/retail-ui/blob/master/packages/react-ui/CHANGELOG.md). Поэтому, желательно, чтобы их краткое описание являлось информативным для широкого круга пользователей. По этой же причине, не стоит создавать более одного коммита этих типов на одну решенную задачу, иначе все они попадут в changelog. Для дополнительных коммитов, которые неизбежно возникают в процессе, можно использовать тип `refactor`, `chore` или любой другой из вышеописанных, который подойдет лучше.

### Кодовая база

#### Структура файлов

```
packages/
├── ...
├── react-ui-validations/
└── react-ui/
    ├── .creevey/
    ├── .storybook/
    ├── .styleguide/
    ├── ...
    └── components/
        ├── ...
        └── Button/
            ├── __stories__/
            ├── __tests__/
            ├── Button.tsx
            ├── Button.styles.ts
            ├── ...
            └── README.md
```

| Директория / Файл                             | Описание                                 |
| --------------------------------------------- | ---------------------------------------- |
| `react-ui-validations/`                       | Библиотека валидаций                     |
| `react-ui/`                                   | Библиотека контролов                     |
| `react-ui/.creevey/`                          | [Скриншотные тесты](#скриншотные-тесты)  |
| `react-ui/.storybook/`                        | Конфиг Storybook                         |
| `react-ui/.styleguide/`                       | Конфиг React Styleguidist                |
| `react-ui/components/`                        | Компоненты контролов                     |
| `react-ui/components/Button`                  | Компонент кнопки                         |
| `react-ui/components/Button/__stories__/`     | [Stories](#создание-story) для Storybook |
| `react-ui/components/Button/__tests__/`       | [Unit-тесты](#unit-тесты)                |
| `react-ui/components/Button/Button.tsx`       | Код компонента                           |
| `react-ui/components/Button/Button.styles.ts` | Кастомизируемые стили                    |
| `react-ui/components/Button/README.md`        | [Документация](#документация)            |

#### Code style

Для контроля над стилем и форматированием кода в проекте используются [editorconfig](https://editorconfig.org/), [ESLint](https://eslint.org/), [Stylelint](https://stylelint.io/) и [Prettier](https://prettier.io/). По возможности, рекомендуем установить соответствующие плагины в свою IDE, чтобы получать от нее предупреждения в режиме реального времени. Но запускать линтеры можно и вручную, с помощью команды `yarn workspace @skbkontur/react-ui lint`. Советуем делать это перед каждым коммитом или пользоваться командой `yarn commit`. PR, не прошедший проверку линтеров, не может быть принят.

## Тесты

По возможности, любая новая функциональность или фикс должны сопровождаться тестами.

### Unit-тесты

Unit-тесты хорошо подходят для тестирования логики работы компонентов и утилит. Они довольно дешевы, и, при прочих равных, стоит отдавать предпочтение им.

Для unit-тестирования в проекте используются [Jest](https://jestjs.io/) и [React Testing Library](https://testing-library.com/docs/react-testing-library/). Тесты находятся в поддиректориях `__tests__` внутри почти каждого компонента. Для их запуска служит команда `yarn workspace @skbkontur/react-ui test`. Её тоже желательно выполнять перед отправкой своих изменений, чтобы убедиться в том, что они не сломали существующие сценарии.

В проекте также может присутствовать некоторое количество тестов на [Enzyme](https://airbnb.io/enzyme/). В будущем они будут переписаны с использованием React Testing Library. Для новых тестов стоит сразу использовать RTL.

### Storybook

[Storybook](https://storybook.js.org/) позволяет описывать и просматривать все имеющиеся компоненты в различных состояниях, а также взаимодействовать с ними. Он используется для ручного и скриншотного тестирования.

Запускается командой `yarn workspace @skbkontur/react-ui storybook`.

#### Создание story

Все story находятся в файлах `__stories__/[ComponentName].stories.tsx`, в директориях своих компонентов. Просто добавьте новое состояние и оно появится в storybook:

```javascript
export const ButtonWithError = () => <Button error>Error</Button>;
```

### Скриншотные тесты

Скриншотные тесты пишут для проверки верстки и отдельной функциональности в различных браузерах (Chrome, Firefox, IE11). В проекте они построены на основе [Creevey](https://github.com/wKich/creevey) и [Storybook](https://storybook.js.org/).

Скриншоты являются сравнительно дорогим видом тестирования. Используйте их, если [unit-тестов](#unit-тесты) недостаточно.

Конфиг для Creevey ожидает переменные окружения `GRID_URL` и `GET_IP_URL`. Поэтому, для локального запуска добавьте
их в файл `.env` в корне репозитория.
Ребята из Контура могут использовать значения для переменных [отсюда](https://wiki.skbkontur.ru/display/guides/.env).

#### Запуск

`yarn workspace @skbkontur/react-ui storybook:test` - запуск storybook со стилями для тестов

`yarn workspace @skbkontur/react-ui creevey:ui` - запуск creevey с web-интерфейсом

#### Создание скриншотного теста

1. Создать или выбрать готовую [story](#создание-story)
2. Добавить сценарий в параметры story

```javascript
ButtonWithError.parameters = {
  creevey: {
    tests: {
      async idle() {
        await this.expect(await this.takeScreenshot()).to.matchImage('idle');
      },
    },
  },
};
```

3. Через [gui](#запуск) запустить добавленный тест
4. Принять новые скриншоты в интерфейсе или с помощью команды `yarn workspace @skbkontur/react-ui creevey --update`

Существующие тесты обновляются тем же образом (шаги 3 и 4).

# Документация

## Styleguidist

Для документирования компонентов используется [React Styleguidist](https://github.com/styleguidist/react-styleguidist). Он позволяет документировать пропы и методы, а также демонстрировать примеры использования. Более подробную информацию можно найти в [официальной документации](https://react-styleguidist.js.org/docs/documenting.html).

Собранная документация всегда доступна на [витрине](https://tech.skbkontur.ru/react-ui/). А локально она запускается так:

```
yarn workspace @skbkontur/react-ui styleguide
```

Для того, чтобы новый компонент появился в документации, его нужно поместить в отдельную одноименную директорию внутри `packages/react-ui/components` и сопроводить файлом `README.md`:

```
components/
└── MyComponent/
    ├── MyComponent.tsx
    └── README.md
```

## JSDoc

Для документирования отдельных утилит и хелперов в проекте используется [jsdoc](https://jsdoc.app/).

Простейший пример выглядит так:

```js
/** This is a description of the foo function. */
function foo() {}
```

## Комментарии в коде

В неочевидных и сложных для понимания местах кода следует оставлять поясняющие комментарии.

# Pull Request

После отправки изменений на сервер появится возможность [создать](https://help.github.com/en/articles/creating-a-pull-request-from-a-fork) pull request (PR) в основной репозиторий. Опишите сделанные вами изменения по [специальному шаблону](https://github.com/skbkontur/retail-ui/blob/master/pull_request_template.md), чтобы проверяющим было проще в нем ориентироваться. После успешного прохождения тестов и одобрения ревьюерами изменения будут влиты в мастер и попадут в библиотеку с ближайшим релизом.

## Работа над PR

В проекте приняты следующие соглашения и правила работы над PR:

1. Перед запросом ревью PR должен быть оформлен по [шаблону](https://github.com/skbkontur/retail-ui/blob/master/pull_request_template.md)
2. После начала ревью и внесения последующих правок, ревью следует перезапрашивать
3. Резолв тредов во время ревью осуществляется их автором
4. Все договоренности и результаты ревью, даже если они происходили вне github, следует зафиксировать в PR
5. После запроса ревью делать force-push уже нежелательно



# Помощь

По любым возникающим вопросам можно обращаться в канал поддержки [#infra_front](https://kontur.slack.com/archives/C013HTCE18Q) в Слаке, если вы из Контура. Если нет — в [telegram-чат](https://t.me/react_ui) или напрямую пользователям:

- [Владимир Дзех](https://github.com/dzekh) — дизайн, гайдлайны. Телеграм: [@dzekh](https://t.me/dzekh);
- [Егор Погадаев](https://github.com/zhzz) — общие вопросы, права, ключи доступа;
- [Максим Пахомов](https://github.com/lossir) — общие вопросы.
