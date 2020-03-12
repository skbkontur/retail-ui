import React from 'react';

import { Gapped } from '../../Gapped';
import { Radio } from '../Radio';

export default { title: 'Radio' };

export const RadioWithDifferentStates = () => (
  <div style={{ margin: '5px' }}>
    <Gapped gap={20}>
      <Radio value="value" />
      <Radio disabled value="value" />
      <Radio disabled checked value="value" />
      <Radio checked value="value" />
      <Radio focused value="value" />
      <Radio focused checked value="value" />
      <Radio error value="value" />
      <Radio warning value="value" />
    </Gapped>
  </div>
);
RadioWithDifferentStates.story = { name: 'Radio with different states' };

export const Playground = () => {
  class Comp extends React.Component<{}, any> {
    public state = {
      hovered: false,
      checked: false,
      active: false,
      value: 'value',
    };

    public render() {
      return (
        <div>
          <div onClick={this.handleClick}>
            <span style={{ display: 'inline-block', verticalAlign: 'sub' }}>
              <Radio {...this.state} />
            </span>
          </div>
        </div>
      );
    }

    private handleClick = () => {
      this.setState({ checked: !this.state.checked });
    };
  }

  return <Comp />;
};

export const Highlighted = () => {
  return (
    <div style={{ marginBottom: '70px' }}>
      <div>
        <Radio value={'value'} checked />
      </div>
      <div>
        <Radio value={'value'} checked warning />
      </div>
      <div>
        <Radio value={'value'} checked error />
      </div>
    </div>
  );
};
