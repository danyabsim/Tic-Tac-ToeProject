import React, {useState} from 'react';
import logo from './logo.svg';
import './App.css';
import Game from "./components/Game";

function App() {
    const [isOnEnter, setIsOnEnter] = useState(true);
    const [firstPlayerName, setFirstPlayerName] = useState('');
    const [secondPlayerName, setSecondPlayerName] = useState('');
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
        }
    }

    return (
        <div>
            {isOnEnter ? (
                <form id="enter" onSubmit={onEnter}>
                    <table>
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
                    </table>
                </form>
            ) : (
                <Game X={firstPlayerName} O={secondPlayerName}/>
            )}
        </div>
    );
}

export default App;
