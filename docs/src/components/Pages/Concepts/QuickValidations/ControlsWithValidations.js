import React from "react";
import Input from "retail-ui/components/Input";
import DatePicker from "retail-ui/components/DatePicker";

import { ValidationWrapperV1 } from "react-ui-validations";

function prepareProps({ required, email, validations, renderErrorMessage, value, ...props }) {
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

export function lessThan(value) {
    return actualValue => {
        if (!(actualValue < value)) {
            return { message: "Значение должно быть меньше чем " + value.toString() };
        }
        return undefined;
    };
}

function wrapControl(Control) {
    return function WrappedControl(props) {
        const { controlProps, validationWrapperProps } = prepareProps(props);

        return (
            <ValidationWrapperV1 {...validationWrapperProps}>
                <Control {...controlProps} />
            </ValidationWrapperV1>
        );
    };
}

const WrappedInput = wrapControl(Input);
export { WrappedInput as Input };

const WrappedDatePicker = wrapControl(DatePicker);
export { WrappedDatePicker as DatePicker };
