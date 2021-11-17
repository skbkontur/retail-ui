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

class ClassWrapper<P> extends React.Component<P> {
  public static __KONTUR_REACT_UI__: string;
  public static displayName: string;

  public static FC: ReactUIComponentWithRef<any, any>;

  render() {
    return <ClassWrapper.FC {...this.props} />;
  }
}

export function withClassWrapper<T, P>(RFC: ReactUIComponentWithRef<T, P>) {
  const fullName = getDisplayName(RFC);
  const nameWithoutPostfix = removePostfix(fullName, /FC$/);

  ClassWrapper.displayName = nameWithoutPostfix;
  ClassWrapper.__KONTUR_REACT_UI__ = nameWithoutPostfix;

  ClassWrapper.FC = RFC;

  return ClassWrapper;
}
