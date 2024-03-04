import {Navigate, Route, Routes} from "react-router-dom";
import React, {useEffect, useState} from "react";
import EnterForm from "../EnterForm/EnterForm";
import Room from "../Room/Room";
import Game from "../Game/Game";
import {useDispatch} from "react-redux";
import {removeLastPlayer} from "../../redux/Players/playersSlice";

function MyRoutes() {
    const [isOnEnter, setIsOnEnter] = useState(true);
    const [isInRoom, setIsOnRoom] = useState(false);
    const [roomCode, setRoomCode] = useState("");
    const dispatch = useDispatch();

    function ResetTheApp() {
        dispatch(removeLastPlayer());
        dispatch(removeLastPlayer());
        setIsOnRoom(false);
        setIsOnEnter(true);
        //await Client({functionName: 'removeAllPlayersInThisRoomCode', args: [roomCode]});
        setTimeout(() => setRoomCode(""), 10);
    }

    function OnEnter() {
        setIsOnEnter(false);
        setIsOnRoom(true);
    }

    useEffect(() => {
        ResetTheApp();
        if (performance.getEntriesByType("navigation")[0].type === "reload") {
            window.location.href = "/";
        }
        // eslint-disable-next-line
    }, []);

    return (
        <>
            <Routes>
                <Route path="/" element={isOnEnter && !isInRoom ?
                    <EnterForm OnEnter={OnEnter} roomCode={roomCode} setRoomCode={setRoomCode}/> : isInRoom && !isOnEnter ?
                        <Navigate to={`/room-${roomCode}`}/> : <Navigate to={`/game-${roomCode}`}/>}
                />
                <Route path={`/room-${roomCode}`} element={isInRoom && !isOnEnter ?
                    <Room roomCode={roomCode} setIsOnRoom={setIsOnRoom} ResetTheApp={ResetTheApp}/>
                    : isOnEnter && !isInRoom ? <Navigate to="/"/> : <Navigate to={`/game-${roomCode}`}/>}
                />
                <Route path={`/game-${roomCode}`} element={!isInRoom && !isOnEnter ?
                    <Game ResetTheApp={ResetTheApp}/> : isOnEnter && !isInRoom ? <Navigate to="/"/> :
                        <Navigate to={`/room-${roomCode}`}/>}
                />
            </Routes>
        </>
    );
}

export default MyRoutes;