import React from 'react';

import { CloseIcon } from '../CloseIcon';

export default { title: 'CloseIcon', parameters: { creevey: { skip: [true] } } };

export const Simple = () => {
  return (
    <div>
      123-
      <CloseIcon size={24} side={24} />
      231
      <CloseIcon side={30} />
      231
      <CloseIcon side={16} />
      231
      <CloseIcon side={14} />
    </div>
  );
};
