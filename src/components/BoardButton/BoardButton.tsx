import React from "react";
import {BoardButtonProps} from "./BoardButtonProps";

function BoardButton(props: BoardButtonProps) {
    const noImage = process.env.PUBLIC_URL + 'grunge-black-concrete-textured-background_53876-124541.avif';

    function onClickXOElement(event: React.MouseEvent<HTMLDivElement>) {
        if (props.onClick) {
            props.onClick(event);
        }
    }

    function addBorderPerId(id: string): string {
        const XO_Column = parseInt(id.charAt(2));
        const XO_Row = parseInt(id.charAt(3));
        let borderResult = "border-white";
        if (XO_Row === 1 || XO_Row === 2) {
            borderResult += " border-b-2";
        }
        if (XO_Column === 1 || XO_Column === 2) {
            borderResult += " border-r-2";
        }
        if (XO_Column === 2 || XO_Column === 3) {
            borderResult += " border-l-2";
        }
        if (XO_Row === 2 || XO_Row === 3) {
            borderResult += " border-t-2";
        }
        return borderResult;
    }

    return (
        <div
            id={props.id}
            onClick={onClickXOElement}
            className={`flex items-center justify-center text-4xl h-24 w-24 mx-auto ${(props.className === "XO" ? "bg-black text-white" : "font-bold underline bg-green-500")} ${addBorderPerId(props.id as string)}`}
        >
            {(props.fileURL === noImage) ? (
                <input
                    type="button"
                    className="m-0"
                    value={props.value}
                />
            ) : (
                <img
                    className="object-cover"
                    src={props.fileURL as string}
                    alt={props.value as string}
                />
            )}
        </div>
    );
}

export default BoardButton;