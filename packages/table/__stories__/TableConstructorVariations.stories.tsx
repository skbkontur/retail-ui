import { IconArrowRoundTimeForwardRegular16 } from '@skbkontur/icons/IconArrowRoundTimeForwardRegular16';
import { IconArrowRoundTimeForwardRegular20 } from '@skbkontur/icons/IconArrowRoundTimeForwardRegular20';
import { IconArrowRoundTimeForwardRegular24 } from '@skbkontur/icons/IconArrowRoundTimeForwardRegular24';
import { IconBookmarkRegular16 } from '@skbkontur/icons/IconBookmarkRegular16';
import { IconBookmarkRegular20 } from '@skbkontur/icons/IconBookmarkRegular20';
import { IconBookmarkRegular24 } from '@skbkontur/icons/IconBookmarkRegular24';
import { IconDocsPlusRegular16 } from '@skbkontur/icons/IconDocsPlusRegular16';
import { IconDocsPlusRegular20 } from '@skbkontur/icons/IconDocsPlusRegular20';
import { IconDocsPlusRegular24 } from '@skbkontur/icons/IconDocsPlusRegular24';
import { IconSendPaperplaneRegular16 } from '@skbkontur/icons/IconSendPaperplaneRegular16';
import { IconSendPaperplaneRegular20 } from '@skbkontur/icons/IconSendPaperplaneRegular20';
import { IconSendPaperplaneRegular24 } from '@skbkontur/icons/IconSendPaperplaneRegular24';
import { IconTechPrinterRegular16 } from '@skbkontur/icons/IconTechPrinterRegular16';
import { IconTechPrinterRegular20 } from '@skbkontur/icons/IconTechPrinterRegular20';
import { IconTechPrinterRegular24 } from '@skbkontur/icons/IconTechPrinterRegular24';
import { IconTrashCanRegular16 } from '@skbkontur/icons/IconTrashCanRegular16';
import { IconTrashCanRegular20 } from '@skbkontur/icons/IconTrashCanRegular20';
import { IconTrashCanRegular24 } from '@skbkontur/icons/IconTrashCanRegular24';
import React from 'react';

import { Table, useTableRowSelection } from '../index';

export default {
  title: 'Table/Constructor Variations',
};

type Size = 'small' | 'medium' | 'large';

interface VariationProps {
  size?: Size;
  checkboxes?: boolean;
  leadingIcon?: boolean;
  inlineIcon?: boolean;
  rowDividers?: boolean;
  rowClick?: boolean;
  actionsEnabled?: boolean;
  actionsOverlay?: boolean;
  actionsKebab?: boolean;
  withDanger?: boolean;
}

const tableWidth = 950;
const iconWidthBySize: Record<Size, number> = { small: 16, medium: 20, large: 24 };
const actionsColumnWidthBySize: Record<Size, number> = { small: 160, medium: 160, large: 184 };
const checkboxColumnWidthBySize: Record<Size, number> = { small: 32, medium: 42, large: 52 };
const headerPaddingXBySize: Record<Size, number> = { small: 26, medium: 34, large: 42 };
const headerPaddingRightBySize: Record<Size, number> = { small: 13, medium: 17, large: 21 };
const cellPaddingLeftBySize: Record<Size, number> = { small: 13, medium: 17, large: 21 };

const initialData = [
  {
    id: 1,
    name: 'Гвозди металлические 34 кг 1 мм на 5 мм обработанные',
    article: '923812939',
    type: 'Материал',
    stock: null,
  },
  { id: 2, name: 'Шурупы 50 шт', article: '12345678', type: null, stock: '50 шт' },
  { id: 3, name: 'Подшипники роликовые', article: null, type: 'Товар', stock: '5 шт' },
  { id: 4, name: 'Ключи комбинированные', article: '34985723', type: 'Товар', stock: null },
  { id: 5, name: 'Отвертки набор', article: '23894723', type: null, stock: '20 шт' },
  { id: 6, name: 'Плоскогубцы', article: '57389201', type: 'Товар', stock: '8 шт' },
];

const subtitle: React.CSSProperties = { fontSize: 12, color: '#858585', marginTop: 2 };

const DemoTable = ({
  size = 'medium',
  checkboxes = false,
  leadingIcon = true,
  inlineIcon = true,
  rowDividers = true,
  rowClick = true,
  actionsEnabled = true,
  actionsOverlay = false,
  actionsKebab = false,
  withDanger = true,
}: VariationProps) => {
  const { checkedRows, isCheckedAll, hasChecked, checkboxRef, selectAll, toggleRow, isRowChecked } =
    useTableRowSelection(initialData);

  const getIcon = (Icon16: React.ComponentType, Icon20: React.ComponentType, Icon24: React.ComponentType) => {
    switch (size) {
      case 'small':
        return <Icon16 />;
      case 'large':
        return <Icon24 />;
      default:
        return <Icon20 />;
    }
  };

  const actionItems = [
    {
      key: 'send',
      icon: getIcon(IconSendPaperplaneRegular16, IconSendPaperplaneRegular20, IconSendPaperplaneRegular24),
      text: 'Отправить',
    },
    {
      key: 'print',
      icon: getIcon(IconTechPrinterRegular16, IconTechPrinterRegular20, IconTechPrinterRegular24),
      text: 'Напечатать',
    },
    {
      key: 'copy',
      icon: getIcon(IconDocsPlusRegular16, IconDocsPlusRegular20, IconDocsPlusRegular24),
      text: 'Скопировать',
    },
  ];
  const dangerItem = {
    key: 'delete',
    icon: getIcon(IconTrashCanRegular16, IconTrashCanRegular20, IconTrashCanRegular24),
    text: 'Удалить',
    danger: true,
  };
  const items = withDanger ? [actionItems[0], dangerItem, actionItems[1]] : actionItems;
  const itemsVisible = actionsKebab ? 0 : undefined;

  const separateActionsColumn = actionsEnabled && !actionsOverlay;

  const leadingIconColumnWidth = cellPaddingLeftBySize[size] + iconWidthBySize[size];
  const actionsColumnWidth = actionsColumnWidthBySize[size];
  const fixedWidth =
    (checkboxes ? checkboxColumnWidthBySize[size] : 0) +
    (leadingIcon ? leadingIconColumnWidth : 0) +
    (separateActionsColumn ? actionsColumnWidth : 0);
  const stockColumnWeight = separateActionsColumn ? 20 : 25;
  const contentColumnWeight = 50 + 25 + stockColumnWeight;
  const contentWidth = tableWidth - fixedWidth;
  const getContentColumnWidth = (weight: number, paddingX: number) =>
    `${Math.max(0, (contentWidth * weight) / contentColumnWeight - paddingX)}px`;

  const nameColumnPaddingX = leadingIcon ? 8 + headerPaddingRightBySize[size] : headerPaddingXBySize[size];
  const nameColumnWidth = getContentColumnWidth(50, nameColumnPaddingX);
  const typeColumnWidth = getContentColumnWidth(25, headerPaddingXBySize[size]);
  const stockColumnWidth = getContentColumnWidth(stockColumnWeight, headerPaddingXBySize[size]);

  return (
    <div id="demo" style={{ width: tableWidth, padding: 16 }}>
      <Table size={size} hasChecked={hasChecked}>
        <Table.Header>
          <Table.Row>
            {checkboxes && (
              <Table.HeaderCheckboxCell
                checkboxRef={checkboxRef}
                onClick={() => selectAll()}
                checked={isCheckedAll}
                initialIndeterminate={hasChecked}
                aria-label="Выбрать все строки"
              />
            )}
            {leadingIcon && <Table.HeaderCell width={`${leadingIconColumnWidth}px`} noPaddingRight />}
            <Table.HeaderCell width={nameColumnWidth} style={leadingIcon ? { paddingLeft: 8 } : undefined}>
              Товар
            </Table.HeaderCell>
            <Table.HeaderCell width={typeColumnWidth}>Тип</Table.HeaderCell>
            <Table.HeaderCell width={stockColumnWidth} currency>
              Остаток
            </Table.HeaderCell>
            {separateActionsColumn && <Table.HeaderCell width={`${actionsColumnWidth}px`} />}
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {initialData.map((row) => (
            <Table.Row
              key={row.id}
              checked={checkedRows.has(row.id)}
              bottomBorder={rowDividers}
              onClick={rowClick ? () => console.log('row click', row.id) : undefined}
            >
              {checkboxes && (
                <Table.CheckboxCell
                  checked={isRowChecked(row.id)}
                  onCheckboxClick={(e) => toggleRow(e, row.id)}
                  aria-label={`Выбрать строку ${row.name}`}
                />
              )}
              {leadingIcon && (
                <Table.Cell noPaddingRight noBottomBorder>
                  {getIcon(
                    IconArrowRoundTimeForwardRegular16,
                    IconArrowRoundTimeForwardRegular20,
                    IconArrowRoundTimeForwardRegular24
                  )}
                </Table.Cell>
              )}
              <Table.Cell style={leadingIcon ? { paddingLeft: 8 } : undefined}>
                {inlineIcon ? (
                  <span style={{ display: 'inline-flex', alignItems: 'baseline', gap: 6, fontWeight: 600 }}>
                    {getIcon(IconBookmarkRegular16, IconBookmarkRegular20, IconBookmarkRegular24)}
                    {row.name}
                  </span>
                ) : (
                  <span style={{ fontWeight: 600 }}>{row.name}</span>
                )}
                <div style={subtitle}>{row.article ? `Артикул: ${row.article}` : '—'}</div>
              </Table.Cell>
              <Table.Cell>{row.type ?? '—'}</Table.Cell>
              <Table.Cell currency>
                {row.stock ?? '—'}
                {actionsEnabled && actionsOverlay && (
                  <Table.ActionBar overlay items={items} itemsVisible={itemsVisible} />
                )}
              </Table.Cell>
              {separateActionsColumn && (
                <Table.Cell contentCompensator={false}>
                  <Table.ActionBar items={items} itemsVisible={itemsVisible} />
                </Table.Cell>
              )}
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  );
};

export const SizeSmall = () => <DemoTable size="small" />;
export const SizeMedium = () => <DemoTable size="medium" />;
export const SizeLarge = () => <DemoTable size="large" />;

export const WithCheckboxes = () => <DemoTable checkboxes />;
export const WithoutLeadingIcon = () => <DemoTable leadingIcon={false} />;
export const WithoutInlineIcon = () => <DemoTable inlineIcon={false} />;
export const WithoutDividers = () => <DemoTable rowDividers={false} />;
export const WithoutRowClick = () => <DemoTable rowClick={false} />;
export const WithoutDanger = () => <DemoTable withDanger={false} />;
export const WithoutActions = () => <DemoTable actionsEnabled={false} />;

export const ActionsKebab = () => <DemoTable actionsKebab />;

export const ActionsOverlayClickable = () => <DemoTable actionsOverlay rowClick />;
export const ActionsOverlayNonClickable = () => <DemoTable actionsOverlay rowClick={false} />;

export const FullFeatured = () => <DemoTable checkboxes actionsOverlay={false} />;
