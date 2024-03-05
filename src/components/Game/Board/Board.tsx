import React, {useState} from 'react';
import BoardButton from "./BoardButton/BoardButton";
import {IBoardProps} from "./IBoardProps";
import {checkBoard, dispatchAndSetWhoPlaysNext, noImage, OnClickXOButton, XOCount} from "../../../XOScript";
import GameAlert from "../GameAlert/GameAlert";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../redux/store";
import * as tf from '@tensorflow/tfjs';

function Board(props: IBoardProps) {
    const dispatch = useDispatch();
    const [solved, setSolved] = useState({count: 0, char: '', alertText: ''});
    const [XOData, setXOData] = useState<{className: string, file: string | null}[][]>([[{className: "XO", file: noImage}, {className: "XO", file: noImage}, {className: "XO", file: noImage}], [{className: "XO", file: noImage}, {className: "XO", file: noImage}, {className: "XO", file: noImage}], [{className: "XO", file: noImage}, {className: "XO", file: noImage}, {className: "XO", file: noImage}]]);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const playersData = useSelector((state: RootState) => state.players.data); // need to be taken from server

    // Neural network model
    const model = tf.sequential({
        layers: [
            tf.layers.flatten({ inputShape: [3, 3, 1] }),
            tf.layers.dense({ units: 128, activation: 'relu' }),
            tf.layers.dense({ units: 9, activation: 'softmax' }), // Output layer for policy
            tf.layers.dense({ units: 1 }), // Output layer for value
        ],
    });

    // Training parameters
    const optimizer = tf.train.adam(0.001);
    model.compile({ optimizer, loss: 'categoricalCrossentropy' });

    // Function to preprocess the board for the neural network
    const preprocessBoard = () => {
        return tf.tensor3d([props.XOArray.map(row => row.map(cell => (cell === playersData[0].sign ? 1 : 0)))]);
    };

    function resetBoard(additionalCode: () => void) {
        additionalCode();
        setSolved({count: 0, char: '', alertText: ''});
        setXOData([[{className: "XO", file: noImage}, {className: "XO", file: noImage}, {className: "XO", file: noImage}], [{className: "XO", file: noImage}, {className: "XO", file: noImage}, {className: "XO", file: noImage}], [{className: "XO", file: noImage}, {className: "XO", file: noImage}, {className: "XO", file: noImage}]]);
    }

    function setXOElementAndCheckIfEnd(XO_Column: number, XO_Row: number) {
        props.setXOArray(OnClickXOButton([...props.XOArray], XO_Column, XO_Row, props.isFirstPlayerStars, playersData[0].sign, playersData[1].sign));
        setXOData(prevState => {
            let tempXOFileURLs = [...prevState];
            tempXOFileURLs[XO_Column][XO_Row].file = (props.XOArray[XO_Column][XO_Row] ? (props.XOArray[XO_Column][XO_Row] === playersData[0].sign ? playersData[0].url : (props.XOArray[XO_Column][XO_Row] === playersData[1].sign ? playersData[1].url : noImage)) : noImage);
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
            // const availableMoves: { row: number; col: number }[] = [];
            // props.XOArray.forEach((row, i) => {
            //     row.forEach((cell, j) => {
            //         if (cell === '') availableMoves.push({ row: i, col: j });
            //     });
            // });
            // const move = availableMoves[Math.floor(Math.random() * availableMoves.length)];
            // if (props.XOArray[move.row][move.col]) return;
            // setXOElementAndCheckIfEnd(move.row, move.col);

            // Preprocess the board for the neural network
            const inputTensor = preprocessBoard();

            // Get policy and value predictions from the neural network
            const [policy, value] = model.predict(inputTensor) as [tf.Tensor, tf.Tensor];

            // Convert policy tensor to array
            const policyArray = Array.from(policy.dataSync());

            // Filter out invalid moves (where the board is already occupied)
            const availableMoves = policyArray
                .map((probability, index) => ({ probability, index }))
                .filter(({ index }) => props.XOArray[Math.floor(index / 3)][index % 3] === '');

            // Choose the move with the highest probability
            const bestMove = availableMoves.reduce((best, move) => (move.probability > best.probability ? move : best), {
                probability: -1,
                index: -1,
            });

            // Extract row and column from the index
            const row = Math.floor(bestMove.index / 3);
            const col = bestMove.index % 3;

            // Update the board with the AI's move
            setXOElementAndCheckIfEnd(row, col);

            // Dispose of the input tensor to avoid memory leaks
            inputTensor.dispose();
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