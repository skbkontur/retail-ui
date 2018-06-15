import classNames from 'classnames';
import * as React from 'react';

import Popup, { PopupPosition } from '../Popup';
import { ieVerison } from '../ensureOldIEClassName';
import { createPropsGetter } from '../internal/createPropsGetter';

import styles from './HintBox.less';

const bgColor = ieVerison === 8 ? '#5b5b5b' : 'rgba(51, 51, 51, 0.8)';

export interface HintProps {
  children?: React.ReactNode;
  manual?: boolean;
  maxWidth?: string | number;
  onMouseEnter?: React.MouseEventHandler<HTMLElement>;
  onMouseLeave?: React.MouseEventHandler<HTMLElement>;
  opened?: boolean;
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
    maxWidth: 200 as string | number,
    onMouseEnter: (e: React.MouseEvent<HTMLElement>) => {
      /**/
    },
    onMouseLeave: (e: React.MouseEvent<HTMLElement>) => {
      /**/
    }
  };

  public state: {
    opened: boolean;
  } = {
    opened: false
  };

  public getProps = createPropsGetter(Hint.defaultProps);

  private _timer: Nullable<TimeoutID> = null;
  private _dom: Nullable<HTMLElement>;

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
    if (this._timer) {
      clearTimeout(this._timer);
    }
  }

  public render() {
    return (
      <span ref={this._ref} style={{ display: 'inline' }}>
        <span
          onMouseEnter={this._handleMouseEnter}
          onMouseLeave={this._handleMouseLeave}
        >
          {this.props.children}
        </span>
        {this._dom && (
          <Popup
            hasPin
            opened={this.isOpened()}
            anchorElement={this._dom}
            positions={this._getPositions()}
            backgroundColor={bgColor}
          >
            {this._renderContent()}
          </Popup>
        )}
      </span>
    );
  }

  private isOpened() {
    return this.state.opened;
  }

  private _renderContent() {
    const { pos } = this.props;
    const className = classNames({
      [styles.root]: true,
      [styles.rootCenter]: pos === 'top' || pos === 'bottom'
    });
    return <div className={className}>{this.props.text}</div>;
  }

  private _ref = (el: Nullable<HTMLElement>) => {
    this._dom = el;
  };

  private _getPositions = (): PopupPosition[] => {
    return Positions.filter(x => x.startsWith(this.getProps().pos));
  };

  private _handleMouseEnter = (e: React.MouseEvent<HTMLElement>) => {
    if (!this.props.manual && !this._timer) {
      this._timer = global.setTimeout(this._open, 400);
    }
    this.getProps().onMouseEnter(e);
  };

  private _handleMouseLeave = (e: React.MouseEvent<HTMLElement>) => {
    if (!this.props.manual && this._timer) {
      clearTimeout(this._timer);
      this._timer = null;
      this.setState({ opened: false });
    }
    this.getProps().onMouseLeave(e);
  };

  private _open = () => {
    this.setState({ opened: true });
  };
}

export default Hint;
