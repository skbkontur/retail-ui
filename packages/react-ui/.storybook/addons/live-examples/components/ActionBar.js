import _taggedTemplateLiteral from "@babel/runtime/helpers/taggedTemplateLiteral";
var _templateObject;
import { styled } from '@storybook/theming';
import React from 'react';
import { configValue } from '../config';
var ItemWrapper = styled.div(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n    display: flex;\n    justify-content: space-between;\n    align-items: center;\n\n    ", "\n"])), function (props) {
  return props.right && "margin-left: auto;";
});
export var Item = function Item(_ref) {
  var children = _ref.children,
    right = _ref.right;
  return /*#__PURE__*/React.createElement(ItemWrapper, {
    right: right
  }, children);
};
var Wrapper = styled.div(function (_ref2) {
  var _theme$background;
  var theme = _ref2.theme;
  return "\n        display: flex;\n        justify-content: flex-start;\n        align-items: center;\n        background-color: ".concat(configValue('previewBgColor', (_theme$background = theme.background) === null || _theme$background === void 0 ? void 0 : _theme$background.app), ";\n        border-top: 1px solid ").concat(configValue('borderColor', theme.appBorderColor), ";\n    ");
});
var RightAddons = styled.div(function (_ref3) {
  var theme = _ref3.theme;
  return "\n        position: relative;\n\n        &::before {\n            content: '';\n            display: block;\n            transform: translateY(-50%);\n            top: 50%;\n            left: 0;\n            height: 24px;\n            width: 1px;\n            background: ".concat(configValue('borderColor', theme.appBorderColor), ";\n            position: absolute;\n        }\n    ");
});
export var ActionBarComponent = function ActionBarComponent(_ref4) {
  var rightAddons = _ref4.rightAddons,
    children = _ref4.children;
  return /*#__PURE__*/React.createElement(Wrapper, null, children, rightAddons && /*#__PURE__*/React.createElement(RightAddons, null, rightAddons));
};
export var ActionBar = Object.assign(ActionBarComponent, {
  Item: Item
});