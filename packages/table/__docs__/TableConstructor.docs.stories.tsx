import { IconBookmarkRegular16 } from '@skbkontur/icons/IconBookmarkRegular16';
import { IconBookmarkRegular20 } from '@skbkontur/icons/IconBookmarkRegular20';
import { IconBookmarkRegular24 } from '@skbkontur/icons/IconBookmarkRegular24';
import { IconCheckCircleSolid16 } from '@skbkontur/icons/IconCheckCircleSolid16';
import { IconCheckCircleSolid20 } from '@skbkontur/icons/IconCheckCircleSolid20';
import { IconCheckCircleSolid24 } from '@skbkontur/icons/IconCheckCircleSolid24';
import { IconSendPaperplaneRegular16 } from '@skbkontur/icons/IconSendPaperplaneRegular16';
import { IconSendPaperplaneRegular20 } from '@skbkontur/icons/IconSendPaperplaneRegular20';
import { IconSendPaperplaneRegular24 } from '@skbkontur/icons/IconSendPaperplaneRegular24';
import { IconTechPrinterRegular16 } from '@skbkontur/icons/IconTechPrinterRegular16';
import { IconTechPrinterRegular20 } from '@skbkontur/icons/IconTechPrinterRegular20';
import { IconTechPrinterRegular24 } from '@skbkontur/icons/IconTechPrinterRegular24';
import { IconTrashCanRegular16 } from '@skbkontur/icons/IconTrashCanRegular16';
import { IconTrashCanRegular20 } from '@skbkontur/icons/IconTrashCanRegular20';
import { IconTrashCanRegular24 } from '@skbkontur/icons/IconTrashCanRegular24';
import { IconWarningTriangleSolid16 } from '@skbkontur/icons/IconWarningTriangleSolid16';
import { IconWarningTriangleSolid20 } from '@skbkontur/icons/IconWarningTriangleSolid20';
import { IconWarningTriangleSolid24 } from '@skbkontur/icons/IconWarningTriangleSolid24';
import { IconXCircleSolid16 } from '@skbkontur/icons/IconXCircleSolid16';
import { IconXCircleSolid20 } from '@skbkontur/icons/IconXCircleSolid20';
import { IconXCircleSolid24 } from '@skbkontur/icons/IconXCircleSolid24';
import { Radio } from '@skbkontur/react-ui/components/Radio';
import { RadioGroup } from '@skbkontur/react-ui/components/RadioGroup';
import { Switcher } from '@skbkontur/react-ui/components/Switcher';
import { Toggle } from '@skbkontur/react-ui/components/Toggle';
import { Text } from '@skbkontur/typography';
import { compressToEncodedURIComponent } from 'lz-string';
import React from 'react';

import { Table, useTableRowSelection } from '../index';

export default {
  title: 'Table Constructor',
};

type Size = 'small' | 'medium' | 'large';
type Status = 'ok' | 'warning' | 'error';

export const TableConstructor = () => {
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
        status: 'error' as Status,
      },
      {
        id: 2,
        name: 'Шурупы 50 шт',
        article: '12345678',
        type: null,
        stock: '50 шт',
        status: 'ok' as Status,
      },
      {
        id: 3,
        name: 'Подшипники роликовые',
        article: null,
        type: 'Товар',
        stock: '5 шт',
        status: 'warning' as Status,
      },
      {
        id: 4,
        name: 'Ключи комбинированные',
        article: '34985723',
        type: 'Товар',
        stock: null,
        status: 'error' as Status,
      },
      {
        id: 5,
        name: 'Отвертки набор',
        article: '23894723',
        type: null,
        stock: '20 шт',
        status: 'ok' as Status,
      },
      {
        id: 6,
        name: 'Плоскогубцы',
        article: '57389201',
        type: 'Товар',
        stock: '8 шт',
        status: 'warning' as Status,
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

  const { isCheckedAll, hasChecked, checkboxRef, selectAll, toggleRow, isRowChecked } =
    useTableRowSelection(initialData);

  const getIcon = React.useCallback(
    (
      Icon16: React.ComponentType<{ color?: string }>,
      Icon20: React.ComponentType<{ color?: string }>,
      Icon24: React.ComponentType<{ color?: string }>,
      color?: string
    ) => {
      switch (size) {
        case 'small':
          return <Icon16 color={color} />;
        case 'large':
          return <Icon24 color={color} />;
        default:
          return <Icon20 color={color} />;
      }
    },
    [size]
  );

  const statusColors: Record<Status, string> = {
    ok: '#3fad53',
    warning: '#f59f00',
    error: '#e3000f',
  };

  const getStatusIcon = React.useCallback(
    (status: Status) => {
      switch (status) {
        case 'ok':
          return getIcon(IconCheckCircleSolid16, IconCheckCircleSolid20, IconCheckCircleSolid24, statusColors.ok);
        case 'warning':
          return getIcon(
            IconWarningTriangleSolid16,
            IconWarningTriangleSolid20,
            IconWarningTriangleSolid24,
            statusColors.warning
          );
        case 'error':
          return getIcon(IconXCircleSolid16, IconXCircleSolid20, IconXCircleSolid24, statusColors.error);
        default:
          return null;
      }
    },
    [getIcon]
  );

  const items = [
    {
      key: 'send',
      icon: getIcon(IconSendPaperplaneRegular16, IconSendPaperplaneRegular20, IconSendPaperplaneRegular24),
      text: 'Отправить',
    },
    {
      key: 'delete',
      icon: getIcon(IconTrashCanRegular16, IconTrashCanRegular20, IconTrashCanRegular24),
      text: 'Удалить',
      danger: true,
    },
    {
      key: 'print',
      icon: getIcon(IconTechPrinterRegular16, IconTechPrinterRegular20, IconTechPrinterRegular24),
      text: 'Напечатать',
    },
  ];

  const overlayActions = actionsEnabled && actionsOverlay;
  const separateActionsColumn = actionsEnabled && !actionsOverlay;
  const itemsVisible = actionsKebab ? 0 : undefined;

  const bodyUseBySize = { small: 'body-s', medium: 'body-m', large: 'body-l' } as const;
  const nameUse = bodyUseBySize[size];

  const sectionTitle: React.CSSProperties = {
    fontSize: 11,
    fontWeight: 600,
    color: '#888',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    marginBottom: 10,
  };
  const subtitle: React.CSSProperties = {
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
    const sz = iconSize(size);
    const nameTextUse = bodyUseBySize[size];
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
      imports.push(`import { IconCheckCircleSolid${sz} } from '@skbkontur/icons/IconCheckCircleSolid${sz}';`);
      imports.push(`import { IconWarningTriangleSolid${sz} } from '@skbkontur/icons/IconWarningTriangleSolid${sz}';`);
      imports.push(`import { IconXCircleSolid${sz} } from '@skbkontur/icons/IconXCircleSolid${sz}';`);
    }
    if (inlineIcon) {
      imports.push(`import { IconBookmarkRegular${sz} } from '@skbkontur/icons/IconBookmarkRegular${sz}';`);
    }
    if (actionsEnabled) {
      imports.push(`import { IconSendPaperplaneRegular${sz} } from '@skbkontur/icons/IconSendPaperplaneRegular${sz}';`);
      imports.push(`import { IconTrashCanRegular${sz} } from '@skbkontur/icons/IconTrashCanRegular${sz}';`);
      imports.push(`import { IconTechPrinterRegular${sz} } from '@skbkontur/icons/IconTechPrinterRegular${sz}';`);
    }
    imports.push(`import { Text } from '@skbkontur/typography';`);

    const data = `const data = [
  { id: 1, name: 'Гвозди металлические 34 кг 1 мм на 5 мм обработанные', article: '923812939', type: 'Материал', stock: null, status: 'error' },
  { id: 2, name: 'Шурупы 50 шт', article: '12345678', type: null, stock: '50 шт', status: 'ok' },
  { id: 3, name: 'Подшипники роликовые', article: null, type: 'Товар', stock: '5 шт', status: 'warning' },
  { id: 4, name: 'Ключи комбинированные', article: '34985723', type: 'Товар', stock: null, status: 'error' },
  { id: 5, name: 'Отвертки набор', article: '23894723', type: null, stock: '20 шт', status: 'ok' },
  { id: 6, name: 'Плоскогубцы', article: '57389201', type: 'Товар', stock: '8 шт', status: 'warning' },
];`;

    const selectionLines = checkboxes
      ? [
          `  const { isCheckedAll, hasChecked, checkboxRef, selectAll, toggleRow, isRowChecked } =`,
          `    useTableRowSelection(data);`,
          ``,
        ]
      : [];

    const itemsLines = actionsEnabled
      ? [
          `  const items = [`,
          `    { key: 'send', icon: <IconSendPaperplaneRegular${sz} />, text: 'Отправить' },`,
          `    { key: 'delete', icon: <IconTrashCanRegular${sz} />, text: 'Удалить', danger: true },`,
          `    { key: 'print', icon: <IconTechPrinterRegular${sz} />, text: 'Напечатать' },`,
          `  ];`,
          ``,
        ]
      : [];

    const statusIconLines = leadingIcon
      ? [
          `  const statusIcon = {`,
          `    ok: <IconCheckCircleSolid${sz} color="${statusColors.ok}" />,`,
          `    warning: <IconWarningTriangleSolid${sz} color="${statusColors.warning}" />,`,
          `    error: <IconXCircleSolid${sz} color="${statusColors.error}" />,`,
          `  };`,
          ``,
        ]
      : [];

    const nameInnerLines = inlineIcon
      ? [
          `                <span style={{ display: 'inline-flex', gap: 6, alignItems: 'baseline' }}>`,
          `                  <IconBookmarkRegular${sz} />`,
          `                  <Text use="${nameTextUse}" weight="bold">{row.name}</Text>`,
          `                </span>`,
        ]
      : [`                <Text use="${nameTextUse}" weight="bold">{row.name}</Text>`];

    const nameCellLines = [
      `              <Table.Cell${leadingIcon ? ` style={{ paddingLeft: 8 }}` : ''}>`,
      ...nameInnerLines,
      `                <Text as="div" use="body-xs" style={{ color: '#858585', marginTop: 2 }}>`,
      `                  {row.article ? \`Артикул: \${row.article}\` : '—'}`,
      `                </Text>`,
      `              </Table.Cell>`,
    ];

    const stockCellLines = overlayActions
      ? [
          `              <Table.Cell currency>`,
          `                {row.stock ?? '—'}`,
          `                <Table.ActionBar overlay items={items}${itemsVisibleProp} />`,
          `              </Table.Cell>`,
        ]
      : [`              <Table.Cell currency>{row.stock ?? '—'}</Table.Cell>`];

    const footerLines = [
      `        <Table.Footer>`,
      `          <Table.Row>`,
      ...(checkboxes ? [`            <Table.Cell checkboxCell noBottomBorder />`] : []),
      ...(leadingIcon ? [`            <Table.Cell noPaddingRight noBottomBorder />`] : []),
      `            <Table.Cell colSpan={${footerColspan}}>Всего записей: {data.length}</Table.Cell>`,
      `          </Table.Row>`,
      `        </Table.Footer>`,
    ];

    const lines = [
      ...imports,
      ``,
      data,
      ``,
      `export default function App() {`,
      ...selectionLines,
      ...statusIconLines,
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
      `            <Table.Row key={row.id}${checkboxes ? ` checked={isRowChecked(row.id)}` : ''}${rowDividers ? ` bottomBorder` : ''}${rowClickProp}>`,
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
            `                {statusIcon[row.status]}`,
            `              </Table.Cell>`,
          ]
        : []),
      ...nameCellLines,
      `              <Table.Cell>{row.type ?? '—'}</Table.Cell>`,
      ...stockCellLines,
      ...(separateActionsColumn
        ? [
            `              <Table.Cell contentCompensator={false}>`,
            `                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>`,
            `                  <Table.ActionBar items={items}${itemsVisibleProp} />`,
            `                </div>`,
            `              </Table.Cell>`,
          ]
        : []),
      `            </Table.Row>`,
      `          ))}`,
      `        </Table.Body>`,
      ...footerLines,
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
    overlayActions,
    separateActionsColumn,
    footerColspan,
    leadingIconColumnWidth,
    actionsColumnWidth,
    nameColumnWidth,
    typeColumnWidth,
    stockColumnWidth,
  ]);

  const openInCodex = () => {
    const compressed = compressToEncodedURIComponent(code);
    window.open(`https://codex.skbkontur.ru/#/sandbox#code=${compressed}`, '_blank');
  };

  return (
    <div style={{ width: tableWidth }}>
      <h2>Конструктор таблицы</h2>
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 48, marginBottom: 24, flexWrap: 'wrap' }}>
        <div>
          <div style={sectionTitle}>Размер</div>
          <Switcher
            items={['small', 'medium', 'large']}
            value={size}
            onValueChange={(value) => setSize(value as Size)}
          />
        </div>
        <div>
          <div style={sectionTitle}>Строки</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <Toggle checked={rowDividers} onValueChange={setRowDividers}>
              Разделители
            </Toggle>
            <Toggle checked={rowClick} onValueChange={setRowClick}>
              Кликабельность
            </Toggle>
          </div>
        </div>
        <div>
          <div style={sectionTitle}>Колонки</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <Toggle checked={checkboxes} onValueChange={setCheckboxes}>
              Чекбоксы
            </Toggle>
            <Toggle checked={leadingIcon} onValueChange={setLeadingIcon}>
              Иконка-статус
            </Toggle>
            <Toggle checked={inlineIcon} onValueChange={setInlineIcon}>
              Иконка в ячейке
            </Toggle>
            <Toggle checked={actionsEnabled} onValueChange={setActionsEnabled}>
              Действия со строкой
            </Toggle>
          </div>
        </div>
        <div>
          <div style={sectionTitle}>Расположение действий</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <RadioGroup
              value={actionsOverlay ? 'overlay' : 'column'}
              onValueChange={(value) => setActionsOverlay(value === 'overlay')}
              disabled={!actionsEnabled}
            >
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <Radio value="column">Отдельной колонкой</Radio>
                <Radio value="overlay">Поверх строки</Radio>
              </div>
            </RadioGroup>
            <Toggle checked={actionsKebab} onValueChange={setActionsKebab} disabled={!actionsEnabled}>
              Свернуть в кебаб-меню
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
              checked={isRowChecked(row.id)}
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
                  {getStatusIcon(row.status)}
                </Table.Cell>
              )}
              <Table.Cell style={leadingIcon ? { paddingLeft: 8 } : undefined}>
                {inlineIcon ? (
                  <span style={{ display: 'inline-flex', gap: 6, alignItems: 'baseline' }}>
                    {getIcon(IconBookmarkRegular16, IconBookmarkRegular20, IconBookmarkRegular24)}
                    <Text use={nameUse} weight="bold">
                      {row.name}
                    </Text>
                  </span>
                ) : (
                  <Text use={nameUse} weight="bold">
                    {row.name}
                  </Text>
                )}
                <Text as="div" use="body-xs" style={subtitle}>
                  {row.article ? `Артикул: ${row.article}` : '—'}
                </Text>
              </Table.Cell>
              <Table.Cell>{row.type ?? '—'}</Table.Cell>
              <Table.Cell currency>
                {row.stock ?? '—'}
                {overlayActions && <Table.ActionBar overlay items={items} itemsVisible={itemsVisible} />}
              </Table.Cell>
              {separateActionsColumn && (
                <Table.Cell contentCompensator={false}>
                  <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Table.ActionBar items={items} itemsVisible={itemsVisible} />
                  </div>
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
