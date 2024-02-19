import React, {useState} from 'react';
import BoardButton from "./BoardButton/BoardButton";
import {IBoardProps} from "./IBoardProps";
import {checkBoard, OnClickXOButton, XOCount} from "../../../XOScript";
import GameAlert from "../GameAlert/GameAlert";
import {useDispatch} from "react-redux";
import {addTie, firstPlayerWon, secondPlayerWon} from "../../../redux/Results/resultsSlice";

function Board(props: IBoardProps) {
    const noImage = process.env.PUBLIC_URL + 'grunge-black-concrete-textured-background_53876-124541.avif';
    const dispatch = useDispatch();

    const [countSolved, setCountSolved] = useState(0);
    const [XOClassNames, setXOClassNames] = useState([
        ["XO", "XO", "XO"],
        ["XO", "XO", "XO"],
        ["XO", "XO", "XO"],
    ]);
    const [alertText, setAlertText] = useState("");
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [solvedChar, setSolvedChar] = useState("");
    const [XOFileURLs, setXOFiles] = useState<(string | null)[][]>([
        [noImage, noImage, noImage],
        [noImage, noImage, noImage],
        [noImage, noImage, noImage],
    ]);

    function resetBoard(additionalCode: () => void) {
        additionalCode();
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

    function onClickBoardButtonElement(event: React.MouseEvent<HTMLDivElement>) {
        if (props.XOArray.every(row => row.every(item => item === ""))) {
            setCountSolved(0);
            setSolvedChar("");
        }
        if (checkBoard(props.XOArray)[0]) {
            return;
        }
        let XOArray: string[][] = props.XOArray;
        let XO_Column = parseInt(event.currentTarget.id.charAt(2));
        let XO_Row = parseInt(event.currentTarget.id.charAt(3));
        if (XOArray[XO_Column - 1][XO_Row - 1] === "") {
            OnClickXOButton();
            if (XOCount % 2 === 1) {
                XOArray[XO_Column - 1][XO_Row - 1] = (props.isFirstPlayerStars ? props.firstPlayer.sign : props.secondPlayer.sign);
            } else {
                XOArray[XO_Column - 1][XO_Row - 1] = (props.isFirstPlayerStars ? props.secondPlayer.sign : props.firstPlayer.sign);
            }
        }
        props.setXOArray(XOArray);

        setXOFiles(prevXOFiles => {
            let tempXOFileURLs = [...prevXOFiles];
            tempXOFileURLs[XO_Column - 1][XO_Row - 1] = (
                XOArray[XO_Column - 1][XO_Row - 1] === props.firstPlayer.sign
                    ? props.firstPlayer.URL
                    : (XOArray[XO_Column - 1][XO_Row - 1] === props.secondPlayer.sign
                            ? props.secondPlayer.URL
                            : noImage
                    )
            );
            return tempXOFileURLs;
        });

        const [solvedBoard, innerSolvedChar, indexes] = checkBoard(props.XOArray);
        setSolvedChar(innerSolvedChar);
        if ((solvedBoard && countSolved === 0) || XOCount === 9) {
            designWinningPath(indexes);
            setCountSolved(countSolved + 1);
            if (solvedBoard && (innerSolvedChar === props.firstPlayer.sign || innerSolvedChar === props.secondPlayer.sign)) {
                if (props.firstPlayer.sign === innerSolvedChar) {
                    setAlertText(props.firstPlayer.name + " (" + props.firstPlayer.sign + ") Won!");
                } else {
                    setAlertText(props.secondPlayer.name + " (" + props.secondPlayer.sign + ") Won!");
                }
            } else {
                setAlertText("Game Ended With a Tie!");
            }
            setTimeout(function (): void {
                setModalIsOpen(true);
            }, 100);
            switch (innerSolvedChar) {
                case props.firstPlayer.sign:
                    dispatch(firstPlayerWon());
                    if (props.isFirstPlayerStars) {
                        props.setIsFirstPlayerStars(!props.isFirstPlayerStars);
                    }
                    break;
                case props.secondPlayer.sign:
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
        <div className="flex justify-center items-center">
            <GameAlert
                alertText={alertText}
                solvedChar={solvedChar}
                modalIsOpen={modalIsOpen}
                setModalIsOpen={setModalIsOpen}
                resetHandler={() => resetBoard(props.resetHandler)}
                nextGameHandler={() => resetBoard(props.nextGameHandler)}
                resetTheApp={props.resetTheApp}
                firstPlayer={props.firstPlayer}
                secondPlayer={props.secondPlayer}
            />
            <form className="grid grid-cols-3 gap-0 m-0">
                {props.XOArray.map((row, rowIndex) => (
                    <div key={`row-${rowIndex}`}>
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