import * as React from 'react';

const enabled = process.env.REACT_APP_REACT_UI_TELEMETRY === 'true';

export function telemetry<C>(
  controlName: string,
  { disabled = !enabled, converterProps }: { disabled?: boolean; converterProps?: (a: any) => {} } = {},
) {
  return <T extends { new (...args: any[]): React.Component }>(constructor: T) => {
    console.log(`${controlName} disabled: `, disabled);
    if (disabled) {
      return constructor;
    }
    const TelemetryDecorator = class extends constructor {
      public render() {
        console.log(controlName);
        console.dir(this.props);
        console.dir(converterProps && converterProps(this.props));
        console.log(' ');
        return super.render();
      }
    };
    Object.defineProperty(TelemetryDecorator, 'name', { value: constructor.name });
    return TelemetryDecorator;
  };
}
