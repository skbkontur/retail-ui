import type { ButtonProps } from '@skbkontur/react-ui/components/Button';
import { Button } from '@skbkontur/react-ui/components/Button';
import { Hint } from '@skbkontur/react-ui/components/Hint';
import { MenuItem } from '@skbkontur/react-ui/components/MenuItem';
import type { CommonProps } from '@skbkontur/react-ui/internal/CommonWrapper';
import { CommonWrapper } from '@skbkontur/react-ui/internal/CommonWrapper';
import { PopupMenu } from '@skbkontur/react-ui/internal/PopupMenu';
import type { PopupMenuProps } from '@skbkontur/react-ui/internal/PopupMenu';
import { ThemeContext } from '@skbkontur/react-ui/lib/theming/ThemeContext';
import { ThemeFactory } from '@skbkontur/react-ui/lib/theming/ThemeFactory';
import cx from 'classnames';
import type { FC, ReactNode, ReactElement } from 'react';
import React, { useContext, useState, isValidElement } from 'react';

import { getSizeModifier } from '../../../utils/getSizeModifier.js';
import { SizeTableContext } from '../TableContext.js';
import { TableDataTids } from '../TableDataTids.js';
import { TableKebabButton } from './TableKebabButton.js';

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
  text?: ReactElement | string;
  icon?: ReactElement;
  danger?: boolean;
  onClick?: (event: React.SyntheticEvent<HTMLElement>) => void;
}

interface TableActionBarPropsWithItems extends CommonProps {
  caption?: PopupMenuProps['caption'];
  items: TableActionItem[];
  itemsVisible?: number;
  popup?: boolean;
}

interface TableActionBarPropsWithoutItems extends CommonProps {
  caption: PopupMenuProps['caption'];
  popup?: boolean;
}

export type TableActionBarProps = TableActionBarPropsWithItems | TableActionBarPropsWithoutItems;

function hasItems(props: TableActionBarProps): props is TableActionBarPropsWithItems {
  return 'items' in props;
}

export const TableActionBar: FC<TableActionBarProps> = (props) => {
  const { size } = useContext(SizeTableContext);
  const [isKebabOpen, setIsKebabOpen] = useState(false);

  const { popup, caption, ...rest } = props;
  const items = hasItems(props) ? props.items : [];
  const itemsVisible = hasItems(props) ? (props.itemsVisible ?? 4) : 0;

  const renderInlineItem = (item: TableActionItem, index: number) => {
    const { key, text, icon, onClick, danger, ...itemRest } = item;

    const btnContent = (
      <DangerWrapper danger={danger}>
        <Button
          className={cx({ [styles.Danger]: danger })}
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
        <Hint key={key ?? index} text={text} maxWidth={300} pos="top" useWrapper>
          {btnContent}
        </Hint>
      );
    }
    return btnContent;
  };

  const renderMenuItem = (item: TableActionItem, index: number) => {
    const { key, text, icon, onClick, danger, ...itemRest } = item;

    const { component, type, ...menuItemProps } = itemRest;

    if (isValidElement(text)) {
      return text;
    }

    return (
      <MenuItem key={key ?? index} icon={icon} onClick={onClick} size={size} {...menuItemProps}>
        {text}
      </MenuItem>
    );
  };

  const handleKebabOpen = () => setIsKebabOpen(true);
  const handleKebabClose = () => setIsKebabOpen(false);

  const kebabButton = <TableKebabButton active={isKebabOpen} size={size} />;

  const renderContent = () => {
    const inlineItems = items.slice(0, itemsVisible);
    const menuItems = items.slice(itemsVisible);

    const content = (
      <div onClick={(e) => e.stopPropagation()}>
        {inlineItems.map(renderInlineItem)}
        {menuItems.length ? (
          <PopupMenu
            caption={caption ?? kebabButton}
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
      const popupActionBarSizeClass = styles[getSizeModifier('PopupActionBar', size ?? 'small')];
      return (
        <div className={cx(styles.PopupActionBar, popupActionBarSizeClass)} data-tid={TableDataTids.popupActionBar}>
          {content}
        </div>
      );
    }
    return content;
  };

  return <CommonWrapper {...rest}>{renderContent()}</CommonWrapper>;
};
