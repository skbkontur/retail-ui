import React from 'react';

import { ReactUIComponentWithRef } from './forwardRefAndName';
import { getDisplayName } from './getDisplayName';

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
    public instancePropertiesRef = React.createRef<T>();

    componentDidMount() {
      if (this.instancePropertiesRef.current) {
        Object.defineProperties(this, Object.getOwnPropertyDescriptors(this.instancePropertiesRef.current));
      }
    }

    public static __KONTUR_REACT_UI__ = nameWithoutPostfix;
    public static displayName = nameWithoutPostfix;

    public static FC = RFC;

    render() {
      return (
        // @ts-expect-error: TypeScript is not able to understand that both types (class one and functional one) have ref.
        <ClassWrapper.FC
          // Returns methods defined in useImperativeHandle.
          instanceRef={this.instancePropertiesRef}
          {...this.props}
        />
      );
    }
  };
}

export interface InstanceRefType<T> {
  instanceRef: React.MutableRefObject<T>;
}
