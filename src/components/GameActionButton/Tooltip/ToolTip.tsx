import {IToolTipProps} from "./IToolTipProps";
import React from "react";

function ToolTip(props: IToolTipProps) {
    return (
        <div
            style={{ top: `${props.position.top}px`, left: `${props.position.left}px` }}
            className="absolute bg-gray-800 text-white p-2 rounded"
        >
            {props.text}
        </div>
    );
}

export default ToolTip;