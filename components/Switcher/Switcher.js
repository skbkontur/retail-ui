// @flow

import classNames from 'classnames';
import * as React from 'react';
import PropTypes from 'prop-types';

import styles from './Switcher.less';

type Props = {
  items: Iterable<mixed>,
  value?: string,
  onChange?: (event: { target: { value: mixed } }, value: mixed) => void,
  label?: string,
  error?: boolean
};

type State = {
  focusedIndex: number
};

export const SwitcherItem = {
  title: PropTypes.string,
  value: PropTypes.string
};

class Switcher extends React.Component<Props, State> {
  static propTypes = {
    error: PropTypes.bool,
    items: PropTypes.oneOf(PropTypes.arrayOf(PropTypes.string), PropTypes.arrayOf(SwitcherItem)).isRequired,
    value: PropTypes.string,
    onChange: PropTypes.func
  };

  constructor(props: Props, context: mixed) {
    super(props, context);

    this.state = { focusedIndex: null };
  }

  _selectItem = (value: string) => {
    if (this.props.onChange) {
      this.props.onChange({ target: { value } }, value)
    }
  };

  _extractPropsFromItem = (item: string | SwitcherItem): SwitcherItem => {
    return typeof item === 'object' ? item : {title: item, value: item}
  };

  _extractValuesFromItems = (): Array<string> => {
    return this.props.items.map(item => {
      const {value} = this._extractPropsFromItem(item);
      return value
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

  _handleKey = (event) => {
    const focusedIndex = this.state.focusedIndex;
    if (typeof focusedIndex !== 'number') {
      return;
    }

    if (event.key === 'Enter') {
      if (this.props.onChange) {
        const {value} = this._extractPropsFromItem(this.props.items[focusedIndex]);
        this._selectItem(value);
      }
      return;
    }

    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      this._move(-1);
    }
    else if (event.key === 'ArrowRight') {
      event.preventDefault();
      this._move(1);
    }
  };

  _handleFocus = () => {
    const { value } = this.props;
    const items =  this._extractValuesFromItems();
    const currentIndex = [...items].indexOf(value);
    const index = currentIndex > -1 ? currentIndex : 0;

    this.setState({ focusedIndex: index });
  };

  _handleBlur = () => {
    this.setState({ focusedIndex: null });
  };

  _renderItems = () => {
    return this.props.items.map((item, i) => {
      const {title, value} = this._extractPropsFromItem(item);
      const itemClassNames = classNames({
        [styles.item]: true,
        [styles.focus]: this.state.focusedIndex === i,
        [styles.itemActive]: this.props.value === value
      });
      const itemProps = {
        key: value,
        className: itemClassNames,
        onClick: () => {this._selectItem(value)}
      };

      return (
        <div {...itemProps}>
          {title}
        </div>
      )
    })
  };

  render() {
    const listClassNames = classNames({
      [styles.list]: true,
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
      <div className={styles.root}>
        {
          this.props.label ?
            <div className={styles.label}>
              {this.props.label}
            </div>
            : null
        }
        <div className={styles.wrap}>
          <input {...inputProps} />
          <div className={listClassNames}>
            {this._renderItems()}
          </div>
        </div>
      </div>
    )
  }
}

export default Switcher;
