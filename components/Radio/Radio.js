import classNames from 'classnames';
import React, {PropTypes} from 'react';
import events from 'add-event-listener';

import styles from './Radio.less';

/**
 * Индикатор для радио-кнопок. Используется в RadioGroup. Может быть
 * использована для кастомных радио-кнопок.
 */
class Radio extends React.Component {
  static propTypes = {
    active: PropTypes.bool,
    checked: PropTypes.bool,
    disabled: PropTypes.bool,
    error: PropTypes.bool,
    focused: PropTypes.bool,
    hovered: PropTypes.bool,
    warning: PropTypes.bool,
  };

  static defaultProps = {
    checked: false,
    focused: false,
  };

  constructor(props) {
    super(props);
    this.state = {
      hovered: false,
      pressed: false,
    };
  }

  componentDidMount() {
    events.addEventListener(window, 'mouseup', () => {
      if (this.state.pressed) {
        this.handleMouseUp();
      }
    });
  }

  handleMouseEnter() {
    this.setState({hovered: true});
  }

  handleMouseLeave() {
    this.setState({hovered: false});
  }

  handleMouseDown() {
    this.setState({pressed: true});
  }

  handleMouseUp() {
    this.setState({pressed: false});
  }

  render() {
    var rootClass = classNames({
      [styles.root]: true,
      [styles.pressed]: this.state.pressed,
      [styles.hovered]: this.state.hovered,
      [styles.checked]: this.props.checked,
      [styles.disabled]: this.props.disabled,
      [styles.error]: this.props.error,
      [styles.focused]: this.props.focused,
      [styles.warning]: this.props.warning,
    });

    return (
      <span
        onMouseEnter={this.handleMouseEnter.bind(this)}
        onMouseLeave={this.handleMouseLeave.bind(this)}
        onMouseDown={this.handleMouseDown.bind(this)}
        onMouseUp={this.handleMouseUp.bind(this)}
        className={rootClass}
      />
    );
  }
}

module.exports = Radio;
