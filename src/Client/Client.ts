import {useEffect} from "react";
import * as signalR from "@microsoft/signalr";
import {IPlayer} from "../redux/Players/IPlayer";

function Client(props: { functionName: string, args: (...args: any[]) => any }) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    let players: IPlayer[];

    useEffect(() => {
        const connection = new signalR.HubConnectionBuilder()
            .withUrl('/hub') // Adjust the URL as needed
            .build();

        if (props.functionName === 'removeAllPlayersInThisRoomCode' || props.functionName === 'getAllPlayersInThisRoomCode' || props.functionName === 'addPlayer') {
            connection.invoke(props.functionName, props.args()).then(receivedPlayers => {
                console.log("Received players:", receivedPlayers);
                // eslint-disable-next-line react-hooks/exhaustive-deps
                players = receivedPlayers as IPlayer[]; // Save the players in a variable
            }).catch(error => {
                console.error("Error: ", error);
            });
        }

        connection.start().catch((err) => console.error(err));

        return () => {
            connection.stop().catch((err) => console.error(err));
        };
    }, [props]);
}

export default Client;