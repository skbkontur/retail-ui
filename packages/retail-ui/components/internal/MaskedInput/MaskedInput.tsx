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
  maskChar: InputProps['maskChar'];
  alwaysShowMask: InputProps['alwaysShowMask'];
};

export interface MaskedInputState {
  value: React.InputHTMLAttributes<HTMLInputElement>['value'];
  selection: Selection;
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
      }
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
      prevState.value !== this.state.value &&
      this.state.value &&
      prevState.value
    ) {
      this.moveCaret(
        prevState.value.toString().length > this.state.value.toString().length
      );
    }
  }

  public render() {
    const { mask, maskChar, alwaysShowMask, ...inputProps } = this.props;
    return (
      <div className={styles.container}>
        <div style={{ position: 'relative' }}>
          <input
            {...inputProps}
            value={this.state.value}
            onChange={this.handleChange}
            ref={element => {
              this.input = element;
            }}
          />
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
        </div>
      </div>
    );
  }

  private handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    let { value } = event.target;

    if (!this.input) {
      return;
    }

    const selection = {
      start: this.input.selectionStart || 0,
      end: this.input.selectionEnd || 0
    };

    if (value.length < this.mask.getValue().length) {
      if (
        selection.end &&
        selection.end === value.length &&
        !this.mask.pattern.isEditableIndex(selection.end)
      ) {
        value = value.slice(0, selection.end - 1);
      }
    }

    this.mask.setValue(this.getRawValue(value));

    event.persist();

    this.setState(
      {
        value: this.mask.getValue(),
        selection
      },
      () => {
        if (this.props.onChange) {
          this.props.onChange(event);
        }
      }
    );
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

  private moveCaret = (moveBack?: boolean) => {
    if (!this.state.value) {
      return;
    }
    const { start } = this.state.selection;
    const valueBuffer = this.state.value.toString().split('');

    if (moveBack) {
      for (let index = start; index > 0; index--) {
        if (this.mask.pattern.isEditableIndex(index) && this.input) {
          this.input.setSelectionRange(index, index);
          break;
        }
      }

      return;
    }

    for (let index = start; index < valueBuffer.length; index++) {
      if (this.mask.pattern.isEditableIndex(index) && this.input) {
        this.input.setSelectionRange(index, index);
        break;
      }
    }
  };
}
