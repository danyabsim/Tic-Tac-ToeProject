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
                <Results X={props.X} O={props.O}/>
                <Board/>
                <BottomButtons/>
            </header>
        </div>
    );
}

export default Game;