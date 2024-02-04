import React, {useState} from 'react';
import './App.css';
import Game from "./components/Game/Game";

function App() {
    const [isOnEnter, setIsOnEnter] = useState(true);
    const [firstPlayerName, setFirstPlayerName] = useState('');
    const [secondPlayerName, setSecondPlayerName] = useState('');
    const colSpan = 2;

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
                                    <label htmlFor="firstPlayer">First Player Name (X):</label>
                                </td>
                                <td>
                                    <input id="firstPlayer" type="text" value={firstPlayerName} onChange={(event) => {setFirstPlayerName(event.currentTarget.value)}} data-testid="firstPlayer" />
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <label htmlFor="secondPlayer">Second Player Name (O):</label>
                                </td>
                                <td>
                                    <input id="secondPlayer" type="text" value={secondPlayerName} onChange={(event) => {setSecondPlayerName(event.currentTarget.value)}} data-testid="secondPlayer" />
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
                    firstPlayerName={firstPlayerName}
                    secondPlayerName={secondPlayerName} />
            )}
        </div>
    );
}

export default App;
