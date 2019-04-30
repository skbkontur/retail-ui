import * as React from 'react';
import { ComponentTable, StatePropsCombinations, StateType } from './ComponentTable';

// NOTE: Copy-paste from @types/react
export type Defaultize<P, D> = P extends any
  ? string extends keyof P
    ? P
    : Pick<P, Exclude<keyof P, keyof D>> &
        Partial<Pick<P, Extract<keyof P, keyof D>>> &
        Partial<Pick<D, Exclude<keyof D, keyof P>>>
  : never;

export interface ComponentCombinatorProps<
  T extends React.Component<any, any, any>,
  C extends React.FunctionComponent<any> | React.ComponentClass<any, any>,
  P extends React.ComponentProps<C>,
  S,
  DP
> {
  combinations: StatePropsCombinations<P, S>;
  sizeX: number;
  sizeY: number;
  Component: C extends React.ComponentClass<P, S> ? React.ClassType<P, T, C> : C;
  presetProps: DP;
  presetState: Partial<S>;
  children?: React.ReactNode;
}

export class ComponentCombinator<
  T extends React.Component<any, any, any>,
  C extends React.FunctionComponent<any> | React.ComponentClass<any, any>,
  P extends React.ComponentProps<C>
> extends React.Component<
  ComponentCombinatorProps<T, C, P, StateType<C, P>, C extends { defaultProps: infer D } ? Defaultize<P, D> : P>,
  { page: number }
> {
  public static defaultProps = {
    props: [],
    states: [],
    sizeX: 0,
    sizeY: 0,
    presetProps: {},
    presetState: {},
  };

  public state = {
    page: 0,
  };

  public render() {
    const { page } = this.state;
    const { combinations, sizeX, sizeY, Component, presetProps, presetState, children } = this.props;
    const cols = combinations.slice();
    const rows = combinations.slice();
    const pages = [];

    for (let row = 0; row < rows.length; row += sizeY) {
      for (let col = 0; col < cols.length; col += sizeX) {
        pages.push({
          offsetX: col,
          offsetY: row,
        });
      }
    }
    const pageOffsets = pages[page];
    return (
      <div>
        <div id="paginator">
          <button disabled={page === 0} id="prev-page" onClick={this.prevPage}>
            Prev
          </button>{' '}
          <small>{`${page + 1} / ${pages.length}`}</small>{' '}
          <button disabled={page + 1 >= pages.length} id="next-page" onClick={this.nextPage}>
            Next
          </button>
        </div>
        <div>
          {pageOffsets && (
            <ComponentTable
              Component={Component}
              presetProps={presetProps}
              presetState={presetState}
              rows={rows.slice(pageOffsets.offsetY, pageOffsets.offsetY + sizeY)}
              cols={cols.slice(pageOffsets.offsetX, pageOffsets.offsetX + sizeX)}
            >
              {children}
            </ComponentTable>
          )}
        </div>
      </div>
    );
  }

  private prevPage = () => {
    this.setState(({ page }) => ({
      page: page - 1,
    }));
  };

  private nextPage = () => {
    this.setState(({ page }) => ({
      page: page + 1,
    }));
  };
}
