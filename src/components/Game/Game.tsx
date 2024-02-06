import React, {useState} from "react";
import Results from "../Results/Results";
import Board from "../Board/Board";
import EndGameButton from "../EndGameButton/EndGameButton";
import {GameProps} from "./GameProps";
import {initialHistoryState} from "../../redux/HistoryReducer";
import './GameStyle.css';

function Game(props: GameProps) {
    const [isFirstPlayerStars, setIsFirstPlayerStars] = useState(true);
    const [XOArray, setXOArray] = useState([["", "", ""], ["", "", ""], ["", "", ""]]);
    const [firstPlayerWins, setFirstPlayerWins] = useState(0);
    const [ties, setTies] = useState(0);
    const [secondPlayerWins, setSecondPlayerWins] = useState(0);
    const [historyGameState, setHistoryGameState] = useState(initialHistoryState);

    return (
        <div>
            <header>
                <h1>Tic-Tac-Toe</h1><br/>
                <Results
                    firstPlayerName={props.firstPlayerName}
                    secondPlayerName={props.secondPlayerName}
                    firstPlayerWins={firstPlayerWins}
                    ties={ties}
                    secondPlayerWins={secondPlayerWins}
                />
                <Board
                    firstPlayerWins={firstPlayerWins}
                    setFirstPlayerWins={setFirstPlayerWins}
                    ties={ties}
                    setTies={setTies}
                    secondPlayerWins={secondPlayerWins}
                    setSecondPlayerWins={setSecondPlayerWins}
                    isFirstPlayerStars={isFirstPlayerStars}
                    setIsFirstPlayerStars={setIsFirstPlayerStars}
                    XOArray={XOArray}
                    setXOArray={setXOArray}
                    firstPlayerName={props.firstPlayerName}
                    secondPlayerName={props.secondPlayerName}
                    historyGameState={historyGameState}
                    setHistoryGameState={setHistoryGameState} />
                <EndGameButton/>
            </header>
        </div>
    );
}

export default Game;