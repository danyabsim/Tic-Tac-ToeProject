import React, {HTMLProps, useState} from 'react';
import BoardButton from "../BoardButton/BoardButton";
import {BoardProps} from "./BoardProps";
import {
    checkBoard,
    onClickXOElement,
    setIsFirstPlayerStars,
    XOCount
} from "../../XOScript";
import "./BoardStyle.css";
import {GameProps} from "../Game/GameProps";
import {JSX} from "react/jsx-runtime";
import GameAlert from "../GameAlert/GameAlert";

function Board(props: BoardProps & GameProps) {
    const [countSolved, setCountSolved] = useState(0);
    const [XOArrayDesign, setXOArrayDesign] = useState<(JSX.IntrinsicAttributes & HTMLProps<HTMLInputElement> | undefined)[][]>([
        [undefined, undefined, undefined],
        [undefined, undefined, undefined],
        [undefined, undefined, undefined],
    ]);
    const [alertText, setAlertText] = useState("");
    const [modalIsOpen, setModalIsOpen] = useState(false);

    const defaultCellStyle: JSX.IntrinsicAttributes & HTMLProps<HTMLInputElement> = {
        style: { backgroundColor: '#4FFF00' },
    };

    function designWinningPath(indexes: number[][]) {
        const newXOArrayDesign = [...XOArrayDesign];

        indexes.forEach(([row, col]) => {
            newXOArrayDesign[row][col] = defaultCellStyle
        });

        setXOArrayDesign(newXOArrayDesign);
    }

    function onClickBoardButtonElement(event : React.MouseEvent<HTMLInputElement>) {
        if (props.XOArray.every(row => row.every(item => item === ""))) {
            setCountSolved(0);
        }
        if (checkBoard(props.XOArray)[0]) {
            return;
        }
        onClickXOElement(event.currentTarget);
        let XOArray : string[][] = props.XOArray;
        const XO_Column = parseInt(event.currentTarget.id.charAt(2));
        const XO_Row = parseInt(event.currentTarget.id.charAt(3));
        XOArray[XO_Column - 1][XO_Row - 1] = event.currentTarget.value;
        props.setXOArray(XOArray);
        const [solvedBoard, solvedChar, indexes] = checkBoard(props.XOArray);

        if ((solvedBoard && countSolved === 0) || XOCount === 9) {
            designWinningPath(indexes);
            setCountSolved(countSolved + 1);
            if (solvedBoard && (solvedChar === 'X' || solvedChar === 'O')) {
                if ('X' === solvedChar) {
                    setAlertText(props.firstPlayerName + " (X) Won!");
                } else {
                    setAlertText(props.secondPlayerName + " (O) Won!");
                }
            } else {
                if (XOCount !== 9) {
                    return;
                }
                setAlertText("Game Ended With a Tie!");
            }
            setTimeout(function(): void {
                setModalIsOpen(true);
            }, 100);
            switch (solvedChar) {
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
            setIsFirstPlayerStars(!props.isFirstPlayerStars);
            // alert(XOArrayDesign
            //     .map((row) => row.join(", ")) // Join each row's elements
            //     .join("\n"));
        }
    }

    return (
        <div>
            <GameAlert
                alertText={alertText}
                modalIsOpen={modalIsOpen}
                setModalIsOpen={setModalIsOpen} />
            <form id="board">
                {props.XOArray.map((row, rowIndex) => (
                    <div key={`row-${rowIndex}`} className="form-group">
                        {row.map((cell, colIndex) => (
                            <BoardButton
                                key={`cell-${rowIndex}-${colIndex}`}
                                id={`XO${rowIndex + 1}${colIndex + 1}`}
                                value={cell}
                                onClick={onClickBoardButtonElement}
                                style={XOArrayDesign[rowIndex][colIndex]}
                            />
                        ))}
                    </div>
                ))}
            </form>
        </div>
    );
}

export default Board;