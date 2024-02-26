import React, {useEffect, useRef, useState} from "react";
import {IPlayer} from "../redux/Players/IPlayer";
import {IClientProps} from "./IClientProps";
import {io, Socket} from "socket.io-client";
import {DefaultEventsMap} from "socket.io/dist/typed-events";

//import * as signalR from '@microsoft/signalr';

function Client(props: IClientProps) {
    const [players, setPlayers] = useState<IPlayer[]>([]);
    const socketRef = useRef<Socket<DefaultEventsMap, DefaultEventsMap>>();

    useEffect(() => {
        if (props.isOn) {
            console.log("Hey! server is on");
            console.log([props.functionName, props.args, props.isOn]);
            socketRef.current = io("http://localhost:5000", {path: '/'});
            socketRef.current = socketRef.current?.on("connect", () => console.log("Connected to the server!"));
            socketRef.current = socketRef.current?.connect();
            socketRef.current = socketRef.current?.open();
            const allowedFunctions = ['removeAllPlayersInThisRoomCode', 'getAllPlayersInThisRoomCode', 'addPlayer'];
            if (allowedFunctions.includes(props.functionName)) socketRef.current = socketRef.current?.emit(props.functionName, ...props.args);
            else console.error(`Invalid functionName: ${props.functionName}`);

            socketRef.current = socketRef.current?.on("error", (error) => console.error(`Error in ${props.functionName} function: `, error));

            socketRef.current = socketRef.current?.on("disconnect", (reason) => console.log("Disconnected from the server: ", reason));

            socketRef.current = socketRef.current?.on('playerAdded', (newPlayer) => {
                if (newPlayer.roomCode === props.args[0]) setPlayers([...players, newPlayer]);
            });

            socketRef.current = socketRef.current?.on('playersRemoved', (roomCode) => {
                console.log(`All players removed in room ${roomCode}`);
                if (roomCode === props.args[0]) setPlayers([]);
            });

            socketRef.current = socketRef.current?.on('allPlayersInRoom', (roomPlayers) => {
                console.log('Received all players in the room: ', roomPlayers);
                setPlayers(roomPlayers);
            });

            console.log(socketRef.current);

            return () => {
                socketRef.current = socketRef.current?.disconnect();
            };
        }
    }, [props, players]);

    // useEffect(() => {
    //     const connection = new signalR.HubConnectionBuilder()
    //         .withUrl("http://localhost:5000", signalR.HttpTransportType.WebSockets | signalR.HttpTransportType.LongPolling)
    //         .withAutomaticReconnect()
    //         .build();
    //
    //     connection.start().then(() => {
    //         console.log("Connection started");
    //
    //         const allowedFunctions = ['removeAllPlayersInThisRoomCode', 'getAllPlayersInThisRoomCode', 'addPlayer'];
    //         if (allowedFunctions.includes(props.functionName))
    //             connection.invoke(props.functionName, ...props.args)
    //                 .then((receivedPlayers) => {
    //                     console.log("Received players: ", receivedPlayers);
    //                     setPlayers([...receivedPlayers]);
    //                 }).catch((error) => console.error(`Error invoking ${props.functionName}: `, error));
    //
    //         connection.on('playerAdded', (newPlayer) => {
    //             if (newPlayer.roomCode === props.args[0]) setPlayers([...players, newPlayer]);
    //         });
    //
    //         connection.on('playersRemoved', (roomCode) => {
    //             console.log(`All players removed in room ${roomCode}`);
    //             if (roomCode === props.args[0]) setPlayers([]);
    //         });
    //
    //         connection.on('allPlayersInRoom', (roomPlayers) => {
    //             console.log('Received all players in the room: ', roomPlayers);
    //             setPlayers(roomPlayers);
    //         });
    //     }).catch((err) => console.error("Error starting connection: ", err));
    //
    //     return () => {
    //         connection.stop().catch((err) => console.error(err));
    //     };
    // }, [props]);

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