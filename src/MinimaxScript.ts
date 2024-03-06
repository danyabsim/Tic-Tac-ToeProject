import {checkBoard} from "./XOScript";

let firstSign: string, secondSign: string, originalBoard: string[][];

const cloneBoard = (board: string[][]) => board.map(row => [...row]);

const getEmptySquares = (board: string[][]) => {
    const emptySquares = [];
    for (let row = 0; row < board.length; row++)
        for (let col = 0; col < board[row].length; col++)
            if (board[row][col] === '') emptySquares.push({row, col});
    return emptySquares;
};

const minimax = (board: string[][], depth: number, isMaximizing: boolean): {
    score: number;
    move?: { row: number; col: number; } | undefined;
} => {
    const [finished, winner,] = checkBoard(board);
    if (finished || board.every(row => row.every(cell => cell !== ''))) {
        if (winner === firstSign) return {score: depth - 10};
        if (winner === secondSign) return {score: 10 - depth};
        if (winner === '') return {score: 0};
    }

    const emptySquares = getEmptySquares(board);
    let bestMove;

    if (isMaximizing) {
        let maxScore = -Infinity;
        for (const square of emptySquares) {
            const newBoard = cloneBoard(board);
            newBoard[square.row][square.col] = secondSign;
            const minimaxResult = minimax(newBoard, depth + 1, false);
            if (originalBoard[square.row][square.col] === '' && minimaxResult.score > maxScore) [maxScore, bestMove] = [minimaxResult.score, square];
        }
        return {score: maxScore, move: bestMove};
    } else {
        let minScore = Infinity;
        for (const square of emptySquares) {
            const newBoard = cloneBoard(board);
            newBoard[square.row][square.col] = firstSign;
            const minimaxResult = minimax(newBoard, depth + 1, true);
            if (originalBoard[square.row][square.col] === '' && minimaxResult.score < minScore) [minScore, bestMove] = [minimaxResult.score, square, 1];
        }
        return {score: minScore, move: bestMove};
    }
};

export const getBestMove = (board: string[][], firstPlayerSign: string, secondPlayerSign: string) => {
    [firstSign, secondSign, originalBoard] = [firstPlayerSign, secondPlayerSign, cloneBoard(board)];
    const res = minimax(cloneBoard(board), 0, true).move;
    return res ? res : {row: -1, col: -1};
};