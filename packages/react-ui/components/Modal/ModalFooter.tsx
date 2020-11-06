import React, { ReactNode, useContext, useEffect, useState } from 'react';
import cn from 'classnames';

import { getScrollWidth } from '../../lib/dom/getScrollWidth';
import { Sticky } from '../Sticky';
import { ThemeContext } from '../../lib/theming/ThemeContext';
import { ZIndex } from '../../internal/ZIndex';

import { jsStyles } from './Modal.styles';
import { ModalContext } from './ModalContext';

export interface ModalFooterProps {
  /**
   * Включает серый цвет в футере
   */
  panel?: boolean;
  sticky?: boolean;
  children?: ReactNode;
}

/**
 * Футер модального окна.
 *
 * @visibleName Modal.Footer
 */
function ModalFooter(props: ModalFooterProps) {
  const { sticky = true, panel, children } = props;
  const theme = useContext(ThemeContext);
  const [scrollbarWidth, setScrollBarWidth] = useState(0);

  useEffect(() => {
    setScrollBarWidth(getScrollWidth());
  }, []);

  const renderContent = (fixed = false) => (
    <div
      className={cn({
        [jsStyles.footer(theme)]: true,
        [jsStyles.panel(theme)]: Boolean(panel),
        [jsStyles.fixedFooter(theme)]: fixed,
      })}
    >
      {children}
    </div>
  );

  return (
    <ZIndex style={{ position: 'relative' }} priority={'ModalFooter'}>
      <ModalContext.Consumer>
        {({ horizontalScroll }) => {
          if (sticky) {
            return (
              <Sticky side="bottom" offset={horizontalScroll ? scrollbarWidth : 0}>
                {renderContent}
              </Sticky>
            );
          }

          return renderContent();
        }}
      </ModalContext.Consumer>
    </ZIndex>
  );
}

ModalFooter.__KONTUR_REACT_UI__ = 'ModalFooter';
ModalFooter.__MODAL_FOOTER__ = true;

export { ModalFooter };
