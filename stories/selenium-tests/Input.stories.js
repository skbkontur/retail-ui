import React from "react";
import { storiesOf } from "@kadira/storybook";
import Input from "retail-ui/components/Input";
import { ValidationContainer, ValidationWrapperV1, text } from "../../src";

class Example1 extends React.Component {
    state = {
        value1: "",
    };

    validateValue1() {
        const { value1 } = this.state;
        if (value1 === "") {
            return { message: "Должно быть не пусто", type: "submit" };
        } else if (value1.split(" ").length !== 2) {
            return { message: "Значение должно состоять из двух слов", type: "lostfocus" };
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
                        data-tid="ValidationWrapper"
                        validationInfo={this.validateValue1()}
                        renderMessage={text("bottom")}>
                        <Input
                            data-tid="SingleInput"
                            value={this.state.value}
                            onChange={(e, value) => this.setState({ value1: value })}
                        />
                    </ValidationWrapperV1>
                </div>
            </ValidationContainer>
        );
    }
}

storiesOf("SingleInput", module).add("Example1", () => {
    return <Example1 />;
});
