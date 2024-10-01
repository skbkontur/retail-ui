import React, { useLayoutEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
var getContainer = function getContainer(id) {
  return document.getElementById("anchor--".concat(id)) || document.getElementById("story--".concat(id));
};
export var CanvasReplacer = function CanvasReplacer(_ref) {
  var children = _ref.children,
    id = _ref.id;
  var containerRef = useRef(getContainer(id));
  useLayoutEffect(function () {
    if (containerRef.current) {
      var defaultCanvas = containerRef.current.querySelector('.sbdocs-preview');
      if (defaultCanvas) {
        defaultCanvas.setAttribute('style', 'display: none');
      }
    } else {
      containerRef.current = getContainer(id);
    }
  }, []);
  if (!containerRef.current) return null;
  if (document.getElementById(id)) {
    // try fix for multiple render example
    return null;
  }
  return /*#__PURE__*/ReactDOM.createPortal( /*#__PURE__*/React.createElement("div", {
    id: id,
    key: id
  }, children), containerRef.current, id);
};