import React, { cloneElement, isValidElement, ReactNode, useContext, useEffect, useState } from 'react';
import cn from 'classnames';

import { getScrollWidth } from '../../lib/dom/getScrollWidth';
import { Sticky } from '../Sticky';
import { ThemeContext } from '../../lib/theming/ThemeContext';
import { ZIndex } from '../../internal/ZIndex';
import { CommonWrapper, CommonProps } from '../../internal/CommonWrapper';
import { Gapped } from '../Gapped';

import { jsStyles } from './Modal.styles';
import { ModalContext } from './ModalContext';

const ALLOWED_MOBILE_FOOTER_BUTTTONS = 2;

export interface ModalFooterProps extends CommonProps {
  /**
   * Включает серый цвет в футере
   */
  panel?: boolean;
  /**
   * @default true
   */
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
  const [show, setShow] = useState(true);

  useEffect(() => {
    modal.setHasFooter?.();
    modal.setHasPanel?.(panel);

    return () => {
      modal.setHasFooter?.(false);
      modal.setHasPanel?.(false);
    };
  }, [panel]);

  // при вкл/выкл мобильной верстки необходимо перерендерить для сохранения правильной ширины
  useEffect(() => {
    setShow(false);
    setTimeout(() => {
      setShow(true);
    }, 50);
  }, [modal.isMobileLayout]);

  let isManyChilds = false;

  if (modal.isMobileLayout && React.Children.count(children) > ALLOWED_MOBILE_FOOTER_BUTTTONS) {
    let validElements = 0;
    React.Children.map(children, (child) => {
      if (isValidElement(child)) {
        validElements++;
      }
    });
    isManyChilds = validElements > ALLOWED_MOBILE_FOOTER_BUTTTONS;
  }

  const renderContent = (fixed = false) => {
    return (
      <div
        className={cn({
          [jsStyles.footer(theme)]: true,
          [jsStyles.panel(theme)]: Boolean(panel),
          [jsStyles.fixedFooter(theme)]: fixed,
        })}
      >
        {modal.isMobileLayout && (
          <Gapped vertical>
            {children &&
              React.Children.map(children, (child) => {
                if (isValidElement(child)) {
                  return cloneElement(child, { width: '100%' });
                }

                return <div style={{ width: '100%' }}>{child}</div>;
              })}
          </Gapped>
        )}
        {!modal.isMobileLayout && children}
      </div>
    );
  };

  if (!show) {
    return null;
  }

  return (
    <CommonWrapper {...props}>
      <ZIndex priority={'ModalFooter'} className={jsStyles.footerWrapper()}>
        {sticky && !isManyChilds ? (
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
