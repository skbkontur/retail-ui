'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _markdown = require('markdown');

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _toArray(arr) { return Array.isArray(arr) ? arr : Array.from(arr); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Renderer = function () {
    function Renderer() {
        _classCallCheck(this, Renderer);
    }

    _createClass(Renderer, [{
        key: 'renderContent',
        value: function renderContent(content) {
            var _this = this;

            return content.map(function (x) {
                return _this.renderTree(x);
            }).join('\n');
        }
    }, {
        key: 'splitTree',
        value: function splitTree(tree) {
            var _tree = _toArray(tree),
                type = _tree[0],
                attrs = _tree[1],
                content = _tree.slice(2);

            if (Array.isArray(attrs)) {
                return { type: type, attrs: {}, content: [attrs].concat(_toConsumableArray(content)) };
            }
            if ((typeof attrs === 'undefined' ? 'undefined' : _typeof(attrs)) === 'object') {
                return { type: type, attrs: attrs, content: content };
            }
            return { type: type, attrs: {}, content: [attrs].concat(_toConsumableArray(content)) };
        }
    }, {
        key: 'renderTree',
        value: function renderTree(tree) {
            if (typeof tree === 'string') {
                return '{`' + tree + '`}';
            }

            var _splitTree = this.splitTree(tree),
                type = _splitTree.type,
                attrs = _splitTree.attrs,
                content = _splitTree.content;

            switch (type) {
                case 'markdown':
                    return this.renderContent(content);
                case 'header':
                    var level = attrs.level;

                    return '<h' + level + '>' + this.renderContent(content) + ('</h' + level + '>');
                case 'para':
                    return '<p>' + this.renderContent(content) + '</p>';
                case 'code_block':
                    return '<Code>{`' + content + '`}</Code>';
                case 'link':
                    var result = '<Link';
                    if (attrs.alt) {
                        result += ' alt={`' + attrs.alt + '`}';
                    }
                    if (attrs.href) {
                        result += ' href={`' + attrs.href + '`}';
                    }
                    result += '>';
                    result += this.renderContent(content) + '</Link>';
                    return result;
                case 'img':
                    return '<img alt={`' + attrs.alt + '`} src={`' + attrs.href + '`} />';
                case 'bulletlist':
                    return '<ul>' + this.renderContent(content) + '</ul>';
                case 'listitem':
                    return '<li>' + this.renderContent(content) + '</li>';
                case 'strong':
                    return '<strong>' + this.renderContent(content) + '</strong>';
                case 'numberlist':
                    return '<ol>' + this.renderContent(content) + '</ol>';
                case 'inlinecode':
                    return '<InlineCode>{`' + content + '`}</InlineCode>';
                case 'linebreak':
                case 'link_ref':
                case 'img_ref':
                    return '<h1 style={{ color: \'red\' }}>' + type + ' not supported</h1>';
                default:
                    return '<' + type + '>' + this.renderContent(content) + ('</' + type + '>');
            }
        }
    }]);

    return Renderer;
}();

module.exports = function (content) {
    var markdownTree = _markdown.markdown.parse(content);
    var renderer = new Renderer();
    var result = renderer.renderTree(markdownTree);
    var header = '';
    if (markdownTree[1] && markdownTree[1][0] === 'header' && markdownTree[1][1].level === 1) {
        header = '<Helmet title={`' + markdownTree[1][2] + '`} />';
    }

    return '\nimport React from \'react\';\nimport Helmet from \'react-helmet\';\nimport Code from \'react-syntax-highlighter\';\nimport Link from \'retail-ui/components/Link\';\nimport styled from \'styled-components\';\n\nconst InlineCode = styled.span`\n    font-family: Consolas, monospace;\n    background-color: rgb(240, 240, 240);\n    font-size: 90%;\n`;\n\nexport default class GettingStarted extends React.Component {\n    render(): React.Element<*> {\n        return (\n            <div>\n                ' + header + '\n                ' + result + '\n            </div>\n        );\n    }\n}';
};
