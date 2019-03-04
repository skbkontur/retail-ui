import React from 'react';
import Button from '../Button/Button';
import ReactDOM from 'react-dom';
import { Nullable } from '../../typings/utility-types';
import Spinner from '../Spinner';

enum ComponentsTypes {
  Styled,
  Default,
}

export class PerformanceMetrics extends React.Component<
  { styledComponents: React.ReactElement<any>; defaultComponents: React.ReactElement<any> },
  {}
> {
  private panelWrapperStyled = { width: '45%', display: 'inline-block', verticalAlign: 'top' };

  public render() {
    return (
      <div style={{ padding: 10, width: 1200 }}>
        <div style={{position: 'absolute'}}><Spinner type={'mini'} caption={''}/></div>
        <div style={{ padding: 10 }}>
          <div style={{ ...this.panelWrapperStyled }}>
            <PerformanceMetricsPanel type={ComponentsTypes.Styled} component={this.props.styledComponents} />
          </div>
          <div style={{ ...this.panelWrapperStyled }}>
            <PerformanceMetricsPanel type={ComponentsTypes.Default} component={this.props.defaultComponents} />
          </div>
        </div>
      </div>
    );
  }
}

class PerformanceMetricsPanel extends React.Component<
  { type: ComponentsTypes; component: React.ReactNode },
  { mounted: boolean }
> {
  public state = {
    mounted: false,
  };
  private container: Nullable<HTMLElement>;

  public render() {
    return (
      <div>
        <h1 style={{ lineHeight: '2em' }}>
          {this.props.type === ComponentsTypes.Styled ? 'Styled Components:' : 'Default Components:'}
        </h1>
        <div style={{ marginBottom: 10 }}>
          <Button onClick={this.setMountedState}>{this.state.mounted ? 'Unmount' : 'Mount'}</Button>
        </div>
        <div ref={el => (this.container = el)} />
      </div>
    );
  }

  public componentDidMount() {
    if (this.props.component && this.state.mounted) {
      ReactDOM.render(this.props.component, this.container);
    }
  }

  private setMountedState = () => {
    if (this.state.mounted) {
      this.setState(
        {
          mounted: false,
        },
        () => {
          if (this.container) {
            ReactDOM.unmountComponentAtNode(this.container);
          }
        },
      );
    } else {
      this.setState(
        {
          mounted: true,
        },
        () => {
          ReactDOM.render(this.props.component, this.container);
        },
      );
    }
  };
}
