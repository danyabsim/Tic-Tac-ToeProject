import React, {useState} from 'react';
import './App.css';
import Game from "./components/Game";

function App() {
    const [isOnEnter, setIsOnEnter] = useState(true);
    const [firstPlayerName, setFirstPlayerName] = useState('');
    const [secondPlayerName, setSecondPlayerName] = useState('');
    const [isFirstPlayerStars, setIsFirstPlayerStars] = useState(true);
    const [XOArray, setXOArray] = useState([["","",""],["","",""],["","",""]]);
    const [firstPlayerResults, setFirstPlayerResults] = useState(0);
    const [secondPlayerResults, setSecondPlayerResults] = useState(0);
    const [tieResults, setTieResults] = useState(0);
    const colSpan = 2;

    function onChangeFirstPlayerName(event: React.ChangeEvent<HTMLInputElement>) {
        setFirstPlayerName(event.currentTarget.value);
    }

    function onChangeSecondPlayerName(event: React.ChangeEvent<HTMLInputElement>) {
        setSecondPlayerName(event.currentTarget.value);
    }
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
        <div>
            {isOnEnter ? (
                <form id="enter" onSubmit={onEnter}>
                    <table>
                        <tbody>
                            <tr>
                                <td>
                                    <label htmlFor="firstPlayer">First Player Name:</label>
                                </td>
                                <td>
                                    <input id="firstPlayer" type="text" value={firstPlayerName} onChange={onChangeFirstPlayerName} data-testid="firstPlayer" />
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <label htmlFor="secondPlayer">Second Player Name:</label>
                                </td>
                                <td>
                                    <input id="secondPlayer" type="text" value={secondPlayerName} onChange={onChangeSecondPlayerName} data-testid="SecondPlayer" />
                                </td>
                            </tr>
                            <tr>
                                <td colSpan={colSpan}>
                                    <input id="submit" type="submit" value="Enter" data-testid="submit" />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </form>
            ) : (
                <Game
                    firstPlayerResults={firstPlayerResults}
                    setFirstPlayerResults={setFirstPlayerResults}
                    tieResults={tieResults}
                    setTieResults={setTieResults}
                    secondPlayerResults={secondPlayerResults}
                    setSecondPlayerResults={setSecondPlayerResults}
                    firstPlayerName={firstPlayerName}
                    secondPlayerName={secondPlayerName}
                    isFirstPlayerStars={isFirstPlayerStars}
                    setIsFirstPlayerStars={setIsFirstPlayerStars}
                    XOArray={XOArray}
                    setXOArray={setXOArray} />
            )}
        </div>
    );
}

export default App;
