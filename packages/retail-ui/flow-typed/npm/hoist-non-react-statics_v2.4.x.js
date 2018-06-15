// flow-typed signature: 76957f33d65128bcb9ca0ef521426a13
// flow-typed version: 5fd9986d4c/hoist-non-react-statics_v2.4.x/flow_>=v0.54.1

declare module 'hoist-non-react-statics' {
  declare module.exports: <OP, CP>(
    target: React$ComponentType<OP>,
    source: React$ComponentType<OP & CP>,
    blacklist?: { [key: string]: mixed }
  ) => React$ComponentType<OP>;
}
