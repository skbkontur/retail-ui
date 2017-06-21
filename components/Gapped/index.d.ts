import * as React from "react";

export = RetailUI;

declare namespace RetailUI {
    interface GappedProps {
        gap: number;
        vertical: boolean;
        verticalAlign: "top" | "middle" | "baseline" | "bottom";
    }

    interface GappedState{
    }

    class Gapped extends React.Component<GappedProps, GappedState> {
    }
}
