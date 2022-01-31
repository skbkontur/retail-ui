import { isExternalLink } from '../utils';

describe('isExternalLink', () => {
  const externalLinks = [
    ['https://example.com:8080/home'],
    ['http://example.com'],
    ['//example.com/'],
    ['HTTP://EXAMPLE.COM'],
  ];
  it.each(externalLinks)('external link `%s` should return true', (href) => {
    expect(isExternalLink(href)).toBe(true);
  });

  const internalLinks = [
    [`https://${location.host}/home`],
    [`http://${location.host}`],
    [`//${location.host}`],
    ['/home'],
    ['/home?redirect=http://example.com'],
    ['../home'],
    ['page.html'],
    ['#anchor'],
  ];
  it.each(internalLinks)('internal link `%s` should return false', (href) => {
    expect(isExternalLink(href)).toBe(false);
  });
});
