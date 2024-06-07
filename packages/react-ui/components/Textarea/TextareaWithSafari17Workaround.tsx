import React from 'react';

import { forwardRefAndName } from '../../lib/forwardRefAndName';

/**
 * React textarea behaves incorrectly on first rendered in Safari version 17.*
 * Reproduce: https://codesandbox.io/p/sandbox/textarea-and-textarea-safari-bug-9v95vz
 * was fixed in Safari version 17.4: https://developer.apple.com/documentation/safari-release-notes/safari-17_4-release-notes
 */
export const TextareaWithSafari17Workaround = forwardRefAndName<
  HTMLTextAreaElement,
  React.TextareaHTMLAttributes<HTMLTextAreaElement>
>('TextareaWithSafari17Workaround', (props, ref) => {
  const [firstRender, setFirstRender] = React.useState(true);

  React.useEffect(() => {
    firstRender && setFirstRender(false);
  }, []);

  return <textarea {...props} value={firstRender ? '' : props.value} ref={ref} />;
});
