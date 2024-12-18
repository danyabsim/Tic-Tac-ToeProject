import React from "react";

function BoardButton(props: React.HTMLProps<HTMLInputElement>) {
    return (
        <span>
            <input type="button" id={props.id} className={props.className} onClick={props.onClick} value={props.value} style={props.style} />
        </span>
    );
}

export default BoardButton;