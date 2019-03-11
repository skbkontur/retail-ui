import * as React from 'react';
import createReactContext = require('create-react-context');
import { SidePageFooter } from './SidePageFooter';

export interface SidePageContextType {
  requestClose: () => void;
  width: number | string;
  updateLayout: () => void;
  footerRef: (ref: SidePageFooter | null) => void;
}

export const SidePageContext = createReactContext<SidePageContextType>({
  requestClose: () => undefined,
  width: 'auto',
  updateLayout: () => undefined,
  footerRef: () => undefined,
});

export const withContext = <P extends {}>(
  BaseComponent: React.ComponentType<P & { context?: SidePageContextType }>,
) => (props: P) => (
  <SidePageContext.Consumer>
    {(context: SidePageContextType) => <BaseComponent {...props} context={context} />}
  </SidePageContext.Consumer>
);
