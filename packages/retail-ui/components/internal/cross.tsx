import * as React from 'react';
import ExecutionEnvironment from 'exenv';

// Windows XP fonts don't include the cross character used for the close button.
// So we use another one on XP only, because it looks ugly on modern systems.
const WIN_XP = ExecutionEnvironment.canUseDOM && navigator.userAgent.includes('Windows NT 5.');
const CROSS = WIN_XP ? '╳' : '✕';

export const SVGCross = (props: React.SVGAttributes<SVGElement>) => (
  <svg {...props} viewBox="0 0 10 10">
    <polygon points="6 5 10 9 9 10 5 6 1 10 0 9 4 5 0 1 1 0 5 4 9 0 10 1" />
  </svg>
);

export default CROSS;
