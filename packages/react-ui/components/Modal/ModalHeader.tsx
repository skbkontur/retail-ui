import React, { ReactNode, useContext } from 'react';
import cn from 'classnames';

import { Sticky } from '../Sticky';
import { ThemeContext } from '../../lib/theming/ThemeContext';
import { ZIndex } from '../../internal/ZIndex';

import { jsStyles } from './Modal.styles';
import { ModalClose } from './ModalClose';
import { CloseProps, ModalContext } from './ModalContext';

export interface ModalHeaderProps {
  sticky?: boolean;
  children?: ReactNode;
}
/**
 * Шапка модального окна
 *
 * @visibleName Modal.Header
 */
function ModalHeader({ sticky = true, children }: ModalHeaderProps) {
  const theme = useContext(ThemeContext);

  const renderContent = (close?: CloseProps, additionalPadding?: boolean) => (fixed = false) => {
    return (
      <div
        className={cn({
          [jsStyles.header(theme)]: true,
          [jsStyles.fixedHeader(theme)]: fixed,
          [jsStyles.headerAddPadding(theme)]: Boolean(additionalPadding),
        })}
      >
        {close && <ModalClose requestClose={close.requestClose} disableClose={close.disableClose} />}
        {children}
      </div>
    );
  };

  return (
    <ZIndex style={{ position: 'relative' }} priority={'ModalHeader'}>
      <ModalContext.Consumer>
        {({ close, additionalPadding }) => {
          if (sticky) {
            return <Sticky side="top">{renderContent(close, additionalPadding)}</Sticky>;
          }

          return renderContent(close, additionalPadding)();
        }}
      </ModalContext.Consumer>
    </ZIndex>
  );
}

ModalHeader.__KONTUR_REACT_UI__ = 'ModalHeader';
ModalHeader.__MODAL_HEADER__ = true;

export { ModalHeader };
