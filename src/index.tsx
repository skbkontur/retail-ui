import * as React from "react";
import ValidationContext, { ValidationContextProps } from "./Behaviour/ValidationContext";
import ValidationWrapper, { ValidationWrapperProps, RenderErrorMessage, Validation } from "./Behaviour/ValidationWrapper";
import ValidationTooltip, { ValidationTooltipProps, TooltipPosition } from "./Tooltips/ValidationTooltip";
import { Nullable } from "./Types";

export { ValidationTooltip, ValidationTooltipProps, TooltipPosition  };
export { ValidationContext, ValidationContextProps };
export { ValidationWrapper, ValidationWrapperProps, RenderErrorMessage, Validation };

export type ValidationContainerProps = {
    children?: React.ReactNode,
    onValidationUpdated?: (isValid?: Nullable<boolean>) => void,
    scrollOffset?: number,
};

export class ValidationContainer extends React.Component<ValidationContainerProps> {
    async submit(withoutFocus: boolean = false): Promise<void> {
        await (this.refs.childContext as ValidationContext).validate(withoutFocus);
    }

    validate(withoutFocus: boolean = false): Promise<boolean> {
        return (this.refs.childContext as ValidationContext).validate(withoutFocus);
    }

    render() {
        return (
            <ValidationContext
                ref="childContext"
                verticalOffset={this.props.scrollOffset || 50}
                onValidationUpdated={this.props.onValidationUpdated}
            >
                {this.props.children}
            </ValidationContext>
        );
    }
}

export type ValidationInfo = {
    type?: "immediate" | "lostfocus" | "submit",
    level?: "error" | "warning",
    message: React.ReactNode,
};

export type ValidationWrapperV1Props = {
    children: React.ReactElement<any>,
    validationInfo: Nullable<ValidationInfo>,
    renderMessage?: RenderErrorMessage,
};

export class ValidationWrapperV1 extends React.Component<ValidationWrapperV1Props> {
    render() {
        const { children, validationInfo, renderMessage } = this.props;

        return (
            <ValidationWrapper
                errorMessage={renderMessage || tooltip("right top")}
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

export function tooltip(pos: TooltipPosition): RenderErrorMessage {
    return (control, hasError, validation) => {
        return (
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
    };
}

export function text(pos: "bottom" | "right" = "right"): RenderErrorMessage {
    if (pos === "right") {
        return (control, hasError, validation) => {
            return (
                <span style={{ display: "inline-block" }}>
                    {control}
                    <span data-validation-message="text" style={{ marginLeft: "10px", color: "#d43517" }}>
                        {(validation && validation.message) || ""}
                    </span>
                </span>
            );
        };
    }
    return (control, hasError, validation) => {
        return (
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
                        }}
                    >
                        {(validation && validation.message) || ""}
                    </span>
                </span>
            </span>
        );
    };
}
