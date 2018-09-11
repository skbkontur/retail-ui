import * as React from "react";
import { storiesOf } from "@storybook/react";
import DatePicker from "retail-ui/components/DatePicker";
import Button from "retail-ui/components/Button";
import { ValidationContainer, ValidationInfo, ValidationWrapperV1 } from "../src";
import { Nullable } from "../src/Types";

storiesOf("DatePicker", module).add("Example1", () => <DatePickerStory />);

interface DatePickerStoryState {
    value: Date;
}

class DatePickerStory extends React.Component<{}, DatePickerStoryState> {
    state: DatePickerStoryState = {
        value: null,
    };

    validateValue1(): Nullable<ValidationInfo> {
        const { value } = this.state;
        if (value == null) {
            return { message: "Должно быть не пусто", type: "submit" };
        }
        return null;
    }

    render() {
        return (
            <div style={{ padding: "20px 20px" }}>
                <ValidationContainer ref="container">
                    <ValidationWrapperV1 validationInfo={this.validateValue1()}>
                        <DatePicker value={this.state.value} onChange={(e, value) => this.setState({ value })} />
                    </ValidationWrapperV1>
                    <div style={{ padding: "100px 0" }}>
                        <Button onClick={() => (this.refs.container as ValidationContainer).validate()}>Check</Button>
                    </div>
                </ValidationContainer>
            </div>
        );
    }
}
