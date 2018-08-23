import classNames from 'classnames';
import * as React from 'react';

import * as PropTypes from 'prop-types';

import filterProps from '../filterProps';
import polyfillPlaceholder from '../polyfillPlaceholder';
import '../ensureOldIEClassName';
import throttle from 'lodash.throttle';
import LayoutEvents from '../../lib/LayoutEvents';
import { getTextAreaHeight } from './TextareaHelpers';

import { createPropsGetter } from '../internal/createPropsGetter';
import { TextareaAdapter } from './Textarea.adapter';
import { Nullable } from '../../typings/utility-types';

import Upgrades from '../../lib/Upgrades';
import CssStyles from './Textarea.less';
import { BaseTextFieldProps } from '../../typings/common';

const isFlatDesign = Upgrades.isFlatDesignEnabled();

const styles: typeof CssStyles = isFlatDesign
  ? require('./Textarea.flat.less')
  : require('./Textarea.less');

const PASS_PROPS = {
  autoFocus: true,
  defaultValue: true,
  disabled: true,
  maxLength: true,
  placeholder: !polyfillPlaceholder,
  rows: true,
  title: true,
  value: true,
  id: true,

  onFocus: true,
  onBlur: true,

  onMouseEnter: true,
  onMouseLeave: true,
  onMouseOver: true,

  style: false,
  className: false,
  onChange: false
};

export interface TextareaProps extends BaseTextFieldProps<HTMLTextAreaElement> {
  value?: React.ReactText;
  onChange?: (
    event: React.ChangeEvent<HTMLTextAreaElement>,
    value: string
  ) => void;
  autoResize?: boolean;
  resize?: string;
  rows?: number;
  maxRows?: number | string;
}

export interface TextareaState {
  polyfillPlaceholder: boolean;
  rows: number | string;
}

class Textarea extends React.Component<TextareaProps, TextareaState> {
  public static propTypes = {
    autoFocus: PropTypes.bool,

    autoResize: PropTypes.bool,

    defaultValue: PropTypes.string,

    disabled: PropTypes.bool,

    /**
     * Визуально показать наличие ошибки.
     */
    error: PropTypes.bool,

    id: PropTypes.string,

    maxLength: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),

    maxRows: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),

    placeholder: PropTypes.string,

    resize: PropTypes.string,

    /**
     * Количество строк
     */
    rows: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),

    title: PropTypes.string,

    value: PropTypes.string.isRequired,

    width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),

    onBlur: PropTypes.func,

    onChange: PropTypes.func,

    onFocus: PropTypes.func,

    onMouseEnter: PropTypes.func,

    onMouseLeave: PropTypes.func,

    onMouseOver: PropTypes.func
  };

  public static defaultProps = {
    rows: '3',
    maxRows: '15'
  };

  public static __ADAPTER__: typeof TextareaAdapter;

  public state = {
    polyfillPlaceholder,
    rows: 1
  };

  private getProps = createPropsGetter(Textarea.defaultProps);
  private _node: Nullable<HTMLTextAreaElement>;
  private _fakeNode: Nullable<HTMLTextAreaElement>;
  private _layoutEvents: Nullable<{ remove: () => void }>;

  public componentDidMount() {
    if (this.props.autoResize) {
      this._autoresize();
      this._layoutEvents = LayoutEvents.addListener(this._autoresize);
    }
  }

  public componentWillUnmount() {
    if (this._layoutEvents) {
      this._layoutEvents.remove();
    }
  }

  public componentDidUpdate(prevProps: TextareaProps) {
    if (
      (this.props.autoResize &&
        parseInt(this.getProps().rows, 10) > this.state.rows) ||
      this.props.value !== prevProps.value
    ) {
      this._autoresize();
    }
  }

  public render() {
    const rootProps: React.HTMLProps<HTMLLabelElement> = {};
    const props: React.HTMLProps<HTMLTextAreaElement> = filterProps(
      this.props,
      PASS_PROPS
    );
    props.className = classNames({
      [styles.textarea]: true,
      [styles.error]: this.props.error,
      [styles.warning]: this.props.warning
    });
    props.style = {};

    if (this.props.width) {
      rootProps.style = { width: this.props.width };
    }

    if (this.props.resize) {
      Object.assign(props.style, { resize: this.props.resize });
    }

    let placeholder = null;

    if (this.state.polyfillPlaceholder && !this.props.value) {
      placeholder = (
        <span className={styles.placeholder}>{this.props.placeholder}</span>
      );
    }

    let fakeTextarea = null;
    if (this.props.autoResize) {
      props.onCut = this._autoresize;
      props.onPaste = this._autoresize;
      Object.assign(props.style, { resize: 'none' });
      const fakeProps = {
        value: props.value,
        defaultValue: props.defaultValue,
        className: classNames(props.className, styles.fake),
        readOnly: true
      };
      fakeTextarea = <textarea {...fakeProps} ref={this._refFake} />;
    }

    return (
      <label {...rootProps} className={styles.root}>
        {placeholder}
        <textarea {...props} ref={this._ref} onChange={this._handleChange} />
        {fakeTextarea}
      </label>
    );
  }

  public focus() {
    if (this._node) {
      this._node.focus();
    }
  }

  public blur() {
    if (this._node) {
      this._node.blur();
    }
  }

  private _handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (polyfillPlaceholder) {
      const fieldIsEmpty = event.target!.value === '';

      if (this.state.polyfillPlaceholder !== fieldIsEmpty) {
        this.setState({ polyfillPlaceholder: fieldIsEmpty });
      }
    }

    if (this.props.onChange) {
      this.props.onChange(event, event.target!.value);
    }

    if (this.props.autoResize) {
      this._autoresize();
    }
  };

  private _ref = (element: HTMLTextAreaElement) => {
    this._node = element;
  };

  private _refFake = (element: HTMLTextAreaElement) => {
    this._fakeNode = element;
  };

  // tslint:disable-next-line:member-ordering
  private _autoresize = throttle(() => {
    const fakeNode = this._fakeNode;
    if (!fakeNode) {
      return;
    }
    const node = this._node;
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
      typeof maxRows === 'number' ? maxRows : parseInt(maxRows, 10)
    );
    node.style.height = height + 'px';
    node.style.overflowY = exceededMaxHeight ? 'scroll' : 'hidden';
    fakeNode.style.overflowY = exceededMaxHeight ? 'scroll' : 'hidden';
  }, 100);
}

export default Textarea;
