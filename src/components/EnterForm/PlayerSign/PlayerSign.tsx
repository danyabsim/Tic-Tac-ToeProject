import React, {useState} from "react";
import {IPlayerSignProps} from "./IPlayerSignProps";

function PlayerSign(props: IPlayerSignProps) {
    const maxLengthOfSigns = 1;
    const [isCharChecked, setIsCharChecked] = useState(false);
    const [isFileChecked, setIsFileChecked] = useState(false);

    return (
        <>
            <label className="block mb-2">Your Player Sign:</label>
            <input
                type="radio"
                value="Char"
                id="text"
                name="char_or_file"
                checked={isCharChecked}
                onChange={() => {
                    setIsCharChecked(true);
                    setIsFileChecked(false);
                }}
            />
            <label htmlFor="char">Char</label>
            {isCharChecked ? (
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
                name="char_or_file"
                checked={isFileChecked}
                onChange={() => {
                    setIsFileChecked(true);
                    setIsCharChecked(false);
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