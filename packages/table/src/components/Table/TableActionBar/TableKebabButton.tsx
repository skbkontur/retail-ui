import { IconUiMenuDots3VRegular16 as MenuKebabIcon16 } from '@skbkontur/icons/IconUiMenuDots3VRegular16';
import { IconUiMenuDots3VRegular20 as MenuKebabIcon20 } from '@skbkontur/icons/IconUiMenuDots3VRegular20';
import { IconUiMenuDots3VRegular24 as MenuKebabIcon24 } from '@skbkontur/icons/IconUiMenuDots3VRegular24';
import type { ButtonProps } from '@skbkontur/react-ui/components/Button';
import { Button } from '@skbkontur/react-ui/components/Button';
import cx from 'classnames';
import React, { type FC } from 'react';

import { TableDataTids } from '../TableDataTids.js';

import styles from '../Table.module.css';

const KEBAB_ICONS = {
  small: MenuKebabIcon16,
  medium: MenuKebabIcon20,
  large: MenuKebabIcon24,
} as const;

interface TableKebabButtonProps extends ButtonProps {
  active?: boolean;
  size?: ButtonProps['size'];
}

export const TableKebabButton: FC<TableKebabButtonProps> = ({ active, size, icon, ...rest }) => {
  const getKebabIcon = () => {
    return KEBAB_ICONS[size ?? 'small'];
  };
  const KebabIcon = getKebabIcon();

  return (
    <div className={cx({ [styles.Hover]: active })}>
      <Button
        active={active}
        use="text"
        size={size}
        icon={<KebabIcon />}
        data-tid={TableDataTids.actionsKebabButton}
        {...rest}
      />
    </div>
  );
};
