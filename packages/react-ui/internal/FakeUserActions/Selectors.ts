import { FAKE_USER_ACTION_ATTR, FakeUserAction } from './FakeUserActions';

const selector = (act: FakeUserAction, extra = '') => `
[${FAKE_USER_ACTION_ATTR[act]}]${extra}
`;

const sampler =
  (act: FakeUserAction) =>
  (strings: TemplateStringsArray, ...args: Array<string | number>): string => {
    const extra = strings.reduce((prev, value, i) => prev + value + (args[i] || ''), '');
    return selector(act, extra);
  };

export const hover = sampler('hover');
export const active = sampler('active');
export const focus = sampler('focus');

export const fakeHover = selector('hover');
export const fakeActive = selector('active');
export const fakeFocus = selector('focus');
