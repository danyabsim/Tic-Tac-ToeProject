import React, {useState} from 'react';
import './App.css';
import Game from "./components/Game/Game";
import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';
import EnterForm from "./components/EnterForm/EnterForm";
import store from "./redux/store";
import {Provider} from "react-redux";

function App() {
    const [isOnEnter, setIsOnEnter] = useState(true);
    const [firstPlayerName, setFirstPlayerName] = useState('');
    const [secondPlayerName, setSecondPlayerName] = useState('');

    function resetTheApp() {
        setIsOnEnter(true);
        setFirstPlayerName("");
        setSecondPlayerName("");
    }

    function onEnter(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        // connection to a server to check if such username with that password exists.
        if (firstPlayerName !== "" && secondPlayerName !== "" && firstPlayerName !== secondPlayerName) {
            setIsOnEnter(false);
        } else {
            alert("Either at least one of the names is not set up or both are the same!");
        }
    }

    return (
        <Provider store={store}>
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
                                        resetTheApp={resetTheApp}
                                    />
                                ) : (
                                    <Navigate to="/" />
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
