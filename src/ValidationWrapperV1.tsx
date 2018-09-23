import * as React from "react";
import { Nullable } from "./Types";
import ValidationWrapper, { RenderErrorMessage } from "./ValidationWrapper";
import { tooltip } from "./ErrorRenderer";

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

export default class ValidationWrapperV1 extends React.Component<ValidationWrapperV1Props> {
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
                ]}
            >
                {children}
            </ValidationWrapper>
        );
    }
}
