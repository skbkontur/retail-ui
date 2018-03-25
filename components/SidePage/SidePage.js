// @flow
/* eslint-disable react/no-multi-comp */
import classNames from 'classnames';
import * as React from 'react';
import PropTypes from 'prop-types';
import LayoutEvents from '../../lib/LayoutEvents';
import RenderContainer from '../RenderContainer';
import RenderLayer from '../RenderLayer';
import Sticky from '../Sticky';
import ZIndex from '../ZIndex';
import HideBodyVerticalScroll from '../HideBodyVerticalScroll';
import ModalStack from '../ModalStack';

import styles from './SidePage.less';

type Props = {
  children?: React.Node,
  blockBackground?: boolean,
  disableClose?: boolean,
  ignoreBackgroundClick?: boolean,
  noClose?: boolean,
  width?: number,
  onClose?: () => void
};

type State = {
  stackPosition?: number,
  hasMarginRight?: boolean,
  hasShadow?: boolean,
  hasBackground?: boolean
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
     * Добавить блокирующий фон, когда сайдпейдж открыт
     */
    blockBackground: PropTypes.bool,

    /**
     * Отключает событие onClose, также дизейблит кнопку закрытия сайдпейджа
     */
    disableClose: PropTypes.bool,

    /**
     * Не закрывать сайдпейдж при клике на фон.
     */
    ignoreBackgroundClick: PropTypes.bool,

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
    requestClose: PropTypes.func.isRequired
  };

  static Header: Class<Header>;
  static Body: Class<Body>;
  static Container: Class<Container>;
  static Footer: Class<Footer>;

  _stackSubscription = null;

  state = {};

  getChildContext() {
    return {
      requestClose: this._requestClose
    };
  }

  componentDidMount() {
    this._stackSubscription = ModalStack.add(this, this._handleStackChange);
  }

  componentWillUnmount() {
    this._stackSubscription && this._stackSubscription.remove();
    ModalStack.remove(this);
  }

  render() {
    const rootStyle = this.props.blockBackground ? { width: '100%' } : {};
    const sidePageStyle = {
      width: this.props.width || (this.props.blockBackground ? 800 : 500),
      marginRight: this.state.hasMarginRight ? 20 : undefined
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
                this.state.hasBackground && styles.gray
              )}
            />
          )}
          <RenderLayer onClickOutside={this._handleClickOutside} active={true}>
            <div
              className={classNames(
                styles.container,
                this.state.hasShadow && styles.shadow
              )}
              style={sidePageStyle}
            >
              <table className={styles.layout}>
                <tbody>{this.props.children}</tbody>
              </table>
            </div>
          </RenderLayer>
        </ZIndex>
      </RenderContainer>
    );
  }

  _handleStackChange = (stack: React.Node[]) => {
    const sidePages = stack.filter(x => x instanceof SidePage);
    const currentIndex = sidePages.findIndex(x => x === this);

    const hasMarginRight =
      sidePages.length > 1 && currentIndex === sidePages.length - 1;
    const hasShadow =
      sidePages.length < 3 || currentIndex > sidePages.length - 3;
    const hasBackground =
      currentIndex === sidePages.length - 1 && stack[0] instanceof SidePage;

    this.setState({
      stackPosition: stack.findIndex(x => x === this),
      hasMarginRight,
      hasShadow,
      hasBackground
    });
  };

  _handleClickOutside = () => {
    if (this.state.stackPosition === 0 && !this.props.ignoreBackgroundClick) {
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
      <tr>
        <td className={styles.layoutItem}>
          <Sticky side="top">
            {fixed => (
              <div className={classNames(styles.header, fixed && styles.fixed)}>
                {this.renderClose()}
                <div
                  className={classNames(styles.title, fixed && styles.fixed)}
                >
                  {this.props.children}
                </div>
              </div>
            )}
          </Sticky>
        </td>
      </tr>
    );
  }

  renderClose() {
    return (
      <a
        href="javascript:"
        className={styles.close}
        onClick={this.context.requestClose}
      >
        <span>×</span>
      </a>
    );
  }
}

type BodyProps = {
  children?: React.Node
};

class Body extends React.Component<BodyProps> {
  render() {
    return (
      <tr className={styles.body}>
        <td className={styles.layoutItem}>{this.props.children}</td>
      </tr>
    );
  }
}

type FooterProps = {
  children?: React.Node,
  panel?: boolean
};

/**
 * Футер модального окна.
 */
class Footer extends React.Component<FooterProps> {
  static propTypes = {
    /** Включает серый цвет в футере */
    panel: PropTypes.bool
  };

  render() {
    return (
      <tr>
        <td className={styles.layoutItem}>
          <Sticky side="bottom">
            {fixed => {
              const names = classNames({
                [styles.footer]: true,
                [styles.panel]: this.props.panel,
                [styles.fixed]: fixed
              });

              return <div className={names}>{this.props.children}</div>;
            }}
          </Sticky>
        </td>
      </tr>
    );
  }
}

type ContainerProps = {
  children?: React.Node
};

class Container extends React.Component<ContainerProps> {
  render() {
    return <div className={styles.bodyContainer}>{this.props.children}</div>;
  }
}

SidePage.Header = Header;
SidePage.Body = Body;
SidePage.Container = Container;
SidePage.Footer = Footer;

export default SidePage;
