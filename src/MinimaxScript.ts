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

const minimax = (board: string[][], depth: number, maximizingPlayer: boolean): {
    score: number;
    count: number;
    move?: { row: number; col: number; } | undefined;
} => {
    const [, winner,] = checkBoard(board);
    if (board.every(row => row.every(cell => cell !== ''))) {
        if (winner === firstSign) return {score: -1, count: -1};
        if (winner === secondSign) return {score: 1, count: 1};
        if (winner === '') return {score: 0, count: 0};
    }

    const emptySquares = getEmptySquares(board);
    let bestMove, bestCount = 0, count = 0;

    if (maximizingPlayer) {
        let maxScore = -Infinity;
        for (const square of emptySquares) {
            const newBoard = cloneBoard(board);
            newBoard[square.row][square.col] = secondSign;
            const minimaxResult = minimax(newBoard, depth + 1, false);
            if (originalBoard[square.row][square.col] === '')
                if (minimaxResult.score > maxScore) [maxScore, bestMove, bestCount, count] = [minimaxResult.score, square, minimaxResult.count, 1];
                else if (minimaxResult.score === maxScore) {
                    count++;
                    if (minimaxResult.count > bestCount) [bestCount, bestMove] = [minimaxResult.count, square];
                }
        }
        return {score: maxScore, move: bestMove, count: count};
    } else {
        let minScore = Infinity;
        for (const square of emptySquares) {
            const newBoard = cloneBoard(board);
            newBoard[square.row][square.col] = firstSign;
            const minimaxResult = minimax(newBoard, depth + 1, true);
            if (originalBoard[square.row][square.col] === '')
                if (minimaxResult.score < minScore) [minScore, bestMove, bestCount, count] = [minimaxResult.score, square, minimaxResult.count, 1];
                else if (minimaxResult.score === minScore) {
                    count++;
                    if (minimaxResult.count > bestCount) [bestCount, bestMove] = [minimaxResult.count, square];
                }
        }
        return {score: minScore, move: bestMove, count: count};
    }
};

export const getBestMove = (board: string[][], firstPlayerSign: string, secondPlayerSign: string) => {
    [firstSign, secondSign, originalBoard] = [firstPlayerSign, secondPlayerSign, cloneBoard(board)];
    const res = minimax(cloneBoard(board), 0, true).move;
    return res ? res : {row: -1, col: -1};
};