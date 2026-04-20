import type { Emotion } from '@emotion/css/create-instance';
import React, { type JSX } from 'react';

import { MaskCharLowLine } from '../../internal/MaskCharLowLine/index.js';
import { InternalDateValidator } from '../../lib/date/InternalDateValidator.js';
import { InternalDateComponentType } from '../../lib/date/types.js';
import type { InternalDateFragment } from '../../lib/date/types.js';
import type { GlobalObject } from '../../lib/globalObject.js';
import { withRenderEnvironment } from '../../lib/renderEnvironment/index.js';
import type { Theme } from '../../lib/theming/Theme.js';
import { ThemeContext } from '../../lib/theming/ThemeContext.js';
import { getStyles } from './DateFragmentsView.styles.js';

interface DateFragmentViewProps {
  selected: InternalDateComponentType | null;
  fragments: InternalDateFragment[];
  inputMode: boolean;
  onSelectDateComponent: (type: InternalDateComponentType, e: React.MouseEvent<HTMLSpanElement>) => void;
}

@withRenderEnvironment
export class DateFragmentsView extends React.Component<DateFragmentViewProps> {
  private globalObject!: GlobalObject;
  private emotion!: Emotion;
  private cx!: Emotion['cx'];
  private styles!: ReturnType<typeof getStyles>;
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

  public getRootNode = (): HTMLSpanElement | null => this.rootNode;

  public render(): React.JSX.Element {
    this.styles = getStyles(this.emotion);

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
      <span
        ref={this.rootRef}
        className={this.cx({
          [this.styles.root()]: true,
          [this.styles.selected(this.theme)]: true,
        })}
      >
        {this.props.fragments.map((fragment, index) =>
          fragment.type === InternalDateComponentType.Separator
            ? this.renderSeparator(fragment, index)
            : this.renderDateComponent(fragment, index),
        )}
      </span>
    );
  }

  private renderSeparator(fragment: InternalDateFragment, index: number): JSX.Element {
    const separatorClassName = this.cx({
      [this.styles.mask(this.theme)]: true,
      [this.styles.delimiterFilled()]: this.props.fragments[index + 1].value !== null,
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

    const getValueMask = () => {
      if (value === null || (selected === type && inputMode)) {
        return value;
      }

      return valueWithPad || value;
    };

    const valueMask = getValueMask();

    const lengthMask = InternalDateValidator.testParseToNumber(valueMask)
      ? Math.max(length - valueMask.toString().length, 0)
      : length;

    const handleMouseUp = (e: React.MouseEvent<HTMLSpanElement>) => {
      if (this.globalObject.document?.activeElement?.contains(e.currentTarget)) {
        onSelectDateComponent(type, e);
      }
    };

    return (
      <span key={index} data-fragment="" onMouseUp={handleMouseUp}>
        {valueMask}
        <span data-tid="DateFragmentsView__placeholder" className={this.styles.mask(this.theme)}>
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
