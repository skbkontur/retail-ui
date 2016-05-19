import classNames from 'classnames';
import events from 'add-event-listener';
import React, {PropTypes} from 'react';

import addClass from '../../lib/dom/addClass';
import Center from '../Center';
import LayoutEvents from '../../lib/LayoutEvents';
import removeClass from '../../lib/dom/removeClass';
import RenderContainer from '../RenderContainer';
import stopPropagation from '../../lib/events/stopPropagation';
import Sticky from '../Sticky';

import styles from './Modal.less';

let mountedModalsCount = 0;

/**
 * Модальное окно.
 */
class Modal extends React.Component {
  static propTypes = {
    /**
     * Не показывать крестик для закрытия окна.
     */
    noClose: PropTypes.bool,

    width: PropTypes.number,

    /**
     * Вызывается, когда пользователь запросил закрытие окна (нажал на фон, на
     * Escape или на крестик).
     */
    onClose: PropTypes.func,
  };

  static childContextTypes = {
    rt_inModal: PropTypes.bool,
  };

  getChildContext() {
    return {rt_inModal: true};
  }

  constructor(props, context) {
    super(props, context);
    this.state = {
      isHeader: this.checkIsHeader(),
    };
  }

  checkIsHeader() {
    let isHeader = false;
    React.Children.forEach(this.props.children, child => {
      if (child.type === Header) {
        isHeader = true;
      }
    });
    return isHeader;
  }

  render() {
    var close = null;
    if (!this.props.noClose) {
      close = (
        <a href="javascript:" className={styles.close}
          onClick={this._handleClose}
        >
          &times;
        </a>
      );
    }

    const style = {};
    if (this.props.width) {
      style.width = this.props.width;
    }
    return (
      <RenderContainer>
        <div className={styles.root}>
          <div className={styles.bg} />
          <Center className={styles.container}
            onClick={this._handleCotanierClick}
            onScroll={() => LayoutEvents.emit()}
          >
            <div className={styles.window} style={style}>
              {!this.state.isHeader && close}
              {React.Children.map(this.props.children, child => {
                if (child.type.name === 'Header') {
                  return React.cloneElement(child, {close});
                }
                return child;
              })}
            </div>
          </Center>
        </div>
      </RenderContainer>
    );
  }

  componentDidMount() {
    events.addEventListener(document, 'keydown', this._handleNativeKey);

    if (mountedModalsCount === 0) {
      addClass(document.body, styles.bodyClass);
      LayoutEvents.emit();
    }
    mountedModalsCount++;
  }

  componentWillUnmount() {
    events.removeEventListener(document, 'keydown', this._handleNativeKey);

    if (--mountedModalsCount === 0) {
      removeClass(document.body, styles.bodyClass);
      LayoutEvents.emit();
    }
  }

  _handleCotanierClick = (event) => {
    if (event.target === event.currentTarget) {
      this._handleClose();
    }
  };

  _handleClose = () => {
    if (this.props.onClose) {
      this.props.onClose();
    }
  };

  _handleNativeKey = (nativeEvent) => {
    if (nativeEvent.keyCode === 27 && this.props.onClose) {
      stopPropagation(nativeEvent);
      this.props.onClose();
    }
  };
}

class Header extends React.Component {
  render() {
    return (
      <Sticky side="top">
        {fixed =>
          <div className={classNames(styles.header, fixed && styles.fixedHeader)}>
            {this.props.close &&
              <div className={styles.absoluteClose}>{this.props.close}</div>}
            {this.props.children}
          </div>
        }
      </Sticky>
    );
  }
}

class Body extends React.Component {
  render() {
    return <div className={styles.body}>{this.props.children}</div>;
  }
}

class Footer extends React.Component {
  static propTypes = {
    panel: PropTypes.bool,
  }

  render() {
    var names = classNames({
      [styles.footer]: true,
      [styles.panel]: this.props.panel,
    });

    return (
      <Sticky side="bottom">
        {fixed =>
          <div className={classNames(names, fixed && styles.fixedFooter)}>
            {this.props.children}
          </div>
        }
      </Sticky>
    );
  }
}

Modal.Header = Header;
Modal.Body = Body;
Modal.Footer = Footer;

module.exports = Modal;
