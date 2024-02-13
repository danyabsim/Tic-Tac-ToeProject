import React, {ChangeEvent} from "react";
import {EnterFormProps} from "./EnterFormProps";

function EnterForm(props: EnterFormProps) {
    const maxLengthOfSigns = 1;

    function handleFileChange(event: ChangeEvent<HTMLInputElement>, where: string) {
        const files = event.target.files;

        if (files && files.length > 0) {
            const file = files[0];
            if (where === "first") {
                props.setSelectedFirstPlayerFile(file);
            } else {
                props.setSelectedSecondPlayerFile(file);
            }

            // Read the content of the file as a data URL
            const reader = new FileReader();
            reader.onload = (e) => {
                if (e.target && e.target.result) {
                    if (where === "first") {
                        props.setFileFirstPlayerURL(e.target.result.toString());
                    } else {
                        props.setFileSecondPlayerURL(e.target.result.toString());
                    }
                }
            };
            reader.readAsDataURL(file);
        }
    }

    function handleFirstPlayerFileChange(event: ChangeEvent<HTMLInputElement>) {
        handleFileChange(event, "first");
    }

    function handleSecondPlayerFileChange(event: ChangeEvent<HTMLInputElement>) {
        handleFileChange(event, "second");
    }

    return (
        <form className="text-3xl mt-4 mb-4 text-center flex flex-col items-center" onSubmit={props.onEnter}>
            <div className="mb-10 space-y-4">
                <label className="block mb-2">First Player Name:</label>
                <input
                    className="inline-block mt-4 mb-4 text-center text-black"
                    type="text"
                    value={props.firstPlayerName}
                    onChange={(event) => {
                        props.setFirstPlayerName(event.currentTarget.value)
                    }}
                    data-testid="firstPlayerName"/>
                <label className="block mb-2">First Player Sign:</label>
                <input
                    className="inline-block mt-4 mb-4 text-center text-black"
                    type="text"
                    value={props.firstPlayerSign}
                    onChange={(event) => {
                        props.setFirstPlayerSign(event.currentTarget.value)
                    }}
                    maxLength={maxLengthOfSigns}
                    data-testid="firstPlayerSign"/>
                <br/>
                <input type="file" className="block text-lg mb-5" onChange={handleFirstPlayerFileChange} accept="image/*"/>
            </div>

            <div className="mb-10 space-y-4">
                <label className="block mb-2">Second Player Name:</label>
                <input
                    className="inline-block mt-4 mb-4 text-center text-black"
                    type="text"
                    value={props.secondPlayerName}
                    onChange={(event) => {
                        props.setSecondPlayerName(event.currentTarget.value)
                    }}
                    data-testid="secondPlayerName"/>
                <label className="block mb-2">Second Player Sign:</label>
                <input
                    className="inline-block mt-4 mb-4 text-center text-black"
                    type="text"
                    value={props.secondPlayerSign}
                    onChange={(event) => {
                        props.setSecondPlayerSign(event.currentTarget.value)
                    }}
                    maxLength={maxLengthOfSigns}
                    data-testid="secondPlayerSign"/>
                <br/>
                <input type="file" className="block text-lg mb-5" onChange={handleSecondPlayerFileChange} accept="image/*"/>
            </div>

            <div>
                <input className="mb-10 space-y-4 inline-block bg-green-500 text-black border-2 border-black font-bold cursor-pointer" type="submit" value="Enter"
                       data-testid="submit"/>
            </div>
        </form>
    );
}

export default EnterForm;