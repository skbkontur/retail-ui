import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { describe, it, expect, vi } from 'vitest';

import { Table } from '../src/components/Table/Table';

describe('TableEditableCell', () => {
  const renderCell = (onRowClick = vi.fn()) =>
    render(
      <Table>
        <Table.Body>
          <Table.Row onClick={onRowClick}>
            <Table.EditableCell editor={<input aria-label="Имя" defaultValue="Иван" />}>Иван</Table.EditableCell>
          </Table.Row>
        </Table.Body>
      </Table>,
    );

  it('keeps the editor reachable and hides the duplicate text from assistive tech', () => {
    renderCell();

    expect(screen.getByRole('textbox', { name: 'Имя' })).toBeInTheDocument();
    expect(screen.getByText('Иван')).toHaveAttribute('aria-hidden', 'true');
  });

  it('does not trigger row onClick when the editor is clicked', async () => {
    const onRowClick = vi.fn();
    renderCell(onRowClick);

    await userEvent.click(screen.getByRole('textbox', { name: 'Имя' }));

    expect(onRowClick).not.toHaveBeenCalled();
  });
});
