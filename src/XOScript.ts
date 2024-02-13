export let XOCount: number = 0;

export function resetXOScript() {
    XOCount = 0;
}

export function OnClickXOButton() {
    XOCount = XOCount + 1;
}

export function checkBoard(board: string[][]): [boolean, string, number[][]] {
    const size = board.length;

    function checkPath(indexes: number[][]): [boolean, string, number[][]] {
        const path = indexes.map(([row, col]) => board[row][col]);
        const isWin = path.every(value => value === path[0] && value !== "");

        return [isWin, path[0], isWin ? indexes : []];
    }

    const winningIndexes: number[][] = [];

    for (let i = 0; i < size; i++) {
        const rowIndexes = Array.from({ length: size }, (_, index) => [i, index]);
        const colIndexes = Array.from({ length: size }, (_, index) => [index, i]);
        const diagonal1Indexes = Array.from({ length: size }, (_, index) => [index, index]);
        const diagonal2Indexes = Array.from({ length: size }, (_, index) => [index, size - 1 - index]);

        const results = [
            checkPath(rowIndexes),
            checkPath(colIndexes),
            checkPath(diagonal1Indexes),
            checkPath(diagonal2Indexes)
        ];

        for (const [isWin,, indexes] of results) {
            if (isWin) {
                winningIndexes.push(...indexes);
            }
        }
    }

    const isWin = winningIndexes.length > 0;
    const symbol = isWin ? board[winningIndexes[0][0]][winningIndexes[0][1]] : '';

    return [isWin, symbol, winningIndexes];
}

// Print the XOArray in the alert. Used only in Debugging!
function printXOArray(XOArray: string[][]) {
    alert(XOArray
        .map((row) => row.join(", ")) // Join each row's elements
        .join("\n"));
}