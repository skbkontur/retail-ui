import classNames from 'classnames';
import * as React from 'react';

import * as PropTypes from 'prop-types';

import polyfillPlaceholder from '../polyfillPlaceholder';
import '../ensureOldIEClassName';
import throttle from 'lodash.throttle';
import LayoutEvents from '../../lib/LayoutEvents';
import { getTextAreaHeight } from './TextareaHelpers';

import { TextareaAdapter } from './Textarea.adapter';
import { Nullable, Override } from '../../typings/utility-types';

import Upgrades from '../../lib/Upgrades';
import CssStyles from './Textarea.less';

const isFlatDesign = Upgrades.isFlatDesignEnabled();

const styles: typeof CssStyles = isFlatDesign ? require('./Textarea.flat.less') : require('./Textarea.less');

const DEFAULT_WIDTH = 250;

export type TextareaProps = Override<
  React.TextareaHTMLAttributes<HTMLTextAreaElement>,
  {
    /** Ошибка */
    error?: boolean;
    /** Предупреждение */
    warning?: boolean;
    /** Не активное состояние */
    disabled?: boolean;

    /**
     * Атоматический ресайз
     * в зависимости от содержимого
     */
    autoResize?: boolean;
    /**
     * Число строк
     */
    rows: number;
    /**
     * Максимальное число строк при
     * автоматическом ресайзе
     */
    maxRows: string | number;

    /**
     * Стандартный ресайз
     * Попадает в `style`
     */
    resize?: React.CSSProperties['resize'];

    /**
     * Ширина
     */
    width?: React.CSSProperties['width'];

    /**
     * Обработчик события `change`
     */
    onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>, value: string) => void;

    /** Выделение значения при фокусе */
    selectAllOnFocus?: boolean;
  }
>;

export interface TextareaState {
  polyfillPlaceholder: boolean;
  rows: number | string;
}

/**
 * Компонент для ввода многострочного текста.
 *
 * Принимает все атрибуты `React.TextareaHTMLAttributes<HTMLTextAreaElement>`
 *
 * ** `className` и `style`  игнорируются**
 */
class Textarea extends React.Component<TextareaProps, TextareaState> {
  public static propTypes = {
    error: PropTypes.bool,
    warning: PropTypes.bool,
    disabled: PropTypes.bool,

    autoResize: PropTypes.bool,
    maxRows: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),

    resize: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),

    id: PropTypes.string,
    name: PropTypes.string,
    title: PropTypes.string,
    spellCheck: PropTypes.bool,
    role: PropTypes.string,
    maxLength: PropTypes.number,
    tabIndex: PropTypes.number,
    rows: PropTypes.number,
    placeholder: PropTypes.string,

    value: PropTypes.string,
    defaultValue: PropTypes.string,
    onChange: PropTypes.func,

    onMouseEnter: PropTypes.func,
    onMouseLeave: PropTypes.func,
    onMouseOver: PropTypes.func,
    onMouseMove: PropTypes.func,
    onMouseOut: PropTypes.func,

    onMouseUp: PropTypes.func,
    onMouseDown: PropTypes.func,
    onClick: PropTypes.func,
    onDoubleClick: PropTypes.func,

    onKeyDown: PropTypes.func,
    onKeyPress: PropTypes.func,
    onKeyUp: PropTypes.func,
    onInput: PropTypes.func,

    onFocus: PropTypes.func,
    onBlur: PropTypes.func,

    onScroll: PropTypes.func,
    onWheel: PropTypes.func,

    onCut: PropTypes.func,
    onPaste: PropTypes.func,
    onCopy: PropTypes.func,
  };

  public static defaultProps = {
    rows: 3,
    maxRows: 15,
  };

  public static __ADAPTER__: typeof TextareaAdapter;

  public state = {
    polyfillPlaceholder,
    rows: 1,
  };

  private node: Nullable<HTMLTextAreaElement>;
  private fakeNode: Nullable<HTMLTextAreaElement>;
  private layoutEvents: Nullable<{ remove: () => void }>;

  public componentDidMount() {
    if (this.props.autoResize) {
      this.autoResize();
      this.layoutEvents = LayoutEvents.addListener(this.autoResize);
    }
  }

  public componentWillUnmount() {
    if (this.layoutEvents) {
      this.layoutEvents.remove();
    }
  }

  public componentDidUpdate(prevProps: TextareaProps) {
    if ((this.props.autoResize && this.props.rows > this.state.rows) || this.props.value !== prevProps.value) {
      this.autoResize();
    }
  }

  public render() {
    const {
      width = DEFAULT_WIDTH,
      error,
      warning,
      autoResize,
      resize,
      onCut,
      onPaste,
      maxRows,
      onFocus,
      selectAllOnFocus,
      className,
      style,
      placeholder,
      ...textareaProps
    } = this.props;

    const rootProps = {
      style: {
        width,
      },
    };

    const textareaClassNames = classNames({
      [styles.textarea]: true,
      [styles.error]: error,
      [styles.warning]: warning,
    });

    const textAreaStyle = {
      resize: autoResize ? 'none' : resize,
    };

    let placeholderPolyfill = null;

    if (this.state.polyfillPlaceholder && !textareaProps.value) {
      placeholderPolyfill = <span className={styles.placeholder}>{placeholder}</span>;
    }

    let fakeTextarea = null;
    if (autoResize) {
      const fakeProps = {
        value: this.props.value,
        defaultValue: this.props.defaultValue,
        className: classNames(textareaClassNames, styles.fake),
        readOnly: true,
      };
      fakeTextarea = <textarea {...fakeProps} ref={this.refFake} />;
    }

    return (
      <label
        {...rootProps}
        className={classNames(styles.root, {
          [styles.size16]: Upgrades.isSizeMedium16pxEnabled(),
        })}
      >
        {placeholderPolyfill}
        <textarea
          {...textareaProps}
          className={textareaClassNames}
          style={textAreaStyle}
          placeholder={!placeholderPolyfill ? placeholder : undefined}
          ref={this.ref}
          onChange={this.handleChange}
          onCut={this.handleCut}
          onPaste={this.handlePaste}
          onFocus={this.handleFocus}
        />
        {fakeTextarea}
      </label>
    );
  }

  /**
   * @public
   */
  public focus() {
    if (this.node) {
      this.node.focus();
    }
  }

  /**
   * @public
   */
  public blur() {
    if (this.node) {
      this.node.blur();
    }
  }

  /**
   * @public
   */
  public setSelectionRange = (start: number, end: number) => {
    if (!this.node) {
      throw new Error('Cannot call "setSelectionRange" on unmounted Input');
    }

    if (document.activeElement !== this.node) {
      this.focus();
    }

    this.node.setSelectionRange(start, end);
  };

  /**
   * @public
   */
  public selectAll = () => {
    if (this.node) {
      this.setSelectionRange(0, this.node.value.length);
    }
  };

  private handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (polyfillPlaceholder) {
      const fieldIsEmpty = event.target!.value === '';

      if (this.state.polyfillPlaceholder !== fieldIsEmpty) {
        this.setState({ polyfillPlaceholder: fieldIsEmpty });
      }
    }

    if (this.props.onChange) {
      this.props.onChange(event, event.target.value);
    }

    if (this.props.autoResize) {
      this.autoResize();
    }
  };

  private ref = (element: HTMLTextAreaElement) => {
    this.node = element;
  };

  private refFake = (element: HTMLTextAreaElement) => {
    this.fakeNode = element;
  };

  // tslint:disable-next-line:member-ordering
  private autoResize = throttle(() => {
    const fakeNode = this.fakeNode;
    if (!fakeNode) {
      return;
    }
    const node = this.node;
    if (!node) {
      return;
    }
    if (this.props.value === undefined) {
      fakeNode.value = node.value;
    }

    const { rows, maxRows } = this.props;
    if (rows === undefined || maxRows === undefined) {
      return;
    }
    const { height, exceededMaxHeight } = getTextAreaHeight(
      fakeNode,
      typeof rows === 'number' ? rows : parseInt(rows, 10),
      typeof maxRows === 'number' ? maxRows : parseInt(maxRows, 10),
    );
    node.style.height = height + 'px';
    node.style.overflowY = exceededMaxHeight ? 'scroll' : 'hidden';
    fakeNode.style.overflowY = exceededMaxHeight ? 'scroll' : 'hidden';
  }, 100);

  private handleCut = (event: React.ClipboardEvent<HTMLTextAreaElement>) => {
    if (this.props.autoResize) {
      this.autoResize();
    }

    if (this.props.onPaste) {
      this.props.onPaste(event);
    }
  };

  private handlePaste = (event: React.ClipboardEvent<HTMLTextAreaElement>) => {
    if (this.props.autoResize) {
      this.autoResize();
    }

    if (this.props.onCut) {
      this.props.onCut(event);
    }
  };

  private handleFocus = (event: React.FocusEvent<HTMLTextAreaElement>) => {
    if (this.props.selectAllOnFocus) {
      this.selectAll();
    }

    if (this.props.onFocus) {
      this.props.onFocus(event);
    }
  };
}

export default Textarea;
