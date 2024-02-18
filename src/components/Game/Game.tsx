import React, {useState} from "react";
import Results from "../Results/Results";
import Board from "../Board/Board";
import BottomButtons from "../BottomButtons/BottomButtons";
import {IGameProps} from "./IGameProps";
import {useDispatch} from "react-redux";
import {resetTheResults} from "../../redux/Results/resultsSlice";

function Game(props: IGameProps) {
    const [isFirstPlayerStars, setIsFirstPlayerStars] = useState(true);
    const [XOArray, setXOArray] = useState([["", "", ""], ["", "", ""], ["", "", ""]]);
    const dispatch = useDispatch();

    function resetHandler() {
        dispatch(resetTheResults());
        setIsFirstPlayerStars(true);
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
        resetHandler();
        props.resetTheApp();
    }

    return (
        <div>
            <h1 className="text-4xl border-b-0 bg-green-500 text-black m-0">Tic-Tac-Toe</h1><br/>
            <Results
                firstPlayer={props.firstPlayer}
                secondPlayer={props.secondPlayer}
            />
            <Board
                firstPlayer={props.firstPlayer}
                secondPlayer={props.secondPlayer}
                isFirstPlayerStars={isFirstPlayerStars}
                setIsFirstPlayerStars={setIsFirstPlayerStars}
                XOArray={XOArray}
                setXOArray={setXOArray}
                resetHandler={resetHandler}
                nextGameHandler={nextGameHandler}
                resetTheApp={resetTheApp}
            />
            <BottomButtons
                resetTheApp={resetTheApp}
            />
        </div>
    );
}

export default Game;