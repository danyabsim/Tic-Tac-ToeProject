import React, {HTMLProps} from "react";

function GameActionButton(props: HTMLProps<HTMLInputElement>) {
    return (
        <div className="border-2 border-black ml-7 mr-7 mt-4 inline-block bg-green-500 p-2 rounded-full">
            <input
                className={`${props.className} cursor-pointer`}
                type={`${props.type ? props.type : 'button'}`}
                value={props.value}
                onClick={props.onClick}
            />
        </div>
    );
}

export default GameActionButton;