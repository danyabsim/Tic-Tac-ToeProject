import React, {HTMLProps} from "react";

function GameActionButton(props: HTMLProps<HTMLInputElement>) {
    return (
        <div className="border-2 border-black cursor-pointer ml-7 mr-7 mt-4 inline-block bg-green-500">
            <input
                className={props.className}
                type="button"
                value={props.value}
                onClick={props.onClick}
            />
        </div>
    );
}


export default GameActionButton;