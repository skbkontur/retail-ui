import * as React from "react";

export = RetailUI;

declare namespace RetailUI {
    interface LinkProps {
        disabled: boolean;
        href: string;
        icon: string;
        use: "default" | "success" | "danger" | "graye";
    }

    interface LinkState{
        focusedByTab: boolean;
    }

    class Link extends React.Component<LinkProps, LinkState> {
    }
}
