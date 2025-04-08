import React from 'react';

import { Nullable } from '../../typings/utility-types';
import { EmotionConsumer } from '../../lib/theming/Emotion';

import { getDateForComponent, getDateForNative } from './utils';
import { getStyles } from './NativeDateInput.styles';

export interface NativeDateInputProps {
  onValueChange?: (value: string) => void;
  value: Nullable<string>;
  minDate?: Nullable<string>;
  maxDate?: Nullable<string>;
  disabled?: boolean;
}

const DEFAULT_MIN_DATE = '1900-01-01';
const DEFAULT_MAX_DATE = '2099-12-31';

export class NativeDateInput extends React.Component<NativeDateInputProps> {
  public static __KONTUR_REACT_UI__ = 'NativeDatePicker';
  public static displayName = 'NativeDatePicker';

  private input: Nullable<HTMLInputElement>;

  public render() {
    return (
      <EmotionConsumer>
        {(emotion) => {
          const styles = getStyles(emotion);
          return (
            <input
              type={'date'}
              max={this.props.maxDate ? getDateForNative(this.props.maxDate) : DEFAULT_MAX_DATE}
              min={this.props.minDate ? getDateForNative(this.props.minDate) : DEFAULT_MIN_DATE}
              value={getDateForNative(this.props.value)}
              onChange={(e) => {
                if (this.props.onValueChange) {
                  this.props.onValueChange(getDateForComponent(e.target.value));
                }
              }}
              className={styles.inputTypeDate()}
              ref={this.refInput}
              disabled={this.props.disabled}
              tabIndex={-1}
            />
          );
        }}
      </EmotionConsumer>
    );
  }

  /**
   * @public
   */
  public focus = () => {
    if (this.input) {
      this.input.focus();
    }
  };

  /**
   * @public
   */
  public click = () => {
    if (this.input) {
      this.input.click();
    }
  };

  private refInput = (element: Nullable<HTMLInputElement>) => {
    this.input = element;
  };
}
