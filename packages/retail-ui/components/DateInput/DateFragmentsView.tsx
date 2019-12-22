import * as React from 'react';
import { CHAR_MASK } from '../../lib/date/constants';
import InternalDateValidator from '../../lib/date/InternalDateValidator';
import { InternalDateComponentType, InternalDateFragment } from '../../lib/date/types';
import { cx } from '../../lib/theming/Emotion';
import { ITheme } from '../../lib/theming/Theme';
import ThemeConsumer from '../ThemeConsumer';
import jsStyles from './DateFragmentsView.styles';

interface DateFragmentViewProps {
  nodeRef: (el: HTMLDivElement | null) => void;
  selected: InternalDateComponentType | null;
  fragments: InternalDateFragment[];
  inputMode: boolean;
  onSelectDateComponent: (type: InternalDateComponentType, e: React.MouseEvent<HTMLSpanElement>) => void;
  onLoadedFragmentNodes: (fragmentNodes: Set<HTMLSpanElement>) => void;
}

export class DateFragmentsView extends React.Component<DateFragmentViewProps, {}> {
  private theme!: ITheme;
  private fragmentNodes: Set<HTMLElement> = new Set();

  public componentDidMount(): void {
    this.props.onLoadedFragmentNodes(this.fragmentNodes);
  }

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
      <span ref={this.props.nodeRef} className={jsStyles.root(this.theme)}>
        {this.props.fragments.map(
          (fragment, index) =>
            fragment.type === InternalDateComponentType.Separator
              ? this.renderSeparator(fragment, index)
              : this.renderDateComponent(fragment, index),
        )}
      </span>
    );
  }

  private renderSeparator(fragment: InternalDateFragment, index: number): JSX.Element {
    const separatorClassName = cx(jsStyles.delimiter(this.theme), {
      [jsStyles.delimiterFilled(this.theme)]: this.props.fragments[index + 1].value !== null,
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
      <span ref={this.fragmentRef} key={index} onMouseUp={handleMouseUp}>
        {valueMask}
        <span className={jsStyles.mask(this.theme)}>{CHAR_MASK.repeat(lengthMask)}</span>
      </span>
    );
  }

  private fragmentRef = (el: HTMLSpanElement | null) => {
    if (el !== null) {
      this.fragmentNodes.add(el);
    }
  };
}
