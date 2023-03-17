import React from 'react';

import { CloseButtonIcon } from '../CloseButtonIcon';

export default { title: 'CloseIcon', parameters: { creevey: { skip: [true] } } };

export const Simple = () => {
  return (
    <div>
      123-
      <CloseButtonIcon size={24} side={24} />
      231
      <CloseButtonIcon side={30} />
      231
      <CloseButtonIcon side={16} />
      231
      <CloseButtonIcon side={14} />
    </div>
  );
};
