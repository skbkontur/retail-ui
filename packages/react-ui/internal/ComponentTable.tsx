import React from 'react';

import { isFunctionalComponent, DefaultizeProps } from '../lib/utils';
import { createPropsGetter } from '../lib/createPropsGetter';

// TODO We should output state too
const renderPropsDesc = <P extends Record<string, any>>(props: P): React.ReactNode => {
  return Object.keys(props)
    .map((key) => {
      const value = props[key];
      switch (typeof value) {
        case 'boolean':
          return value ? key : `${key}: false`;
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
  presetState?: Partial<S>;
  Component: C;
}

type DefaultProps<C, P, S> = Required<Pick<ComponentTableProps<C, P, S>, 'presetProps' | 'presetState'>>;

// Known limitation: Don't work when component have `propTypes` static field
export class ComponentTable<
  T extends React.Component<any, any, any>,
  C extends React.ComponentType<any>,
  P extends React.ComponentProps<C>,
> extends React.Component<
  ComponentTableProps<C extends React.ComponentClass<P, any> ? React.ClassType<P, T, C> : C, P, StateType<C>>
> {
  public static defaultProps: DefaultProps<unknown, Record<string | number | symbol, unknown>, unknown> = {
    presetProps: {},
    presetState: {},
  };

  private getProps = createPropsGetter(ComponentTable.defaultProps);

  public render() {
    const { rows = [], cols = [], Component } = this.props;
    const { presetProps, presetState } = this.getProps();
    return (
      <table style={{ borderSpacing: 10, marginBottom: 20 }}>
        <caption style={{ captionSide: 'bottom' }}>{renderPropsDesc(presetProps)}</caption>
        <thead>
          <tr>
            <th />
            {cols.map(({ props: colProps = {} }, i) => (
              <th style={{ whiteSpace: 'nowrap' }} key={i}>
                {renderPropsDesc(colProps)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map(({ props: rowProps = {}, state: rowState = {} }, rowIndex) => (
            <tr key={rowIndex}>
              <td style={{ whiteSpace: 'nowrap' }}>{renderPropsDesc(rowProps)}</td>
              {cols.map(({ props: colProps = {}, state: colState = {} }, colIndex) => (
                <td key={colIndex}>
                  {/* @ts-expect-error: Defaultized props incompatible with JSX.LibraryManagedAttributes so just ignore it */}
                  <Component
                    {...presetProps}
                    {...rowProps}
                    {...colProps}
                    ref={
                      // NOTE Call setState from outside is bad practice, but here it needed for test state combinations
                      isFunctionalComponent(Component)
                        ? undefined
                        : (el: React.Component<P, StateType<C>>) =>
                            el &&
                            el.setState((state: StateType<C>) => ({
                              ...state,
                              ...presetState,
                              ...rowState,
                              ...colState,
                            }))
                    }
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}
