// @flow
import * as React from 'react';
import { findDOMNode } from 'react-dom';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import CalendarIcon from '@skbkontur/react-icons/Calendar';
import filterProps from '../filterProps';
import Picker from './Picker';
import DateInput from './DateInput';
import dateParser from './dateParser';
import DropdownContainer from '../DropdownContainer/DropdownContainer';
import RenderLayer from '../RenderLayer';
import Center from '../Center';
import warning from 'warning';
import styles from './DatePickerOld.module.less';
import { isIE } from '../ensureOldIEClassName';

const INPUT_PASS_PROPS = {
  autoFocus: true,
  disabled: true,
  warning: true,
  error: true,
  withMask: true,
  placeholder: true,
  size: true,

  onInput: true,
  onKeyDown: true,
  onKeyPress: true,
  onKeyUp: true,

  onMouseEnter: true,
  onMouseLeave: true,
  onMouseOver: true,
};

/**
 * @deprecated Компонент устарел и будет удален в версии 2.0.0. Используйте актульный [DatePicker](#/Components/DatePicker).
 */
class DatePickerOld extends React.Component {
  static __KONTUR_REACT_UI__ = 'DatePickerOld';
  static __REACT_UI_COMPONENT_NAME__ = 'DatePicker';

  static propTypes = {
    disabled: PropTypes.bool,

    error: PropTypes.bool,

    /**
     * Максимальный год в селекте для года.
     */
    maxYear: PropTypes.number,

    menuAlign: PropTypes.oneOf(['left', 'right']),

    /**
     * Минимальный год в селекте для года.
     */
    minYear: PropTypes.number,

    value: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]),

    warning: PropTypes.bool,

    width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),

    /**
     * Маска ввода 99.99.9999
     */
    withMask: PropTypes.bool,

    onBlur: PropTypes.func,

    onChange: PropTypes.func,

    onFocus: PropTypes.func,

    onInput: PropTypes.func,

    onKeyDown: PropTypes.func,

    onKeyPress: PropTypes.func,

    onKeyUp: PropTypes.func,

    onMouseEnter: PropTypes.func,

    onMouseLeave: PropTypes.func,

    onMouseOver: PropTypes.func,

    /**
     * Если не получилось распарсить дату,
     * можно получить содержимое инпута
     * (например, для валидации снаружи)
     */
    onUnexpectedInput: PropTypes.func,
  };

  static defaultProps = {
    minYear: 1900,
    maxYear: 2100,
    width: 120,
    withMask: true,
    onUnexpectedInput: () => null,
  };

  input;

  _focusSubscription;
  _focused;

  constructor(props, context) {
    super(props, context);
    const textValue = typeof props.value === 'string' ? props.value : formatDate(props.value);

    this.state = {
      opened: false,
      textValue,
    };

    warning(
      false,
      'DatePickerOld is deprecated and will be removed in v2.0.0. Please, use the actual DatePicker instead.',
    );
  }

  /**
   * @public
   */
  blur() {
    this.handleBlur();
  }

  /**
   * @public
   */
  focus() {
    this.input.selectAll();
    this.handleFocus();
  }

  render() {
    const { opened } = this.state;
    const { value, menuAlign, width } = this.props;

    const date = isDate(value) ? value : null;
    let picker = null;
    if (opened) {
      picker = (
        <DropdownContainer getParent={() => findDOMNode(this)} offsetY={2} align={menuAlign}>
          <Picker value={date} minYear={this.props.minYear} maxYear={this.props.maxYear} onPick={this.handlePick} />
        </DropdownContainer>
      );
    }

    const className = classNames({
      [styles.root]: true,
      [this.props.className || '']: true,
    });
    const iconSize = this.props.size === 'large' ? 16 : 14;
    const openClassName = classNames({
      [styles.openButton]: true,
      [styles.openButtonDisabled]: this.props.disabled,
    });
    return (
      <RenderLayer active={opened}>
        <label className={className} style={{ width }}>
          <DateInput
            {...filterProps(this.props, INPUT_PASS_PROPS)}
            getInputRef={this.getInputRef}
            opened={opened}
            value={this.state.textValue}
            onFocus={this.handleFocus}
            onChange={this.handleChange}
            onSubmit={this._handleSubmit}
            onBlur={this.handleBlur}
          />
          {picker}
          <Center className={openClassName} onMouseDown={e => e.preventDefault()}>
            <CalendarIcon size={iconSize} />
          </Center>
        </label>
      </RenderLayer>
    );
  }

  componentWillReceiveProps({ value: newValue }) {
    const { value: oldValue } = this.props;
    if (newValue && +newValue !== +oldValue) {
      const textValue = typeof newValue === 'string' ? newValue : formatDate(newValue);

      this.setState({ textValue });
    }
  }

  getValue = () => {
    const value = this.props.value;
    if (value instanceof Date) {
      return formatDate(value);
    }
    if (typeof value === 'string') {
      return value;
    }
    return '';
  };

  handleChange = value => {
    this.setState({ textValue: value });
  };

  handleFocus = () => {
    if (this._focused) {
      return;
    }

    this._focused = true;

    this.setState({ opened: true });

    if (this.props.onFocus) {
      this.props.onFocus();
    }
  };

  handleBlur = () => {
    if (!this._focused) {
      return;
    }

    this._focused = false;

    this.close(false);

    this._handleSubmit();

    if (this.props.onBlur) {
      this.props.onBlur();
    }
    this.input.blur();
  };

  _handleSubmit = () => {
    const value = this.state.textValue;
    const date = parseDate(value);
    const newDate = date === null ? getDateValue(value, this.props.onUnexpectedInput) : date;

    const textValue = typeof newDate === 'string' ? newDate : formatDate(newDate);

    this.setState({ textValue });

    if (this.props.onChange) {
      this.props.onChange({ target: { value: newDate } }, newDate);
    }
  };

  handlePick = date => {
    if (this.props.onChange) {
      this.props.onChange({ target: { value: date } }, date);
    }
    this._focused = false;
    this.close(false);
    if (this.props.onBlur) {
      this.props.onBlur();
    }
    if (isIE) {
      // NOTE In IE can't blur input with mask https://github.com/sanniassin/react-input-mask/issues/73
      setTimeout(() => this.input.blur());
    } else {
      this.input.blur();
    }
  };

  handlePickerClose = () => {
    this.close(false);
  };

  close(focus) {
    this.setState({ opened: false }, () => {
      if (focus) {
        this.input.focus();
      }
    });
  }

  getInputRef = ref => {
    this.input = ref;
  };
}

const getDateValue = (value, onUnexpectedInput) => {
  if (value == null) {
    return null;
  }
  if (value instanceof Date) {
    return value;
  }
  const newDate = parseDate(value, false);
  if (newDate) {
    return newDate;
  }
  if (onUnexpectedInput) {
    return onUnexpectedInput(value);
  }
  return null;
};

function isDate(date) /* : boolean %checks */ {
  return date instanceof Date && !isNaN(date.getTime());
}

function formatDate(date) {
  if (!date || !isDate(date)) {
    return '';
  }

  const day = date
    .getUTCDate()
    .toString()
    .padStart(2, '0');
  const month = (date.getUTCMonth() + 1).toString().padStart(2, '0');
  return `${day}.${month}.${date.getUTCFullYear()}`;
}

function parseDate(str, withCorrection) {
  const date = dateParser(str, withCorrection);
  return isDate(date) ? date : null;
}

export default DatePickerOld;
