import React from 'react';
import Toggle from '../Toggle/Toggle';

enum ComponentsTypes {
  Styled,
  Default,
}

export class PerformanceMetrics extends React.Component<
  { styledComponents: React.ReactNode; defaultComponents: React.ReactNode },
  { componentsType: ComponentsTypes }
> {
  public state = {
    componentsType: ComponentsTypes.Styled,
  };

  public render() {
    return (
      <div style={{ padding: 10 }}>
        <div>
          <Toggle
            changeEventHandler={this.handleToggleChange}
            checked={this.state.componentsType === ComponentsTypes.Styled}
          />
          {'Toggle inputs'}
        </div>
        <h1 style={{ lineHeight: '2em' }}>
          {this.state.componentsType === ComponentsTypes.Styled ? 'Styled Components:' : 'Default Components:'}
        </h1>
        <div style={{ width: 1000, padding: 10 }}>
          {this.state.componentsType === ComponentsTypes.Styled
            ? this.props.styledComponents
            : this.props.defaultComponents}
        </div>
      </div>
    );
  }

  private handleToggleChange = () => {
    this.setState(state => {
      return {
        componentsType:
          state.componentsType === ComponentsTypes.Styled ? ComponentsTypes.Default : ComponentsTypes.Styled,
      };
    });
  };
}
