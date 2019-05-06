import * as React from 'react';
import { ReactComponentLike } from 'prop-types';

const renderStateDesc = <T extends object>(state: T): React.ReactNode => {
  return Object.keys(state)
    .map(key => {
      // @ts-ignore
      const value = state[key];
      switch (typeof value) {
        case 'boolean':
          return key + (value ? '' : ': false');
        case 'string':
          return `${key}: "${value}"`;
        case 'object':
          if (React.isValidElement(value)) {
            return React.createElement('span', {}, [`${key}: `, value]);
          }
          return `${key}: ${JSON.stringify(value)}`;
        default:
          return `${key}: ${value}`;
      }
    })
    .map((node: React.ReactNode, index: number, nodes: React.ReactNode[]) => (
      <span key={index}>
        {node} {index + 1 < nodes.length ? ', ' : null}
      </span>
    ));
};
export interface TableProps<T extends {}> {
  rows?: Array<Partial<T>>;
  cols?: Array<Partial<T>>;
  presetState: Partial<T>;
  component: ReactComponentLike;
  children: React.ReactNode;
}

export default function ComponentStatesTable<T extends {}>(props: TableProps<T>) {
  const { rows = [], cols = [], presetState, component: Component } = props;
  return (
    <table style={{ borderSpacing: 10, marginBottom: 20 }}>
      <caption style={{ captionSide: 'bottom' }}>{renderStateDesc(presetState)}</caption>
      <thead>
        <tr>
          <th />
          {cols.map((state, i) => (
            <th style={{ whiteSpace: 'nowrap' }} key={i}>
              {renderStateDesc(state)}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((rowState, rowIndex) => (
          <tr key={rowIndex}>
            <td style={{ whiteSpace: 'nowrap' }}>{renderStateDesc(rowState)}</td>
            {cols.map((colState, colIndex) => (
              <td key={colIndex}>
                <Component children={props.children} {...rowState} {...colState} {...presetState} />
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
