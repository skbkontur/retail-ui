import { describe, it, expect, vi } from 'vitest';
import React from 'react';
import { render, screen } from '@testing-library/react';

import { Table } from '../src/components/Table/Table';

describe('Props Forwarding', () => {
  describe('Table', () => {
    it('forwards data-tid attribute', () => {
      render(
        <Table data-tid="test-table">
          <Table.Body>
            <Table.Row>
              <Table.Cell>Content</Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      );

      expect(screen.getByTestId('test-table')).toBeInTheDocument();
    });

    it('forwards data-testid attribute', () => {
      const { container } = render(
        <Table data-testid="test-table-id">
          <Table.Body>
            <Table.Row>
              <Table.Cell>Content</Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      );

      const table = container.querySelector('[data-testid="test-table-id"]');
      expect(table).toBeInTheDocument();
    });

    it('forwards className', () => {
      const { container } = render(
        <Table className="custom-class">
          <Table.Body>
            <Table.Row>
              <Table.Cell>Content</Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      );

      const table = container.querySelector('table');
      expect(table).toHaveClass('custom-class');
    });

    it('forwards style', () => {
      const { container } = render(
        <Table style={{ width: '100%', border: '1px solid red' }}>
          <Table.Body>
            <Table.Row>
              <Table.Cell>Content</Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      );

      const table = container.querySelector('table');
      expect(table).toHaveStyle({ width: '100%' });
    });
  });

  describe('Table.Row', () => {
    it('forwards data-tid attribute', () => {
      render(
        <Table>
          <Table.Body>
            <Table.Row data-tid="test-row">
              <Table.Cell>Content</Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      );

      expect(screen.getByTestId('test-row')).toBeInTheDocument();
    });

    it('forwards className', () => {
      const { container } = render(
        <Table>
          <Table.Body>
            <Table.Row className="custom-row-class">
              <Table.Cell>Content</Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      );

      const row = container.querySelector('tr');
      expect(row).toHaveClass('custom-row-class');
    });

    it('forwards style', () => {
      const { container } = render(
        <Table>
          <Table.Body>
            <Table.Row style={{ backgroundColor: 'red' }}>
              <Table.Cell>Content</Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      );

      const row = container.querySelector('tr');
      expect(row).toHaveStyle({ backgroundColor: 'red' });
    });
  });

  describe('Table.Cell', () => {
    it('forwards data-tid attribute', () => {
      render(
        <Table>
          <Table.Body>
            <Table.Row>
              <Table.Cell data-tid="test-cell">Content</Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      );

      expect(screen.getByTestId('test-cell')).toBeInTheDocument();
    });

    it('forwards className', () => {
      const { container } = render(
        <Table>
          <Table.Body>
            <Table.Row>
              <Table.Cell className="custom-cell-class">Content</Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      );

      const cell = container.querySelector('td');
      expect(cell).toHaveClass('custom-cell-class');
    });

    it('forwards style', () => {
      const { container } = render(
        <Table>
          <Table.Body>
            <Table.Row>
              <Table.Cell style={{ textAlign: 'center' }}>Content</Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      );

      const cell = container.querySelector('td');
      expect(cell).toHaveStyle({ textAlign: 'center' });
    });
  });

  describe('Table.HeaderCell', () => {
    it('forwards data-tid attribute', () => {
      render(
        <Table>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell data-tid="test-header-cell">Header</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
        </Table>
      );

      expect(screen.getByTestId('test-header-cell')).toBeInTheDocument();
    });

    it('forwards className', () => {
      const { container } = render(
        <Table>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell className="custom-header-class">Header</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
        </Table>
      );

      const headerCell = container.querySelector('th');
      expect(headerCell).toHaveClass('custom-header-class');
    });

    it('forwards style', () => {
      const { container } = render(
        <Table>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell style={{ fontWeight: 'bold' }}>Header</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
        </Table>
      );

      const headerCell = container.querySelector('th');
      expect(headerCell).toHaveStyle({ fontWeight: 'bold' });
    });
  });

  describe('Table.Header', () => {
    it('forwards data-tid attribute', () => {
      render(
        <Table>
          <Table.Header data-tid="test-header">
            <Table.Row>
              <Table.HeaderCell>Header</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
        </Table>
      );

      expect(screen.getByTestId('test-header')).toBeInTheDocument();
    });

    it('forwards className', () => {
      const { container } = render(
        <Table>
          <Table.Header className="custom-thead-class">
            <Table.Row>
              <Table.HeaderCell>Header</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
        </Table>
      );

      const thead = container.querySelector('thead');
      expect(thead).toHaveClass('custom-thead-class');
    });
  });

  describe('Table.Body', () => {
    it('forwards data-tid attribute', () => {
      render(
        <Table>
          <Table.Body data-tid="test-body">
            <Table.Row>
              <Table.Cell>Content</Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      );

      expect(screen.getByTestId('test-body')).toBeInTheDocument();
    });

    it('forwards className', () => {
      const { container } = render(
        <Table>
          <Table.Body className="custom-tbody-class">
            <Table.Row>
              <Table.Cell>Content</Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      );

      const tbody = container.querySelector('tbody');
      expect(tbody).toHaveClass('custom-tbody-class');
    });
  });

  describe('Table.Footer', () => {
    it('forwards data-tid attribute', () => {
      render(
        <Table>
          <Table.Footer data-tid="test-footer">
            <Table.Row>
              <Table.Cell>Footer</Table.Cell>
            </Table.Row>
          </Table.Footer>
        </Table>
      );

      expect(screen.getByTestId('test-footer')).toBeInTheDocument();
    });

    it('forwards className', () => {
      const { container } = render(
        <Table>
          <Table.Footer className="custom-tfoot-class">
            <Table.Row>
              <Table.Cell>Footer</Table.Cell>
            </Table.Row>
          </Table.Footer>
        </Table>
      );

      const tfoot = container.querySelector('tfoot');
      expect(tfoot).toHaveClass('custom-tfoot-class');
    });
  });

  describe('Table.FilterResultRow', () => {
    it('forwards data-tid attribute', () => {
      render(
        <Table>
          <Table.Body>
            <Table.FilterResultRow data-tid="test-filter-row" tokens={[]} onResetAll={vi.fn()}>
              <Table.Cell>Filter Result</Table.Cell>
            </Table.FilterResultRow>
          </Table.Body>
        </Table>
      );

      expect(screen.getByTestId('test-filter-row')).toBeInTheDocument();
    });

    it('forwards className', () => {
      const { container } = render(
        <Table>
          <Table.Body>
            <Table.FilterResultRow className="custom-filter-row-class" tokens={[]} onResetAll={vi.fn()}>
              <Table.Cell>Filter Result</Table.Cell>
            </Table.FilterResultRow>
          </Table.Body>
        </Table>
      );

      const row = container.querySelector('tr');
      expect(row).toHaveClass('custom-filter-row-class');
    });
  });
});
