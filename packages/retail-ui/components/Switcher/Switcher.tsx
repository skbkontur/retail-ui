import React from 'react';
import PropTypes from 'prop-types';

import { isKeyArrowHorizontal, isKeyArrowLeft, isKeyEnter } from '../../lib/events/keyboard/identifiers';
import { Group } from '../Group';
import { Button, ButtonSize } from '../Button';
import { Nullable } from '../../typings/utility-types';
import { cx } from '../../lib/theming/Emotion';
import { ThemeConsumer } from '../ThemeConsumer';
import { Theme } from '../../lib/theming/Theme';

import { jsStyles } from './Switcher.styles';
import styles from './Switcher.module.less';

export type SwitcherSize = ButtonSize;

export interface SwitcherProps {
  /**
   * Список строк или список элементов типа `{ label: string, value: string }`
   */
  items: Array<string | SwitcherItem>;

  value?: string;

  onChange?: (event: { target: { value: string } }, value: string) => void;

  label?: string;

  error?: boolean;

  /** Размер */
  size?: SwitcherSize;
}

export interface SwitcherState {
  focusedIndex: Nullable<number>;
}

interface SwitcherItem {
  label: string;
  value: string;
}

export class Switcher extends React.Component<SwitcherProps, SwitcherState> {
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

  private theme!: Theme;

  public render() {
    return (
      <ThemeConsumer>
        {theme => {
          this.theme = theme;
          return this.renderMain();
        }}
      </ThemeConsumer>
    );
  }

  private renderMain() {
    const listClassNames = cx({
      [styles.error]: !!this.props.error,
      [jsStyles.error(this.theme)]: !!this.props.error,
    });

    const inputProps = {
      type: 'checkbox',
      onKeyDown: this.handleKey,
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

  private selectItem = (value: string) => {
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

  private move = (step: number) => {
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

  private handleKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const focusedIndex = this.state.focusedIndex;
    if (typeof focusedIndex !== 'number') {
      return;
    }

    if (isKeyEnter(e)) {
      if (this.props.onChange) {
        const { value } = this._extractPropsFromItem(this.props.items[focusedIndex]);
        this.selectItem(value);
      }
      return;
    }

    if (isKeyArrowHorizontal(e)) {
      e.preventDefault();
      this.move(isKeyArrowLeft(e) ? -1 : 1);
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
          this.selectItem(value);
        },
        disableFocus: true,
        size: this.props.size,
      };
      return (
        <Button key={value} {...buttonProps}>
          {label}
        </Button>
      );
    });
  };
}
