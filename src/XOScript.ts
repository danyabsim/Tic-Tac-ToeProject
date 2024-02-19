export let XOCount: number = 0;

export function resetXOScript() {
    XOCount = 0;
}

export function OnClickXOButton(XOArray: string[][], XO_Column: number, XO_Row: number, isFirstPlayerStars: boolean, firstSign: string, secondSign: string): string[][] {
    XOCount = XOCount + 1;
    if (XOArray[XO_Column - 1][XO_Row - 1] === "") {
        XOArray[XO_Column - 1][XO_Row - 1] = XOCount % 2 === 1 ? (isFirstPlayerStars ? firstSign : secondSign) : (isFirstPlayerStars ? secondSign : firstSign)
    }
    return XOArray;
}

export function checkBoard(board: string[][]): [boolean, string, number[][]] {
    const size = board.length;

    function checkPattern(pattern: number[][]): [boolean, string, number[][]] {
        const symbols = pattern.map(([row, col]) => board[row][col]);
        const isWin = symbols.every(value => value === symbols[0] && value !== "");

        return [isWin, symbols[0], isWin ? pattern : []];
    }

    const patterns: number[][][] = [];

    // Rows and Columns
    for (let i = 0; i < size; i++) {
        const rowPattern = Array.from({length: size}, (_, col) => [i, col]);
        const colPattern = Array.from({length: size}, (_, row) => [row, i]);

        patterns.push(rowPattern, colPattern);
    }

    // Diagonals
    const diagonal1Pattern = Array.from({length: size}, (_, index) => [index, index]);
    const diagonal2Pattern = Array.from({length: size}, (_, index) => [index, size - 1 - index]);

    patterns.push(diagonal1Pattern, diagonal2Pattern);

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