import React, {useState} from "react";
import {IPlayerSignProps} from "./IPlayerSignProps";
import InputEnterForm from "../InputEnterForm/InputEnterForm";
import {useDropzone} from "react-dropzone";
import ToggleButton from "./ToggleButton/ToggleButton";

function PlayerSign(props: IPlayerSignProps) {
    const maxLengthOfSigns = 1;
    const [isCharChecked, setIsCharChecked] = useState(true);
    const [isFileChecked, setIsFileChecked] = useState(false);
    const firstOption =
        {
            label: "One Letter Sign",
            onChange: () => {
                HandleRadioChange("Char");
                props.setFileCurrentPlayerURL(null);
            }
        };
    const secondOption =
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
                <>
                    <InputEnterForm value={props.currentPlayer.sign} maxLength={maxLengthOfSigns}
                                    onChange={(event) => props.setCurrentPlayerSign(event.currentTarget.value)}/>
                </>
            )}
            {isFileChecked && (
                // <input type="file" className="block text-lg mb-5" onChange={props.handleFileChange} accept="image/*"/>
                <div {...getRootProps()} className="bg-green-500 text-black">
                    <input {...getInputProps()} />
                    {isDragActive ? (
                        <p>Drop the files here...</p>
                    ) : (
                        <p>Drag 'n' drop some files here, or click to select files!</p>
                    )}
                </div>
            )}
        </>
    );
}

export default PlayerSign;