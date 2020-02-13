const IS_COMPUTED_MARKER = '__COMPUTED__';

export function defineInternalTheme<VM, CD extends PropertyDescriptorMap>(
  staticVariables: VM,
  computedDescriptors: CD & ThisType<VM & CD>,
) {
  const result: { [key: string]: string } = {};

  Object.assign(result, staticVariables);

  Object.keys(computedDescriptors).forEach(key => {
    const resultElement = result[key];

    if (!resultElement || resultElement === IS_COMPUTED_MARKER) {
      computedDescriptors[key].enumerable = true;
      Object.defineProperty(result, key, computedDescriptors[key]);
    }
  });

  return Object.freeze(result) as { readonly [key in keyof (VM & CD)]: string };
}
