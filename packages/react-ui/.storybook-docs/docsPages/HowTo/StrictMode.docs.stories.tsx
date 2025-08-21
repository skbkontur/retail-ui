import React from 'react';
import { Button, Hint } from '@skbkontur/react-ui';

import type { Meta, Story } from '../../../typings/stories';

export default {
  title: 'Information/StrictMode',
  parameters: { creevey: { skip: true } },
} as Meta;

export const WithFunctionChildren: Story = () => {
  const CustomFunctionComponent = React.forwardRef<HTMLSpanElement, object>((props, ref) => (
    <span ref={ref}>children text</span>
  ));

  return (
    <div style={{ padding: 80 }}>
      <React.StrictMode>
        <Hint pos="top" text="Something will never be changed" manual opened>
          <CustomFunctionComponent />
        </Hint>
      </React.StrictMode>
    </div>
  );
};

export const WithImperativeHandleChildren: Story = () => {
  const ImperativeHandleComponent = React.forwardRef(function FN(_, ref) {
    const rootNode = React.useRef<HTMLSpanElement>(null);
    React.useImperativeHandle(ref, () => ({
      foo: 'bar',
      getRootNode: () => rootNode.current,
    }));
    return <span ref={rootNode}>children text</span>;
  });

  return (
    <div style={{ padding: 80 }}>
      <React.StrictMode>
        <Hint pos="top" text="Something will never be changed" manual opened>
          <ImperativeHandleComponent />
        </Hint>
      </React.StrictMode>
    </div>
  );
};

export const WithClassChildren: Story = () => {
  class CustomClassComponent extends React.Component {
    rootNode = React.createRef<HTMLSpanElement>();

    render() {
      return <span ref={this.rootNode}>children text</span>;
    }

    getRootNode = () => {
      return this.rootNode.current;
    };
  }

  return (
    <div style={{ padding: 80 }}>
      <React.StrictMode>
        <Hint pos="top" text="Something will never be changed" manual opened>
          <CustomClassComponent />
        </Hint>
      </React.StrictMode>
    </div>
  );
};

export const WithReactUIComponent: Story = () => {
  const ImperativeHandleComponent = React.forwardRef(function (_, ref) {
    const rootNode = React.useRef<Button>(null);
    React.useImperativeHandle(ref, () => ({
      getRootNode: () => rootNode.current?.getRootNode(),
    }));

    return (
      <span style={{ padding: 6, backgroundColor: 'red', display: 'inline-block' }}>
        <Button ref={rootNode}>children text</Button>
      </span>
    );
  });

  return (
    <div style={{ padding: 80 }}>
      <React.StrictMode>
        <Hint pos="top" text="Something will never be changed" manual opened>
          <ImperativeHandleComponent />
        </Hint>
      </React.StrictMode>
    </div>
  );
};
