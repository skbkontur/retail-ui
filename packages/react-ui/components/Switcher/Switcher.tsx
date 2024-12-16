import React, { HTMLAttributes } from 'react';
import PropTypes from 'prop-types';

import { isKeyArrowHorizontal, isKeyArrowLeft, isKeyEnter } from '../../lib/events/keyboard/identifiers';
import { getButtonCorners, Group } from '../Group';
import { Button, ButtonProps } from '../Button';
import { Nullable } from '../../typings/utility-types';
import { ThemeContext } from '../../lib/theming/ThemeContext';
import { Theme } from '../../lib/theming/Theme';
import { CommonProps, CommonWrapper } from '../../internal/CommonWrapper';
import { cx } from '../../lib/theming/Emotion';
import { rootNode, TSetRootNode } from '../../lib/rootNode';
import { SizeProp } from '../../lib/types/props';

import { styles } from './Switcher.styles';
import { getSwitcherTheme } from './switcherTheme';
import { mod } from './helpers';

export type SwitcherItems = string | SwitcherItem;

export const SwitcherDataTids = {
  root: 'Switcher__root',
} as const;

export interface SwitcherProps extends Pick<HTMLAttributes<unknown>, 'role'>, CommonProps {
  /**
   * Список строк или список элементов типа `{ label: string, value: string, buttonProps?: Partial<ButtonProps> }`
   */
  items: SwitcherItems[];

  value?: string;

  onValueChange?: (value: string) => void;

  caption?: string;

  error?: boolean;

  /** Размер */
  size?: SizeProp;

  disabled?: boolean;

  /**
   * Функция для отрисовки элемента. Аргументы — `label`,
   * `value`, `buttonProps`, `renderDefault`, `ariaLabel`
   */
  renderItem?: (
    label: string,
    value: string,
    buttonProps: ButtonProps,
    renderDefault: () => React.ReactNode,
    ariaLabel?: string,
  ) => React.ReactNode;
}

type DefaultProps = Required<Pick<SwitcherProps, 'role'>>;

export interface SwitcherState {
  focusedIndex: Nullable<number>;
}

interface SwitcherItem {
  value: string;
  label: string;
  'aria-label'?: string;
  buttonProps?: Partial<ButtonProps>;
}

@rootNode
export class Switcher extends React.Component<SwitcherProps, SwitcherState> {
  public static __KONTUR_REACT_UI__ = 'Switcher';
  public static displayName = 'Switcher';

  public static defaultProps: DefaultProps = {
    role: 'switch',
  };

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
    renderItem: PropTypes.func,
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
    const inputProps = {
      type: 'checkbox',
      onKeyDown: this.handleKey,
      onFocus: this._handleFocus,
      onBlur: this._handleBlur,
      className: styles.input(),
    };

    const captionClassName = cx(styles.caption(this.theme), this.getLabelSizeClassName());
    const wrapClassName = cx(styles.wrap(), this.props.error && styles.error(this.theme));

    return (
      <CommonWrapper rootNodeRef={this.setRootNode} {...this.props}>
        <div data-tid={SwitcherDataTids.root} className={styles.root()}>
          {this.props.caption ? <div className={captionClassName}>{this.props.caption}</div> : null}
          <div className={wrapClassName}>
            <input {...inputProps} />
            <div>
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
        const { value, buttonProps } = this._extractPropsFromItem(this.props.items[focusedIndex]);
        if (!buttonProps?.disabled) {
          this.selectItem(value);
        }
      }
      return;
    }

    if (isKeyArrowHorizontal(e)) {
      e.preventDefault();
      this.move(isKeyArrowLeft(e));
    }
  };

  private move = (left: boolean) => {
    const selectedIndex = this.state.focusedIndex;

    if (typeof selectedIndex !== 'number') {
      return;
    }
    const newFocusedIndex = this._getNextFocusedIndex(left, selectedIndex);
    this._focus(newFocusedIndex);
  };

  private _getNextFocusedIndex = (left: boolean, focusedIndex: number): number => {
    const { items, disabled } = this.props;
    if (disabled) {
      return focusedIndex;
    }

    for (let i = 1; i < items.length; i++) {
      const index = mod(focusedIndex + (left ? -i : i), items.length);
      const { buttonProps } = this._extractPropsFromItem(items[index]);
      if (!buttonProps?.disabled) {
        return index;
      }
    }
    return focusedIndex;
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
    const { items, value, size, disabled, role, renderItem } = this.props;
    return items.map((item, i) => {
      const {
        'aria-label': ariaLabel,
        label,
        value: itemValue,
        buttonProps: customButtonProps,
      } = this._extractPropsFromItem(item);

      const isChecked = value === itemValue;
      const commonButtonProps = {
        'aria-checked': isChecked,
        role,
        checked: isChecked,
        visuallyFocused: this.state.focusedIndex === i,
        onClick: () => {
          this.selectItem(itemValue);
        },
        disableFocus: true,
        size,
        disabled,
        corners: getButtonCorners(i === 0, i === items.length - 1),
      };

      const buttonProps = {
        ...commonButtonProps,
        ...customButtonProps,
      };

      const renderDefault = () => this.renderDefaultItem(label, itemValue, buttonProps, ariaLabel);

      return renderItem ? renderItem(label, itemValue, buttonProps, renderDefault, ariaLabel) : renderDefault();
    });
  };

  private renderDefaultItem = (label: string, value: string, buttonProps: ButtonProps, ariaLabel?: string) => (
    <Button aria-label={ariaLabel} key={value} {...buttonProps}>
      {label}
    </Button>
  );

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
