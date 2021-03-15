import React, { ReactNode, useContext } from 'react';
import cn from 'classnames';

import { Sticky } from '../Sticky';
import { ThemeContext } from '../../lib/theming/ThemeContext';
import { ZIndex } from '../../internal/ZIndex';
import { CommonWrapper, CommonProps } from '../../internal/CommonWrapper';

import { jsStyles } from './Modal.styles';
import { ModalClose } from './ModalClose';
import { CloseProps, ModalContext } from './ModalContext';

export interface ModalHeaderProps extends CommonProps {
  sticky?: boolean;
  children?: ReactNode;
}
/**
 * Шапка модального окна
 *
 * @visibleName Modal.Header
 */
function ModalHeader(props: ModalHeaderProps) {
  const { sticky = true, children } = props;
  const theme = useContext(ThemeContext);

  const renderContent = (close?: CloseProps, additionalPadding?: boolean) => (fixed = false) => {
    return (
      <div
        className={cn({
          [jsStyles.header(theme)]: true,
          [jsStyles.fixedHeader(theme)]: fixed,
          [jsStyles.headerAddPadding()]: Boolean(additionalPadding),
          [jsStyles.headerWithClose(theme)]: Boolean(close),
        })}
      >
        {close && <ModalClose requestClose={close.requestClose} disableClose={close.disableClose} />}
        {children}
      </div>
    );
  };

  return (
    <CommonWrapper {...props}>
      <ZIndex priority={'ModalHeader'} className={jsStyles.headerWrapper()}>
        <ModalContext.Consumer>
          {({ close, additionalPadding }) => {
            if (sticky) {
              return <Sticky side="top">{renderContent(close, additionalPadding)}</Sticky>;
            }

            return renderContent(close, additionalPadding)();
          }}
        </ModalContext.Consumer>
      </ZIndex>
    </CommonWrapper>
  );
}

ModalHeader.__KONTUR_REACT_UI__ = 'ModalHeader';
ModalHeader.__MODAL_HEADER__ = true;

export { ModalHeader };
