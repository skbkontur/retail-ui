import React, { cloneElement, isValidElement, ReactNode, useContext, useEffect, useState } from 'react';

import { getScrollWidth } from '../../lib/dom/getScrollWidth';
import { Sticky } from '../Sticky';
import { ThemeContext } from '../../lib/theming/ThemeContext';
import { ZIndex } from '../../internal/ZIndex';
import { CommonWrapper, CommonProps } from '../../internal/CommonWrapper';
import { cx } from '../../lib/theming/Emotion';
import { isReactUINode } from '../../lib/utils';
import { Gapped } from '../Gapped';

import { styles } from './Modal.styles';
import { ModalContext } from './ModalContext';

const ALLOWED_MOBILE_FOOTER_BUTTTONS = 2;

export interface ModalFooterProps extends CommonProps {
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
  const modal = useContext(ModalContext);
  const [isManyElementsInChild, setIsManyElementsInChild] = useState(false);

  useEffect(() => {
    modal.setHasFooter?.();
    modal.setHasPanel?.(panel);

    return () => {
      modal.setHasFooter?.(false);
      modal.setHasPanel?.(false);
    };
  }, [panel]);

  useEffect(() => {
    checkManyElements();
  }, [children]);

  const checkManyElements = () => {
    if (modal.isMobile && React.Children.count(children) > ALLOWED_MOBILE_FOOTER_BUTTTONS) {
      let elements = 0;
      React.Children.map(children, (child) => {
        if (isValidElement(child)) {
          elements++;
        }
      });
      setIsManyElementsInChild(elements > ALLOWED_MOBILE_FOOTER_BUTTTONS);
    }
  };

  const renderContent = (fixed = false) => {
    return (
      <div
        className={cx({
          [styles.footer(theme)]: true,
          [styles.mobileFooter(theme)]: modal.isMobile,
          [styles.fixedFooter(theme)]: fixed,
          [styles.panel(theme)]: Boolean(panel),
          [styles.mobilePanel(theme)]: Boolean(panel) && modal.isMobile,
        })}
      >
        {modal.isMobile && (
          <Gapped vertical>
            {children &&
              React.Children.map(children, (child) => {
                if (isValidElement(child)) {
                  if (isReactUINode('Button', child)) {
                    return cloneElement(child, { width: '100%', size: 'large' });
                  }

                  return <div style={{ width: '100%' }}>{child}</div>;
                }
              })}
          </Gapped>
        )}
        {!modal.isMobile && children}
      </div>
    );
  };

  return (
    <CommonWrapper {...props}>
      <ZIndex priority={'ModalFooter'} className={styles.footerWrapper()}>
        {(sticky && !modal.isMobile) || (sticky && modal.isMobile && !isManyElementsInChild) ? (
          <Sticky side="bottom" offset={modal.horizontalScroll ? getScrollWidth() : 0}>
            {renderContent}
          </Sticky>
        ) : (
          renderContent()
        )}
      </ZIndex>
    </CommonWrapper>
  );
}

ModalFooter.__KONTUR_REACT_UI__ = 'ModalFooter';
ModalFooter.__MODAL_FOOTER__ = true;

export { ModalFooter };
