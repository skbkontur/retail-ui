import React from 'react';

import { cx } from '../../../lib/theming/Emotion';

import { ButtonRoot, ButtonRootType } from './ButtonRoot';

export const ButtonRoot2: ButtonRootType = (props) => {
  const className = cx(props.className, 'test-classname');

  return <ButtonRoot {...props} className={className} as={'label'} />;
};
