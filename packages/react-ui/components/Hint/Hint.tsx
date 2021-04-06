import React from 'react';
import cn from 'classnames';

import { ThemeContext } from '../../lib/theming/ThemeContext';
import { ThemeFactory } from '../../lib/theming/ThemeFactory';
import { Theme } from '../../lib/theming/Theme';
import { Popup, PopupPosition } from '../../internal/Popup';
import { Nullable } from '../../typings/utility-types';
import { MouseEventType } from '../../typings/event-types';
import { isTestEnv } from '../../lib/currentEnvironment';
import { CommonWrapper, CommonProps } from '../../internal/CommonWrapper';

import { jsStyles } from './Hint.styles';

const HINT_BACKGROUND_COLOR = 'rgba(51, 51, 51, 0.8)';
const HINT_BORDER_COLOR = 'transparent';

export interface HintProps extends CommonProps {
  children?: React.ReactNode;
  manual?: boolean;
  maxWidth?: React.CSSProperties['maxWidth'];
  onMouseEnter?: (event: MouseEventType) => void;
  onMouseLeave?: (event: MouseEventType) => void;
  opened?: boolean;
  pos:
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
  text: React.ReactNode;
  disableAnimations: boolean;
  useWrapper: boolean;
}

export interface HintState {
  opened: boolean;
}

const Positions: PopupPosition[] = [
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

export class Hint extends React.Component<HintProps, HintState> {
  public static __KONTUR_REACT_UI__ = 'Hint';

  public static defaultProps = {
    pos: 'top',
    manual: false,
    opened: false,
    maxWidth: 200,
    disableAnimations: isTestEnv,
    useWrapper: false,
  };

  public state: HintState = {
    opened: this.props.manual ? !!this.props.opened : false,
  };

  private timer: Nullable<number> = null;
  private theme!: Theme;

  public UNSAFE_componentWillReceiveProps(nextProps: HintProps) {
    if (!nextProps.manual) {
      return;
    }

    if (nextProps.opened !== this.props.opened) {
      this.setState({ opened: !!nextProps.opened });
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
        {theme => {
          this.theme = theme;
          return (
            <ThemeContext.Provider
              value={ThemeFactory.create(
                {
                  popupPinOffset: '8px',
                  popupMargin: '8px',
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
    return (
      <CommonWrapper {...this.props}>
        <Popup
          hasPin
          opened={this.state.opened}
          anchorElement={this.props.children}
          positions={this.getPositions()}
          backgroundColor={HINT_BACKGROUND_COLOR}
          borderColor={HINT_BORDER_COLOR}
          disableAnimations={this.props.disableAnimations}
          onMouseEnter={this.handleMouseEnter}
          onMouseLeave={this.handleMouseLeave}
          useWrapper={this.props.useWrapper}
        >
          {this.renderContent()}
        </Popup>
      </CommonWrapper>
    );
  }

  private renderContent() {
    if (!this.props.text) {
      return null;
    }

    const { pos, maxWidth } = this.props;
    const className = cn({
      [jsStyles.content()]: true,
      [jsStyles.contentCenter()]: pos === 'top' || pos === 'bottom',
    });
    return (
      <div className={className} style={{ maxWidth }}>
        {this.props.text}
      </div>
    );
  }

  private getPositions = (): PopupPosition[] => {
    return Positions.filter(x => x.startsWith(this.props.pos));
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

  private open = () => {
    this.setState({ opened: true });
  };
}
