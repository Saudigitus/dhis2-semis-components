import { ReactNode } from "react";

export type PositionProps = "start" | "center" | "end"
export type SizeProps = "small" | "medium" | "large"
export type ContentLayoutProps = "column" | "grid"



export interface Action {
    icon?: ReactNode;
    /**The action trigged after click the action icon*/
    onAction?: () => void;
    /**Tooltip label displayed on action icon hover*/
    label?: string;
}

export interface ContentProps {
    label?: string
    value?: any
    infoMsg?: string
}

export interface CardDashboardProps {
    // contentLayout?: ContentLayoutProps
    contents?: ContentProps[]
    /** The icon to be displayed on top of the card*/
    icon?: string
    /**A collections of icones with their onClick actions*/
    actions?: Action[];
    /**Choose how to align the action [start,center,end]*/
    alignActions?: PositionProps
    size?: SizeProps
}