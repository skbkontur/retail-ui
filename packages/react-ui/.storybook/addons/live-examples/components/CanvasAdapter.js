import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
var _excluded = ["mdxSource"];
import React from 'react';
import { Example } from './Example';
export var CanvasAdapter = function CanvasAdapter(_ref) {
  var mdxSource = _ref.mdxSource,
    restProps = _objectWithoutProperties(_ref, _excluded);
  return /*#__PURE__*/React.createElement(Example, _extends({
    code: decodeURIComponent(mdxSource)
  }, restProps));
};