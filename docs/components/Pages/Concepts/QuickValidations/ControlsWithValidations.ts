import * as React from "react";
import Input from "retail-ui/components/Input";
import DatePicker from "retail-ui/components/DatePicker";

import { ValidationInfo, ValidationWrapperV1 } from "src/index";
import { Nullable } from "../../../../../typings/Types";

// @ts-ignore
function prepareProps({ required, email, validations, renderErrorMessage, value, ...props }) {
    // @ts-ignore
    const conditions = (validations || []).map(x => () => x(value));
    if (required) {
        conditions.push(() => {
            if (!value) {
                return { type: "submit", message: "Поле необходимо заполнить" };
            }
            return undefined;
        });
    }

    if (email) {
        conditions.push(() => {
            if (!value.includes("@")) {
                return { message: "Почта указана неверно" };
            }
            return undefined;
        });
    }

    // @ts-ignore
    const validationInfo = conditions.reduce((result, validation) => {
        const validationResult = validation(value);
        if (validationResult) {
            return { ...validationResult, ...result };
        }
        return result;
    }, undefined);

    return {
        validationWrapperProps: {
            validationInfo: validationInfo,
            renderMessage: renderErrorMessage,
        },
        controlProps: { value: value, ...props },
    };
}

function parseDate(value: Nullable<string>): Nullable<Date> {
    if (!value) {
        return null;
    }
    const match = /(\d{2}).(\d{2})\.(\d{4})/.exec(value);
    if (!match) {
        return null;
    }
    const [_, dd, mm, yyyy] = match;
    return new Date(`${yyyy}.${mm}.${dd}`);
}

export function lessThanDate(value: Date): ((value: Nullable<string>) => Nullable<ValidationInfo>) {
    return actualValue => {
        const actual = parseDate(actualValue);
        if (actual && !(actual < value)) {
            return { message: "Значение должно быть меньше чем " + value.toString() };
        }
        return undefined;
    };
}

function wrapControl(controlType: React.ComponentType<any>): React.FunctionComponent<any> {
    return props => {
        const { controlProps, validationWrapperProps } = prepareProps(props);
        const control = React.createElement(controlType, controlProps) as React.ReactElement<any>;
        return React.createElement(ValidationWrapperV1, { ...validationWrapperProps, children: control });
    };
}

const WrappedInput = wrapControl(Input);
export { WrappedInput as Input };

const WrappedDatePicker = wrapControl(DatePicker);
export { WrappedDatePicker as DatePicker };
