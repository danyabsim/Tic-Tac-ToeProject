import React from "react";
import {IEnterFormProps} from "./IEnterFormProps";
import PlayerSign from "./PlayerSign/PlayerSign";
import PlayerName from "./PlayerName/PlayerName";
import RoomCode from "./RoomCode/RoomCode";
import GameActionButton from "../GameActionButton/GameActionButton";

function EnterForm(props: IEnterFormProps) {
    return (
        <form className="text-3xl text-center flex flex-col items-center" onSubmit={props.onEnter}>
            <div className="space-y-4">
                <PlayerName currentPlayer={props.currentPlayer} setCurrentPlayerName={props.setCurrentPlayerName}/>
                <PlayerSign currentPlayer={props.currentPlayer} setCurrentPlayerSign={props.setCurrentPlayerSign}
                            handleFileChange={props.handleFileChange}/>
                <RoomCode roomCode={props.roomCode} setRoomCode={props.setRoomCode}/>
                <br/>
                <GameActionButton className="text-black" value="Enter" type="submit"/>
            </div>
        </form>
    );
}

export default EnterForm;