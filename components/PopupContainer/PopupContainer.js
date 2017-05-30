import React, { Component } from 'react';
import Portal from '../Portal';

import styles from './PopupContainer.less';

const MARGIN = 10;

export default class PopupContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            offsetHeight: 0, 
            offsetWidth: 0
        }
    }

    componentDidMount() {
        //получаем размер эелемента, на котором вызывем модальное окно
        this.setState({
            offsetHeight: this.container.offsetHeight, 
            offsetWidth: this.container.offsetWidth
        });
    }

    render() {
        let { children, visible, pos, top, right, bottom, left, render} = this.props;
        
        if(this.portal && this.portal.child) { //определение высоты попапа
            var modalHeight = this.portal.child.offsetHeight, modalWidth = this.portal.child.offsetWidth;
        }

        if(!pos) return null; //ничего не рисуем, если позиция не указана
        
        let position = pos.split(" ");
        
        //let className = ["popup"];
        let className = styles.popup;
		
        let style = {};
        
        //placing popup
        switch(position[0]) {
            case 'top':
                style = {...style, "top": top - modalHeight - MARGIN + "px", "left": left + (right - left) / 2 - modalWidth / 2 + "px" };
                className += ` ${styles.ontop}`;
                break;
            case 'bottom':
                style = {...style, "top": bottom + MARGIN + "px", "left": left + (right - left) / 2 - modalWidth / 2 + "px" };
                className += ` ${styles.onbottom}`;
                break;
            case 'right':
                style = {...style, "left": right + MARGIN  + "px", "top": top + (bottom - top) / 2 - modalHeight / 2 + "px" };
                className += ` ${styles.onright}`;
                break;
            case 'left':
                style = {...style, "left": left - modalWidth - MARGIN  + "px", "top": top + (bottom - top) / 2 - modalHeight / 2 + "px" };
                className += ` ${styles.onleft}`;
                break;
            default: console.warn("не указана позиция попапа");
        }
        
        //placing pin
        switch(position[1]) {
            case 'middle':
                className += ` ${styles.middle}`;
                break;
            case 'center':
                className += ` ${styles.center}`;
                break;
            case 'top':
                style = {...style, "top": top + "px" };
                className += ` ${styles.top}`;
                break;
            case 'bottom':
                style = {...style, "top": bottom - modalHeight + "px" };
                className += ` ${styles.bottom}`;
                break;
            case 'right':
                style = {...style, "left": right - modalWidth + "px" };
                className += ` ${styles.right}`;
                break;
            case 'left':
                style = {...style, "left": left   + "px"}
                className += ` ${styles.left}`;
                break;
            default: console.warn("не указана позиция пина");
        }
        
        return (
            <div ref={ container => { this.container = container }}>
                {children}
                <Portal className = {className} style = {{ "visibility": visible ? "visible" : "hidden", ...style }} ref = { portal => this.portal = portal }>
                    {render()}
                </Portal>
            </div>
        );
    }
}