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
import { Switcher } from '@skbkontur/react-ui/components/Switcher';
import { Toggle } from '@skbkontur/react-ui/components/Toggle';
import React from 'react';

import { Table, useTableRowSelection } from '../index';

export default {
  title: 'Examples/Table Constructor',
};

export const TableConstructor = () => {
  type Size = 'small' | 'medium' | 'large';
  const tableWidth = 950;
  const iconWidthBySize = {
    small: 16,
    medium: 20,
    large: 24,
  };
  const actionsColumnWidthBySize = {
    small: 160,
    medium: 160,
    large: 184,
  };
  const checkboxColumnWidthBySize = {
    small: 32,
    medium: 42,
    large: 52,
  };
  const headerPaddingXBySize = {
    small: 26,
    medium: 34,
    large: 42,
  };
  const headerPaddingRightBySize = {
    small: 13,
    medium: 17,
    large: 21,
  };
  const cellPaddingLeftBySize = {
    small: 13,
    medium: 17,
    large: 21,
  };

  const initialData = React.useMemo(
    () => [
      {
        id: 1,
        name: 'Гвозди металлические 34 кг 1 мм на 5 мм обработанные',
        article: '923812939',
        type: 'Материал',
        stock: null,
      },
      {
        id: 2,
        name: 'Шурупы 50 шт',
        article: '12345678',
        type: null,
        stock: '50 шт',
      },
      {
        id: 3,
        name: 'Подшипники роликовые',
        article: null,
        type: 'Товар',
        stock: '5 шт',
      },
      {
        id: 4,
        name: 'Ключи комбинированные',
        article: '34985723',
        type: 'Товар',
        stock: null,
      },
      {
        id: 5,
        name: 'Отвертки набор',
        article: '23894723',
        type: null,
        stock: '20 шт',
      },
      {
        id: 6,
        name: 'Плоскогубцы',
        article: '57389201',
        type: 'Товар',
        stock: '8 шт',
      },
    ],
    []
  );

  const [size, setSize] = React.useState<Size>('medium');

  const [checkboxes, setCheckboxes] = React.useState(false);
  const [leadingIcon, setLeadingIcon] = React.useState(true);
  const [inlineIcon, setInlineIcon] = React.useState(true);

  const [rowDividers, setRowDividers] = React.useState(true);
  const [rowClick, setRowClick] = React.useState(true);

  const [actionsEnabled, setActionsEnabled] = React.useState(true);
  const [actionsOverlay, setActionsOverlay] = React.useState(false);
  const [actionsKebab, setActionsKebab] = React.useState(false);
  const [withDanger, setWithDanger] = React.useState(true);

  const { checkedRows, isCheckedAll, hasChecked, checkboxRef, selectAll, toggleRow, isRowChecked } =
    useTableRowSelection(initialData);

  const getIcon = React.useCallback(
    (Icon16: React.ComponentType, Icon20: React.ComponentType, Icon24: React.ComponentType) => {
      switch (size) {
        case 'small':
          return <Icon16 />;
        case 'medium':
          return <Icon20 />;
        case 'large':
          return <Icon24 />;
        default:
          return <Icon20 />;
      }
    },
    [size]
  );

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

  const sectionTitle: React.CSSProperties = {
    fontSize: 11,
    fontWeight: 600,
    color: '#888',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    marginBottom: 10,
  };
  const subtitle: React.CSSProperties = {
    fontSize: 12,
    color: '#858585',
    marginTop: 2,
  };

  const footerColspan = 3 + (separateActionsColumn ? 1 : 0);
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

  const iconSize = (s: Size): 16 | 20 | 24 => {
    switch (s) {
      case 'small':
        return 16;
      case 'large':
        return 24;
      default:
        return 20;
    }
  };

  const code = React.useMemo(() => {
    const rowBottomBorder = rowDividers ? ' bottomBorder' : '';
    const rowClickProp = rowClick ? ' onClick={() => console.log(row.id)}' : '';
    const itemsVisibleProp = actionsKebab ? ' itemsVisible={0}' : '';

    const itemsLines = [
      `  const items = [`,
      `    { key: 'send', icon: <IconSendPaperplaneRegular${iconSize(size)} />, text: 'Отправить' },`,
      ...(withDanger
        ? [`    { key: 'delete', icon: <IconTrashCanRegular${iconSize(size)} />, text: 'Удалить', danger: true },`]
        : []),
      `    { key: 'print', icon: <IconTechPrinterRegular${iconSize(size)} />, text: 'Напечатать' },`,
      `    { key: 'copy', icon: <IconDocsPlusRegular${iconSize(size)} />, text: 'Скопировать' },`,
      `  ];`,
    ];

    const nameInner = inlineIcon
      ? [
          `          <span style={{ display: 'inline-flex', alignItems: 'baseline', gap: 6, fontWeight: 600 }}>`,
          `            <IconBookmarkRegular${iconSize(size)} />`,
          `            {row.name}`,
          `          </span>`,
        ]
      : [`          <span style={{ fontWeight: 600 }}>{row.name}</span>`];
    const nameCell = [
      `        <Table.Cell${leadingIcon ? ` style={{ paddingLeft: 8 }}` : ''}>`,
      ...nameInner,
      `          <div style={{ fontSize: 12, color: '#858585', marginTop: 2 }}>`,
      `            {row.article ? \`Артикул: \${row.article}\` : '—'}`,
      `          </div>`,
      `        </Table.Cell>`,
    ];

    const lines = [
      ...itemsLines,
      ``,
      `  <Table size="${size}" hasChecked={hasChecked}>`,
      `    <Table.Header>`,
      `      <Table.Row>`,
      ...(checkboxes
        ? [`        <Table.HeaderCheckboxCell {...selectAllProps} aria-label="Выбрать все строки" />`]
        : []),
      ...(leadingIcon ? [`        <Table.HeaderCell width="..." noPaddingRight />`] : []),
      `        <Table.HeaderCell${leadingIcon ? ` style={{ paddingLeft: 8 }}` : ''}>Товар</Table.HeaderCell>`,
      `        <Table.HeaderCell>Тип</Table.HeaderCell>`,
      `        <Table.HeaderCell currency>Остаток</Table.HeaderCell>`,
      ...(separateActionsColumn ? [`        <Table.HeaderCell width="..." />`] : []),
      `      </Table.Row>`,
      `    </Table.Header>`,
      `    <Table.Body>`,
      `      {data.map((row) => (`,
      `        <Table.Row key={row.id}${rowBottomBorder}${rowClickProp}>`,
      ...(checkboxes
        ? [`          <Table.CheckboxCell {...rowProps(row)} aria-label={\`Выбрать строку \${row.name}\`} />`]
        : []),
      ...(leadingIcon
        ? [
            `          <Table.Cell noPaddingRight>`,
            `            <IconArrowRoundTimeForwardRegular${iconSize(size)} />`,
            `          </Table.Cell>`,
          ]
        : []),
      ...nameCell.map((l) => `  ${l}`),
      `          <Table.Cell>{row.type ?? '—'}</Table.Cell>`,
      `          <Table.Cell currency>`,
      `            {row.stock ?? '—'}`,
      ...(actionsEnabled && actionsOverlay
        ? [`            <Table.ActionBar overlay items={items}${itemsVisibleProp} />`]
        : []),
      `          </Table.Cell>`,
      ...(separateActionsColumn
        ? [
            `          <Table.Cell contentCompensator={false}>`,
            `            <Table.ActionBar items={items}${itemsVisibleProp} />`,
            `          </Table.Cell>`,
          ]
        : []),
      `        </Table.Row>`,
      `      ))}`,
      `    </Table.Body>`,
      `  </Table>`,
    ];

    return lines.join('\n');
  }, [
    size,
    checkboxes,
    leadingIcon,
    inlineIcon,
    rowDividers,
    rowClick,
    actionsEnabled,
    actionsOverlay,
    actionsKebab,
    withDanger,
    separateActionsColumn,
  ]);

  const fullCode = React.useMemo(() => {
    const sz = iconSize(size);
    const roundPx = (value: string) => `${Math.round(parseFloat(value))}px`;
    const itemsVisibleProp = actionsKebab ? ' itemsVisible={0}' : '';
    const rowClickProp = rowClick ? ' onClick={() => console.log(row.id)}' : '';

    const imports = [`import React from 'react';`];
    imports.push(
      checkboxes
        ? `import { Table, useTableRowSelection } from '@skbkontur/table';`
        : `import { Table } from '@skbkontur/table';`
    );
    if (leadingIcon) {
      imports.push(
        `import { IconArrowRoundTimeForwardRegular${sz} } from '@skbkontur/icons/IconArrowRoundTimeForwardRegular${sz}';`
      );
    }
    if (inlineIcon) {
      imports.push(`import { IconBookmarkRegular${sz} } from '@skbkontur/icons/IconBookmarkRegular${sz}';`);
    }
    if (actionsEnabled) {
      imports.push(`import { IconSendPaperplaneRegular${sz} } from '@skbkontur/icons/IconSendPaperplaneRegular${sz}';`);
      if (withDanger) {
        imports.push(`import { IconTrashCanRegular${sz} } from '@skbkontur/icons/IconTrashCanRegular${sz}';`);
      }
      imports.push(`import { IconTechPrinterRegular${sz} } from '@skbkontur/icons/IconTechPrinterRegular${sz}';`);
      imports.push(`import { IconDocsPlusRegular${sz} } from '@skbkontur/icons/IconDocsPlusRegular${sz}';`);
    }

    const data = `const data = [
  { id: 1, name: 'Гвозди металлические 34 кг 1 мм на 5 мм обработанные', article: '923812939', type: 'Материал', stock: null },
  { id: 2, name: 'Шурупы 50 шт', article: '12345678', type: null, stock: '50 шт' },
  { id: 3, name: 'Подшипники роликовые', article: null, type: 'Товар', stock: '5 шт' },
  { id: 4, name: 'Ключи комбинированные', article: '34985723', type: 'Товар', stock: null },
  { id: 5, name: 'Отвертки набор', article: '23894723', type: null, stock: '20 шт' },
  { id: 6, name: 'Плоскогубцы', article: '57389201', type: 'Товар', stock: '8 шт' },
];`;

    const selectionLines = checkboxes
      ? [
          `  const { checkedRows, isCheckedAll, hasChecked, checkboxRef, selectAll, toggleRow, isRowChecked } =`,
          `    useTableRowSelection(data);`,
          ``,
        ]
      : [];

    const itemsLines = actionsEnabled
      ? [
          `  const items = [`,
          `    { key: 'send', icon: <IconSendPaperplaneRegular${sz} />, text: 'Отправить' },`,
          ...(withDanger
            ? [`    { key: 'delete', icon: <IconTrashCanRegular${sz} />, text: 'Удалить', danger: true },`]
            : []),
          `    { key: 'print', icon: <IconTechPrinterRegular${sz} />, text: 'Напечатать' },`,
          `    { key: 'copy', icon: <IconDocsPlusRegular${sz} />, text: 'Скопировать' },`,
          `  ];`,
          ``,
        ]
      : [];

    const nameCellLines = inlineIcon
      ? [
          `              <Table.Cell${leadingIcon ? ` style={{ paddingLeft: 8 }}` : ''}>`,
          `                <span style={{ display: 'inline-flex', alignItems: 'baseline', gap: 6, fontWeight: 600 }}>`,
          `                  <IconBookmarkRegular${sz} />`,
          `                  {row.name}`,
          `                </span>`,
          `                <div style={{ fontSize: 12, color: '#858585', marginTop: 2 }}>`,
          `                  {row.article ? \`Артикул: \${row.article}\` : '—'}`,
          `                </div>`,
          `              </Table.Cell>`,
        ]
      : [
          `              <Table.Cell${leadingIcon ? ` style={{ paddingLeft: 8 }}` : ''}>`,
          `                <span style={{ fontWeight: 600 }}>{row.name}</span>`,
          `                <div style={{ fontSize: 12, color: '#858585', marginTop: 2 }}>`,
          `                  {row.article ? \`Артикул: \${row.article}\` : '—'}`,
          `                </div>`,
          `              </Table.Cell>`,
        ];

    const stockCellLines =
      actionsEnabled && actionsOverlay
        ? [
            `              <Table.Cell currency>`,
            `                {row.stock ?? '—'}`,
            `                <Table.ActionBar overlay items={items}${itemsVisibleProp} />`,
            `              </Table.Cell>`,
          ]
        : [`              <Table.Cell currency>{row.stock ?? '—'}</Table.Cell>`];

    const lines = [
      ...imports,
      ``,
      data,
      ``,
      `export default function App() {`,
      ...selectionLines,
      ...itemsLines,
      `  return (`,
      `    <div style={{ width: ${tableWidth} }}>`,
      `      <Table size="${size}"${checkboxes ? ' hasChecked={hasChecked}' : ''}>`,
      `        <Table.Header>`,
      `          <Table.Row>`,
      ...(checkboxes
        ? [
            `            <Table.HeaderCheckboxCell`,
            `              checkboxRef={checkboxRef}`,
            `              onClick={() => selectAll()}`,
            `              checked={isCheckedAll}`,
            `              initialIndeterminate={hasChecked}`,
            `              aria-label="Выбрать все строки"`,
            `            />`,
          ]
        : []),
      ...(leadingIcon ? [`            <Table.HeaderCell width="${leadingIconColumnWidth}px" noPaddingRight />`] : []),
      `            <Table.HeaderCell width="${roundPx(nameColumnWidth)}"${leadingIcon ? ` style={{ paddingLeft: 8 }}` : ''}>Товар</Table.HeaderCell>`,
      `            <Table.HeaderCell width="${roundPx(typeColumnWidth)}">Тип</Table.HeaderCell>`,
      `            <Table.HeaderCell width="${roundPx(stockColumnWidth)}" currency>Остаток</Table.HeaderCell>`,
      ...(separateActionsColumn ? [`            <Table.HeaderCell width="${actionsColumnWidth}px" />`] : []),
      `          </Table.Row>`,
      `        </Table.Header>`,
      `        <Table.Body>`,
      `          {data.map((row) => (`,
      `            <Table.Row key={row.id}${checkboxes ? ` checked={checkedRows.has(row.id)}` : ''}${rowDividers ? ` bottomBorder` : ''}${rowClickProp}>`,
      ...(checkboxes
        ? [
            `              <Table.CheckboxCell`,
            `                checked={isRowChecked(row.id)}`,
            `                onCheckboxClick={(e) => toggleRow(e, row.id)}`,
            `                aria-label={\`Выбрать строку \${row.name}\`}`,
            `              />`,
          ]
        : []),
      ...(leadingIcon
        ? [
            `              <Table.Cell noPaddingRight noBottomBorder>`,
            `                <IconArrowRoundTimeForwardRegular${sz} />`,
            `              </Table.Cell>`,
          ]
        : []),
      ...nameCellLines,
      `              <Table.Cell>{row.type ?? '—'}</Table.Cell>`,
      ...stockCellLines,
      ...(separateActionsColumn
        ? [
            `              <Table.Cell contentCompensator={false}>`,
            `                <Table.ActionBar items={items}${itemsVisibleProp} />`,
            `              </Table.Cell>`,
          ]
        : []),
      `            </Table.Row>`,
      `          ))}`,
      `        </Table.Body>`,
      `      </Table>`,
      `    </div>`,
      `  );`,
      `}`,
    ];

    return lines.join('\n');
  }, [
    size,
    checkboxes,
    leadingIcon,
    inlineIcon,
    rowDividers,
    rowClick,
    actionsEnabled,
    actionsOverlay,
    actionsKebab,
    withDanger,
    separateActionsColumn,
    leadingIconColumnWidth,
    actionsColumnWidth,
    nameColumnWidth,
    typeColumnWidth,
    stockColumnWidth,
  ]);

  const openInCodex = () => {
    const compressed = compressToEncodedURIComponent(fullCode);
    window.open(`https://codex.skbkontur.ru/#/sandbox#code=${compressed}`, '_blank');
  };

  return (
    <div style={{ width: tableWidth }}>
      <h2>Конструктор таблицы</h2>
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 40, marginBottom: 24 }}>
        <div>
          <div style={sectionTitle}>Размер</div>
          <Switcher
            items={['small', 'medium', 'large']}
            value={size}
            onValueChange={(value) => setSize(value as Size)}
          />
        </div>
        <div>
          <div style={sectionTitle}>Колонки</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <Toggle checked={checkboxes} onValueChange={setCheckboxes}>
              Чекбоксы
            </Toggle>
            <Toggle checked={leadingIcon} onValueChange={setLeadingIcon}>
              Иконка-индикатор
            </Toggle>
            <Toggle checked={inlineIcon} onValueChange={setInlineIcon}>
              Иконка в ячейке
            </Toggle>
          </div>
        </div>
        <div>
          <div style={sectionTitle}>Строки</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <Toggle checked={rowDividers} onValueChange={setRowDividers}>
              Разделители строк
            </Toggle>
            <Toggle checked={rowClick} onValueChange={setRowClick}>
              Клик по строке
            </Toggle>
          </div>
        </div>
        <div>
          <div style={sectionTitle}>ActionBar</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <Toggle checked={actionsEnabled} onValueChange={setActionsEnabled}>
              Действия со строкой
            </Toggle>
            <Toggle checked={actionsOverlay} onValueChange={setActionsOverlay} disabled={!actionsEnabled}>
              Поверх содержимого
            </Toggle>
            <Toggle checked={actionsKebab} onValueChange={setActionsKebab} disabled={!actionsEnabled}>
              Скрыть в кебаб
            </Toggle>
            <Toggle checked={withDanger} onValueChange={setWithDanger} disabled={!actionsEnabled}>
              Опасное действие
            </Toggle>
          </div>
        </div>
      </div>

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
        <Table.Footer>
          <Table.Row>
            {checkboxes && <Table.Cell checkboxCell noBottomBorder />}
            {leadingIcon && <Table.Cell noPaddingRight noBottomBorder />}
            <Table.Cell colSpan={footerColspan}>
              <span>Всего записей: {initialData.length}</span>
            </Table.Cell>
          </Table.Row>
        </Table.Footer>
      </Table>

      <div style={{ marginTop: 24 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
          <div style={sectionTitle}>Код</div>
          <button
            type="button"
            onClick={openInCodex}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
              padding: '4px 10px',
              fontSize: 12,
              cursor: 'pointer',
              border: '1px solid #dee0e3',
              borderRadius: 6,
              background: '#fff',
            }}
          >
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
              <path
                d="M4.5 2H11.5C12.3284 2 13 2.67157 13 3.5V12.5C13 13.3284 12.3284 14 11.5 14H4.5C3.67157 14 3 13.3284 3 12.5V3.5C3 2.67157 3.67157 2 4.5 2ZM4 12.5C4 12.7761 4.22386 13 4.5 13H11.5C11.7761 13 12 12.7761 12 12.5V3.5C12 3.22386 11.7761 3 11.5 3H4.5C4.22386 3 4 3.22386 4 3.5V12.5ZM5 5H11V6H5V5ZM5 8H9V9H5V8Z"
                fill="#AAA"
              />
            </svg>
            Открыть в Codex
          </button>
        </div>
        <pre
          style={{
            margin: 0,
            padding: 12,
            border: '1px solid #e2e7eb',
            borderRadius: 6,
            background: '#f6f8fa',
            fontSize: 12,
            lineHeight: 1.45,
            overflow: 'auto',
          }}
        >
          {code}
        </pre>
      </div>
    </div>
  );
};
