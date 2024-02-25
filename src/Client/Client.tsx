import React, {useEffect, useState} from "react";
import {IPlayer} from "../redux/Players/IPlayer";
import {IClientProps} from "./IClientProps";
import {io} from "socket.io-client";

function Client(props: IClientProps) {
    const [players, setPlayers] = useState<IPlayer[]>([]);

    useEffect(() => {
        if (props.isOn) {
            const socket = io("http://localhost:5000", {
                path: "/",
            });

            // Validate allowed function names
            const allowedFunctions = ['removeAllPlayersInThisRoomCode', 'getAllPlayersInThisRoomCode', 'addPlayer'];
            if (allowedFunctions.includes(props.functionName)) {
                socket.emit(props.functionName, props.args);
            } else if (props.functionName === 'getAllPlayersInThisRoomCode') {
                socket.on(props.functionName, receivedPlayers => {
                    console.log("Received players: ", receivedPlayers);
                    setPlayers([...receivedPlayers]);
                });
            } else {
                console.error(`Invalid functionName: ${props.functionName}`);
            }
            // More specific error handling based on function
            socket.on("error", (error) => {
                console.error(`Error in ${props.functionName} function:`, error);
            });

            return () => {
                socket.disconnect();
            };
        }
    }, [props]);

    return (
        <div>
            {players.map((player, index) => (
                <div key={index}>
                    {player.name}, {player.sign}, {player.url}, {player.roomCode}
                </div>
            ))}
        </div>
    );
}

export default Client;