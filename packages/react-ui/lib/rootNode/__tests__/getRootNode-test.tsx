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

    it('null for plain object', () => {
      expect(getRootNode(Object.create(null))).toBeNull();
    });

    it('null for Text instance', () => {
      // @ts-expect-error intentionally not acceptable argument type
      expect(getRootNode(document.createTextNode('text'))).toBeNull();
    });

    it('null for Comment instance', () => {
      // @ts-expect-error intentionally not acceptable argument type
      expect(getRootNode(document.createComment('comment'))).toBeNull();
    });

    it('SVGElement for SVGElement instance', () => {
      const instance = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      expect(getRootNode(instance)).toBeInstanceOf(SVGElement);
    });

    it('SVGElement for intrinsic svg element', () => {
      const instance = getInstance(<svg />);
      expect(getRootNode(instance)).toBeInstanceOf(SVGElement);
    });

    it('HTMLElement for HTMLElement instance', () => {
      const instance = document.createElement('div');
      expect(getRootNode(instance)).toBeInstanceOf(HTMLElement);
    });

    it('HTMLElement for intrinsic div element', () => {
      const instance = getInstance(<div />);
      expect(getRootNode(instance)).toBeInstanceOf(HTMLElement);
    });

    it('HTMLElement for functional component with forwardRef', () => {
      const FC = React.forwardRef<HTMLDivElement>(function FC(_, ref) {
        return <div ref={ref} />;
      });
      const instance = getInstance(<FC />);
      expect(getRootNode(instance)).toBeInstanceOf(HTMLElement);
    });

    it('HTMLElement for functional component with useImperativeHandle and rootNode', () => {
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
      class ClassComponentWithRootNode extends React.Component {
        render = () => <div />;
      }
      const instance = getInstance(<ClassComponentWithRootNode />);
      expect(getRootNode(instance)).toBeInstanceOf(HTMLElement);
    });

    it('HTMLElement for class component with rootNode that returns HTMLElement', () => {
      class ClassComponentWithRootNode extends React.Component implements InstanceWithRootNode {
        rootNode: Nullable<HTMLDivElement>;
        rootRef = (instance: HTMLDivElement | null) => {
          this.rootNode = instance;
        };
        getRootNode = () => this.rootNode;
        render = () => <div ref={this.rootRef} />;
      }
      const instance = getInstance(<ClassComponentWithRootNode />);
      expect(getRootNode(instance)).toBeInstanceOf(HTMLElement);
    });

    it('HTMLElement for class component with rootNode that returns undefined', () => {
      class ClassComponentWithRootNode extends React.Component implements InstanceWithRootNode {
        getRootNode = () => undefined;
        render = () => <div />;
      }
      const instance = getInstance(<ClassComponentWithRootNode />);
      expect(getRootNode(instance)).toBeInstanceOf(HTMLElement);
    });
  });

  describe('findDOMNode', () => {
    beforeEach(() => {
      (findDOMNode as jest.Mock).mockClear();
    });

    describe('should not be called for', () => {
      it('null instance', () => {
        getRootNode(null);
        expect(findDOMNode).not.toHaveBeenCalled();
      });

      it('undefined instance', () => {
        getRootNode(undefined);
        expect(findDOMNode).not.toHaveBeenCalled();
      });

      it('HTMLElement instance', () => {
        getRootNode(document.createElement('div'));
        expect(findDOMNode).not.toHaveBeenCalled();
      });

      it('intrinsic element', () => {
        getRootNode(getInstance(<div />));
        expect(findDOMNode).not.toHaveBeenCalled();
      });

      it('functional component with forwardRef', () => {
        const FC = React.forwardRef<HTMLDivElement>(function FC(_, ref) {
          return <div ref={ref} />;
        });
        getRootNode(getInstance(<FC />));
        expect(findDOMNode).not.toHaveBeenCalled();
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
        expect(findDOMNode).not.toHaveBeenCalled();
      });

      it('class component with rootNode that returns null', () => {
        class ClassComponentWithRootNode extends React.Component implements InstanceWithRootNode {
          getRootNode = () => null;
          render = () => <div />;
        }
        getRootNode(getInstance(<ClassComponentWithRootNode />));
        expect(findDOMNode).not.toHaveBeenCalled();
      });
    });

    describe('should be called for', () => {
      it('class component without rootNode', () => {
        class ClassComponentWithRootNode extends React.Component {
          render = () => <div />;
        }
        getRootNode(getInstance(<ClassComponentWithRootNode />));
        expect(findDOMNode).toHaveBeenCalled();
      });

      it('class component with rootNode that returns undefined', () => {
        class ClassComponentWithRootNode extends React.Component implements InstanceWithRootNode {
          getRootNode = () => undefined;
          render = () => <div />;
        }

        getRootNode(getInstance(<ClassComponentWithRootNode />));
        expect(findDOMNode).toHaveBeenCalled();
      });
    });
  });
});
