// @flow
/* eslint-disable react/no-multi-comp */
import classNames from 'classnames';
import { EventEmitter } from 'fbemitter';
import * as React from 'react';
import PropTypes from 'prop-types';
import LayoutEvents from '../../lib/LayoutEvents';
import RenderContainer from '../RenderContainer';
import RenderLayer from '../RenderLayer';
import Sticky from '../Sticky';
import ZIndex from '../ZIndex';
import HideBodyVerticalScroll from '../HideBodyVerticalScroll';

import styles from './SidePage.less';

const stack = {
  emitter: new EventEmitter(),
  mounted: []
};

type Props = {
  children?: React.Node,
  blockBackground?: boolean,
  disableClose?: boolean,
  ignoreBackgroundClick?: boolean,
  ignoreFocusOut?: boolean,
  noClose?: boolean,
  width?: number,
  onClose?: () => void
};

type State = {
  stackPosition: number
};

/**
 * Сайдпейдж
 *
 * Содержит в себе три компоненты: **SidePage.Header**,
 * **SidePage.Body** и **SidePage.Footer**
 *
 * Для отображения серой плашки в футере в компонент
 * **Footer** необходимо передать пропс **panel**
 */
class SidePage extends React.Component<Props, State> {
  static propTypes = {
    /**
     * Отключает событие onClose, также дизейблит кнопку закрытия сайдпейджа
     */
    disableClose: PropTypes.bool,

    /**
     * Добавить блокирующий фон, когда сайдпейдж открыт
     */
    blockBackground: PropTypes.bool,

    /**
     * Не закрывать сайдпейдж при клике на фон.
     */
    ignoreBackgroundClick: PropTypes.bool,

    /**
     * Не закрывать сайдпедж при потере фокуса
     */
    ignoreFocusOut: PropTypes.bool,

    /**
     * Задать ширину сайдпейджа
     */
    width: PropTypes.number,

    /**
     * Вызывается, когда пользователь запросил закрытие сайдпейджа (нажал на фон, на
     * Escape или на крестик).
     */
    onClose: PropTypes.func
  };

  static childContextTypes = {
    requestClose: PropTypes.func.isRequired,
    width: PropTypes.number.isRequired
  };

  static Header: Class<Header>;
  static Body: Class<Body>;
  static Footer: Class<Footer>;

  _stackSubscription = null;

  constructor(props: Props, context: mixed) {
    super(props, context);
    stack.mounted.push(this);
    this._stackSubscription = stack.emitter.addListener(
      'change',
      this._handleStackChange
    );
    this.state = {
      stackPosition: stack.mounted.length - 1
    };
  }

  getChildContext() {
    return {
      requestClose: this._requestClose,
      width: this._getWidth()
    };
  }

  _getWidth(): number {
    return this.props.width || this.props.blockBackground ? 800 : 500;
  }

  render() {
    const rootStyle = this.props.blockBackground ? { width: '100%' } : {};
    const sidePageStyle = {
      width: this._getWidth(),
      marginRight:
        this.state.stackPosition === 0 && stack.mounted.length > 1
          ? 20
          : undefined
    };

    return (
      <RenderContainer>
        <ZIndex
          delta={1000}
          className={styles.root}
          onScroll={LayoutEvents.emit}
          style={rootStyle}
        >
          <HideBodyVerticalScroll
            allowScrolling={!this.props.blockBackground}
          />
          {this.props.blockBackground && (
            <div
              className={classNames(
                styles.background,
                this.state.stackPosition === 0 && styles.gray
              )}
            />
          )}
          <RenderLayer onClickOutside={this._handleClickOutside} active={true}>
            <div
              className={classNames(
                styles.container,
                this.state.stackPosition < 2 && styles.shadow
              )}
              style={sidePageStyle}
            >
              {this.props.children}
            </div>
          </RenderLayer>
        </ZIndex>
      </RenderContainer>
    );
  }

  componentDidMount() {
    stack.emitter.emit('change');
  }

  componentWillUnmount() {
    this._stackSubscription && this._stackSubscription.remove();
    const inStackIndex = stack.mounted.findIndex(x => x === this);
    if (inStackIndex !== -1) {
      stack.mounted.splice(inStackIndex, 1);
    }
    stack.emitter.emit('change');
  }

  _handleStackChange = () => {
    const stackPosition = stack.mounted.findIndex(x => x === this);
    this.setState({ stackPosition });
  };

  _handleClickOutside = () => {
    if (
      this.state.stackPosition === stack.mounted.length - 1 &&
      !this.props.ignoreBackgroundClick
    ) {
      this._requestClose();
    }
  };

  _requestClose = () => {
    if (this.props.disableClose) {
      return;
    }
    if (this.props.onClose) {
      this.props.onClose();
    }
  };
}

type HeaderProps = {
  children?: React.Node
};

type HeaderContext = {
  requestClose: () => void
};

class Header extends React.Component<HeaderProps> {
  static contextTypes = {
    requestClose: PropTypes.func.isRequired
  };

  context: HeaderContext;

  render() {
    return (
      <Sticky side="top">
        {fixed => (
          <div className={classNames(styles.header, fixed && styles.fixed)}>
            {this.renderClose()}
            <div className={classNames(styles.title, fixed && styles.fixed)}>
              {this.props.children}
            </div>
          </div>
        )}
      </Sticky>
    );
  }

  renderClose() {
    return (
      <a
        href="javascript:"
        className={styles.close}
        onClick={this.context.requestClose}
      >
        <span className={styles.cross}>×</span>
      </a>
    );
  }
}

type BodyProps = {
  children?: React.Node
};

class Body extends React.Component<BodyProps> {
  render() {
    return this.props.children;
  }
}

type FooterProps = {
  children?: React.Node,
  panel?: boolean
};

type FooterState = {
  left: number
};

type FooterContext = {
  width: number
};

/**
 * Футер модального окна.
 */
class Footer extends React.Component<FooterProps, FooterState> {
  static propTypes = {
    /** Включает серый цвет в футере */
    panel: PropTypes.bool
  };

  static contextTypes = {
    width: PropTypes.number.isRequired
  };

  _layoutSubscription;
  context: FooterContext;

  constructor(props: FooterProps, context: mixed) {
    super(props, context);

    this.state = {
      left: this._getLeft()
    };
  }

  componentDidMount() {
    this._layoutSubscription = LayoutEvents.addListener(() =>
      this.setState({ left: this._getLeft() })
    );
  }

  componentWillUnmount() {
    if (this._layoutSubscription) {
      this._layoutSubscription.remove();
    }
  }

  render() {
    return (
      <Sticky side="bottom">
        {fixed => {
          const names = classNames({
            [styles.footer]: true,
            [styles.panel]: this.props.panel,
            [styles.fixed]: fixed
          });

          return (
            <div className={names} style={{ left: this.state.left }}>
              {this.props.children}
            </div>
          );
        }}
      </Sticky>
    );
  }

  _getLeft(): number {
    const { documentElement } = document;
    return documentElement
      ? documentElement.clientWidth - this.context.width
      : 0;
  }
}

SidePage.Header = Header;
SidePage.Body = Body;
SidePage.Footer = Footer;

export default SidePage;
