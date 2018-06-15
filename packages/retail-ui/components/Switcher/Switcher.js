

import classNames from 'classnames';
import * as React from 'react';
import PropTypes from 'prop-types';
import Group from '../Group';
import Button from '../Button';

import styles from './Switcher.less';

type Props = {
  /**
   * Список строк или список элементов типа `{ label: string, value: string }`
   */
  items: Array<string | SwitcherItem>,

  value?: string,

  onChange?: (event: { target: { value: string } }, value: string) => void,

  label?: string,

  error?: boolean
};

type State = {
  focusedIndex: ?number
};

type SwitcherItem = {
  label: string,
  value: string
};

class Switcher extends React.Component<Props, State> {
  static propTypes = {
    error: PropTypes.bool,
    items: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.string),
      PropTypes.arrayOf(
        PropTypes.shape({
          label: PropTypes.string,
          value: PropTypes.string
        })
      )
    ]).isRequired,
    label: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func
  };

  constructor(props: Props, context: mixed) {
    super(props, context);

    this.state = { focusedIndex: null };
  }

  _selectItem = (value: string) => {
    if (this.props.onChange) {
      this.props.onChange({ target: { value } }, value);
    }
  };

  _extractPropsFromItem = (item: string | SwitcherItem): SwitcherItem => {
    return typeof item === 'object' ? item : { label: item, value: item };
  };

  _extractValuesFromItems = (): Array<string> => {
    return this.props.items.map(item => {
      const { value } = this._extractPropsFromItem(item);
      return value;
    });
  };

  _move = (step: number) => {
    let selectedIndex = this.state.focusedIndex;
    const items = this._extractValuesFromItems();

    selectedIndex += step;

    if (selectedIndex < 0) {
      selectedIndex = items.length - 1;
    } else if (selectedIndex >= items.length) {
      selectedIndex = 0;
    }

    this._focus(selectedIndex);
  };

  _focus = (index: number) => {
    this.setState({ focusedIndex: index });
  };

  _handleKey = event => {
    const focusedIndex = this.state.focusedIndex;
    if (typeof focusedIndex !== 'number') {
      return;
    }

    if (event.key === 'Enter') {
      if (this.props.onChange) {
        const { value } = this._extractPropsFromItem(
          this.props.items[focusedIndex]
        );
        this._selectItem(value);
      }
      return;
    }

    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      this._move(-1);
    } else if (event.key === 'ArrowRight') {
      event.preventDefault();
      this._move(1);
    }
  };

  _handleFocus = () => {
    const { value } = this.props;
    const items = this._extractValuesFromItems();
    const currentIndex = [...items].indexOf(value);
    const index = currentIndex > -1 ? currentIndex : 0;

    this.setState({ focusedIndex: index });
  };

  _handleBlur = () => {
    this.setState({ focusedIndex: null });
  };

  _renderItems = () => {
    return this.props.items.map((item, i) => {
      const { label, value } = this._extractPropsFromItem(item);
      const buttonProps = {
        key: value,
        checked: this.props.value === value,
        visuallyFocused: this.state.focusedIndex === i,
        onClick: () => {
          this._selectItem(value);
        },
        disableFocus: true
      };
      return <Button {...buttonProps}>{label}</Button>;
    });
  };

  render() {
    const listClassNames = classNames({
      [styles.error]: this.props.error
    });

    const inputProps = {
      type: 'checkbox',
      onKeyDown: this._handleKey,
      onFocus: this._handleFocus,
      onBlur: this._handleBlur,
      className: styles.input
    };

    return (
      <div>
        {this.props.label ? (
          <div className={styles.label}>{this.props.label}</div>
        ) : null}
        <div className={styles.wrap}>
          <input {...inputProps} />
          <div className={listClassNames}>
            <Group>{this._renderItems()}</Group>
          </div>
        </div>
      </div>
    );
  }
}

export default Switcher;
