import React from 'react';

import { forwardRefAndName } from '../../../lib/forwardRefAndName';
import { GappedProps } from '../Gapped';
import { useGapValue } from '../useGapValue';

import { HorizontalItems } from './HorizontalItems';

export type HorizontalGappedProps = Pick<GappedProps, 'wrap' | 'children' | 'verticalAlign' | 'gap'>;

export const HorizontalGapped = forwardRefAndName<HTMLDivElement, HorizontalGappedProps>(
  'HorizontalGapped',
  (props, ref) => {
    const gap = useGapValue(props.gap);

    return (
      <div ref={ref} style={{ paddingTop: props.wrap ? 1 : 0 }}>
        <div
          style={{
            marginTop: props.wrap ? -gap - 1 : 0,
            marginLeft: props.wrap ? -gap : 0,
            whiteSpace: props.wrap ? 'normal' : 'nowrap',
          }}
        >
          <HorizontalItems wrap={props.wrap} verticalAlign={props.verticalAlign} gap={gap}>
            {props.children}
          </HorizontalItems>
        </div>
      </div>
    );
  },
);
