import React from "react";
import {BoardButtonProps} from "./BoardButtonProps";
import {divStyle} from "./BoardButtonScriptsStyle";

function BoardButton(props: BoardButtonProps) {
    const noImage = process.env.PUBLIC_URL + 'grunge-black-concrete-textured-background_53876-124541.avif';

    function onClickXOElement(event: React.MouseEvent<HTMLDivElement>) {
        if (props.onClick) {
            props.onClick(event);
        }
    }

    return (
        <div
            style={divStyle()}
            id={props.id}
            onClick={onClickXOElement}
            className={props.className}
        >
            {(props.fileURL === noImage) ? (
                <input
                    type="button"
                    className={props.className}
                    value={props.value}
                />
            ) : (
                <img
                    src={props.fileURL as string}
                    alt={props.value as string}
                />
            )}
        </div>
    );
}

export default BoardButton;