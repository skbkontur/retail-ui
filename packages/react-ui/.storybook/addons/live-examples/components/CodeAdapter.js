import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
var _excluded = ["children"];
import React from 'react';
import { Example } from './Example';
export var CodeAdapter = function CodeAdapter(_ref) {
  var children = _ref.children,
    restProps = _objectWithoutProperties(_ref, _excluded);
  var codeBlockProps = children.props || {};
  return /*#__PURE__*/React.createElement(Example, _extends({}, restProps, {
    code: codeBlockProps.children,
    className: codeBlockProps.className
  }));
};