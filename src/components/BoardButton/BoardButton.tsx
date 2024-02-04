import React from "react";

function BoardButton(props: React.HTMLProps<HTMLInputElement>) {
    return (
        <td>
            <input type="button" id={props.id} className="XO" onClick={props.onClick} value={props.value} />
        </td>
    );
}

export default BoardButton;