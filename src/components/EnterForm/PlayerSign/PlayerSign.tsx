import React, {useState} from "react";
import {IPlayerSignProps} from "./IPlayerSignProps";

function PlayerSign(props: IPlayerSignProps) {
    const maxLengthOfSigns = 1;
    const [isCharChecked, setIsCharChecked] = useState(true);
    const [isFileChecked, setIsFileChecked] = useState(false);
    function HandleRadioChange (type: "Char" | "File") {
        setIsCharChecked(type === "Char");
        setIsFileChecked(type === "File");
    }

    return (
        <>
            <label className="block mb-2">Your Player Sign:</label>
            <input type="radio" value="Char" id="text" name="char_or_file" checked={isCharChecked}
                   onChange={() => HandleRadioChange("Char")}/>
            <label htmlFor="char">Char</label>
            {isCharChecked && (
                <>
                    <br/>
                    <input className="inline-block text-center text-black" type="text" value={props.currentPlayer.sign}
                           onChange={(event) => props.setCurrentPlayerSign(event.currentTarget.value)}
                           maxLength={maxLengthOfSigns} data-testid="playerSign"
                    />
                </>
            )}
            <br/>
            <input type="radio" value="File" id="file" className="mb-4 mt-4" name="char_or_file" checked={isFileChecked}
                   onChange={() => HandleRadioChange("File")}/>
            <label htmlFor="file">File</label>
            {isFileChecked && (
                <input type="file" className="block text-lg mb-5" onChange={props.handleFileChange} accept="image/*"/>
            )}
        </>
    );
}

export default PlayerSign;