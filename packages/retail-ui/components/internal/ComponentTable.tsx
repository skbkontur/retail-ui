import * as React from 'react';
import { isFunctionalComponent } from 'retail-ui/lib/utils';

// TODO We should output state too
const renderPropsDesc = <P extends {}>(props: P): React.ReactNode => {
  return Object.keys(props)
    .map(key => {
      // @ts-ignore
      const value = props[key];
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

export type StatePropsCombinations<P, S> = Array<{ props?: Partial<P>; state?: Partial<S> }>;

export type StateType<C, P> = C extends React.Component<P, infer S> | React.ComponentClass<P, infer S> ? S : never;

export interface ComponentTableProps<
  T extends React.Component<any, any, any>,
  C extends React.FunctionComponent<any> | React.ComponentClass<any, any>,
  P extends React.ComponentProps<C>,
  S
> {
  rows?: StatePropsCombinations<P, S>;
  cols?: StatePropsCombinations<P, S>;
  presetProps: P;
  presetState: Partial<S>;
  Component: C extends React.ComponentClass<P, S> ? React.ClassType<P, T, C> : C;
  children?: React.ReactNode;
}

// Known limitation: Don't work when component have `propTypes` static field
export class ComponentTable<
  T extends React.Component<any, any, any>,
  C extends React.FunctionComponent<any> | React.ComponentClass<any, any>,
  P extends React.ComponentProps<C>
> extends React.Component<ComponentTableProps<T, C, P, StateType<C, P>>> {
  public static defaultProps = {
    presetProps: {},
    presetState: {},
  };

  public render() {
    const { rows = [], cols = [], presetProps, presetState, Component, children } = this.props;
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
                  {/* Defaultized props incompatible with JSX.LibraryManagedAttributes so just ignore it
                  // @ts-ignore */}
                  <Component
                    {...presetProps}
                    {...rowProps}
                    {...colProps}
                    ref={
                      isFunctionalComponent(Component)
                        ? undefined
                        : (el: React.Component<P, StateType<C, P>>) =>
                            el &&
                            el.setState((state: StateType<C, P>) => ({
                              ...state,
                              ...presetState,
                              ...rowState,
                              ...colState,
                            }))
                    }
                  >
                    {children}
                  </Component>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}
