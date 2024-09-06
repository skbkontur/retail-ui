import React from 'react';
import { Meta, Story } from '../../../typings/stories';

import { CheckAIcon16Light } from '@skbkontur/icons/CheckAIcon16Light';
import { CopyIcon16Regular } from '@skbkontur/icons/CopyIcon16Regular'

import { Link, Gapped, Button, Toast } from '@skbkontur/react-ui';

export default {
  title: 'Navigation/Link',
  component: Link,
  parameters: { creevey: { skip: true } },
} as Meta;

export const Example1: Story = () => {
  return (
    <Link>Обычная ссылка</Link>
  );

};
Example1.storyName = 'Базовый пример';

export const Example2: Story = () => {

  return (
    <Gapped gap={15}>
      <Link>Обычная ссылка</Link>
      <Link use="success">Успешная ссылка</Link>
      <Link use="danger">Опасная ссылка</Link>
      <Link use="grayed">Работающая ссылка серого цвета</Link>
      <Link disabled>Отключенная ссылка</Link>
    </Gapped>
  );

};
Example2.storyName = 'Стили и disabled';

export const Example3: Story = () => {

  return (
    <Gapped gap={20}>
      <Link icon={<CheckAIcon16Light />}>Ссылка с иконкой слева</Link>
      <Link icon={<CheckAIcon16Light />} rightIcon={<CheckAIcon16Light />}>Ссылка с двумя иконками</Link>
      <Link rightIcon={<CheckAIcon16Light />}>Ссылка с иконкой справа</Link>
    </Gapped>
  );

};
Example3.storyName = 'Иконка';

/** _Примечание_:
Если в контрол `Link` передана ссылка, ведущая на внешний ресурс, контрол `Link` неявно добавит атрибут `rel` со значением необходимым для внешних ссылок, при этом не трогая атрибут `target`.
Открытие ссылки в новой вкладке остаётся на усмотрение разработчика. */
export const Example4: Story = () => {

  return (
    <Gapped>
      <Link href="https://www.youtube.com/">
        Откроется <span style={{ color: "#e3071c" }}>в этой</span> вкладке
      </Link>
      <Link target="_blank" href="https://www.youtube.com/">
        Откроется <span style={{ color: "#3f9726" }}>в новой</span> вкладке
      </Link>
    </Gapped>
  );

};
Example4.storyName = 'Ссылки, ведущие на внешние ресурсы';

/** **Поведение**: если у ссылки есть иконка, она заменяется на спиннер, когда иконки две заменяется только левая. */
export const Example5: Story = () => {

  const [isLoading, setIsLoading] = React.useState(false);

  return (
    <Gapped vertical gap={15}>
      <Button onClick={() => setIsLoading(!isLoading)}>{isLoading ? "Прекратить загрузку!" : "Начать загрузку!"}</Button>
      <Gapped gap={20}>
        <Link loading={isLoading} icon={<CheckAIcon16Light />}>С иконкой слева</Link>
        <Link loading={isLoading} icon={<CheckAIcon16Light />} rightIcon={<CheckAIcon16Light />}>С двумя иконками</Link>
        <Link loading={isLoading} rightIcon={<CheckAIcon16Light />}>С иконкой справа</Link>
        <Link loading={isLoading}>Без иконки</Link>
      </Gapped>
    </Gapped>
  );

};
Example5.storyName = 'Состояние загрузки';

export const Example6: Story = () => {

  return (
    <Link onClick={() => Toast.push("Ты нажал на ссылку!")}>Ссылка с кастомным действием</Link>
  );

};
Example6.storyName = 'Кастомное действие при нажатии';

export const Example7: Story = () => {

  return (
    <Gapped>
      <Link theme={{linkColor: '#C00000'}}>Ok</Link>
      <Link>Ok</Link>
    </Gapped>
  );

};
Example7.storyName = 'Проп `theme`';

export const Example8: Story = () => {

  const textDecorationStyles = {
    linkLineBorderBottomWidth: '0',
    linkHoverTextDecoration: 'underline'
  }

  const underlineOnHoverStyles = {
    linkLineBorderBottomColor: 'transparent',
  }

  const differentColorStyles = {
    linkColor: 'blue',
    linkHoverColor: 'blue',
    linkActiveColor: 'blue',
  }

  const stringify = (styles) => {
      return `${Object.entries(styles).map(([key, value]) => `${key}: "${value}"`).join(", ")}`
  }

  const copyStyles = (styles) => {
    navigator.clipboard.writeText(stringify(styles));
    Toast.push('Copied');
  }

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
            <td style={tdStyle}><Link theme={styles}>Link</Link></td>
            <td style={tdStyle}>
              <div style={{display: 'flex'}}>
                <div style={{width: '80%', whiteSpace: 'pre-line'}}>{stringify(styles).replace(/, /g, '\n')}</div>
                <Button icon={<CopyIcon16Regular />} use={'text'} onClick={() => copyStyles(styles)}/>
              </div>
            </td>
          </tr>
      )
  }

  return (
    <table style={tableStyle}>
      <tr style={{textAlign: 'left'}}>
        <th style={tdStyle}></th>
        <th style={tdStyle}>Пример</th>
        <th style={tdStyle}>Переменные темы</th>
      </tr>
      {renderExampleRow('Ссылка с подчеркиванием через text-decoration', textDecorationStyles)}
      {renderExampleRow('Ссылка с подчеркиванием при наведении', underlineOnHoverStyles)}
      {renderExampleRow('Изменение цвета ссылки', differentColorStyles)}
    </table>
  );

};
Example8.storyName = 'Кастомизация ссылки';

