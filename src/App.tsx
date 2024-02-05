import React, {useState} from 'react';
import './App.css';
import Game from "./components/Game/Game";
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

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
                                <form id="enter" onSubmit={onEnter}>
                                    <div className="form-group">
                                        <label htmlFor="firstPlayer">First Player Name (X):</label>
                                        <input id="firstPlayer" type="text" value={firstPlayerName} onChange={(event) => {setFirstPlayerName(event.currentTarget.value)}} data-testid="firstPlayer" />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="secondPlayer">Second Player Name (O):</label>
                                        <input id="secondPlayer" type="text" value={secondPlayerName} onChange={(event) => {setSecondPlayerName(event.currentTarget.value)}} data-testid="secondPlayer" />
                                    </div>

                                    <div className="form-group">
                                        <input id="submit" type="submit" value="Enter" data-testid="submit" />
                                    </div>
                                </form>
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
