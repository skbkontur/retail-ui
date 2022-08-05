import React from 'react';

import { MaskCharLowLine } from '../../internal/MaskCharLowLine';
import { InternalDateValidator } from '../../lib/date/InternalDateValidator';
import { InternalDateComponentType, InternalDateFragment } from '../../lib/date/types';
import { Theme } from '../../lib/theming/Theme';
import { ThemeContext } from '../../lib/theming/ThemeContext';
import { cx } from '../../lib/theming/Emotion';

import { styles } from './DateFragmentsView.styles';

interface DateFragmentViewProps {
  selected: InternalDateComponentType | null;
  fragments: InternalDateFragment[];
  inputMode: boolean;
  onSelectDateComponent: (type: InternalDateComponentType, e: React.MouseEvent<HTMLSpanElement>) => void;
}

export class DateFragmentsView extends React.Component<DateFragmentViewProps, {}> {
  private theme!: Theme;
  private rootNode: HTMLSpanElement | null = null;

  public isFragment = (el: HTMLElement | EventTarget): boolean => {
    if (this.rootNode) {
      // NOTE: NodeList doesn't support method 'forEach' in IE11
      const fragments: HTMLSpanElement[] = Array.from(this.rootNode.querySelectorAll('[data-fragment]'));
      return fragments.some((fragment) => fragment === el || fragment.contains(el as HTMLSpanElement));
    }
    return false;
  };

  public getRootNode = () => this.rootNode;

  public render() {
    return (
      <ThemeContext.Consumer>
        {(theme) => {
          this.theme = theme;
          return this.renderMain();
        }}
      </ThemeContext.Consumer>
    );
  }

  private renderMain() {
    return (
      <span ref={this.rootRef} className={styles.root(this.theme)}>
        {this.props.fragments.map((fragment, index) =>
          fragment.type === InternalDateComponentType.Separator
            ? this.renderSeparator(fragment, index)
            : this.renderDateComponent(fragment, index),
        )}
      </span>
    );
  }

  private renderSeparator(fragment: InternalDateFragment, index: number): JSX.Element {
    const separatorClassName = cx({
      [styles.mask(this.theme)]: true,
      [styles.delimiterFilled()]: this.props.fragments[index + 1].value !== null,
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

    const handleMouseUp = (e: React.MouseEvent<HTMLSpanElement>) => {
      if (document.activeElement && document.activeElement.contains(e.currentTarget)) {
        onSelectDateComponent(type, e);
      }
    };

    return (
      <span key={index} data-fragment="" onMouseUp={handleMouseUp}>
        {valueMask}
        <span data-tid="DateFragmentsView__placeholder" className={styles.mask(this.theme)}>
          {Array(lengthMask)
            .fill('')
            .map((_, i) => (
              <MaskCharLowLine key={i} />
            ))}
        </span>
      </span>
    );
  }

  private rootRef = (el: HTMLSpanElement | null) => {
    this.rootNode = el;
  };
}
