import * as React from "react";
import { Nullable } from "typings/Types";
import ValidationWrapper, { RenderErrorMessage, ValidationLevel, ValidationBehaviour } from "./ValidationWrapper";
import { tooltip } from "./ErrorRenderer";

export interface ValidationInfo {
    type?: ValidationBehaviour;
    level?: ValidationLevel;
    message: React.ReactNode;
}

export interface ValidationWrapperV1Props {
    children: React.ReactElement<any>;
    validationInfo: Nullable<ValidationInfo>;
    renderMessage?: Nullable<RenderErrorMessage>;
}

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
