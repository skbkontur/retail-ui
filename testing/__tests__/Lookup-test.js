/* eslint-disable react/no-multi-comp */
import * as Lookup from '../Lookup';

import React from 'react';
import ReactDOM from 'react-dom';

// Not supporting React 16
xdescribe('Lookup', () => {
  const container = document.createElement('div');
  const mount = element => {
    ReactDOM.render(element, container);
  };

  afterEach(() => {
    ReactDOM.unmountComponentAtNode(container);
  });

  it('finds dom node', () => {
    let byRef;
    mount(<div ref={el => (byRef = el)} tid="foo" />);

    const found = Lookup.findAll('foo');

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
    mount(<Comp ref={c => (byRef = c)} tid="foo" />);

    const found = Lookup.findAll('foo');

    expect(found.length).toBe(1);
    expect(byRef).toBeTruthy();
    expect(found[0].node).toBe(ReactDOM.findDOMNode(byRef));
  });

  it('finds stateless component', () => {
    let byRef;
    const Comp = () => <div ref={el => (byRef = el)} />;

    mount(<Comp tid="foo" />);

    const found = Lookup.findAll('foo');

    expect(found.length).toBe(1);
    expect(byRef).toBeTruthy();
    expect(found[0].node).toBe(byRef);
  });

  it('finds via multilevel query', () => {
    let byRef;
    mount(
      <div>
        <div tid="container">
          <div data-a="1" ref={el => (byRef = el)} tid="foo" />
          <div data-a="2" tid="foo" />
        </div>
        <div data-a="3" tid="foo" />
      </div>
    );

    const found = Lookup.findAll('container foo');

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

    const foundTree = Lookup.findOne('tree');
    const foundBars = Lookup.findAll('bar', foundTree);

    expect(foundBars.length).toBe(2);
  });

  it('throws if subtree is unmounted', () => {
    mount(<div tid="foo" />);

    const found = Lookup.findOne('foo');
    ReactDOM.unmountComponentAtNode(container);

    expect(() => Lookup.findAll('a', found)).toThrow();
  });

  it('calls adapter functions', () => {
    const getValue = jest.fn(() => 'bar');
    class Comp extends React.Component {
      static __ADAPTER__ = {
        getValue
      };

      render() {
        return null;
      }
    }

    let comp;
    mount(<Comp ref={c => (comp = c)} tid="foo" />);

    const foundComp = Lookup.findOne('foo');

    const result = Lookup.getAdapter(foundComp).getValue('baz');

    expect(result).toBe('bar');
    expect(getValue.mock.calls[0][0]).toBe(comp);
    expect(getValue.mock.calls[0][1]).toBe('baz');
  });
});
