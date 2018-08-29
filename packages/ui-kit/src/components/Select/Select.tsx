import * as React from 'react';
import { Override } from '../../lib/types';
import Button from '../Button';
import { ButtonProps } from '../Button/Button';
import PopupMenu from '../internal/PopupMenu/PopupMenu';
import { PopupMenuPosition } from '../internal/PopupMenu/PopupMenuPositions';
import MenuItem from '../MenuItem/MenuItem';
import MenuSeparator from '../MenuSeparator';
import {
  SelectArrow,
  SelectArrowWrapper,
  SelectCaptionInner,
  SelectCaptionWrapper,
  SelectPlaceholder
} from './SelectView';

export type SelectProps<Value, Item> = Override<
  ButtonProps,
  {
    disabled?: boolean;
    placeholder?: React.ReactNode;
    renderValue?: (value: Value | null, item: Item | null) => React.ReactNode;
    renderItem?: (value: Value | null, item: Item | null) => React.ReactNode;
    value?: Value;
    defaultValue?: Value;
    items?: Item[];
    areValuesEqual?: (value1: Value | null, value2: Value | null) => boolean;
    onChange?: (_: any, value: Value) => void;
    menuMaxHeight?: number | string;
    menuWidth?: number | string;
    width?: number | string;
    maxWidth?: number | string;
    menuAlign?: 'left' | 'right';
    filterItem?: (value: Value, item: Item, pattern: string) => boolean;
  }
>;

export interface SelectState<Value> {
  value: Value | null;
}

export default class Select<Value = any, Item = any> extends React.Component<
  SelectProps<Value, Item>,
  SelectState<Value>
> {
  public static defaultProps = {
    areValuesEqual<T>(value1: T | null, value2: T | null) {
      return value1 === value2;
    },
    renderValue(value: any, item: any): React.ReactNode {
      return item;
    },
    placeholder: 'ничего не выбрано'
  };
  public static SEP = () => <MenuSeparator />;
  public static static = (element: React.ReactElement<any> | (() => React.ReactElement<any>)) =>
    element;
  public static Item: React.SFC = ({ children }) => <MenuItem>{children}</MenuItem>;

  constructor(props: SelectProps<Value, Item>) {
    super(props);

    this.state = {
      value: this.props.defaultValue || null
    };
  }

  public render() {
    return (
      <PopupMenu
        caption={this.getCaption()}
        menuMaxHeight={this.props.menuMaxHeight}
        menuWidth={this.props.menuWidth || this.props.width}
        popupHasPin={false}
        popupMargin={0}
        positions={this.getPopupPozitions()}
        disabled={this.props.disabled}
      >
        {this.renderItems()}
      </PopupMenu>
    );
  }

  private getPopupPozitions = (): PopupMenuPosition[] => {
    if (this.props.menuAlign === 'right') {
      return ['bottom right', 'bottom left', 'top right', 'top left'];
    }

    return ['bottom left', 'bottom right', 'top left', 'top right'];
  };

  private getCaption = () => {
    const {
      disabled,
      placeholder,
      renderValue,
      renderItem,
      value,
      defaultValue,
      items,
      areValuesEqual,
      onChange,
      menuMaxHeight,
      menuWidth,
      width,
      maxWidth,
      menuAlign,
      ...rest
    } = this.props;
    return (
      <SelectCaptionWrapper>
        <Button style={{ width, maxWidth }} disabled={disabled} {...rest}>
          <SelectCaptionInner>
            {this.renderLabel()}
            <SelectArrowWrapper>
              <SelectArrow />
            </SelectArrowWrapper>
          </SelectCaptionInner>
        </Button>
      </SelectCaptionWrapper>
    );
  };

  private renderLabel = () => {
    const value = this.getValue();
    const item = this.getItemByValue(value);

    if (item !== null || value !== null) {
      return this.props.renderValue && this.props.renderValue(value, item);
    }

    const { placeholder = Select.defaultProps.placeholder } = this.props;

    return <SelectPlaceholder>{placeholder}</SelectPlaceholder>;
  };

  private renderItems = () => {
    const renderValue = this.props.renderValue || Select.defaultProps.renderValue;
    const currentValue = this.getValue();

    return (
      this.props.items &&
      this.props.items.map((entry, index) => {
        if (React.isValidElement(entry)) {
          return React.cloneElement(entry, { key: index });
        }

        if (typeof entry === 'function') {
          const entryElement = entry();

          if (React.isValidElement(entryElement)) {
            return React.cloneElement(entryElement, { key: index });
          }
        }

        const [value, item, comment] = this.normalizeEntry(entry as Item);
        const areValuesEqual = this.props.areValuesEqual || Select.defaultProps.areValuesEqual;

        return (
          <MenuItem
            key={index}
            comment={comment}
            state={areValuesEqual(value, currentValue) ? 'selected' : null}
            onClick={this.handleClick.bind(this, value)}
          >
            {renderValue(value, item)}
          </MenuItem>
        );
      })
    );
  };

  private getValue = () => {
    if (this.props.value !== undefined) {
      return this.props.value;
    }

    return this.state.value;
  };

  private getItemByValue = (value: Value | null) => {
    if (value === undefined) {
      return null;
    }

    const items = this.props.items || [];

    for (const entry of items) {
      const [itemValue, item] = this.normalizeEntry(entry);
      const areValuesEqual = this.props.areValuesEqual || Select.defaultProps.areValuesEqual;

      if (itemValue !== undefined && areValuesEqual(itemValue, value)) {
        return item;
      }
    }
    return null;
  };

  private normalizeEntry = (entry: Item) => {
    if (Array.isArray(entry)) {
      return entry;
    }

    return [entry, entry, undefined];
  };

  private handleClick = (value: Value) => {
    this.setState(
      {
        value
      },
      () => {
        if (this.props.onChange) {
          this.props.onChange({ target: { value } }, value);
        }
      }
    );
  };
}
