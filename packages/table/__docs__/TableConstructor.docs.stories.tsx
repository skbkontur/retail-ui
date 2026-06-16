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
import { Button } from '@skbkontur/react-ui/components/Button';
import { Group } from '@skbkontur/react-ui/components/Group';
import { Switcher } from '@skbkontur/react-ui/components/Switcher';
import React from 'react';

import { Table, useTableRowSelection } from '../index';

export default {
  title: 'Examples/Table Constructor',
};

export const TableConstructor = () => {
  type Size = 'small' | 'medium' | 'large';
  type ActionsMode = 'off' | 'popup' | 'separate';
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
        client: 'ООО «Кавычки»',
        region: 'Курская обл',
        amount: 85000,
        responsible: 'Антон Чехов',
        flagged: true,
      },
      {
        id: 2,
        client: 'Рыков Н. В.',
        region: 'Хакасия',
        amount: 127000,
        responsible: 'Алексей Толстой',
        flagged: false,
      },
      { id: 3, client: 'ИП Петров', region: 'Москва', amount: 56000, responsible: 'Иван Бунин', flagged: true },
      {
        id: 4,
        client: 'ООО «Логистика»',
        region: 'Татарстан',
        amount: 412000,
        responsible: 'Михаил Лермонтов',
        flagged: false,
      },
    ],
    []
  );

  const [size, setSize] = React.useState<Size>('medium');
  const [checkboxes, setCheckboxes] = React.useState(false);
  const [leadingIcon, setLeadingIcon] = React.useState(true);
  const [inlineIcon, setInlineIcon] = React.useState(true);
  const [actionsMode, setActionsMode] = React.useState<ActionsMode>('separate');
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

  const label: React.CSSProperties = {
    fontSize: 11,
    fontWeight: 600,
    color: '#888',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    marginBottom: 6,
  };

  const footerColspan = 3 + (actionsMode === 'separate' ? 1 : 0);
  const leadingIconColumnWidth = cellPaddingLeftBySize[size] + iconWidthBySize[size];
  const actionsColumnWidth = actionsColumnWidthBySize[size];
  const fixedWidth =
    (checkboxes ? checkboxColumnWidthBySize[size] : 0) +
    (leadingIcon ? leadingIconColumnWidth : 0) +
    (actionsMode === 'separate' ? actionsColumnWidth : 0);
  const amountColumnWeight = actionsMode === 'separate' ? 20 : 25;
  const contentColumnWeight = 33 + 33 + amountColumnWeight;
  const contentWidth = tableWidth - fixedWidth;
  const getContentColumnWidth = (weight: number, paddingX: number) =>
    `${Math.max(0, (contentWidth * weight) / contentColumnWeight - paddingX)}px`;

  const clientColumnPaddingX = leadingIcon ? 8 + headerPaddingRightBySize[size] : headerPaddingXBySize[size];
  const clientColumnWidth = getContentColumnWidth(33, clientColumnPaddingX);
  const regionColumnWidth = getContentColumnWidth(33, headerPaddingXBySize[size]);
  const amountColumnWidth = getContentColumnWidth(amountColumnWeight, headerPaddingXBySize[size]);

  return (
    <div style={{ width: tableWidth }}>
      <h2>Конструктор таблицы</h2>
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 24, marginBottom: 20 }}>
        <div>
          <div style={label}>Размер</div>
          <Switcher
            items={['small', 'medium', 'large']}
            value={size}
            onValueChange={(value) => setSize(value as Size)}
          />
        </div>
        <div>
          <div style={label}>ActionBar</div>
          <Group>
            {(['off', 'popup', 'separate'] as ActionsMode[]).map((mode) => (
              <Button key={mode} checked={actionsMode === mode} onClick={() => setActionsMode(mode)}>
                {mode}
              </Button>
            ))}
            <Button use={withDanger ? 'danger' : 'default'} onClick={() => setWithDanger((v) => !v)}>
              Danger
            </Button>
          </Group>
        </div>
        <div>
          <div style={label}>Columns</div>
          <Group>
            <Button checked={checkboxes} onClick={() => setCheckboxes((v) => !v)}>
              Checkboxes
            </Button>
            <Button checked={leadingIcon} onClick={() => setLeadingIcon((v) => !v)}>
              Leading
            </Button>
            <Button checked={inlineIcon} onClick={() => setInlineIcon((v) => !v)}>
              Inline icon
            </Button>
          </Group>
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
            <Table.HeaderCell width={clientColumnWidth} style={leadingIcon ? { paddingLeft: 8 } : undefined}>
              Клиент
            </Table.HeaderCell>
            <Table.HeaderCell width={regionColumnWidth}>Регион</Table.HeaderCell>
            <Table.HeaderCell width={amountColumnWidth} currency>
              Сумма, ₽
            </Table.HeaderCell>
            {actionsMode === 'separate' && <Table.HeaderCell width={`${actionsColumnWidth}px`} />}
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {initialData.map((row) => (
            <Table.Row key={row.id} checked={checkedRows.has(row.id)} onClick={() => console.log('row click', row.id)}>
              {checkboxes && (
                <Table.CheckboxCell
                  checked={isRowChecked(row.id)}
                  onCheckboxClick={(e) => toggleRow(e, row.id)}
                  aria-label={`Выбрать строку ${row.client}`}
                />
              )}
              {leadingIcon && (
                <Table.Cell noPaddingRight>
                  {getIcon(
                    IconArrowRoundTimeForwardRegular16,
                    IconArrowRoundTimeForwardRegular20,
                    IconArrowRoundTimeForwardRegular24
                  )}
                </Table.Cell>
              )}
              <Table.Cell style={leadingIcon ? { paddingLeft: 8 } : undefined}>
                {inlineIcon ? (
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                    {getIcon(IconBookmarkRegular16, IconBookmarkRegular20, IconBookmarkRegular24)}
                    {row.client}
                  </span>
                ) : (
                  row.client
                )}
              </Table.Cell>
              <Table.Cell>{row.region}</Table.Cell>
              <Table.Cell currency>
                {row.amount.toLocaleString('ru-RU')}
                {actionsMode === 'popup' && <Table.ActionBar overlay items={items} />}
              </Table.Cell>
              {actionsMode === 'separate' && (
                <Table.Cell contentCompensator={false}>
                  <Table.ActionBar items={items} />
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
    </div>
  );
};
