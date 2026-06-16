import { Checkbox } from '@skbkontur/react-ui/components/Checkbox';
import React, { useLayoutEffect, useRef, useState } from 'react';

import { Table, useTableRowSelection } from '..';

/**
 * Песочница для исследования IF-2767: поддерживает ли `@skbkontur/table` виртуализацию строк.
 *
 * Здесь намеренно НЕ используется внешняя библиотека (react-window / @tanstack/react-virtual),
 * чтобы не тянуть зависимость в монорепо. Вместо неё — минимальный «оконный» виртуализатор
 * на спейсер-строках: сверху и снизу от видимого окна рендерятся пустые `<tr>` нужной высоты,
 * а в DOM присутствует только окно видимых строк. Это самый совместимый с нативной
 * вёрсткой `<table>` способ (сохраняет `table-layout: fixed` и синхронизацию ширин колонок).
 *
 * Что демонстрирует стори (см. отчёт IF-2767):
 *  - спейсер-строки становятся `:first-child` / `:last-child` у `<tbody>` и ломают связанные селекторы;
 *  - нижняя граница последней строки перед футером не убирается;
 *  - граница хедера не реагирует на hover первой строки;
 *  - навигация стрелками упирается в спейсер на краю окна;
 *  - Shift+click и «выбрать все» продолжают работать (логика на индексах данных, не на DOM).
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
const OVERSCAN = 4;

/** Минимальный виртуализатор: считает окно видимых строк по scrollTop контейнера. */
function useWindowVirtualizer(scrollRef: React.RefObject<HTMLDivElement>, rowCount: number) {
  const [scrollTop, setScrollTop] = useState(0);
  const [viewport, setViewport] = useState(VIEWPORT_HEIGHT);

  useLayoutEffect(() => {
    const el = scrollRef.current;
    if (!el) {
      return;
    }
    setViewport(el.clientHeight);
    const onScroll = () => setScrollTop(el.scrollTop);
    el.addEventListener('scroll', onScroll, { passive: true });
    return () => el.removeEventListener('scroll', onScroll);
  }, [scrollRef]);

  const start = Math.max(0, Math.floor(scrollTop / ROW_HEIGHT) - OVERSCAN);
  const visibleCount = Math.ceil(viewport / ROW_HEIGHT) + OVERSCAN * 2;
  const end = Math.min(rowCount, start + visibleCount);
  const paddingTop = start * ROW_HEIGHT;
  const paddingBottom = Math.max(0, (rowCount - end) * ROW_HEIGHT);

  return { start, end, paddingTop, paddingBottom };
}

export const VirtualizedTableStory = () => {
  const data = React.useMemo(() => makeRows(2000), []);
  const scrollRef = useRef<HTMLDivElement>(null);
  const { start, end, paddingTop, paddingBottom } = useWindowVirtualizer(scrollRef, data.length);

  const { checkedRows, isCheckedAll, hasChecked, checkboxRef, selectAll, toggleRow, isRowChecked } =
    useTableRowSelection(data);

  const visibleRows = data.slice(start, end);

  return (
    <div style={{ width: 900, margin: 16 }}>
      <p style={{ font: '14px sans-serif', color: '#666' }}>
        Виртуализация на спейсер-строках. Видимое окно: строки {start + 1}–{end} из {data.length}. Скролльте список,
        наводите курсор на первую/последнюю видимую строку, проверяйте границы, Shift+click по чекбоксам и навигацию
        стрелками (Tab в строку → ↑/↓).
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
            {visibleRows.map((row) => (
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
 * Эталон без виртуализации (короткий список) — для сравнения корректного поведения границ,
 * скруглений, sticky-футера и навигации стрелками со сломанным виртуализированным вариантом.
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
