// @flow

import classNames from 'classnames';
import React from 'react';

import PropTypes from 'prop-types';
import Icon from '../Icon';

import styles from './Pager.less';

export type PagerProps = {
  pagesCount: number,
  currentPage: number,
  onPageChange?: (event: any, pageNumber: number) => void,
  renderHref?: (pageNumber: number) => string,
  renderLabel?: (pageNumber: number) => Node | string,
  nextPageLabel?: Node | string,
  navTooltip?: boolean
};

type State = {
  focusedPageNumber: ?number
};

const elementTypes = {
    pageLink: 1,
    ellipsis: 2,
    nextPageLink: 3
}

type ElementType = 1 | 2 | 3;

const navTooltipTypes = {
    firstPage: 1,
    intermediatePage: 2,
    lastPage: 3
}

type NavTooltipType = 1 | 2 | 3;

type PagerElement = {
    pageNumber?: number,
    disabled?: boolean,
    elementType: ElementType
}

/**
 * Страничная навигация.
 */
export default class Pager extends React.Component {
    static propTypes = {
        /**
         * Общее количество страниц.
         */
        pagesCount: PropTypes.number.isRequired,

        /**
         * Номер текущей страницы. {1, 2,  ..., pagesCount}
         */
        currentPage: PropTypes.number.isRequired,

        /**
         * Вызывается при клике на другую страницу или на ссылку "Дальше".
         */
        onPageChange: PropTypes.func,

        /**
         * Функция для рендера атрибута href, если он нам нужен
         */
        renderHref: PropTypes.func,

        /**
         * Функция для рендера текста, рисуемого на ссылке
         */
        renderLabel: PropTypes.func,

        /**
         * надпись на кнопке следующей страницы
         */
        nextPageLabel: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),

        /**
         * Рисовать ли тултип, о перемещении между страницами по Alt + →/←
         */
        navTooltip: PropTypes.bool
    };

    static defaultProps = {
        onPageChange: () => {},
        renderHref: (pageNumber: number) => "javascript:void(0)",
        renderLabel: (pageNumber: number) => pageNumber.toString(),
        nextPageLabel: (<div>Дальше <span className={styles.nextPageArrow}><Icon name="angle-right" /></span></div>),
        navTooltip: true
    }

    state: State = {
        focusedPageNumber: null
    };

    _moveFocus(right: boolean) {
        const pagesCount = this.props.pagesCount;
        const focusedPageNumber = this.state.focusedPageNumber;

        if (focusedPageNumber === null) {
            return;
        }
        
        const elements: PagerElement[] = this._getElements();

        const focusedIndex = focusedPageNumber === 0
            ? elements.length - 1
            : elements.findIndex((element: PagerElement) => element.pageNumber === focusedPageNumber);

        var nextLinkIndex: number = focusedIndex;
        if (right) {
            do {
                nextLinkIndex = (nextLinkIndex === elements.length - 1) ? 0 : nextLinkIndex + 1;
            } while (elements[nextLinkIndex].disabled)
        } else {
            do {
                nextLinkIndex = nextLinkIndex === 0 ? elements.length - 1 : nextLinkIndex - 1;
            } while (elements[nextLinkIndex].disabled)
        }

        const focusedElement: PagerElement = elements[nextLinkIndex];

        var newFocusedPageNumber =
            (focusedElement.elementType === elementTypes.nextPageLink)
                ? 0
                : focusedElement.pageNumber;

        this.setState({focusedPageNumber: newFocusedPageNumber});
    }

    _moveFocusForward() {
        this._moveFocus(true);
    }

    _moveFocusBackward() {
        this._moveFocus(false);
    }

    _openLink(pageNumber: ?number) {
        const href = this.props.renderHref(pageNumber);
        window.location = href;
        this._handlePageChange(pageNumber);
    }

    _handleKeyDown = (event: SyntheticKeyboardEvent) => {
        const focusedPageNumber = this.state.focusedPageNumber;
        const currentPageNumber = this.props.currentPage;

        if (focusedPageNumber === null) {
            return;
        }

        if (event.key === 'Enter') {
            event.preventDefault();
            if (focusedPageNumber === 0) {
                if (currentPageNumber !== this.props.pagesCount) {
                    this._openLink(currentPageNumber + 1);
                }
            } else {
                this._openLink(focusedPageNumber);
            }
            return;
        }
        if (event.altKey && event.key === 'ArrowRight') {
            event.preventDefault();
            if (currentPageNumber !== this.props.pagesCount) {
                const nextPage = currentPageNumber + 1;
                this._openLink(nextPage);
                this.setState({focusedPageNumber: nextPage});
            }
            return;
        }
        if (event.altKey && event.key === 'ArrowLeft') {
            event.preventDefault();
            if (currentPageNumber !== 1) {
                const prevpage = currentPageNumber - 1
                this._openLink(prevpage);
                this.setState({focusedPageNumber: prevpage});
            }
            return;
        }

        if (event.key === 'ArrowRight') {
            event.preventDefault();
            this._moveFocusForward();
            return;
        }
        if (event.key === 'ArrowLeft') {
            event.preventDefault();
            this._moveFocusBackward();
            return;
        }
    }

    _handleFocus = () => {
        if (this.state.focusedPageNumber === null) {
            this.setState({focusedPageNumber: this.props.currentPage});
        }
    }

    _handleBlur = () => {
        this.setState({focusedPageNumber: null});
    }

    //Возвращает список видимых на экране элементов на основе pagesCount и currentPage
    //Требуется для навигации по ссылкам влево/вправо
    _getElements(): PagerElement[] {
        const { pagesCount, currentPage } = this.props;
        const isLastPage = this.props.currentPage === this.props.pagesCount;
        
        var elements: PagerElement[] = [];

        if (pagesCount <= 7 || currentPage <= 5) {
            for (let i = 1; i < currentPage; i++) {
                const t: ElementType = 1;
                elements.push({ pageNumber: i, elementType: elementTypes.pageLink });
            }
        } else {
            elements.push({ pageNumber: 1, elementType: elementTypes.pageLink });
            elements.push({ elementType: elementTypes.ellipsis, disabled: true });
            let leftBorder = Math.min(currentPage - 2, pagesCount - 4);
            for (let i = leftBorder; i < currentPage; i++) {
                elements.push({ pageNumber: i, elementType: elementTypes.pageLink });
            }
        }

        elements.push({ pageNumber: currentPage, elementType: elementTypes.pageLink });
        
        //Ссылки справа от текущей
        if (pagesCount <= 7 || currentPage > pagesCount - 5) {
            for (let i = currentPage + 1; i <= pagesCount; i++) {
                elements.push({ pageNumber: i, elementType: elementTypes.pageLink });
            }
        } else {
            let rightBorder = Math.max(currentPage + 2, 5);
            for (let i = currentPage + 1; i <= rightBorder; i++) {
                elements.push({ pageNumber: i, elementType: elementTypes.pageLink });
            }
            elements.push({ elementType: elementTypes.ellipsis, disabled: true });
            elements.push({ pageNumber: pagesCount, elementType: elementTypes.pageLink });
        }

        elements.push({ elementType: elementTypes.nextPageLink, disabled: isLastPage });

        return elements;
    }

    _handlePageChange(newPageNumber: ?number) {
        this.props.onPageChange({ target: {value: newPageNumber}}, newPageNumber);
    }

    _handleLinkClick = (linkPageNumber: ?number) => {
        this._handlePageChange(linkPageNumber);
    }

    _handleNextPageLinkClick = () => {
        this._handlePageChange(this.props.currentPage + 1);
    }

    _renderLink(pageNumber: ?number, focused: boolean, isCurrent: boolean) {
        return (
            <PagerLink
                focused={focused}
                href={this.props.renderHref(pageNumber)}
                current={isCurrent}
                onClick={() => { this._handleLinkClick(pageNumber)} }
                navTooltip={
                    (isCurrent && this.props.navTooltip) ?
                    (pageNumber === 1 ? navTooltipTypes.firstPage :
                    (pageNumber === this.props.pagesCount ? navTooltipTypes.lastPage :
                    navTooltipTypes.intermediatePage)) : null }
                key={pageNumber}>
                {this.props.renderLabel(pageNumber)}
            </PagerLink>
        );
    }

    render() {
        const currentPage = this.props.currentPage;
        const focusedPageNumber = this.state.focusedPageNumber;
        const elements: PagerElement[] = this._getElements();

        const items = elements.map((element: PagerElement, index: number, array: PagerElement[]) => {
            let focused =
                (element.elementType === elementTypes.nextPageLink && focusedPageNumber === 0) ||
                (element.elementType === elementTypes.pageLink && focusedPageNumber === element.pageNumber);
            
            switch (element.elementType) {
                case (elementTypes.pageLink): {
                    return this._renderLink(
                        element.pageNumber,
                        focused,
                        element.pageNumber === currentPage
                    );
                }
                case (elementTypes.ellipsis): {
                    return (
                        <div
                            className={styles.ellipsis}
                            key={`el-${index}`}>
                            <Icon name="ellipsis" />
                        </div>);
                }
                default: {
                    let link = (
                        <a
                            href={this.props.renderHref(this.props.currentPage + 1)}
                            className={styles.nextPageLinkLink}
                            tabIndex="-1"
                            onClick={!element.disabled && this._handleNextPageLinkClick}>
                            {this.props.nextPageLabel}
                        </a>);
                    return (
                        <div className={classNames({
                                [styles.nextPageLink]: true,
                                [styles.nextPageLinkDisabled]: element.disabled,
                                [styles.nextPageLinkFocused]: focused,
                            })} key="nextPageLink">
                            {link}
                        </div>
                    );
                }
            }
        });
        
        const inputProps = {
            type: 'checkbox',
            className: styles.input,
            onKeyDown: this._handleKeyDown,
            onFocus: this._handleFocus,
            onBlur: this._handleBlur
        };

        return (
            <div>
                <input {...inputProps} />
                {items}
            </div>
        );
    }
}

type LinkProps = {
    pageNumber: number,
    current: boolean,
    onClick: () => void,
    focused: boolean,
    onFocus: () => void,
    onBlur: () => void,
    onKeyDown: () => void,
    href: string,
    navTooltip: NavTooltipType,
    children: React$Element<any>
}

/**
 * Одна ссылка на страницу.
 */
class PagerLink extends React.Component {
    static propTypes = {
        /**
         * Является ли ссылкой на текущую страницу. По умолчанию False
         */
        current: PropTypes.bool,

        /**
         * Вызывается при клике на ссылку, если она не является текущей
         */
        onClick: PropTypes.func,

        /**
         * Рисовать визуально фокус на ссылке. По умолчанию False
         */
        focused: PropTypes.bool,

        /**
         * Ссылка, на которую перейти при клике
         */
        href: PropTypes.string.isRequired,

        /**
         * Тип тултипа, который рисовать под ссылкой:
         * для первой страницы, для последней, и для всех остальных
         */
        navTooltip: PropTypes.number
    };

    _handleClick(e) {
        this.props.onClick();
    }

    _renderNavTooltip(tooltipType: NavTooltipType) {
        return (
            <div className={styles.navTooltip}>
                <div className={classNames({
                    [styles.navTooltipPart]: true,
                    [styles.navTooltipPartHidden]: tooltipType === navTooltipTypes.firstPage
                    })}>←</div>
                <div className={styles.navTooltipPart}>Alt</div>
                <div className={classNames({
                    [styles.navTooltipPart]: true,
                    [styles.navTooltipPartHidden]: tooltipType === navTooltipTypes.lastPage
                    })}>→</div>
            </div>
        );
    }

    render() {
        const { current, onClick, href, focused, children, ...rest } = this.props
        
        const className = classNames({
            [styles.link]: true,
            [styles.linkCurrent]: current,
            [styles.linkFocused]: focused
        });
        return (
            <div className={className}>
                <a
                    href={href}
                    className={styles.linkLink}
                    tabIndex="-1"
                    onClick={e => this._handleClick(e)}>
                    {children}
                </a>
                {this.props.navTooltip ? this._renderNavTooltip(this.props.navTooltip) : null}
            </div>
        );
    }
}