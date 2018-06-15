/* @ts-ignore */
/* tslint:disable */
// imported from https://github.com/Financial-Times/polyfill-service

export default (function(): (
  elt: Element,
  pseudoElt?: string | null | undefined
) => CSSStyleDeclaration {
  if (document.defaultView && document.defaultView.getComputedStyle) {
    return document.defaultView.getComputedStyle.bind(document.defaultView);
  }

  // @ts-ignore
  function getComputedStylePixel(element, property, fontSize) {
    var // Internet Explorer sometimes struggles to read currentStyle until the element's document is accessed.
      value = (element.document &&
        element.currentStyle[property].match(
          /([\d\.]+)(%|cm|em|in|mm|pc|pt|)/
        )) || [0, 0, ''],
      size = value[1],
      suffix = value[2],
      rootSize;

    fontSize = !fontSize
      ? fontSize
      : /%|em/.test(suffix) && element.parentElement
        ? getComputedStylePixel(element.parentElement, 'fontSize', null)
        : 16;
    rootSize =
      property == 'fontSize'
        ? fontSize
        : /width/i.test(property)
          ? element.clientWidth
          : element.clientHeight;

    return suffix == '%'
      ? (size / 100) * rootSize
      : suffix == 'cm'
        ? size * 0.3937 * 96
        : suffix == 'em'
          ? size * fontSize
          : suffix == 'in'
            ? size * 96
            : suffix === 'mm'
              ? (size * 0.3937 * 96) / 10
              : suffix == 'pc'
                ? (size * 12 * 96) / 72
                : suffix == 'pt'
                  ? (size * 96) / 72
                  : size;
  }

  // @ts-ignore
  function setShortStyleProperty(style, property) {
    var borderSuffix = property == 'border' ? 'Width' : '',
      t = property + 'Top' + borderSuffix,
      r = property + 'Right' + borderSuffix,
      b = property + 'Bottom' + borderSuffix,
      l = property + 'Left' + borderSuffix;

    style[property] = (style[t] == style[r] &&
    style[t] == style[b] &&
    style[t] == style[l]
      ? [style[t]]
      : style[t] == style[b] && style[l] == style[r]
        ? [style[t], style[r]]
        : style[l] == style[r]
          ? [style[t], style[r], style[b]]
          : [style[t], style[r], style[b], style[l]]
    ).join(' ');
  }

  // <CSSStyleDeclaration>
  // @ts-ignore
  function CSSStyleDeclaration(element) {
    // @ts-ignore
    let style = this,
      currentStyle = element.currentStyle,
      // @ts-ignore
      fontSize = getComputedStylePixel(element, 'fontSize'),
      // @ts-ignore
      unCamelCase = function(match) {
        return '-' + match.toLowerCase();
      },
      property;

    for (property in currentStyle) {
      Array.prototype.push.call(
        style,
        property == 'styleFloat'
          ? 'float'
          : property.replace(/[A-Z]/, unCamelCase)
      );

      if (property == 'width') {
        style[property] = element.offsetWidth + 'px';
      } else if (property == 'height') {
        style[property] = element.offsetHeight + 'px';
      } else if (property == 'styleFloat') {
        style.float = currentStyle[property];
      } else if (
        /margin.|padding.|border.+W/.test(property) &&
        style[property] != 'auto'
      ) {
        style[property] =
          Math.round(getComputedStylePixel(element, property, fontSize)) + 'px';
      } else if (/^outline/.test(property)) {
        // errors on checking outline
        try {
          style[property] = currentStyle[property];
        } catch (error) {
          style.outlineColor = currentStyle.color;
          style.outlineStyle = style.outlineStyle || 'none';
          style.outlineWidth = style.outlineWidth || '0px';
          style.outline = [
            style.outlineColor,
            style.outlineWidth,
            style.outlineStyle
          ].join(' ');
        }
      } else {
        style[property] = currentStyle[property];
      }
    }

    setShortStyleProperty(style, 'margin');
    setShortStyleProperty(style, 'padding');
    setShortStyleProperty(style, 'border');

    style.fontSize = Math.round(fontSize) + 'px';
  }

  CSSStyleDeclaration.prototype = {
    constructor: CSSStyleDeclaration,
    // <CSSStyleDeclaration>.getPropertyPriority
    getPropertyPriority() {
      throw new Error('NotSupportedError: DOM Exception 9');
    },
    // <CSSStyleDeclaration>.getPropertyValue
    // @ts-ignore
    getPropertyValue(property) {
      return this[
        // @ts-ignore
        property.replace(/-\w/g, function(match) {
          return match[1].toUpperCase();
        })
      ];
    },
    // <CSSStyleDeclaration>.item
    // @ts-ignore
    item(index) {
      return this[index];
    },
    // <CSSStyleDeclaration>.removeProperty
    removeProperty() {
      throw new Error('NoModificationAllowedError: DOM Exception 7');
    },
    // <CSSStyleDeclaration>.setProperty
    setProperty() {
      throw new Error('NoModificationAllowedError: DOM Exception 7');
    },
    // <CSSStyleDeclaration>.getPropertyCSSValue
    getPropertyCSSValue() {
      throw new Error('NotSupportedError: DOM Exception 9');
    }
  };
  // @ts-ignore
  return function getComputedStyle(element) {
    // @ts-ignore
    return new CSSStyleDeclaration(element);
  };
})();
