import * as React from "react";
import { text, ValidationInfo } from "../../src";
import ValidationContainer from "../../src/ValidationContainer";
import ValidationWrapperV1 from "../../src/ValidationWrapperV1";
import Input from "retail-ui/components/Input";
import { Nullable } from "../../typings/Types";
import { ValidationState } from "../ValidationHelper";
import Gapped from "retail-ui/components/Gapped";
import Button from "retail-ui/components/Button";

interface SingleInputPageProps {
    initialValue?: string;
    validationType: ValidationInfo["type"];
}

interface SingleInputPageState {
    sending: boolean;
    value: string;
    validation: ValidationState;
}

export default class SingleInputPage extends React.Component<SingleInputPageProps, SingleInputPageState> {
    state: SingleInputPageState = {
        sending: false,
        value: this.props.initialValue || "",
        validation: "none",
    };

    validate(): Nullable<ValidationInfo> {
        if (this.state.value.substr(0, 3) === "bad") {
            return {
                message: "incorrect value",
                type: this.props.validationType,
            };
        }
        return null;
    }

    render() {
        return (
            <ValidationContainer ref="container">
                <div style={{ padding: 30 }}>
                    <Gapped vertical>
                        <ValidationWrapperV1 data-tid="InputValidation" validationInfo={this.validate()} renderMessage={text()}>
                            <Input
                                data-tid={"Input"}
                                value={this.state.value}
                                onChange={(e, value) => this.setState({ value: value })}
                            />
                        </ValidationWrapperV1>
                        <Gapped>
                            <Button
                                data-tid={"SubmitButton"}
                                loading={this.state.sending}
                                onClick={this.handleSubmit}
                            >
                                Submit
                            </Button>
                            <span data-tid={"ValidationState"}>{this.state.validation}</span>
                        </Gapped>
                    </Gapped>
                </div>
            </ValidationContainer>
        );
    }

    handleSubmit = () => {
        this.setState({ sending: true, validation: "validating" }, async () => {
            const isValid = await (this.refs.container as ValidationContainer).validate();
            this.setState({ sending: false, validation: isValid ? "valid" : "invalid" });
        });
    };
}
