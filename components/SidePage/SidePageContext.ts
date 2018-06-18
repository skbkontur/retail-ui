// FIXME: remove after upgrading ts to 2.9.1
// @ts-ignore Used for generating declarations
import * as React from 'react';
import createReactContext = require('create-react-context');

export interface SidePageContextType {
  requestClose: () => void;
  width: number | string | undefined;
}

export const SidePageContext = createReactContext<SidePageContextType>({
  requestClose: () => {
    /* default */
  },
  width: 0
});
