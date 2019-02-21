import * as React from "react";
import { storiesOf } from "@storybook/react";
import DatePicker from "retail-ui/components/DatePicker";
import Button from "retail-ui/components/Button";
import { Nullable } from "../typings/Types";
import { ValidationContainer, ValidationInfo, ValidationWrapperV1 } from "../src";

storiesOf("DatePicker", module).add("Example1", () => <DatePickerStory/>);

interface DatePickerStoryState {
    value: Date | string | null;
}

class DatePickerStory extends React.Component<{}, DatePickerStoryState> {
    state: DatePickerStoryState = {
        value: null,
    };

    validateValue(): Nullable<ValidationInfo> {
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
                    <ValidationWrapperV1 validationInfo={this.validateValue()}>
                        <DatePicker value={this.state.value as any} onChange={(e, value) => this.setState({ value })}/>
                    </ValidationWrapperV1>
                    <div style={{ padding: "100px 0" }}>
                        <Button onClick={() => (this.refs.container as ValidationContainer).validate()}>Check</Button>
                    </div>
                </ValidationContainer>
            </div>
        );
    }
}
