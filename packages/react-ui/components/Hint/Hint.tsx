import React from 'react';

import { ThemeContext } from '../../lib/theming/ThemeContext';
import { ThemeFactory } from '../../lib/theming/ThemeFactory';
import { Theme } from '../../lib/theming/Theme';
import { Popup, PopupPositionsType } from '../../internal/Popup';
import { Nullable } from '../../typings/utility-types';
import { MouseEventType } from '../../typings/event-types';
import { isTestEnv } from '../../lib/currentEnvironment';
import { CommonWrapper, CommonProps } from '../../internal/CommonWrapper';
import { cx } from '../../lib/theming/Emotion';
import { responsiveLayout } from '../ResponsiveLayout/decorator';
import { rootNode, TSetRootNode } from '../../lib/rootNode';
import { InstanceWithAnchorElement } from '../../lib/InstanceWithAnchorElement';
import { createPropsGetter } from '../../lib/createPropsGetter';

import { styles } from './Hint.styles';

const HINT_BORDER_COLOR = 'transparent';

export interface HintProps extends CommonProps {
  children?: React.ReactNode;
  /**
   * Переводит отображение подсказки в _"ручной режим"_.
   *
   * В _"ручном режиме"_ подсказку можно активировать только задав значение пропу `opened`.
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
  pos?: 'top' | 'right' | 'bottom' | 'left' | PopupPositionsType;
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
}

export interface HintState {
  opened: boolean;
}

const Positions: PopupPositionsType[] = [
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

type DefaultProps = Required<
  Pick<HintProps, 'pos' | 'manual' | 'opened' | 'maxWidth' | 'disableAnimations' | 'useWrapper'>
>;

/**
 * Всплывающая подсказка, которая по умолчанию отображается при наведении на элемент. <br/> Можно задать другие условия отображения.
 */
@responsiveLayout
@rootNode
export class Hint extends React.PureComponent<HintProps, HintState> implements InstanceWithAnchorElement {
  public static __KONTUR_REACT_UI__ = 'Hint';

  private isMobileLayout!: boolean;

  public static defaultProps: DefaultProps = {
    pos: 'top',
    manual: false,
    opened: false,
    maxWidth: 200,
    disableAnimations: isTestEnv,
    useWrapper: false,
  };

  private getProps = createPropsGetter(Hint.defaultProps);

  public state: HintState = {
    opened: this.props.manual ? !!this.props.opened : false,
  };

  private timer: Nullable<number> = null;
  private theme!: Theme;
  private setRootNode!: TSetRootNode;

  private popupRef = React.createRef<Popup>();

  public componentDidUpdate(prevProps: HintProps) {
    if (!this.props.manual) {
      return;
    }
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }
    if (this.props.opened !== prevProps.opened) {
      this.setState({ opened: !!this.props.opened });
    }
  }

  public componentWillUnmount() {
    if (this.timer) {
      clearTimeout(this.timer);
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
                  popupPinOffset: theme.hintPinOffset,
                  popupMargin: theme.hintMargin,
                  popupBorder: theme.hintBorder,
                  popupBorderRadius: theme.hintBorderRadius,
                },
                this.theme,
              )}
            >
              {this.isMobileLayout ? this.renderMobile() : this.renderMain()}
            </ThemeContext.Provider>
          );
        }}
      </ThemeContext.Consumer>
    );
  }

  public renderMobile() {
    return (
      <CommonWrapper {...this.props}>
        <Popup
          opened={this.state.opened}
          anchorElement={this.props.children}
          positions={[]}
          onClick={!this.props.manual ? this.open : undefined}
          mobileOnCloseRequest={!this.props.manual ? this.close : undefined}
        >
          {this.renderContent()}
        </Popup>
      </CommonWrapper>
    );
  }

  public renderMain() {
    return (
      <CommonWrapper rootNodeRef={this.setRootNode} {...this.props}>
        <Popup
          hasPin
          opened={this.state.opened}
          anchorElement={this.props.children}
          positions={this.getPositions()}
          backgroundColor={this.theme.hintBgColor}
          borderColor={HINT_BORDER_COLOR}
          disableAnimations={this.props.disableAnimations}
          onMouseEnter={this.handleMouseEnter}
          onMouseLeave={this.handleMouseLeave}
          useWrapper={this.props.useWrapper}
          ref={this.popupRef}
        >
          {this.renderContent()}
        </Popup>
      </CommonWrapper>
    );
  }

  public getAnchorElement = (): Nullable<HTMLElement> => {
    return this.popupRef.current?.anchorElement;
  };

  private renderContent() {
    if (!this.props.text) {
      return null;
    }

    const { pos, maxWidth } = this.props;
    const className = cx({
      [styles.content(this.theme)]: true,
      [styles.contentCenter(this.theme)]: pos === 'top' || pos === 'bottom',
      [styles.mobileContent(this.theme)]: this.isMobileLayout,
    });
    return (
      <div className={className} style={{ maxWidth: this.isMobileLayout ? '100%' : maxWidth }}>
        {this.props.text}
      </div>
    );
  }

  private getPositions = (): PopupPositionsType[] => {
    return Positions.filter((x) => x.startsWith(this.getProps().pos));
  };

  private handleMouseEnter = (e: MouseEventType) => {
    if (!this.props.manual && !this.timer) {
      this.timer = window.setTimeout(this.open, 400);
    }

    if (this.props.onMouseEnter) {
      this.props.onMouseEnter(e);
    }
  };

  private handleMouseLeave = (e: MouseEventType) => {
    if (!this.props.manual && this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
      this.setState({ opened: false });
    }

    if (this.props.onMouseLeave) {
      this.props.onMouseLeave(e);
    }
  };

  private close = () => {
    this.setState({ opened: false });
  };

  private open = () => {
    this.setState({ opened: true });
  };
}
