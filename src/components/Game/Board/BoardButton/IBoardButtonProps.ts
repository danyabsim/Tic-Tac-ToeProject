import {HTMLProps} from "react";

export interface IBoardButtonProps extends HTMLProps<HTMLDivElement> {
    fileURL: string | null; // Add this prop for the file
}