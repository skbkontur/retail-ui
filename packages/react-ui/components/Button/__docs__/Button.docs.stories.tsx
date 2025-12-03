import React from 'react';
import { ArrowARightIcon20Light } from '@skbkontur/icons/ArrowARightIcon20Light';
import { ArrowARightIcon24Regular } from '@skbkontur/icons/ArrowARightIcon24Regular';
import { PlusIcon16Light } from '@skbkontur/icons/PlusIcon16Light';
import { PlusIcon20Light } from '@skbkontur/icons/PlusIcon20Light';
import { TrashCanIcon20Light } from '@skbkontur/icons/TrashCanIcon20Light';
import { Button, Gapped } from '@skbkontur/react-ui';

import type { Meta, Story } from '../../../typings/stories';

export default {
  title: 'Button/Button',
  component: Button,
  parameters: { creevey: { skip: true } },
} as Meta;

export const ExampleBasic: Story = () => {
  return <Button>Кнопка</Button>;
};
ExampleBasic.storyName = 'Базовый пример';

/** Проп `use` задаёт стиль кнопки.
 *  Тип влияет на внешний вид и поведение кнопки в зависимости от выбранного значения. По умолчанию: `'default'`.
 * Доступны стили:
 * - Default — кнопка второстепенного действия с заливкой и обводкой.
 * - Primary — кнопка основного действия.
 * - Success — кнопка позитивного действия.
 * - Danger — кнопка деструктивного действия.
 * - Pay — кнопка, связанная с оплатой.
 * - Text — второстепенная кнопка без заливки и обводки.
 * - Backless — второстепенная кнопка без заливки, но с обводкой.
 * - Link — ⚠️ устарел. Рекомендуем использовать [Link](https://tech.skbkontur.ru/kontur-ui/?path=/docs/react-ui_button-link--docs) с заданным корневым элементом `component=button`. */
export const ExampleStyles: Story = () => {
  return (
    <Gapped>
      <Button use="default">Default</Button>
      <Button use="primary">Primary</Button>
      <Button use="success">Success</Button>
      <Button use="danger">Danger</Button>
      <Button use="pay">Pay</Button>
      <Button use="text">Text</Button>
      <Button use="backless">Backless</Button>
      <Button use="link">Link</Button>
    </Gapped>
  );
};
ExampleStyles.storyName = 'Стиль';

/** Проп `size` задаёт размер. По умолчанию: `'small'`. */
export const ExampleSize: Story = () => {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'end',
        gap: '10px',
      }}
    >
      <Button size="small">Small</Button>
      <Button size="medium">Medium</Button>
      <Button size="large">Large</Button>
    </div>
  );
};
ExampleSize.storyName = 'Размер';

/** Пропом `width` можно задать свою ширину кнопки. Может принимать как абсолютные значения — например, 150, так и относительные — например, 50%. */
export const ExampleWidth: Story = () => {
  return <Button width={150}>Закрыть</Button>;
};
ExampleWidth.storyName = 'Увеличение ширины';

/** Задаётся пропом `align`. */
export const ExampleAlign: Story = () => {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'end',
        gap: '10px',
      }}
    >
      <Button width={150} align="left">
        Left
      </Button>
      <Button width={150} align="center">
        Center
      </Button>
      <Button width={150} align="right">
        Right
      </Button>
    </div>
  );
};
ExampleAlign.storyName = 'Выравнивание текста';

/** В кнопку можно передать иконку.
 * Иконка может находиться слева от текста кнопки — проп `icon`, справа — проп `rightIcon`, в обоих позициях одновременно.
 * Если не передавать текст кнопки, будет отображаться кнопка-иконка. Для кнопки-иконки есть рекомендации по соблюдению доступности, изучите раздел <a href="#доступность" target="-_self"> Доступность </a>.
 *
 * Под разный размер кнопок используйте подходящие начертания и размер иконок:
 * - Small — 16Light
 * - Medium — 20Light
 * - Large — 24Regular
 */
export const ExampleIcon: Story = () => {
  return (
    <Gapped gap={5}>
      <Button icon={<PlusIcon16Light />}></Button>
      <Button icon={<PlusIcon16Light />}>Создать</Button>
      <Button size="medium" icon={<PlusIcon20Light />} rightIcon={<ArrowARightIcon20Light />}>
        Создать
      </Button>
      <Button size="large" rightIcon={<ArrowARightIcon24Regular />}>
        Создать
      </Button>
    </Gapped>
  );
};
ExampleIcon.storyName = 'Иконки в кнопке';

/** Проп `arrow` создаёт кнопку со стрелкой. Рекомендуется использовать для пошаговых мастеров.
 * При указании `arrow` без значения будет добавлена кнопка со стрелкой вправо, для кнопки со стрелкой влево укажите значение `arrow="left"`.
 * При изменении ширины кнопки стрелка будет оставаться прикреплена к внешнему краю кнопки, а не к тексту, как это происходит при добавлении отдельной иконки.
 */
export const ExampleArrow: Story = () => {
  return (
    <Gapped gap={10}>
      <Button arrow="left" size="medium">
        Назад
      </Button>
      <Button arrow size="medium">
        Далее
      </Button>
      <Button arrow="left" width={150}>
        Назад
      </Button>
      <Button arrow width={150}>
        Далее
      </Button>
    </Gapped>
  );
};
ExampleArrow.storyName = 'Кнопки-стрелки';

/** Проп `loading` переводит кнопку в состояние загрузки.
 * Кнопка на время загрузки отключается.
 *
 * Если в кнопке есть иконка, на время загрузки иконка заменяется на спиннер, если иконки нет — весь контент кнопки заменяется на спиннер. Когда иконки две — заменяется только левая. */
export const ExampleLoading: Story = () => {
  const [loading, setLoading] = React.useState(false);

  const delay = (time) => (args) => new Promise((resolve) => setTimeout(resolve, time, args));

  const handleLoadingStart = () => {
    delay(2000)().then(() => {
      setLoading(false);
    });
  };

  const handleClick = () => {
    setLoading(true);
    handleLoadingStart();
  };

  return (
    <Gapped>
      <Button width={150} onClick={handleClick} loading={loading}>
        Удалить
      </Button>
      <Button icon={<MinusCircleIcon16Light />} width={150} onClick={handleClick} loading={loading}>
        Удалить
      </Button>
      <Button rightIcon={<MinusCircleIcon16Light />} width={150} onClick={handleClick} loading={loading}>
        Удалить
      </Button>
      <Button
        icon={<MinusCircleIcon16Light />}
        rightIcon={<MinusCircleIcon16Light />}
        width={150}
        onClick={handleClick}
        loading={loading}
      >
        Удалить
      </Button>
    </Gapped>
  );
};
ExampleLoading.storyName = 'Состояние загрузки';

/** Проп `disabled` переводит кнопку в состояние блокировки. Кнопка меняет цвет на серый и становится недоступна для нажатия. */
export const ExampleDisabled: Story = () => {
  return <Button disabled>Кнопка</Button>;
};
ExampleDisabled.storyName = 'Состояние блокировки';

/** Кнопка может рендерить ссылку в качестве корневого элемента.
 * Переопределить корневой элемент можно c помощью пропа `component`. Кнопка принимает все пропсы переданного компонента. */
export const ExampleLink: Story = () => {
  return (
    <Button component="a" href="https://kontur.ru" target="_blank">
      Ссылка, но выглядит как кнопка
    </Button>
  );
};
ExampleLink.storyName = 'Кнопка-ссылка';

/**  Проп `theme` позволяет кастомизировать кнопку через свойства темы. Заданные переменные будут объединены с темой из `<ThemeContext>`.
 *
 * Общие переменные темы и переменные для кнопки (с префиксом `btn`) смотрите на странице [ThemePlayground](https://tech.skbkontur.ru/kontur-ui/?path=/docs/react-ui_information-themeplayground--docs) . */
export const ExampleTheme: Story = () => {
  return (
    <Gapped>
      <Button
        use="primary"
        theme={{
          btnPrimaryBg: '#26AD50',
          btnPrimaryBorderColor: '#26AD50',
          btnPrimaryHoverBg: '#23A14A',
          btnPrimaryHoverBorderColor: '#23A14A',
          btnPrimaryActiveBg: '#209644',
          btnPrimaryActiveBorderColor: '#209644',
        }}
      >
        Открыть
      </Button>
      <Button
        use="primary"
        theme={{
          btnPrimaryBg: '#00B59A',
          btnPrimaryBorderColor: '#00B59A',
          btnPrimaryHoverBg: '#00A58D',
          btnPrimaryHoverBorderColor: '#00A58D',
          btnPrimaryActiveBg: '#00957F',
          btnPrimaryActiveBorderColor: '#00957F',
        }}
      >
        Открыть
      </Button>
      <Button
        use="primary"
        theme={{
          btnPrimaryBg: '#2291FF',
          btnPrimaryBorderColor: '#2291FF',
          btnPrimaryHoverBg: '#1F87EF',
          btnPrimaryHoverBorderColor: '#1F87EF',
          btnPrimaryActiveBg: '#1C7EDF',
          btnPrimaryActiveBorderColor: '#1C7EDF',
        }}
      >
        Открыть
      </Button>
      <Button
        use="primary"
        theme={{
          btnPrimaryBg: '#366AF3',
          btnPrimaryBorderColor: '#366AF3',
          btnPrimaryHoverBg: '#3365E8',
          btnPrimaryHoverBorderColor: '#3365E8',
          btnPrimaryActiveBg: '#3060DC',
          btnPrimaryActiveBorderColor: '#3060DC',
        }}
      >
        Открыть
      </Button>
      <Button
        use="primary"
        theme={{
          btnPrimaryBg: '#B750D1',
          btnPrimaryBorderColor: '#B750D1',
          btnPrimaryHoverBg: '#AA49C3',
          btnPrimaryHoverBorderColor: '##AA49C3',
          btnPrimaryActiveBg: '#9E43B5',
          btnPrimaryActiveBorderColor: '#9E43B5',
        }}
      >
        Открыть
      </Button>
    </Gapped>
  );
};
ExampleTheme.storyName = 'Кастомизация: брендовая кнопка через переменные темы';

export const ExampleHoverColor: Story = () => {
  return (
    <Button
      use="text"
      size="medium"
      icon={<TrashCanIcon20Light />}
      theme={{ btnTextHoverBg: '#ED3F3F', btnTextActiveBg: '#DD3333', btnTextHoverTextColor: '#FFF' }}
    >
      Удалить
    </Button>
  );
};
ExampleHoverColor.storyName = 'Кастомизация: смена цвета при наведении';

/** ⚠️ Вариант Link устарел. Рекомендуем использовать [Link](https://tech.skbkontur.ru/kontur-ui/?path=/docs/react-ui_button-link--docs) с заданным корневым элементом `component=button`. */
export const ExampleCustomLink: Story = () => {
  const textDecorationStyles = {
    btnLinkTextUnderlineOffset: '1px',
  };

  const underlineOnHoverStyles = {
    btnLinkTextDecorationColor: 'transparent',
  };

  const differentColorStyles = {
    btnLinkColor: 'blue',
    btnLinkHoverColor: 'blue',
    btnLinkActiveColor: 'blue',
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
          <Button use={'link'} theme={styles}>
            Button-link
          </Button>
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
ExampleCustomLink.storyName = 'Кастомизация: вид кнопки-ссылки';
