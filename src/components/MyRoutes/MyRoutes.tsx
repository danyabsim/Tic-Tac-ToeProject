import {Navigate, Route, Routes} from "react-router-dom";
import React, {ChangeEvent, useState} from "react";
import {IPlayer} from "../../interfaces/IPlayer";
import EnterForm from "../EnterForm/EnterForm";
import Room from "../Room/Room";
import Game from "../Game/Game";
import {noImage} from "../../XOScript";

function MyRoutes() {
    const [isOnEnter, setIsOnEnter] = useState(true);
    const [isInRoom, setIsOnRoom] = useState(false);
    const [currentPlayerName, setCurrentPlayerName] = useState('');
    const [currentPlayerSign, setCurrentPlayerSign] = useState('');
    const [fileCurrentPlayerURL, setFileCurrentPlayerURL] = useState<string | null>(null);
    const [roomCode, setRoomCode] = useState("");
    const currentPlayer: IPlayer = {name: currentPlayerName, sign: currentPlayerSign, url: fileCurrentPlayerURL};
    const defaultPlayer: IPlayer = {name: (currentPlayer.name === 'Mr. Know It All' ? 'Abra Cad-bra' : 'Mr. Know It All'), sign: (currentPlayer.sign === 'K' ? 'A' : 'K'), url: noImage};

    function ResetTheApp() {
        setIsOnRoom(false);
        setIsOnEnter(true);
        setCurrentPlayerName("");
        setCurrentPlayerSign('');
        setFileCurrentPlayerURL(null);
        setTimeout(() => setRoomCode(""), 10);
    }

    function OnEnter(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const isCurrentPlayerSignNotEmptyOrSpace = currentPlayerSign.trim() !== "" && currentPlayerSign.length === 1;
        const isCurrentPlayerURLNotEmpty = fileCurrentPlayerURL;
        if (currentPlayerName !== "" && roomCode !== "" && ((isCurrentPlayerSignNotEmptyOrSpace && !isCurrentPlayerURLNotEmpty) || (!isCurrentPlayerSignNotEmptyOrSpace && isCurrentPlayerURLNotEmpty))) {
            setIsOnEnter(false);
            setIsOnRoom(true);
            if (fileCurrentPlayerURL) setCurrentPlayerSign("File");
        } else {
            alert("Please fill in all the required fields!");
        }
    }

    function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
        const files = event.target.files;
        if (files && files.length > 0) {
            const reader = new FileReader();
            reader.onload = (e) => (e && setFileCurrentPlayerURL(e.target?.result?.toString() || null));
            reader.readAsDataURL(files[0]);
        }
    }

    return (
        <Routes>
            <Route path="/" element={isOnEnter && !isInRoom ?
                <EnterForm OnEnter={OnEnter} currentPlayer={currentPlayer} roomCode={roomCode} setRoomCode={setRoomCode}
                           setCurrentPlayerName={setCurrentPlayerName} setCurrentPlayerSign={setCurrentPlayerSign}
                           handleFileChange={handleFileChange}
                           setFileCurrentPlayerURL={setFileCurrentPlayerURL}/> : isInRoom && !isOnEnter ?
                    <Navigate to={`/room-${roomCode}`}/> : <Navigate to={`/game-${roomCode}`}/>}
            />
            <Route path={`/room-${roomCode}`} element={isInRoom && !isOnEnter ?
                <Room currentPlayer={currentPlayer} defaultPlayer={defaultPlayer} roomCode={roomCode}
                      setIsOnRoom={setIsOnRoom} ResetTheApp={ResetTheApp}/> : isOnEnter && !isInRoom ?
                    <Navigate to="/"/> : <Navigate to={`/game-${roomCode}`}/>}
            />
            <Route path={`/game-${roomCode}`} element={!isInRoom && !isOnEnter ?
                <Game firstPlayer={currentPlayer} secondPlayer={defaultPlayer}
                      ResetTheApp={ResetTheApp}/> : isOnEnter && !isInRoom ? <Navigate to="/"/> :
                    <Navigate to={`/room-${roomCode}`}/>}
            />
        </Routes>
    );
}

export default MyRoutes;