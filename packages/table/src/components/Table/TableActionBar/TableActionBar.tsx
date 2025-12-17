import type { FC, ReactNode, ReactElement } from 'react';
import React, { useContext, useState } from 'react';
import type { ButtonProps } from '@skbkontur/react-ui/components/Button';
import { Button } from '@skbkontur/react-ui/components/Button';
import { Hint } from '@skbkontur/react-ui/components/Hint';
import { MenuItem } from '@skbkontur/react-ui/components/MenuItem';
import { PopupMenu } from '@skbkontur/react-ui/internal/PopupMenu';
import type { CommonProps } from '@skbkontur/react-ui/internal/CommonWrapper';
import { CommonWrapper } from '@skbkontur/react-ui/internal/CommonWrapper';
import { IconUiMenuDots3VRegular24 as MenuKebabIcon24 } from '@skbkontur/icons/IconUiMenuDots3VRegular24';
import { IconUiMenuDots3VRegular20 as MenuKebabIcon20 } from '@skbkontur/icons/IconUiMenuDots3VRegular20';
import { IconUiMenuDots3VRegular16 as MenuKebabIcon16 } from '@skbkontur/icons/IconUiMenuDots3VRegular16';
import cx from 'classnames';
import { ThemeContext } from '@skbkontur/react-ui/lib/theming/ThemeContext';
import { ThemeFactory } from '@skbkontur/react-ui/lib/theming/ThemeFactory';

import { SizeTableContext } from '../TableContext.js';
import { TableDataTids } from '../TableDataTids.js';
import styles from '../Table.module.css';

interface DangerWrapperProps {
  danger?: boolean;
  children: ReactNode;
}

const DangerWrapper: FC<DangerWrapperProps> = ({ danger, children }) =>
  danger ? (
    <ThemeContext.Consumer>
      {(theme) => (
        <ThemeContext.Provider
          value={ThemeFactory.create(
            {
              btnTextHoverBg: theme.btnDangerBg,
              btnTextActiveBg: theme.btnDangerActiveBg,
              btnTextHoverTextColor: theme.btnDangerTextColor,
            },
            theme
          )}
        >
          {children}
        </ThemeContext.Provider>
      )}
    </ThemeContext.Consumer>
  ) : (
    <>{children}</>
  );

export interface TableActionItem extends Omit<ButtonProps, 'onClick' | 'icon'> {
  key?: React.Key;
  text?: ReactNode;
  icon?: ReactElement;
  danger?: boolean;
  onClick?: (event: React.SyntheticEvent<HTMLElement>) => void;
}

export interface TableActionBarProps extends CommonProps {
  items: TableActionItem[];
  itemsVisible?: number;
  popup?: boolean;
}

const KEBAB_ICONS = {
  small: MenuKebabIcon16,
  medium: MenuKebabIcon20,
  large: MenuKebabIcon24,
} as const;

export const TableActionBar: FC<TableActionBarProps> = ({ items, itemsVisible = 4, popup, ...rest }) => {
  const { size } = useContext(SizeTableContext);
  const [isKebabOpen, setIsKebabOpen] = useState(false);

  const getKebabIcon = () => {
    return KEBAB_ICONS[size ?? 'small'];
  };

  const renderInlineItem = (item: TableActionItem, index: number) => {
    const { key, text, icon, onClick, danger, ...itemRest } = item;

    const btnContent = (
      <DangerWrapper danger={danger}>
        <Button
          className={danger ? styles.Danger : ''}
          key={key ?? index}
          use="text"
          size={size}
          icon={icon}
          onClick={onClick}
          {...itemRest}
        />
      </DangerWrapper>
    );

    if (text) {
      return (
        <Hint key={key ?? index} text={text} maxWidth={300} pos="top">
          {btnContent}
        </Hint>
      );
    }
    return btnContent;
  };

  const renderMenuItem = (item: TableActionItem, index: number) => {
    const { key, text, icon, onClick, danger, ...itemRest } = item;

    const { component, type, ...menuItemProps } = itemRest;

    return (
      <MenuItem key={key ?? index} icon={icon} onClick={onClick} size={size} {...menuItemProps}>
        {text}
      </MenuItem>
    );
  };

  const KebabIcon = getKebabIcon();

  const handleKebabOpen = () => setIsKebabOpen(true);
  const handleKebabClose = () => setIsKebabOpen(false);

  const kebabButton = (
    <div className={cx({ [styles.Hover]: isKebabOpen })}>
      <Button
        active={isKebabOpen}
        use="text"
        size={size}
        icon={<KebabIcon />}
        data-tid={TableDataTids.actionsKebabButton}
      />
    </div>
  );

  const renderContent = () => {
    const inlineItems = items.slice(0, itemsVisible);
    const menuItems = items.slice(itemsVisible);

    const content = (
      <div onClick={(e) => e.stopPropagation()}>
        {inlineItems.map(renderInlineItem)}
        {menuItems.length ? (
          <PopupMenu
            caption={kebabButton}
            positions={['bottom right']}
            onOpen={handleKebabOpen}
            onClose={handleKebabClose}
          >
            {menuItems.map(renderMenuItem)}
          </PopupMenu>
        ) : undefined}
      </div>
    );

    if (popup) {
      return (
        <div className={styles.PopupActionBar} data-tid={TableDataTids.popupActionBar}>
          {content}
        </div>
      );
    }
    return content;
  };

  return <CommonWrapper {...rest}>{renderContent()}</CommonWrapper>;
};
