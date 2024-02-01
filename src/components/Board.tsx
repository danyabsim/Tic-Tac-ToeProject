import React from 'react';
import BoardButton from "./BoardButton";
import {GameProps} from "./GameProps";
import {
    checkBoard,
    gameTimeoutAlert,
    onClickXOElement,
    setIsFirstPlayerStars,
    setSolved, XOCount
} from "../XOScript";

function Board(props: GameProps) {
    setIsFirstPlayerStars(props.isFirstPlayerStars);

    function onClickBoardButtonElement(event : React.MouseEvent<HTMLInputElement>) {
        onClickXOElement(event.currentTarget);
        let XOArray = props.XOArray;
        const XO_Column = parseInt(event.currentTarget.id.charAt(2));
        const XO_Row = parseInt(event.currentTarget.id.charAt(3));
        XOArray[XO_Column - 1][XO_Row - 1] = event.currentTarget.value;
        props.setXOArray(XOArray);
        const solvedBoard = checkBoard(XOArray);
        setSolved(solvedBoard[0]);
        gameTimeoutAlert(solvedBoard);
        if (solvedBoard[0] || XOCount === 9) {
            switch (solvedBoard[1][0]) {
                case 'X':
                    props.setFirstPlayerResults(props.firstPlayerResults + 1); break;
                case 'O':
                    props.setSecondPlayerResults(props.secondPlayerResults + 1); break;
                case '':
                    props.setTieResults(props.tieResults + 1); break;
            }
        }
    }

    return (
        <form id="board">
            <table>
                <tbody>
                <tr>
                    <BoardButton id="XO11" value={props.XOArray[0][0]} onClick={onClickBoardButtonElement} />
                    <BoardButton id="XO12" value={props.XOArray[0][1]} onClick={onClickBoardButtonElement} />
                    <BoardButton id="XO13" value={props.XOArray[0][2]} onClick={onClickBoardButtonElement} />
                </tr>
                <tr>
                    <BoardButton id="XO21" value={props.XOArray[1][0]} onClick={onClickBoardButtonElement} />
                    <BoardButton id="XO22" value={props.XOArray[1][1]} onClick={onClickBoardButtonElement} />
                    <BoardButton id="XO23" value={props.XOArray[1][2]} onClick={onClickBoardButtonElement} />
                </tr>
                <tr>
                    <BoardButton id="XO31" value={props.XOArray[2][0]} onClick={onClickBoardButtonElement} />
                    <BoardButton id="XO32" value={props.XOArray[2][1]} onClick={onClickBoardButtonElement} />
                    <BoardButton id="XO33" value={props.XOArray[2][2]} onClick={onClickBoardButtonElement} />
                </tr>
                </tbody>
            </table>
        </form>
    );
}

export default Board;