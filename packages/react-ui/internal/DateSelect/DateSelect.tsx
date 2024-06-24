import React from 'react';
import PropTypes from 'prop-types';

import { responsiveLayout } from '../../components/ResponsiveLayout/decorator';
import { isNonNullable } from '../../lib/utils';
import { DatePickerLocale, DatePickerLocaleHelper } from '../../components/DatePicker/locale';
import { locale } from '../../lib/locale/decorators';
import { Nullable } from '../../typings/utility-types';
import { Theme } from '../../lib/theming/Theme';
import { ThemeContext } from '../../lib/theming/ThemeContext';
import { createPropsGetter } from '../../lib/createPropsGetter';
import { Select } from '../../components/Select';
import { MenuItem } from '../../components/MenuItem';

import { styles } from './DateSelect.styles';

const defaultMinMonth = 0;
const defaultMaxMonth = 11;
const defaultMinYear = 1900;
const defaultMaxYear = 2099;
const months = Array(defaultMaxMonth - defaultMinMonth + 1)
  .fill(null)
  .map((_, index) => defaultMinMonth + index);
const years = Array(defaultMaxYear - defaultMinYear + 1)
  .fill(null)
  .map((_, index) => defaultMinYear + index);

export interface DateSelectProps {
  disabled?: boolean | null;
  onValueChange: (value: number) => void;
  type?: 'month' | 'year';
  value: number;
  width?: number | string;
  minValue?: number;
  maxValue?: number;
}

export interface DateSelectState {
  botCapped: boolean;
  current: Nullable<number>;
  height: number;
  opened: boolean;
  pos: number;
  top: number;
  topCapped: boolean;
  nodeTop: number;
}

export const DateSelectDataTids = {
  caption: 'DateSelect__caption',
  menuItem: 'DateSelect__menuItem',
  menu: 'DateSelect__menu',
} as const;

type DefaultProps = Required<Pick<DateSelectProps, 'type' | 'width'>>;

@responsiveLayout
@locale('Calendar', DatePickerLocaleHelper)
export class DateSelect extends React.PureComponent<DateSelectProps, DateSelectState> {
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

  public state = {
    botCapped: false,
    current: 0,
    height: 0,
    opened: false,
    pos: 0,
    top: 0,
    topCapped: false,
    nodeTop: Infinity,
  };

  private theme!: Theme;
  private readonly locale!: DatePickerLocale;
  private select: Select<number, number> | null = null;

  /**
   * @public
   */
  public open = () => {
    if (this.props.disabled) {
      return;
    }

    const { select } = this;

    if (select !== null) {
      select.close();
    }
  };

  /**
   * @public
   */
  public close = () => {
    const { select } = this;

    if (select !== null) {
      select.close();
    }
  };

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

  private renderMain() {
    const { value, disabled, onValueChange } = this.getProps();

    return disabled ? (
      <span className={styles.disabled(this.theme)}>{this.getItem(value)}</span>
    ) : (
      <Select
        data-tid={DateSelectDataTids.caption}
        use="text"
        value={value}
        focusOnSelect={false}
        menuAlign="left"
        menuPos="middle"
        menuWidth={this.isYearType ? '100%' : undefined}
        className={styles.enabled(this.theme)}
        renderValue={this.getItem}
        items={this.getItems()}
        menuOffset={parseInt(this.theme.menuPaddingX)}
        onValueChange={onValueChange}
        ref={this.selectRef}
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

  private selectRef = (select: Select<number, number> | null) => {
    this.select = select;
  };

  private getItem = (value: number) => {
    if (this.isYearType) {
      return value;
    }

    return this.locale.months?.[value];
  };
}
