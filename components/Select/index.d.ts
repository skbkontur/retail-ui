import * as React from "react";

export = RetailUI;

declare namespace RetailUI {
    interface SelectProps {
        defaultValue: boolean;
        disablePortal: boolean;
        disabled: boolean;
        error: boolean;
        filterItem: () => void;
        items: Array<any> | Object;
        maxMenuHeight: number;
        maxWidth: number | string;
        placeholder: HTMLElement;
        renderItem: () => void;
        renderValue: () => void;
        search: boolean;
        value: any;
        width: number | string;
        onChange: React.ChangeEventHandler<any>;
        onMouseEnter: React.MouseEventHandler<any>;
        onMouseLeave: React.MouseEventHandler<any>;
        onMouseOver: React.MouseEventHandler<any>;
    }

    interface SelectState{
        opened: boolean;
        value: any;
    }

    class Select extends React.Component<SelectProps, SelectState> {
    }
}
