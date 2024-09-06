import _defineProperty from "@babel/runtime/helpers/defineProperty";
import _asyncToGenerator from "@babel/runtime/helpers/asyncToGenerator";
import _slicedToArray from "@babel/runtime/helpers/slicedToArray";
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
import _regeneratorRuntime from "@babel/runtime/regenerator";
import React, { useState, useEffect, useRef, useMemo } from 'react';
import { LiveProvider, LiveEditor, LivePreview, LiveError } from 'react-live';
import { themes } from 'prism-react-renderer';
import { styled } from '@storybook/theming';
import { extractLanguageFromClassName, detectNoInline, copyToClipboard, uniqId } from './utils';
import { ActionButton } from './ActionButton';
import { ActionBar } from './ActionBar';
import { formatCode, useCode } from './useCode';
import { configValue, getConfig } from '../config';
import { CUSTOM_EVENTS, dispatchCustomEvent } from './events';
var ComponentWrapper = styled.div(function (_ref) {
  var _theme$typography;
  var theme = _ref.theme;
  return "\n    position: relative;\n    overflow: hidden;\n    border: 1px solid ".concat(configValue('borderColor', theme.appBorderColor), ";\n    margin: 25px 0 40px;\n    border-radius: ").concat(configValue('borderRadius', '3px'), ";\n    font-family: ").concat(configValue('fontBase', (_theme$typography = theme.typography) === null || _theme$typography === void 0 ? void 0 : _theme$typography.fonts.base), ";\n    font-size: ").concat(configValue('fontSizeBase', 16), "px;\n  ");
});
var Wrapper = styled.div(function () {
  return "\n    position: relative;\n";
});
var PreviewWrapper = styled.div(function (_ref2) {
  var _theme$background;
  var theme = _ref2.theme;
  return "\n    background-color: ".concat(configValue('bgColor', (_theme$background = theme.background) === null || _theme$background === void 0 ? void 0 : _theme$background.app), ";\n    margin: 0 auto;\n    position: relative;\n");
});
var Preview = styled(LivePreview)(function (_ref3) {
  var _theme$background2;
  var theme = _ref3.theme;
  return "\n    padding: 20px;\n    background-color: ".concat(configValue('previewBgColor', (_theme$background2 = theme.background) === null || _theme$background2 === void 0 ? void 0 : _theme$background2.app), ";\n    box-sizing: border-box;\n    overflow: auto;\n");
});
var LiveEditorWrapper = styled.div(function (_ref4) {
  var _theme$typography2;
  var theme = _ref4.theme,
    live = _ref4.live,
    expanded = _ref4.expanded;
  return "\n    font-size: ".concat(configValue('fontSizeCode', 14), "px;\n\n    border-top: ").concat(live && expanded ? "1px solid ".concat(configValue('borderColor', theme.appBorderColor)) : 0, ";\n\n    & > div {\n        font-family: ").concat(configValue('fontCode', (_theme$typography2 = theme.typography) === null || _theme$typography2 === void 0 ? void 0 : _theme$typography2.fonts.mono), " !important;\n        outline: 0;\n    }\n\n    & textarea,\n    & pre {\n        padding: ").concat(live ? '12px' : '24px 40px 24px 24px', " !important;\n        outline-color: transparent;\n    }\n");
});
var StyledLiveErrors = styled(LiveError)(function (_ref5) {
  var _theme$typography3;
  var theme = _ref5.theme;
  return "\n    font-family: ".concat(configValue('fontCode', (_theme$typography3 = theme.typography) === null || _theme$typography3 === void 0 ? void 0 : _theme$typography3.fonts.mono), ";\n    padding: 10px;\n    margin: 0;\n    background-color: ").concat(configValue('errorsBg', '#feebea'), ";\n    color: ").concat(configValue('errorsColor', '#ef3124'), " !important;\n    border-top: 1px solid ").concat(configValue('borderColor', theme.appBorderColor), ";\n");
});
var FixedButtonContainer = styled.div(function () {
  return "\n    position: absolute;\n    right: 8px;\n    top: 8px;\n    z-index: 1;\n";
});
export var Example = function Example(_ref6) {
  var codeProp = _ref6.code,
    _ref6$expanded = _ref6.expanded,
    expandedProp = _ref6$expanded === void 0 ? false : _ref6$expanded,
    live = _ref6.live,
    className = _ref6.className,
    _ref6$language = _ref6.language,
    language = _ref6$language === void 0 ? extractLanguageFromClassName(className) : _ref6$language,
    scope = _ref6.scope;
  var config = getConfig();
  var _useState = useState(expandedProp || !live),
    _useState2 = _slicedToArray(_useState, 2),
    expanded = _useState2[0],
    setExpanded = _useState2[1];
  var frameRef = useRef();
  var _useCode = useCode({
      initialCode: codeProp,
      live: live,
      language: language
    }),
    code = _useCode.code,
    setCode = _useCode.setCode,
    resetCode = _useCode.resetCode,
    resetKey = _useCode.resetKey,
    setResetKey = _useCode.setResetKey,
    ready = _useCode.ready;
  var _useState3 = useState(false),
    _useState4 = _slicedToArray(_useState3, 2),
    storyLoaded = _useState4[0],
    setStoryLoaded = _useState4[1];
  var exampleId = useMemo(function () {
    return uniqId();
  }, []);
  var handleCopy = function handleCopy(value) {
    copyToClipboard(value);
  };
  var handleChange = function handleChange(value) {
    setCode(value.trim());
  };
  var handleBlur = /*#__PURE__*/function () {
    var _ref7 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee() {
      return _regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            _context.t0 = setCode;
            _context.next = 3;
            return formatCode(code);
          case 3:
            _context.t1 = _context.sent;
            (0, _context.t0)(_context.t1);
            setResetKey(+new Date());
          case 6:
          case "end":
            return _context.stop();
        }
      }, _callee);
    }));
    return function handleBlur() {
      return _ref7.apply(this, arguments);
    };
  }();
  useEffect(function () {
    var handler = function handler(ev) {
      if (ev.data.exampleId === exampleId.toString()) {
        setStoryLoaded(true);
      }
    };
    window.addEventListener('message', handler);
    return function () {
      return window.removeEventListener('message', handler);
    };
  }, []);
  useEffect(function () {
    if (frameRef.current) {
      frameRef.current.contentWindow.postMessage({
        code: code,
        resetKey: resetKey
      });
    }
  }, [code, storyLoaded, resetKey]);
  if (!ready) return null;
  var showEditor = ready && expanded;
  var showErrors = ready && live;
  var renderActions = function renderActions() {
    if (!live) return null;
    if (live) {
      return /*#__PURE__*/React.createElement(ActionBar, {
        "data-role": "action-bar"
      }, /*#__PURE__*/React.createElement(ActionBar.Item, {
        right: true
      }, /*#__PURE__*/React.createElement(ActionButton, {
        icon: configValue('expandIcon', function () {
          return /*#__PURE__*/React.createElement("span", null, "expand");
        }),
        onClick: function onClick() {
          setExpanded(!expanded);
          dispatchCustomEvent(CUSTOM_EVENTS.SHOW_SOURCE_CODE, {
            shown: !expanded
          });
        },
        title: configValue('expandText', 'Expand code'),
        active: expanded
      }), /*#__PURE__*/React.createElement(ActionButton, {
        icon: configValue('copyIcon', function () {
          return /*#__PURE__*/React.createElement("span", null, "copy");
        }),
        onClick: function onClick() {
          handleCopy(code);
          dispatchCustomEvent(CUSTOM_EVENTS.COPY);
        },
        title: configValue('copyText', 'Copy code'),
        doneTitle: configValue('copiedText', 'Code copied')
      }), /*#__PURE__*/React.createElement(ActionButton, {
        icon: configValue('resetIcon', function () {
          return /*#__PURE__*/React.createElement("span", null, "reset");
        }),
        onClick: resetCode,
        title: configValue('resetText', 'Reset code')
      })));
    }
    return /*#__PURE__*/React.createElement(FixedButtonContainer, null, /*#__PURE__*/React.createElement(ActionButton, {
      icon: configValue('copyIcon', function () {
        return /*#__PURE__*/React.createElement("span", null, "copy");
      }),
      onClick: function onClick() {
        handleCopy(code);
        dispatchCustomEvent(CUSTOM_EVENTS.COPY);
      },
      title: configValue('copyText', 'copy code'),
      doneTitle: configValue('copiedText', 'Code copied')
    }));
  };
  return /*#__PURE__*/React.createElement(ComponentWrapper, {
    "data-role": "wrapper",
    className: "sb-unstyled"
  }, /*#__PURE__*/React.createElement(LiveProvider, {
    code: code || 'render(null)',
    noInline: detectNoInline(code),
    theme: config.editorTheme || themes.github,
    scope: _objectSpread(_objectSpread({}, config.scope), scope)
  }, /*#__PURE__*/React.createElement(Wrapper, {
    "data-role": "code-wrapper"
  }, live && /*#__PURE__*/React.createElement(PreviewWrapper, {
    "data-role": "preview-wrapper"
  }, /*#__PURE__*/React.createElement(Preview, {
    "data-role": "preview"
  })), renderActions()), showEditor && /*#__PURE__*/React.createElement(LiveEditorWrapper, {
    live: live,
    expanded: true,
    onBlur: handleBlur
  }, /*#__PURE__*/React.createElement(LiveEditor, {
    className: "live-examples-addon-editor",
    onChange: handleChange,
    language: language,
    disabled: !live,
    key: resetKey,
    "data-role": "editor"
  })), showErrors && /*#__PURE__*/React.createElement(StyledLiveErrors, {
    "data-role": "errors"
  })));
};