import React from "react";
import { storiesOf } from "@kadira/storybook";
import Input from "retail-ui/components/Input";
import { ValidationContainer, ValidationWrapperV1, text } from "../../src";

class Example1 extends React.Component {
    state = {
        value1: "",
        value2: "",
    };

    validateValue1() {
        const { value1, value2 } = this.state;
        if (value1 === "") {
            return { message: "Должно быть не пусто", type: "submit" };
        } else if (value1 !== value2.replace(/1$/, "")) {
            return { message: "Значение 1 должно быть равняться value1 + '1'" };
        }
        return null;
    }

    validateValue2() {
        const { value1, value2 } = this.state;
        if (value2 === "") {
            return { message: "Должно быть не пусто", type: "submit" };
        } else if (value1 + "1" !== value2) {
            return { message: "Значение 1 должно быть равняться value1 + '1'" };
        }
        return null;
    }

    render() {
        return (
            <ValidationContainer>
                <div style={{ padding: 10 }}>
                    <div
                        data-tid="ClickArea"
                        style={{ textAlign: "center", marginBottom: 10, padding: 10, border: "1px solid #ddd" }}>
                        Click here
                    </div>
                    <ValidationWrapperV1
                        data-tid="ValidationWrapper1"
                        validationInfo={this.validateValue1()}
                        renderMessage={text("bottom")}>
                        <Input
                            data-tid="Input1"
                            value={this.state.value1}
                            onChange={(e, value) => this.setState({ value1: value })}
                        />
                    </ValidationWrapperV1>
                    <br />
                    <br />
                    <br />
                    <ValidationWrapperV1
                        data-tid="ValidationWrapper2"
                        validationInfo={this.validateValue2()}
                        renderMessage={text("bottom")}>
                        <Input
                            data-tid="Input2"
                            value={this.state.value2}
                            onChange={(e, value) => this.setState({ value2: value })}
                        />
                    </ValidationWrapperV1>
                </div>
            </ValidationContainer>
        );
    }
}

storiesOf("DependentInputs", module).add("Example1", () => {
    return <Example1 />;
});
