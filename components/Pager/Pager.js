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
  renderNextPagelabel?: () => Node | string,
  navTooltip?: boolean
};

type State = {
  focusedPageNumber?: number
};

const ElementTypeEnum = {
    pageLink: 1,
    ellipsis: 2,
    nextPageLink: 3
}

const NavTooltipTypeEnum = {
    firstPage: 1,
    intermediatePage: 2,
    lastPage: 3
}

type PagerElement = {
    pageNumber?: number,
    disabled?: boolean,
    elementType: ElementTypeEnum
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
         * Аналогично предыдущему, только для ссылки "Дальше"
         */
        renderNextPagelabel: PropTypes.func,

        /**
         * Рисовать ли тултип, о перемещении между страницами по Alt + →/←
         */
        navTooltip: PropTypes.bool
    };

    constructor(props: Props) {
        super(props);

        this.state = { focusedPageNumber: null };

        this._handleKeyDown = this._handleKeyDown.bind(this);
        this._handleFocus = this._handleFocus.bind(this);
        this._handleBlur = this._handleBlur.bind(this);
        this._handleLinkClick = this._handleLinkClick.bind(this);
        this._handleNextPageLinkClick = this._handleNextPageLinkClick.bind(this);
    }

    static defaultProps = {
        onPageChange: () => {},
        renderHref: (pageNumber: number) => "javascript:void(0)",
        renderLabel: (pageNumber: number) => pageNumber.toString(),
        renderNextPagelabel: () => (<div>Дальше <span className={styles.nextPageArrow}><Icon name="angle-right" /></span></div>),
        navTooltip: true
    }

    _moveFocus(right: boolean) {
        const pagesCount = this.props.pagesCount;
        const focusedPageNumber = this.state.focusedPageNumber;

        if (focusedPageNumber === null)
            return;

        
        const elements: PagerElement[] = this._getElements();

        const focusedIndex = focusedPageNumber === 0 ?
            elements.length - 1 : 
            elements.findIndex((element: PagerElement) => element.pageNumber === focusedPageNumber);

        var nextLinkIndex: number;
        if (right) {
            nextLinkIndex = focusedIndex === elements.length - 1 ?
                0 : focusedIndex + 1;
            while (elements[nextLinkIndex].disabled) {
                nextLinkIndex = nextLinkIndex === elements.length - 1 ?
                0 : nextLinkIndex + 1;
            }
        } else {
            nextLinkIndex = focusedIndex === 0 ?
                elements.length - 1 : focusedIndex - 1;
            
            while (elements[nextLinkIndex].disabled) {
                nextLinkIndex = nextLinkIndex === 0 ?
                    elements.length - 1 : nextLinkIndex - 1;
            }
        }

        const focusedElement: PagerElement = elements[nextLinkIndex];

        var newFocusedPageNumber =
            focusedElement.elementType === ElementTypeEnum.nextPageLink ?
                0 : focusedElement.pageNumber;

        this.setState({focusedPageNumber: newFocusedPageNumber});
    }

    _openLink(pageNumber: number) {
        if (pageNumber === 0) {
            if (this.props.currentPage === this.props.pagesCount)
                return;
            pageNumber = this.props.currentPage + 1;
        }
        const href = this.props.renderHref(pageNumber);
        window.location = href;
        this._handlePageChange(pageNumber);
        this.setState({focusedPageNumber: pageNumber});
    }

    _handleKeyDown(event: SyntheticKeyboardEvent) {
        const focusedPageNumber = this.state.focusedPageNumber;
        const currentPageNumber = this.props.currentPage;

        if (focusedPageNumber === null) {
            return;
        }

        if (event.key === 'Enter') {
            event.preventDefault();
            this._openLink(focusedPageNumber);
            return;
        }
        if (event.altKey && event.key === 'ArrowRight') {
            event.preventDefault();
            if (currentPageNumber !== this.props.pagesCount)
                this._openLink(currentPageNumber + 1);
            return;
        }
        if (event.altKey && event.key === 'ArrowLeft') {
            event.preventDefault();
            if (currentPageNumber !== 1)
                this._openLink(currentPageNumber - 1);
            return;
        }

        if (event.key === 'ArrowRight') {
            event.preventDefault();
            this._moveFocus(true);
            return;
        }
        if (event.key === 'ArrowLeft') {
            event.preventDefault();
            this._moveFocus(false);
            return;
        }
    }

    _handleFocus() {
        if (this.state.focusedPageNumber === null)
            this.setState({focusedPageNumber: this.props.currentPage});
    }

    _handleBlur() {
        this.setState({focusedPageNumber: null});
    }

    //Возвращает список видимых на экране элементов на основе pagesCount и currentPage
    //Требуется для навигации по ссылкам влево/вправо
    _getElements(): PagerElement[] {
        const { pagesCount, currentPage } = this.props;
        const isLastPage = this.props.currentPage === this.props.pagesCount;
        
        var elements: PagerElement[] = [];

        if (currentPage < 6) {
            for (let i = 1; i < currentPage; i++) {
                elements.push({ pageNumber: i, elementType: ElementTypeEnum.pageLink });
            }
        } else {
            elements.push({ pageNumber: 1, elementType: ElementTypeEnum.pageLink });
            elements.push({ elementType: ElementTypeEnum.ellipsis, disabled: true });
            let leftBorder = Math.min(currentPage - 2, pagesCount - 4);
            for (let i = leftBorder; i < currentPage; i++) {
                elements.push({ pageNumber: i, elementType: ElementTypeEnum.pageLink });
            }
        }

        elements.push({ pageNumber: currentPage, elementType: ElementTypeEnum.pageLink });
        
        //Ссылки справа от текущей
        if (currentPage > pagesCount - 5) {
            for (let i = currentPage + 1; i <= pagesCount; i++) {
                elements.push({ pageNumber: i, elementType: ElementTypeEnum.pageLink });
            }
        } else {
            let rightBorder = Math.max(currentPage + 2, 5);
            for (let i = currentPage + 1; i <= rightBorder; i++) {
                elements.push({ pageNumber: i, elementType: ElementTypeEnum.pageLink });
            }
            elements.push({ elementType: ElementTypeEnum.ellipsis, disabled: true });
            elements.push({ pageNumber: pagesCount, elementType: ElementTypeEnum.pageLink });
        }

        elements.push({ elementType: ElementTypeEnum.nextPageLink, disabled: isLastPage });

        return elements;
    }

    _handlePageChange(newPageNumber: number) {
        this.props.onPageChange({ target: {value: newPageNumber}}, newPageNumber);
        this._input.focus();
    }

    _handleLinkClick(linkPageNumber: number) {
        this._handlePageChange(linkPageNumber);
        this.setState({focusedPageNumber: linkPageNumber});
    }

    _handleNextPageLinkClick() {
        this._handlePageChange(this.props.currentPage + 1);
        this.setState({focusedPageNumber: 0});
    }

    _renderLink(pageNumber: number, elementIndex: number, isFocused: boolean, isCurrent: boolean) {
        return (
            <PagerLink
                focused={isFocused}
                href={this.props.renderHref(pageNumber)}
                current={isCurrent}
                onClick={() => { this._handleLinkClick(pageNumber)} }
                navTooltip={
                    (isCurrent && this.props.navTooltip) ?
                    (pageNumber === 1 ? NavTooltipTypeEnum.firstPage :
                    (pageNumber === this.props.pagesCount ? NavTooltipTypeEnum.lastPage :
                    NavTooltipTypeEnum.intermediatePage)) : null }
                key={pageNumber}>
                {this.props.renderLabel(pageNumber)}
            </PagerLink>
        );
    }

    render() {
        const currentPage = this.props.currentPage;
        const focusedPageNumber = this.state.focusedPageNumber;
        const elements: PagerElement[] = this._getElements();

        const items = elements.map((element: PagerElement, index: number, array: number[]) => {
            let isFocused =
                (element.elementType === ElementTypeEnum.nextPageLink && focusedPageNumber === 0) ||
                (element.elementType === ElementTypeEnum.pageLink && focusedPageNumber === element.pageNumber);
            if (element.elementType === ElementTypeEnum.pageLink) {
                const isNext =
                    (currentPage === this.props.pagesCount && element.pageNumber === 1) ||
                    (element.pageNumber === currentPage + 1);
                const isPrevious =
                    (currentPage === 1 && element.pageNumber === this.props.pagesCount) ||
                    (element.pageNumber === currentPage - 1);

                let link = this._renderLink(
                    element.pageNumber, 
                    index,
                    isFocused,
                    element.pageNumber === currentPage,
                    isNext,
                    isPrevious
                    );
                return link;
            } else if (element.elementType === ElementTypeEnum.ellipsis) {
                return (
                    <div
                        className={styles.ellipsis}
                        key={`el-${index}`}>
                        <Icon name="ellipsis" />
                    </div>);
            } else {
                let link = (
                    <a
                        href={this.props.renderHref(this.props.currentPage + 1)}
                        className={classNames({
                            [styles.nextPageLink]: true,
                            [styles.nextPageLinkDisabled]: element.disabled,
                            [styles.nextPageLinkFocused]: isFocused,
                        })}
                        tabIndex="-1"
                        onClick={!element.disabled && this._handleNextPageLinkClick}>
                        {this.props.renderNextPagelabel()}
                    </a>);
                return (
                    <div className={styles.nextPageLinkWrapper} key="nextPageLinkWrapper">
                        {link}
                    </div>
                );
            }
        });
        
        const inputProps = {
            ref: (node) => { this._input = node},
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
    navTooltip: NavTooltipTypeEnum
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

    constructor(props: LinkProps) {
        super(props);

        this._handleClick = this._handleClick.bind(this);
    }

    _handleClick(e) {
        this.props.onClick();
    }

    _renderNavTooltip(tooltipType: NavTooltipTypeEnum) {
        return (
            <div className={styles.navTooltip}>
                <div className={classNames({
                    [styles.navTooltipPart]: true,
                    [styles.navTooltipPartHidden]: tooltipType === NavTooltipTypeEnum.firstPage
                    })}>←</div>
                <div className={styles.navTooltipPart}>Alt</div>
                <div className={classNames({
                    [styles.navTooltipPart]: true,
                    [styles.navTooltipPartHidden]: tooltipType === NavTooltipTypeEnum.lastPage
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
                    onClick={this._handleClick}>
                    {children}
                </a>
                {this.props.navTooltip ? this._renderNavTooltip(this.props.navTooltip) : null}
            </div>
        );
    }
}