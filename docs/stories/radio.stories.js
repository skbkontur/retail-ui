// @flow
import React from 'react';
import {storiesOf} from '@kadira/storybook';

import Gapped from '../../components/Gapped';
import Radio from '../../components/Radio';

storiesOf('Radio', module).
  add('Radio with different states', () => (
    <div style={{margin: '5px'}}>
      <Gapped gap={20}>
        <Radio />
        <Radio disabled />
        <Radio disabled checked />
        <Radio checked />
        <Radio focused />
        <Radio focused />
        <Radio focused checked />
      </Gapped>
    </div>
  )).
  add('Playground', () => {
    class Comp extends React.Component {
      state = {
        hovered: false,
        checked: false,
        active: false,
      }

      handleClick() {
        this.setState({checked: !this.state.checked});
      }

      render() {
        return (
          <div>
            <div onClick={this.handleClick.bind(this)} >
              <span style={{display: 'inline-block', verticalAlign: 'sub'}}>
                <Radio {...this.state} />
              </span>
            </div>
          </div>
        );
      }
    }

    return <Comp />;
  });
