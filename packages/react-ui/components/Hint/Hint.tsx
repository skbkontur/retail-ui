import React from 'react';
import { globalObject, SafeTimer } from '@skbkontur/global-object';

import { ThemeContext } from '../../lib/theming/ThemeContext';
import { ThemeFactory } from '../../lib/theming/ThemeFactory';
import { Theme } from '../../lib/theming/Theme';
import { DUMMY_LOCATION, Popup, PopupPinnablePositionsType, ShortPopupPositionsType } from '../../internal/Popup';
import { Nullable } from '../../typings/utility-types';
import { MouseEventType } from '../../typings/event-types';
import { isTestEnv } from '../../lib/currentEnvironment';
import { CommonWrapper, CommonProps } from '../../internal/CommonWrapper';
import { cx } from '../../lib/theming/Emotion';
import { rootNode, TSetRootNode } from '../../lib/rootNode';
import { InstanceWithAnchorElement } from '../../lib/InstanceWithAnchorElement';
import { createPropsGetter } from '../../lib/createPropsGetter';

import { styles } from './Hint.styles';

const HINT_BORDER_COLOR = 'transparent';

export interface HintProps extends CommonProps {
  /** @ignore */
  children?: React.ReactNode;

  /** Переводит отображение подсказки в _"ручной режим"_.
   В _"ручном режиме"_ подсказку можно активировать только задав значение пропу `opened`. */
  manual?: boolean;

  /** Задает максимальную ширину подсказки. */
  maxWidth?: React.CSSProperties['maxWidth'];

  /** Задает функцию, которая вызывается при наведении мышкой (событие `onmouseenter`). */
  onMouseEnter?: (event: MouseEventType) => void;

  /** Задает функцию, которая вызывается при уходе мышки с объекта (событие `onmouseleave`). */
  onMouseLeave?: (event: MouseEventType) => void;

  /** Открывает подсказку. Работает только при `manual=true`. */
  opened?: boolean;

  /** Задает приоритетное расположение подсказки относительно текста. */
  pos?: ShortPopupPositionsType | PopupPinnablePositionsType;

  /** Задает текст подсказки. */
  text: React.ReactNode;

  /** Задает список позиций, которые будет занимать хинт. Если положение хинта в определенной позиции будет выходить за край экрана, то будет выбрана следующая позиция. Обязательно должен включать позицию указанную в `pos`. */
  allowedPositions?: PopupPinnablePositionsType[];

  /** Отключает анимацию. */
  disableAnimations?: boolean;

  /** Явно указывает, что вложенные элементы должны быть обёрнуты в `<span/>`.
   * Используется для корректного позиционирования хинта при двух и более вложенных элементах.
   * _Примечание_: при **двух и более** вложенных элементах обёртка будет добавлена автоматически. */
  useWrapper?: boolean;
}

export interface HintState {
  opened: boolean;
  position: PopupPinnablePositionsType;
}

type DefaultProps = Required<Pick<HintProps, 'manual' | 'opened' | 'maxWidth' | 'disableAnimations' | 'useWrapper'>>;

/**
 * Всплывающая подсказка `Hint`.
 * По умолчанию отображается при наведении на элемент, но можно задать другие условия отображения.
 *
 * Для подсказки, всплывающей по клику используйте [Tooltip](?path=/docs/overlay-tooltip--docs).
 */
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
  };

  private getProps = createPropsGetter(Hint.defaultProps);

  public state: HintState = {
    opened: this.getProps().manual ? !!this.getProps().opened : false,
    position: DUMMY_LOCATION.position,
  };

  private timer: SafeTimer;
  private theme!: Theme;
  private setRootNode!: TSetRootNode;

  private popupRef = React.createRef<Popup>();

  public getAllowedPositions() {
    return this.props.allowedPositions;
  }

  public componentDidUpdate(prevProps: HintProps) {
    const { opened, manual } = this.getProps();
    if (!manual) {
      return;
    }
    if (this.timer) {
      globalObject.clearTimeout(this.timer);
      this.timer = null;
    }
    if (opened !== prevProps.opened) {
      this.setState({ opened: !!opened });
    }
  }

  public componentWillUnmount() {
    if (this.timer) {
      globalObject.clearTimeout(this.timer);
      this.timer = null;
    }
  }

  public render() {
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

  public renderMain() {
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
          onPositionChange={(position) => this.setState({ position })}
          disableAnimations={disableAnimations}
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
    const className = cx({
      [styles.content(this.theme)]: true,
      [styles.contentCenter(this.theme)]: centerAlignPositions.includes(this.state.position),
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
    if (!this.getProps().manual && !this.timer) {
      this.timer = globalObject.setTimeout(this.open, 400);
    }

    if (this.props.onMouseEnter) {
      this.props.onMouseEnter(e);
    }
  };

  private handleMouseLeave = (e: MouseEventType) => {
    if (!this.getProps().manual && this.timer) {
      globalObject.clearTimeout(this.timer);
      this.timer = null;
      this.setState({ opened: false });
    }

    if (this.props.onMouseLeave) {
      this.props.onMouseLeave(e);
    }
  };

  private open = () => {
    this.setState({ opened: true });
  };
}
