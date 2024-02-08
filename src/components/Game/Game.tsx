import React, {useState} from "react";
import Results from "../Results/Results";
import Board from "../Board/Board";
import EndGameButton from "../EndGameButton/EndGameButton";
import {GameProps} from "./GameProps";
import './GameStyle.css';
import {removeAllHistory} from "../../redux/historySlice";
import {useDispatch} from "react-redux";

function Game(props: GameProps) {
    const [isFirstPlayerStars, setIsFirstPlayerStars] = useState(true);
    const [XOArray, setXOArray] = useState([["", "", ""], ["", "", ""], ["", "", ""]]);
    const [firstPlayerWins, setFirstPlayerWins] = useState(0);
    const [ties, setTies] = useState(0);
    const [secondPlayerWins, setSecondPlayerWins] = useState(0);
    const dispatch = useDispatch();

    function resetHandler() {
        setIsFirstPlayerStars(true);
        setFirstPlayerWins(0);
        setTies(0);
        setSecondPlayerWins(0);
        setXOArray([
            ["", "", ""],
            ["", "", ""],
            ["", "", ""],
        ]);
    }

    function nextGameHandler() {
        setXOArray([
            ["", "", ""],
            ["", "", ""],
            ["", "", ""],
        ]);
    }

    function resetTheApp() {
        dispatch(removeAllHistory());
        resetHandler();
        props.resetTheApp();
    }

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
                    firstPlayerName={props.firstPlayerName}
                    secondPlayerName={props.secondPlayerName}
                    firstPlayerSign={props.firstPlayerSign}
                    secondPlayerSign={props.secondPlayerSign}
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
                    resetHandler={resetHandler}
                    nextGameHandler={nextGameHandler}
                    resetTheApp={resetTheApp}
                />
                <EndGameButton
                    resetTheApp={resetTheApp}
                />
            </header>
        </div>
    );
}

export default Game;