import { IconDocPlusLight16 } from '@skbkontur/icons/IconDocPlusLight16';
import { IconQuestionCircleLight20 } from '@skbkontur/icons/IconQuestionCircleLight20';
import { IconSecurityLockClosedLight20 } from '@skbkontur/icons/IconSecurityLockClosedLight20';
import { Button, Gapped, Input, SingleToast, ThemeContext, ThemeFactory, Tooltip } from '@skbkontur/react-ui';
import React from 'react';

import type { Story } from '../../../typings/stories.js';

export default {
  title: 'Overlay/Tooltip',
  component: Tooltip,
  parameters: { creevey: { skip: true } },
};

export const ExampleBasic: Story = () => {
  return (
    <Tooltip render={() => 'Тултип'}>
      <IconQuestionCircleLight20 />
    </Tooltip>
  );
};
ExampleBasic.storyName = 'Базовый пример';

/** Главное отличие тултипа от хинта — возможность рендерить подсказку с любым содержимым с помощью пропа `render`. */
export const ExampleRender: Story = () => {
  const tooltipContent = () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', width: '200px' }}>
      Контекстная справка
      <Button>Кнопка</Button>
    </div>
  );

  return (
    <Tooltip render={tooltipContent}>
      <Button disabled icon={<IconSecurityLockClosedLight20 />}>
        Кнопка
      </Button>
    </Tooltip>
  );
};
ExampleRender.storyName = 'Содержимое тултипа';

/** Проп `size` задаёт размер. */
export const ExampleSize: Story = () => {
  const tooltipContent = () => <div style={{ width: '150px' }}>Справка, которая поможет понять сценарий</div>;

  return (
    <div style={{ display: 'inline-flex', flexDirection: 'column', gap: '8px' }}>
      <Tooltip render={tooltipContent} size="small">
        <Button size="small">small</Button>
      </Tooltip>
      <Tooltip render={tooltipContent} size="medium">
        <Button size="medium">medium</Button>
      </Tooltip>
      <Tooltip render={tooltipContent} size="large">
        <Button size="large">large</Button>
      </Tooltip>
    </div>
  );
};
ExampleSize.storyName = 'Размер';

/** Можно позиционировать тултип относительно элемента пропом `pos`.
 *
 * Возможные значения:
 * + `top`, `top center`, `top left`, `top right`,
 * + `bottom`, `bottom center`, `bottom left`, `bottom right`,
 * + `left`, `left middle`, `left top`, `left bottom`,
 * + `right`, `right middle`, `right top`, `right bottom`. */
export const ExamplePos: Story = () => {
  return (
    <Tooltip pos={'bottom'} render={() => 'Тултип снизу'}>
      <IconQuestionCircleLight20 />
    </Tooltip>
  );
};
ExamplePos.storyName = 'Позиционирование';

/** Проп `trigger` задаёт событие, по которому открывается тултип.
 *
 * Возможные значения:
 * + `hover` — по наведению (вариант по умолчанию),
 * + `click` — по нажатию,
 * + `focus` — по фокусу,
 * + `hover&focus` — по наведению или фокусу,
 * + `hoverAnchor` — по наведению только на вложенный элемент, без учёта поверхности тултипа,
 * + `opened` — статичное состояние с открытым тултипом,
 * + `closed` — статичное состояние с закрытым тултипом,
 * + `manual` — ручное управление через методы `show()` и `hide()`. */
export const ExampleTrigger: Story = () => {
  const tooltipContent = () => <div style={{ width: '150px' }}>Справка, которая поможет понять сценарий</div>;

  return (
    <div style={{ display: 'inline-flex', flexDirection: 'column', gap: '8px' }}>
      <Tooltip render={tooltipContent} trigger="hover">
        <Button>hover</Button>
      </Tooltip>
      <Tooltip render={tooltipContent} trigger="click">
        <Button>click</Button>
      </Tooltip>
      <Tooltip render={tooltipContent} trigger="focus">
        <Button>focus</Button>
      </Tooltip>
      <Tooltip render={tooltipContent} trigger="hover&focus">
        <Button>hover&focus</Button>
      </Tooltip>
      <Tooltip render={tooltipContent} trigger="hoverAnchor">
        <Button>hoverAnchor</Button>
      </Tooltip>
      <Tooltip render={tooltipContent} trigger="opened">
        <Button>opened</Button>
      </Tooltip>
      <Tooltip render={tooltipContent} trigger="closed">
        <Button>closed</Button>
      </Tooltip>
    </div>
  );
};
ExampleTrigger.storyName = 'Триггер открытия';

/** Подробный пример реализации тултипа с `trigger = "manual"` через `ref` и методы `show()` и `hide()`. */
export const ExampleTriggerManual: Story = () => {
  const [isTooltipOpen, setIsTooltipOpen] = React.useState(false);
  const tooltipRef = React.useRef<Tooltip>(null);

  const handleButtonClick = () => {
    const tooltip = tooltipRef.current;
    if (!tooltip) {
      return;
    }

    if (isTooltipOpen) {
      tooltip.hide();
    } else {
      tooltip.show();
    }
    setIsTooltipOpen(!isTooltipOpen);
  };

  return (
    <Tooltip trigger="manual" ref={tooltipRef} render={() => 'Тултип'} closeButton={false}>
      <Button onClick={handleButtonClick}>{`${isTooltipOpen ? 'Закрыть' : 'Открыть'} тултип`}</Button>
    </Tooltip>
  );
};
ExampleTriggerManual.storyName = 'Ручное управление';

/** С помощью пропа `closeButton` можно переопределить логику отображения кнопки-крестика, закрывающую тултип.
 *
 * По умолчанию крестик показывается в тултипах с `trigger = "click" | "opened" | "manual"`. */
export const ExampleCloseButton: Story = () => {
  return (
    <Tooltip trigger="opened" closeButton={false} render={() => 'Тултип без крестика'}>
      <IconQuestionCircleLight20 />
    </Tooltip>
  );
};
ExampleCloseButton.storyName = 'Кнопка закрытия';

/** С помощью пропа `anchorElement` можно привязывать один тултип к разным элементам на странице.  */
export const ExampleAnchorElement: Story = () => {
  const [anchor, setAnchor] = React.useState<HTMLElement | null>(null);

  return (
    <div style={{ display: 'inline-flex', flexDirection: 'column', gap: '8px' }}>
      {anchor && <Tooltip anchorElement={anchor} render={() => 'Тултип'} trigger="opened" closeButton={false} />}
      <div onMouseEnter={(event) => setAnchor(event.target as HTMLElement)} onMouseLeave={() => setAnchor(null)}>
        Anchor 1
      </div>
      <div onMouseEnter={(event) => setAnchor(event.target as HTMLElement)} onMouseLeave={() => setAnchor(null)}>
        Anchor 2
      </div>
      <div onMouseEnter={(event) => setAnchor(event.target as HTMLElement)} onMouseLeave={() => setAnchor(null)}>
        Anchor 3
      </div>
    </div>
  );
};
ExampleAnchorElement.storyName = 'Якорный элемент';

/** Проп `disableAnimations` отключает анимацию всплывающего тултипа. */
export const ExampleDisableAnimations: Story = () => {
  return (
    <Tooltip disableAnimations render={() => 'Тултип'}>
      <IconQuestionCircleLight20 />
    </Tooltip>
  );
};
ExampleDisableAnimations.storyName = 'Всплытие без анимации';

/** С помощью пропа `useWrapper` можно обернуть вложенные элементы в `<span />`.
 *
 * Это особенно полезно в двух сценариях:
 * + для правильного позиционирования относительно двух или более вложенных объектов,
 * + для отображения тултипа у отключённых нативных элементов (аттрибут `disabled` блокирует события мыши).
 */
export const ExampleUseWrapper: Story = () => {
  return (
    <Tooltip useWrapper render={() => 'Тултип всё равно отображается'}>
      <button disabled>Нативная кнопка</button>
    </Tooltip>
  );
};
ExampleUseWrapper.storyName = 'Встроенная обёртка';

/** Проп `delayBeforeShow` позволяет переопределить задержку перед появлением тултипа **по наведению**. По умолчанию: 100мс. */
export const ExampleDelayBeforeShow: Story = () => {
  const [delay, setDelay] = React.useState(100);

  const handleDelayChange = (value: string) => {
    const valueAsNumber = Number(value);
    setDelay(isNaN(valueAsNumber) || valueAsNumber < 0 ? 0 : valueAsNumber);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
      <Tooltip render={() => `Тултип с задержкой в ${delay}мс`} delayBeforeShow={delay}>
        <IconQuestionCircleLight20 />
      </Tooltip>
      <span>
        Задержка: <Input value={delay.toString()} onValueChange={handleDelayChange} />
      </span>
    </div>
  );
};
ExampleDelayBeforeShow.storyName = 'Задержка перед появлением';

/** Колбэки `onOpen` и `onClose` вызываются при открытии и закрытии меню. */
export const ExampleOnOpenAndClose: Story = () => {
  const [tooltipState, setTooltipState] = React.useState('Закрыт');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
      <Tooltip
        onOpen={() => setTooltipState('Открыт')}
        onClose={() => setTooltipState('Закрыт')}
        render={() => `Тултип`}
      >
        <IconQuestionCircleLight20 />
      </Tooltip>
      Состояние тултипа: {tooltipState}
    </div>
  );
};
ExampleOnOpenAndClose.storyName = 'События открытия и закрытия';

/** Колбэк `onCloseClick` вызывается при нажатии на крестик, а `onCloseRequest` — ещё и при нажатии снаружи тултипа. */
export const ExampleOnCloseClickAndRequest: Story = () => {
  return (
    <div style={{ display: 'inline-flex', flexDirection: 'column', gap: '8px' }}>
      <SingleToast />
      <Tooltip onCloseClick={() => SingleToast.push('onCloseClick')} render={() => `Тултип`} trigger="click">
        <Button>onCloseClick</Button>
      </Tooltip>
      <Tooltip onCloseRequest={() => SingleToast.push('onCloseRequest')} render={() => `Тултип`} trigger="click">
        <Button>onCloseRequest</Button>
      </Tooltip>
    </div>
  );
};
ExampleOnCloseClickAndRequest.storyName = 'События нажатия на крестик и снаружи тултипа';

/** [Гайд про контекстное обучение](https://guides.kontur.ru/principles/onbording/contextual-hints/). */
export const ExampleContextualHints: Story = () => {
  const [isTooltipVisible, setIsTooltipVisible] = React.useState(false);

  const tooltipTheme = ThemeFactory.create({
    tooltipBg: '#2291FF',
    tooltipTextColor: '#FFFFFF',
  });
  const tooltipContentTheme = ThemeFactory.create({
    btnBacklessTextColor: '#FFFFFF',
    btnBacklessBorderColor: '#FFFFFF8A',
    btnBacklessHoverBg: '#FFFFFF0F',
    btnBacklessActiveBg: '#FFFFFF1A',
  });

  const tooltipRef = React.useRef<Tooltip>(null);
  const tooltipContent = () => (
    <ThemeContext.Provider value={tooltipContentTheme}>
      <Gapped vertical gap={16} style={{ width: 280 }}>
        <img
          src="https://kontur.ru/Files/userfiles/image/transparent-blank.png"
          alt="transparent-blank"
          width={280}
          height={184}
          style={{ borderRadius: '8px', backgroundColor: '#FFFFFF' }}
        />
        <Gapped vertical gap={6}>
          <b>Заголовок контекстного обучения</b>
          Дополнительный текст в несколько строк, описывающий новую возможность
        </Gapped>
        <Button use="backless" size="medium" onClick={handleHideClick}>
          Понятно
        </Button>
      </Gapped>
    </ThemeContext.Provider>
  );

  const handleHideClick = () => {
    if (tooltipRef.current) {
      setIsTooltipVisible(false);
      tooltipRef.current.hide();
    }
  };
  const handleShowClick = () => {
    if (tooltipRef.current) {
      setIsTooltipVisible(true);
      tooltipRef.current.show();
    }
  };

  return (
    <ThemeContext.Provider value={tooltipTheme}>
      <Gapped vertical gap={16}>
        <Tooltip
          render={tooltipContent}
          pos="right top"
          size="medium"
          trigger="manual"
          ref={tooltipRef}
          closeButton={false}
        >
          <Button icon={<IconDocPlusLight16 />} use="text">
            Новое действие
          </Button>
        </Tooltip>
        <Button onClick={isTooltipVisible ? handleHideClick : handleShowClick} width={130}>
          {isTooltipVisible ? 'Скрыть' : 'Показать'} тултип
        </Button>
      </Gapped>
    </ThemeContext.Provider>
  );
};
ExampleContextualHints.storyName = 'Кастомизация: тултип контекстного обучения';
