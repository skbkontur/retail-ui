import React, { forwardRef, type ReactNode } from 'react';

import { TableCell, type TableCellProps } from './TableCell.js';
import { TableDataTids } from './TableDataTids.js';

import styles from './Table.module.css';

export interface TableEditableCellProps extends Omit<TableCellProps, 'contentCompensator'> {
  /**
   * Контрол для редактирования значения: `Input`, `Select`, `ComboBox` и т. п. того же размера, что и таблица.
   * Показывается при наведении на строку и при фокусе внутри неё, в остальное время вместо него виден `children`.
   * Чтобы контрол занял всю ячейку, передайте ему `width="100%"`.
   * С `currency` текст выравнивается по правому краю — передавайте `CurrencyInput` (он выровнен вправо по умолчанию).
   */
  editor: ReactNode;
}

/**
 * Ячейка, которая выглядит как текст, а при наведении на строку или фокусе показывает поле для редактирования.
 * Текст стоит под заголовком колонки, а поле выступает влево так, что его текст встаёт на то же место.
 */
export const TableEditableCell = forwardRef<HTMLTableCellElement, TableEditableCellProps>(
  ({ editor, children, ...rest }, ref) => (
    <TableCell ref={ref} contentCompensator={false} {...rest}>
      {/* Поле всегда в DOM: до него доходит Tab и скринридер, а клик по тексту попадает прямо в поле. */}
      <div className={styles.EditableCellContent} onClick={(e) => e.stopPropagation()}>
        <div aria-hidden>{children}</div>
        <div className={styles.EditableCellEditor} data-tid={TableDataTids.editableCellEditor}>
          {editor}
        </div>
      </div>
    </TableCell>
  ),
);

TableEditableCell.displayName = 'TableEditableCell';
