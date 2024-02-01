export let XOCount: number = 0;
let solved: boolean = false;
let firstPlayer = "";
let secondPlayer = "";
let firstPlayerSign = 'X';
let secondPlayerSign = 'O';
let isFirstPlayerStars = true;

export function setFirstPlayer(value: string) {
  firstPlayer = value;
}

export function setSecondPlayer(value: string) {
  secondPlayer = value;
}
export function setIsFirstPlayerStars(value: boolean) {
  isFirstPlayerStars = value;
}

export function setSolved(value: boolean) {
  solved = value;
}

export function onClickXOElement(XOElement: HTMLInputElement): void {
  if (XOElement.value === "" && !solved) {
    //XOElement.disabled = true;
    XOCount++;
    if (XOCount % 2 === 1) {
      XOElement.value = (isFirstPlayerStars ? "X" : "O");
    } else {
      XOElement.value = (isFirstPlayerStars ? "O" : "X");
    }
  }
}

export function checkIfPathIsWin(firstXOButtonValue: string, secondXOButtonValue: string, thirdXOButtonValue: string): boolean {
  return (firstXOButtonValue === secondXOButtonValue && firstXOButtonValue === thirdXOButtonValue && firstXOButtonValue !== "");
}

export function checkBoard(board: string[][]): [boolean, string[]] {
  for (let i: number = 0; i <= 2; i++) {
    // Checking per Row
    if (checkIfPathIsWin(board[i][0], board[i][1], board[i][2]))
    {
      return [true, [board[i][0], board[i][1], board[i][2]]];
    }
    // Checking per Column
    if (checkIfPathIsWin(board[0][i], board[1][i], board[2][i]))
    {
      return [true, [board[0][i], board[1][i], board[2][i]]];
    }
  }

  // Checking per Diagonal
  if (checkIfPathIsWin(board[0][0], board[1][1], board[2][2])) {
    return [true, [board[0][0], board[1][1], board[2][2]]];
  }

  if (checkIfPathIsWin(board[0][2], board[1][1], board[2][0])){
    return [true, [board[0][2], board[1][1], board[2][0]]];
  }

  return [false, ['', '', '']];
}

export function gameTimeoutAlert(value: [boolean, string[]]): void {
  let alertText: string = "";
  if (value[0] && (value[1][0] === 'X' || value[1][0] === 'O')) {
    if (firstPlayerSign === value[1][0]) {
      alertText = firstPlayer + " (" + firstPlayerSign + ") Won!";
    } else {
      alertText = secondPlayer + " (" + secondPlayerSign + ") Won!";
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