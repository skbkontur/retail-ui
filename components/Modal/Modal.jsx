var events = require('add-event-listener');
var React = require('react/addons');

var Center = require('../Center');

var CSSTransitionGroup = React.addons.CSSTransitionGroup;
var PropTypes = React.PropTypes;

require('./Modal.less');
var cx = require('../cx')('RTModal');

var Modal = React.createClass({
  propTypes: {
    /**
     * Функция, которая возвращает содержимое окна.
     *
     * Для оформления можно использовать специальные компоненты:
     * ```
     * function render() {
     *   return (
     *     <div>
     *       <Modal.Header>Title</Modal.Header>
     *       <Modal.Body>Content</Modal.Body>
     *       <Modal.Footer>Buttons</Modal.Footer>
     *     </div>
     *   );
     * }
     * ```
     */
    render: PropTypes.func.isRequired,

    opened: PropTypes.bool,

    /**
     * Не показывать крестик для закрытия окна.
     */
    noClose: PropTypes.bool,

    /**
     * Вызывается, когда пользователь запросил закрытие окна (нажал на фон, на
     * Escape или на крестик).
     */
    onClose: PropTypes.func,
  },

  render() {
    var modal = null;
    if (this.props.opened) {
      modal = <OpenedModal key="one" {...this.props} />;
    }

    return (
      <CSSTransitionGroup transitionName={cx('anim')}>
        {modal}
      </CSSTransitionGroup>
    );
  },
});

var OpenedModal = React.createClass({
  render() {
    var close = null;
    if (!this.props.noClose) {
      close = (
        <a href="javascript:" className={cx('close')}
            onClick={this.handleClose}>
          &times;
        </a>
      );
    }

    return (
      <Center className={cx('')}>
        <div className={cx('bg')} onClick={this.handleClose} />
        <div className={cx('window')}>
          {close}
          {this.props.render()}
        </div>
      </Center>
    );
  },

  componentDidMount() {
    events.addEventListener(document, 'keydown', this.handleNativeKey);
  },

  componentWillUnmount() {
    events.removeEventListener(document, 'keydown', this.handleNativeKey);
  },

  handleClose(event) {
    if (this.props.onClose) {
      this.props.onClose();
    }
  },

  handleNativeKey(event) {
    if (event.keyCode === 27 && this.props.onClose) {
      this.props.onClose();
    }
  },
});

Modal.Header = React.createClass({
  render() {
    return <div className={cx('Header')}>{this.props.children}</div>;
  },
});

Modal.Body = React.createClass({
  render() {
    return <div className={cx('Body')}>{this.props.children}</div>;
  },
});

Modal.Footer = React.createClass({
  render() {
    return <div className={cx('Footer')}>{this.props.children}</div>;
  },
});

module.exports = Modal;
