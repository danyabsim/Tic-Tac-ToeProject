import React, {useState} from 'react';
import './App.css';
import Game from "./components/Game/Game";
import {BrowserRouter as Router, Navigate, Route, Routes} from 'react-router-dom';
import EnterForm from "./components/EnterForm/EnterForm";
import store from "./redux/store";
import {Provider} from "react-redux";

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
                                        firstPlayerName={firstPlayerName}
                                        setFirstPlayerName={setFirstPlayerName}
                                        secondPlayerName={secondPlayerName}
                                        setSecondPlayerName={setSecondPlayerName}
                                        firstPlayerSign={firstPlayerSign}
                                        setFirstPlayerSign={setFirstPlayerSign}
                                        secondPlayerSign={secondPlayerSign}
                                        setSecondPlayerSign={setSecondPlayerSign}
                                        setSelectedFirstPlayerFile={setSelectedFirstPlayerFile}
                                        setSelectedSecondPlayerFile={setSelectedSecondPlayerFile}
                                        setFileFirstPlayerURL={setFileFirstPlayerURL}
                                        setFileSecondPlayerURL={setFileSecondPlayerURL}
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
                                        firstPlayer={{name: firstPlayerName, sign: firstPlayerSign, URL: fileFirstPlayerURL}}
                                        secondPlayer={{name: secondPlayerName, sign: secondPlayerSign, URL: fileSecondPlayerURL}}
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
