import React, { createRef } from 'react';
import PropTypes from 'prop-types';

import { responsiveLayout } from '../../components/ResponsiveLayout/decorator';
import { getRandomID, isNonNullable } from '../../lib/utils';
import { DatePickerLocale, DatePickerLocaleHelper } from '../../components/DatePicker/locale';
import { locale } from '../../lib/locale/decorators';
import { Theme } from '../../lib/theming/Theme';
import { ThemeContext } from '../../lib/theming/ThemeContext';
import { cx } from '../../lib/theming/Emotion';
import { createPropsGetter } from '../../lib/createPropsGetter';
import { ButtonParams, Select } from '../../components/Select';
import { MenuItem } from '../../components/MenuItem';
import { ArrowCollapseCVOpenIcon16Regular } from '../icons2022/ArrowCollapseCVOpenIcon/ArrowCollapseCVOpenIcon16Regular';

import { globalClasses, styles } from './DateSelect.styles';

const defaultMinMonth = 0;
const defaultMaxMonth = 11;
const defaultMinYear = 1900;
const defaultMaxYear = 2099;
const months = range(defaultMinMonth, defaultMaxMonth);
const years = range(defaultMinYear, defaultMaxYear);

function range(start: number, end: number) {
  return Array(end - start + 1)
    .fill(null)
    .map((_, index) => start + index);
}

export interface DateSelectProps {
  disabled?: boolean;
  onValueChange: (value: number) => void;
  type?: 'month' | 'year';
  value: number;
  width?: number | string;
  minValue?: number;
  maxValue?: number;
}

export const DateSelectDataTids = {
  caption: 'DateSelect__caption',
  menuItem: 'DateSelect__menuItem',
  menu: 'DateSelect__menu',
} as const;

type DefaultProps = Required<Pick<DateSelectProps, 'type' | 'width'>>;

@responsiveLayout
@locale('Calendar', DatePickerLocaleHelper)
export class DateSelect extends React.PureComponent<DateSelectProps> {
  public static __KONTUR_REACT_UI__ = 'DateSelect';
  public static displayName = 'DateSelect';

  public static propTypes = {
    disabled: PropTypes.bool,

    type: PropTypes.string,

    value: PropTypes.number.isRequired,

    width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),

    onValueChange: PropTypes.func,

    minValue: PropTypes.number,

    maxValue: PropTypes.number,
  };

  public static defaultProps: DefaultProps = {
    type: 'year',
    width: 'auto',
  };

  private getProps = createPropsGetter(DateSelect.defaultProps);

  private get isYearType() {
    return this.getProps().type === 'year';
  }

  private theme!: Theme;
  private readonly locale!: DatePickerLocale;
  private readonly selectRef = createRef<Select<number, number>>();

  public render() {
    return (
      <ThemeContext.Consumer>
        {(theme) => {
          this.theme = theme;
          return this.renderMain();
        }}
      </ThemeContext.Consumer>
    );
  }

  private menuId = DateSelectDataTids.menu + getRandomID();

  private renderButton = (params: ButtonParams) => {
    const { value, disabled } = this.props;
    const width = this.getProps().width;
    const isInteractiveElement = !disabled;
    const Tag = isInteractiveElement ? 'button' : 'span';
    const rootProps = {
      className: cx(styles.root(this.theme), disabled && styles.disabled()),
      style: { width },
      onClick: disabled ? undefined : params.onClick,
      'aria-expanded': isInteractiveElement ? params.opened : undefined,
      'aria-controls': !disabled ? this.menuId : undefined,
      'aria-label': isInteractiveElement
        ? `${this.locale.selectChosenAriaLabel} ${
            this.getProps().type === 'year' ? this.locale.selectYearAriaLabel : this.locale.selectMonthAriaLabel
          } ${this.getItem(value)}`
        : undefined,
    };

    return (
      <Tag {...rootProps}>
        <div data-tid={DateSelectDataTids.caption} className={styles.caption()}>
          {this.getItem(value)}
        </div>
        {isInteractiveElement && (
          <ArrowCollapseCVOpenIcon16Regular className={cx(globalClasses.arrow)} color="#ADADAD" />
        )}
      </Tag>
    );
  };

  public close() {
    this.selectRef.current?.close();
  }

  private renderMain() {
    const { value, disabled, onValueChange } = this.getProps();
    const theme = {
      btnBorderRadiusSmall: this.theme.menuItemBorderRadius,
    };

    return (
      <Select
        use="text"
        value={value}
        ref={this.selectRef}
        theme={theme}
        disabled={disabled}
        _renderButton={this.renderButton}
        menuPos="middle"
        renderValue={this.getItem}
        items={this.getItems()}
        menuOffset={parseInt(this.theme.menuPaddingX) + parseInt(this.theme.menuItemPaddingXSmall)}
        onValueChange={onValueChange}
        aria-label={`${this.locale.selectChosenAriaLabel} ${
          this.isYearType ? this.locale.selectYearAriaLabel : this.locale.selectMonthAriaLabel
        } ${this.getItem(value)}`}
      />
    );
  }

  private isOptionDisabled(option: number) {
    const { minValue, maxValue } = this.getProps();

    if (isNonNullable(maxValue) && isNonNullable(minValue)) {
      return option > maxValue || option < minValue;
    }

    if (isNonNullable(minValue)) {
      return option < minValue;
    }

    if (isNonNullable(maxValue)) {
      return option > maxValue;
    }
  }

  private getItems = () => {
    const { value, onValueChange } = this.getProps();
    const options = this.isYearType ? years : months;

    return options.map((option) => {
      const isSelected = option === value;
      const isOptionDisabled = this.isOptionDisabled(option);

      return (
        <MenuItem
          scrollIntoView={isSelected}
          disabled={isOptionDisabled}
          state={isSelected ? 'selected' : null}
          onClick={() => onValueChange(option)}
          aria-label={`Выбрать ${this.isYearType ? 'год' : 'месяц'} ${this.getItem(option)}`}
          data-tid={DateSelectDataTids.menuItem}
          data-prop-disabled={isOptionDisabled}
          key={option}
        >
          {this.getItem(option)}
        </MenuItem>
      );
    });
  };

  private getItem = (value: number) => {
    if (this.isYearType) {
      return value;
    }

    return this.locale.months?.[value];
  };
}
