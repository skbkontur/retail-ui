import React from 'react';

import { FOCUS_ALLOW } from './constants.js';
import { inlineProp } from './util.js';

const FreeFocusInside = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <div {...inlineProp(FOCUS_ALLOW, true)} className={className}>
    {children}
  </div>
);

export default FreeFocusInside;
