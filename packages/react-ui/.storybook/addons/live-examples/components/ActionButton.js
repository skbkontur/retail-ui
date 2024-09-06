import _extends from "@babel/runtime/helpers/extends";
import _defineProperty from "@babel/runtime/helpers/defineProperty";
import _slicedToArray from "@babel/runtime/helpers/slicedToArray";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
var _excluded = ["icon"],
  _excluded2 = ["icon", "onClick", "active", "title", "doneTitle", "toastProps"];
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
import { styled } from '@storybook/theming';
import React, { forwardRef, useState } from 'react';
import { configValue } from '../config';
var IconButton = function IconButton(_ref) {
  var Icon = _ref.icon,
    rest = _objectWithoutProperties(_ref, _excluded);
  return /*#__PURE__*/React.createElement("button", rest, /*#__PURE__*/React.createElement(Icon, null));
};
var Button = styled(IconButton)(function (_ref2) {
  var theme = _ref2.theme;
  return "\n    \n    all: unset;\n    padding: 8px;\n    \n    &.active {\n      color: ".concat(configValue('iconColor', '#000'), ";\n    }\n    \n    &:hover{\n      cursor: pointer;\n    }\n    \n");
});
var Toast = function Toast(props) {
  return null;
};
export var ActionButton = /*#__PURE__*/forwardRef(function (_ref3, ref) {
  var icon = _ref3.icon,
    onClick = _ref3.onClick,
    active = _ref3.active,
    title = _ref3.title,
    doneTitle = _ref3.doneTitle,
    toastProps = _ref3.toastProps,
    restProps = _objectWithoutProperties(_ref3, _excluded2);
  var _useState = useState(false),
    _useState2 = _slicedToArray(_useState, 2),
    open = _useState2[0],
    setOpen = _useState2[1];
  var handleClick = function handleClick() {
    if (doneTitle) setOpen(true);
    onClick();
  };
  return /*#__PURE__*/React.createElement(React.Fragment, null, doneTitle && /*#__PURE__*/React.createElement(Toast, _extends({
    open: open,
    position: "bottom-end",
    offset: [0, 100],
    badge: null,
    title: doneTitle,
    hasCloser: false,
    block: false,
    onClose: function onClose() {
      return setOpen(false);
    },
    autoCloseDelay: 1500
  }, toastProps, {
    style: _objectSpread({
      left: '50%',
      transform: 'translateX(-50%)'
    }, toastProps === null || toastProps === void 0 ? void 0 : toastProps.style)
  })), /*#__PURE__*/React.createElement(Button, _extends({
    icon: icon,
    onClick: handleClick,
    className: active && 'active',
    ref: ref,
    title: title
  }, restProps)));
});