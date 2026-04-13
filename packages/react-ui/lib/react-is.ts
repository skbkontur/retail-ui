import type { ComponentType, ElementType, ForwardRefExoticComponent, MemoExoticComponent, ReactElement } from 'react';
import React from 'react';
import warning from 'warning';

// This code supports React <= 18 and React 19. Ported from production builds:
// - https://app.unpkg.com/react-is@19.0.0/files/cjs/react-is.production.js
// - https://app.unpkg.com/react-is@18.3.1/files/cjs/react-is.production.min.js

export const REACT_MAJOR_VERSION = /* @__PURE__ */ parseInt(React.version.split('.')[0] ?? '', 10) || 0;
export const IS_REACT_19 = REACT_MAJOR_VERSION === 19;
export const IS_REACT_20 = REACT_MAJOR_VERSION === 20;

if (IS_REACT_20) {
  warning(
    false,
    'React 20 detected. You must check and update this code for React 20 support. ' +
      'Check changes and add new warning for future React 21 here: ' +
      'https://github.com/facebook/react/commits/main/packages/react-is',
  );
}

const REACT_ELEMENT_TYPE = /* @__PURE__ */ Symbol.for(IS_REACT_19 ? 'react.transitional.element' : 'react.element');
const REACT_PORTAL_TYPE = /* @__PURE__ */ Symbol.for('react.portal');
const REACT_FRAGMENT_TYPE = /* @__PURE__ */ Symbol.for('react.fragment');
const REACT_STRICT_MODE_TYPE = /* @__PURE__ */ Symbol.for('react.strict_mode');
const REACT_PROFILER_TYPE = /* @__PURE__ */ Symbol.for('react.profiler');
const REACT_CONSUMER_TYPE = /* @__PURE__ */ Symbol.for('react.consumer');
const REACT_CONTEXT_TYPE = /* @__PURE__ */ Symbol.for('react.context');
const REACT_FORWARD_REF_TYPE = /* @__PURE__ */ Symbol.for('react.forward_ref');
const REACT_SUSPENSE_TYPE = /* @__PURE__ */ Symbol.for('react.suspense');
const REACT_SUSPENSE_LIST_TYPE = /* @__PURE__ */ Symbol.for('react.suspense_list');
const REACT_MEMO_TYPE = /* @__PURE__ */ Symbol.for('react.memo');
const REACT_LAZY_TYPE = /* @__PURE__ */ Symbol.for('react.lazy');
const REACT_OFFSCREEN_TYPE = /* @__PURE__ */ Symbol.for('react.offscreen');
const REACT_CLIENT_REFERENCE = /* @__PURE__ */ Symbol.for('react.client.reference');

export const ForwardRef = REACT_FORWARD_REF_TYPE;
export const Memo = REACT_MEMO_TYPE;

export function isValidElementType(type: unknown): type is ElementType {
  return typeof type === 'string' ||
    typeof type === 'function' ||
    type === REACT_FRAGMENT_TYPE ||
    type === REACT_PROFILER_TYPE ||
    type === REACT_STRICT_MODE_TYPE ||
    type === REACT_SUSPENSE_TYPE ||
    type === REACT_SUSPENSE_LIST_TYPE ||
    type === REACT_OFFSCREEN_TYPE ||
    (typeof type === 'object' &&
      type !== null &&
      '$$typeof' in type &&
      type !== null &&
      (type.$$typeof === REACT_LAZY_TYPE ||
        type.$$typeof === REACT_MEMO_TYPE ||
        type.$$typeof === REACT_CONTEXT_TYPE ||
        type.$$typeof === REACT_CONSUMER_TYPE ||
        type.$$typeof === REACT_FORWARD_REF_TYPE ||
        type.$$typeof === REACT_CLIENT_REFERENCE ||
        (typeof type === 'object' && type !== null && 'getModuleId' in type && type.getModuleId !== undefined)))
    ? !0
    : !1;
}

function typeOf(object: unknown): symbol | undefined {
  if (typeof object === 'object' && object !== null && '$$typeof' in object) {
    const $$typeof = object.$$typeof;

    if ($$typeof === REACT_ELEMENT_TYPE) {
      if ('type' in object) {
        const type = object.type;

        if (
          type === REACT_FRAGMENT_TYPE ||
          type === REACT_PROFILER_TYPE ||
          type === REACT_STRICT_MODE_TYPE ||
          type === REACT_SUSPENSE_TYPE ||
          type === REACT_SUSPENSE_LIST_TYPE
        ) {
          return type;
        }

        if (type !== null && typeof type === 'object' && '$$typeof' in type) {
          const inner$$typeof = type.$$typeof;
          if (
            inner$$typeof === REACT_CONTEXT_TYPE ||
            inner$$typeof === REACT_FORWARD_REF_TYPE ||
            inner$$typeof === REACT_LAZY_TYPE ||
            inner$$typeof === REACT_MEMO_TYPE ||
            inner$$typeof === REACT_CONSUMER_TYPE
          ) {
            return inner$$typeof;
          }
        }
      }

      return $$typeof;
    }

    if ($$typeof === REACT_PORTAL_TYPE) {
      return $$typeof;
    }
  }

  return undefined;
}

export function isMemo(object: unknown): object is MemoExoticComponent<ComponentType<typeof object>> {
  return typeOf(object) === REACT_MEMO_TYPE;
}

export function isForwardRef(object: unknown): object is ForwardRefExoticComponent<ComponentType<typeof object>> {
  return typeOf(object) === REACT_FORWARD_REF_TYPE;
}

export function isElement(object: unknown): object is ReactElement {
  return (
    typeof object === 'object' && object !== null && '$$typeof' in object && object.$$typeof === REACT_ELEMENT_TYPE
  );
}
