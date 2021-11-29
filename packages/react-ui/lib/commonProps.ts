import { hasProp } from './utils';

interface CommonPropConfig {
  searchType: 'entry' | 'startsWith';
}

const commonProps: Record<string, CommonPropConfig> = {
  className: { searchType: 'entry' },
  style: { searchType: 'entry' },
  'data-': { searchType: 'startsWith' },
};

export interface CommonProps {
  /**
   * HTML-атрибут `class`.
   */
  className?: React.HTMLAttributes<HTMLElement>['className'];
  /**
   * HTML-атрибут `style`.
   */
  style?: React.HTMLAttributes<HTMLElement>['style'];
  /**
   * Сокращение от 'data test id'. Используется для E2E тестов.
   */
  'data-tid'?: string;
}

/**
 * Checks if the given prop is one of the common props.
 *
 * @param prop Name of the prop.
 * @returns Returns true if the given prop is one of the common props, else false.
 */
export const isCommonProp = (prop: string): boolean => {
  const commonPropIndex = Object.entries(commonProps).findIndex((curr) => {
    const [name, config] = curr;

    if (config.searchType === 'entry') {
      return hasProp(commonProps, prop);
    } else if (config.searchType === 'startsWith') {
      return prop.startsWith(name);
    }
  });

  if (commonPropIndex !== -1) {
    return true;
  }

  return false;
};
