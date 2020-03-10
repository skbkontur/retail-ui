import React, { ReactNode, useContext, useEffect, useState } from 'react';

import { getScrollWidth } from '../../lib/dom/getScrollWidth';
import { Sticky } from '../Sticky';
import { cx } from '../../lib/theming/Emotion';
import { ThemeContext } from '../../lib/theming/ThemeContext';
import { ZIndex } from '../ZIndex';

import { jsStyles } from './Modal.styles';
import styles from './Modal.module.less';
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
    setScrollBarWidth(getScrollWidth())
  }, []);

  const renderContent = (fixed = false) => {
    const className = cx(styles.footer, jsStyles.footer(theme), {
      [styles.panel]: !!panel,
      [styles.fixedFooter]: fixed,
      [jsStyles.fixedFooter(theme)]: fixed,
    });

    return <div className={className}>{children}</div>;
  };

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
