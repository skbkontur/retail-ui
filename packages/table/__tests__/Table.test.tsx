import React from 'react';
import { vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import { render, screen, fireEvent } from '@testing-library/react';
import { configure } from '@testing-library/dom';

import { Table } from '../src/components/Table/Table';

configure({
  testIdAttribute: 'data-tid',
});

describe('Table', () => {
  it('renders correctly', () => {
    const { container } = render(
      <Table>
        <Table.Body>
          <Table.Row>
            <Table.Cell>Content</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    );

    expect(container.querySelector('table')).toBeInTheDocument();
  });

  it('passes ref to table element', () => {
    const ref = React.createRef<HTMLTableElement>();
    render(
      <Table ref={ref}>
        <Table.Body>
          <Table.Row>
            <Table.Cell>Content</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    );

    expect(ref.current).toBeInstanceOf(HTMLTableElement);
  });

  it('applies className', () => {
    const { container } = render(
      <Table className="custom-table">
        <Table.Body>
          <Table.Row>
            <Table.Cell>Content</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    );

    expect(container.querySelector('table')).toHaveClass('custom-table');
  });

  it('supports size prop small', () => {
    const { container } = render(
      <Table size="small">
        <Table.Body>
          <Table.Row>
            <Table.Cell>Content</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    );

    const table = container.querySelector('table');
    expect(table).toBeInTheDocument();
  });

  it('supports size prop medium', () => {
    const { container } = render(
      <Table size="medium">
        <Table.Body>
          <Table.Row>
            <Table.Cell>Content</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    );

    const table = container.querySelector('table');
    expect(table).toBeInTheDocument();
  });

  it('supports size prop large', () => {
    const { container } = render(
      <Table size="large">
        <Table.Body>
          <Table.Row>
            <Table.Cell>Content</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    );

    const table = container.querySelector('table');
    expect(table).toBeInTheDocument();
  });

  it('supports auto prop for automatic width', () => {
    const { container } = render(
      <Table auto>
        <Table.Body>
          <Table.Row>
            <Table.Cell>Content</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    );

    const table = container.querySelector('table');
    expect(table).toBeInTheDocument();
  });

  it('supports hasChecked prop', () => {
    const { container } = render(
      <Table hasChecked>
        <Table.Body>
          <Table.Row>
            <Table.Cell>Content</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    );

    const table = container.querySelector('table');
    expect(table).toBeInTheDocument();
  });
});

describe('Table.Row', () => {
  it('renders correctly', () => {
    const { container } = render(
      <Table>
        <Table.Body>
          <Table.Row>
            <Table.Cell>Content</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    );

    expect(container.querySelector('tr')).toBeInTheDocument();
  });

  it('handles onClick', async () => {
    const onClick = vi.fn();
    render(
      <Table>
        <Table.Body>
          <Table.Row onClick={onClick} data-tid="clickable-row">
            <Table.Cell>Content</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    );

    const row = screen.getByTestId('clickable-row');
    await userEvent.click(row);

    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('supports keyboard navigation with Enter', async () => {
    const onClick = vi.fn();
    render(
      <Table>
        <Table.Body>
          <Table.Row onClick={onClick} data-tid="row">
            <Table.Cell>Content</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    );

    const row = screen.getByTestId('row');
    row.focus();
    fireEvent.keyDown(row, { key: 'Enter' });

    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('supports keyboard navigation with Space', async () => {
    const onClick = vi.fn();
    render(
      <Table>
        <Table.Body>
          <Table.Row onClick={onClick} data-tid="row">
            <Table.Cell>Content</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    );

    const row = screen.getByTestId('row');
    row.focus();
    fireEvent.keyDown(row, { key: ' ' });

    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('supports keyboard navigation with ArrowDown', () => {
    render(
      <Table>
        <Table.Body>
          <Table.Row onClick={() => {}} data-tid="row1">
            <Table.Cell>Row 1</Table.Cell>
          </Table.Row>
          <Table.Row onClick={() => {}} data-tid="row2">
            <Table.Cell>Row 2</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    );

    const row1 = screen.getByTestId('row1');
    const row2 = screen.getByTestId('row2');

    row1.focus();
    fireEvent.keyDown(row1, { key: 'ArrowDown' });

    expect(document.activeElement).toBe(row2);
  });

  it('supports keyboard navigation with ArrowUp', () => {
    render(
      <Table>
        <Table.Body>
          <Table.Row onClick={() => {}} data-tid="row1">
            <Table.Cell>Row 1</Table.Cell>
          </Table.Row>
          <Table.Row onClick={() => {}} data-tid="row2">
            <Table.Cell>Row 2</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    );

    const row1 = screen.getByTestId('row1');
    const row2 = screen.getByTestId('row2');

    row2.focus();
    fireEvent.keyDown(row2, { key: 'ArrowUp' });

    expect(document.activeElement).toBe(row1);
  });

  it('applies checked style', () => {
    const { container } = render(
      <Table>
        <Table.Body>
          <Table.Row checked>
            <Table.Cell>Content</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    );

    const row = container.querySelector('tr');
    expect(row).toBeInTheDocument();
  });

  it('applies bottomBorder style', () => {
    const { container } = render(
      <Table>
        <Table.Body>
          <Table.Row bottomBorder>
            <Table.Cell>Content</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    );

    const row = container.querySelector('tr');
    expect(row).toBeInTheDocument();
  });

  it('has tabIndex when onClick is provided', () => {
    render(
      <Table>
        <Table.Body>
          <Table.Row onClick={() => {}} data-tid="row">
            <Table.Cell>Content</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    );

    const row = screen.getByTestId('row');
    expect(row).toHaveAttribute('tabindex', '0');
  });
});

describe('Table.Cell', () => {
  it('renders correctly', () => {
    const { container } = render(
      <Table>
        <Table.Body>
          <Table.Row>
            <Table.Cell>Content</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    );

    expect(container.querySelector('td')).toBeInTheDocument();
    expect(screen.getByText('Content')).toBeInTheDocument();
  });

  it('supports checkboxCell prop', () => {
    const { container } = render(
      <Table>
        <Table.Body>
          <Table.Row>
            <Table.Cell checkboxCell>Checkbox</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    );

    const cell = container.querySelector('td');
    expect(cell).toBeInTheDocument();
  });

  it('supports noWrap prop', () => {
    const { container } = render(
      <Table>
        <Table.Body>
          <Table.Row>
            <Table.Cell noWrap>Long text content</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    );

    const cell = container.querySelector('td');
    expect(cell).toBeInTheDocument();
  });

  it('supports currency prop', () => {
    const { container } = render(
      <Table>
        <Table.Body>
          <Table.Row>
            <Table.Cell currency>1000</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    );

    const cell = container.querySelector('td');
    expect(cell).toBeInTheDocument();
  });

  it('supports width prop', () => {
    const { container } = render(
      <Table>
        <Table.Body>
          <Table.Row>
            <Table.Cell width="200px">Content</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    );

    const cell = container.querySelector('td');
    expect(cell).toHaveStyle({ width: '200px' });
  });

  it('supports colSpan prop', () => {
    const { container } = render(
      <Table>
        <Table.Body>
          <Table.Row>
            <Table.Cell colSpan={3}>Content</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    );

    const cell = container.querySelector('td');
    expect(cell).toHaveAttribute('colspan', '3');
  });

  it('supports rowSpan prop', () => {
    const { container } = render(
      <Table>
        <Table.Body>
          <Table.Row>
            <Table.Cell rowSpan={2}>Content</Table.Cell>
            <Table.Cell>Other</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>More</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    );

    const cell = container.querySelector('td');
    expect(cell).toHaveAttribute('rowspan', '2');
  });

  it('stops propagation when checkboxCell is true', async () => {
    const rowClick = vi.fn();
    const cellClick = vi.fn();

    render(
      <Table>
        <Table.Body>
          <Table.Row onClick={rowClick}>
            <Table.Cell checkboxCell onClick={cellClick} data-tid="checkbox-cell">
              Check
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    );

    const cell = screen.getByTestId('checkbox-cell');
    await userEvent.click(cell);

    expect(cellClick).toHaveBeenCalledTimes(1);
    expect(rowClick).not.toHaveBeenCalled();
  });
});

describe('Table.HeaderCell', () => {
  it('renders correctly', () => {
    const { container } = render(
      <Table>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Header</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
      </Table>
    );

    expect(container.querySelector('th')).toBeInTheDocument();
    expect(screen.getByText('Header')).toBeInTheDocument();
  });

  it('supports scope prop', () => {
    const { container } = render(
      <Table>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell scope="col">Header</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
      </Table>
    );

    const headerCell = container.querySelector('th');
    expect(headerCell).toBeInTheDocument();
  });

  it('supports bottomBorder prop', () => {
    const { container } = render(
      <Table>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell bottomBorder>Header</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
      </Table>
    );

    const headerCell = container.querySelector('th');
    expect(headerCell).toBeInTheDocument();
  });

  it('supports vAlign prop', () => {
    const { container } = render(
      <Table>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell vAlign="bottom">Header</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
      </Table>
    );

    const headerCell = container.querySelector('th');
    expect(headerCell).toHaveStyle({ verticalAlign: 'bottom' });
  });

  it('supports width prop', () => {
    const { container } = render(
      <Table>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell width="150px">Header</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
      </Table>
    );

    const headerCell = container.querySelector('th');
    expect(headerCell).toHaveStyle({ width: '150px' });
  });

  it('supports colSpan prop', () => {
    const { container } = render(
      <Table>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell colSpan={2}>Header</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
      </Table>
    );

    const headerCell = container.querySelector('th');
    expect(headerCell).toHaveAttribute('colspan', '2');
  });

  it('supports rowSpan prop', () => {
    const { container } = render(
      <Table>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell rowSpan={2}>Header</Table.HeaderCell>
            <Table.HeaderCell>Other</Table.HeaderCell>
          </Table.Row>
          <Table.Row>
            <Table.HeaderCell>Sub</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
      </Table>
    );

    const headerCell = container.querySelector('th');
    expect(headerCell).toHaveAttribute('rowspan', '2');
  });

  it('supports noWrap prop', () => {
    const { container } = render(
      <Table>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell noWrap>Long Header Text</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
      </Table>
    );

    const headerCell = container.querySelector('th');
    expect(headerCell).toBeInTheDocument();
  });

  it('supports currency prop', () => {
    const { container } = render(
      <Table>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell currency>Amount, ₽</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
      </Table>
    );

    const headerCell = container.querySelector('th');
    expect(headerCell).toBeInTheDocument();
  });

  it('supports checkboxCell prop', () => {
    const { container } = render(
      <Table>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell checkboxCell>✓</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
      </Table>
    );

    const headerCell = container.querySelector('th');
    expect(headerCell).toBeInTheDocument();
  });
});

describe('Table.CheckboxCell', () => {
  it('renders with Checkbox', () => {
    const { container } = render(
      <Table>
        <Table.Body>
          <Table.Row>
            <Table.CheckboxCell checked={false} onCheckboxClick={() => {}} />
          </Table.Row>
        </Table.Body>
      </Table>
    );

    const checkbox = container.querySelector('input[type="checkbox"]');
    expect(checkbox).toBeInTheDocument();
  });

  it('calls onCheckboxClick when clicked', async () => {
    const onCheckboxClick = vi.fn();
    const { container } = render(
      <Table>
        <Table.Body>
          <Table.Row>
            <Table.CheckboxCell checked={false} onCheckboxClick={onCheckboxClick} />
          </Table.Row>
        </Table.Body>
      </Table>
    );

    const checkbox = container.querySelector('input[type="checkbox"]');
    if (checkbox) {
      await userEvent.click(checkbox);
    }

    expect(onCheckboxClick).toHaveBeenCalled();
  });

  it('displays checked state', () => {
    const { container } = render(
      <Table>
        <Table.Body>
          <Table.Row>
            <Table.CheckboxCell checked={true} onCheckboxClick={() => {}} />
          </Table.Row>
        </Table.Body>
      </Table>
    );

    const checkbox = container.querySelector('input[type="checkbox"]') as HTMLInputElement;
    expect(checkbox?.checked).toBe(true);
  });
});

describe('Table.HeaderCheckboxCell', () => {
  it('renders with Checkbox', () => {
    const { container } = render(
      <Table>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCheckboxCell checked={false} />
          </Table.Row>
        </Table.Header>
      </Table>
    );

    const checkbox = container.querySelector('input[type="checkbox"]');
    expect(checkbox).toBeInTheDocument();
  });

  it('supports initialIndeterminate prop', () => {
    const { container } = render(
      <Table>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCheckboxCell checked={false} initialIndeterminate />
          </Table.Row>
        </Table.Header>
      </Table>
    );

    const checkbox = container.querySelector('input[type="checkbox"]');
    expect(checkbox).toBeInTheDocument();
  });

  it('calls onClick when clicked', async () => {
    const onClick = vi.fn();
    const { container } = render(
      <Table>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCheckboxCell checked={false} onClick={onClick} />
          </Table.Row>
        </Table.Header>
      </Table>
    );

    const checkbox = container.querySelector('input[type="checkbox"]');
    if (checkbox) {
      await userEvent.click(checkbox);
    }

    expect(onClick).toHaveBeenCalled();
  });
});

describe('Table.Header', () => {
  it('renders correctly', () => {
    const { container } = render(
      <Table>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Header</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
      </Table>
    );

    expect(container.querySelector('thead')).toBeInTheDocument();
  });
});

describe('Table.Body', () => {
  it('renders correctly', () => {
    const { container } = render(
      <Table>
        <Table.Body>
          <Table.Row>
            <Table.Cell>Content</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    );

    expect(container.querySelector('tbody')).toBeInTheDocument();
  });
});

describe('Table.Footer', () => {
  it('renders correctly', () => {
    const { container } = render(
      <Table>
        <Table.Footer>
          <Table.Row>
            <Table.Cell>Footer</Table.Cell>
          </Table.Row>
        </Table.Footer>
      </Table>
    );

    expect(container.querySelector('tfoot')).toBeInTheDocument();
  });
});

describe('Table.FilterResultRow', () => {
  it('renders correctly', () => {
    const { container } = render(
      <Table>
        <Table.Body>
          <Table.FilterResultRow tokens={[]} onResetAll={vi.fn()}>
            <Table.Cell>Filter Result</Table.Cell>
          </Table.FilterResultRow>
        </Table.Body>
      </Table>
    );

    expect(container.querySelector('tr')).toBeInTheDocument();
  });
});

describe('Table.FilterResultCell', () => {
  it('renders correctly with empty tokens', () => {
    render(
      <Table>
        <Table.Body>
          <Table.Row>
            <Table.FilterResultCell tokens={[]} onResetAll={vi.fn()} colSpan={2} />
          </Table.Row>
        </Table.Body>
      </Table>
    );

    expect(screen.queryByText(/фильтр/i)).not.toBeInTheDocument();
  });

  it('renders tokens', () => {
    const tokens = [
      { key: '1', caption: 'Filter 1', onRemove: vi.fn() },
      { key: '2', caption: 'Filter 2', onRemove: vi.fn() },
    ];

    render(
      <Table>
        <Table.Body>
          <Table.Row>
            <Table.FilterResultCell tokens={tokens} onResetAll={vi.fn()} colSpan={2} />
          </Table.Row>
        </Table.Body>
      </Table>
    );

    expect(screen.getByText('Filter 1')).toBeInTheDocument();
    expect(screen.getByText('Filter 2')).toBeInTheDocument();
  });
});

describe('Table - empty/null/undefined props handling', () => {
  describe('Table.FilterResultCell', () => {
    it.each(['', null, undefined])('should handle tokens when %s passed', (testValue) => {
      render(
        <Table>
          <Table.Body>
            <Table.Row>
              <Table.FilterResultCell tokens={testValue as any} onResetAll={testValue as any} />
            </Table.Row>
          </Table.Body>
        </Table>
      );

      expect(document.querySelector('td')).toBeInTheDocument();
    });
  });
});
