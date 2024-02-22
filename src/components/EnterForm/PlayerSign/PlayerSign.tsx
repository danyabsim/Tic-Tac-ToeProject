import React, {useState} from "react";
import {IPlayerSignProps} from "./IPlayerSignProps";
import InputEnterForm from "../InputEnterForm/InputEnterForm";
import ToggleButton from "./ToggleButton/ToggleButton";
import {IOption} from "./ToggleButton/IOption";
import DragAndDrop from "./DragAndDrop/DragAndDrop";

function PlayerSign(props: IPlayerSignProps) {
    const [isCharChecked, setIsCharChecked] = useState(true);
    const [isFileChecked, setIsFileChecked] = useState(false);
    const firstOption: IOption =
        {
            label: "One Letter Sign",
            onChange: () => {
                HandleRadioChange("Char");
                props.setFileCurrentPlayerURL(null);
            }
        };
    const secondOption: IOption =
        {
            label: "File",
            onChange: () => {
                HandleRadioChange("File");
                props.setCurrentPlayerSign("");
            }
        };

    function HandleRadioChange(type: "Char" | "File") {
        setIsCharChecked(type === "Char");
        setIsFileChecked(type === "File");
    }

    return (
        <>
            <ToggleButton firstOption={firstOption} secondOption={secondOption}/>
            <label className="block mb-2">Your Player Sign:</label>
            {isCharChecked && (
                <InputEnterForm value={props.currentPlayer.sign} maxLength={1}
                                onChange={(event) => props.setCurrentPlayerSign(event.currentTarget.value)}/>
            )}
            {isFileChecked && (
                <DragAndDrop url={props.currentPlayer.url} handleFileChange={props.handleFileChange}/>
            )}
        </>
    );
}

export default PlayerSign;