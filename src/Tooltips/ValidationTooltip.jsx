// @flow
/* eslint-disable import/no-dynamic-require, prefer-template */
import * as React from "react";
import ReactUiDetection from "../ReactUiDetection";

// $FlowFixMe we use define plugin
const Tooltip2 = require(REACT_UI_PACKAGE + "/components/Tooltip");
const Tooltip = requireDefault(Tooltip2);

function requireDefault<T>(obj: T): T {
    // $FlowFixMe default is a same module
    return obj && obj.__esModule ? obj.default : obj; // eslint-disable-line
}

type ValidationTooltipProps = {
    children?: any,
    type?: "simple" | "lostfocus",
    error: boolean,
};

type ValidationTooltipState = {
    focus: boolean,
    mouseOver: boolean,
};

export default class ValidationTooltip extends React.Component<ValidationTooltipProps, ValidationTooltipState> {
    state: ValidationTooltipState = {
        focus: false,
        mouseOver: false,
    };

    handleFocus() {
        this.setState({ focus: true });
    }

    handleBlur() {
        this.setState({ focus: false });
    }

    handleMouseOver() {
        this.setState({ mouseOver: true });
    }

    handleMouseOut() {
        this.setState({ mouseOver: false });
    }

    render(): React.Node {
        const { children, ...props } = this.props;
        const onlyChild = React.Children.only(children);
        const childProps: any = {
            onFocus: (...args: *[]) => {
                this.handleFocus();
                if (onlyChild.props.onFocus) {
                    onlyChild.props.onFocus(...args);
                }
            },
            onBlur: (...args: *[]) => {
                this.handleBlur();
                if (onlyChild.props.onBlur) {
                    onlyChild.props.onBlur(...args);
                }
            },
            onMouseEnter: () => this.handleMouseOver(),
            onMouseLeave: () => this.handleMouseOut(),
        };
        if (ReactUiDetection.isRadioGroup(onlyChild)) {
            const prevRenderItem = onlyChild.props.renderItem;
            const items = onlyChild.props.items;
            childProps.renderItem = (value, data, ...rest) => {
                if (items[0] === value) {
                    return (
                        <Tooltip
                            ref="tooltip"
                            {...props}
                            closeButton={false}
                            trigger={
                                this.props.error && (this.state.focus || this.state.mouseOver) ? "opened" : "closed"
                            }>
                            {React.cloneElement(prevRenderItem(value, data, ...rest))}
                        </Tooltip>
                    );
                }
                return prevRenderItem(value, data, ...rest);
            };
            return React.cloneElement(onlyChild, childProps);
        }
        return (
            <Tooltip
                ref="tooltip"
                {...props}
                closeButton={false}
                trigger={this.props.error && (this.state.focus || this.state.mouseOver) ? "opened" : "closed"}>
                {React.cloneElement(onlyChild, childProps)}
            </Tooltip>
        );
    }
}
