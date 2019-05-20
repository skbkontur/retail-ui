interface VariablesMap {
  readonly [key: string]: string;
}

export function defineInternalTheme<VM extends VariablesMap, CD extends PropertyDescriptorMap>(
  staticVariables: VM,
  computedDescriptors: CD & ThisType<VM & CD>,
) {
  const result: unknown = {};

  Object.assign(result, staticVariables);

  Object.keys(computedDescriptors).forEach(key => {
    const resultElement = (result as VM)[key];
    if (!resultElement) {
      Object.defineProperty(result, key, computedDescriptors[key]);
    }
  });

  return Object.freeze(result) as { [key in keyof (VM & CD)]: string };
}
