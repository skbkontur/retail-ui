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
 * Defines methods from passed in 2D tuple.
 *
 * @param context Context of the class to which methods will be assigned.
 * @param methods A 2D tuple: the first value is name of the method and the second is action of the method.
 */
function definePublicMethods<T>(context: ThisType<T>, methods: [string, () => any][] | null): void {
  if (!!methods) {
    for (let method of methods) {
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
    public wrapperRef = React.createRef<T>();
    public imperativeMethodsRef = React.createRef<T>();

    componentDidMount() {
      // A workaround for having two refs at the same time
      const refMethods = objectToArray<Record<string, any>>(this.wrapperRef.current);
      const actionsRefMethods = objectToArray<Record<string, any>>(this.imperativeMethodsRef.current);

      definePublicMethods<ClassWrapper>(this, refMethods);
      definePublicMethods<ClassWrapper>(this, actionsRefMethods);
    }

    public static __KONTUR_REACT_UI__ = nameWithoutPostfix;
    public static displayName = nameWithoutPostfix;

    public static FC = RFC;

    render() {
      return (
        <ClassWrapper.FC
          // When accesed from outside returns a class instance.
          ref={this.wrapperRef}
          // When accesed from outside returns methods defined in useImperativeHandle.
          actionsRef={this.imperativeMethodsRef}
          {...this.props}
        />
      );
    }
  };
}
