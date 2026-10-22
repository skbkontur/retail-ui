import { Markdown } from '@storybook/blocks';
import { Table } from '@storybook/components';
import React from 'react';

export interface ApiTableRow {
  name: string;
  type?: string;
  defaultValue?: string;
  description: string;
}

interface ApiTableProps {
  rows: ApiTableRow[];
  nameTitle?: string;
  withoutDefault?: boolean;
  typeTitle?: string;
}

const cellStyle: React.CSSProperties = { textAlign: 'left', verticalAlign: 'top' };

export const ApiTable = ({ rows, nameTitle = 'Проп', typeTitle = 'Тип', withoutDefault = false }: ApiTableProps) => (
  <Table style={{ width: '100%' }}>
    <thead>
      <tr>
        <th style={{ ...cellStyle, width: '20%' }}>{nameTitle}</th>
        <th style={{ ...cellStyle, width: '25%' }}>{typeTitle}</th>
        {!withoutDefault && <th style={{ ...cellStyle, width: '15%' }}>По умолчанию</th>}
        <th style={cellStyle}>Описание</th>
      </tr>
    </thead>
    <tbody>
      {rows.map((row) => (
        <tr key={row.name}>
          <td style={cellStyle}>
            <code>{row.name}</code>
          </td>
          <td style={cellStyle}>{row.type ? <code>{row.type}</code> : '—'}</td>
          {!withoutDefault && <td style={cellStyle}>{row.defaultValue ? <code>{row.defaultValue}</code> : '—'}</td>}
          <td style={cellStyle}>
            <Markdown>{row.description}</Markdown>
          </td>
        </tr>
      ))}
    </tbody>
  </Table>
);
