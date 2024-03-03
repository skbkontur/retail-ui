import React from 'react';

import { DefaultizeProps } from '../lib/utils';

// TODO We should output state too
const renderPropsDesc = <P extends Record<string, any>>(props: P): React.ReactNode => {
  return Object.keys(props)
    .map((key) => {
      const value = props[key];

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
    })
    .map((node, index, nodes) => (
      <span key={index}>
        {node} {index + 1 < nodes.length ? ', ' : null}
      </span>
    ));
};

interface StatePropsObject<P, S> {
  props?: Partial<P>;
  state?: Partial<S>;
}
export type StatePropsCombinations<P, S> = Array<StatePropsObject<P, S>>;

export type StateType<C> = C extends React.Component<any, infer S> | React.ComponentClass<any, infer S> ? S : never;

export interface ComponentTableProps<C, P, S> {
  rows?: StatePropsCombinations<P, S>;
  cols?: StatePropsCombinations<P, S>;
  presetProps?: DefaultizeProps<C, P>;
  Component: C;
}

export function ComponentTable<
  T extends React.Component<any, any, any>,
  C extends React.ComponentType,
  P extends React.ComponentProps<C>,
>({
  rows = [],
  cols = [],
  presetProps,
  Component,
}: ComponentTableProps<C extends React.ComponentClass<P, any> ? React.ClassType<P, T, C> : C, P, StateType<C>>) {
  return (
    <table style={{ borderSpacing: 10, marginBottom: 20 }}>
      <caption style={{ captionSide: 'bottom' }}>{renderPropsDesc(presetProps ?? {})}</caption>
      <thead>
        <tr>
          <th>{''}</th>
          {cols.map(({ props: colProps = {} }, i) => (
            <th style={{ whiteSpace: 'nowrap' }} key={i}>
              {renderPropsDesc(colProps)}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map(({ props: rowProps = {} }, rowIndex) => (
          <tr key={rowIndex}>
            <td style={{ whiteSpace: 'nowrap' }}>{renderPropsDesc(rowProps)}</td>
            {cols.map(({ props: colProps = {} }, colIndex) => (
              <td key={colIndex}>
                {/* @ts-expect-error: Defaultized props incompatible with JSX.LibraryManagedAttributes so just ignore it */}
                <Component {...(presetProps ?? {})} {...rowProps} {...colProps} />
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
