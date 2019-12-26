import * as React from 'react';
import getScrollWidth from '../../lib/dom/getScrollWidth';
import Sticky from '../Sticky/Sticky';
import { ModalContext } from './ModalContext';
import styles from './Modal.module.less';
import { cx } from '../../lib/theming/Emotion';
import jsStyles from './Modal.styles';
import { ThemeConsumer } from '../ThemeConsumer';
import { ITheme } from '../../lib/theming/Theme';
import ZIndex from '../ZIndex';

export interface FooterProps {
  /**
   * Включает серый цвет в футере
   */
  panel?: boolean;
  sticky: boolean;
}

/**
 * Футер модального окна.
 *
 * @visibleName Modal.Footer
 */
export class Footer extends React.Component<FooterProps> {
  public static __MODAL_FOOTER__ = true;

  public static defaultProps = {
    sticky: true,
  };

  private theme!: ITheme;
  private scrollbarWidth = getScrollWidth();

  public render(): JSX.Element {
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
    // TODO Use position: relative or stacking context for ZIndex to allow cover other zindex elements from body
    // Also remove `overflow: hidden` for ModalBody. It should be done after fix https://github.com/skbkontur/retail-ui/issues/1624
    return (
      <ZIndex priority={'ModalFooter'}>
        <ModalContext.Consumer>
          {({ horizontalScroll }) => {
            if (this.props.sticky) {
              return (
                <Sticky side="bottom" offset={horizontalScroll ? this.scrollbarWidth : 0}>
                  {this.renderContent(horizontalScroll)}
                </Sticky>
              );
            }

            return this.renderContent(horizontalScroll)();
          }}
        </ModalContext.Consumer>
      </ZIndex>
    );
  }

  private renderContent = (horizontalScroll?: boolean) => (fixed = false) => {
    const className = cx(styles.footer, jsStyles.footer(this.theme), {
      [styles.panel]: !!this.props.panel,
      [styles.fixedFooter]: fixed,
      [jsStyles.fixedFooter(this.theme)]: fixed,
    });

    return <div className={className}>{this.props.children}</div>;
  };
}
