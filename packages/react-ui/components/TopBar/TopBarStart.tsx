import React from 'react';

import { jsStyles } from "./TopBar.styles";

/**
 * Контейнер для сдвига к началу
 *
 * @visibleName TopBar.Start
 */

export const TopBarStart: React.SFC = ({ children }) => <div className={jsStyles.startItems()}>{children}</div>;
(TopBarStart as any).__KONTUR_REACT_UI__ = 'TopBarStart';
