import React, {useState} from "react";
import {IPlayerSignProps} from "./IPlayerSignProps";
import InputEnterForm from "../InputEnterForm/InputEnterForm";
import {useDropzone} from "react-dropzone";
import ToggleButton from "./ToggleButton/ToggleButton";
import {IOption} from "./ToggleButton/IOption";

function PlayerSign(props: IPlayerSignProps) {
    const maxLengthOfSigns = 1;
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

    const {getRootProps, getInputProps, isDragActive} = useDropzone({
        accept: {
            'image/png': ['.png'],
            'image/jpg': ['.jpg'],
            'image/jpeg': ['.jpeg'],
            'text/html': ['.html', '.htm'],
            'image/svg': ['.svg']
        },
        onDrop: (acceptedFiles: File[]) => {
            // Handle the dropped files
            props.handleFileChange(acceptedFiles);
        },
    });

    return (
        <>
            <ToggleButton firstOption={firstOption} secondOption={secondOption}/>
            <label className="block mb-2">Your Player Sign:</label>
            {isCharChecked && (
                <InputEnterForm value={props.currentPlayer.sign} maxLength={maxLengthOfSigns}
                                onChange={(event) => props.setCurrentPlayerSign(event.currentTarget.value)}/>
            )}
            {isFileChecked && (
                <div {...getRootProps()} className="bg-green-500 inline-block mt-4 mb-4 text-black p-1">
                    <input {...getInputProps()} />
                    {props.currentPlayer.url && <>File was inputted here!<br/></>}
                    {isDragActive ? ("Drop the files here...") : ("Drag 'n' drop some files here, or click to select files!")}
                </div>
            )}
        </>
    );
}

export default PlayerSign;