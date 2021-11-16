import { isBrowser } from '../../lib/client';

/**
 * Checks if the provided link leads to an external resource
 *
 * @param link Link to check
 * @returns Returns true if the provided link leads to an external resource, else false
 */
const isExternalLink = (link: string): boolean => {
  return new RegExp(`^(https?:)?//${isBrowser ? `(?!${window.location.host})` : ``}\\S+`, 'gi').test(link);
};

/**
 * Generates 'rel' attribute for the provided link
 *
 * @param link Link for which 'rel' will be provided
 * @param condition Any additional conditions
 * @returns String to be provided to 'rel' attribute
 */
export const generateRel = (link: string, condition: boolean = true): string => {
  const starter = 'noopener';
  if (condition && isExternalLink(link)) {
    return starter + ' noreferrer';
  }
  return starter;
};
