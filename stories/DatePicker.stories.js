import * as React from "react";
import { storiesOf } from "@kadira/storybook";
import DatePicker from "retail-ui/components/DatePicker";
import Button from "retail-ui/components/Button";
import { ValidationContainer, ValidationWrapperV1 } from "../src";

storiesOf("DatePicker", module).add("Example1", () => <DatePickerStory />);

class DatePickerStory extends React.Component {
    state = {
        value1: null,
    };

    validateValue1() {
        const { value1 } = this.state;
        if (value1 == null) {
            return { message: "Должно быть не пусто", type: "submit" };
        }
        return null;
    }

    render() {
        return (
            <div style={{ padding: "20px 20px" }}>
                <ValidationContainer ref="container">
                    <ValidationWrapperV1 validationInfo={this.validateValue1()}>
                        <DatePicker value={this.state.value} onChange={(e, value) => this.setState({ value: value })} />
                    </ValidationWrapperV1>
                    <div style={{ padding: "100px 0" }}>
                        <Button onClick={() => this.refs.container.validate()}>Check</Button>
                    </div>
                </ValidationContainer>
            </div>
        );
    }
}
