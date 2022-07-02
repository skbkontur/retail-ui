import React from 'react';
import PropTypes from 'prop-types';

import { isKeyArrowHorizontal, isKeyArrowLeft, isKeyEnter } from '../../lib/events/keyboard/identifiers';
import { Group } from '../Group';
import { Button, ButtonSize } from '../Button';
import { Nullable } from '../../typings/utility-types';
import { ThemeContext } from '../../lib/theming/ThemeContext';
import { Theme } from '../../lib/theming/Theme';
import { CommonProps, CommonWrapper } from '../../internal/CommonWrapper';
import { cx } from '../../lib/theming/Emotion';
import { rootNode, TSetRootNode } from '../../lib/rootNode';

import { styles } from './Switcher.styles';
import { getSwitcherTheme } from './switcherTheme';

export type SwitcherSize = ButtonSize;
type SwitcherItems = string | SwitcherItem;

export const SwitcherDataTids = {
  root: 'Switcher__root',
} as const;

export interface SwitcherProps extends CommonProps {
  /**
   * Список строк или список элементов типа `{ label: string, value: string }`
   */
  items: SwitcherItems[];

  value?: string;

  onValueChange?: (value: string) => void;

  caption?: string;

  error?: boolean;

  /** Размер */
  size?: SwitcherSize;

  disabled?: boolean;
}

export interface SwitcherState {
  focusedIndex: Nullable<number>;
}

interface SwitcherItem {
  label: string;
  value: string;
}

@rootNode
export class Switcher extends React.Component<SwitcherProps, SwitcherState> {
  public static __KONTUR_REACT_UI__ = 'Switcher';

  public static propTypes = {
    error: PropTypes.bool,
    disabled: PropTypes.bool,
    items: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.string),
      PropTypes.arrayOf(
        PropTypes.shape({
          label: PropTypes.string,
          value: PropTypes.string,
        }),
      ),
    ]).isRequired,
    caption: PropTypes.string,
    value: PropTypes.string,
    onValueChange: PropTypes.func,
  };

  public state: SwitcherState = {
    focusedIndex: null,
  };

  private theme!: Theme;
  private setRootNode!: TSetRootNode;

  public render() {
    return (
      <ThemeContext.Consumer>
        {(theme) => {
          this.theme = getSwitcherTheme(theme);
          return <ThemeContext.Provider value={this.theme}>{this.renderMain()}</ThemeContext.Provider>;
        }}
      </ThemeContext.Consumer>
    );
  }

  private renderMain() {
    const listClassName = cx({
      [styles.error(this.theme)]: !!this.props.error,
    });

    const inputProps = {
      type: 'checkbox',
      onKeyDown: this.handleKey,
      onFocus: this._handleFocus,
      onBlur: this._handleBlur,
      className: styles.input(),
    };

    const captionClassName = cx(styles.caption(this.theme), this.getLabelSizeClassName());

    return (
      <CommonWrapper rootNodeRef={this.setRootNode} {...this.props}>
        <div data-tid={SwitcherDataTids.root} className={styles.root()}>
          {this.props.caption ? <div className={captionClassName}>{this.props.caption}</div> : null}
          <div className={styles.wrap()}>
            <input {...inputProps} />
            <div className={listClassName}>
              <Group>{this._renderItems()}</Group>
            </div>
          </div>
        </div>
      </CommonWrapper>
    );
  }

  private selectItem = (value: string) => {
    if (this.props.onValueChange) {
      this.props.onValueChange(value);
    }
  };

  private _extractPropsFromItem = (item: string | SwitcherItem): SwitcherItem => {
    return typeof item === 'object' ? item : { label: item, value: item };
  };

  private _extractValuesFromItems = (): string[] => {
    return this.props.items.map((item) => {
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
      if (this.props.onValueChange) {
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
        disabled: this.props.disabled,
      };
      return (
        <Button key={value} {...buttonProps}>
          {label}
        </Button>
      );
    });
  };

  private getLabelSizeClassName = (): string => {
    switch (this.props.size) {
      case 'large':
        return styles.captionLarge(this.theme);
      case 'medium':
        return styles.captionMedium(this.theme);
      case 'small':
      default:
        return styles.captionSmall(this.theme);
    }
  };
}
