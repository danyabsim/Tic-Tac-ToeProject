import React, {useState} from 'react';
import './App.css';
import Game from "./components/Game/Game";
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import EnterForm from "./components/EnterForm/EnterForm";

function App() {
    const [isOnEnter, setIsOnEnter] = useState(true);
    const [firstPlayerName, setFirstPlayerName] = useState('');
    const [secondPlayerName, setSecondPlayerName] = useState('');

    function onEnter(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        // connection to a server to check if such username with that password exists.
        if (firstPlayerName !== "" && secondPlayerName !== "") {
            setIsOnEnter(false);
        } else {
            alert("At least one of the player names is not set up!");
        }
    }

    return (
        <div className="centered-form">
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
                                />
                            ) : (
                                <Navigate to="/game" />
                            )
                        }
                    />
                    <Route
                        path="/game"
                        element={
                            !isOnEnter ? (
                                <Game
                                    firstPlayerName={firstPlayerName}
                                    secondPlayerName={secondPlayerName}
                                />
                            ) : (
                                <Navigate to="/" />
                            )
                        }
                    />
                </Routes>
            </Router>
        </div>
    );
}

export default App;
