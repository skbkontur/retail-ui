import React, { ReactNode, useContext, useEffect } from 'react';
import cn from 'classnames';

import { getScrollWidth } from '../../lib/dom/getScrollWidth';
import { Sticky } from '../Sticky';
import { ThemeContext } from '../../lib/theming/ThemeContext';
import { ZIndex } from '../../internal/ZIndex';
import { CommonWrapper, CommonProps } from '../../internal/CommonWrapper';

import { jsStyles } from './Modal.styles';
import { ModalContext } from './ModalContext';

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

  useEffect(() => {

    modal.setHasFooter?.();
    modal.setHasPanel?.(panel);

    return () => {
      modal.setHasFooter?.(false);
      modal.setHasPanel?.(false);
    }
  }, [panel]);

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
    <CommonWrapper {...props}>
      <ZIndex priority={'ModalFooter'} className={jsStyles.footerWrapper()}>
        {
          sticky
            ? <Sticky side="bottom" offset={modal.horizontalScroll ? getScrollWidth() : 0}>{renderContent}</Sticky>
            : renderContent()
        }
      </ZIndex>
    </CommonWrapper>
  );
}

ModalFooter.__KONTUR_REACT_UI__ = 'ModalFooter';
ModalFooter.__MODAL_FOOTER__ = true;

export { ModalFooter };
