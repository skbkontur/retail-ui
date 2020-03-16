import React from 'react';

import { jsStyles } from "./TopBar.styles";

/**
 * Контейнер для смещения к концу
 *
 * @visibleName TopBar.End
 */

export const TopBarEnd: React.SFC = ({ children }) => <div className={jsStyles.endItems()}>{children}</div>;
(TopBarEnd as any).__KONTUR_REACT_UI__ = 'TopBarEnd';
