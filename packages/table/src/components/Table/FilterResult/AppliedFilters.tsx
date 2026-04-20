import { IconXCircleLight16 } from '@skbkontur/icons/IconXCircleLight16';
import { IconXCircleRegular20 } from '@skbkontur/icons/IconXCircleRegular20';
import { IconXCircleRegular24 } from '@skbkontur/icons/IconXCircleRegular24';
import { Link } from '@skbkontur/react-ui/components/Link';
import React, { useContext } from 'react';

import type { SizeProp } from '../../../reactUiCompat/useSizeContext.js';
import { getIconSize } from '../../../utils/getIconSize.js';
import { SizeTableContext } from '../TableContext.js';
import { TableToken } from './TableToken.js';

import styles from './FilterResult.module.css';

export interface ITableFilterToken {
  key?: string;
  caption: string;
  onRemove: () => void;
}

export interface AppliedFiltersProps {
  tokens: ITableFilterToken[];
  onResetAll: () => void;
}

const RESET_ICONS = {
  16: IconXCircleLight16,
  20: IconXCircleRegular20,
  24: IconXCircleRegular24,
} as const;

const getResetIcon = (size: SizeProp) => {
  const iconSize = getIconSize(size);
  return RESET_ICONS[iconSize];
};

export const AppliedFilters = ({ tokens, onResetAll }: AppliedFiltersProps): JSX.Element => {
  const { size } = useContext(SizeTableContext);

  if (!tokens || tokens.length < 1) {
    return <></>;
  }

  const ResetIcon = getResetIcon(size);

  return (
    <div className={styles.AppliedFiltersWrapper}>
      {tokens.map(({ key, caption, onRemove }) => (
        <TableToken key={key} caption={caption} onRemove={onRemove} />
      ))}
      <Link onClick={onResetAll} component="button" icon={<ResetIcon />}>
        Сбросить фильтры
      </Link>
    </div>
  );
};
