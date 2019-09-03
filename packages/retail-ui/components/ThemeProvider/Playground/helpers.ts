import React from 'react';
import Checkbox from '../../Checkbox';

export const getComponentsFromPropsList = <P>(
  component: React.ReactElement<P>,
  propsList: P[],
): Array<React.ReactElement<P>> => {
  return propsList.reduce((result: Array<React.ReactElement<P>>, props, index) => {
    // NOTE: все это ради чекбокса с фокусом, т.к. нет ни focused, ни autofocus; а ref+focus() снаружи нестабилен
    // @ts-ignore
    const isCheckbox = component.type === Checkbox;
    if (isCheckbox) {
      const checkboxProps = (props as unknown) as { ref: (el: Checkbox) => void; focused: boolean };
      if (checkboxProps.focused) {
        checkboxProps.ref = el => {
          if (el) {
            el.setState({ focusedByTab: true });
          }
        };
        delete checkboxProps.focused;
      }
    }

    const elementWithProps = React.cloneElement(component, { ...props, key: index });

    return [...result, elementWithProps];
  }, []);
};
