import {IRoomProps} from "./IRoomProps";
import React, {useState} from "react";
import GameActionButton from "../GameActionButton/GameActionButton";
import {useSelector} from "react-redux";
import {RootState} from "../../redux/store";

function Room(props: IRoomProps) {
    let players = useSelector((state: RootState) => state.players.data); // need to be taken from server
    const [readyBool, setReadyBool] = useState<boolean[]>(Array(players.length).fill(false));

    return (
        <div className="text-black">
            <h2 className="border-b-0 bg-green-500 m-0 p-2">
                {players.length === 2 && readyBool.every(value => value) ? "Game will be started shortly!" : "Waiting For Players..."}
            </h2>
            <h3 className="text-white mb-4 mt-4">Room code: {props.roomCode}</h3>
            {players.map((player, index) => (
                <div>
                    <h4 className="text-white">{player.name} ({player.sign})</h4>
                    <GameActionButton
                        className={`bg-black ${readyBool[index] ? "text-green-500" : "text-red-500"}`}
                        value={readyBool[index] ? "Ready" : "Not Ready"}
                        onClick={() => {
                            setReadyBool(prevState => {
                                let tempReadyBool = [...prevState];
                                tempReadyBool[index] = !tempReadyBool[index];
                                if (tempReadyBool.every(value => value)) setTimeout(() => props.setIsOnRoom(false), 2000)
                                return tempReadyBool;
                            })
                        }}
                    />
                </div>
            ))}
            <GameActionButton onClick={props.ResetTheApp} value="Exit"/>
        </div>
    );
}

export default Room;