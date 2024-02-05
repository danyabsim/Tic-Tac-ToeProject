import React, {useState} from "react";
import Results from "../Results/Results";
import Board from "../Board/Board";
import BottomButtons from "../BottomButtons/BottomButtons";
import {GameProps} from "./GameProps";

function Game(props: GameProps) {
    const [isFirstPlayerStars, setIsFirstPlayerStars] = useState(true);
    const [XOArray, setXOArray] = useState([["", "", ""], ["", "", ""], ["", "", ""]]);
    const [firstPlayerResults, setFirstPlayerResults] = useState(0);
    const [secondPlayerResults, setSecondPlayerResults] = useState(0);
    const [tieResults, setTieResults] = useState(0);

    return (
        <div>
            <header>
                <h1>Tic-Tac-Toe</h1><br/>
                <Results
                    firstPlayerResults={firstPlayerResults}
                    tieResults={tieResults}
                    secondPlayerResults={secondPlayerResults}
                    firstPlayerName={props.firstPlayerName}
                    secondPlayerName={props.secondPlayerName} />
                <Board
                    firstPlayerResults={firstPlayerResults}
                    setFirstPlayerResults={setFirstPlayerResults}
                    tieResults={tieResults}
                    setTieResults={setTieResults}
                    secondPlayerResults={secondPlayerResults}
                    setSecondPlayerResults={setSecondPlayerResults}
                    isFirstPlayerStars={isFirstPlayerStars}
                    setIsFirstPlayerStars={setIsFirstPlayerStars}
                    XOArray={XOArray}
                    setXOArray={setXOArray}
                    firstPlayerName={props.firstPlayerName}
                    secondPlayerName={props.secondPlayerName} />
                <BottomButtons
                    setFirstPlayerResults={setFirstPlayerResults}
                    setTieResults={setTieResults}
                    setSecondPlayerResults={setSecondPlayerResults}
                    isFirstPlayerStars={isFirstPlayerStars}
                    setIsFirstPlayerStars={setIsFirstPlayerStars}
                    XOArray={XOArray}
                    setXOArray={setXOArray} />
            </header>
        </div>
    );
}

export default Game;