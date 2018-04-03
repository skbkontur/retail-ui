declare module 'create-react-context' {
  function createReactContext<T>(
    defaultValue: T,
    calculateChangedBits?: (prev: T, next: T) => number
  ): Context<T>;

  type RenderFn<T> = (value: T) => React.ReactNode;

  type Context<T> = {
    Provider: React.ComponentClass<ProviderProps<T>>;
    Consumer: React.ComponentClass<ConsumerProps<T>>;
  };

  type ProviderProps<T> = {
    value: T;
    children: React.ReactNode;
  };

  type ConsumerProps<T> = {
    children: RenderFn<T> | [RenderFn<T>];
    observedBits?: number;
  };

  export = createReactContext;
}
