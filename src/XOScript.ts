export let XOCount: number = 0;
export let isFirstPlayerStars = true;

export function resetXOScript() {
  XOCount = 0;
}

export function SetIsFirstPlayerStars(value: boolean) {
  isFirstPlayerStars = value;
}

export function onClickXOElement(XOElement: HTMLInputElement): void {
  if (XOElement.value === "") {
    XOCount++;
    if (XOCount % 2 === 1) {
      XOElement.value = (isFirstPlayerStars ? "X" : "O");
    } else {
      XOElement.value = (isFirstPlayerStars ? "O" : "X");
    }
  }
}

export function checkIfPathIsWin(...values: string[]): boolean {
  return values.every(value => value === values[0] && value !== "");
}

export function checkBoard(board: string[][]): [boolean, string] {
  const size = board.length;

  for (let i: number = 0; i < size; i++) {
    // Checking per Row
    if (checkIfPathIsWin(...board[i])) {
      return [true, board[i][0]];
    }

    // Checking per Column
    if (checkIfPathIsWin(...board.map(row => row[i]))) {
      return [true, board[0][i]];
    }
  }

  // Checking per Diagonal
  if (checkIfPathIsWin(...board.map((row, index) => row[index]))) {
    return [true, board[0][0]];
  }

  if (checkIfPathIsWin(...board.map((row, index) => row[size - 1 - index]))) {
    return [true, board[0][size - 1]];
  }

  return [false, ''];
}

export function gameTimeoutAlert(value: [boolean, string], firstPlayerName: string, secondPlayerName: string): void {
  let alertText: string = "";
  if (value[0] && (value[1] === 'X' || value[1] === 'O')) {
    if ('X' === value[1][0]) {
      alertText = firstPlayerName + " (X) Won!";
    } else {
      alertText = secondPlayerName + " (O) Won!";
    }
  } else {
    if (XOCount !== 9) {
      return;
    }
    alertText = "Game Ended With a Tie!";
  }

  setTimeout(function(): void {
    alert(alertText);
  }, 10);
}

// Print the XOArray in the alert. Used only in Debugging!
function printXOArray(XOArray: string[][]) {
  alert(XOArray
      .map((row) => row.join(", ")) // Join each row's elements
      .join("\n"));
}