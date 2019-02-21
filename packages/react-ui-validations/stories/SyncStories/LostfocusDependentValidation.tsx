import * as React from "react";
import { text, ValidationInfo } from "../../src";
import ValidationContainer from "../../src/ValidationContainer";
import Gapped from "retail-ui/components/Gapped";
import ValidationWrapperV1 from "../../src/ValidationWrapperV1";
import Input from "retail-ui/components/Input";
import Button from "retail-ui/components/Button";
import { Nullable } from "../../typings/Types";
import { ValidationState } from "../ValidationHelper";

interface LostfocusDependentValidationState {
    sending: boolean;
    valueA: string;
    valueB: string;
    validation: ValidationState;
}

export default class LostfocusDependentValidation extends React.Component<{}, LostfocusDependentValidationState> {
    state: LostfocusDependentValidationState = {
        sending: false,
        valueA: "",
        valueB: "",
        validation: "none",
    };

    validateA(): Nullable<ValidationInfo> {
        if (this.state.valueA.substr(0, 3) === "bad") {
            return {
                message: "incorrect value",
                type: "lostfocus",
            };
        }
        if (this.state.valueA && this.state.valueB && this.state.valueA === this.state.valueB) {
            return {
                message: "duplicate value",
                type: "lostfocus",
            };
        }
        return null;
    }

    validateB(): Nullable<ValidationInfo> {
        if (this.state.valueB.substr(0, 3) === "bad") {
            return {
                message: "incorrect value",
                type: "submit",
            };
        }
        if (this.state.valueA && this.state.valueB && this.state.valueA === this.state.valueB) {
            return {
                message: "duplicate value",
                type: "submit",
            };
        }
        return null;
    }

    render() {
        return (
            <ValidationContainer ref="container">
                <div style={{ padding: 30 }}>
                    <Gapped vertical>
                        <Gapped>
                            <b>A</b>
                            <ValidationWrapperV1 data-tid="InputAValidation" validationInfo={this.validateA()} renderMessage={text()}>
                                <Input
                                    data-tid={"InputA"}
                                    value={this.state.valueA}
                                    onChange={(e, value) => this.setState({ valueA: value })}
                                />
                            </ValidationWrapperV1>
                        </Gapped>
                        <Gapped>
                            <b>B</b>
                            <ValidationWrapperV1 data-tid="InputBValidation" validationInfo={this.validateB()} renderMessage={text()}>
                                <Input
                                    data-tid={"InputB"}
                                    value={this.state.valueB}
                                    onChange={(e, value) => this.setState({ valueB: value })}
                                />
                            </ValidationWrapperV1>
                        </Gapped>
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
