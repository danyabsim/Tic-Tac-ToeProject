import {ActionTypes, HistoryReducer} from "./redux/HistoryReducer";
import {HistoryProps} from "./redux/HistoryProps";
import {ResultsProps} from "./components/Results/ResultsProps";

export let XOCount: number = 0;

export function resetXOScript() {
  XOCount = 0;
}

export function onClickXOElement(XOElement: HTMLInputElement, isFirstPlayerStars: boolean): void {
  if (XOElement.value === "") {
    XOCount++;
    if (XOCount % 2 === 1) {
      XOElement.value = (isFirstPlayerStars ? "X" : "O");
    } else {
      XOElement.value = (isFirstPlayerStars ? "O" : "X");
    }
  }
}

export function checkIfPathIsWin(...values: string[]): [boolean, number[]] {
  const isWin = values.every(value => value === values[0] && value !== "");
  const indexes = isWin ? Array.from({ length: values.length }, (_, i) => i) : [];
  return [isWin, indexes];
}

export function checkBoard(board: string[][]): [boolean, string, number[][]] {
  const size = board.length;

  for (let i: number = 0; i < size; i++) {
    // Checking per Row
    const [isRowWin, rowIndexes] = checkIfPathIsWin(...board[i]);
    if (isRowWin) {
      return [true, board[i][0], rowIndexes.map(index => [i, index])];
    }

    // Checking per Column
    const [isColumnWin, columnIndexes] = checkIfPathIsWin(...board.map(row => row[i]));
    if (isColumnWin) {
      return [true, board[0][i], columnIndexes.map(index => [index, i])];
    }
  }

  // Checking per Diagonal
  const [isDiagonal1Win, diagonal1Indexes] = checkIfPathIsWin(...board.map((row, index) => row[index]));
  if (isDiagonal1Win) {
    return [true, board[0][0], diagonal1Indexes.map(index => [index, index])];
  }

  const [isDiagonal2Win, diagonal2Indexes] = checkIfPathIsWin(...board.map((row, index) => row[size - 1 - index]));
  if (isDiagonal2Win) {
    return [true, board[0][size - 1], diagonal2Indexes.map(index => [index, size - 1 - index])];
  }

  return [false, '', []];
}

export function addToHistory(props: HistoryProps & ResultsProps) {
  props.setHistoryGameState(HistoryReducer(props.historyGameState, {
    type: ActionTypes.ADD_HISTORY,
    history: {
      firstPlayerName: props.firstPlayerName,
      secondPlayerName: props.secondPlayerName,
      firstPlayerWins: props.firstPlayerWins,
      ties: props.ties,
      secondPlayerWins: props.secondPlayerWins
    }
  }));
}

export function removeOldestHistory(props: HistoryProps & ResultsProps) {
  props.setHistoryGameState(HistoryReducer(props.historyGameState, {type: ActionTypes.CONSOLE_PRINT, history: {
      firstPlayerName: props.firstPlayerName,
      secondPlayerName: props.secondPlayerName,
      firstPlayerWins: props.firstPlayerWins,
      ties: props.ties,
      secondPlayerWins: props.secondPlayerWins
    }
  }));
}

export function showHistory(props: HistoryProps & ResultsProps) {
  props.setHistoryGameState(HistoryReducer(props.historyGameState, {type: ActionTypes.CONSOLE_PRINT, history: {
      firstPlayerName: props.firstPlayerName,
      secondPlayerName: props.secondPlayerName,
      firstPlayerWins: props.firstPlayerWins,
      ties: props.ties,
      secondPlayerWins: props.secondPlayerWins
    }
  }));
}

// Print the XOArray in the alert. Used only in Debugging!
function printXOArray(XOArray: string[][]) {
  alert(XOArray
      .map((row) => row.join(", ")) // Join each row's elements
      .join("\n"));
}