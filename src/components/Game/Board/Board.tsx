import React, {useState} from 'react';
import BoardButton from "./BoardButton/BoardButton";
import {IBoardProps} from "./IBoardProps";
import {checkBoard, dispatchAndSetWhoPlaysNext, noImage, OnClickXOButton, XOCount} from "../../../XOScript";
import GameAlert from "../GameAlert/GameAlert";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../redux/store";
import {getBestMove} from "../../../MinimaxScript";

function Board(props: IBoardProps) {
    const dispatch = useDispatch();
    const [solved, setSolved] = useState({count: 0, char: '', alertText: ''});
    const [XOData, setXOData] = useState<{className: string, file: string | null}[][]>([[{className: "XO", file: noImage}, {className: "XO", file: noImage}, {className: "XO", file: noImage}], [{className: "XO", file: noImage}, {className: "XO", file: noImage}, {className: "XO", file: noImage}], [{className: "XO", file: noImage}, {className: "XO", file: noImage}, {className: "XO", file: noImage}]]);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const playersData = useSelector((state: RootState) => state.players.data); // need to be taken from server

    function resetBoard(additionalCode: () => void) {
        additionalCode();
        setSolved({count: 0, char: '', alertText: ''});
        setXOData([[{className: "XO", file: noImage}, {className: "XO", file: noImage}, {className: "XO", file: noImage}], [{className: "XO", file: noImage}, {className: "XO", file: noImage}, {className: "XO", file: noImage}], [{className: "XO", file: noImage}, {className: "XO", file: noImage}, {className: "XO", file: noImage}]]);
    }

    function setXOElementAndCheckIfEnd(XO_Column: number, XO_Row: number) {
        props.setXOArray(OnClickXOButton([...props.XOArray], XO_Column, XO_Row, props.isFirstPlayerStars, playersData[0].sign, playersData[1].sign));
        setXOData(prevState => {
            let tempXOFileURLs = [...prevState];
            tempXOFileURLs[XO_Column][XO_Row].file = (props.XOArray[XO_Column][XO_Row] === playersData[0].sign ? playersData[0].url : (props.XOArray[XO_Column - 1][XO_Row - 1] === playersData[1].sign ? playersData[1].url : noImage));
            return tempXOFileURLs;
        });
        const [solvedBoard, innerSolvedChar, indexes] = checkBoard(props.XOArray);
        if ((solvedBoard && solved.count === 0) || XOCount === 9) {
            setXOData(prevState => prevState.map((row, i) => row.map((col, j) => (indexes.some(([x, y]) => x === i && y === j) ? {className: "WinningXO", file: prevState[i][j].file} : col))));
            const winner = (innerSolvedChar === playersData[0].sign || innerSolvedChar === playersData[1].sign) ? (innerSolvedChar === playersData[0].sign ? playersData[0] : playersData[1]) : null;
            setSolved({count: solved.count + 1, char: innerSolvedChar, alertText: winner ? `${winner.name} (${winner.sign}) Won!` : "Game Ended With a Tie!"});
            setTimeout(() => setModalIsOpen(true), 100);
            dispatchAndSetWhoPlaysNext(innerSolvedChar, playersData[0].sign, playersData[1].sign, dispatch, props.isFirstPlayerStars, props.setIsFirstPlayerStars)
        }
    }

    function onClickXOElement(event: React.MouseEvent<HTMLDivElement>) {
        if ((props.isFirstPlayerStars && XOCount % 2 === 0) || (!props.isFirstPlayerStars && XOCount % 2 === 1)) {
            if (checkBoard(props.XOArray)[0]) return;
            const [XO_Column, XO_Row] = Array.from(event.currentTarget.id.slice(2)).map(Number);
            if (props.XOArray[XO_Column - 1][XO_Row - 1]) return;
            setXOElementAndCheckIfEnd(XO_Column - 1, XO_Row - 1);
        } else {
            const move = getBestMove(props.XOArray, playersData[0].sign, playersData[1].sign);
            if (move.row === -1 && move.col === -1) return;
            console.log(move);
            if (props.XOArray[move.col][move.row]) return;
            setXOElementAndCheckIfEnd(move.col, move.row);
        }
    }

    return (
        <div className="flex justify-center items-center">
            <GameAlert alertText={solved.alertText} solvedChar={solved.char} modalIsOpen={modalIsOpen}
                       setModalIsOpen={setModalIsOpen} ResetHandler={() => resetBoard(props.ResetHandler)}
                       NextGameHandler={() => resetBoard(props.NextGameHandler)} ResetTheApp={props.ResetTheApp}/>
            <form className="grid grid-cols-3 gap-0 m-0">
                {props.XOArray.map((row, rowIndex) => (
                    <div key={`row-${rowIndex}`}>
                        {row.map((cell, colIndex) => (
                            <BoardButton fileURL={XOData[rowIndex][colIndex].file} onClick={onClickXOElement}
                                         key={`cell-${rowIndex}-${colIndex}`} id={`XO${rowIndex + 1}${colIndex + 1}`}
                                         className={XOData[rowIndex][colIndex].className} value={cell}/>
                        ))}
                    </div>
                ))}
            </form>
        </div>
    );
}

export default Board;