import React from 'react';
import cn from 'classnames';

import { getScrollWidth } from '../../lib/dom/getScrollWidth';
import { Sticky } from '../Sticky';
import { ThemeConsumer } from '../ThemeConsumer';
import { Theme } from '../../lib/theming/Theme';
import { ZIndex } from '../ZIndex';

import { jsStyles } from './Modal.styles';
import { ModalContext } from './ModalContext';

export interface ModalFooterProps {
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
export class ModalFooter extends React.Component<ModalFooterProps> {
  public static __KONTUR_REACT_UI__ = 'ModalFooter';
  public static __MODAL_FOOTER__ = true;

  public static defaultProps = {
    sticky: true,
  };

  private theme!: Theme;
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
    return (
      <ZIndex style={{ position: 'relative' }} priority={'ModalFooter'}>
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
    const className = cn({
      [jsStyles.footer()]: true,
      [jsStyles.panel(this.theme)]: Boolean(this.props.panel),
      [jsStyles.fixedFooter(this.theme)]: fixed,
    });

    return <div className={className}>{this.props.children}</div>;
  };
}
