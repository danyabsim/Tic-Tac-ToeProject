import React, {useState} from 'react';
import BoardButton from "../BoardButton/BoardButton";
import {BoardProps} from "./BoardProps";
import {
    checkBoard,
    onClickXOElement,
    XOCount
} from "../../XOScript";
import "./BoardStyle.css";
import {GameProps} from "../Game/GameProps";
import GameAlert from "../GameAlert/GameAlert";

function Board(props: BoardProps & GameProps) {
    const [countSolved, setCountSolved] = useState(0);
    const [XOClassNames, setXOClassNames] = useState([
        ["XO", "XO", "XO"],
        ["XO", "XO", "XO"],
        ["XO", "XO", "XO"],
    ]);
    const [alertText, setAlertText] = useState("");
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [solvedChar, setSolvedChar] = useState("");

    function resetHandler() {
        props.resetHandler();
        setXOClassNames([
            ["XO", "XO", "XO"],
            ["XO", "XO", "XO"],
            ["XO", "XO", "XO"],
        ]);
    }

    function nextGameHandler() {
        props.nextGameHandler();
        setXOClassNames([
            ["XO", "XO", "XO"],
            ["XO", "XO", "XO"],
            ["XO", "XO", "XO"],
        ]);
    }

    function designWinningPath(indexes: number[][]) {
        const newXOClassNames = [...XOClassNames];

        indexes.forEach(([row, col]) => {
            newXOClassNames[row][col] = "WinningXO";
        });

        setXOClassNames(newXOClassNames);
    }

    function onClickBoardButtonElement(event : React.MouseEvent<HTMLInputElement>) {
        if (props.XOArray.every(row => row.every(item => item === ""))) {
            setCountSolved(0);
            setSolvedChar("");
        }
        if (checkBoard(props.XOArray)[0]) {
            return;
        }
        onClickXOElement(event.currentTarget, props.isFirstPlayerStars);
        let XOArray : string[][] = props.XOArray;
        const XO_Column = parseInt(event.currentTarget.id.charAt(2));
        const XO_Row = parseInt(event.currentTarget.id.charAt(3));
        XOArray[XO_Column - 1][XO_Row - 1] = event.currentTarget.value;
        props.setXOArray(XOArray);
        const [solvedBoard, innerSolvedChar, indexes] = checkBoard(props.XOArray);
        setSolvedChar(innerSolvedChar);
        if ((solvedBoard && countSolved === 0) || XOCount === 9) {
            designWinningPath(indexes);
            setCountSolved(countSolved + 1);
            if (solvedBoard && (innerSolvedChar === 'X' || innerSolvedChar === 'O')) {
                if ('X' === innerSolvedChar) {
                    setAlertText(props.firstPlayerName + " (X) Won!");
                } else {
                    setAlertText(props.secondPlayerName + " (O) Won!");
                }
            } else {
                setAlertText("Game Ended With a Tie!");
            }
            setTimeout(function(): void {
                setModalIsOpen(true);
            }, 100);
            switch (innerSolvedChar) {
                case 'X':
                    props.setFirstPlayerWins(props.firstPlayerWins + 1);
                    if (props.isFirstPlayerStars) {
                        props.setIsFirstPlayerStars(!props.isFirstPlayerStars);
                    }
                    break;
                case 'O':
                    props.setSecondPlayerWins(props.secondPlayerWins + 1);
                    if (!props.isFirstPlayerStars) {
                        props.setIsFirstPlayerStars(!props.isFirstPlayerStars);
                    }
                    break;
                case '':
                    props.setTies(props.ties + 1);
                    props.setIsFirstPlayerStars(!props.isFirstPlayerStars);
                    break;
            }
        }
    }

    return (
        <div>
            <GameAlert
                alertText={alertText}
                solvedChar={solvedChar}
                modalIsOpen={modalIsOpen}
                setModalIsOpen={setModalIsOpen}
                resetHandler={resetHandler}
                nextGameHandler={nextGameHandler}
                firstPlayerName={props.firstPlayerName}
                secondPlayerName={props.secondPlayerName}
                firstPlayerWins={props.firstPlayerWins}
                ties={props.ties}
                secondPlayerWins={props.secondPlayerWins}
                resetTheApp={props.resetTheApp}
            />
            <form id="board">
                {props.XOArray.map((row, rowIndex) => (
                    <div key={`row-${rowIndex}`} className="form-group">
                        {row.map((cell, colIndex) => (
                            <BoardButton
                                className={XOClassNames[rowIndex][colIndex]}
                                key={`cell-${rowIndex}-${colIndex}`}
                                id={`XO${rowIndex + 1}${colIndex + 1}`}
                                value={cell}
                                onClick={onClickBoardButtonElement}
                            />
                        ))}
                    </div>
                ))}
            </form>
        </div>
    );
}

export default Board;