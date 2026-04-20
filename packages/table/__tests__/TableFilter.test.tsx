import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React, { useState } from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';

import { Table } from '../src/components/Table/Table';
import { TableFilter } from '../src/components/Table/TableFilter/TableFilter';
import { TableFilterItem } from '../src/components/Table/TableFilter/TableFilterItem';
import { TableFilterSearch } from '../src/components/Table/TableFilter/TableFilterSearch';
import { TableHeaderButton } from '../src/components/Table/TableFilter/TableHeaderButton';

describe('TableDropdownFilter', () => {
  const defaultProps = {
    options: ['Option 1', 'Option 2', 'Option 3'],
    selectedOptions: [] as string[],
    onSelect: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders correctly', () => {
    render(
      <Table>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>
              <Table.DropdownFilter {...defaultProps}>Column Header</Table.DropdownFilter>
            </Table.HeaderCell>
          </Table.Row>
        </Table.Header>
      </Table>
    );

    expect(screen.getByText('Column Header')).toBeInTheDocument();
  });

  it('shows popup when clicked', async () => {
    render(
      <Table>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>
              <Table.DropdownFilter {...defaultProps}>Column Header</Table.DropdownFilter>
            </Table.HeaderCell>
          </Table.Row>
        </Table.Header>
      </Table>
    );

    const header = screen.getByText('Column Header');
    await userEvent.click(header);

    await waitFor(() => {
      expect(screen.getByText('Option 1')).toBeInTheDocument();
      expect(screen.getByText('Option 2')).toBeInTheDocument();
      expect(screen.getByText('Option 3')).toBeInTheDocument();
    });
  });

  it('filters options by search query', async () => {
    render(
      <Table>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>
              <Table.DropdownFilter {...defaultProps}>Column Header</Table.DropdownFilter>
            </Table.HeaderCell>
          </Table.Row>
        </Table.Header>
      </Table>
    );

    const header = screen.getByText('Column Header');
    await userEvent.click(header);

    await waitFor(() => {
      expect(screen.getByText('Option 1')).toBeInTheDocument();
    });

    const searchInput = screen.getByRole('textbox');
    await userEvent.type(searchInput, '1');

    await waitFor(() => {
      expect(screen.getByText('Option 1')).toBeInTheDocument();
      expect(screen.queryByText('Option 2')).not.toBeInTheDocument();
      expect(screen.queryByText('Option 3')).not.toBeInTheDocument();
    });
  });

  it('shows "no results" when search returns empty', async () => {
    render(
      <Table>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>
              <Table.DropdownFilter {...defaultProps}>Column Header</Table.DropdownFilter>
            </Table.HeaderCell>
          </Table.Row>
        </Table.Header>
      </Table>
    );

    const header = screen.getByText('Column Header');
    await userEvent.click(header);

    await waitFor(() => {
      expect(screen.getByText('Option 1')).toBeInTheDocument();
    });

    const searchInput = screen.getByRole('textbox');
    await userEvent.type(searchInput, 'nonexistent');

    await waitFor(() => {
      expect(screen.getByText(/нет результатов/i)).toBeInTheDocument();
    });
  });

  it('selects option when clicked', async () => {
    const onSelect = vi.fn();
    render(
      <Table>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>
              <Table.DropdownFilter {...defaultProps} onSelect={onSelect}>
                Column Header
              </Table.DropdownFilter>
            </Table.HeaderCell>
          </Table.Row>
        </Table.Header>
      </Table>
    );

    const header = screen.getByText('Column Header');
    await userEvent.click(header);

    await waitFor(() => {
      expect(screen.getByText('Option 1')).toBeInTheDocument();
    });

    const option = screen.getByText('Option 1');
    await userEvent.click(option);

    expect(onSelect).toHaveBeenCalledWith(['Option 1']);
  });

  it('deselects option when already selected', async () => {
    const onSelect = vi.fn();
    render(
      <Table>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>
              <Table.DropdownFilter {...defaultProps} selectedOptions={['Option 1']} onSelect={onSelect}>
                Column Header
              </Table.DropdownFilter>
            </Table.HeaderCell>
          </Table.Row>
        </Table.Header>
      </Table>
    );

    const header = screen.getByText('Column Header');
    await userEvent.click(header);

    await waitFor(() => {
      expect(screen.getByText('Option 1')).toBeInTheDocument();
    });

    const option = screen.getByText('Option 1');
    await userEvent.click(option);

    expect(onSelect).toHaveBeenCalledWith([]);
  });
});

describe('TableDropdownSortableFilter', () => {
  const defaultProps = {
    options: ['Option 1', 'Option 2', 'Option 3'],
    selectedOptions: [] as string[],
    onSelect: vi.fn(),
    onSort: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders correctly', () => {
    render(
      <Table>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>
              <Table.DropdownSortableFilter {...defaultProps}>Column Header</Table.DropdownSortableFilter>
            </Table.HeaderCell>
          </Table.Row>
        </Table.Header>
      </Table>
    );

    expect(screen.getByText('Column Header')).toBeInTheDocument();
  });

  it('shows sort options in popup', async () => {
    render(
      <Table>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>
              <Table.DropdownSortableFilter {...defaultProps}>Column Header</Table.DropdownSortableFilter>
            </Table.HeaderCell>
          </Table.Row>
        </Table.Header>
      </Table>
    );

    const header = screen.getByText('Column Header');
    await userEvent.click(header);

    await waitFor(() => {
      expect(screen.getByText(/по возрастанию/i)).toBeInTheDocument();
      expect(screen.getByText(/по убыванию/i)).toBeInTheDocument();
    });
  });

  it('calls onSort with asc when ascending clicked', async () => {
    const onSort = vi.fn();
    render(
      <Table>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>
              <Table.DropdownSortableFilter {...defaultProps} onSort={onSort}>
                Column Header
              </Table.DropdownSortableFilter>
            </Table.HeaderCell>
          </Table.Row>
        </Table.Header>
      </Table>
    );

    const header = screen.getByText('Column Header');
    await userEvent.click(header);

    await waitFor(() => {
      expect(screen.getByText(/по возрастанию/i)).toBeInTheDocument();
    });

    const ascOption = screen.getByText(/по возрастанию/i);
    await userEvent.click(ascOption);

    expect(onSort).toHaveBeenCalledWith('asc');
  });

  it('calls onSort with desc when descending clicked', async () => {
    const onSort = vi.fn();
    render(
      <Table>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>
              <Table.DropdownSortableFilter {...defaultProps} onSort={onSort}>
                Column Header
              </Table.DropdownSortableFilter>
            </Table.HeaderCell>
          </Table.Row>
        </Table.Header>
      </Table>
    );

    const header = screen.getByText('Column Header');
    await userEvent.click(header);

    await waitFor(() => {
      expect(screen.getByText(/по убыванию/i)).toBeInTheDocument();
    });

    const descOption = screen.getByText(/по убыванию/i);
    await userEvent.click(descOption);

    expect(onSort).toHaveBeenCalledWith('desc');
  });
});

describe('TableSort', () => {
  it('renders correctly', () => {
    render(
      <Table>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>
              <Table.Sort>Column Header</Table.Sort>
            </Table.HeaderCell>
          </Table.Row>
        </Table.Header>
      </Table>
    );

    expect(screen.getByText('Column Header')).toBeInTheDocument();
  });

  it('renders without default icon when withoutDefaultIcon is inherited', () => {
    const { container } = render(
      <Table>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>
              <Table.Sort>Column Header</Table.Sort>
            </Table.HeaderCell>
          </Table.Row>
        </Table.Header>
      </Table>
    );

    expect(container.querySelector('button')).toBeInTheDocument();
  });

  it('calls onClick when clicked', async () => {
    const onClick = vi.fn();
    render(
      <Table>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>
              <Table.Sort onClick={onClick}>Column Header</Table.Sort>
            </Table.HeaderCell>
          </Table.Row>
        </Table.Header>
      </Table>
    );

    const button = screen.getByText('Column Header');
    await userEvent.click(button);

    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('shows sort icon when sorted asc', () => {
    render(
      <Table>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>
              <Table.Sort sortDirection="asc">Column Header</Table.Sort>
            </Table.HeaderCell>
          </Table.Row>
        </Table.Header>
      </Table>
    );

    expect(screen.getByText('Column Header')).toBeInTheDocument();
  });

  it('shows sort icon when sorted desc', () => {
    render(
      <Table>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>
              <Table.Sort sortDirection="desc">Column Header</Table.Sort>
            </Table.HeaderCell>
          </Table.Row>
        </Table.Header>
      </Table>
    );

    expect(screen.getByText('Column Header')).toBeInTheDocument();
  });
});

describe('TableFilter', () => {
  it('renders correctly', () => {
    render(
      <Table>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>
              <TableFilter filtered={false} popup={<div>Popup content</div>}>
                Column Header
              </TableFilter>
            </Table.HeaderCell>
          </Table.Row>
        </Table.Header>
      </Table>
    );

    expect(screen.getByText('Column Header')).toBeInTheDocument();
  });

  it('shows filter indicator when filtered', () => {
    render(
      <Table>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>
              <TableFilter filtered={true} popup={<div>Popup content</div>}>
                Column Header
              </TableFilter>
            </Table.HeaderCell>
          </Table.Row>
        </Table.Header>
      </Table>
    );

    expect(screen.getByText('Column Header')).toBeInTheDocument();
  });

  it('opens popup with filters when clicked', async () => {
    render(
      <Table>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>
              <TableFilter filtered={false} popup={<div>Popup content</div>}>
                Column Header
              </TableFilter>
            </Table.HeaderCell>
          </Table.Row>
        </Table.Header>
      </Table>
    );

    const header = screen.getByText('Column Header');
    await userEvent.click(header);

    await waitFor(() => {
      expect(screen.getByText('Popup content')).toBeInTheDocument();
    });
  });
});

describe('TableHeaderButton', () => {
  it('renders correctly', () => {
    render(
      <Table>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>
              <TableHeaderButton>Column Header</TableHeaderButton>
            </Table.HeaderCell>
          </Table.Row>
        </Table.Header>
      </Table>
    );

    expect(screen.getByText('Column Header')).toBeInTheDocument();
  });

  it('shows filter icon when filtered', () => {
    const { container } = render(
      <Table>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>
              <TableHeaderButton filtered>Column Header</TableHeaderButton>
            </Table.HeaderCell>
          </Table.Row>
        </Table.Header>
      </Table>
    );

    expect(container.querySelector('svg')).toBeInTheDocument();
  });

  it('shows sort icon when sorted asc', () => {
    const { container } = render(
      <Table>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>
              <TableHeaderButton sortDirection="asc">Column Header</TableHeaderButton>
            </Table.HeaderCell>
          </Table.Row>
        </Table.Header>
      </Table>
    );

    expect(container.querySelector('svg')).toBeInTheDocument();
  });

  it('shows sort icon when sorted desc', () => {
    const { container } = render(
      <Table>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>
              <TableHeaderButton sortDirection="desc">Column Header</TableHeaderButton>
            </Table.HeaderCell>
          </Table.Row>
        </Table.Header>
      </Table>
    );

    expect(container.querySelector('svg')).toBeInTheDocument();
  });

  it('shows both icons when filtered and sorted', () => {
    const { container } = render(
      <Table>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>
              <TableHeaderButton filtered sortDirection="asc">
                Column Header
              </TableHeaderButton>
            </Table.HeaderCell>
          </Table.Row>
        </Table.Header>
      </Table>
    );

    const svgs = container.querySelectorAll('svg');
    expect(svgs.length).toBeGreaterThanOrEqual(2);
  });

  it('does not show default icon when withoutDefaultIcon is true', () => {
    const { container } = render(
      <Table>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>
              <TableHeaderButton withoutDefaultIcon>Column Header</TableHeaderButton>
            </Table.HeaderCell>
          </Table.Row>
        </Table.Header>
      </Table>
    );

    expect(container.querySelector('svg')).not.toBeInTheDocument();
  });

  it('calls onClick when clicked', async () => {
    const onClick = vi.fn();
    render(
      <Table>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>
              <TableHeaderButton onClick={onClick}>Column Header</TableHeaderButton>
            </Table.HeaderCell>
          </Table.Row>
        </Table.Header>
      </Table>
    );

    const button = screen.getByText('Column Header');
    await userEvent.click(button);

    expect(onClick).toHaveBeenCalledTimes(1);
  });
});

describe('TableFilterSearch', () => {
  it('renders correctly', () => {
    const handleSearchQuery = vi.fn();
    render(<TableFilterSearch searchPlaceholder="Search..." searchQuery="" handleSearchQuery={handleSearchQuery} />);

    expect(screen.getByPlaceholderText('Search...')).toBeInTheDocument();
  });

  it('calls handleSearchQuery on input change', async () => {
    const handleSearchQuery = vi.fn();
    render(<TableFilterSearch searchPlaceholder="Search..." searchQuery="" handleSearchQuery={handleSearchQuery} />);

    const input = screen.getByPlaceholderText('Search...');
    await userEvent.type(input, 'test');

    expect(handleSearchQuery).toHaveBeenCalled();
  });
});

describe('TableFilterItem', () => {
  it('renders correctly', () => {
    render(<TableFilterItem>Item content</TableFilterItem>);

    expect(screen.getByText('Item content')).toBeInTheDocument();
  });

  it('calls onClick when clicked', async () => {
    const onClick = vi.fn();
    render(<TableFilterItem onClick={onClick}>Item content</TableFilterItem>);

    const item = screen.getByText('Item content');
    await userEvent.click(item);

    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('is disabled when disabled prop is true', () => {
    render(<TableFilterItem disabled>Item content</TableFilterItem>);

    expect(screen.getByText('Item content')).toBeInTheDocument();
  });
});

describe('TableFilter components - empty/null/undefined props handling', () => {
  describe('Table.DropdownSortableFilter', () => {
    it.each(['', null, undefined])('should handle onSort when %s passed', (testValue) => {
      render(
        <Table>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>
                <Table.DropdownSortableFilter
                  options={['Option 1']}
                  selectedOptions={[]}
                  onSelect={vi.fn()}
                  onSort={testValue as any}
                >
                  Column Header
                </Table.DropdownSortableFilter>
              </Table.HeaderCell>
            </Table.Row>
          </Table.Header>
        </Table>
      );

      expect(screen.getByText('Column Header')).toBeInTheDocument();
    });
  });

  describe('TableFilterSearch', () => {
    it.each(['', null, undefined])('should handle searchPlaceholder when %s passed', (testValue) => {
      const handleSearchQuery = vi.fn();
      render(
        <TableFilterSearch
          searchPlaceholder={testValue as string}
          searchQuery=""
          handleSearchQuery={handleSearchQuery}
        />
      );

      expect(screen.getByRole('textbox')).toBeInTheDocument();
    });

    it.each(['', null, undefined])('should clear the searchQuery when %s passed', async (testValue) => {
      const Comp = () => {
        const [searchQuery, setSearchQuery] = useState<string | null | undefined>('initial query');

        const handleSearchQueryChange = (value: string) => {
          setSearchQuery(value);
        };

        return (
          <>
            <TableFilterSearch
              searchPlaceholder="Search"
              searchQuery={searchQuery ?? ''}
              handleSearchQuery={handleSearchQueryChange}
            />
            <button onClick={() => setSearchQuery(testValue)}>Clear</button>
          </>
        );
      };

      render(<Comp />);
      const input = screen.getByRole('textbox') as HTMLInputElement;

      expect(input.value).toBe('initial query');

      await userEvent.click(screen.getByRole('button', { name: 'Clear' }));

      expect(input.value).toBe('');

      await userEvent.type(input, '111');
      expect(input.value).toBe('111');
    });
  });
});
