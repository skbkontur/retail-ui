import React from 'react';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Table } from '../src/components/Table/Table';

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
        </Table>
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
        </Table>
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
        </Table>
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
        </Table>
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
        </Table>
      );

      expect(screen.getByRole('checkbox')).toHaveAttribute('aria-label', 'Select all rows');
    });

    it('sort header forwards aria-label to button', () => {
      render(
        <Table>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>
                <Table.Sort aria-label="Sort by name">Name</Table.Sort>
              </Table.HeaderCell>
            </Table.Row>
          </Table.Header>
        </Table>
      );

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
        </Table>
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
        </Table>
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
        </Table.Filter>
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
        </table>
      );

      expect(screen.getByText('City: Moscow')).toBeInTheDocument();
      expect(screen.getByText('Сбросить фильтры')).toBeInTheDocument();
    });
  });
});
