import * as React from 'react';
import { storiesOf } from '@storybook/react';

import Gapped from '../../Gapped';
import Radio from '../Radio';

storiesOf('Radio', module)
  .add('Radio with different states', () => (
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
  ))
  .add('Playground', () => {
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
  })
  .add('Highlighted', () => {
    return (
      <div>
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
  });
