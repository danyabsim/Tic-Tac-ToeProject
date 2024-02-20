import {IRoomProps} from "./IRoomProps";
import React, {useState} from "react";
import GameActionButton from "../GameActionButton/GameActionButton";
import {useSelector} from "react-redux";
import {RootState} from "../../redux/store";

function Room(props: IRoomProps) {
    // const dispatch = useDispatch();
    // const players = useSelector((state: RootState) => state.players.playersData);

    // useEffect(() => {
    //     // Simulate fetching data from an API
    //     const fetchData = async () => {
    //         try {
    //             const response = await fetch('your/api/endpoint');
    //             const data = await response.json();
    //             dispatch(addNewPlayer(data));
    //         } catch (error) {
    //             console.error('Error fetching data:', error);
    //         }
    //     };
    //
    //     fetchData();
    // }, [dispatch]);

    let players = useSelector((state: RootState) => state.players.data); // need to be taken from server
    const [readyBool, setReadyBool] = useState<boolean[]>(Array(players.length).fill(false));

    return (
        <div className="text-black">
            <h2 className="border-b-0 bg-green-500 m-0">
                {players.length === 2 && readyBool.every(value => value) ? "Game will be started shortly!" : "Waiting For Players..."}
            </h2>
            <h3 className="text-white">Room code: {props.roomCode}</h3>
            {players.map((player, index) => (
                <div>
                    <h4 className="text-white">{index + 1}: {player.name} ({player.sign})</h4>
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