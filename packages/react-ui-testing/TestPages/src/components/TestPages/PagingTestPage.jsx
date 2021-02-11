import React from 'react';
import { Paging } from '@skbkontur/react-ui/components/Paging';

import { Case, CaseSuite } from '../Case';

export default class PagingTestPage extends React.Component {
  state = {
    paging1: 1,
    paging7: 1,
    paging8: 1,
    paging20: 1,
  };

  render(): React.Element<*> {
    return (
      <CaseSuite title="Paging">
        <Case title="Paging1">
          <Case.Body>
            <Paging
              data-tid="Paging1"
              activePage={this.state.paging1}
              pagesCount={1}
              onPageChange={x => this.setState({ paging1: x })}
            />
          </Case.Body>
        </Case>
        <Case title="Paging7">
          <Case.Body>
            <Paging
              data-tid="Paging7"
              activePage={this.state.paging7}
              pagesCount={7}
              onPageChange={x => this.setState({ paging7: x })}
            />
          </Case.Body>
        </Case>
        <Case title="Paging8">
          <Case.Body>
            <Paging
              data-tid="Paging8"
              activePage={this.state.paging8}
              pagesCount={8}
              onPageChange={x => this.setState({ paging8: x })}
            />
          </Case.Body>
        </Case>
        <Case title="Paging20">
          <Case.Body>
            <Paging
              data-tid="Paging20"
              activePage={this.state.paging20}
              pagesCount={20}
              onPageChange={x => this.setState({ paging20: x })}
            />
          </Case.Body>
        </Case>
      </CaseSuite>
    );
  }
}
