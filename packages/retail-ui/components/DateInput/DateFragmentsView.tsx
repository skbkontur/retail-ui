import classNames from 'classnames';
import * as React from 'react';
import { CHAR_MASK } from '../../lib/date/constants';
import InternalDateValidator from '../../lib/date/InternalDateValidator';
import { InternalDateComponentType, InternalDateFragment } from '../../lib/date/types';
import styles from './DateInput.module.less';
import { removeAllSelections } from './helpers/SelectionHelpers';

interface DateFragmentViewProps {
  nodeRef: (el: HTMLDivElement | null) => void;
  selected: InternalDateComponentType | null;
  fragments: InternalDateFragment[];
  inputMode: boolean;
  onSelectDateComponent: (type: InternalDateComponentType, e: React.MouseEvent<HTMLElement>) => void;
}

export class DateFragmentsView extends React.Component<DateFragmentViewProps, {}> {
  public render() {
    return (
      <div ref={this.props.nodeRef} className={styles.root}>
        {this.props.fragments.map(
          (fragment, index) =>
            fragment.type === InternalDateComponentType.Separator
              ? this.renderSeparator(fragment, index)
              : this.renderDateComponent(fragment, index),
        )}
      </div>
    );
  }

  private renderSeparator(fragment: InternalDateFragment, index: number): JSX.Element {
    return (
      <span
        key={index}
        className={classNames(styles.delimiter, {
          [styles.filled]: this.props.fragments[index + 1].value !== null,
        })}
      >
        {fragment.value}
      </span>
    );
  }

  private renderDateComponent(fragment: InternalDateFragment, index: number): JSX.Element {
    const { inputMode, onSelectDateComponent, selected } = this.props;
    const { type, value, length, valueWithPad } = fragment;

    const valueMask = value === null || (selected === type && inputMode) ? value : valueWithPad || value;
    const lengthMask = InternalDateValidator.testParseToNumber(valueMask)
      ? Math.max(length - valueMask!.toString().length, 0)
      : length;

    const handleMouseUp = (e: React.MouseEvent<HTMLElement>) => onSelectDateComponent(type, e);

    return (
      <span key={index} onMouseUp={handleMouseUp} onMouseDown={removeAllSelections}>
        {valueMask}
        <span className={styles.mask}>{CHAR_MASK.repeat(lengthMask)}</span>
      </span>
    );
  }
}
