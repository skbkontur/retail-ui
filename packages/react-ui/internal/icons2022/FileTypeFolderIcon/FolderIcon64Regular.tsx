import React from 'react';

import { forwardRefAndName } from '../../../lib/forwardRefAndName';
import type { IconProps } from '../BaseIcon';
import { BaseIcon } from '../BaseIcon';

export const FolderIcon64Regular = forwardRefAndName<SVGSVGElement, IconProps>('FolderIcon64Regular', (props, ref) => {
  return (
    <BaseIcon ref={ref} viewBoxSize={64} {...props}>
      <path d="M15.5 25C14.6716 25 14 25.6716 14 26.5C14 27.3284 14.6716 28 15.5 28H48.5C49.3284 28 50 27.3284 50 26.5C50 25.6716 49.3284 25 48.5 25H15.5Z" />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12.5 8C8.91015 8 6 10.9101 6 14.5V46.5C6 51.7467 10.2533 56 15.5 56H48.5C53.7467 56 58 51.7467 58 46.5V24.5C58 19.2533 53.7467 15 48.5 15H32.7722C32.2707 15 31.8023 14.7493 31.5241 14.332L29.2324 10.8944C28.0269 9.08616 25.9974 8 23.8241 8H12.5ZM9 14.5C9 12.567 10.567 11 12.5 11H23.8241C24.9943 11 26.0871 11.5849 26.7363 12.5585L29.028 15.9961C29.8626 17.248 31.2676 18 32.7722 18H48.5C52.0899 18 55 20.9101 55 24.5V46.5C55 50.0899 52.0899 53 48.5 53H15.5C11.9101 53 9 50.0899 9 46.5V14.5Z"
      />
    </BaseIcon>
  );
});
