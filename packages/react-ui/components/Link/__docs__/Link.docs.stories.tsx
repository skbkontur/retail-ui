import React from 'react';
import { CheckAIcon16Light } from '@skbkontur/icons/CheckAIcon16Light';
import { CopyIcon16Regular } from '@skbkontur/icons/CopyIcon16Regular';
import { ToolPencilLineIcon16Light } from '@skbkontur/icons/ToolPencilLineIcon16Light';
import { Link, Gapped, Button, Toast } from '@skbkontur/react-ui';

import type { Meta, Story } from '../../../typings/stories';

export default {
  title: 'Button/Link',
  component: Link,
  parameters: { creevey: { skip: true } },
} as Meta;

export const ExampleBasic: Story = () => {
  return (
    <Link href="https://kontur.ru" target="_blank">
      Обычная ссылка
    </Link>
  );
};
ExampleBasic.storyName = 'Базовый пример';

/** Проп `use` задаёт стиль ссылки.
 *  Стиль влияет на внешний вид cсылки. По умолчанию: `'default'`.
 * Доступны стили:
 * - Default — чёрная ссылка.
 * - Grayed — серая ссылка.
 * - Success — зелёная ссылка на действие с положительной окраской.
 * - Danger — красная ссылка для необратимых или негативных по смыслу действий. */
export const ExampleStyle: Story = () => {
  return (
    <Gapped gap={15}>
      <Link use="default">Перейти</Link>
      <Link use="grayed">Перейти</Link>
      <Link use="success">Принять</Link>
      <Link use="danger">Удалить</Link>
    </Gapped>
  );
};
ExampleStyle.storyName = 'Стили';

/** В ссылку можно передать иконку.
 * Иконка может находиться слева от ссылки — проп `icon`, справа — проп `rightIcon`. */
export const ExampleIcon: Story = () => {
  return (
    <Gapped gap={20}>
      <Link icon={<CheckAIcon16Light />}>Ссылка с иконкой слева</Link>
      <Link rightIcon={<CheckAIcon16Light />}>Ссылка с иконкой справа</Link>
    </Gapped>
  );
};
ExampleIcon.storyName = 'Иконка';

/** По умолчанию ссылка открывается в текущей открытой вкладке. Переопределить это поведение можно с помощью нативного атрибута `target="_blank"` — ссылка будет открываться в новой вкладке.
 *
 * Если ссылка ведёт на внешний URL, компонент автоматически добавит атрибут `rel` с необходимым значением, чтобы защитить от проблем безопасности и утечки реферера. При этом не будет меняться или добавляться атрибут `target`. */
export const ExampleExternal: Story = () => {
  return (
    <Gapped>
      <Link href="https://kontur.ru">
        Откроется <span style={{ color: '#e3071c' }}>в этой</span> вкладке
      </Link>
      <Link target="_blank" href="https://kontur.ru">
        Откроется <span style={{ color: '#3f9726' }}>в новой</span> вкладке
      </Link>
    </Gapped>
  );
};
ExampleExternal.storyName = 'Открытие ссылок на внешние ресурсы';

/** Проп `disabled` переводит ссылку в состояние блокировки. Ссылка меняет цвет на серый и становится недоступна для нажатия. */
export const ExampleDisabled: Story = () => {
  return <Link disabled>Заблокированная ссылка</Link>;
};
ExampleDisabled.storyName = 'Состояние блокировки';

/** Проп `loading` переводит ссылку в состояние загрузки. При загрузке ссылка переходит в состояние блокировки и становится серой.
 * Если у ссылки есть иконка, она заменяется на спиннер. */
export const ExampleSpinner: Story = () => {
  const [isLoading, setIsLoading] = React.useState(false);

  return (
    <Gapped vertical gap={15}>
      <Gapped gap={20}>
        <Link loading={isLoading}>Обычная ссылка</Link>
        <Link loading={isLoading} icon={<CheckAIcon16Light />}>
          С иконкой слева
        </Link>
        <Link loading={isLoading} rightIcon={<CheckAIcon16Light />}>
          С иконкой справа
        </Link>
      </Gapped>
      <Button onClick={() => setIsLoading(!isLoading)}>{isLoading ? 'Остановить загрузку' : 'Начать загрузку'}</Button>
    </Gapped>
  );
};
ExampleSpinner.storyName = 'Состояние загрузки';

/** Проп `error` переводит сслыку в  состояние ошибки. */
export const ExampleError: Story = () => {
  return (
    <Link error icon={<ToolPencilLineIcon16Light />}>
      Заполнить адрес
    </Link>
  );
};
ExampleError.storyName = 'Состояние ошибки';

/** Проп `component` позволяет переопределить корневой элемент.
 *
 * Примеры:
 *
 * - Ссылка может рендерить кнопку в качестве корневого элемента. Ссылка принимает все пропсы переданного компонента. Рекомендуется к использованию вместо кнопки с `use=link`, если нужна кнопка с визуалом ссылки.
 * - В `component` можно передать [Link из библиотеки React Router](https://reactrouter.com/api/components/Link), если нужен переход внутри одностраничного приложения без полной перезагрузки страницы. */
export const ExampleButton: Story = () => {
  return <Link component="button">Кнопка, но выглядит как ссылка</Link>;
};
ExampleButton.storyName = 'Управление корневым элементом';

/** Вы можете управлять тем, какое именно действие присходит при нажатии на ссылку. */
export const ExampleClickCustom: Story = () => {
  return <Link onClick={() => Toast.push('Ты нажал на ссылку')}>Ссылка с кастомным действием</Link>;
};
ExampleClickCustom.storyName = 'Кастомизация: действие при нажатии';

/** Ссылки допускается выделять фирменным цветом продукта. Сделать это можно, изменяя свойства темы через проп `theme`. Заданные переменные будут объединены с темой из `<ThemeContext>`.
 *
 * Общие переменные темы и переменные для ссылки (с префиксом `link`) смотрите на странице [ThemePlayground](https://tech.skbkontur.ru/kontur-ui/?path=/docs/react-ui_information-themeplayground--docs). */
export const ExampleTheme: Story = () => {
  return (
    <Gapped>
      <Link theme={{ linkColor: '#00B59A', linkHoverColor: '#00B59A', linkActiveColor: '#00B59A' }}>
        Ссылка другого цвета
      </Link>
    </Gapped>
  );
};
ExampleTheme.storyName = 'Кастомизация: цвет ссылки';

export const ExampleCustomLink: Story = () => {
  const textDecorationStyles = {
    linkTextUnderlineOffset: '1px',
  };

  const underlineOnHoverStyles = {
    linkTextDecorationColor: 'transparent',
  };

  const differentColorStyles = {
    linkColor: '#1874CF',
    linkHoverColor: '#1874CF',
    linkActiveColor: '#1874CF',
  };

  const stringify = (styles) => {
    return `${Object.entries(styles)
      .map(([key, value]) => `${key}: "${value}"`)
      .join(', ')}`;
  };

  const copyStyles = (styles) => {
    navigator.clipboard.writeText(stringify(styles));
    Toast.push('Copied');
  };

  const tableStyle = {
    borderCollapse: 'collapse',
    width: '100%',
  };

  const tdStyle = {
    border: '1px solid',
    padding: '8px',
  };

  const renderExampleRow = (title, styles) => {
    return (
      <tr>
        <td style={tdStyle}>{title}</td>
        <td style={tdStyle}>
          <Link theme={styles}>Link</Link>
        </td>
        <td style={tdStyle}>
          <div style={{ display: 'flex' }}>
            <div style={{ width: '80%', whiteSpace: 'pre-line' }}>{stringify(styles).replace(/, /g, '\n')}</div>
            <Button icon={<CopyIcon16Regular />} use={'text'} onClick={() => copyStyles(styles)} />
          </div>
        </td>
      </tr>
    );
  };

  return (
    <table style={tableStyle}>
      <tr style={{ textAlign: 'left' }}>
        <th style={tdStyle}></th>
        <th style={tdStyle}>Пример</th>
        <th style={tdStyle}>Переменные темы</th>
      </tr>
      {renderExampleRow('Ссылка с подчеркиванием без отступа', textDecorationStyles)}
      {renderExampleRow('Ссылка с подчеркиванием при наведении', underlineOnHoverStyles)}
      {renderExampleRow('Изменение цвета ссылки', differentColorStyles)}
    </table>
  );
};
ExampleCustomLink.storyName = 'Кастомизация: вид ссылки';
