import * as React from 'react';
import * as PropTypes from 'prop-types';
import Group from '../Group';
import Button from '../Button';
import styles from './Switcher.less';
import { Nullable } from '../../typings/utility-types';
import { cx as classNames } from 'emotion';
import jsStyles from './Switcher.styles';
import ThemeFactory from '../../lib/theming/ThemeFactory';

const theme = ThemeFactory.getDefaultTheme();

export interface SwitcherProps {
  /**
   * Список строк или список элементов типа `{ label: string, value: string }`
   */
  items: Array<string | SwitcherItem>;

  value?: string;

  onChange?: (event: { target: { value: string } }, value: string) => void;

  label?: string;

  error?: boolean;
}

export interface SwitcherState {
  focusedIndex: Nullable<number>;
}

interface SwitcherItem {
  label: string;
  value: string;
}

class Switcher extends React.Component<SwitcherProps, SwitcherState> {
  public static propTypes = {
    error: PropTypes.bool,
    items: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.string),
      PropTypes.arrayOf(
        PropTypes.shape({
          label: PropTypes.string,
          value: PropTypes.string,
        }),
      ),
    ]).isRequired,
    label: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
  };

  public state: SwitcherState = {
    focusedIndex: null,
  };

  public render() {
    const listClassNames = classNames({
      [styles.error]: !!this.props.error,
      [jsStyles.error(theme)]: !!this.props.error,
    });

    const inputProps = {
      type: 'checkbox',
      onKeyDown: this._handleKey,
      onFocus: this._handleFocus,
      onBlur: this._handleBlur,
      className: styles.input,
    };

    return (
      <div>
        {this.props.label ? <div className={styles.label}>{this.props.label}</div> : null}
        <div className={styles.wrap}>
          <input {...inputProps} />
          <div className={listClassNames}>
            <Group>{this._renderItems()}</Group>
          </div>
        </div>
      </div>
    );
  }

  private _selectItem = (value: string) => {
    if (this.props.onChange) {
      this.props.onChange({ target: { value } }, value);
    }
  };

  private _extractPropsFromItem = (item: string | SwitcherItem): SwitcherItem => {
    return typeof item === 'object' ? item : { label: item, value: item };
  };

  private _extractValuesFromItems = (): string[] => {
    return this.props.items.map(item => {
      const { value } = this._extractPropsFromItem(item);
      return value;
    });
  };

  private _move = (step: number) => {
    let selectedIndex = this.state.focusedIndex;

    if (typeof selectedIndex !== 'number') {
      return;
    }

    const items = this._extractValuesFromItems();

    selectedIndex += step;

    if (selectedIndex < 0) {
      selectedIndex = items.length - 1;
    } else if (selectedIndex >= items.length) {
      selectedIndex = 0;
    }

    this._focus(selectedIndex);
  };

  private _focus = (index: number) => {
    this.setState({ focusedIndex: index });
  };

  private _handleKey = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const focusedIndex = this.state.focusedIndex;
    if (typeof focusedIndex !== 'number') {
      return;
    }

    if (event.key === 'Enter') {
      if (this.props.onChange) {
        const { value } = this._extractPropsFromItem(this.props.items[focusedIndex]);
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

  private _handleFocus = () => {
    const { value } = this.props;

    const items = this._extractValuesFromItems();
    const currentIndex = [...items].indexOf(value as string);
    const index = currentIndex > -1 ? currentIndex : 0;

    this.setState({ focusedIndex: index });
  };

  private _handleBlur = () => {
    this.setState({ focusedIndex: null });
  };

  private _renderItems = () => {
    return this.props.items.map((item, i) => {
      const { label, value } = this._extractPropsFromItem(item);
      const buttonProps = {
        checked: this.props.value === value,
        visuallyFocused: this.state.focusedIndex === i,
        onClick: () => {
          this._selectItem(value);
        },
        disableFocus: true,
      };
      return (
        <Button key={value} {...buttonProps}>
          {label}
        </Button>
      );
    });
  };
}

export default Switcher;
