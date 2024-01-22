import React from 'react';

import { forwardRefAndName } from '../../lib/forwardRefAndName';

export const TextareaWithSafari17Workaround = forwardRefAndName<
  HTMLTextAreaElement,
  React.TextareaHTMLAttributes<HTMLTextAreaElement>
>('TextareaWithSafari17Workaround', (props, ref) => {
  const [firstRender, setFirstRender] = React.useState(true);

  React.useEffect(() => {
    firstRender && setFirstRender(false);
  });

  return <textarea {...props} value={firstRender ? '' : props.value} ref={ref} />;
});
