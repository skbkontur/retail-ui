import * as React from 'react';
import createReactContext = require('create-react-context');

export const SidePageContext = createReactContext<() => void>(() => null);
