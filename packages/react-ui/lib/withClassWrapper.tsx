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
 * @param RFC Functional component wrapped in forwardRefAndName.
 * @returns Class component that wraps Functional component.
 */
export function withClassWrapper<T, P>(RFC: ReactUIComponentWithRef<T, P>) {
  const fullName = getDisplayName(RFC);
  const nameWithoutPostfix = removePostfix(fullName, /FC$/);

  return class ClassWrapper extends React.Component<P> {
    public wrapperRef = React.createRef<T>();

    componentDidMount() {
      const imperativeMethods = !!this.wrapperRef?.current ? Object.entries(this.wrapperRef.current) : null;

      /**
       * Creates an interface for calling methods
       * defined in the functional component.
       */
      if (isNonNullable(imperativeMethods)) {
        for (let method of imperativeMethods) {
          const [name, action] = method;
          Object.defineProperty(this, name, {
            value: action,
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
