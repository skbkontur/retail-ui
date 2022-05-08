import React from 'react';

import { SidePage } from '../../../components/SidePage';
import { IgnoreLayerClick } from '../IgnoreLayerClick';
import { Button } from '../../../components/Button';
import { Toggle } from '../../../components/Toggle';
import { IgnoreLayerClickProps } from '..';

type SampleState = {
  open: boolean;
} & Pick<IgnoreLayerClickProps, 'active'>;

class Sample extends React.Component {
  public state: SampleState = {
    active: false,
    open: false,
  };

  public render() {
    return (
      <div>
        {this.state.open && (
          <SidePage onClose={() => this.setState({ open: false })}>
            <SidePage.Header>Голова</SidePage.Header>
            <SidePage.Body>
              <div style={{ padding: 20 }}>Туловище</div>
            </SidePage.Body>
          </SidePage>
        )}
        <IgnoreLayerClick active={this.state.active}>
          <Button onClick={() => this.setState({ open: true })}>Open</Button>
        </IgnoreLayerClick>
        <Toggle
          checked={this.state.active}
          onValueChange={() =>
            this.setState((state: SampleState) => {
              return { active: !state.active };
            })
          }
        />
      </div>
    );
  }
}

export default { title: 'IgnoreLayerClick', parameters: { creevey: { skip: [true] } } };

export const Common = () => <Sample />;
