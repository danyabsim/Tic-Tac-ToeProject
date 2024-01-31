import {onClickXOElement} from "../XOScript";
import React from "react";

function BoardButton(props: React.HTMLProps<HTMLInputElement>) {
    function onClickXOElementHandler(event : React.MouseEvent<HTMLInputElement>) {
        onClickXOElement(event.currentTarget);
    }

    return (
        <td>
            <input type="button" id={props.id} className="XO" onClick={onClickXOElementHandler}></input>
        </td>
    );
}

export default BoardButton;