import _slicedToArray from "@babel/runtime/helpers/slicedToArray";
import _asyncToGenerator from "@babel/runtime/helpers/asyncToGenerator";
import _regeneratorRuntime from "@babel/runtime/regenerator";
import { useEffect, useRef, useState } from 'react';
import { format } from 'prettier/standalone';
import * as prettierPluginBabel from 'prettier/plugins/babel';
import * as prettierPluginEstree from 'prettier/plugins/estree';
import { transpileTs } from './utils';
import { CUSTOM_EVENTS, dispatchCustomEvent } from './events';
var CHUNK_SEPARATOR = /^\s*(?:@|\/\/)MOBILE@?/m;
export var formatCode = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee(code) {
    return _regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return format(code, {
            parser: 'babel',
            plugins: [prettierPluginBabel, prettierPluginEstree]
          });
        case 2:
          return _context.abrupt("return", _context.sent);
        case 3:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return function formatCode(_x) {
    return _ref.apply(this, arguments);
  };
}();
var transpile = function transpile(code) {
  return transpileTs(code).then(function (jsCode) {
    return formatCode(jsCode).then(function (code) {
      return code;
    });
  });
};
export function useCode(_ref2) {
  var initialCode = _ref2.initialCode,
    live = _ref2.live,
    language = _ref2.language;
  var _useState = useState(false),
    _useState2 = _slicedToArray(_useState, 2),
    ready = _useState2[0],
    setReady = _useState2[1];
  var needsTranspile = live && ['typescript', 'tsx'].includes(language);
  var _useState3 = useState(+new Date()),
    _useState4 = _slicedToArray(_useState3, 2),
    resetKey = _useState4[0],
    setResetKey = _useState4[1];
  var _useState5 = useState(''),
    _useState6 = _slicedToArray(_useState5, 2),
    commonCode = _useState6[0],
    setCommonCode = _useState6[1];
  var initialCodeRef = useRef();
  var reset = function reset() {
    setResetKey(+new Date());
    dispatchCustomEvent(CUSTOM_EVENTS.REFRESH);
  };
  var prepareCode = /*#__PURE__*/function () {
    var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee2() {
      return _regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) switch (_context2.prev = _context2.next) {
          case 0:
            initialCodeRef.current = initialCode;
            _context2.next = 3;
            return Promise.all(initialCode.split(CHUNK_SEPARATOR).map(function (s) {
              return s.trim();
            }).map(function (codeChunk) {
              return needsTranspile ? transpile(codeChunk) : codeChunk;
            })).then(function (_ref4) {
              var _ref5 = _slicedToArray(_ref4, 1),
                _ref5$ = _ref5[0],
                commonCode = _ref5$ === void 0 ? '' : _ref5$;
              setCommonCode(commonCode);
              setReady(true);
            });
          case 3:
          case "end":
            return _context2.stop();
        }
      }, _callee2);
    }));
    return function prepareCode() {
      return _ref3.apply(this, arguments);
    };
  }();
  useEffect(function () {
    prepareCode();
  }, []);
  var code = commonCode;
  var setCode = setCommonCode;
  var resetCode = function resetCode() {
    reset();
    setCommonCode(initialCodeRef.current);
  };
  return {
    code: code,
    setCode: setCode,
    resetCode: resetCode,
    resetKey: resetKey,
    setResetKey: setResetKey,
    ready: ready
  };
}