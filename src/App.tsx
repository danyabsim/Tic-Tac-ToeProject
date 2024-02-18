import React, {ChangeEvent, useState} from 'react';
import './App.css';
import Game from "./components/Game/Game";
import {BrowserRouter as Router, Navigate, Route, Routes} from 'react-router-dom';
import EnterForm from "./components/EnterForm/EnterForm";
import store from "./redux/store";
import {Provider} from "react-redux";
import {Player} from "./interfaces/Player";
import Room from "./components/Room/Room";

function App() {
    const [isOnEnter, setIsOnEnter] = useState(true);
    const [isInRoom, setIsOnRoom] = useState(false);
    const [currentPlayerName, setCurrentPlayerName] = useState('');
    const [currentPlayerSign, setCurrentPlayerSign] = useState('');
    const [, setSelectedCurrentPlayerFile] = useState<File | null>(null);
    const [fileCurrentPlayerURL, setFileCurrentPlayerURL] = useState<string | null>(null);
    const [roomCode, setRoomCode] = useState("");
    const currentPlayer: Player = {name: currentPlayerName, sign: currentPlayerSign, URL: fileCurrentPlayerURL};

    function resetTheApp() {
        setIsOnRoom(false);
        setIsOnEnter(true);
        setCurrentPlayerName("");
        setCurrentPlayerSign('');
        setSelectedCurrentPlayerFile(null);
        setFileCurrentPlayerURL(null);
        setTimeout(function (): void {
            setRoomCode("");
        }, 10);
    }

    function onEnter(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        // connection to a server to check if such username with that password exists.
        if (currentPlayerName !== "") {
            if (currentPlayerSign !== " " && currentPlayerSign !== ""
                && currentPlayerSign.length === 1) {
                if (roomCode !== "") {
                    setIsOnEnter(false);
                    setIsOnRoom(true);
                } else {
                    alert("The room code is empty!")
                }
            } else {
                alert("The sign contains only space or is empty!");
            }
        } else {
            alert("The name is empty!");
        }
    }

    function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
        const files = event.target.files;

        if (files && files.length > 0) {
            const file = files[0];
            setSelectedCurrentPlayerFile(file);

            // Read the content of the file as a data URL
            const reader = new FileReader();
            reader.onload = (e) => {
                if (e.target && e.target.result) {
                    setFileCurrentPlayerURL(e.target.result.toString());
                }
            };
            reader.readAsDataURL(file);
        }
    }

    return (
        <Provider store={store}>
            <div className="flex items-center justify-center h-screen bg-black text-white text-center">
                <Router>
                    <Routes>
                        <Route
                            path="/"
                            element={
                                isOnEnter && !isInRoom ? (
                                    <EnterForm
                                        onEnter={onEnter}
                                        currentPlayer={currentPlayer}
                                        roomCode={roomCode}
                                        setRoomCode={setRoomCode}
                                        setCurrentPlayerName={setCurrentPlayerName}
                                        setCurrentPlayerSign={setCurrentPlayerSign}
                                        handleFileChange={handleFileChange}
                                    />
                                ) : (
                                    isInRoom && !isOnEnter ? (
                                        <Navigate to={`/room-${roomCode}`}/>
                                    ) : (
                                        <Navigate to={`/game-${roomCode}`}/>
                                    )
                                )
                            }
                        />
                        <Route
                            path={`/room-${roomCode}`}
                            element={
                                isInRoom && !isOnEnter ? (
                                    <Room
                                        currentPlayer={currentPlayer}
                                        roomCode={roomCode}
                                        setIsOnRoom={setIsOnRoom}
                                    />
                                ) : (
                                    isOnEnter && !isInRoom ? (
                                        <Navigate to="/"/>
                                    ) : (
                                        <Navigate to={`/game-${roomCode}`}/>
                                    )
                                )
                            }
                        />
                        <Route
                            path={`/game-${roomCode}`}
                            element={
                                !isInRoom && !isOnEnter ? (
                                    <Game
                                        firstPlayer={currentPlayer}
                                        secondPlayer={currentPlayer}
                                        resetTheApp={resetTheApp}
                                    />
                                ) : (
                                    isOnEnter && !isInRoom ? (
                                        <Navigate to="/"/>
                                    ) : (
                                        <Navigate to={`/room-${roomCode}`}/>
                                    )
                                )
                            }
                        />
                    </Routes>
                </Router>
            </div>
        </Provider>
    );
}

export default App;
