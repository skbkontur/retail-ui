import React from "react";
import { storiesOf } from "@kadira/storybook";
import Input from "retail-ui/components/Input";
import Button from "retail-ui/components/Button";
import Select from "retail-ui/components/Select";
import { ValidationContainer, ValidationWrapperV1, text } from "../src";

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
                    <ValidationWrapperV1 validationInfo={this.validateValue1()} renderMessage={text("bottom")}>
                        <Input value={this.state.value} onChange={(e, value) => this.setState({ value1: value })} />
                    </ValidationWrapperV1>
                </div>
            </ValidationContainer>
        );
    }
}

class Example2 extends React.Component {
    state = {
        value1: "",
    };

    validateValue1() {
        const { value1 } = this.state;
        if (value1 === "") {
            return { message: "Должно быть не пусто", type: "submit" };
        } else if (value1.split(" ").length !== 2) {
            return { message: <span>Значение должно состоять из двух слов.</span>, type: "lostfocus" };
        }
        return null;
    }

    render() {
        return (
            <ValidationContainer>
                <div style={{ padding: 10 }}>
                    <ValidationWrapperV1 validationInfo={this.validateValue1()} renderMessage={text("bottom")}>
                        <Input value={this.state.value} onChange={(e, value) => this.setState({ value1: value })} />
                    </ValidationWrapperV1>
                </div>
            </ValidationContainer>
        );
    }
}

class Example3 extends React.Component {
    state = {
        value1: "",
    };

    validateValue1() {
        const { value1 } = this.state;
        if (value1 === "") {
            return { message: "Должно быть не пусто", type: "submit" };
        } else if (value1.split(" ").length !== 2) {
            return { message: <span>Значение должно состоять из двух слов.</span>, type: "lostfocus" };
        }
        return null;
    }

    render() {
        return (
            <ValidationContainer ref="container">
                <div style={{ padding: 10 }}>
                    <Button onClick={() => this.refs.container.submit()}>Отправить</Button>
                    <div style={{ height: 1000, backgroundColor: "#eee" }} />
                    <ValidationWrapperV1 validationInfo={this.validateValue1()} renderMessage={text("bottom")}>
                        <Input value={this.state.value} onChange={(e, value) => this.setState({ value1: value })} />
                    </ValidationWrapperV1>
                    <Button onClick={() => this.refs.container.submit()}>Отправить</Button>
                    <div style={{ height: 1000, backgroundColor: "#eee" }} />
                    <Button onClick={() => this.refs.container.submit()}>Отправить</Button>
                </div>
            </ValidationContainer>
        );
    }
}

class Example4 extends React.Component {
    state = {
        type: null,
        value: "",
    };

    validateValue1() {
        const { type, value } = this.state;
        if (value === "") {
            return { message: "Должно быть не пусто", type: "submit" };
        } else if (type !== null && value !== type) {
            return { message: <span>Значение должно быть равно type.</span>, type: "lostfocus" };
        }
        return null;
    }

    render() {
        return (
            <ValidationContainer ref="container">
                <div style={{ padding: 10 }}>
                    <Select
                        items={["male", "female"]}
                        value={this.state.type}
                        onChange={(e, value) => this.setState({ type: value })}
                    />
                    <ValidationWrapperV1 validationInfo={this.validateValue1()} renderMessage={text("bottom")}>
                        <Input value={this.state.value} onChange={(e, value) => this.setState({ value: value })} />
                    </ValidationWrapperV1>
                    <div style={{ height: 1000, backgroundColor: "#eee" }} />
                    <Button onClick={() => this.refs.container.submit()}>Отправить</Button>
                </div>
            </ValidationContainer>
        );
    }
}

class Example5 extends React.Component {
    state = {
        value1: "",
    };

    validateValue1() {
        const { value1 } = this.state;
        if (value1 === "") {
            return { message: "Должно быть не пусто", type: "submit" };
        } else if (value1.split(" ").length !== 2) {
            return { message: <span>Значение должно состоять из двух слов.</span>, type: "lostfocus" };
        }
        return null;
    }

    render() {
        return (
            <ValidationContainer ref="container">
                <div style={{ padding: 50 }}>
                    <br />
                    <br />
                    <br />
                    <br />
                    <div style={{ height: 300, width: 300, overflow: "scroll" }}>
                        <div style={{ height: 1000, width: 1000, position: "relative" }}>
                            <div style={{ position: "absolute", top: 500, left: 500 }}>
                                <ValidationWrapperV1
                                    validationInfo={this.validateValue1()}
                                    renderMessage={text("bottom")}>
                                    <Input
                                        value={this.state.value}
                                        onChange={(e, value) => this.setState({ value1: value })}
                                    />
                                </ValidationWrapperV1>
                            </div>
                        </div>
                    </div>
                    <Button onClick={() => this.refs.container.submit()}>Отправить</Button>
                </div>
            </ValidationContainer>
        );
    }
}

class Example6 extends React.Component {
    state = {
        value1: "",
        value2: "",
    };

    validateValue1() {
        const { value1 } = this.state;
        if (value1 === "") {
            return { message: "Должно быть не пусто", type: "submit" };
        } else if (value1.split(" ").length !== 2) {
            return { message: <span>Значение должно состоять из двух слов.</span>, type: "lostfocus" };
        }
        return null;
    }

    validateValue2() {
        const { value2 } = this.state;
        if (value2 === "") {
            return { message: "Должно быть не пусто", type: "submit" };
        } else if (value2.split(" ").length !== 2) {
            return { message: <span>Значение должно состоять из двух слов.</span>, type: "lostfocus" };
        }
        return null;
    }

    render() {
        return (
            <ValidationContainer ref="container">
                <div style={{ padding: 50, height: 200, position: "relative" }}>
                    <div style={{ position: "absolute", top: 100 }}>
                        <ValidationWrapperV1 validationInfo={this.validateValue1()}>
                            <Input
                                value={this.state.value1}
                                onChange={(e, value) => this.setState({ value1: value })}
                            />
                        </ValidationWrapperV1>
                    </div>
                    <div style={{ position: "absolute", top: 20 }}>
                        <ValidationWrapperV1 validationInfo={this.validateValue2()}>
                            <Input
                                value={this.state.value2}
                                onChange={(e, value) => this.setState({ value2: value })}
                            />
                        </ValidationWrapperV1>
                    </div>
                </div>
                <Button onClick={() => this.refs.container.submit()}>Отправить</Button>
            </ValidationContainer>
        );
    }
}

class Example7 extends React.Component {
    state = {
        value1: "",
        value2: "",
        value3: "",
    };

    validateValue(value) {
        if (value === "") {
            return { message: "Должно быть не пусто", type: "submit" };
        } else if (value.split(" ").length !== 2) {
            return { message: "Значение должно состоять из двух слов.", type: "lostfocus" };
        }
        return null;
    }

    render() {
        const { value1, value2, value3 } = this.state;
        return (
            <ValidationContainer ref="container">
                <div>
                    <div style={{ padding: 20 }}>
                        <ValidationWrapperV1 validationInfo={this.validateValue(value1)}>
                            <Input value={value1} onChange={(e, value) => this.setState({ value1: value })} />
                        </ValidationWrapperV1>
                    </div>
                    <div style={{ padding: 20 }}>
                        <ValidationWrapperV1 validationInfo={this.validateValue(value2)}>
                            <Input value={value2} onChange={(e, value) => this.setState({ value2: value })} />
                        </ValidationWrapperV1>
                    </div>
                    <div style={{ padding: 20 }}>
                        <ValidationWrapperV1 validationInfo={this.validateValue(value3)}>
                            <Input value={value3} onChange={(e, value) => this.setState({ value3: value })} />
                        </ValidationWrapperV1>
                    </div>
                </div>
                <Button onClick={() => this.refs.container.submit()}>Отправить</Button>
            </ValidationContainer>
        );
    }
}

storiesOf("Input", module)
    .add("#1", () => {
        return <Example1 />;
    })
    .add("#2 ReactElement в сообщении", () => {
        return <Example2 />;
    })
    .add("#3 Промотка сообщении", () => {
        return <Example3 />;
    })
    .add("#4 Зависимые поля", () => {
        return <Example4 />;
    })
    .add("#5 Промотка внутри котейнера", () => {
        return <Example5 />;
    })
    .add("#6 Выбор первого контра для валидации", () => {
        return <Example6 />;
    })
    .add("#7 Три невалидных поля по сабмиту", () => {
        return <Example7 />;
    });
