// @flow
/* eslint-disable react/no-multi-comp */
import React from "react";
import ValidationTooltipContext from "./Tooltips/ValidationTooltipContext";
import ValidationContext from "./Behaviour/ValidationContext";
import ValidationWrapper from "./Behaviour/ValidationWrapper";
import ValidationTooltip from "./Tooltips/ValidationTooltip";
import type { RenderErrorMessage } from "./Behaviour/ValidationWrapper";

export { ValidationTooltip, ValidationTooltipContext, ValidationContext, ValidationWrapper };

type ValidationContainerProps = {
    children?: any,
    onValidationUpdated?: (isValid?: ?boolean) => void,
    scrollOffset?: number,
};

export class ValidationContainer extends React.Component {
    props: ValidationContainerProps;

    async submit(withoutFocus: boolean = false): Promise<void> {
        await this.refs.childContext.validate(withoutFocus);
    }

    validate(withoutFocus: boolean = false): Promise<boolean> {
        return this.refs.childContext.validate(withoutFocus);
    }

    render(): React.Element<*> {
        const { children } = this.props;
        const contextProps = {};
        if (this.props.onValidationUpdated) {
            contextProps.onValidationUpdated = this.props.onValidationUpdated;
        }
        contextProps.verticalOffset = this.props.scrollOffset || 50;
        return (
            <ValidationContext ref="childContext" {...contextProps}>
                <ValidationTooltipContext ref="childTooltipContext">{children}</ValidationTooltipContext>
            </ValidationContext>
        );
    }
}

export type ValidationInfo = {
    type?: "immediate" | "lostfocus" | "submit",
    level?: "error" | "warning",
    message: string,
};

type ValidationWrapperV1Props = {
    children?: React.Element<*>,
    validationInfo: ?ValidationInfo,
    renderMessage?: RenderErrorMessage,
};

export class ValidationWrapperV1 extends React.Component {
    props: ValidationWrapperV1Props;

    render(): React.Element<*> {
        const { children, validationInfo, renderMessage } = this.props;

        return (
            <ValidationWrapper
                errorMessage={renderMessage || tooltip("right middle")}
                validations={[
                    {
                        error: Boolean(validationInfo),
                        level: validationInfo && validationInfo.level ? validationInfo.level : "error",
                        behaviour: (validationInfo && validationInfo.type) || "lostfocus",
                        message: validationInfo && validationInfo.message,
                    },
                ]}>
                {children}
            </ValidationWrapper>
        );
    }
}

export function tooltip(pos: string): RenderErrorMessage {
    return (control, hasError, validation) => (
        <ValidationTooltip
            pos={pos}
            error={hasError}
            render={() => {
                if (!validation || !validation.message) {
                    return null;
                }
                return (validation && validation.message) || "";
            }}>
            {control}
        </ValidationTooltip>
    );
}

export function text(pos: string = "right"): RenderErrorMessage {
    if (pos === "right") {
        return (control, hasError, validation) => (
            <span style={{ display: "inline-block" }}>
                {control}
                <span data-validation-message="text" style={{ marginLeft: "10px", color: "#d43517" }}>
                    {(validation && validation.message) || ""}
                </span>
            </span>
        );
    }
    return (control, hasError, validation) => (
        <span style={{ position: "relative", display: "inline-block" }}>
            {control}
            <span style={{ position: "absolute", bottom: 0, left: 0, height: 0 }}>
                <span
                    data-validation-message="text"
                    style={{
                        color: "#d43517",
                        overflow: "visible",
                        whiteSpace: "nowrap",
                        position: "absolute",
                        top: "2px",
                        left: 0,
                    }}>
                    {(validation && validation.message) || ""}
                </span>
            </span>
        </span>
    );
}
