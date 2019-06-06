import * as React from 'react';
import { InternalDateComponentType } from '../../lib/date/types';
import { DateInputProps, DateInputState } from './DateInput';
import { removeAllSelections } from './helpers/SelectionHelpers';
import debounce from 'lodash.debounce';

export const DateInputFallback = <T extends { new (...args: any[]): any }>(constructor: T) => {
  return class DateInput extends constructor {
    // Костыль для возможности выделить компоненты даты
    // В IE и Edge, при вызове range.selectNodeContents(node)
    // снимается фокус у текущего элемента, т.е. вызывается handleBlur
    // в handleBlur вызывается window.getSelection().removeAllRanges() и выделение пропадает.
    // Этот флаг "замораживаниет" колбэки onBlur и onFocus, для возможности вернуть выделение сегмента.
    public frozen: boolean = false;

    public selection = debounce(() => {
      const node = this.inputLikeText && this.inputLikeText.getNode();
      if (this.inputLikeText && node && node.contains(document.activeElement)) {
        this.frozen = true;
        this.changeSelectedDateComponent(this.state.selected);
        if (this.inputLikeText) {
          this.inputLikeText.focus();
        }
      }
    }, 10);

    public componentDidUpdate = (prevProps: DateInputProps, prevState: DateInputState) => {
      if (
        prevProps.value !== this.props.value ||
        prevProps.minDate !== this.props.minDate ||
        prevProps.maxDate !== this.props.maxDate
      ) {
        this.updateInternalDate(undefined, {}, this.updateInternalDateFromProps);
      }

      if (prevState.internalDate !== this.state.internalDate) {
        this.emitChange();
      }

      if (this.state.focused && prevState.selected !== this.state.selected) {
        this.selection();
      }

      if (this.state.notify && !prevState.notify) {
        this.notify();
      }
    };

    public handleMouseDown = (event: React.MouseEvent<HTMLElement>) => {
      super.isMouseDown = true;
      if (this.state.focused && !this.frozen) {
        event.preventDefault();
        event.stopPropagation();
      }
    };

    public handleFocus = (event: React.FocusEvent<HTMLElement>): void => {
      if (this.props.disabled) {
        return;
      }
      if (this.frozen) {
        this.frozen = false;
        event.preventDefault();
        return;
      }
      this.setState((prevState: DateInputState) => {
        super.isFirstFocus = !prevState.focused;
        return {
          focused: true,
          selected:
            prevState.selected === null && !this.isMouseDown ? this.getFirstDateComponentType() : prevState.selected,
        };
      });

      if (this.props.onFocus) {
        this.props.onFocus(event);
      }
    };

    public handleBlur = (event: React.FocusEvent<HTMLElement>): void => {
      if (this.frozen) {
        event.preventDefault();
        return;
      }

      event.persist();

      this.setState({ focused: false, selected: null, inputMode: false }, () => {
        removeAllSelections();
        if (this.state.internalDate !== null) {
          this.updateInternalDate(this.state.internalDate.restore());
        }
        if (this.props.onBlur) {
          this.props.onBlur(event);
        }
      });
    };

    public selectDateComponent = (selected: InternalDateComponentType | null): void => {
      if (this.frozen) {
        return;
      }
      this.setState({ selected });
    };
  };
};
