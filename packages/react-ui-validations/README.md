# React UI Validations

[![npm](https://img.shields.io/npm/v/@skbkontur/react-ui-validations.svg?maxAge=300&style=flat-square)](https://www.npmjs.com/package/@skbkontur/react-ui-validations)

Пакет для проверки форм и отображения ошибок в React-приложениях Контура. Реализует поведение валидаций по [Контур.Гайду](https://guides.kontur.ru/principles/data/validation/): когда подсветить поле, когда показать сообщение и куда поставить фокус.

- [Документация и примеры](https://tech.skbkontur.ru/kontur-ui/)
- [Гайд по валидации](https://guides.kontur.ru/principles/data/validation/)
- [Changelog](https://github.com/skbkontur/retail-ui/blob/master/packages/react-ui-validations/CHANGELOG.md)

## Установка

```bash
npm i @skbkontur/react-ui-validations
# или
yarn add @skbkontur/react-ui-validations
```

Пакет работает вместе с [@skbkontur/react-ui](https://www.npmjs.com/package/@skbkontur/react-ui) версий 5–6 и React 16.9–19.

## Быстрый старт

`ValidationContainer` оборачивает форму, `ValidationWrapper` — каждое поле. В `validationInfo` передаётся результат проверки текущего значения: `null`, если ошибок нет, или объект с сообщением. Когда показать и когда спрятать ошибку, `ValidationWrapper` решает сам.

```tsx
import { useRef, useState } from 'react';
import { Button, Input } from '@skbkontur/react-ui';
import { ValidationContainer, ValidationWrapper } from '@skbkontur/react-ui-validations';
import type { ValidationInfo } from '@skbkontur/react-ui-validations';

function validateEmail(value: string): ValidationInfo | null {
  if (!value) {
    return { message: 'Укажите почту', type: 'submit' };
  }
  if (!value.includes('@')) {
    return { message: 'Неверный формат почты' };
  }
  return null;
}

export function SubscribeForm() {
  const container = useRef<ValidationContainer>(null);
  const [email, setEmail] = useState('');

  async function handleSubmit() {
    if (await container.current?.validate()) {
      // отправить форму
    }
  }

  return (
    <ValidationContainer ref={container}>
      <ValidationWrapper validationInfo={validateEmail(email)}>
        <Input placeholder="Почта" value={email} onValueChange={setEmail} />
      </ValidationWrapper>
      <Button use="accent" onClick={handleSubmit}>
        Подписаться
      </Button>
    </ValidationContainer>
  );
}
```

Пустое поле подсветится после нажатия «Подписаться», неверный формат — когда пользователь уберёт фокус с поля. При отправке страница прокрутится к первой ошибке, а фокус встанет в поле.

Для форм из многих полей правила удобнее описать через `createValidator`: он работает с объектами, массивами и зависимыми полями.

## Как устроена валидация

- Компонент `ValidationContainer` оборачивает всю форму. Проверяет её при отправке, прокручивает к первой ошибке и ставит на неё фокус.
- Компонент `ValidationWrapper` оборачивает один контрол и подсвечивает его.
- Проп `validationInfo` — результат проверки поля: `null`, если всё в порядке, или объект с сообщением, типом и уровнем.
- Проп `renderMessage` задаёт, как показать сообщение: в тултипе — `tooltip()`, текстом — `text()` или своей вёрсткой.
- Функция `createValidator` описывает правила для всей формы сразу, включая вложенные объекты, массивы и зависимые поля.
- Контекст `ValidationsFeatureFlagsContext` включает заранее изменения из следующей мажорной версии.

Все пропсы и живые примеры — в [документации](https://tech.skbkontur.ru/kontur-ui/).

## Свои компоненты

Валидации работают со всеми контролами React UI. Чтобы подключить свой компонент, он должен принимать `ref` и пропсы `error`, `warning`, `onBlur` и `onChange`. Подробнее — в разделе Custom controls документации.

## StrictMode

Библиотека поддерживает работу в `React.StrictMode` начиная с версии `1.7.0`. [Подробнее](https://github.com/skbkontur/retail-ui/blob/master/packages/react-ui/README.md#strictmode).
