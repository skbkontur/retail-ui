declare namespace React {
  class Component<P, S> {
    setState(
      state: ((prevState: Readonly<S>, props: P) => Partial<S> | S | null) | (Partial<S> | S | null),
      callback?: () => void,
    ): void;
  }
}
