import React from 'react';
import { findDOMNode } from 'react-dom';
import { render } from '@testing-library/react';

import { Nullable } from '../../../typings/utility-types';
import { callChildRef } from '../../../lib/callChildRef/callChildRef';
import { getRootNode } from '../getRootNode';
import { InstanceWithRootNode } from '../rootNodeDecorator';

const getInstance = (element: React.ReactElement, { noRender = false } = {}): React.ReactInstance | null => {
  let ref: React.Component | Element | null = null;
  const refCallback = (instance: React.ReactInstance) => {
    const originalRef = (element as React.RefAttributes<any>).ref;
    if (originalRef) {
      callChildRef(originalRef, instance);
    }
    ref = instance;
  };

  if (!noRender) {
    render(React.cloneElement(element, { ref: refCallback }));
  }

  return ref;
};

describe('getRootNode', () => {
  describe('returns', () => {
    it('null for null instance', () => {
      expect(getRootNode(null)).toBeNull();
    });

    it('null for undefined instance', () => {
      expect(getRootNode(undefined)).toBeNull();
    });

    it('null for Object instance', () => {
      expect(getRootNode(Object.create(null))).toBeNull();
    });

    it('null for Text instance', () => {
      // @ts-ignore
      expect(getRootNode(document.createTextNode('text'))).toBeNull();
    });

    it('null for Comment instance', () => {
      // @ts-ignore
      expect(getRootNode(document.createComment('comment'))).toBeNull();
    });

    it('null for intrinsic element that has not been mounted', () => {
      const rootRef = React.createRef<HTMLDivElement>();
      const instance = getInstance(<div ref={rootRef} />, { noRender: true });
      expect(rootRef.current).toBeNull();
      expect(getRootNode(instance)).toBeNull();
    });

    it('null for functional component with forwardRef that has not been mounted', () => {
      const rootRef = React.createRef<HTMLDivElement>();
      const FC = React.forwardRef<HTMLDivElement>(function FC(_, ref) {
        return <div ref={ref} />;
      });
      const instance = getInstance(<FC />, { noRender: true });
      expect(rootRef.current).toBeNull();
      expect(getRootNode(instance)).toBeNull();
    });

    it('null for class component with rootNode that has not been mounted', () => {
      let rootNode: Nullable<HTMLDivElement> = null;
      class ClassComponentWithRootNode extends React.Component implements InstanceWithRootNode {
        rootNode: Nullable<HTMLDivElement>;
        rootRef = (instance: HTMLDivElement | null) => {
          this.rootNode = instance;
          rootNode = instance;
        };
        getRootNode = () => this.rootNode;
        render = () => <div ref={this.rootRef} />;
      }
      const instance = getInstance(<ClassComponentWithRootNode />, { noRender: true });
      expect(rootNode).toBeNull();
      expect(getRootNode(instance)).toBeNull();
    });

    it('SVGElement for SVGElement instance', () => {
      const instance = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      expect(getRootNode(instance)).toBeInstanceOf(SVGElement);
    });

    it('SVGElement for intrinsic element', () => {
      const rootRef = React.createRef<SVGSVGElement>();
      const instance = getInstance(<svg ref={rootRef} />);
      expect(getRootNode(instance)).toBe(rootRef.current);
    });

    it('HTMLElement for HTMLElement instance', () => {
      const instance = document.createElement('div');
      expect(getRootNode(instance)).toBeInstanceOf(HTMLElement);
    });

    it('HTMLElement for intrinsic element', () => {
      const rootRef = React.createRef<HTMLDivElement>();
      const instance = getInstance(<div ref={rootRef} />);
      expect(getRootNode(instance)).toBe(rootRef.current);
    });

    it('HTMLElement for functional component with forwardRef', () => {
      const rootRef = React.createRef<HTMLDivElement>();
      const FC = React.forwardRef<HTMLDivElement>(function FC(_, ref) {
        return <div ref={ref} />;
      });
      const instance = getInstance(<FC ref={rootRef} />);
      expect(getRootNode(instance)).toBe(rootRef.current);
    });

    it('HTMLElement for functional component with useImperativeHandle', () => {
      const FC = React.forwardRef(function FN(_, ref) {
        const divRef = React.useRef<HTMLDivElement>(null);
        React.useImperativeHandle(ref, () => ({
          foo: 'bar',
          getRootNode: () => divRef.current,
        }));
        return <div ref={divRef} />;
      });
      const instance = getInstance(<FC />);
      expect(getRootNode(instance)).toBeInstanceOf(HTMLElement);
    });

    it('HTMLElement for class component without rootNode', () => {
      let rootNode: Nullable<HTMLDivElement>;
      class ClassComponentWithRootNode extends React.Component {
        rootRef = (instance: HTMLDivElement | null) => {
          rootNode = instance;
        };
        render = () => <div ref={this.rootRef} />;
      }
      const instance = getInstance(<ClassComponentWithRootNode />);
      expect(getRootNode(instance)).toBe(rootNode);
    });

    it('HTMLElement for class component with rootNode that returns HTMLElement', () => {
      let rootNode: Nullable<HTMLDivElement>;
      class ClassComponentWithRootNode extends React.Component implements InstanceWithRootNode {
        rootNode: Nullable<HTMLDivElement>;
        rootRef = (instance: HTMLDivElement | null) => {
          this.rootNode = instance;
          rootNode = instance;
        };
        getRootNode = () => this.rootNode;
        render = () => <div ref={this.rootRef} />;
      }
      const instance = getInstance(<ClassComponentWithRootNode />);
      expect(getRootNode(instance)).toBe(rootNode);
    });

    it('HTMLElement for class component with rootNode that returns undefined', () => {
      const rootRef = React.createRef<HTMLDivElement>();
      class ClassComponentWithRootNode extends React.Component implements InstanceWithRootNode {
        getRootNode = () => undefined;
        render = () => <div ref={rootRef} />;
      }
      const instance = getInstance(<ClassComponentWithRootNode />);

      expect(rootRef.current).toBeInstanceOf(HTMLDivElement);
      expect(getRootNode(instance)).toBe(rootRef.current);
    });
  });

  describe('findDOMNode', () => {
    beforeEach(() => {
      (findDOMNode as jest.Mock).mockClear();
    });

    describe('should not be called for', () => {
      it('null instance', () => {
        getRootNode(null);
        expect(findDOMNode).not.toBeCalled();
      });

      it('undefined instance', () => {
        getRootNode(undefined);
        expect(findDOMNode).not.toBeCalled();
      });

      it('HTMLElement instance', () => {
        getRootNode(document.createElement('div'));
        expect(findDOMNode).not.toBeCalled();
      });

      it('intrinsic element', () => {
        getRootNode(getInstance(<div />));
        expect(findDOMNode).not.toBeCalled();
      });

      it('functional component with forwardRef', () => {
        const FC = React.forwardRef<HTMLDivElement>(function FC(_, ref) {
          return <div ref={ref} />;
        });
        getRootNode(getInstance(<FC />));
        expect(findDOMNode).not.toBeCalled();
      });

      it('class component with rootNode that returns HTMLElement', () => {
        class ClassComponentWithRootNode extends React.Component implements InstanceWithRootNode {
          rootNode: Nullable<HTMLDivElement>;
          rootRef = (instance: HTMLDivElement | null) => {
            this.rootNode = instance;
          };
          getRootNode = () => this.rootNode;
          render = () => <div ref={this.rootRef} />;
        }
        getRootNode(getInstance(<ClassComponentWithRootNode />));
        expect(findDOMNode).not.toBeCalled();
      });

      it('class component with rootNode that returns null', () => {
        class ClassComponentWithRootNode extends React.Component implements InstanceWithRootNode {
          getRootNode = () => null;
          render = () => <div />;
        }
        getRootNode(getInstance(<ClassComponentWithRootNode />));
        expect(findDOMNode).not.toBeCalled();
      });
    });

    describe('should be called for', () => {
      it('class component without rootNode', () => {
        class ClassComponentWithRootNode extends React.Component {
          render = () => <div />;
        }
        getRootNode(getInstance(<ClassComponentWithRootNode />));
        expect(findDOMNode).toBeCalled();
      });

      it('class component with rootNode that returns undefined', () => {
        class ClassComponentWithRootNode extends React.Component implements InstanceWithRootNode {
          getRootNode = () => undefined;
          render = () => <div />;
        }

        getRootNode(getInstance(<ClassComponentWithRootNode />));
        expect(findDOMNode).toBeCalled();
      });
    });
  });
});
