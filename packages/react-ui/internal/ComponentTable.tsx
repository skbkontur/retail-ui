import React from 'react';

const convertData = (data: Record<string, unknown>) => {
  return Object.keys(data).map((key) => {
    const value = data[key];

    if (typeof value === 'boolean') {
      return value ? key : `${key}: false`;
    }

    if (typeof value === 'object') {
      if (React.isValidElement(value)) {
        return React.createElement('span', {}, [`${key}: `, value]);
      }

      return `${key}: ${JSON.stringify(value)}`;
    }

    return `${key}: "${value}"`;
  });
};

const PropsList = ({ rawData }: { rawData: Record<string, unknown> }) => {
  return (
    <>
      {convertData(rawData).map((node, index, nodes) => {
        return (
          <span key={index}>
            {node} {index + 1 < nodes.length ? ', ' : null}
          </span>
        );
      })}
    </>
  );
};

export type Props<P> = Array<{ props?: Partial<P> }>;
export interface ComponentTableProps<P> {
  rows?: Props<P>;
  cols?: Props<P>;
  children: React.ReactElement;
}

export function ComponentTable<P>({ rows = [], cols = [], children }: ComponentTableProps<P>) {
  const childrenProps = children?.props;

  return (
    <table style={{ borderSpacing: 10, marginBottom: 20 }}>
      {/* Caption under the table */}
      <caption style={{ captionSide: 'bottom' }}>
        <PropsList rawData={childrenProps} />
      </caption>
      {/* Props list at the top */}
      <thead>
        <tr>
          <th>{''}</th>
          {cols.map(({ props: colProps = {} }, i) => (
            <th style={{ whiteSpace: 'nowrap' }} key={i}>
              <PropsList rawData={colProps} />
            </th>
          ))}
        </tr>
      </thead>
      {/* Props list on the left and component states */}
      <tbody>
        {rows.map(({ props: rowProps = {} }, rowIndex) => (
          <tr key={rowIndex}>
            <td style={{ whiteSpace: 'nowrap' }}>
              <PropsList rawData={rowProps} />
            </td>
            {cols.map(({ props: colProps = {} }, colIndex) => {
              return (
                <td key={colIndex}>
                  {React.cloneElement(children, {
                    ...rowProps,
                    ...colProps,
                  })}
                </td>
              );
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
