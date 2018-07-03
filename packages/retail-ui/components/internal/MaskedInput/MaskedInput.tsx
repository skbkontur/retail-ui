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
  public state: MaskedInputState = {
    value: this.props.value || '',
    selection: {
      start: 0,
      end: 0
    }
  };

  private input: Nullable<HTMLInputElement>;

  private mask: any = new InputMask({
    pattern: this.props.mask.replace(/9/g, '1'),
    placeholderChar: this.props.maskChar || ''
  });

  private emptyValue: string = this.mask.emptyValue;

  public componentDidMount() {
    this.mask.pattern.isRevealingMask = true;
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
        prevState.value.toString().length < this.state.value.toString().length
      );
    }
  }

  public render() {
    return (
      <div
        style={{ display: 'flex', flexDirection: 'column', padding: '4px' }}
        className={styles.container}
      >
        <div style={{ position: 'relative' }}>
          <input
            className={styles.container}
            value={this.state.value}
            onChange={this.handleChange}
            style={{
              display: 'inline-block',
              border: '1px solid #d9d9d9',
              borderTopColor: '#b2b2b2',
              fontSize: '14px',
              lineHeight: '20px',
              padding: '6px 10px',
              background: '#fff',
              font: 'inherit'
            }}
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
    let { value } = event.target;

    if (!this.input) {
      return;
    }

    const selection = {
      start: this.input.selectionStart || 0,
      end: this.input.selectionEnd || 0
    };

    if (value.length < this.mask.getValue().length) {
      if (!this.mask.pattern.isEditableIndex(this.input.selectionEnd)) {
        value = value.slice(0, value.length - 1);
      }
    }

    this.mask.setValue(this.getRawValue(value));

    this.setState({
      value: this.mask.getValue(),
      selection
    });
  };

  private getRawValue = (value: string) =>
    value
      .split('')
      .filter((char, index) => {
        const isValidChar = this.mask.input(char);

        if (isValidChar) {
          this.mask.backspace();
          return true;
        }

        return false;
      })
      .join('');

  private moveCaret = (moveBack?: boolean) => {
    if (!this.state.value) {
      return;
    }
    const { start } = this.state.selection;
    let newCaretStart = start;
    // let newCaretEnd = end;

    this.state.value
      .toString()
      .split('')
      .forEach((_char, index) => {
        if (index < start) {
          return;
        }

        if (newCaretStart !== start) {
          return;
        }

        if (this.mask.pattern.isEditableIndex(index)) {
          newCaretStart = index + 1;
        }
      });

    if (this.input) {
      this.input.setSelectionRange(newCaretStart, newCaretStart);
    }

    if (moveBack) {
      return;
    }
  };
}
