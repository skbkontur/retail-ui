// @flow
import PropTypes from "prop-types";
import React from "react";
import Tooltip from "retail-ui/components/Tooltip";
import RadioGroup from "retail-ui/components/RadioGroup";

type ValidationTooltipProps = {
    children?: any,
    type?: "simple" | "lostfocus",
    error: boolean,
};

type ValidationTooltipState = {
    opened: boolean,
};

export default class ValidationTooltip extends React.Component {
    props: ValidationTooltipProps;
    state: ValidationTooltipState = {
        opened: false,
    };

    static contextTypes = {
        validationTooltipContext: PropTypes.any,
    };

    componentWillReceiveProps(nextProps: ValidationTooltipProps) {
        if (this.props.error !== nextProps.error) {
            this.context.validationTooltipContext.errorStateUpdated(this, this.props.error, nextProps.error);
        }
    }

    componentWillMount() {
        if (this.context.validationTooltipContext) {
            this.context.validationTooltipContext.registerInstance(this);
        }
    }

    componentWillUnmount() {
        if (this.context.validationTooltipContext) {
            this.context.validationTooltipContext.unregisterInstance(this);
        }
    }

    setOpened(opened: boolean) {
        if (this.state.opened !== opened) {
            this.setState({
                opened: opened,
            });
        }
    }

    getBoxDomElement(): Element {
        // eslint-disable-next-line no-underscore-dangle
        return this.refs.tooltip._hotspotDOM;
    }

    handleFocus() {
        this.context.validationTooltipContext.instanceFocus(this);
    }

    handleBlur() {
        this.context.validationTooltipContext.instanceBlur(this);
    }

    handleMouseOver() {
        this.context.validationTooltipContext.instanceMouseOver(this);
    }

    handleMouseOut() {
        this.context.validationTooltipContext.instanceMouseOut(this);
    }

    render(): React.Element<*> {
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
        if (onlyChild.type === RadioGroup) {
            const prevRenderItem = onlyChild.props.renderItem;
            const items = onlyChild.props.items;
            childProps.renderItem = (value, data, ...rest) => {
                if (items[0] === value) {
                    return (
                        <Tooltip
                            ref="tooltip"
                            {...props}
                            closeButton={false}
                            trigger={this.props.error && this.state.opened ? "opened" : "closed"}>
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
                trigger={this.props.error && this.state.opened ? "opened" : "closed"}>
                {React.cloneElement(onlyChild, childProps)}
            </Tooltip>
        );
    }
}
