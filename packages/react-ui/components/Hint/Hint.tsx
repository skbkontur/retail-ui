import React, { useContext, useState, useEffect } from 'react';

import { forwardRefAndName } from '../../lib/forwardRefAndName';
import { withClassWrapper } from '../../lib/withClassWrapper';
import { ThemeContext } from '../../lib/theming/ThemeContext';
import { ThemeFactory } from '../../lib/theming/ThemeFactory';
import { Popup, PopupPosition } from '../../internal/Popup';
import { MouseEventType } from '../../typings/event-types';
import { isTestEnv } from '../../lib/currentEnvironment';
import { CommonWrapper, CommonProps } from '../../internal/CommonWrapper';

import { HintContent } from './HintContent';
import { clearTimer, getPositions } from './utils';

export type HintProps = {
  children?: React.ReactNode;
  /**
   * Переводит отображение подсказки в _"ручной режим"_.
   *
   * В _"ручном режиме"_ подcказку можно активировать только задав значение пропу `opened`.
   */
  manual?: boolean;
  /**
   * Задаёт максимальную ширину подсказки.
   */
  maxWidth?: React.CSSProperties['maxWidth'];
  /**
   * HTML-событие `mouseenter`.
   */
  onMouseEnter?: (event: MouseEventType) => void;
  /**
   * HTML-событие `mouseleave`.
   */
  onMouseLeave?: (event: MouseEventType) => void;
  /**
   * Если `true` - подсказка будет открыта.
   *
   * _Примечание_: работает только при `manual=true`.
   */
  opened?: boolean;
  /**
   * Расположение подсказки относительно текста.
   *
   * **Допустимые значения**: `"top"`, `"right"`, `"bottom"`, `"left"`, `"top left"`, `"top center"`, `"top right"`, `"right top"`, `"right middle"`, `"right bottom"`, `"bottom left"`, `"bottom center"`, `"bottom right"`, `"left top"`, `"left middle"`, `"left bottom"`.
   */
  pos?:
    | 'top'
    | 'right'
    | 'bottom'
    | 'left'
    | 'top left'
    | 'top center'
    | 'top right'
    | 'bottom left'
    | 'bottom center'
    | 'bottom right'
    | 'left top'
    | 'left middle'
    | 'left bottom'
    | 'right top'
    | 'right middle'
    | 'right bottom';
  /**
   * Текст подсказки.
   */
  text: React.ReactNode;
  /**
   * Отключает анимацию.
   */
  disableAnimations?: boolean;
  /**
   * Явно указывает, что вложенные элементы должны быть обёрнуты в `<span/>`. <br/> Используется для корректного позиционирования тултипа при двух и более вложенных элементах.
   *
   * _Примечание_: при **двух и более** вложенных элементах обёртка будет добавлена автоматически.
   */
  useWrapper?: boolean;
} & CommonProps;

const positions: PopupPosition[] = [
  'top center',
  'top left',
  'top right',
  'bottom center',
  'bottom left',
  'bottom right',
  'left middle',
  'left top',
  'left bottom',
  'right middle',
  'right top',
  'right bottom',
];

export const DEFAULT_POSITION = 'top';
export const DEFAULT_MAX_WIDTH = 200;

const HintFC = forwardRefAndName<HTMLDivElement, HintProps>('HintFC', (props, ref) => {
  const {
    children,
    disableAnimations = isTestEnv,
    useWrapper = false,
    manual = false,
    text,
    opened = false,
    pos = DEFAULT_POSITION,
    maxWidth = DEFAULT_MAX_WIDTH,
    onMouseEnter,
    onMouseLeave,
  } = props;

  const theme = useContext(ThemeContext);

  const [isOpen, setIsOpen] = useState(manual ? opened : false);
  let timer: number | undefined = undefined;

  useEffect(() => {
    if (!manual) {
      return;
    }

    setIsOpen(!!opened);
  }, [manual, opened]);

  useEffect(() => {
    return clearTimer(timer);
  }, [timer]);

  const handleMouseEnter = (e: MouseEventType) => {
    if (!manual && !timer) {
      timer = window.setTimeout(() => {
        setIsOpen(true);
      }, 400);
    }

    onMouseEnter?.(e);
  };

  const handleMouseLeave = (e: MouseEventType) => {
    if (!manual) {
      clearTimer(timer);

      setIsOpen(false);
    }

    onMouseLeave?.(e);
  };

  return (
    // TODO: Pass `ref` down to `Popup` when it'll be possible
    <ThemeContext.Provider
      value={ThemeFactory.create(
        {
          popupPinOffset: theme.hintPinOffset,
          popupMargin: theme.hintMargin,
          popupBorder: theme.hintBorder,
          popupBorderRadius: theme.hintBorderRadius,
        },
        theme,
      )}
    >
      <CommonWrapper {...props}>
        <Popup
          hasPin
          opened={isOpen}
          anchorElement={children}
          positions={getPositions(positions, pos)}
          backgroundColor={theme.hintBgColor}
          borderColor="transparent"
          disableAnimations={disableAnimations}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          useWrapper={useWrapper}
        >
          <HintContent text={text} pos={pos} maxWidth={maxWidth} />
        </Popup>
      </CommonWrapper>
    </ThemeContext.Provider>
  );
});

/**
 * Всплывающая подсказка, которая по умолчанию отображается при наведении на элемент. <br/> Можно задать другие условия отображения.
 */
export const Hint = withClassWrapper(HintFC);
export type Hint = InstanceType<typeof Hint>;
