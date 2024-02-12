import React, {useEffect, useState} from "react";
import Results from "../Results/Results";
import Board from "../Board/Board";
import EndGameButton from "../EndGameButton/EndGameButton";
import {GameProps} from "./GameProps";
import './GameStyle.css';
import {useDispatch} from "react-redux";
import {resetTheResults} from "../../redux/resultsSlice";
import {exportHistoryToFile} from "../../redux/historySlice";

function Game(props: GameProps) {
    const [isFirstPlayerStars, setIsFirstPlayerStars] = useState(true);
    const [XOArray, setXOArray] = useState([["", "", ""], ["", "", ""], ["", "", ""]]);
    const dispatch = useDispatch();

    useEffect(() => {
        const handleBeforeUnload = (event: BeforeUnloadEvent) => {
            // Your logic here, for example, show a confirmation message
            const confirmationMessage = 'Are you sure you want to reload the page?';
            event.returnValue = confirmationMessage; // Standard for most browsers
            dispatch(exportHistoryToFile());
            return confirmationMessage; // For some older browsers
        };

        window.addEventListener('beforeunload', handleBeforeUnload);

        // Cleanup the event listener when the component is unmounted
        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, [dispatch]);

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
            <header>
                <h1>Tic-Tac-Toe</h1><br/>
                <Results
                    firstPlayerName={props.firstPlayerName}
                    secondPlayerName={props.secondPlayerName}
                    fileFirstPlayerURL={props.fileFirstPlayerURL}
                    fileSecondPlayerURL={props.fileSecondPlayerURL}
                />
                <Board
                    firstPlayerName={props.firstPlayerName}
                    secondPlayerName={props.secondPlayerName}
                    firstPlayerSign={props.firstPlayerSign}
                    secondPlayerSign={props.secondPlayerSign}
                    isFirstPlayerStars={isFirstPlayerStars}
                    setIsFirstPlayerStars={setIsFirstPlayerStars}
                    XOArray={XOArray}
                    setXOArray={setXOArray}
                    resetHandler={resetHandler}
                    nextGameHandler={nextGameHandler}
                    resetTheApp={resetTheApp}
                    fileFirstPlayerURL={props.fileFirstPlayerURL}
                    fileSecondPlayerURL={props.fileSecondPlayerURL}
                />
                <EndGameButton
                    resetTheApp={resetTheApp}
                />
            </header>
        </div>
    );
}

export default Game;