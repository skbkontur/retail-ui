import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { describe, it, expect, vi } from 'vitest';

import { Table } from '../src/components/Table/Table';
import { TableActionBar } from '../src/components/Table/TableActionBar/TableActionBar';
import { TableDataTids } from '../src/components/Table/TableDataTids';

const MockIcon = () => <svg data-tid="mock-icon" />;

describe('TableActionBar', () => {
  const createItems = (count: number, onClick = vi.fn()) =>
    Array.from({ length: count }, (_, i) => ({
      key: `action-${i}`,
      icon: <MockIcon />,
      text: `Action ${i + 1}`,
      onClick,
      'data-tid': `action-${i + 1}`,
    }));

  it('renders inline items when count is less than or equal to itemsVisible', () => {
    render(
      <Table>
        <Table.Body>
          <Table.Row>
            <Table.Cell>
              <TableActionBar items={createItems(3)} itemsVisible={3} />
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    );

    expect(screen.getByTestId('action-1')).toBeInTheDocument();
    expect(screen.getByTestId('action-2')).toBeInTheDocument();
    expect(screen.getByTestId('action-3')).toBeInTheDocument();
    expect(screen.queryByTestId(TableDataTids.actionsKebabButton)).not.toBeInTheDocument();
  });

  it('renders kebab when items exceed itemsVisible', () => {
    render(
      <Table>
        <Table.Body>
          <Table.Row>
            <Table.Cell>
              <TableActionBar items={createItems(4)} itemsVisible={3} />
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    );

    expect(screen.getByTestId('action-1')).toBeInTheDocument();
    expect(screen.getByTestId('action-2')).toBeInTheDocument();
    expect(screen.getByTestId('action-3')).toBeInTheDocument();
    expect(screen.queryByTestId('action-4')).not.toBeInTheDocument();
    expect(screen.getByTestId(TableDataTids.actionsKebabButton)).toBeInTheDocument();
  });

  it('opens menu and shows hidden items', async () => {
    const onClick = vi.fn();
    render(
      <Table>
        <Table.Body>
          <Table.Row>
            <Table.Cell>
              <TableActionBar items={createItems(4, onClick)} itemsVisible={3} />
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    );

    const kebabButton = screen.getByTestId(TableDataTids.actionsKebabButton);
    await userEvent.click(kebabButton);

    const hiddenAction = screen.getByText('Action 4'); // items are 1-based in text
    // actually, itemsVisible=3 means index 0, 1, 2 are inline (Action 1, Action 2, Action 3).
    // index 3+ (Action 4) are in menu.
    expect(hiddenAction).toBeInTheDocument();
    await userEvent.click(hiddenAction);
    expect(onClick).toHaveBeenCalled();
  });

  it('renders all items in kebab when overlay prop is true', () => {
    render(
      <Table>
        <Table.Body>
          <Table.Row>
            <Table.Cell>
              <TableActionBar items={createItems(3)} itemsVisible={0} overlay />
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    );

    expect(screen.queryByTestId('action-1')).not.toBeInTheDocument();
    expect(screen.queryByTestId('action-2')).not.toBeInTheDocument();
    expect(screen.queryByTestId('action-3')).not.toBeInTheDocument();
    expect(screen.getByTestId(TableDataTids.actionsKebabButton)).toBeInTheDocument();
  });

  it('renders with overlay class when overlay prop is true', () => {
    const { container } = render(
      <Table>
        <Table.Body>
          <Table.Row>
            <Table.Cell>
              <TableActionBar items={createItems(1)} overlay />
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    );

    // Check if the wrapper having data-tid=popupActionBar is present
    expect(screen.getByTestId(TableDataTids.popupActionBar)).toBeInTheDocument();
  });

  it('handles click on inline items', async () => {
    const onClick = vi.fn();
    render(
      <Table>
        <Table.Body>
          <Table.Row>
            <Table.Cell>
              <TableActionBar items={createItems(1, onClick)} />
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    );

    const button = screen.getByTestId('action-1').querySelector('button');
    await userEvent.click(button!);
    expect(onClick).toHaveBeenCalled();
  });

  it('renders danger inline item with red color', () => {
    const items = [
      {
        key: '1',
        text: 'Delete',
        danger: true,
        'data-tid': 'neg-action',
      },
    ];
    render(
      <Table>
        <Table.Body>
          <Table.Row>
            <Table.Cell>
              <TableActionBar items={items} />
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    );

    const btn = screen.getByTestId('neg-action');
    // Button from react-ui might wrap content or apply style to root.
    // TableActionBar applies style={...} to Button.
    // We check if the element (or its child?) has the style.
    // The Button component passes style prop to root button usually.
    expect(btn).toHaveStyle('color: var(--table-red)');
  });
});
