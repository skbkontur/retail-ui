import React from 'react';

import { CommonProps, CommonWrapper } from '../../internal/CommonWrapper';

import { jsStyles } from './TopBar.styles';

export type TopBarEndProps = CommonProps;

/**
 * Контейнер для смещения к концу
 *
 * @visibleName TopBar.End
 */

export const TopBarEnd: React.FC<TopBarEndProps> = ({ children, ...rest }) => (
  <CommonWrapper {...rest}>
    <div className={jsStyles.endItems()}>{children}</div>
  </CommonWrapper>
);
(TopBarEnd as any).__KONTUR_REACT_UI__ = 'TopBarEnd';
