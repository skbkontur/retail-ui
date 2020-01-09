import * as React from 'react';

import { CHAR_MASK } from '../../lib/date/constants';
import { InternalDateValidator } from '../../lib/date/InternalDateValidator';
import { InternalDateComponentType, InternalDateFragment } from '../../lib/date/types';
import { cx } from '../../lib/theming/Emotion';
import { Theme } from '../../lib/theming/Theme';
import { ThemeConsumer } from '../ThemeConsumer';

import styles from './DateFragmentsView.module.less';
import { removeAllSelections } from './helpers/SelectionHelpers';
import { jsStyles } from './DateFragmentsView.styles';


interface DateFragmentViewProps {
  nodeRef: (el: HTMLDivElement | null) => void;
  selected: InternalDateComponentType | null;
  fragments: InternalDateFragment[];
  inputMode: boolean;
  onSelectDateComponent: (type: InternalDateComponentType, e: React.MouseEvent<HTMLElement>) => void;
}

export class DateFragmentsView extends React.Component<DateFragmentViewProps, {}> {
  private theme!: Theme;

  public render() {
    return (
      <ThemeConsumer>
        {theme => {
          this.theme = theme;
          return this.renderMain();
        }}
      </ThemeConsumer>
    );
  }

  private renderMain() {
    return (
      <div ref={this.props.nodeRef} className={cx(styles.root, jsStyles.root(this.theme))}>
        {this.props.fragments.map((fragment, index) =>
          fragment.type === InternalDateComponentType.Separator
            ? this.renderSeparator(fragment, index)
            : this.renderDateComponent(fragment, index),
        )}
      </div>
    );
  }

  private renderSeparator(fragment: InternalDateFragment, index: number): JSX.Element {
    const separatorClassName = cx(jsStyles.delimiter(this.theme), {
      [styles.filled]: this.props.fragments[index + 1].value !== null,
    });

    return (
      <span key={index} className={separatorClassName}>
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
        <span className={jsStyles.mask(this.theme)}>{CHAR_MASK.repeat(lengthMask)}</span>
      </span>
    );
  }
}
