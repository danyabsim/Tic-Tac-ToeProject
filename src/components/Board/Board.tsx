import React, {useState} from 'react';
import BoardButton from "../BoardButton/BoardButton";
import {BoardProps} from "./BoardProps";
import {
    checkBoard,
    gameTimeoutAlert,
    onClickXOElement,
    SetIsFirstPlayerStars,
    XOCount
} from "../../XOScript";
import "./BoardStyle.css";
import {GameProps} from "../Game/GameProps";

function Board(props: BoardProps & GameProps) {
    const [solved, setSolved] = useState(false);
    const [countSolved, setCountSolved] = useState(0);

    function onClickBoardButtonElement(event : React.MouseEvent<HTMLInputElement>) {
        if (props.XOArray.every(row => row.every(item => item === ""))) {
            setSolved(false);
            setCountSolved(0);
        }
        if (solved) {
            return;
        }
        onClickXOElement(event.currentTarget);
        let XOArray : string[][] = props.XOArray;
        const XO_Column = parseInt(event.currentTarget.id.charAt(2));
        const XO_Row = parseInt(event.currentTarget.id.charAt(3));
        XOArray[XO_Column - 1][XO_Row - 1] = event.currentTarget.value;
        props.setXOArray(XOArray);
        const solvedBoard= checkBoard(props.XOArray);
        setSolved(solvedBoard[0]);
        if ((solvedBoard[0] && countSolved === 0) || XOCount === 9) {
            setCountSolved(countSolved + 1);
            gameTimeoutAlert(solvedBoard, props.firstPlayerName, props.secondPlayerName);
            switch (solvedBoard[1]) {
                case 'X':
                    props.setFirstPlayerResults(props.firstPlayerResults + 1);
                    if (props.isFirstPlayerStars) {
                        props.setIsFirstPlayerStars(!props.isFirstPlayerStars);
                    }
                    break;
                case 'O':
                    props.setSecondPlayerResults(props.secondPlayerResults + 1);
                    if (!props.isFirstPlayerStars) {
                        props.setIsFirstPlayerStars(!props.isFirstPlayerStars);
                    }
                    break;
                case '':
                    props.setTieResults(props.tieResults + 1);
                    props.setIsFirstPlayerStars(!props.isFirstPlayerStars);
                    break;
            }
            SetIsFirstPlayerStars(props.isFirstPlayerStars);
        }
    }

    return (
        <form id="board">
            <table>
                <tbody>
                {props.XOArray.map((row, rowIndex) => (
                    <tr key={`row-${rowIndex}`}>
                        {row.map((cell, colIndex) => (
                            <BoardButton
                                key={`cell-${rowIndex}-${colIndex}`}
                                id={`XO${rowIndex + 1}${colIndex + 1}`}
                                value={cell}
                                onClick={onClickBoardButtonElement}
                            />
                        ))}
                    </tr>
                ))}
                </tbody>
            </table>
        </form>
    );
}

export default Board;