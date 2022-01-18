import { isBrowser } from '../../../lib/client';

/**
 * Checks if the provided link leads to an external resource.
 *
 * @param link Link to check.
 * @returns Returns true if the provided link leads to an external resource, else false.
 */
export const isExternalLink = (link: string) => {
  const host = isBrowser ? `(?!${window.location.host})` : '';

  return new RegExp(`^(https?:)?//${host}\\S+`, 'gi').test(link);
};
