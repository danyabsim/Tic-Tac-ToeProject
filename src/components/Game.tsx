import React from "react";
import Results from "./Results";
import Board from "./Board";
import BottomButtons from "./BottomButtons";
import {GameProps} from "./GameProps";

function Game(props: GameProps) {
    return (
        <div>
            <header>
                <h1>Tic-Tac-Toe</h1><br/>
                <Results
                    firstPlayerResults={props.firstPlayerResults}
                    setFirstPlayerResults={props.setFirstPlayerResults}
                    tieResults={props.tieResults}
                    setTieResults={props.setTieResults}
                    secondPlayerResults={props.secondPlayerResults}
                    setSecondPlayerResults={props.setSecondPlayerResults}
                    firstPlayerName={props.firstPlayerName}
                    secondPlayerName={props.secondPlayerName}
                    isFirstPlayerStars={props.isFirstPlayerStars}
                    setIsFirstPlayerStars={props.setIsFirstPlayerStars}
                    XOArray={props.XOArray}
                    setXOArray={props.setXOArray} />
                <Board
                    firstPlayerResults={props.firstPlayerResults}
                    setFirstPlayerResults={props.setFirstPlayerResults}
                    tieResults={props.tieResults}
                    setTieResults={props.setTieResults}
                    secondPlayerResults={props.secondPlayerResults}
                    setSecondPlayerResults={props.setSecondPlayerResults}
                    firstPlayerName={props.firstPlayerName}
                    secondPlayerName={props.secondPlayerName}
                    isFirstPlayerStars={props.isFirstPlayerStars}
                    setIsFirstPlayerStars={props.setIsFirstPlayerStars}
                    XOArray={props.XOArray}
                    setXOArray={props.setXOArray} />
                <BottomButtons
                    firstPlayerResults={props.firstPlayerResults}
                    setFirstPlayerResults={props.setFirstPlayerResults}
                    tieResults={props.tieResults}
                    setTieResults={props.setTieResults}
                    secondPlayerResults={props.secondPlayerResults}
                    setSecondPlayerResults={props.setSecondPlayerResults}
                    firstPlayerName={props.firstPlayerName}
                    secondPlayerName={props.secondPlayerName}
                    isFirstPlayerStars={props.isFirstPlayerStars}
                    setIsFirstPlayerStars={props.setIsFirstPlayerStars}
                    XOArray={props.XOArray}
                    setXOArray={props.setXOArray} />
            </header>
        </div>
    );
}

export default Game;