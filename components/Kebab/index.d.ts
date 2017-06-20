import * as React from "react";

export = RetailUI;

declare namespace RetailUI {
    interface KebabProps {
        size?: "small" | "large";
        onClose: () => void;
        onOpen: () => void;
    }

    interface KebabState{
        anchor: HTMLElement;
        opened: boolean;
    }

    class Kebab extends React.Component<KebabProps, KebabState> {
    }
}