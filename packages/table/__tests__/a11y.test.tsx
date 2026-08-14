import { LangCodes, LocaleContext } from '@skbkontur/react-ui';
import { fireEvent, render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { describe, it, expect, vi } from 'vitest';

import { Table } from '../src/components/Table/Table';
import { TableDataTids } from '../src/components/Table/TableDataTids';

interface FilterResultFocusExampleProps {
  initialTokens: string[];
  filterResultOutsideTable?: boolean;
  filterLabel?: string;
  filterKind?: 'base' | 'dropdown' | 'sortable';
}

const FilterResultFocusExample = ({
  initialTokens,
  filterResultOutsideTable = false,
  filterLabel = 'Город',
  filterKind = 'dropdown',
}: FilterResultFocusExampleProps) => {
  const [tokens, setTokens] = React.useState(initialTokens);
  const removeToken = (caption: string) => {
    setTokens((prev) => prev.filter((token) => token !== caption));
  };
  const filter = (() => {
    if (filterKind === 'base') {
      return (
        <Table.Filter popup={<Table.FilterItem>Фильтр</Table.FilterItem>} filtered={tokens.length > 0}>
          {filterLabel}
        </Table.Filter>
      );
    }
    if (filterKind === 'sortable') {
      return (
        <Table.DropdownSortableFilter options={[]} selectedOptions={[]} onSelect={() => {}}>
          {filterLabel}
        </Table.DropdownSortableFilter>
      );
    }
    return (
      <Table.DropdownFilter options={[]} selectedOptions={[]} onSelect={() => {}}>
        {filterLabel}
      </Table.DropdownFilter>
    );
  })();
  const filterResult =
    tokens.length > 0 ? (
      <Table.FilterResultRow
        tokens={tokens.map((caption) => ({
          key: caption,
          caption,
          onRemove: () => removeToken(caption),
        }))}
        onResetAll={() => setTokens([])}
      />
    ) : null;

  return (
    <>
      {filterResultOutsideTable && (
        <table>
          <tbody>{filterResult}</tbody>
        </table>
      )}
      <Table>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>{filter}</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {!filterResultOutsideTable && filterResult}
          <Table.Row>
            <Table.Cell>Row</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    </>
  );
};

const renderHeaderCell = (
  children: React.ReactNode,
  headerCellProps: Partial<React.ComponentProps<typeof Table.HeaderCell>> = {},
) =>
  render(
    <Table>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell {...headerCellProps}>{children}</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
    </Table>,
  );

const removeTokenWithKeyboard = (caption = 'City: Moscow') => {
  const removeButton = screen.getByRole('button', { name: `Удалить фильтр: ${caption}` });
  removeButton.focus();
  fireEvent.keyDown(removeButton, { key: 'Enter' });
};

const expectFilterButtonFocused = (name = 'Город') => {
  expect(document.activeElement).toBe(screen.getByRole('button', { name }));
  expect(document.activeElement?.tagName).toBe('BUTTON');
};

describe('Table a11y', () => {
  describe('Base containers', () => {
    it('row is keyboard-focusable and handles Enter/Arrow navigation', async () => {
      const onClick = vi.fn();
      render(
        <Table>
          <Table.Body data-tid="body">
            <Table.Row onClick={onClick}>
              <Table.Cell>Row 1</Table.Cell>
            </Table.Row>
            <Table.Row onClick={onClick}>
              <Table.Cell>Row 2</Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>,
      );

      const body = screen.getByTestId('body');
      const rows = within(body).getAllByRole('row');

      rows[0].focus();
      await userEvent.keyboard('{Enter}');
      expect(onClick).toHaveBeenCalledTimes(1);

      await userEvent.keyboard('{ArrowDown}');
      expect(document.activeElement).toBe(rows[1]);
    });

    it('row receives tabIndex when clickable', () => {
      render(
        <Table>
          <Table.Body data-tid="body">
            <Table.Row onClick={() => {}}>
              <Table.Cell>Row</Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>,
      );

      const row = screen.getByRole('row');
      expect(row).toHaveAttribute('tabindex', '0');
    });

    it('header cell forwards scope and aria-label', () => {
      render(
        <Table>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell scope="col" aria-label="Name column">
                Name
              </Table.HeaderCell>
            </Table.Row>
          </Table.Header>
        </Table>,
      );

      const headerCell = screen.getByRole('columnheader', { name: 'Name column' });
      expect(headerCell).toHaveAttribute('scope', 'col');
      expect(headerCell).toHaveAttribute('aria-label', 'Name column');
    });

    it('checkbox cells pass aria-label to checkbox', () => {
      render(
        <Table>
          <Table.Body>
            <Table.Row>
              <Table.CheckboxCell checked onCheckboxClick={() => {}} aria-label="Select row" />
            </Table.Row>
          </Table.Body>
        </Table>,
      );

      expect(screen.getByRole('checkbox')).toHaveAttribute('aria-label', 'Select row');
    });

    it('header checkbox cell passes aria-label to checkbox', () => {
      render(
        <Table>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCheckboxCell checked onClick={() => {}} aria-label="Select all rows" />
            </Table.Row>
          </Table.Header>
        </Table>,
      );

      expect(screen.getByRole('checkbox')).toHaveAttribute('aria-label', 'Select all rows');
    });

    it('sort header forwards aria-label to button', () => {
      renderHeaderCell(<Table.Sort aria-label="Sort by name">Name</Table.Sort>);

      expect(screen.getByRole('button', { name: 'Sort by name' })).toBeInTheDocument();
    });
  });

  describe('Menus and filters', () => {
    it('dropdown filter toggles aria-expanded', async () => {
      render(
        <Table>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>
                <Table.DropdownFilter options={['one']} selectedOptions={[]} onSelect={() => {}}>
                  Filter
                </Table.DropdownFilter>
              </Table.HeaderCell>
            </Table.Row>
          </Table.Header>
        </Table>,
      );

      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('aria-expanded', 'false');

      await userEvent.click(button);
      expect(button).toHaveAttribute('aria-expanded', 'true');
    });

    it('dropdown sortable filter toggles aria-expanded and keeps aria-controls', async () => {
      render(
        <Table>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>
                <Table.DropdownSortableFilter
                  options={['one', 'two']}
                  selectedOptions={[]}
                  onSelect={() => {}}
                  onSort={() => {}}
                >
                  Sortable filter
                </Table.DropdownSortableFilter>
              </Table.HeaderCell>
            </Table.Row>
          </Table.Header>
        </Table>,
      );

      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('aria-expanded', 'false');
      const controlsId = button.getAttribute('aria-controls');

      await userEvent.click(button);
      expect(button).toHaveAttribute('aria-expanded', 'true');
      expect(controlsId).toBeTruthy();
    });

    it('filter search input exposes placeholder for screen readers', () => {
      render(<Table.FilterSearch searchQuery="" handleSearchQuery={() => {}} searchPlaceholder="Search options" />);

      expect(screen.getByPlaceholderText('Search options')).toBeInTheDocument();
    });

    it('filter item forwards aria-label', async () => {
      render(
        <Table.Filter popup={<Table.FilterItem aria-label="Reset filter">Reset</Table.FilterItem>} filtered>
          Trigger
        </Table.Filter>,
      );

      const button = screen.getByRole('button');
      await userEvent.click(button);

      expect(screen.getByRole('button', { name: 'Reset filter' })).toBeInTheDocument();
    });
  });

  describe('Filter results', () => {
    it('applied filters row renders tokens and reset action', () => {
      const onRemove = vi.fn();
      const onResetAll = vi.fn();
      render(
        <table>
          <tbody>
            <Table.FilterResultRow
              tokens={[{ key: 'k1', caption: 'City: Moscow', onRemove }]}
              onResetAll={onResetAll}
            />
          </tbody>
        </table>,
      );

      expect(screen.getByText('City: Moscow')).toBeInTheDocument();
      expect(screen.getByText('Сбросить фильтры')).toBeInTheDocument();
    });

    it('фокусирует только кнопку удаления токена при Tab-навигации', async () => {
      render(<FilterResultFocusExample initialTokens={['City: Moscow']} />);

      screen.getByRole('button', { name: 'Город' }).focus();
      await userEvent.tab();
      const removeButton = screen.getByRole('button', { name: 'Удалить фильтр: City: Moscow' });

      expect(document.activeElement).toBe(removeButton);
      expect(removeButton.parentElement).not.toHaveAttribute('role');
      expect(removeButton.parentElement).not.toHaveAttribute('tabindex');
      expect(removeButton.parentElement).not.toHaveAttribute('aria-label');

      await userEvent.tab();

      expect(document.activeElement).toBe(screen.getByRole('button', { name: 'Сбросить фильтры' }));
    });

    it('использует локаль из контекста для кнопок удаления и сброса фильтров', () => {
      render(
        <LocaleContext.Provider value={{ langCode: LangCodes.en_GB }}>
          <FilterResultFocusExample initialTokens={['City: Moscow']} />
        </LocaleContext.Provider>,
      );

      expect(screen.getByRole('button', { name: 'Remove filter: City: Moscow' })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Reset filters' })).toBeInTheDocument();
    });

    it.each<Array<[string, Partial<FilterResultFocusExampleProps>]>>([
      ['после удаления последнего токена', {}],
      ['когда строка фильтров вне таблицы', { filterResultOutsideTable: true }],
      ['после удаления последнего токена в сортируемом фильтре', { filterKind: 'sortable' }],
    ])('возвращает фокус на кнопку фильтра %s', async (_, props) => {
      render(<FilterResultFocusExample initialTokens={['City: Moscow']} {...props} />);

      removeTokenWithKeyboard();

      expect(screen.queryByText('City: Moscow')).not.toBeInTheDocument();
      expectFilterButtonFocused();
      expect(document.activeElement).toHaveAttribute('data-tid', expect.stringContaining('Button__rootElement'));
    });

    it('не переносит фокус в другую таблицу, когда на странице несколько таблиц', async () => {
      render(
        <>
          <FilterResultFocusExample initialTokens={[]} filterLabel="Страна" />
          <FilterResultFocusExample initialTokens={['City: Moscow']} filterResultOutsideTable filterLabel="Город" />
        </>,
      );

      removeTokenWithKeyboard();

      expect(screen.queryByText('City: Moscow')).not.toBeInTheDocument();
      expectFilterButtonFocused();
      expect(document.activeElement).not.toBe(screen.getByRole('button', { name: 'Страна' }));
    });

    it('возвращает фокус на кнопку фильтра после сброса всех токенов', async () => {
      render(<FilterResultFocusExample initialTokens={['City: Moscow', 'City: Kazan']} />);

      const resetButton = screen.getByRole('button', { name: 'Сбросить фильтры' });
      resetButton.focus();
      await userEvent.keyboard('{Enter}');

      expect(screen.queryByText('City: Moscow')).not.toBeInTheDocument();
      expect(screen.queryByText('City: Kazan')).not.toBeInTheDocument();
      expectFilterButtonFocused();
      expect(document.activeElement).toHaveAttribute('data-tid', expect.stringContaining('Button__rootElement'));
    });

    it('переводит фокус на следующий токен после удаления не последнего токена', async () => {
      render(<FilterResultFocusExample initialTokens={['City: Moscow', 'City: Kazan']} />);

      removeTokenWithKeyboard();

      expect(screen.queryByText('City: Moscow')).not.toBeInTheDocument();
      expect(document.activeElement).toBe(screen.getByRole('button', { name: 'Удалить фильтр: City: Kazan' }));
    });
  });

  describe('Sort header', () => {
    it.each<
      Array<[string, React.ReactNode, Partial<React.ComponentProps<typeof Table.HeaderCell>> | undefined, string]>
    >([
      [
        'прописывает aria-sort=none на header cell с Table.Sort без направления',
        <Table.Sort>Name</Table.Sort>,
        {},
        'none',
      ],
      [
        'находит Table.Sort внутри фрагмента при расчёте aria-sort',
        <>
          <Table.Sort>Name</Table.Sort>
        </>,
        {},
        'none',
      ],
      [
        'проставляет aria-sort=ascending при sortDirection=asc',
        <Table.Sort sortDirection="asc">Name</Table.Sort>,
        { sortDirection: 'asc' },
        'ascending',
      ],
      [
        'берёт направление сортировки из вложенного Table.Sort',
        <Table.Sort sortDirection="desc">Name</Table.Sort>,
        {},
        'descending',
      ],
      [
        'детектит сортируемый header cell по data-tid вложенного контрола',
        <span data-tid={TableDataTids.sort}>Name</span>,
        {},
        'none',
      ],
      [
        'проставляет aria-sort на th с DropdownSortableFilter при явном sortDirection',
        <Table.DropdownSortableFilter
          options={[]}
          selectedOptions={[]}
          onSelect={() => {}}
          onSort={() => {}}
          sortDirection="asc"
        >
          Name
        </Table.DropdownSortableFilter>,
        { sortDirection: 'asc' },
        'ascending',
      ],
      [
        'берёт направление сортировки из вложенного DropdownSortableFilter',
        <Table.DropdownSortableFilter
          options={[]}
          selectedOptions={[]}
          onSelect={() => {}}
          onSort={() => {}}
          sortDirection="desc"
        >
          Name
        </Table.DropdownSortableFilter>,
        {},
        'descending',
      ],
    ])('%s', (_, children, headerCellProps, ariaSort) => {
      renderHeaderCell(children, headerCellProps);

      expect(screen.getByRole('columnheader')).toHaveAttribute('aria-sort', ariaSort);
    });

    it('не проставляет aria-sort на обычной ячейке без TableSort', () => {
      renderHeaderCell('Name');

      expect(screen.getByRole('columnheader')).not.toHaveAttribute('aria-sort');
    });
  });

  describe('Row keyboard navigation', () => {
    it('не перехватывает стрелки внутри input', async () => {
      const onClick = vi.fn();
      render(
        <Table>
          <Table.Body data-tid="body">
            <Table.Row onClick={onClick}>
              <Table.Cell>
                <input data-tid="cell-input" defaultValue="" />
              </Table.Cell>
            </Table.Row>
            <Table.Row onClick={onClick}>
              <Table.Cell>Row 2</Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>,
      );

      const input = screen.getByTestId('cell-input') as HTMLInputElement;
      input.focus();
      expect(document.activeElement).toBe(input);

      await userEvent.keyboard('{ArrowDown}');
      expect(document.activeElement).toBe(input);
    });

    it('не перехватывает стрелки на элементе с role=spinbutton', async () => {
      render(
        <Table>
          <Table.Body data-tid="body">
            <Table.Row onClick={() => {}}>
              <Table.Cell>
                <div data-tid="spin" role="spinbutton" tabIndex={0}>
                  5
                </div>
              </Table.Cell>
            </Table.Row>
            <Table.Row onClick={() => {}}>
              <Table.Cell>Row 2</Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>,
      );

      const spin = screen.getByTestId('spin');
      spin.focus();
      await userEvent.keyboard('{ArrowDown}');
      expect(document.activeElement).toBe(spin);
    });

    it('не перехватывает стрелки на вложенной кнопке', async () => {
      render(
        <Table>
          <Table.Body data-tid="body">
            <Table.Row onClick={() => {}}>
              <Table.Cell>
                <button type="button">Action</button>
              </Table.Cell>
            </Table.Row>
            <Table.Row onClick={() => {}}>
              <Table.Cell>Row 2</Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>,
      );

      const button = screen.getByRole('button', { name: 'Action' });
      button.focus();
      await userEvent.keyboard('{ArrowDown}');
      expect(document.activeElement).toBe(button);
    });
  });
});
