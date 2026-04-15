import { describe, it, expect, vi } from 'vitest';
import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { LocaleContext, LangCodes } from '@skbkontur/react-ui';

import { Table } from '../src/components/Table/Table';
import { TableDropdownSortableFilter } from '../src/components/Table/TableDropdownSortableFilter';
import { TableLocaleHelper } from '../src/locale';
import { useTableSort } from '../src/hooks/useTableSort';

vi.mock('@skbkontur/react-ui/components/DropdownMenu', () => {
  const React = require('react');
  return {
    DropdownMenu: ({ caption, children }: any) => {
      const [open, setOpen] = React.useState(false);
      const openMenu = () => setOpen(true);
      return (
        <div>
          <div data-testid="dropdown-caption">{typeof caption === 'function' ? caption({ openMenu }) : caption}</div>
          {open && <div data-testid="dropdown-content">{children}</div>}
        </div>
      );
    },
  };
});

describe('API and prop forwarding', () => {
  it('exports Table and hooks and keeps __KONTUR_REACT_UI__ marker', () => {
    expect(Table).toBeDefined();
    expect(useTableSort).toBeDefined();
    expect(TableLocaleHelper).toBeDefined();
    expect(Table.__KONTUR_REACT_UI__).toBe('Table');
  });

  it('forwards data attributes via CommonWrapper and className to table', () => {
    const { container } = render(
      <Table data-testid="table-props" className="custom-class" size="small">
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Header</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
      </Table>
    );

    const table = container.querySelector('[data-testid="table-props"]') as HTMLTableElement;
    expect(table).toBeInTheDocument();
    expect(table.className).toMatch(/custom-class/);
  });
});

describe('Localization', () => {
  it('uses en locale for sorting and placeholder', async () => {
    render(
      <LocaleContext.Provider value={{ langCode: LangCodes.en_GB }}>
        <TableDropdownSortableFilter
          options={['Alpha']}
          selectedOptions={[]}
          onSelect={() => {}}
          onSort={() => {}}
          sortDirection="asc"
        >
          Locale
        </TableDropdownSortableFilter>
      </LocaleContext.Provider>
    );

    await userEvent.click(screen.getByRole('button', { name: /locale/i }));
    expect(await screen.findByPlaceholderText('Search...')).toBeInTheDocument();
    expect(screen.getByText('Ascending')).toBeInTheDocument();
    expect(screen.getByText('Descending')).toBeInTheDocument();
  });
});
