import React from 'react';
import { Meta, Story } from '../../../typings/stories';

import { SidePage, Button } from '@skbkontur/react-ui';

export default {
  title: 'Overlay/SidePage',
  component: SidePage,
  parameters: { creevey: { skip: true } },
} as Meta;

export const Example1: Story = () => {

  const [opened, setOpened] = React.useState(false);

  function renderSidePage() {
    return (
      <SidePage onClose={close} blockBackground>
        <SidePage.Header>Title</SidePage.Header>
        <SidePage.Body>
          <div
            style={{
              background: `repeating-linear-gradient(
                                  60deg,
                                  #808080,
                                  #808080 20px,
                                  #d3d3d3 20px,
                                  #d3d3d3 40px
                                )`,
              height: 600,
              padding: '20px 0',
            }}
          >
            <SidePage.Container>
              <p>Use rxjs operators with react hooks</p>
            </SidePage.Container>
          </div>
        </SidePage.Body>
        <SidePage.Footer panel>
          <Button onClick={close}>Close</Button>
        </SidePage.Footer>
      </SidePage>
    );
  }

  function open() {
    setOpened(true);
  }

  function close() {
    setOpened(false);
  }

  return (
    <div>
      {opened && renderSidePage()}
      <Button onClick={open}>Open</Button>
    </div>
  );

};
Example1.storyName = 'Базовый пример';

