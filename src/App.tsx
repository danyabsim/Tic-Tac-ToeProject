import React, {ChangeEvent, useState} from 'react';
import './App.css';
import Game from "./components/Game/Game";
import {BrowserRouter as Router, Navigate, Route, Routes} from 'react-router-dom';
import EnterForm from "./components/EnterForm/EnterForm";
import store from "./redux/store";
import {Provider} from "react-redux";
import {Player} from "./components/Player/Player";

function App() {
    const [isOnEnter, setIsOnEnter] = useState(true);
    const [firstPlayerName, setFirstPlayerName] = useState('');
    const [secondPlayerName, setSecondPlayerName] = useState('');
    const [firstPlayerSign, setFirstPlayerSign] = useState('X');
    const [secondPlayerSign, setSecondPlayerSign] = useState('O');
    const [, setSelectedFirstPlayerFile] = useState<File | null>(null);
    const [, setSelectedSecondPlayerFile] = useState<File | null>(null);
    const [fileFirstPlayerURL, setFileFirstPlayerURL] = useState<string | null>(null);
    const [fileSecondPlayerURL, setFileSecondPlayerURL] = useState<string | null>(null);
    const firstPlayer: Player = {name: firstPlayerName, sign: firstPlayerSign, URL: fileFirstPlayerURL};
    const secondPlayer: Player = {name: secondPlayerName, sign: secondPlayerSign, URL: fileSecondPlayerURL};

    function resetTheApp() {
        setIsOnEnter(true);
        setFirstPlayerName("");
        setSecondPlayerName("");
        setFirstPlayerSign('X');
        setSecondPlayerSign('O');
        setSelectedFirstPlayerFile(null);
        setSelectedSecondPlayerFile(null);
        setFileFirstPlayerURL(null);
        setFileSecondPlayerURL(null);
    }

    function onEnter(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        // connection to a server to check if such username with that password exists.
        if (firstPlayerName !== "" && secondPlayerName !== "" && firstPlayerName !== secondPlayerName) {
            if (firstPlayerSign !== " " && firstPlayerSign !== ""
                && secondPlayerSign !== " " && secondPlayerSign !== ""
                && firstPlayerSign !== secondPlayerSign
                && firstPlayerSign.length === 1 && secondPlayerSign.length === 1) {
                setIsOnEnter(false);
            } else {
                alert("Either at least one of the signs contain only space or empty or both are the same!");
            }
        } else {
            alert("Either at least one of the names are not set up or both are the same!");
        }
    }

    function handleFileChange(event: ChangeEvent<HTMLInputElement>, where: string) {
        const files = event.target.files;

        if (files && files.length > 0) {
            const file = files[0];
            if (where === "first") {
                setSelectedFirstPlayerFile(file);
            } else {
                setSelectedSecondPlayerFile(file);
            }

            // Read the content of the file as a data URL
            const reader = new FileReader();
            reader.onload = (e) => {
                if (e.target && e.target.result) {
                    if (where === "first") {
                        setFileFirstPlayerURL(e.target.result.toString());
                    } else {
                        setFileSecondPlayerURL(e.target.result.toString());
                    }
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
                                isOnEnter ? (
                                    <EnterForm
                                        onEnter={onEnter}
                                        firstPlayer={firstPlayer}
                                        secondPlayer={secondPlayer}
                                        setFirstPlayerName={setFirstPlayerName}
                                        setSecondPlayerName={setSecondPlayerName}
                                        setFirstPlayerSign={setFirstPlayerSign}
                                        setSecondPlayerSign={setSecondPlayerSign}
                                        handleFileChange={handleFileChange}
                                    />
                                ) : (
                                    <Navigate to="/game"/>
                                )
                            }
                        />
                        <Route
                            path="/game"
                            element={
                                !isOnEnter ? (
                                    <Game
                                        firstPlayer={firstPlayer}
                                        secondPlayer={secondPlayer}
                                        resetTheApp={resetTheApp}
                                    />
                                ) : (
                                    <Navigate to="/"/>
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
