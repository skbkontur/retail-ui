import React, { useContext } from 'react';
import propTypes from 'prop-types';

import { forwardRefAndName } from '../../lib/forwardRefAndName';
import { withClassWrapper } from '../../lib/withClassWrapper';
import { ThemeContext } from '../../lib/theming/ThemeContext';
import { ThemeFactory } from '../../lib/theming/ThemeFactory';
import { Popup, PopupPosition } from '../../internal/Popup';
import { MouseEventType } from '../../typings/event-types';
import { isTestEnv } from '../../lib/currentEnvironment';
import { CommonProps } from '../../internal/CommonWrapper';

import { HintContent } from './HintContent';
import { getPositions } from './getPositions';
import { useDelayDisplaying } from './useDelayDisplaying';

type HintInterface = {
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
};

export type HintProps = HintInterface & CommonProps;

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
export const DISPLAY_DELAY = 400;

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
    ...rest
  } = props;

  const theme = useContext(ThemeContext);
  const { isOpen, handleMouseEnter, handleMouseLeave } = useDelayDisplaying(manual, opened, onMouseLeave, onMouseEnter);

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
      <Popup
        hasPin
        opened={!!isOpen}
        anchorElement={children}
        positions={getPositions(positions, pos)}
        backgroundColor={theme.hintBgColor}
        borderColor="transparent"
        disableAnimations={disableAnimations}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        useWrapper={useWrapper}
        {...rest}
      >
        <HintContent text={text} pos={pos} maxWidth={maxWidth} />
      </Popup>
    </ThemeContext.Provider>
  );
});

HintFC.propTypes = {
  children: propTypes.node,
  manual: propTypes.bool,
  maxWidth: propTypes.oneOfType([propTypes.string, propTypes.number]),
  opened: propTypes.bool,
  pos: propTypes.oneOf([
    'top',
    'right',
    'bottom',
    'left',
    'top left',
    'top center',
    'top right',
    'bottom left',
    'bottom center',
    'bottom right',
    'left top',
    'left middle',
    'left bottom',
    'right top',
    'right middle',
    'right bottom',
  ]),
  text: propTypes.node.isRequired,
  disableAnimations: propTypes.bool,
  useWrapper: propTypes.bool,
};

/**
 * Всплывающая подсказка, которая по умолчанию отображается при наведении на элемент. <br/> Можно задать другие условия отображения.
 */
export const Hint = withClassWrapper(HintFC);
export type Hint = InstanceType<typeof Hint>;
