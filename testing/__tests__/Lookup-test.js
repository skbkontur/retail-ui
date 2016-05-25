import * as Lookup from '../Lookup';

import React from 'react';
import ReactDOM from 'react-dom';

describe('Lookup', () => {
  const container = document.createElement('div');
  const mount = element => {
    ReactDOM.render(element, container);
  };

  afterEach(() => {
    ReactDOM.unmountComponentAtNode(container);
  });

  it('finds dom node', () => {
    let byRef;
    mount(<div ref={el => byRef = el} tid="foo" />);

    const found = Lookup.find('foo');

    expect(found.length).toBe(1);
    expect(byRef).toBeTruthy();
    expect(found[0].node).toBe(byRef);
  });

  it('finds statefull component', () => {
    class Comp extends React.Component {
      render() {
        return <div />;
      }
    }

    let byRef;
    mount(<Comp ref={c => byRef = c} tid="foo" />);

    const found = Lookup.find('foo');

    expect(found.length).toBe(1);
    expect(byRef).toBeTruthy();
    expect(found[0].instance).toBe(byRef);
  });

  it('finds stateless component', () => {
    let byRef;
    const Comp = () => (<div ref={el => byRef = el} />);

    mount(<Comp tid="foo" />);

    const found = Lookup.find('foo');

    expect(found.length).toBe(1);
    expect(byRef).toBeTruthy();
    expect(found[0].node).toBe(byRef);
  });

  it('finds via multilevel query', () => {
    let byRef;
    mount(
      <div>
        <div tid="container">
          <div data-a="1" ref={el => byRef = el} tid="foo" />
          <div data-a="2" tid="foo" />
        </div>
        <div data-a="3" tid="foo" />
      </div>
    );

    const found = Lookup.find('container foo');

    expect(found.length).toBe(2);
    expect(byRef).toBeTruthy();
    expect(found[0].node).toBe(byRef);
  });

  it('finds in subtree', () => {
    mount(
      <div>
        <div tid="tree">
          <div tid="bar" />
          <div tid="bar" />
        </div>
        <div tid="bar" />
      </div>
    );

    const [foundTree] = Lookup.find('tree');
    const foundBars = Lookup.find('bar', foundTree);

    expect(foundBars.length).toBe(2);
  });

  it('calls adapter functions', () => {
    const getValue = jest.fn(() => 'bar');
    class Comp extends React.Component {
      static __ADAPTER__ = {
        getValue,
      };

      render() { return null; }
    }

    let comp;
    mount(<Comp ref={c => comp = c} tid="foo" />);

    const [foundComp] = Lookup.find('foo');

    const result = foundComp.call2('getValue', ['baz']);

    expect(result).toBe('bar');
    expect(getValue.mock.calls[0][0]).toBe(comp);
    expect(getValue.mock.calls[0][1]).toBe('baz');
  });
});
