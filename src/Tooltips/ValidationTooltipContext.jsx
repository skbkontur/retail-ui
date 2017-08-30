// @flow
import Events from "add-event-listener";
import React from "react";
import PropTypes from "prop-types";
import ValidationTooltip from "./ValidationTooltip";

type ValidationTooltipContextProps = {
    children?: any,
};

type ValidationTooltipContextContext = {
    validationTooltipContext: ValidationTooltipContext,
};

export default class ValidationTooltipContext extends React.Component {
    props: ValidationTooltipContextProps;

    static childContextTypes = {
        validationTooltipContext: PropTypes.any,
    };

    focusedValidationTooltip: ValidationTooltip | null = null;
    prevFocusedValidationTooltip: ValidationTooltip | null = null;
    hoveredValidationTooltip: ValidationTooltip | null = null;
    validationTooltips: ValidationTooltip[] = [];

    componentDidMount() {
        Events.addEventListener(document, "mousedown", this.handleFocusOutside);
    }

    componentWillUnmount() {
        Events.removeEventListener(document, "mousedown", this.handleFocusOutside);
    }

    handleFocusOutside = () => {
        if (this.prevFocusedValidationTooltip !== null) {
            this.prevFocusedValidationTooltip.setOpened(false);
            this.prevFocusedValidationTooltip = null;
        }
        if (this.focusedValidationTooltip !== null) {
            this.prevFocusedValidationTooltip = this.focusedValidationTooltip;
        }
    };

    getChildContext(): ValidationTooltipContextContext {
        return {
            validationTooltipContext: this,
        };
    }

    registerInstance(validationTooltip: ValidationTooltip) {
        this.validationTooltips.push(validationTooltip);
    }

    unregisterInstance(validationTooltip: ValidationTooltip) {
        this.validationTooltips.splice(this.validationTooltips.indexOf(validationTooltip), 1);
        if (this.focusedValidationTooltip === validationTooltip) {
            this.focusedValidationTooltip = null;
        }
        if (this.hoveredValidationTooltip === validationTooltip) {
            this.hoveredValidationTooltip = null;
        }
        if (this.prevFocusedValidationTooltip === validationTooltip) {
            this.prevFocusedValidationTooltip = null;
        }
    }

    errorStateUpdated(validationTooltip: ValidationTooltip, prevError: boolean, nextError: boolean) {
        if (
            this.focusedValidationTooltip === validationTooltip ||
            this.prevFocusedValidationTooltip === validationTooltip
        ) {
            if (nextError) {
                validationTooltip.setOpened(true);
            }
        }
    }

    instanceFocus(validationTooltip: ValidationTooltip) {
        if (validationTooltip.props.error) {
            if (this.hoveredValidationTooltip === validationTooltip) {
                this.hoveredValidationTooltip = null;
            }
            this.validationTooltips.forEach(x => {
                if (x !== this.focusedValidationTooltip && this.prevFocusedValidationTooltip !== x) {
                    x.setOpened(x === validationTooltip);
                }
            });
        }
        this.focusedValidationTooltip = validationTooltip;
    }

    instanceBlur(validationTooltip: ValidationTooltip) {
        if (this.prevFocusedValidationTooltip !== null) {
            this.prevFocusedValidationTooltip.setOpened(false);
            this.prevFocusedValidationTooltip = null;
        }
        if (this.focusedValidationTooltip === validationTooltip) {
            this.prevFocusedValidationTooltip = validationTooltip;
            this.focusedValidationTooltip = null;
        }
    }

    instanceMouseOver(validationTooltip: ValidationTooltip) {
        if (validationTooltip.props.error) {
            if (
                this.focusedValidationTooltip !== validationTooltip &&
                this.prevFocusedValidationTooltip !== validationTooltip
            ) {
                if (this.hoveredValidationTooltip !== null) {
                    this.hoveredValidationTooltip.setOpened(false);
                }
                this.hoveredValidationTooltip = validationTooltip;
                this.hoveredValidationTooltip.setOpened(true);
                this.makeVisibleLast();
            } else if (this.prevFocusedValidationTooltip && !this.prevFocusedValidationTooltip.state.opened) {
                this.prevFocusedValidationTooltip = null;
                if (this.hoveredValidationTooltip !== null) {
                    this.hoveredValidationTooltip.setOpened(false);
                }
                this.hoveredValidationTooltip = validationTooltip;
                this.hoveredValidationTooltip.setOpened(true);
            }
        }
    }

    makeVisibleLast() {
        if (this.prevFocusedValidationTooltip !== null) {
            this.prevFocusedValidationTooltip.setOpened(false);
            this.prevFocusedValidationTooltip = null;
        }
    }

    instanceMouseOut(validationTooltip: ValidationTooltip) {
        if (validationTooltip.props.error) {
            if (this.hoveredValidationTooltip === validationTooltip) {
                validationTooltip.setOpened(false);
                this.hoveredValidationTooltip = null;
            }
        }
    }

    openFirstInvalid() {
        let isFirstOpened = false;
        for (const validationTooltip of this.validationTooltips) {
            if (validationTooltip.props.error && !isFirstOpened) {
                validationTooltip.setOpened(true);
                isFirstOpened = true;
            } else {
                validationTooltip.setOpened(false);
            }
        }
    }

    render(): React.Element<*> {
        const { children } = this.props;
        return <div>{children}</div>;
    }
}
