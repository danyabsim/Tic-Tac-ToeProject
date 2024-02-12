import {HTMLProps} from "react";

export interface BoardButtonProps extends HTMLProps<HTMLDivElement> {
    fileURL: string | null; // Add this prop for the file
}