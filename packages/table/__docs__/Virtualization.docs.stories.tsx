import { Table, useTableRowSelection } from '@skbkontur/table';
import { useVirtualizer } from '@tanstack/react-virtual';
import React from 'react';

export default {
  title: 'Virtualization',
};

export const VirtualizationExampleStory = () => {
  const COLUMN_COUNT = 5;
  const ROW_HEIGHT = 33;
  const VIEWPORT_HEIGHT = 420;
  const OVERSCAN = 8;

  const CLIENTS = ['ООО «Кавычки»', 'Рыков Н. В.', 'ООО «Альянс Авиа»', 'ЗАО «Восход»', 'ИП Смирнов'];
  const REGIONS = ['Курская обл 46', 'Хакасия 19', 'Свердловская обл 66', 'Московская обл 50', 'Татарстан 16'];
  const NAMES = ['Антон Чехов', 'Алексей Толстой', 'Иван Тургенев', 'Мария Смирнова', 'Фёдор Достоевский'];

  const data = React.useMemo(
    () =>
      Array.from({ length: 10000 }, (_, i) => ({
        id: i + 1,
        client: CLIENTS[i % CLIENTS.length],
        region: REGIONS[i % REGIONS.length],
        amount: 5000 + ((i * 7919) % 990000),
        responsible: NAMES[i % NAMES.length],
      })),
    [],
  );

  const scrollRef = React.useRef<HTMLDivElement>(null);

  const rowVirtualizer = useVirtualizer({
    count: data.length,
    getScrollElement: () => scrollRef.current,
    estimateSize: () => ROW_HEIGHT,
    overscan: OVERSCAN,
  });

  const { checkedRows, isCheckedAll, hasChecked, checkboxRef, selectAll, toggleRow, isRowChecked } =
    useTableRowSelection(data);

  const virtualRows = rowVirtualizer.getVirtualItems();
  const totalSize = rowVirtualizer.getTotalSize();
  const paddingTop = virtualRows.length > 0 ? virtualRows[0].start : 0;
  const paddingBottom = virtualRows.length > 0 ? totalSize - virtualRows[virtualRows.length - 1].end : 0;

  return (
    <div style={{ width: '100%', maxWidth: 900 }}>
      <div
        ref={scrollRef}
        style={{ height: VIEWPORT_HEIGHT, overflow: 'auto', border: '1px solid #EAEDF2', borderRadius: 8 }}
      >
        <Table hasChecked={hasChecked} size="small">
          <Table.Header sticky>
            <Table.Row>
              <Table.HeaderCheckboxCell
                checkboxRef={checkboxRef}
                onClick={() => selectAll()}
                checked={isCheckedAll}
                initialIndeterminate={hasChecked}
                aria-label="Выбрать все строки"
              />
              <Table.HeaderCell scope="col">Клиент</Table.HeaderCell>
              <Table.HeaderCell scope="col">Регион</Table.HeaderCell>
              <Table.HeaderCell scope="col" currency>
                Сумма, ₽
              </Table.HeaderCell>
              <Table.HeaderCell scope="col">Ответственный</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {paddingTop > 0 && (
              <tr aria-hidden style={{ height: paddingTop }}>
                <td colSpan={COLUMN_COUNT} style={{ padding: 0, border: 'none' }} />
              </tr>
            )}
            {virtualRows.map((virtualRow) => {
              const row = data[virtualRow.index];
              return (
                <Table.Row
                  key={row.id}
                  bottomBorder
                  checked={isRowChecked(row.id)}
                  onClick={(e) => toggleRow(e, row.id)}
                >
                  <Table.CheckboxCell
                    aria-label={`Выбрать строку ${row.id}`}
                    checked={isRowChecked(row.id)}
                    onCheckboxClick={(e) => toggleRow(e, row.id)}
                  />
                  <Table.Cell>{row.client}</Table.Cell>
                  <Table.Cell>{row.region}</Table.Cell>
                  <Table.Cell currency>{row.amount.toLocaleString('ru-RU')}</Table.Cell>
                  <Table.Cell>{row.responsible}</Table.Cell>
                </Table.Row>
              );
            })}
            {paddingBottom > 0 && (
              <tr aria-hidden style={{ height: paddingBottom }}>
                <td colSpan={COLUMN_COUNT} style={{ padding: 0, border: 'none' }} />
              </tr>
            )}
          </Table.Body>
          <Table.Footer sticky>
            <Table.Row>
              <Table.Cell checkboxCell />
              <Table.Cell colSpan={COLUMN_COUNT - 1}>
                Выбрано {checkedRows.size} из {data.length.toLocaleString('ru-RU')} · в DOM {virtualRows.length} строк
              </Table.Cell>
            </Table.Row>
          </Table.Footer>
        </Table>
      </div>
    </div>
  );
};
