import { Table } from '@skbkontur/table';
import React from 'react';

type Size = 'small' | 'medium' | 'large';

export default {
  title: 'Table/Dividers',
};

// Разделители должны начинаться под текстом первой колонки и кончаться под текстом последней.
// Каждая таблица ниже — отдельный случай для правого края.

const rows = [
  { id: 1, client: 'ООО «Кавычки»', region: 'Курская обл 46', amount: '5 000', comment: 'Ждём оплату' },
  { id: 2, client: 'Рыков Н. В.', region: 'Хакасия 19', amount: '127 000 000,00', comment: 'Счёт отправлен' },
  { id: 3, client: 'ООО «Альянс Авиа»', region: 'Свердловская обл 66', amount: '85 000', comment: '—' },
];

const longComment =
  'Клиент просил перенести отгрузку на следующую неделю, счёт перевыставлен, акт сверки ждём к пятнице';

const Case = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div style={{ marginBottom: 32 }}>
    <h3 style={{ margin: '0 0 8px', fontSize: 14 }}>{title}</h3>
    {children}
  </div>
);

const Container = ({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) => (
  <div style={{ width: 640, padding: 16, ...style }}>{children}</div>
);

const CurrencyTable = ({
  header,
  amounts,
  size = 'medium',
  auto,
  footer,
}: {
  header: string;
  amounts: string[];
  size?: Size;
  auto?: boolean;
  footer?: boolean;
}) => (
  <Table size={size} auto={auto}>
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell>Клиент</Table.HeaderCell>
        <Table.HeaderCell>Регион</Table.HeaderCell>
        <Table.HeaderCell currency>{header}</Table.HeaderCell>
      </Table.Row>
    </Table.Header>
    <Table.Body>
      {rows.map((row, i) => (
        <Table.Row key={row.id} bottomBorder>
          <Table.Cell>{row.client}</Table.Cell>
          <Table.Cell>{row.region}</Table.Cell>
          <Table.Cell currency>{amounts[i]}</Table.Cell>
        </Table.Row>
      ))}
    </Table.Body>
    {footer && (
      <Table.Footer>
        <Table.Row>
          <Table.Cell>Итого</Table.Cell>
          <Table.Cell />
          <Table.Cell currency>127 090 000,00</Table.Cell>
        </Table.Row>
      </Table.Footer>
    )}
  </Table>
);

export const CurrencyLastColumn = () => (
  <Container>
    <Case title="Шапка длиннее сумм">
      <CurrencyTable header="Сумма к оплате с НДС, ₽" amounts={['5 000', '12 000', '850']} auto />
    </Case>
    <Case title="Суммы длиннее шапки">
      <CurrencyTable header="Сумма" amounts={['127 000 000,00', '5 000 000,00', '85 000,00']} auto />
    </Case>
    <Case title="Фиксированная раскладка и футер">
      <CurrencyTable header="Сумма, ₽" amounts={rows.map((r) => r.amount)} footer />
    </Case>
  </Container>
);

export const TextLastColumn = () => (
  <Container>
    <Case title="Шапка длиннее текста">
      <Table size="medium">
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Клиент</Table.HeaderCell>
            <Table.HeaderCell currency>Сумма, ₽</Table.HeaderCell>
            <Table.HeaderCell>Комментарий менеджера к сделке</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {rows.map((row) => (
            <Table.Row key={row.id} bottomBorder>
              <Table.Cell>{row.client}</Table.Cell>
              <Table.Cell currency>{row.amount}</Table.Cell>
              <Table.Cell>{row.comment}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </Case>
    <Case title="Текст длиннее шапки и переносится">
      <Table size="medium">
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Клиент</Table.HeaderCell>
            <Table.HeaderCell currency>Сумма, ₽</Table.HeaderCell>
            <Table.HeaderCell>Комментарий</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {rows.map((row) => (
            <Table.Row key={row.id} bottomBorder>
              <Table.Cell>{row.client}</Table.Cell>
              <Table.Cell currency>{row.amount}</Table.Cell>
              <Table.Cell>{longComment}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </Case>
  </Container>
);

const KebabTable = ({ kebabDivider }: { kebabDivider: boolean }) => (
  <Table size="medium">
    <Table.Header>
      <Table.Row>
        <Table.HeaderCheckboxCell aria-label="Выбрать все строки" />
        <Table.HeaderCell>Клиент</Table.HeaderCell>
        <Table.HeaderCell currency>Сумма, ₽</Table.HeaderCell>
        <Table.HeaderCell width="40px" noBottomBorder={!kebabDivider} />
      </Table.Row>
    </Table.Header>
    <Table.Body>
      {rows.map((row) => (
        <Table.Row key={row.id} bottomBorder>
          <Table.CheckboxCell aria-label={`Выбрать строку ${row.client}`} />
          <Table.Cell>{row.client}</Table.Cell>
          <Table.Cell currency>{row.amount}</Table.Cell>
          <Table.Cell contentCompensator={false} noBottomBorder={!kebabDivider}>
            <Table.ActionBar items={[{ text: 'Изменить' }, { text: 'Удалить' }]} itemsVisible={0} />
          </Table.Cell>
        </Table.Row>
      ))}
    </Table.Body>
  </Table>
);

export const UtilityCells = () => (
  <Container>
    <Case title="Кебаб с noBottomBorder — линия кончается под суммой">
      <KebabTable kebabDivider={false} />
    </Case>
    <Case title="Кебаб без noBottomBorder — линия идёт и под кебабом">
      <KebabTable kebabDivider />
    </Case>
  </Container>
);

export const Sizes = () => (
  <Container>
    {(['small', 'medium', 'large'] as const).map((size) => (
      <Case key={size} title={size}>
        <CurrencyTable header="Сумма, ₽" amounts={rows.map((r) => r.amount)} size={size} footer />
      </Case>
    ))}
  </Container>
);

// Шапка-кнопка (сортировка) и шапка-текст стоят одинаково: у текста отступ-компенсатор 13/17/21px = отступ кнопки + рамка.
// Конец линии — на этом же компенсаторе, поэтому иконка сортировки в валютной колонке упирается в него.
export const HeaderButton = () => (
  <Container>
    {(['small', 'medium', 'large'] as const).map((size) => (
      <Case key={size} title={size}>
        <Table size={size}>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>
                <Table.Sort>Клиент</Table.Sort>
              </Table.HeaderCell>
              <Table.HeaderCell>Регион</Table.HeaderCell>
              <Table.HeaderCell currency>
                <Table.Sort sortDirection="desc">Сумма, ₽</Table.Sort>
              </Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {rows.map((row) => (
              <Table.Row key={row.id} bottomBorder>
                <Table.Cell>{row.client}</Table.Cell>
                <Table.Cell>{row.region}</Table.Cell>
                <Table.Cell currency>{row.amount}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </Case>
    ))}
  </Container>
);

// Дробный масштаб: линии должны остаться чёткими в 1px и не съехать с краёв текста.
export const Zoomed = () => (
  <Container style={{ zoom: 1.25 }}>
    <CurrencyTable header="Сумма, ₽" amounts={rows.map((r) => r.amount)} footer />
  </Container>
);
