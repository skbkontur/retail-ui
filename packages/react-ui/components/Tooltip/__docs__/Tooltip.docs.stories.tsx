import React from 'react';
import { QuestionCircleIcon20Light } from '@skbkontur/icons/icons/QuestionCircleIcon/QuestionCircleIcon20Light';
import { SecurityLockClosedIcon20Light } from '@skbkontur/icons/icons/SecurityLockClosedIcon/SecurityLockClosedIcon20Light';
import { DocPlusIcon16Light } from '@skbkontur/icons/icons/DocPlusIcon/DocPlusIcon16Light';
import { Tooltip, Button, Gapped, Input, Link, ThemeContext, ThemeFactory } from '@skbkontur/react-ui';

import type { Story } from '../../../typings/stories';

export default {
  title: 'Overlay/Tooltip',
  component: Tooltip,
  parameters: { creevey: { skip: true } },
};

export const BasicExample: Story = () => {
  const tooltipContent = () => <div style={{ width: 150 }}>Подсказка, которая поможет понять сценарий</div>;

  return (
    <div>
      <Gapped vertical gap={16}>
        <Gapped gap={32}>
          <div style={{ width: 60 }}>hover</div>
          <Tooltip render={tooltipContent}>
            <QuestionCircleIcon20Light />
          </Tooltip>
          <Tooltip render={tooltipContent} pos="right top">
            <Input placeholder="По наведению" />
          </Tooltip>
        </Gapped>
        <Gapped gap={32}>
          <div style={{ width: 60 }}>click</div>
          <Tooltip render={tooltipContent} trigger="click">
            <Link component="button">
              <QuestionCircleIcon20Light />
            </Link>
          </Tooltip>
          <Tooltip render={tooltipContent} trigger="click" pos="right top">
            <Input placeholder="По нажатию" />
          </Tooltip>
        </Gapped>
        <Gapped gap={32}>
          <div style={{ width: 60 }}>focus</div>
          <Tooltip render={tooltipContent} trigger="focus">
            <Link component="button">
              <QuestionCircleIcon20Light />
            </Link>
          </Tooltip>
          <Tooltip render={tooltipContent} trigger="focus" pos="right top">
            <Input placeholder="По фокусу" />
          </Tooltip>
        </Gapped>
      </Gapped>
    </div>
  );
};
BasicExample.storyName = 'Базовый пример';

export const WithSizeExample: Story = () => {
  const tooltipContent = () => <div style={{ width: 150 }}>Подсказка, которая поможет понять сценарий</div>;

  return (
    <Gapped vertical gap={16}>
      <Gapped gap={32}>
        <div style={{ width: 60 }}>small</div>
        <Tooltip render={tooltipContent} trigger="hover&focus" pos="right top">
          <Input placeholder="Маленький" />
        </Tooltip>
      </Gapped>
      <Gapped gap={32}>
        <div style={{ width: 60 }}>medium</div>
        <Tooltip render={tooltipContent} trigger="hover&focus" pos="right top" size="medium">
          <Input placeholder="Средний" size="medium" />
        </Tooltip>
      </Gapped>
      <Gapped gap={32}>
        <div style={{ width: 60 }}>large</div>
        <Tooltip render={tooltipContent} trigger="hover&focus" pos="right top" size="large">
          <Input placeholder="Большой" size="large" />
        </Tooltip>
      </Gapped>
    </Gapped>
  );
};
WithSizeExample.storyName = 'Размеры тултипа';

export const WithButtonInsideExample: Story = () => {
  const tooltipContent = () => (
    <Gapped vertical gap={12} style={{ width: 200 }}>
      Эта функциональность недоступна на вашем тарифе
      <Button use="pay">Купить тариф Премиум</Button>
    </Gapped>
  );

  return (
    <Tooltip render={tooltipContent} pos="right top">
      <Button disabled icon={<SecurityLockClosedIcon20Light />}>
        Что-то классное
      </Button>
    </Tooltip>
  );
};
WithButtonInsideExample.storyName = 'Тултип с кастомным контентом';

/** Тултип может располагаться в одной из 12 позиций. */
export const PositioningExample: Story = () => {
  const S = 80;
  const tooltipContent = (pos: string) => (
    <div>
      Позиция
      <br />'{pos}'
    </div>
  );

  const absoluteAnchor = (top: number, left: number, pos: string) => (
    <Tooltip render={() => tooltipContent(pos)} pos={pos} trigger="opened" closeButton={false}>
      <div
        style={{
          display: 'inline-block',
          position: 'absolute',
          top,
          left,
          height: S - 5,
          width: S - 5,
          border: 'solid 1px',
        }}
      />
    </Tooltip>
  );

  const blocks = [
    { top: S, left: S * 2, pos: 'top left' },
    { top: S, left: S * 4, pos: 'top center' },
    { top: S, left: S * 6, pos: 'top right' },
    { top: S * 2, left: S * 7, pos: 'right top' },
    { top: S * 4, left: S * 7, pos: 'right middle' },
    { top: S * 6, left: S * 7, pos: 'right bottom' },
    { top: S * 7, left: S * 6, pos: 'bottom right' },
    { top: S * 7, left: S * 4, pos: 'bottom center' },
    { top: S * 7, left: S * 2, pos: 'bottom left' },
    { top: S * 6, left: S, pos: 'left bottom' },
    { top: S * 4, left: S, pos: 'left middle' },
    { top: S * 2, left: S, pos: 'left top' },
  ];
  return (
    <div
      style={{
        width: S * 9,
        height: S * 9,
        position: 'relative',
      }}
    >
      {blocks.map((block) => absoluteAnchor(block.top, block.left, block.pos))}
    </div>
  );
};
PositioningExample.storyName = 'Расположение тултипа';

/** Пример реализации тултипа [контекстного обучения](https://guides.kontur.ru/principles/onbording/contextual-hints/). */
export const ContextualHintsExample: Story = () => {
  const [tooltipVisible, setTooltipVisible] = React.useState(false);

  const tooltipTheme = ThemeFactory.create({
    tooltipBg: '#2291FF',
    tooltipTextColor: '#FFFFFF',
  });
  const tooltipContentTheme = ThemeFactory.create({
    btnDefaultTextColor: '#FFFFFF',
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
      setTooltipVisible(false);
      tooltipRef.current.hide();
    }
  };
  const handleShowClick = () => {
    if (tooltipRef.current) {
      setTooltipVisible(true);
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
          <Button icon={<DocPlusIcon16Light />} use="text">
            Добавить запись
          </Button>
        </Tooltip>
        <Button onClick={tooltipVisible ? handleHideClick : handleShowClick} width={130}>
          {tooltipVisible ? 'Скрыть' : 'Показать'} тултип
        </Button>
      </Gapped>
    </ThemeContext.Provider>
  );
};
ContextualHintsExample.storyName = 'Тултип контекстного обучения';

/** Тултипы, которые открываются по наведению, появляются и скрываются с задержкой в 100 миллисекунд.
 *
 * Задержку перед появлением можно переопределить с помощью пропа `delayBeforeShow`. */
export const CustomDelayExample: Story = () => {
  const [delay, setDelay] = React.useState(100);

  const tooltipContent = () => `Я показался с задержкой в ${delay}мс`;
  const handleDelayChange = (value: string) => {
    const valueAsNumber = Number(value);
    setDelay(isNaN(valueAsNumber) || valueAsNumber < 0 ? 0 : valueAsNumber);
  };

  return (
    <Gapped vertical>
      <Gapped>
        Задержка: <Input value={delay.toString()} onValueChange={handleDelayChange} />
      </Gapped>
      <Tooltip render={tooltipContent} delayBeforeShow={delay} pos="right top">
        <QuestionCircleIcon20Light />
      </Tooltip>
    </Gapped>
  );
};
CustomDelayExample.storyName = 'Задержка перед появлением';
