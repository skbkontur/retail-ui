import * as React from "react";
import { Nullable } from "typings/Types";
import ValidationContext from "./ValidationContext";

export interface ValidationContainerProps {
    children?: React.ReactNode;
    onValidationUpdated?: (isValid?: Nullable<boolean>) => void;
    scrollOffset?: number;
}

export default class ValidationContainer extends React.Component<ValidationContainerProps> {
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
