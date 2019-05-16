import React, { Component } from 'react';
import Gapped from '../../Gapped';
import Toggle from '../../Toggle';

export class TogglePlayground extends Component<{}, any> {
  public state = {
    checked: false,
    loadingActive: false,
    loading: false,
  };

  public render() {
    return (
      <div>
        <div>
          <Gapped gap={20}>
            <Gapped vertical gap={20}>
              <div>
                <Toggle checked={this.state.checked} onChange={this.handleToggle} loading={this.state.loading} />{' '}
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

            <Gapped vertical gap={20}>
              <div>
                <Toggle
                  checked={this.state.checked}
                  onChange={this.handleToggle}
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

            <Gapped vertical gap={20}>
              <div>
                <Toggle checked={this.state.checked} onChange={this.handleToggle} error loading={this.state.loading} />{' '}
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
      </div>
    );
  }

  private handleToggle = (checked: boolean) => {
    this.setState({
      checked,
      loading: this.state.loadingActive,
    });
  };
}
