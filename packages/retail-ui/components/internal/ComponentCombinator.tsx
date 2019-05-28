import * as React from 'react';
import { ComponentTable, StatePropsCombinations, StateType, Defaultize } from './ComponentTable';

export interface ComponentCombinatorProps<C, P, S> {
  combinations: StatePropsCombinations<P, S>;
  colsPerPage: number;
  rowsPerPage: number;
  Component: C;
  presetProps: C extends { defaultProps: infer D } ? Defaultize<P, D> : P;
  presetState: Partial<S>;
}

export class ComponentCombinator<
  T extends React.Component<any, any, any>,
  C extends React.ComponentType<any>,
  P extends React.ComponentProps<C>
> extends React.Component<
  ComponentCombinatorProps<C extends React.ComponentClass<P, any> ? React.ClassType<P, T, C> : C, P, StateType<C>>,
  { page: number }
> {
  public static defaultProps = {
    props: [],
    states: [],
    colsPerPage: 0,
    rowsPerPage: 0,
    presetProps: {},
    presetState: {},
  };

  public state = {
    page: 0,
  };

  public render() {
    const { page } = this.state;
    const { combinations, colsPerPage, rowsPerPage, Component, presetProps, presetState } = this.props;
    const pages = [];

    for (let row = 0; row < combinations.length; row += rowsPerPage) {
      for (let col = 0; col < combinations.length; col += colsPerPage) {
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
              key={page}
              Component={Component}
              presetProps={presetProps}
              presetState={presetState}
              rows={combinations.slice(pageOffsets.offsetY, pageOffsets.offsetY + rowsPerPage)}
              cols={combinations.slice(pageOffsets.offsetX, pageOffsets.offsetX + colsPerPage)}
            />
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
