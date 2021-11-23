import React from 'react';

import { ReactUIComponentWithRef } from './forwardRefAndName';
import { getDisplayName } from './getDisplayName';
import { objectToArray } from './utils';

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
 * Defines properties from passed in 2D tuple.
 *
 * @param context Context of the class to which methods will be assigned.
 * @param properties A 2D tuple: the first value is name of the property and the second is value.
 */
function definePublicProperties<T>(context: ThisType<T>, properties: [string, any][] | null): void {
  if (!!properties) {
    for (let method of properties) {
      const [name, action] = method;
      Object.defineProperty(context, name, {
        value: action,
        enumerable: true,
      });
    }
  }
}

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
      const instanceProperties = objectToArray<Record<string, any>>(this.instancePropertiesRef.current);

      definePublicProperties<ClassWrapper>(this, instanceProperties);
    }

    public static __KONTUR_REACT_UI__ = nameWithoutPostfix;
    public static displayName = nameWithoutPostfix;

    public static FC = RFC;

    render() {
      return (
        <ClassWrapper.FC
          // Returns methods defined in useImperativeHandle.
          instanceRef={this.instancePropertiesRef}
          {...this.props}
        />
      );
    }
  };
}
