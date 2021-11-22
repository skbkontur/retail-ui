import { cx } from './theming/Emotion';
import { extractFromObject, isNullable } from './utils';

enum HTMLCommonProps {
  className = 'className',
  style = 'style',
}

enum CustomCommonProps {
  data = 'data-',
}

export const commonProps = { html: HTMLCommonProps, custom: CustomCommonProps } as const;

interface CommonPropsType {
  /**
   * HTML-атрибут `class`.
   */
  [HTMLCommonProps.className]?: React.HTMLAttributes<HTMLElement>['className'];
  /**
   * HTML-атрибут `style`.
   */
  [HTMLCommonProps.style]?: React.HTMLAttributes<HTMLElement>['style'];
  /**
   * Сокращение от 'data test id'. Используется для E2E тестов.
   */
  'data-tid'?: string;
}

type ExternalProps<P extends CommonPropsType> = P;

/**
 * Checks if the given prop name exists in object of type CommonProps.
 *
 * @param prop Prop name to check.
 * @returns Returns true if prop exists in object from second argument, else false.
 */
export const isCommonProp = (prop: string): boolean => {
  if (commonProps.html.hasOwnProperty(prop)) {
    return true;
  }
  if (prop.startsWith(commonProps.custom.data)) {
    return true;
  }

  return false;
};

type ObjectProperty = Record<string, any>;

export function mergeRecursively<TObject extends ObjectProperty, TOverrides extends ObjectProperty>(
  object: TObject,
  overrides: TOverrides,
): TObject & TOverrides {
  const allKeys = [...Object.keys(object), ...Object.keys(overrides)];

  const result: ObjectProperty = {};
  for (let key of allKeys) {
    // If only one of the objects has the key
    // we simply put property with that key into the result variable.
    if (isNullable(object[key]) || isNullable(overrides[key])) {
      result[key] = object[key] ?? overrides[key];
      continue;
    }

    if (typeof object[key] === 'string') {
      result[key] = cx(object[key], overrides[key]);
    } else {
      result[key] = { ...object[key], ...overrides[key] };
    }
  }
  return result as TObject & TOverrides;
}

const commonPropsPredicate = ([key]: [string, string]) => {
  return isCommonProp(key);
};

export function mergeProps<P>(props: ExternalProps<P>) {
  if (!props) return;

  const test = { a: 1, b: 2, c: 3, style: 'test' };
  const commonProps = extractFromObject(test, commonPropsPredicate);
  console.log('COMMON PROPS:', commonProps);
  const style = { height: 30, width: 50 };
  const modifiedProps = { ...props, style: { ...commonProps, ...style } };
  return modifiedProps;
}
