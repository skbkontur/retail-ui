type Diff<T, U> = T extends U ? never : T;
type Filter<T, U> = T extends U ? T : never;

export type UserGlobals = typeof globalThis;

type BrowserGlobals = Window;
type NodeGlobals = NodeJS.Global;
type SharedGlobalKeys = Filter<keyof BrowserGlobals, keyof NodeGlobals>;

export type UserOwnGlobals = Pick<UserGlobals, Diff<keyof UserGlobals, keyof BrowserGlobals | keyof NodeGlobals>>;

export type BrowserOwnGlobals = Pick<BrowserGlobals, Diff<keyof BrowserGlobals, SharedGlobalKeys>>;
export type NodeOwnGlobal = Pick<NodeGlobals, Diff<keyof NodeGlobals, SharedGlobalKeys>>;

export type GlobalObject = Partial<UserOwnGlobals> &
  Partial<BrowserOwnGlobals> &
  Partial<NodeOwnGlobal> &
  Pick<BrowserGlobals, SharedGlobalKeys>;
