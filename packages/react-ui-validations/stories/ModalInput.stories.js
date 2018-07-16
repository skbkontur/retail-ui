/* eslint-disable react/no-multi-comp */
import * as React from "react";
import { storiesOf } from "@kadira/storybook";
import Modal from "retail-ui/components/Modal";
import Input from "retail-ui/components/Input";
import Button from "retail-ui/components/Button";
// import Select from "retail-ui/components/Select";
import { ValidationContainer, ValidationWrapperV1, text } from "../src";

storiesOf("ModalWithSingleInput", module)
    .add("Example1", () => <ModalInputStory />)
    .add("Example2", () => <SmallModalInputStory />);

class ModalInputStory extends React.Component {
    state = {
        value1: "",
    };

    validateValue1() {
        const { value1 } = this.state;
        if (value1 === "") {
            return { message: "Должно быть не пусто", type: "submit" };
        } else if (value1.split(" ").length !== 2) {
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
                                    onChange={(e, value) => this.setState({ value1: value })}
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
                        <Button onClick={() => this.refs.container.submit()} use="primary">
                            Кнопка
                        </Button>
                    </Modal.Footer>
                </Modal>
            </ValidationContainer>
        );
    }
}

class SmallModalInputStory extends React.Component {
    state = {
        value1: "",
    };

    componentDidMount() {
        window.scrollTo(1000, 1000);
    }

    validateValue1() {
        const { value1 } = this.state;
        if (value1 === "") {
            return { message: "Должно быть не пусто", type: "submit" };
        } else if (value1.split(" ").length !== 2) {
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
                        <center>Header</center>
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
                        validationInfo={this.validateValue1()}
                        renderMessage={text("bottom")}>
                        <Input
                            data-tid="SingleInput"
                            value={this.state.value1}
                            onChange={(e, value) => this.setState({ value1: value })}
                        />
                    </ValidationWrapperV1>
                    <h2>
                        <center>Footer</center>
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
                                    validationInfo={this.validateValue1()}
                                    renderMessage={text("bottom")}>
                                    <Input
                                        data-tid="SingleInput"
                                        value={this.state.value1}
                                        onChange={(e, value) => this.setState({ value1: value })}
                                    />
                                </ValidationWrapperV1>
                            </div>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button
                                onClick={() => {
                                    this.refs.container.submit();
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
