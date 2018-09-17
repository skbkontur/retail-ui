import classNames from 'classnames';
import * as React from 'react';

import Popup, { PopupPosition } from '../Popup';
import { ieVerison } from '../ensureOldIEClassName';
import { createPropsGetter } from '../internal/createPropsGetter';

import styles = require('./HintBox.less');
import { Nullable, TimeoutID } from '../../typings/utility-types';

const bgColor = ieVerison === 8 ? '#5b5b5b' : 'rgba(51, 51, 51, 0.8)';

export interface HintProps {
  children?: React.ReactNode;
  manual?: boolean;
  maxWidth?: React.CSSProperties['maxWidth'];
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
    maxWidth: 200,
    onMouseEnter: (e: React.MouseEvent<HTMLElement>) => undefined,
    onMouseLeave: (e: React.MouseEvent<HTMLElement>) => undefined
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
      <span
        onMouseEnter={this._handleMouseEnter}
        onMouseLeave={this._handleMouseLeave}
        className={classNames(styles.root)}
        ref={this._ref}
      >
        {this.props.children}
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

  private _ref = (el: Nullable<HTMLElement>) => {
    this._dom = el;
  };

  private _getPositions = (): PopupPosition[] => {
    return Positions.filter(x => x.startsWith(this.getProps().pos));
  };

  private _handleMouseEnter = (e: React.MouseEvent<HTMLSpanElement>) => {
    if (!this.props.manual && !this._timer) {
      this._timer = window.setTimeout(this._open, 400);
    }
    this.getProps().onMouseEnter(e);
  };

  private _handleMouseLeave = (e: React.MouseEvent<HTMLSpanElement>) => {
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
