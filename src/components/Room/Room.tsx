import {Player} from "../../interfaces/Player";
import {RoomProps} from "./RoomProps";
import {useState} from "react";
import GameActionButton from "../GameActionButton/GameActionButton";

function Room(props: RoomProps) {
    let players: Player[] = [props.currentPlayer, props.defaultPlayer]; // need to be taken from server
    const [readyBool, setReadyBool] = useState([false, false]); // need to be taken from server

    function onClickReadyBool(index: number) {
        setReadyBool(prevState => {
            let tempReadyBool = [...prevState];
            tempReadyBool[index] = !tempReadyBool[index];
            return tempReadyBool;
        });
    }

    return (
        <div className="text-black text-4xl text-center">
            <h1 className="text-4xl border-b-0 bg-green-500 m-0">{players.length === 2 && readyBool.every(value => value) ? "Hello!" : "Waiting For Players..."}</h1>
            <h2 className="text-white">Room code: {props.roomCode}</h2>
            {players.map((player, index) => (
                <div>
                    <h3 className="text-white">{index + 1}: {player.name} ({player.sign})</h3>
                    <GameActionButton
                        className={`bg-black ${readyBool[index] ? "text-green-500" : "text-red-500"}`}
                        value={readyBool[index] ? "Ready" : "Not Ready"}
                        onClick={() => {
                            onClickReadyBool(index)
                        }}
                    />
                </div>
            ))}
            {players.length === 2 && readyBool.every(value => value) ?
                <GameActionButton
                    value="Play!"
                    onClick={() => {
                        props.setIsOnRoom(false);
                    }}
                />
                :
                <>
                </>
            }
        </div>
    );
}

export default Room;