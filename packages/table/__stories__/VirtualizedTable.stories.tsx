import { Checkbox } from '@skbkontur/react-ui/components/Checkbox';
import { Table, useTableRowSelection } from '@skbkontur/table';
import { useVirtualizer } from '@tanstack/react-virtual';
import React, { useRef } from 'react';

/**
 * Виртуализация строк `@skbkontur/table` через `@tanstack/react-virtual`.
 *
 * Виртуализатор headless — он не навязывает свою вёрстку, поэтому нативная `<table>`
 * сохраняет `table-layout: fixed` и синхронизацию ширин колонок. Окно видимых строк
 * обрамляется спейсер-строками: сверху и снизу рендерятся пустые `<tr>` суммарной высотой
 * скрытых строк, а в DOM присутствуют только видимые `<tr>` + overscan.
 *
 * Выбор строк (`useTableRowSelection`) работает на индексах данных, а не на DOM, поэтому
 * Shift+click и «выбрать все» корректны и для строк за пределами видимого окна.
 */
export default {
  title: 'Table/VirtualizedTable',
};

interface Row {
  id: number;
  client: string;
  region: string;
  amount: number;
  responsible: string;
}

const CLIENTS = ['ООО «Кавычки»', 'Рыков Н. В.', 'ООО «Альянс Авиа»', 'ЗАО «Восход»', 'ИП Смирнов'];
const REGIONS = ['Курская обл 46', 'Хакасия 19', 'Свердловская обл 66', 'Московская обл 50', 'Татарстан 16'];
const NAMES = ['Антон Чехов', 'Алексей Толстой', 'Иван Тургенев', 'Мария Смирнова', 'Фёдор Достоевский'];

function makeRows(count: number): Row[] {
  return Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    client: CLIENTS[i % CLIENTS.length],
    region: REGIONS[i % REGIONS.length],
    amount: 5000 + ((i * 7919) % 990000),
    responsible: NAMES[i % NAMES.length],
  }));
}

const COLUMN_COUNT = 5;
const ROW_HEIGHT = 33;
const VIEWPORT_HEIGHT = 420;
const OVERSCAN = 8;

export const VirtualizedTableStory = () => {
  const data = React.useMemo(() => makeRows(2000), []);
  const scrollRef = useRef<HTMLDivElement>(null);

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
    <div style={{ width: 900, margin: 16 }}>
      <p style={{ font: '14px sans-serif', color: '#666' }}>
        Виртуализация на `@tanstack/react-virtual`. В DOM — только видимое окно из {virtualRows.length} строк (включая
        overscan) из {data.length}. Скролльте список, проверяйте Shift+click по чекбоксам и «выбрать все».
      </p>
      <div
        ref={scrollRef}
        style={{ height: VIEWPORT_HEIGHT, overflow: 'auto', border: '1px solid #ddd', borderRadius: 8 }}
      >
        <Table hasChecked={hasChecked} size="small">
          <Table.Header sticky>
            <Table.Row>
              <Table.HeaderCell checkboxCell>
                <Checkbox
                  ref={checkboxRef}
                  onClick={() => selectAll()}
                  checked={isCheckedAll}
                  initialIndeterminate={hasChecked}
                />
              </Table.HeaderCell>
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
                  onClick={() => console.log(`row click ${row.id}`)}
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
                Выбрано {checkedRows.size} из {data.length}
              </Table.Cell>
            </Table.Row>
          </Table.Footer>
        </Table>
      </div>
    </div>
  );
};

/**
 * Эталон без виртуализации (короткий список) — для сравнения границ, скруглений,
 * sticky-футера и навигации стрелками с виртуализированным вариантом.
 */
export const NonVirtualizedReference = () => {
  const data = React.useMemo(() => makeRows(8), []);
  const { isCheckedAll, hasChecked, checkboxRef, selectAll, toggleRow, isRowChecked } = useTableRowSelection(data);

  return (
    <div style={{ width: 900, margin: 16 }}>
      <div style={{ height: VIEWPORT_HEIGHT, overflow: 'auto', border: '1px solid #ddd', borderRadius: 8 }}>
        <Table hasChecked={hasChecked} size="small">
          <Table.Header sticky>
            <Table.Row>
              <Table.HeaderCell checkboxCell>
                <Checkbox ref={checkboxRef} onClick={() => selectAll()} checked={isCheckedAll} />
              </Table.HeaderCell>
              <Table.HeaderCell scope="col">Клиент</Table.HeaderCell>
              <Table.HeaderCell scope="col">Регион</Table.HeaderCell>
              <Table.HeaderCell scope="col" currency>
                Сумма, ₽
              </Table.HeaderCell>
              <Table.HeaderCell scope="col">Ответственный</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {data.map((row) => (
              <Table.Row
                key={row.id}
                bottomBorder
                checked={isRowChecked(row.id)}
                onClick={() => console.log(`row click ${row.id}`)}
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
            ))}
          </Table.Body>
          <Table.Footer sticky>
            <Table.Row>
              <Table.Cell checkboxCell />
              <Table.Cell colSpan={COLUMN_COUNT - 1}>Итого {data.length} записей</Table.Cell>
            </Table.Row>
          </Table.Footer>
        </Table>
      </div>
    </div>
  );
};
