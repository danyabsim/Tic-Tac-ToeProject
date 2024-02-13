export let XOCount: number = 0;

export function resetXOScript() {
    XOCount = 0;
}

export function OnClickXOButton() {
    XOCount = XOCount + 1;
}

export function checkBoard(board: string[][]): [boolean, string, number[][]] {
    const size = board.length;

    function checkPattern(pattern: number[][]): [boolean, string, number[][]] {
        const symbols = pattern.map(([row, col]) => board[row][col]);
        const isWin = symbols.every(value => value === symbols[0] && value !== "");

        return [isWin, symbols[0], isWin ? pattern : []];
    }

    const patterns = [
        // Rows
        Array.from({ length: size }, (_, col) => [0, col]),
        Array.from({ length: size }, (_, col) => [1, col]),
        Array.from({ length: size }, (_, col) => [2, col]),
        // Columns
        Array.from({ length: size }, (_, row) => [row, 0]),
        Array.from({ length: size }, (_, row) => [row, 1]),
        Array.from({ length: size }, (_, row) => [row, 2]),
        // Diagonals
        Array.from({ length: size }, (_, index) => [index, index]),
        Array.from({ length: size }, (_, index) => [index, size - 1 - index]),
    ];

    const winningPatterns: number[][] = [];

    for (const pattern of patterns) {
        const [isWin, , indexes] = checkPattern(pattern);
        if (isWin) {
            winningPatterns.push(...indexes);
        }
    }

    const isWin = winningPatterns.length > 0;
    const symbol = isWin ? board[winningPatterns[0][0]][winningPatterns[0][1]] : '';

    return [isWin, symbol, winningPatterns];
}

// Print the XOArray in the alert. Used only in Debugging!
// eslint-disable-next-line
function printXOArray(XOArray: string[][]) {
    alert(XOArray
        .map((row) => row.join(", ")) // Join each row's elements
        .join("\n"));
}