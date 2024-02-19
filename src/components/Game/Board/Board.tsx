import React, {useState} from 'react';
import BoardButton from "./BoardButton/BoardButton";
import {IBoardProps} from "./IBoardProps";
import {checkBoard, dispatchAndSetWhoPlaysNext, noImage, OnClickXOButton, XOCount} from "../../../XOScript";
import GameAlert from "../GameAlert/GameAlert";
import {useDispatch} from "react-redux";

function Board(props: IBoardProps) {
    const dispatch = useDispatch();
    const [countSolved, setCountSolved] = useState(0);
    const [XOClassNames, setXOClassNames] = useState([["XO", "XO", "XO"], ["XO", "XO", "XO"], ["XO", "XO", "XO"]]);
    const [alertText, setAlertText] = useState("");
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [solvedChar, setSolvedChar] = useState("");
    const [XOFileURLs, setXOFiles] = useState<(string | null)[][]>([[noImage, noImage, noImage], [noImage, noImage, noImage], [noImage, noImage, noImage]]);

    function resetBoard(additionalCode: () => void) {
        additionalCode();
        setXOClassNames([["XO", "XO", "XO"], ["XO", "XO", "XO"], ["XO", "XO", "XO"]]);
        setXOFiles([[noImage, noImage, noImage], [noImage, noImage, noImage], [noImage, noImage, noImage]]);
        setCountSolved(0);
        setSolvedChar("");
    }

    function onClickBoardButtonElement(event: React.MouseEvent<HTMLDivElement>) {
        if (checkBoard(props.XOArray)[0]) return;
        let XO_Column = parseInt(event.currentTarget.id.charAt(2));
        let XO_Row = parseInt(event.currentTarget.id.charAt(3));
        props.setXOArray(OnClickXOButton([...props.XOArray], XO_Column, XO_Row, props.isFirstPlayerStars, props.firstPlayer.sign, props.secondPlayer.sign));

        setXOFiles(prevXOFiles => {
            let tempXOFileURLs = [...prevXOFiles];
            tempXOFileURLs[XO_Column - 1][XO_Row - 1] = (props.XOArray[XO_Column - 1][XO_Row - 1] === props.firstPlayer.sign ? props.firstPlayer.URL : (props.XOArray[XO_Column - 1][XO_Row - 1] === props.secondPlayer.sign ? props.secondPlayer.URL : noImage));
            return tempXOFileURLs;
        });

        const [solvedBoard, innerSolvedChar, indexes] = checkBoard(props.XOArray);
        setSolvedChar(innerSolvedChar);
        if ((solvedBoard && countSolved === 0) || XOCount === 9) {
            setXOClassNames(prevClassNames => prevClassNames.map((row, i) => row.map((col, j) => (indexes.some(([x, y]) => x === i && y === j) ? "WinningXO" : col))));
            setCountSolved(countSolved + 1);
            const winner = (innerSolvedChar === props.firstPlayer.sign || innerSolvedChar === props.secondPlayer.sign) ? (innerSolvedChar === props.firstPlayer.sign ? props.firstPlayer : props.secondPlayer) : null;
            setAlertText(winner ? `${winner.name} (${winner.sign}) Won!` : "Game Ended With a Tie!");
            setTimeout(() => setModalIsOpen(true), 100);
            dispatchAndSetWhoPlaysNext(innerSolvedChar, props.firstPlayer.sign, props.secondPlayer.sign, dispatch, props.isFirstPlayerStars, props.setIsFirstPlayerStars)
        }
    }

    return (
        <div className="flex justify-center items-center">
            <GameAlert alertText={alertText} solvedChar={solvedChar} modalIsOpen={modalIsOpen}
                       setModalIsOpen={setModalIsOpen} resetHandler={() => resetBoard(props.resetHandler)}
                       nextGameHandler={() => resetBoard(props.nextGameHandler)} firstPlayer={props.firstPlayer}
                       secondPlayer={props.secondPlayer} resetTheApp={props.resetTheApp}/>
            <form className="grid grid-cols-3 gap-0 m-0">
                {props.XOArray.map((row, rowIndex) => (
                    <div key={`row-${rowIndex}`}>
                        {row.map((cell, colIndex) => (
                            <BoardButton fileURL={XOFileURLs[rowIndex][colIndex]} onClick={onClickBoardButtonElement}
                                         key={`cell-${rowIndex}-${colIndex}`} id={`XO${rowIndex + 1}${colIndex + 1}`}
                                         className={XOClassNames[rowIndex][colIndex]} value={cell}/>
                        ))}
                    </div>
                ))}
            </form>
        </div>
    );
}

export default Board;