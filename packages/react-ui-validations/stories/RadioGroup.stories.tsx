import * as React from "react";
import { storiesOf } from "@storybook/react";
import RadioGroup from "retail-ui/components/RadioGroup";
import Button from "retail-ui/components/Button";
import { Nullable } from "../typings/Types";
import { ValidationContainer, ValidationWrapperV1, ValidationInfo } from "../src";

storiesOf("RadioGroup", module).add("Example1", () => <RadioGroupStory/>);

type Sex = "male" | "female";

interface RadioGroupStoryState {
    sex: Nullable<Sex>;
}

class RadioGroupStory extends React.Component<{}, RadioGroupStoryState> {
    state: RadioGroupStoryState = {
        sex: null,
    };

    validateSex(): Nullable<ValidationInfo> {
        const { sex } = this.state;
        if (sex == null) {
            return { message: "Должно быть не пусто", type: "submit" };
        }
        return null;
    }

    render() {
        return (
            <div style={{ padding: "20px 20px" }}>
                <ValidationContainer ref="container">
                    <ValidationWrapperV1 validationInfo={this.validateSex()}>
                        <RadioGroup
                            value={this.state.sex}
                            items={["male", "female"] as Sex[]}
                            renderItem={x => <span>{x}</span>}
                            onChange={(e, value) => this.setState({ sex: value })}
                        />
                    </ValidationWrapperV1>
                    <div style={{ padding: "100px 0" }}>
                        <Button onClick={() => (this.refs.container as ValidationContainer).validate()}>Check</Button>
                    </div>
                </ValidationContainer>
            </div>
        );
    }
}
