import * as React from "react";
import ReactUiDetection, { Tooltip } from "./ReactUiDetection";

export type TooltipPosition = "top left"
    | "top center"
    | "top right"
    | "bottom left"
    | "bottom center"
    | "bottom right"
    | "left top"
    | "left middle"
    | "left bottom"
    | "right top"
    | "right middle"
    | "right bottom";

export interface ValidationTooltipProps {
    children: React.ReactElement<any>;
    type?: "simple" | "lostfocus";
    error: boolean;
    pos?: TooltipPosition;
    render?: () => React.ReactNode;
}

interface ValidationTooltipState {
    focus: boolean;
    mouseOver: boolean;
}

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

    render() {
        const { children, ...props } = this.props;
        const onlyChild = React.Children.only(children);
        const childProps: any = {
            onFocus: (...args: any[]) => {
                this.handleFocus();
                if (onlyChild.props.onFocus) {
                    onlyChild.props.onFocus(...args);
                }
            },
            onBlur: (...args: any[]) => {
                this.handleBlur();
                if (onlyChild.props.onBlur) {
                    onlyChild.props.onBlur(...args);
                }
            },
            onMouseEnter: (...args: any[]) => {
                this.handleMouseOver();
                if (onlyChild.props.onMouseEnter) {
                    onlyChild.props.onMouseEnter(...args);
                }
            },
            onMouseLeave: (...args: any[]) => {
                this.handleMouseOut();
                if (onlyChild.props.onMouseLeave) {
                    onlyChild.props.onMouseLeave(...args);
                }
            },
        };
        if (ReactUiDetection.isRadioGroup(onlyChild)) {
            const prevRenderItem = onlyChild.props.renderItem;
            const items = onlyChild.props.items;
            childProps.renderItem = (value: any, data: any, ...rest: any[]) => {
                if (items[0] === value) {
                    return (
                        <Tooltip
                            ref="tooltip"
                            {...props}
                            closeButton={false}
                            trigger={this.props.error && (this.state.focus || this.state.mouseOver) ? "opened" : "closed"}
                        >
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
                trigger={this.props.error && (this.state.focus || this.state.mouseOver) ? "opened" : "closed"}
            >
                {React.cloneElement(onlyChild, childProps)}
            </Tooltip>
        );
    }
}
