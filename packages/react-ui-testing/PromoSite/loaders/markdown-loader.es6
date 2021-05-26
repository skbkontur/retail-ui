import { markdown } from 'markdown';

class Renderer {
    renderContent(content) {
        return content.map((x) => this.renderTree(x)).join('\n');
    }

    splitTree(tree) {
        const [type, attrs, ...content] = tree;
        if (Array.isArray(attrs)) {
            return { type, attrs: {}, content: [attrs, ...content] };
        }
        if (typeof attrs === 'object') {
            return { type: type, attrs: attrs, content: content };
        }
        return { type, attrs: {}, content: [attrs, ...content] };
    }

    renderTree(tree) {
        if (typeof tree === 'string') {
            return '{`' + tree + '`}';
        }
        const { type, attrs, content } = this.splitTree(tree);
        switch (type) {
            case 'markdown':
                return this.renderContent(content);
            case 'header': {
                const { level } = attrs;
                return `<Header level={${level}}>` + this.renderContent(content) + '</Header>';
            }
            case 'para':
                return '<p>' + this.renderContent(content) + '</p>';
            case 'code_block':
                return '<Code>{`' + content[0] + '`}</Code>';
            case 'link': {
                let result = '<Link';
                if (attrs.alt) {
                    result += ' alt={`' + attrs.alt + '`}';
                }
                if (attrs.href) {
                    result += ' href={`' + attrs.href + '`}';
                }
                result += '>';
                result += this.renderContent(content) + '</Link>';
                return result;
            }
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
                return `<h1 style={{ color: 'red' }}>${type} not supported</h1>`;
            default:
                return `<${type}>` + this.renderContent(content) + `</${type}>`;
        }
    }
}

module.exports = function (content) {
    const markdownTree = markdown.parse(content);
    const renderer = new Renderer();
    const result = renderer.renderTree(markdownTree);
    let header = '';
    if (markdownTree[1] && markdownTree[1][0] === 'header' && markdownTree[1][1].level === 1) {
        header = '<Helmet title={`' + markdownTree[1][2] + '`} />';
    }

    return `
import React from 'react';
import Helmet from 'react-helmet';
import Code from 'react-syntax-highlighter';
import { Link } from 'retail-ui/components/Link';
import styled from 'styled-components';

const InlineCode = styled.span\`
    font-family: Consolas, monospace;
    background-color: rgb(240, 240, 240);
    font-size: 90%;
\`;

function Header({ level, children }) {
    const HeaderTag = 'h' + level;
    return (
        <HeaderTag>
            {children}
        </HeaderTag>
    );
}

export default class GettingStarted extends React.Component {
    render() {
        return (
            <div>
                ${header}
                ${result}
            </div>
        );
    }
}`;
};
