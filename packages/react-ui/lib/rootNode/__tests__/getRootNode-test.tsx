import React from 'react';
import { findDOMNode } from 'react-dom';
import { render } from '@testing-library/react';

import { Nullable } from '../../../typings/utility-types';
import { getRootNode } from '../getRootNode';
import { InstanceWithRootNode } from '../rootNodeDecorator';
import { applyRef } from '../../utils';

const getInstance = (element: React.ReactElement): React.ReactInstance | null => {
  let ref: React.Component | Element | null = null;
  const refCallback = (instance: React.ReactInstance) => {
    applyRef((element as React.RefAttributes<any>).ref, instance);
    ref = instance;
  };

  render(React.cloneElement(element, { ref: refCallback }));

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

    it('HTMLElement for HTMLElement instance', () => {
      const instance = document.createElement('div');
      expect(getRootNode(instance)).toBeInstanceOf(HTMLDivElement);
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
