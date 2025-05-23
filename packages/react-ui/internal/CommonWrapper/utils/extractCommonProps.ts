import type { NotCommonProps } from '../types';
import type { CommonPropsWithRootNodeRef } from '../CommonWrapper';

export const extractCommonProps = <P extends CommonPropsWithRootNodeRef>(
  props: P,
): [CommonPropsWithRootNodeRef, NotCommonProps<P>] => {
  const common = {} as CommonPropsWithRootNodeRef;
  const rest = {} as NotCommonProps<P>;

  for (const prop in props) {
    if (isCommonProp(prop as keyof CommonPropsWithRootNodeRef)) {
      // @ts-expect-error: See: https://github.com/skbkontur/retail-ui/pull/2257#discussion_r565275843 and https://github.com/skbkontur/retail-ui/pull/2257#discussion_r569542736.
      common[prop] = props[prop];
    } else {
      // @ts-expect-error: Read the comment above.
      rest[prop] = props[prop];
    }
  }

  return [common, rest];
};

const isCommonProp = (prop: keyof CommonPropsWithRootNodeRef) => {
  switch (true) {
    case prop === 'className':
    case prop === 'style':
    case prop === 'rootNodeRef':
    case prop === 'children':
    case prop.indexOf('data-') === 0: // все data-атрибуты
      return true;
    default:
      return false;
  }
};
