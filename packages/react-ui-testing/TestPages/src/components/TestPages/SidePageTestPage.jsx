import React from 'react';
import { Button } from '@skbkontur/react-ui/components/Button';
import { SidePage } from '@skbkontur/react-ui/components/SidePage';

import { Case, CaseSuite } from '../Case';

export default class SidePageTestPage extends React.Component {
  state = {
    showStateless: false,
    showStatefull: false,
  };

  open = name => this.setState({ [name]: true });
  close = name => this.setState({ [name]: false });

  render = () => (
    <CaseSuite title="Сайдпейджи">
      <Case title="Сайдпейдж на stateless компоненте, принимающий свойство show">
        <Case.Body>
          <Button data-tid="OpenStateless" onClick={() => this.open('showStateless')}>
            Открыть
          </Button>
          <StatelessSidePage
            data-tid="StatelessSidePage"
            show={this.state.showStateless}
            onClose={() => this.close('showStateless')}
          />
        </Case.Body>
      </Case>
      <Case title="Сайдпейдж на statefull компоненте, принимающий свойство show">
        <Case.Body>
          <Button data-tid="OpenStatefull" onClick={() => this.open('showStatefull')}>
            Открыть
          </Button>
          <StatefullSidePage
            data-tid="StatefullSidePage"
            show={this.state.showStatefull}
            onClose={() => this.close('showStatefull')}
          />
        </Case.Body>
      </Case>
    </CaseSuite>
  );
}

function StatelessSidePage({ show, onClose }) {
  return show ? (
    <SidePage onClose={onClose}>
      <SidePage.Header>
        <span data-tid="Header">Header</span>
      </SidePage.Header>
      <SidePage.Body>
        <div data-tid="Content">Modal content</div>
      </SidePage.Body>
      <SidePage.Footer>
        <span data-tid="Footer">Footer</span>
      </SidePage.Footer>
    </SidePage>
  ) : (
    <span />
  );
}

class StatefullSidePage extends React.Component {
  render() {
    const { show, onClose } = this.props;
    return show ? (
      <SidePage onClose={onClose}>
        <SidePage.Header>
          <span data-tid="Header">Header</span>
        </SidePage.Header>
        <SidePage.Body>
          <div data-tid="Content">Modal content</div>
        </SidePage.Body>
        <SidePage.Footer>
          <span data-tid="Footer">Footer</span>
        </SidePage.Footer>
      </SidePage>
    ) : (
      <span />
    );
  }
}
