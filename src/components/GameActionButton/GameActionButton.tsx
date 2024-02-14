import React, {HTMLProps} from "react";

function GameActionButton(props: HTMLProps<HTMLInputElement>) {
    return (
        <div className="border-2 border-black cursor-pointer ml-10 mr-10 inline-block mb-0 bg-green-500">
            <input type="button"
                   value={props.value}
                   onClick={props.onClick}
            />
        </div>
    );
}


export default GameActionButton;