import React from "react";
import {IEnterFormProps} from "./IEnterFormProps";
import PlayerSign from "./PlayerSign/PlayerSign";
import PlayerName from "./PlayerName/PlayerName";
import RoomCode from "./RoomCode/RoomCode";

function EnterForm(props: IEnterFormProps) {
    return (
        <form
            className="text-3xl text-center flex flex-col items-center"
            onSubmit={props.onEnter}
        >
            <div className="space-y-4">
                <PlayerName
                    currentPlayer={props.currentPlayer}
                    setCurrentPlayerName={props.setCurrentPlayerName}
                />
                <PlayerSign
                    currentPlayer={props.currentPlayer}
                    setCurrentPlayerSign={props.setCurrentPlayerSign}
                    handleFileChange={props.handleFileChange}
                />
                <RoomCode
                    roomCode={props.roomCode}
                    setRoomCode={props.setRoomCode}
                />
                <br/>
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