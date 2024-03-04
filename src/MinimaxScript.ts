import {checkBoard} from "./XOScript";
let firstSign: string, secondSign: string;
let originalBoard: string[][];

const getEmptySquares = (board: string[][]) => {
    const emptySquares = [];
    for (let row = 0; row < board.length; row++)
        for (let col = 0; col < board[row].length; col++)
            if (board[row][col] === '') emptySquares.push({ row, col });
    return emptySquares;
};

const minimax = (board: string[][], depth: number, maximizingPlayer: boolean) => {
    const [,winner,] = checkBoard(board);
    if (board.every(row => row.every(cell => cell !== ''))) {
        if (winner === firstSign) return { score: -1 };
        if (winner === secondSign) return { score: 1 };
        if (winner === '') return { score: 0 };
    }

    const emptySquares = getEmptySquares(board);

    if (maximizingPlayer) {
        let maxScore = -Infinity;
        let bestMove;

        for (const square of emptySquares) {
            const { row, col } = square;
            const newBoard = [...board];
            newBoard[row][col] = secondSign;
            const score = minimax(newBoard, depth + 1, false).score;

            if (score > maxScore && originalBoard[row][col] === '') {
                maxScore = score;
                bestMove = square;
            }
        }
        return { score: maxScore, move: bestMove };
    } else {
        let minScore = Infinity;
        let bestMove;

        for (const square of emptySquares) {
            const { row, col } = square;
            const newBoard = [...board];
            newBoard[row][col] = firstSign;
            const score = minimax(newBoard, depth + 1, true).score;

            if (score < minScore && originalBoard[row][col] === '') {
                minScore = score;
                bestMove = square;
            }
        }
        return { score: minScore, move: bestMove };
    }
};

export const getBestMove = (board: string[][], firstPlayerSign: string, secondPlayerSign: string) => {
    firstSign = firstPlayerSign;
    secondSign = secondPlayerSign;
    originalBoard = board.map(row => [...row]);
    const res = minimax(board.map(row => [...row]), 0, true).move;
    return res ? res : {row: -1, col: -1};
};