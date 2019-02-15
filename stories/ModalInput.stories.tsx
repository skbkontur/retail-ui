import * as React from "react";
import { storiesOf } from "@storybook/react";
import Modal from "retail-ui/components/Modal";
import Input from "retail-ui/components/Input";
import Button from "retail-ui/components/Button";
import Center from "retail-ui/components/Center/Center";
import { Nullable } from "../typings/Types";
import { ValidationContainer, ValidationWrapperV1, text, ValidationInfo } from "../src";

storiesOf("ModalWithSingleInput", module)
    .add("Example1", () => <ModalInputStory/>)
    .add("Example2", () => <SmallModalInputStory/>);

interface ModalInputStoryState {
    value: string;
}

class ModalInputStory extends React.Component<{}, ModalInputStoryState> {
    state = {
        value: "",
    };

    validateValue1(): Nullable<ValidationInfo> {
        const { value } = this.state;
        if (value === "") {
            return { message: "Должно быть не пусто", type: "submit" };
        }
        if (value.split(" ").length !== 2) {
            return {
                message: "Значение должно состоять из двух слов",
                type: "lostfocus",
            };
        }
        return null;
    }

    render() {
        return (
            <ValidationContainer scrollOffset={115} ref="container">
                <Modal>
                    <Modal.Header>Заголовок</Modal.Header>
                    <Modal.Body>
                        <div style={{ padding: 10 }}>
                            <div
                                style={{
                                    height: 1000,
                                    backgroundColor: "#eee",
                                }}
                            />
                            <div
                                data-tid="ClickArea"
                                style={{
                                    textAlign: "center",
                                    marginBottom: 10,
                                    padding: 10,
                                    border: "1px solid #ddd",
                                }}>
                                Click here
                            </div>
                            <ValidationWrapperV1
                                data-tid="ValidationWrapper"
                                validationInfo={this.validateValue1()}
                                renderMessage={text("bottom")}>
                                <Input
                                    data-tid="SingleInput"
                                    value={this.state.value}
                                    onChange={(e, value) => this.setState({ value })}
                                />
                            </ValidationWrapperV1>
                            <div
                                style={{
                                    height: 1000,
                                    backgroundColor: "#eee",
                                }}
                            />
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={() => (this.refs.container as ValidationContainer).submit()} use="primary">
                            Кнопка
                        </Button>
                    </Modal.Footer>
                </Modal>
            </ValidationContainer>
        );
    }
}

interface SmallModalInputStoryState {
    value: string;
}

class SmallModalInputStory extends React.Component<{}, SmallModalInputStoryState> {
    state: SmallModalInputStoryState = {
        value: "",
    };

    componentDidMount() {
        window.scrollTo(1000, 1000);
    }

    validateValue(): Nullable<ValidationInfo> {
        const { value } = this.state;
        if (value === "") {
            return { message: "Должно быть не пусто", type: "submit" };
        }
        if (value.split(" ").length !== 2) {
            return {
                message: "Значение должно состоять из двух слов",
                type: "lostfocus",
            };
        }
        return null;
    }

    render() {
        return (
            <ValidationContainer ref="outerContainer">
                <div>
                    <h1>
                        <Center>Header</Center>
                    </h1>
                    <div
                        style={{
                            height: 3000,
                            width: 3000,
                            background: `repeating-linear-gradient(
                              45deg,
                              #606dbc,
                              #606dbc 10px,
                              #465298 10px,
                              #465298 20px
                            )`,
                        }}
                    />

                    <ValidationWrapperV1
                        data-tid="ValidationWrapper"
                        validationInfo={this.validateValue()}
                        renderMessage={text("bottom")}>
                        <Input
                            data-tid="SingleInput"
                            value={this.state.value}
                            onChange={(e, value) => this.setState({ value })}
                        />
                    </ValidationWrapperV1>
                    <h2>
                        <Center>Footer</Center>
                    </h2>
                </div>

                <Modal>
                    <ValidationContainer scrollOffset={115} ref="container">
                        <Modal.Header>Заголовок</Modal.Header>
                        <Modal.Body>
                            <div style={{ padding: 10 }}>
                                <div
                                    data-tid="ClickArea"
                                    style={{
                                        textAlign: "center",
                                        marginBottom: 10,
                                        padding: 10,
                                        border: "1px solid #ddd",
                                    }}>
                                    Click here
                                </div>
                                <ValidationWrapperV1
                                    data-tid="ValidationWrapper"
                                    validationInfo={this.validateValue()}
                                    renderMessage={text("bottom")}>
                                    <Input
                                        data-tid="SingleInput"
                                        value={this.state.value}
                                        onChange={(e, value) => this.setState({ value })}
                                    />
                                </ValidationWrapperV1>
                            </div>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button
                                onClick={() => {
                                    (this.refs.container as ValidationContainer).submit();
                                    // this.refs.outerContainer.submit();
                                }}
                                use="primary">
                                Кнопка
                            </Button>
                        </Modal.Footer>
                    </ValidationContainer>
                </Modal>
            </ValidationContainer>
        );
    }
}
