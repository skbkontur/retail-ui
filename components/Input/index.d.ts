import * as React from "react";

export = RetailUI;

declare namespace RetailUI {
    interface InputProps {
        align?: "left" | "center" | "right";
        alwaysShowMask?: boolean;
        borderless?: boolean;
        className?: string;
        disabled?: boolean;
        error?: boolean;
        id?: string;
        leftIcon?: React.ReactElement<any>;
        mask?: string;
        maskChar?: string;
        maxLength?: number | string;
        placeholder?: string;
        rightIcon?: React.ReactElement<any>;
        size: "small" | "medium" | "large";
        title?: string;
        type?: "password" | "text";
        value: string;
        warning?: boolean;
        width?: number | string;
        onBlur?: React.FocusEventHandler<any>;
        onChange?: React.ChangeEventHandler<any>;
        onCopy?: React.ClipboardEventHandler<any>;
        onCut?: React.ClipboardEventHandler<any>;
        onFocus?: React.FocusEventHandler<any>;
        onInput?: React.ChangeEventHandler<any>;
        onKeyDown?: React.KeyboardEventHandler<any>;
        onKeyPress?: React.KeyboardEventHandler<any>;
        onKeyUp?: React.KeyboardEventHandler<any>;
        onPaste?: React.ClipboardEventHandler<any>;
        onMouseEnter?: React.MouseEventHandler<any>;
        onMouseLeave?: React.MouseEventHandler<any>;
        onMouseOver?: React.MouseEventHandler<any>;
    }

    interface InputState{
        polyfillPlaceholder: boolean;
    }

    class Input extends React.Component<InputProps, InputState> {
    }
}
