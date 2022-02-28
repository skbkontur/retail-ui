import { isExternalLink } from './isExternalLink';

/**
 * Generates 'rel' attribute for the provided link.
 *
 * @param link Link for which `rel` will be generated.
 * @param rel `rel` attribute of the provided link.
 * @returns String to be provided to the `rel` attribute.
 */
export const generateRel = (link: string, rel: string | undefined) => {
  if (!link) return undefined;

  const starter = 'noopener';
  if (typeof rel === undefined && isExternalLink(link)) {
    return starter + ' noreferrer';
  }
  return starter;
};
