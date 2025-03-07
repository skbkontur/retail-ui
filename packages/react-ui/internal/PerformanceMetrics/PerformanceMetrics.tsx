import React from 'react';
import { createRoot } from 'react-dom/client';

import { Button } from '../../components/Button';
import { Nullable } from '../../typings/utility-types';
import { Spinner } from '../../components/Spinner';

const PANEL_WRAPPER_STYLES = { width: '45%', display: 'inline-block', verticalAlign: 'top' };

interface PerformanceMetricsProps {
  componentsA: React.ReactElement<any>;
  componentsB: React.ReactElement<any>;
}

export function PerformanceMetrics(props: PerformanceMetricsProps) {
  return (
    <div style={{ padding: 10, width: 1200 }}>
      <div style={{ position: 'absolute' }}>
        <Spinner type={'mini'} caption={''} />
      </div>
      <div style={{ padding: 10 }}>
        <div style={PANEL_WRAPPER_STYLES}>
          <PerformanceMetricsPanel title={'Case A'} component={props.componentsA} />
        </div>
        <div style={PANEL_WRAPPER_STYLES}>
          <PerformanceMetricsPanel title={'Case B'} component={props.componentsB} />
        </div>
      </div>
    </div>
  );
}

interface PerformanceMetricsPanelProps {
  title: string;
  component: React.ReactElement<any>;
}
interface PerformanceMetricsPanelState {
  mounted: boolean;
}

class PerformanceMetricsPanel extends React.Component<PerformanceMetricsPanelProps, PerformanceMetricsPanelState> {
  public state: PerformanceMetricsPanelState = {
    mounted: false,
  };
  private container: Nullable<HTMLElement>;

  public render() {
    return (
      <div>
        <h1 style={{ lineHeight: '2em' }}>{this.props.title}</h1>
        <div style={{ marginBottom: 10 }}>
          <Button onClick={this.toggleMountedState} size={'small'}>
            {this.state.mounted ? 'Unmount' : 'Mount'}
          </Button>
        </div>
        <div ref={this.setContainerRef} />
      </div>
    );
  }

  public componentDidMount() {
    if (this.state.mounted && this.container) {
      const root = createRoot(this.container);
      root.render(this.props.component);
    }
  }

  public componentDidUpdate(): void {
    if (!this.container) {
      return;
    }
    if (this.state.mounted) {
      const root = createRoot(this.container);
      root.render(this.props.component);
    } else {
      const root = createRoot(this.container);
      root.unmount();
    }
  }

  private setContainerRef = (element: Nullable<HTMLElement>) => {
    this.container = element;
  };

  private toggleMountedState = () => {
    this.setState({
      mounted: !this.state.mounted,
    });
  };
}
