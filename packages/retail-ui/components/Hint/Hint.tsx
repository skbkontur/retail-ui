import classNames from 'classnames';
import * as React from 'react';

import Popup, { PopupPosition, PopupProps } from '../Popup';

import styles = require('./HintBox.less');
import { Nullable, TimeoutID } from '../../typings/utility-types';

const HINT_BACKGROUND_COLOR = 'rgba(51, 51, 51, 0.8)';
const HINT_BORDER_COLOR = 'transparent';
const POPUP_MARGIN = 15;

export interface HintProps {
  children?: React.ReactNode;
  manual?: boolean;
  maxWidth?: React.CSSProperties['maxWidth'];
  onMouseEnter?: (event: React.MouseEvent<HTMLElement> | MouseEvent) => void;
  onMouseLeave?: (event: React.MouseEvent<HTMLElement> | MouseEvent) => void;
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
  'right bottom'
];

class Hint extends React.Component<HintProps, HintState> {
  public static defaultProps = {
    pos: 'top',
    manual: false,
    opened: false,
    maxWidth: 200,
    disableAnimations: false,
    useWrapper: true
  };

  public state: HintState = {
    opened: false
  };

  private timer: Nullable<TimeoutID> = null;
  private captionNode: Nullable<HTMLElement> = null;

  public componentDidMount() {
    this.setState({
      opened: this.props.manual ? !!this.props.opened : false
    });
  }

  public componentWillReceiveProps(nextProps: HintProps) {
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
    }
  }

  public render() {
    if (this.props.useWrapper) {
      return (
        <span
          onMouseEnter={this.handleMouseEnter}
          onMouseLeave={this.handleMouseLeave}
          ref={this.captionRef}
        >
          {this.props.children}
          {this.captionNode && this.renderPopup(this.captionNode)}
        </span>
      );
    } else {
      return this.renderPopup(this.props.children, {
        onMouseEnter: this.handleMouseEnter,
        onMouseLeave: this.handleMouseLeave
      });
    }
  }

  private renderPopup(
    anchorElement: React.ReactNode | HTMLElement,
    popupProps: Partial<PopupProps> = {}
  ) {
    return (
      <Popup
        hasPin
        margin={POPUP_MARGIN}
        opened={this.state.opened}
        anchorElement={anchorElement}
        positions={this.getPositions()}
        backgroundColor={HINT_BACKGROUND_COLOR}
        borderColor={HINT_BORDER_COLOR}
        disableAnimations={this.props.disableAnimations}
        {...popupProps}
      >
        {this.renderContent()}
      </Popup>
    );
  }

  private renderContent() {
    const { pos, maxWidth } = this.props;
    const className = classNames({
      [styles.content]: true,
      [styles.contentCenter]: pos === 'top' || pos === 'bottom'
    });
    return (
      <div className={className} style={{ maxWidth }}>
        {this.props.text}
      </div>
    );
  }

  private captionRef = (element: Nullable<HTMLElement>) => {
    this.captionNode = element;
  };

  private getPositions = (): PopupPosition[] => {
    return Positions.filter(x => x.startsWith(this.props.pos));
  };

  private handleMouseEnter = (
    e: React.MouseEvent<HTMLElement> | MouseEvent
  ) => {
    if (!this.props.manual && !this.timer) {
      this.timer = window.setTimeout(this.open, 400);
    }

    if (this.props.onMouseEnter) {
      this.props.onMouseEnter(e);
    }
  };

  private handleMouseLeave = (
    e: React.MouseEvent<HTMLElement> | MouseEvent
  ) => {
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

export default Hint;
