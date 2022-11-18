import React, { useContext } from 'react';

import { CloseIcon } from '../CloseIcon';
import { ThemeContext } from '../../../lib/theming/ThemeContext';

export default { title: 'CloseIcon', parameters: { creevey: { skip: [true] } } };

export const Simple = () => {
  const theme = useContext(ThemeContext);

  return (
    <div>
      123
      <CloseIcon theme={theme} />
      231
      <CloseIcon theme={theme} side={30} />
      231
      <CloseIcon theme={theme} side={16} />
      231
      <CloseIcon theme={theme} side={14} />
    </div>
  );
};
