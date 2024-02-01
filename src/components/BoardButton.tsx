import React from "react";

function BoardButton(props: React.HTMLProps<HTMLInputElement>) {
    return (
        <td>
            <input type="button" id={props.id} className="XO" onClick={props.onClick} value={props.value} disabled={props.disabled} />
        </td>
    );
}

export default BoardButton;