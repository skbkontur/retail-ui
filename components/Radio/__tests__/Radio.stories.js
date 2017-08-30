// @flow
import * as React from 'react';
import { storiesOf } from '@storybook/react';

import Gapped from '../../Gapped';
import Radio from '../Radio';

storiesOf('Radio', module)
  .add('Radio with different states', () =>
    <div style={{ margin: '5px' }}>
      <Gapped gap={20}>
        <Radio />
        <Radio disabled />
        <Radio disabled checked />
        <Radio checked />
        <Radio focused />
        <Radio focused checked />
        <Radio error />
        <Radio warning />
      </Gapped>
    </div>
  )
  .add('Playground', () => {
    class Comp extends React.Component<{}, *> {
      state = {
        hovered: false,
        checked: false,
        active: false
      };

      handleClick() {
        this.setState({ checked: !this.state.checked });
      }

      render() {
        return (
          <div>
            <div onClick={this.handleClick.bind(this)}>
              <span style={{ display: 'inline-block', verticalAlign: 'sub' }}>
                <Radio {...this.state} />
              </span>
            </div>
          </div>
        );
      }
    }

    return <Comp />;
  });
