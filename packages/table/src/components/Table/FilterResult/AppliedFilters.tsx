import { IconXCircleLight16 } from '@skbkontur/icons/IconXCircleLight16';
import { IconXCircleRegular20 } from '@skbkontur/icons/IconXCircleRegular20';
import { IconXCircleRegular24 } from '@skbkontur/icons/IconXCircleRegular24';
import { Link } from '@skbkontur/react-ui/components/Link';
import { useLocaleForControl } from '@skbkontur/react-ui/lib/locale/useLocaleForControl';
import React, { useContext, useRef } from 'react';

import { TableLocaleHelper } from '../../../locale/index.js';
import type { SizeProp } from '../../../reactUiCompat/useSizeContext.js';
import { getIconSize } from '../../../utils/getIconSize.js';
import { focusFilterButton, getNearestFilterButton } from '../focusFilterButton.js';
import { SizeTableContext } from '../TableContext.js';
import { TableDataTids } from '../TableDataTids.js';
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
  const locale = useLocaleForControl('Table', TableLocaleHelper);
  const listRef = useRef<HTMLUListElement | null>(null);
  const tokenRefs = useRef<Array<HTMLElement | null>>([]);

  const safeTokens = tokens ?? [];

  if (safeTokens.length < 1) {
    return <></>;
  }

  const ResetIcon = getResetIcon(size);

  // Целевой элемент для фокуса вычисляем и захватываем ДО вызова onRemove, пока
  // строка с токенами (и listRef) ещё в DOM. Кнопка фильтра живёт вне
  // AppliedFilters, а соседний токен НЕ удаляется (React сопоставляет узлы по
  // key) — поэтому оба ref остаются валидными, и фокус можно выставить
  // императивно сразу. Это работает и при синхронном, и при асинхронном
  // (Redux/MobX/API) обновлении токенов, без flushSync и без pendingFocus-стейта.
  const handleRemove = (index: number) => {
    if (safeTokens.length === 1) {
      const filterButton = getNearestFilterButton(listRef.current);
      safeTokens[0].onRemove();
      focusFilterButton(filterButton);
      return;
    }
    // При удалении не последнего токена фокус уходит на следующий (он сдвинется
    // на освободившийся индекс), при удалении последнего — на предыдущий.
    const fallbackIndex = index === safeTokens.length - 1 ? index - 1 : index + 1;
    const nextFocusTarget = tokenRefs.current[fallbackIndex];
    safeTokens[index].onRemove();
    nextFocusTarget?.focus();
  };

  const handleResetAll = () => {
    const filterButton = getNearestFilterButton(listRef.current);
    onResetAll();
    focusFilterButton(filterButton);
  };

  return (
    <ul
      ref={listRef}
      aria-label={locale.appliedFiltersLabel}
      data-tid={TableDataTids.appliedFiltersList}
      className={styles.AppliedFiltersWrapper}
    >
      {safeTokens.map(({ key, caption }, index) => (
        <li key={key ?? `${caption}-${index}`} className={styles.AppliedFiltersItem}>
          <TableToken
            ref={(el) => {
              tokenRefs.current[index] = el;
            }}
            caption={caption}
            onRemove={() => handleRemove(index)}
          />
        </li>
      ))}
      <li className={styles.AppliedFiltersItem}>
        <Link onClick={handleResetAll} component="button" icon={<ResetIcon />}>
          {locale.resetAllFiltersLabel}
        </Link>
      </li>
    </ul>
  );
};
