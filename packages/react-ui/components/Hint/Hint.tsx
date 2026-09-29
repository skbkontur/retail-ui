import type { Emotion } from '@emotion/css/create-instance';
import React from 'react';

import type { CommonProps } from '../../internal/CommonWrapper/index.js';
import { CommonWrapper } from '../../internal/CommonWrapper/index.js';
import { DefaultPosition, Popup, PopupPinnablePositions } from '../../internal/Popup/index.js';
import type {
  PopupPinnablePositionsType,
  PopupPositionsType,
  ShortPopupPositionsType,
} from '../../internal/Popup/index.js';
import { createPropsGetter } from '../../lib/createPropsGetter.js';
import { isTestEnv } from '../../lib/currentEnvironment.js';
import type { GlobalObject, SafeTimer } from '../../lib/globalObject.js';
import type { InstanceWithAnchorElement } from '../../lib/InstanceWithAnchorElement.js';
import { withRenderEnvironment } from '../../lib/renderEnvironment/index.js';
import type { TGetRootNode, TSetRootNode } from '../../lib/rootNode/index.js';
import { rootNode } from '../../lib/rootNode/index.js';
import type { Theme } from '../../lib/theming/Theme.js';
import { ThemeContext } from '../../lib/theming/ThemeContext.js';
import { ThemeFactory } from '../../lib/theming/ThemeFactory.js';
import type { MouseEventType } from '../../typings/event-types.js';
import type { Nullable } from '../../typings/utility-types.js';
import { getStyles } from './Hint.styles.js';
import {
  getShowDelay,
  HINT_DEFAULT_DELAY_BEFORE_SHOW,
  isShowDelaySkipped,
  markClosed,
  markDisposed,
  markOpened,
} from './HintDelayController.js';

const HINT_BORDER_COLOR = 'transparent';

const isPinnablePosition = (position: PopupPositionsType): position is PopupPinnablePositionsType => {
  return (PopupPinnablePositions as readonly PopupPositionsType[]).includes(position);
};

export interface HintProps extends CommonProps {
  /** @ignore */
  children?: React.ReactNode;

  /** Текст подсказки. */
  text: React.ReactNode;

  /** Максимальная ширина подсказки. */
  maxWidth?: React.CSSProperties['maxWidth'];

  /** Приоритетное расположение подсказки относительно текста. */
  pos?: ShortPopupPositionsType | PopupPinnablePositionsType;

  /** Список позиций, которые может занимать подсказка. В списке обязательно должна быть позиция из пропа `pos`. */
  allowedPositions?: PopupPinnablePositionsType[];

  /** Переводит отображение подсказки в ручной режим, где состояние контролируется значением пропа `opened`. */
  manual?: boolean;

  /** Открывает подсказку. Работает только при `manual=true`. */
  opened?: boolean;

  /** Отключает анимацию. */
  disableAnimations?: boolean;

  /** Задержка в миллисекундах до появления подсказки по наведению.
   * После показа одной подсказки следующие в серии открываются без задержки и анимации
   * в течение примерно 500 мс после ухода курсора.
   * @default 400 */
  delayBeforeShow?: number;

  /** Оборачивает вложенные элементы в `<span />`.
   *
   * _Примечание_: при двух и более вложенных элементах обёртка будет добавлена автоматически. */
  useWrapper?: boolean;

  /** Вызывается при наведении курсора (событие `onmouseenter`). */
  onMouseEnter?: (event: MouseEventType) => void;

  /** Вызывается при уходе курсора с объекта (событие `onmouseleave`). */
  onMouseLeave?: (event: MouseEventType) => void;
}

export interface HintState {
  opened: boolean;
  position: PopupPinnablePositionsType;
}

type DefaultProps = Required<
  Pick<HintProps, 'manual' | 'opened' | 'maxWidth' | 'disableAnimations' | 'useWrapper' | 'delayBeforeShow'>
>;

/** Краткая подсказка, которая объясняет контрол, иконку и добавляет контекста.
 * Всплывает при наведении на элемент. */
@withRenderEnvironment
@rootNode
export class Hint extends React.PureComponent<HintProps, HintState> implements InstanceWithAnchorElement {
  public static __KONTUR_REACT_UI__ = 'Hint';
  public static displayName = 'Hint';

  public static defaultProps: DefaultProps = {
    manual: false,
    opened: false,
    maxWidth: 200,
    disableAnimations: isTestEnv,
    useWrapper: false,
    delayBeforeShow: HINT_DEFAULT_DELAY_BEFORE_SHOW,
  };

  private getProps = createPropsGetter(Hint.defaultProps);

  public state: HintState = {
    opened: this.getProps().manual ? !!this.getProps().opened : false,
    position: DefaultPosition,
  };

  private timer: SafeTimer;
  private theme!: Theme;
  public getRootNode!: TGetRootNode;
  private setRootNode!: TSetRootNode;
  private styles!: ReturnType<typeof getStyles>;
  private emotion!: Emotion;
  private cx!: Emotion['cx'];
  private globalObject!: GlobalObject;
  private disableAnimationsOnOpen = false;

  private popupRef = React.createRef<Popup>();

  public getAllowedPositions(): string[] | undefined {
    return this.props.allowedPositions;
  }

  public componentDidUpdate(prevProps: HintProps) {
    const { opened, manual } = this.getProps();
    if (!manual) {
      return;
    }
    this.clearTimer();
    if (opened !== prevProps.opened) {
      this.setState({ opened: !!opened });
    }
  }

  public componentWillUnmount() {
    this.closeByHover(true);
  }

  public render(): React.JSX.Element {
    this.styles = getStyles(this.emotion);

    return (
      <ThemeContext.Consumer>
        {(theme) => {
          this.theme = theme;
          return (
            <ThemeContext.Provider
              value={ThemeFactory.create(
                {
                  popupMargin: theme.hintMargin,
                  popupBorder: theme.hintBorder,
                  popupBorderRadius: theme.hintBorderRadius,
                },
                this.theme,
              )}
            >
              {this.renderMain()}
            </ThemeContext.Provider>
          );
        }}
      </ThemeContext.Consumer>
    );
  }

  public renderMain(): React.JSX.Element {
    const { disableAnimations, useWrapper } = this.getProps();

    return (
      <CommonWrapper rootNodeRef={this.setRootNode} {...this.props}>
        <Popup
          hasPin={false}
          opened={this.state.opened}
          anchorElement={this.props.children}
          positions={this.getPositions()}
          pos={this.props.pos}
          backgroundColor={this.theme.hintBgColor}
          borderColor={HINT_BORDER_COLOR}
          onPositionChange={(position) => {
            if (isPinnablePosition(position)) {
              this.setState({ position });
            }
          }}
          disableAnimations={disableAnimations || this.disableAnimationsOnOpen}
          onMouseEnter={this.handleMouseEnter}
          onMouseLeave={this.handleMouseLeave}
          useWrapper={useWrapper}
          ref={this.popupRef}
          withoutMobile
        >
          {this.renderContent()}
        </Popup>
      </CommonWrapper>
    );
  }

  public getAnchorElement = (): Nullable<Element> => {
    return this.popupRef.current?.anchorElement;
  };

  private renderContent() {
    if (!this.props.text) {
      return null;
    }

    const { maxWidth } = this.getProps();
    const centerAlignPositions = ['top', 'top center', 'bottom', 'bottom center'];
    const className = this.cx({
      [this.styles.content(this.theme)]: true,
      [this.styles.contentCenter(this.theme)]: centerAlignPositions.includes(this.state.position),
    });
    return (
      <div className={className} style={{ maxWidth }}>
        {this.props.text}
      </div>
    );
  }

  private getPositions = (): PopupPinnablePositionsType[] | undefined => {
    return this.props.allowedPositions;
  };

  private handleMouseEnter = (e: MouseEventType) => {
    if (!this.getProps().manual && !this.timer && !this.state.opened) {
      const delay = getShowDelay(this.globalObject, this.getProps().delayBeforeShow);
      if (delay > 0) {
        this.timer = this.globalObject.setTimeout?.(this.open, delay) ?? null;
      } else {
        this.open();
      }
    }

    if (this.props.onMouseEnter) {
      this.props.onMouseEnter(e);
    }
  };

  private handleMouseLeave = (e: MouseEventType) => {
    this.closeByHover();

    if (this.props.onMouseLeave) {
      this.props.onMouseLeave(e);
    }
  };

  private open = () => {
    this.clearTimer();
    this.disableAnimationsOnOpen = isShowDelaySkipped(this.globalObject);
    this.setState({ opened: true });
    markOpened(this.globalObject);
  };

  private closeByHover = (isUnmount = false) => {
    if (this.getProps().manual) {
      this.clearTimer();
      return;
    }

    const wasOpened = this.state.opened;

    this.clearTimer();

    if (!wasOpened) {
      return;
    }

    if (isUnmount) {
      markDisposed(this.globalObject);
      return;
    }

    this.setState({ opened: false });
    markClosed(this.globalObject);
  };

  private clearTimer = () => {
    if (this.timer) {
      this.globalObject.clearTimeout?.(this.timer);
      this.timer = null;
    }
  };
}
