import * as React from "react";

export type RenderErrorMessage =
    (
        control: React.ReactNode,
        hasError: boolean,
        validation: ?Validation
    ) => React.ReactNode;

export type ValidationInfo = {
    type?: "immediate" | "lostfocus" | "submit";
    level?: "error" | "warning";
    message: string | JSX.Element;
};

interface ValidationContainerProps {}

export class ValidationContainer extends React.Component<ValidationContainerProps, {}> {
    validate(): Promise<bool>;
    submit(): Promise<void>;
}

interface ValidationWrapperV1Props {
    children: JSX.Element;
    renderMessage?: RenderErrorMessage;
    validationInfo: ValidationInfo | null;
}

export class ValidationWrapperV1 extends React.Component<ValidationWrapperV1Props, {}> {
}

type TooltipPosition = "top left"
    | "top center"
    | "top right"
    | "bottom left"
    | "bottom center"
    | "bottom right"
    | "left top"
    | "left middle"
    | "left bottom"
    | "right top"
    | "right middle"
    | "right bottom";

export function tooltip(tooltipPosition: TooltipPosition): RenderErrorMessage;
export function text(textPosition: "bottom" | "right"): RenderErrorMessage;
