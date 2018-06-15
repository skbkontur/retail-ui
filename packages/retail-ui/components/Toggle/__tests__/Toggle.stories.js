
import React, { Component } from 'react';
import { storiesOf } from '@storybook/react';
import Toggle from '../Toggle';
import Gapped from '../../Gapped/Gapped';
import Button from '../../Button/Button';
import Checkbox from '../../Checkbox/Checkbox';

class Playground extends Component<*, *> {
  constructor(props) {
    super(props);
    this.state = {
      checked: false,
      loadingActive: false,
      loading: false
    };
  }

  toggle(checked) {
    this.setState({
      checked,
      loading: this.state.loadingActive
    });
  }

  activeLoading() {
    this.setState({ loadingActive: !this.state.loadingActive });
  }

  stopLoading() {
    this.setState({
      loading: false
    });
  }

  render() {
    return (
      <div>
        <div>
          <Gapped gap={10}>
            <Gapped vertical gap={10}>
              <div>
                <Toggle
                  checked={this.state.checked}
                  onChange={this.toggle.bind(this)}
                  loading={this.state.loading}
                />{' '}
                {this.state.checked ? 'On' : 'Off'}
              </div>
              <div>
                <Toggle checked={false} disabled />
                {' Off disabled'}
              </div>
              <div>
                <Toggle checked={true} disabled />
                {' On disabled'}
              </div>
            </Gapped>

            <Gapped vertical gap={10}>
              <div>
                <Toggle
                  checked={this.state.checked}
                  onChange={this.toggle.bind(this)}
                  warning
                  loading={this.state.loading}
                />{' '}
                {this.state.checked ? 'On' : 'Off'}
              </div>
              <div>
                <Toggle checked={false} disabled warning />
                {' Off disabled'}
              </div>
              <div>
                <Toggle checked={true} disabled warning />
                {' On disabled'}
              </div>
            </Gapped>

            <Gapped vertical gap={10}>
              <div>
                <Toggle
                  checked={this.state.checked}
                  onChange={this.toggle.bind(this)}
                  error
                  loading={this.state.loading}
                />{' '}
                {this.state.checked ? 'On' : 'Off'}
              </div>
              <div>
                <Toggle checked={false} disabled error />
                {' Off disabled'}
              </div>
              <div>
                <Toggle checked={true} disabled error />
                {' On disabled'}
              </div>
            </Gapped>
          </Gapped>
        </div>
        <div style={{ marginTop: '15px' }}>
          <Gapped gap={10}>
            <Checkbox
              onChange={this.activeLoading.bind(this)}
              checked={this.state.loadingActive}
            >
              Loading
            </Checkbox>
            {this.state.loading && (
              <Button onClick={this.stopLoading.bind(this)}>
                Stop loading
              </Button>
            )}
          </Gapped>
        </div>
      </div>
    );
  }
}

class Simple extends React.Component<*, *> {
  state = {
    checked: true
  };

  render() {
    return (
      <div>
        <Toggle
          checked={this.state.checked}
          onChange={() => this.setState(state => ({ checked: !state.checked }))}
        />{' '}
        {this.state.checked ? 'On' : 'Off'}
      </div>
    );
  }
}

storiesOf('Toggle', module)
  .add('plain', () => <Simple />)
  .add('playground', () => <Playground />);
