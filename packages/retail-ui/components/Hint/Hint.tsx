import classNames from 'classnames';
import * as React from 'react';

import Popup, { PopupPosition } from '../Popup';

import styles = require('./HintBox.less');
import { Nullable, TimeoutID } from '../../typings/utility-types';

const HINT_BACKGROUND_COLOR = 'rgba(51, 51, 51, 0.8)';

export interface HintProps {
  children?: React.ReactNode;
  manual?: boolean;
  maxWidth?: React.CSSProperties['maxWidth'];
  onMouseEnter?: React.MouseEventHandler<HTMLElement>;
  onMouseLeave?: React.MouseEventHandler<HTMLElement>;
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
    maxWidth: 200
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
    return (
      <span
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
        className={classNames(styles.root)}
        ref={this.captionRef}
      >
        {this.props.children}
        {this.captionNode && (
          <Popup
            hasPin
            opened={this.state.opened}
            anchorElement={this.captionNode}
            positions={this.getPositions()}
            backgroundColor={HINT_BACKGROUND_COLOR}
          >
            {this.renderContent()}
          </Popup>
        )}
      </span>
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

  private handleMouseEnter = (e: React.MouseEvent<HTMLSpanElement>) => {
    if (!this.props.manual && !this.timer) {
      this.timer = window.setTimeout(this.open, 400);
    }

    if (this.props.onMouseEnter) {
      this.props.onMouseEnter(e);
    }
  };

  private handleMouseLeave = (e: React.MouseEvent<HTMLSpanElement>) => {
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
