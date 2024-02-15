import React, {ChangeEvent} from "react";
import {EnterFormProps} from "./EnterFormProps";

function EnterForm(props: EnterFormProps) {
    const maxLengthOfSigns = 1;

    function handleFirstPlayerFileChange(event: ChangeEvent<HTMLInputElement>) {
        props.handleFileChange(event, "first");
    }

    function handleSecondPlayerFileChange(event: ChangeEvent<HTMLInputElement>) {
        props.handleFileChange(event, "second");
    }

    return (
        <form className="text-3xl mt-4 mb-4 text-center flex flex-col items-center" onSubmit={props.onEnter}>
            <div className="mb-10 space-y-4">
                <label className="block mb-2">Your Player Name:</label>
                <input
                    className="inline-block mt-4 mb-4 text-center text-black"
                    type="text"
                    value={props.currentPlayer.name}
                    onChange={(event) => {
                        props.setCurrentPlayerName(event.currentTarget.value)
                    }}
                    data-testid="playerName"/>
                <label className="block mb-2">Your Player Sign:</label>
                <input
                    className="inline-block mt-4 mb-4 text-center text-black"
                    type="text"
                    value={props.currentPlayer.sign}
                    onChange={(event) => {
                        props.setCurrentPlayerSign(event.currentTarget.value)
                    }}
                    maxLength={maxLengthOfSigns}
                    data-testid="playerSign"/>
                <br/>
                <input
                    type="file"
                    className="block text-lg mb-5"
                    onChange={handleFirstPlayerFileChange}
                    accept="image/*"
                />
                <label className="block mb-2">Room Code:</label>
                <input
                    className="inline-block mt-4 mb-4 text-center text-black"
                    type="text"
                    value={props.roomCode}
                    onChange={(event) => {
                        props.setRoomCode(event.currentTarget.value)
                    }}
                    data-testid="codeRoom"/>
            </div>
            <div>
                <input
                    className="mb-10 space-y-4 inline-block bg-green-500 text-black border-2 border-black font-bold cursor-pointer"
                    type="submit"
                    value="Enter"
                    data-testid="Enter"
                />
            </div>
        </form>
    );
}

export default EnterForm;