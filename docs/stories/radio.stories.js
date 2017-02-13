// @flow
import React from 'react';
import {storiesOf} from '@kadira/storybook';

import Gapped from '../../components/Gapped';
import Radio from '../../components/Radio';

storiesOf('Radio button', module).
  add('Radio with different states', () => (
    <Gapped>
      <Radio />
      <Radio disabled />
      <Radio disabled checked />
      <Radio checked />
      <Radio focused />
      <Radio focused checked />
    </Gapped>
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
              <span style={{display: 'inline-block'}}>
                Radio button
              </span>
            </div>
            <br />
            <Radio disabled />
          </div>
        );
      }
    }

    return <Comp />;
  });
