type HookAction<R> = (evt: string, fn: (...args: any[]) => void) => R;

interface Dictionary<K = string, V = any> {
  [key: K]: V;
}

interface RendererFiber {
  getNativeFromReactElement: (fiber: Fiber) => any | null;
  getReactElementFromNative: any;
  handleCommitFiberRoot: any;
  handleCommitFiberUnmount: any;
  cleanup: any;
  walkTree: any;
  renderer: any;
}

type HookType =
  | 'useState'
  | 'useReducer'
  | 'useContext'
  | 'useRef'
  | 'useEffect'
  | 'useLayoutEffect'
  | 'useCallback'
  | 'useMemo'
  | 'useImperativeHandle'
  | 'useDebugValue';

interface FiberType {
  __REACT_UI__?: string
}

export interface Fiber {
  // These first fields are conceptually members of an Instance. This used to
  // be split into a separate type and intersected with the other Fiber fields,
  // but until Flow fixes its intersection bugs, we've merged them into a
  // single type.

  // An Instance is shared between all versions of a component. We can easily
  // break this out into a separate object to avoid copying so much to the
  // alternate versions of the tree. We put this on a single object for now to
  // minimize the number of objects created during the initial render.

  // Tag identifying the type of fiber.
  tag: WorkTag;

  // Unique identifier of this child.
  key: null | string;

  // The value of element.type which is used to preserve the identity during
  // reconciliation of this child.
  elementType: any;

  // The resolved function/class/ associated with this fiber.
  type: FiberType | any;

  // The local state associated with this fiber.
  stateNode: any;

  // Conceptual aliases
  // parent : Instance -> return The parent happens to be the same as the
  // return fiber since we've merged the fiber and instance.

  // Remaining fields belong to Fiber

  // The Fiber to return to after finishing processing this one.
  // This is effectively the parent, but there can be multiple parents (two)
  // so this is only the parent of the thing we're currently processing.
  // It is conceptually the same as the return address of a stack frame.
  return: Fiber | null;

  // Singly Linked List Tree Structure.
  child: Fiber | null;
  sibling: Fiber | null;
  index: number;

  // The ref last used to attach this node.
  // I'll avoid adding an owner field for prod and model that as functions.
  ref: null | (((handle: unknown) => void) & { _stringRef?: string }) | any; // RefObject;
  // Input is the data coming into process this fiber. Arguments. Props.
  pendingProps: any; // This type will be more specific once we overload the tag.
  memoizedProps: any; // The props used to create the output.

  // A queue of state updates and callbacks.
  updateQueue: UpdateQueue<any> | null;

  // The state used to create the output
  memoizedState: any;

  // A linked-list of contexts that this fiber depends on
  contextDependencies: ContextDependencyList | null;

  // Bitfield that describes properties about the fiber and its subtree. E.g.
  // the ConcurrentMode flag indicates whether the subtree should be async-by-
  // default. When a fiber is created, it inherits the mode of its
  // parent. Additional flags can be set at creation time, but after that the
  // value should remain unchanged throughout the fiber's lifetime, particularly
  // before its child fibers are created.
  mode: TypeOfMode;

  // Effect
  effectTag: SideEffectTag;

  // Singly linked list fast path to the next fiber with side-effects.
  nextEffect: Fiber | null;

  // The first and last fiber with side-effect within this subtree. This allows
  // us to reuse a slice of the linked list when we reuse the work done within
  // this fiber.
  firstEffect: Fiber | null;
  lastEffect: Fiber | null;

  // Represents a time in the future by which this work should be completed.
  // Does not include work found in its subtree.
  expirationTime: ExpirationTime;

  // This is used to quickly determine if a subtree has no pending changes.
  childExpirationTime: ExpirationTime;

  // This is a pooled version of a Fiber. Every fiber that gets updated will
  // eventually have a pair. There are cases when we can clean up pairs to save
  // memory if we need to.
  alternate: Fiber | null;

  // Time spent rendering this Fiber and its descendants for the current update.
  // This tells us how well the tree makes use of sCU for memoization.
  // It is reset to 0 each time we render and only updated when we don't bailout.
  // This field is only set when the enableProfilerTimer flag is enabled.
  actualDuration?: number;

  // If the Fiber is currently active in the "render" phase,
  // This marks the time at which the work began.
  // This field is only set when the enableProfilerTimer flag is enabled.
  actualStartTime?: number;

  // Duration of the most recent render time for this Fiber.
  // This value is not updated when we bailout for memoization purposes.
  // This field is only set when the enableProfilerTimer flag is enabled.
  selfBaseDuration?: number;

  // Sum of base times for all descedents of this Fiber.
  // This value bubbles up during the "complete" phase.
  // This field is only set when the enableProfilerTimer flag is enabled.
  treeBaseDuration?: number;

  // Conceptual aliases
  // workInProgress : Fiber ->  alternate The alternate used for reuse happens
  // to be the same as work in progress.
  // __DEV__ only
  _debugID?: number;
  _debugSource?: Source | null;
  _debugOwner?: Fiber | null;
  _debugIsCurrentlyTiming?: boolean;

  // Used to verify that the order of hooks does not change between renders.
  _debugHookTypes?: HookType[] | null;
}

interface ReactRenderer {
  // Fiber
  findHostInstanceByFiber: (fiber: object) => NativeType;
  findFiberByHostInstance: (hostInstance: NativeType) => OpaqueNodeHandle;
  version: string;
  bundleType: BundleType;
  overrideProps?: (fiber: object, path: Array<string | number>, value: any) => void;

  // Stack
  Reconciler: {
    mountComponent: any;
    performUpdateIfNecessary: any;
    receiveComponent: any;
    unmountComponent: any;
  };
  Component?: {
    Mixin: object;
  };
  Mount: {
    // React Native
    nativeTagToRootNodeID: (tag: any) => string;
    findNodeHandle: (component: object) => any;
    renderComponent: any;
    _instancesByContainerID: object;

    // React DOM
    getID: (node: DOMNode) => string;
    getNode: (id: string) => HTMLElement;
    _instancesByReactRootID: object;
    _renderNewRootComponent: any;
  };
  ComponentTree: {
    getNodeFromInstance: (component: OpaqueNodeHandle) => NativeType;
    getClosestInstanceFromNode: (component: NativeType) => OpaqueNodeHandle;
  };
  currentDispatcherRef?: {
    current: null | object;
  };
}

export interface Hook {
  _renderers?: { [key: string]: unknown };
  _listeners?: { [key: string]: Array<(data: any) => void> };
  helpers?: Dictionary<string, RendererFiber>;
  checkDCE?: unknown;
  inject: (renderer?: ReactRenderer) => string | void;
  sub?: HookAction<HookAction<void>>;
  on?: HookAction<void>;
  off?: HookAction<void>;
  emit?: (evt: string, data: any) => void;

  supportsFiber: boolean;
  _fiberRoots?: { [key: string]: Set<any> };
  getFiberRoots?: (rendererID: string) => Set<any>;
  onCommitFiberUnmount?: (rendererID: string, fiber: Fiber) => void;
  onCommitFiberRoot: (rendererID: string, root: FiberRoot) => void;
}

export interface FiberRoot {
  // Any additional information from the host associated with this root.
  containerInfo: any;
  // Used only by persistent updates.
  pendingChildren: any;
  // The currently active root fiber. This is the mutable root of the tree.
  current: Fiber;

  // The following priority levels are used to distinguish between 1)
  // uncommitted work, 2) uncommitted work that is suspended, and 3) uncommitted
  // work that may be unsuspended. We choose not to track each individual
  // pending level, trading granularity for performance.
  //
  // The earliest and latest priority levels that are suspended from committing.
  earliestSuspendedTime: ExpirationTime;
  latestSuspendedTime: ExpirationTime;
  // The earliest and latest priority levels that are not known to be suspended.
  earliestPendingTime: ExpirationTime;
  latestPendingTime: ExpirationTime;
  // The latest priority level that was pinged by a resolved promise and can
  // be retried.
  latestPingedTime: ExpirationTime;

  pingCache: WeakMap<Thenable, Set<ExpirationTime>> | Map<Thenable, Set<ExpirationTime>> | null;

  // If an error is thrown, and there are no more updates in the queue, we try
  // rendering from the root one more time, synchronously, before handling
  // the error.
  didError: boolean;

  pendingCommitExpirationTime: ExpirationTime;
  // A finished work-in-progress HostRoot that's ready to be committed.
  finishedWork: Fiber | null;
  // Timeout handle returned by setTimeout. Used to cancel a pending timeout, if
  // it's superseded by a new one.
  timeoutHandle: number | null;
  // Top context object, used by renderSubtreeIntoContainer
  context: object | null;
  pendingContext: object | null;
  // Determines if we should attempt to hydrate on the initial mount
  hydrate: boolean;
  // Remaining expiration time on this root.
  // TODO: Lift this into the renderer
  nextExpirationTimeToWorkOn: ExpirationTime;
  expirationTime: ExpirationTime;
  // List of top-level batches. This list indicates whether a commit should be
  // deferred. Also contains completion callbacks.
  // TODO: Lift this into the renderer
  firstBatch: Batch | null;
  // Linked-list of roots
  nextScheduledRoot: FiberRoot | null;

  // The following attributes are only used by interaction tracing builds.
  // They enable interactions to be associated with their async work,
  // And expose interaction metadata to the React DevTools Profiler plugin.
  // Note that these attributes are only defined when the enableSchedulerTracing flag is enabled.
  interactionThreadID: number;
  memoizedInteractions: Set<Interaction>;
  pendingInteractionMap: PendingInteractionMap;
}

interface Batch {
  _defer: boolean;
  _expirationTime: ExpirationTime;
  _onComplete: () => unknown;
  _next: Batch | null;
}

type ExpirationTime = number;

interface Thenable {
  then(resolve: () => unknown, reject?: () => unknown): unknown;
}

interface Interaction {
  __count: number;
  id: number;
  name: string;
  timestamp: number;
}

type PendingInteractionMap = Map<ExpirationTime, Set<Interaction>>;
type WorkTag = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18;
type TypeOfMode = number;
type SideEffectTag = number;
type NativeType = object;

interface Source {
  fileName: string;
  lineNumber: number;
}

interface ContextDependencyList {
  first: ContextDependency<unknown>;
  expirationTime: ExpirationTime;
}

interface ContextDependency<T> {
  context: ReactContext<T>;
  observedBits: number;
  next: ContextDependency<unknown> | null;
}

interface OpaqueNodeHandle {
  _rootNodeID: string;
}

interface Update<State> {
  expirationTime: ExpirationTime;

  tag: 0 | 1 | 2 | 3;
  payload: any;
  callback: (() => unknown) | null;

  next: Update<State> | null;
  nextEffect: Update<State> | null;
}

interface UpdateQueue<State> {
  baseState: State;

  firstUpdate: Update<State> | null;
  lastUpdate: Update<State> | null;

  firstCapturedUpdate: Update<State> | null;
  lastCapturedUpdate: Update<State> | null;

  firstEffect: Update<State> | null;
  lastEffect: Update<State> | null;

  firstCapturedEffect: Update<State> | null;
  lastCapturedEffect: Update<State> | null;
}
