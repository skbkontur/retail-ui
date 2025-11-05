import type { FC } from 'react';
import React from 'react';
import { Table } from '@storybook/components';
import { Markdown } from '@storybook/blocks';

export interface PublicMethod {
  name: string;
  description: string;
  params: Array<{
    name: string;
    optinal: boolean;
    type: { name: 'string' | 'number' | 'boolean' | 'object' | 'undefined' | 'null' | 'function' };
  }>;
}

interface PublicMethodsProps {
  methods: PublicMethod[];
  className?: string;
}

export const PublicMethods: FC<PublicMethodsProps> = ({ methods, className }) => {
  return (
    <Table className={className} style={{ width: '100%' }}>
      <thead>
        <tr style={{ borderTop: 0 }}>
          <th style={{ width: '25%' }}>Ref method</th>
          <th style={{ width: '35%' }}>Parameters</th>
          <th style={{ width: '25%' }}>Description</th>
        </tr>
      </thead>
      <tbody>
        {methods.map((row) => (
          <tr key={row.name}>
            <td>
              <code>{row.name}()</code>
            </td>
            <td>
              {row.params && row.params.length > 0 ? (
                row.params.map((param, index) => (
                  <div key={param.name || index} style={{ marginBottom: '4px' }}>
                    <code>
                      {param.name}: {param.type.name}
                      {param.optinal && <span style={{ color: '#666' }}> (optional)</span>}
                    </code>
                  </div>
                ))
              ) : (
                <>-</>
              )}
            </td>
            <td>
              <Markdown>{row.description || '-'}</Markdown>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};
