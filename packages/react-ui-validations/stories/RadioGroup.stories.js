import * as React from "react";
import { storiesOf } from "@kadira/storybook";
import RadioGroup from "retail-ui/components/RadioGroup";
import Button from "retail-ui/components/Button";
import { ValidationContainer, ValidationWrapperV1 } from "../src";

storiesOf("RadioGroup", module).add("Example1", () => <RadioGroupStory />);

class RadioGroupStory extends React.Component {
    state = {
        sex: null,
    };

    validateSex() {
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
                            items={["male", "female"]}
                            renderItem={x => <span>{x}</span>}
                            onChange={(e, value) => this.setState({ sex: value })}
                        />
                    </ValidationWrapperV1>
                    <div style={{ padding: "100px 0" }}>
                        <Button onClick={() => this.refs.container.validate()}>Check</Button>
                    </div>
                </ValidationContainer>
            </div>
        );
    }
}
