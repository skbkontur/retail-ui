type Act = 'hover' | 'active' | 'focus';

const TAGS: Record<Act, string> = {
  hover: '[data-style-hover]',
  active: '[data-style-active]',
  focus: '[data-style-focus]',
};

const selector = (act: Act, extra: string = '') => `
&:${act}${extra},
&${TAGS[act]}:not(:disabled)${extra}
`;

const sampler =
  (act: Act) =>
  (strings: TemplateStringsArray, ...args: Array<string | number>) => {
    if (args.length > 0) {
      const extra = strings.reduce((prev, value, i) => prev + value + (args[i] || ''), '');
      return selector(act, extra);
    }

    return selector(act);
  };

export const hover = sampler('hover');
export const active = sampler('active');
export const focus = sampler('focus');
