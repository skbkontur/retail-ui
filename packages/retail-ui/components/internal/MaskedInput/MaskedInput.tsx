import * as React from 'react';
import InputMask from 'inputmask-core';
import { InputProps } from '../../Input';
import styles = require('./MaskedInput.less');

export interface Selection {
  start: number;
  end: number;
}

export type MaskedInputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  mask: string;
  maskChar?: InputProps['maskChar'];
  alwaysShowMask?: InputProps['alwaysShowMask'];
  onInvalidInput?: () => void;
};

export interface MaskedInputState {
  value: React.InputHTMLAttributes<HTMLInputElement>['value'];
  selection: Selection;
  focus: boolean;
}

export default class MaskedInput extends React.Component<
  MaskedInputProps,
  MaskedInputState
> {
  private input: Nullable<HTMLInputElement>;
  private mask: InputMask;
  private emptyValue: string;

  constructor(props: MaskedInputProps) {
    super(props);

    this.mask = new InputMask({
      pattern: props.mask.replace(/9/g, '1'),
      placeholderChar: props.maskChar || ''
    });

    this.emptyValue = this.mask.emptyValue;
    this.mask.pattern.isRevealingMask = true;

    this.mask.setValue(props.value ? props.value.toString() : '');

    this.state = {
      value: this.mask.getValue(),
      selection: {
        start: 0,
        end: 0
      },
      focus: false
    };
  }

  public componentWillReceiveProps(nextProps: MaskedInputProps) {
    if (this.props.value !== nextProps.value) {
      const value = nextProps.value ? nextProps.value.toString() : '';
      this.mask.setValue(value);

      this.setState({ value: this.mask.getValue() });
    }
  }

  public componentDidUpdate(
    _prevProps: MaskedInputProps,
    prevState: MaskedInputState
  ) {
    if (
      prevState.selection.end !== this.state.selection.end &&
      prevState.value !== this.state.value
    ) {
      if (
        this.state.selection.end === this.state.selection.start &&
        this.input
      ) {
        this.input.setSelectionRange(
          this.state.selection.start,
          this.state.selection.end
        );
      }
    }
  }

  public render() {
    const {
      mask,
      maskChar,
      alwaysShowMask,
      onInvalidInput,
      ...inputProps
    } = this.props;

    return (
      <div className={styles.container}>
        <input
          {...inputProps}
          value={this.renderValue()}
          onChange={this.handleChange}
          ref={element => {
            this.input = element;
          }}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
          onSelect={this.handleSelect}
        />
        {this.isMaskVisible() && (
          <span className={styles.inputMask}>
            <span
              style={{
                color: 'transparent'
              }}
            >
              {this.emptyValue.slice(0, this.mask.getValue().length)}
            </span>
            {this.emptyValue.slice(this.mask.getValue().length)}
          </span>
        )}
      </div>
    );
  }

  private isMaskVisible = () =>
    this.props.alwaysShowMask ||
    this.state.focus ||
    !!this.mask.getRawValue().length;

  private handleFocus = (event: React.FocusEvent<HTMLInputElement>) => {
    event.persist();
    this.setState({ focus: true }, () => {
      if (this.props.onFocus) {
        this.props.onFocus(event);
      }
    });
  };

  private handleSelect = (event: React.UIEvent<HTMLInputElement>) => {
    // this.setState({
    //   selection: {
    //     start: event.currentTarget.selectionStart || 0,
    //     end: event.currentTarget.selectionEnd || 0
    //   }
    // });
  };

  private handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    event.persist();
    this.setState({ focus: false }, () => {
      if (this.props.onBlur) {
        this.props.onBlur(event);
      }
    });
  };

  private renderValue = () => {
    return this.isMaskVisible() ? this.state.value : '';
  };

  private handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!this.input) {
      return;
    }

    let { value } = event.target;
    const selection = {
      start: event.currentTarget.selectionStart || 0,
      end: event.currentTarget.selectionEnd || 0
    };

    const isBackspace = selection.start < this.state.selection.start;
    const firstEditableIndex = this.findFirstEditableIndex(
      value,
      selection.start,
      isBackspace ? 'left' : 'right'
    );

    if (selection.start < this.mask.pattern.firstEditableIndex && isBackspace) {
      event.preventDefault();

      this.unexpectedInput();
      this.setState(state => ({
        selection: this.moveCaret(selection, state.value, isBackspace)
      }));

      return;
    }

    if (
      selection.start === selection.end &&
      this.state.value != null &&
      value.length < this.state.value.toString().length
    ) {
      value = value
        .split('')
        .filter((_i, index) => {
          if (isBackspace) {
            return (
              index < (firstEditableIndex || 0) || index >= selection.start
            );
          }

          return (
            index < selection.start ||
            index >= (firstEditableIndex || value.length)
          );
        })
        .join('');
    }

    const rawValue = this.getRawValue(value);
    this.mask.setValue(rawValue);

    if (this.state.value === this.mask.getValue()) {
      this.unexpectedInput();

      return;
    }

    event.persist();
    this.setState(
      {
        value: this.mask.getValue(),
        selection: this.moveCaret(selection, this.mask.getValue(), isBackspace)
      },
      () => {
        if (this.props.onChange) {
          this.props.onChange(event);
        }
      }
    );
  };

  private unexpectedInput = () => {
    if (this.props.onInvalidInput) {
      this.props.onInvalidInput();
    }
  };

  private findFirstEditableIndex = (
    value: string,
    startPos: number,
    direction: 'left' | 'right'
  ): number | null => {
    let editableIndex: number | null = null;

    if (direction === 'left') {
      for (let index = startPos; index >= 0; index--) {
        if (this.mask.pattern.isEditableIndex(index)) {
          editableIndex = index;
          break;
        }
      }
    }

    if (direction === 'right') {
      for (let index = startPos; index <= value.length; index++) {
        if (this.mask.pattern.isEditableIndex(index)) {
          editableIndex = index;
          break;
        }
      }
    }

    return editableIndex;
  };

  private getRawValue = (value: string) => {
    return value
      .split('')
      .filter((char, index) => {
        if (
          index < this.mask.pattern.firstEditableIndex ||
          index > this.mask.pattern.lastEditableIndex
        ) {
          return false;
        }

        const isValidChar = this.mask.input(char);

        if (isValidChar) {
          return this.mask.backspace();
        }

        return false;
      })
      .join('');
  };

  private moveCaret = (
    currentSelection: Selection,
    value: MaskedInputProps['value'],
    moveLeft?: boolean
  ) => {
    const selection = { ...currentSelection };
    if (!value) {
      return selection;
    }

    const firstEditableIndex = this.findFirstEditableIndex(
      value.toString(),
      currentSelection.start,
      moveLeft ? 'left' : 'right'
    );

    if (firstEditableIndex) {
      selection.start = firstEditableIndex;
      selection.end = firstEditableIndex;
    }

    if (!moveLeft) {
      // tslint:disable-next-line:no-console
      console.log(firstEditableIndex);
    }

    return selection;
  };
}
