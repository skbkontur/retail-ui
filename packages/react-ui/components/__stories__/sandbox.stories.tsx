import React, { useEffect, useRef, useState } from 'react';

import { Meta } from '../../typings/stories';
import { Tooltip } from '../Tooltip';
import { Hint } from '../Hint';
import { Gapped } from '../Gapped';
import { StylesContainer } from '../../lib/widgets';

export default {
  title: 'Sandbox',
} as Meta;

export const Default = () => {
  const root = useRef<HTMLDivElement>(null);
  const [_, forceUpdate] = useState<number>();

  useEffect(() => forceUpdate(Date.now), [root.current]);

  return (
    <div style={{ position: 'relative', overflow: 'hidden' }}>
      <div ref={root} />
      {root.current && (
        <StylesContainer root={root.current}>
          <div style={{ padding: '100px 0' }}>
            <Gapped vertical gap={60}>
              <Tooltip pos="right middle" trigger="opened" render={() => <div>Tooltip</div>}>
                <div>Tooltip</div>
              </Tooltip>
              <Hint pos="right middle" manual opened text="Hint">
                <div>Hint</div>
              </Hint>
            </Gapped>
          </div>
        </StylesContainer>
      )}
    </div>
  );
};
