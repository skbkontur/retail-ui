import React from 'react';

import { ReactUIComponentWithRef } from './forwardRefAndName';
import { getDisplayName } from './getDisplayName';
import { isNonNullable } from './utils';

const removePostfix = (word: string, postfixRegex: RegExp) => {
  const regexContent = postfixRegex.source.replace(/\$$/, '');

  const isCorrectPostfix = postfixRegex.test(word);
  if (!isCorrectPostfix) {
    throw new Error(
      `Component's displayName property must end with '${regexContent}' in order to be wrapped in withClassWrapper HOC`,
    );
  }

  return word.replace(postfixRegex, '');
};

/**
 * HOC for moving from Class to Functional components.
 *
 * Used to remove distinctions between Class and Functional refs.
 *
 * @param RFC Functional component wrapped in forwardRefAndName HOF.
 * @param methodsNames Names of methods in functional component.
 * @returns Class component that wraps Functional component.
 */
export function withClassWrapper<T, P>(RFC: ReactUIComponentWithRef<T, P>, methodsNames?: Readonly<string[]>) {
  const fullName = getDisplayName(RFC);
  const nameWithoutPostfix = removePostfix(fullName, /FC$/);

  return class ClassWrapper extends React.Component<P> {
    // Ref is type of any as there are custom methods.
    public wrapperRef = React.createRef<any>();

    constructor(props: P) {
      super(props);

      /**
       * Creates an interface for calling static methods
       * defined in functional component.
       */
      if (isNonNullable(methodsNames)) {
        for (let methodName of methodsNames) {
          Object.defineProperty(this, methodName, {
            value: () => this.wrapperRef.current?.[methodName](),
            enumerable: true,
          });
        }
      }
    }

    public static __KONTUR_REACT_UI__ = nameWithoutPostfix;
    public static displayName = nameWithoutPostfix;

    public static FC = RFC;

    render() {
      return <ClassWrapper.FC ref={this.wrapperRef} {...this.props} />;
    }
  };
}
