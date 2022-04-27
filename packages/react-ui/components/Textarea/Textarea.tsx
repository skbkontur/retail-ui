import React, { ReactNode } from 'react';
import PropTypes from 'prop-types';
import throttle from 'lodash.throttle';
import raf from 'raf';

import { isKeyEnter } from '../../lib/events/keyboard/identifiers';
import { needsPolyfillPlaceholder } from '../../lib/needsPolyfillPlaceholder';
import * as LayoutEvents from '../../lib/LayoutEvents';
import { Nullable, Override } from '../../typings/utility-types';
import { ThemeContext } from '../../lib/theming/ThemeContext';
import { Theme } from '../../lib/theming/Theme';
import { RenderLayer } from '../../internal/RenderLayer';
import { ResizeDetector } from '../../internal/ResizeDetector';
import { isBrowser, isIE11 } from '../../lib/client';
import { CommonProps, CommonWrapper, CommonWrapperRestProps } from '../../internal/CommonWrapper';
import { isTestEnv } from '../../lib/currentEnvironment';
import { cx } from '../../lib/theming/Emotion';
import { rootNode, TSetRootNode } from '../../lib/rootNode';

import { getTextAreaHeight } from './TextareaHelpers';
import { styles } from './Textarea.styles';
import { TextareaCounter, TextareaCounterRef } from './TextareaCounter';

const DEFAULT_WIDTH = 250;
const AUTORESIZE_THROTTLE_DEFAULT_WAIT = 100;

export interface TextareaProps
  extends CommonProps,
    Override<
      React.TextareaHTMLAttributes<HTMLTextAreaElement>,
      {
        /**
         * Состояние валидации при ошибке.
         */
        error?: boolean;
        /**
         * Состояние валидации при предупреждении.
         */
        warning?: boolean;
        /** Не активное состояние */
        disabled?: boolean;

        /**
         * Автоматический ресайз
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
         * Вызывается при изменении `value`
         */
        onValueChange?: (value: string) => void;

        /** Выделение значения при фокусе */
        selectAllOnFocus?: boolean;

        /** Показывать счетчик символов */
        showLengthCounter?: boolean;

        /** Допустимое количество символов в поле. Отображается в счетчике.
         * Если не указано, равно `maxLength`
         */
        lengthCounter?: number;

        /** Подсказка к счетчику символов.
         *
         * По умолчанию - тултип с содержимым из пропа, если передан`ReactNode`.
         *
         * Передав функцию, можно переопределить подсказку целиком, вместе с иконкой. Например,
         *
         * ```
         * counterHelp={() => <Tooltip render={...}><HelpIcon /></Tooltip>}
         * ```
         * */
        counterHelp?: ReactNode | (() => ReactNode);

        /** Добавлять дополнительную свободную строку при авто-ресайзе.
         * @see https://guides.kontur.ru/components/textarea/#04
         * */
        extraRow: boolean;

        /** Отключать анимацию при авто-ресайзе.
         * Автоматически отключается когда в `extraRow` передан `false`.
         */
        disableAnimations: boolean;
      }
    > {}

export interface TextareaState {
  needsPolyfillPlaceholder: boolean;
  isCounterVisible: boolean;
}

/**
 * Компонент для ввода многострочного текста.
 *
 * Принимает все атрибуты `React.TextareaHTMLAttributes<HTMLTextAreaElement>`
 *
 * ** `className` и `style`  игнорируются**
 */
@rootNode
export class Textarea extends React.Component<TextareaProps, TextareaState> {
  public static __KONTUR_REACT_UI__ = 'Textarea';

  public static propTypes = {
    error: PropTypes.bool,
    warning: PropTypes.bool,
    disabled: PropTypes.bool,

    autoResize: PropTypes.bool,
    extraRow: PropTypes.bool,
    disableAnimations: PropTypes.bool,
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
    onValueChange: PropTypes.func,

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
    extraRow: true,
    disableAnimations: isTestEnv,
  };

  public state = {
    needsPolyfillPlaceholder: needsPolyfillPlaceholder,
    isCounterVisible: false,
  };
  private reflowCounter = () => {
    if (this.counter) {
      this.counter.reflow();
    }
  };

  private theme!: Theme;
  private selectAllId: number | null = null;
  private node: Nullable<HTMLTextAreaElement>;
  private fakeNode: Nullable<HTMLTextAreaElement>;
  private counter: Nullable<TextareaCounterRef>;
  private layoutEvents: Nullable<{ remove: () => void }>;
  private textareaObserver = isBrowser ? new MutationObserver(this.reflowCounter) : null;
  private setRootNode!: TSetRootNode;
  private getAutoResizeThrottleWait(props: TextareaProps = this.props): number {
    // NOTE: При отключении анимации остается эффект дергания при авто-ресайзе из-за троттлинга расчета высоты
    // Поэтому выставляем таймаут троттла в ноль. Подробности - https://github.com/skbkontur/retail-ui/issues/2120
    return this.isAnimationsDisabled(props) ? 0 : AUTORESIZE_THROTTLE_DEFAULT_WAIT;
  }
  private isAnimationsDisabled({ disableAnimations, extraRow }: TextareaProps = this.props): boolean {
    return disableAnimations || !extraRow;
  }

  public componentDidMount() {
    if (this.props.autoResize) {
      this.autoResize();
      this.layoutEvents = LayoutEvents.addListener(this.autoResize);
    }

    if (this.node && this.props.showLengthCounter && this.textareaObserver) {
      this.textareaObserver.observe(this.node, { attributes: true });
    }
  }

  public componentWillUnmount() {
    if (this.layoutEvents) {
      this.layoutEvents.remove();
    }
    if (this.props.showLengthCounter && this.textareaObserver) {
      this.textareaObserver.disconnect();
    }
    this.cancelDelayedSelectAll();
  }

  public componentDidUpdate(prevProps: TextareaProps) {
    if (this.getAutoResizeThrottleWait() !== this.getAutoResizeThrottleWait(prevProps)) {
      this.autoResize.cancel();
      this.autoResize = throttle(this.autoResizeHandler, this.getAutoResizeThrottleWait());
    }
    if (
      this.props.autoResize &&
      (this.props.rows !== prevProps.rows ||
        this.props.maxRows !== prevProps.maxRows ||
        this.props.value !== prevProps.value)
    ) {
      this.autoResize();
    }
  }

  public render() {
    return (
      <ThemeContext.Consumer>
        {(theme) => {
          this.theme = theme;
          return (
            <CommonWrapper rootNodeRef={this.setRootNode} {...this.props}>
              {this.renderMain}
            </CommonWrapper>
          );
        }}
      </ThemeContext.Consumer>
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
   * @param {number} start
   * @param {number} end
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

  private delaySelectAll = (): number => (this.selectAllId = raf(this.selectAll));

  private cancelDelayedSelectAll = (): void => {
    if (this.selectAllId) {
      raf.cancel(this.selectAllId);
      this.selectAllId = null;
    }
  };

  private renderMain = (props: CommonWrapperRestProps<TextareaProps>) => {
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
      placeholder,
      onValueChange,
      showLengthCounter,
      lengthCounter,
      counterHelp,
      extraRow,
      disableAnimations,
      disabled,
      ...textareaProps
    } = props;

    const { isCounterVisible } = this.state;

    const rootProps = {
      style: {
        width,
      },
    };

    const textareaClassNames = cx({
      [styles.textarea(this.theme)]: true,
      [styles.disabled(this.theme)]: disabled,
      [styles.error(this.theme)]: !!error,
      [styles.warning(this.theme)]: !!warning,
      [styles.disableAnimations()]: this.isAnimationsDisabled(),
    });

    const textareaStyle = {
      resize: autoResize ? 'none' : resize,
    };

    let placeholderPolyfill = null;

    if (this.state.needsPolyfillPlaceholder && !textareaProps.value && !textareaProps.defaultValue) {
      placeholderPolyfill = <span className={styles.placeholder()}>{placeholder}</span>;
    }

    let fakeTextarea = null;
    if (autoResize) {
      const fakeProps = {
        value: this.props.value,
        defaultValue: this.props.defaultValue,
        className: cx(textareaClassNames, styles.fake()),
        readOnly: true,
      };
      fakeTextarea = <textarea {...fakeProps} ref={this.refFake} />;
    }

    const counter = showLengthCounter && isCounterVisible && this.node && (
      <TextareaCounter
        textarea={this.node}
        help={counterHelp}
        value={textareaProps.value}
        length={textareaProps.maxLength ?? lengthCounter ?? 0}
        onCloseHelp={this.handleCloseCounterHelp}
        ref={this.refCounter}
      />
    );

    return (
      <RenderLayer
        onFocusOutside={this.handleCloseCounterHelp}
        onClickOutside={this.handleCloseCounterHelp}
        active={this.state.isCounterVisible}
      >
        <label {...rootProps} className={styles.root(this.theme)}>
          {placeholderPolyfill}
          <ResizeDetector onResize={this.reflowCounter}>
            <textarea
              {...textareaProps}
              className={textareaClassNames}
              style={textareaStyle}
              placeholder={!placeholderPolyfill ? placeholder : undefined}
              ref={this.ref}
              onChange={this.handleChange}
              onCut={this.handleCut}
              onPaste={this.handlePaste}
              onFocus={this.handleFocus}
              onKeyDown={this.handleKeyDown}
              disabled={disabled}
            >
              {this.props.children}
            </textarea>
          </ResizeDetector>
          {fakeTextarea}
          {counter}
        </label>
      </RenderLayer>
    );
  };

  private handleCloseCounterHelp = () => this.setState({ isCounterVisible: false });

  private handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // Edge bug: textarea maxlength doesn't work after new line
    // https://developer.microsoft.com/en-us/microsoft-edge/platform/issues/18833616/
    const value = this.props.value !== undefined ? this.props.value.toString() : null;
    const isBlockEnter = isKeyEnter(e) && value !== null && value.length === this.props.maxLength;

    if (isBlockEnter) {
      e.preventDefault();
    }

    if (this.props.onKeyDown) {
      this.props.onKeyDown(e);
    }
  };

  private handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (needsPolyfillPlaceholder) {
      const fieldIsEmpty = e.target.value === '';

      if (this.state.needsPolyfillPlaceholder !== fieldIsEmpty) {
        this.setState({ needsPolyfillPlaceholder: fieldIsEmpty });
      }
    }

    if (this.props.onValueChange) {
      this.props.onValueChange(e.target.value);
    }

    if (this.props.autoResize) {
      this.autoResize();
    }

    if (this.props.onChange) {
      this.props.onChange(e);
    }

    this.reflowCounter();
  };

  private ref = (element: HTMLTextAreaElement) => {
    this.node = element;
  };

  private refFake = (element: HTMLTextAreaElement) => {
    this.fakeNode = element;
  };

  private refCounter = (ref: TextareaCounterRef | null) => {
    this.counter = ref;
  };

  private autoResizeHandler = () => {
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

    const { rows, maxRows, extraRow } = this.props;
    if (rows === undefined || maxRows === undefined) {
      return;
    }
    const { height, exceededMaxHeight } = getTextAreaHeight({
      node: fakeNode,
      minRows: typeof rows === 'number' ? rows : parseInt(rows, 10),
      maxRows: typeof maxRows === 'number' ? maxRows : parseInt(maxRows, 10),
      extraRow,
    });
    node.style.height = height + 'px';
    node.style.overflowY = exceededMaxHeight ? 'scroll' : 'hidden';
    fakeNode.style.overflowY = exceededMaxHeight ? 'scroll' : 'hidden';
  };

  private autoResize = throttle(this.autoResizeHandler, this.getAutoResizeThrottleWait());

  private handleCut = (event: React.ClipboardEvent<HTMLTextAreaElement>) => {
    if (this.props.autoResize) {
      this.autoResize();
    }

    if (this.props.onCut) {
      this.props.onCut(event);
    }

    this.reflowCounter();
  };

  private handlePaste = (event: React.ClipboardEvent<HTMLTextAreaElement>) => {
    if (this.props.autoResize) {
      this.autoResize();
    }

    if (this.props.onPaste) {
      this.props.onPaste(event);
    }

    this.reflowCounter();
  };

  private handleFocus = (event: React.FocusEvent<HTMLTextAreaElement>) => {
    this.setState({ isCounterVisible: true });

    if (this.props.selectAllOnFocus) {
      // https://github.com/facebook/react/issues/7769
      this.node && !isIE11 ? this.selectAll() : this.delaySelectAll();
    }

    if (this.props.onFocus) {
      this.props.onFocus(event);
    }
  };
}
