import React, {useState} from 'react';
import BoardButton from "../BoardButton/BoardButton";
import {BoardProps} from "./BoardProps";
import {checkBoard, OnClickXOButton, XOCount} from "../../XOScript";
import "./BoardStyle.css";
import GameAlert from "../GameAlert/GameAlert";
import {useDispatch} from "react-redux";
import {addTie, firstPlayerWon, secondPlayerWon} from "../../redux/resultsSlice";

function Board(props: BoardProps) {
    const [countSolved, setCountSolved] = useState(0);
    const [XOClassNames, setXOClassNames] = useState([
        ["XO", "XO", "XO"],
        ["XO", "XO", "XO"],
        ["XO", "XO", "XO"],
    ]);
    const [alertText, setAlertText] = useState("");
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [solvedChar, setSolvedChar] = useState("");
    const noImage = process.env.PUBLIC_URL + 'grunge-black-concrete-textured-background_53876-124541.avif';
    const [XOFileURLs, setXOFiles] = useState<(string | null)[][]>([
        [noImage, noImage, noImage],
        [noImage, noImage, noImage],
        [noImage, noImage, noImage],
    ]);
    const dispatch = useDispatch();

    function resetHandler() {
        props.resetHandler();
        setXOClassNames([
            ["XO", "XO", "XO"],
            ["XO", "XO", "XO"],
            ["XO", "XO", "XO"],
        ]);
        setXOFiles([
            [noImage, noImage, noImage],
            [noImage, noImage, noImage],
            [noImage, noImage, noImage],
        ]);
    }

    function nextGameHandler() {
        props.nextGameHandler();
        setXOClassNames([
            ["XO", "XO", "XO"],
            ["XO", "XO", "XO"],
            ["XO", "XO", "XO"],
        ]);
        setXOFiles([
            [noImage, noImage, noImage],
            [noImage, noImage, noImage],
            [noImage, noImage, noImage],
        ]);
    }

    function designWinningPath(indexes: number[][]) {
        const newXOClassNames = [...XOClassNames];

        indexes.forEach(([row, col]) => {
            newXOClassNames[row][col] = "WinningXO";
        });

        setXOClassNames(newXOClassNames);
    }

    function onClickBoardButtonElement(event: React.MouseEvent<HTMLInputElement>) {
        if (props.XOArray.every(row => row.every(item => item === ""))) {
            setCountSolved(0);
            setSolvedChar("");
        }
        if (checkBoard(props.XOArray)[0]) {
            return;
        }
        let XOArray: string[][] = props.XOArray;
        const XO_Column = parseInt(event.currentTarget.id.charAt(2));
        const XO_Row = parseInt(event.currentTarget.id.charAt(3));
        console.log(XOArray[XO_Column - 1][XO_Row - 1])
        if (XOArray[XO_Column - 1][XO_Row - 1] === "") {
            OnClickXOButton();
            if (XOCount % 2 === 1) {
                XOArray[XO_Column - 1][XO_Row - 1] = (props.isFirstPlayerStars ? props.firstPlayerSign : props.secondPlayerSign);
            } else {
                XOArray[XO_Column - 1][XO_Row - 1] = (props.isFirstPlayerStars ? props.secondPlayerSign : props.firstPlayerSign);
            }
        }
        console.log(XOArray[XO_Column - 1][XO_Row - 1])
        props.setXOArray(XOArray);

        let tempXOFileURLs: (string | null)[][] = XOFileURLs;
        tempXOFileURLs[XO_Column - 1][XO_Row - 1] = (
            XOArray[XO_Column - 1][XO_Row - 1] === props.firstPlayerSign
                ? props.fileFirstPlayerURL
                : (XOArray[XO_Column - 1][XO_Row - 1] === props.secondPlayerSign
                        ? props.fileSecondPlayerURL
                        : noImage
                )
        );
        setXOFiles(tempXOFileURLs);

        const [solvedBoard, innerSolvedChar, indexes] = checkBoard(props.XOArray);
        setSolvedChar(innerSolvedChar);
        if ((solvedBoard && countSolved === 0) || XOCount === 9) {
            designWinningPath(indexes);
            setCountSolved(countSolved + 1);
            if (solvedBoard && (innerSolvedChar === props.firstPlayerSign || innerSolvedChar === props.secondPlayerSign)) {
                if (props.firstPlayerSign === innerSolvedChar) {
                    setAlertText(props.firstPlayerName + " (" + props.firstPlayerSign + ") Won!");
                } else {
                    setAlertText(props.secondPlayerName + " (" + props.secondPlayerSign + ") Won!");
                }
            } else {
                setAlertText("Game Ended With a Tie!");
            }
            setTimeout(function (): void {
                setModalIsOpen(true);
            }, 100);
            switch (innerSolvedChar) {
                case props.firstPlayerSign:
                    dispatch(firstPlayerWon());
                    if (props.isFirstPlayerStars) {
                        props.setIsFirstPlayerStars(!props.isFirstPlayerStars);
                    }
                    break;
                case props.secondPlayerSign:
                    dispatch(secondPlayerWon());
                    if (!props.isFirstPlayerStars) {
                        props.setIsFirstPlayerStars(!props.isFirstPlayerStars);
                    }
                    break;
                case '':
                    dispatch(addTie());
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
                resetTheApp={props.resetTheApp}
                firstPlayerSign={props.firstPlayerSign}
                secondPlayerSign={props.secondPlayerSign}
                firstPlayerName={props.firstPlayerName}
                secondPlayerName={props.secondPlayerName}
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
                                fileURL={XOFileURLs[rowIndex][colIndex]}
                            />
                        ))}
                    </div>
                ))}
            </form>
        </div>
    );
}

export default Board;