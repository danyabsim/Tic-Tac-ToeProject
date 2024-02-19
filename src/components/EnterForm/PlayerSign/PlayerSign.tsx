import React, {useState} from "react";
import {IPlayerSignProps} from "./IPlayerSignProps";

function PlayerSign(props: IPlayerSignProps) {
    const maxLengthOfSigns = 1;
    const [isTextChecked, setIsTextChecked] = useState(false);
    const [isFileChecked, setIsFileChecked] = useState(false);

    return (
        <>
            <label className="block mb-2">Your Player Sign:</label>
            <input
                type="radio"
                value="Text"
                id="text"
                name="text_or_file"
                checked={isTextChecked}
                onChange={() => {
                    setIsTextChecked(true);
                    setIsFileChecked(false);
                }}
            />
            <label htmlFor="text">Text</label>
            {isTextChecked ? (
                <>
                    <br/>
                    <input
                        className="inline-block text-center text-black"
                        type="text"
                        value={props.currentPlayer.sign}
                        onChange={(event) => {
                            props.setCurrentPlayerSign(event.currentTarget.value);
                        }}
                        maxLength={maxLengthOfSigns}
                        data-testid="playerSign"
                    />
                </>
            ) : null}
            <br />
            <input
                type="radio"
                value="File"
                id="file"
                className="mb-4 mt-4"
                name="text_or_file"
                checked={isFileChecked}
                onChange={() => {
                    setIsFileChecked(true);
                    setIsTextChecked(false);
                }}
            />
            <label htmlFor="file">File</label>
            {isFileChecked ? (
                <input
                    type="file"
                    className="block text-lg mb-5"
                    onChange={props.handleFileChange}
                    accept="image/*"
                />
            ) : null}
        </>
    );
}

export default PlayerSign;