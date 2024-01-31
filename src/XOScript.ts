let XOCount: number = 0;
let solved: boolean = false;
let firstPlayerWon: number = 0;
let secondPlayerWon: number = 0;
let ties: number = 0;
let firstPlayer = "";
let secondPlayer = "";

export function setFirstPlayer(value: string) {
  firstPlayer = value;
}

export function setSecondPlayer(value: string) {
  secondPlayer = value;
}

export function onClickXOElement(XOElement: HTMLInputElement): void {
  if (XOElement.value === "" && !solved) {
    XOElement.disabled = true;
    XOCount++;
    if (XOCount % 2 === 1) {
      XOElement.value = "X";
      XOElement.className = "X";
    } else {
      XOElement.value = "O";
      XOElement.className = "O";
    }
    solved = checkBoard();
  }
  gameTimeoutAlert(solved);

  if (solved || XOCount === 9) {
    resultScreen();
  }
}

export function resultScreen() {
  const XResults = document.getElementById('XResults') as HTMLElement;
  XResults.textContent = firstPlayerWon.toString();
  const OResults = document.getElementById('OResults') as HTMLElement;
  OResults.textContent =  secondPlayerWon.toString();
  const tieResults = document.getElementById('tieResults') as HTMLElement;
  tieResults.textContent = ties.toString();
}

export function checkBoard(): boolean {

  for (let i: number = 1; i <= 3; i++) {
    let XO_Row1 : HTMLInputElement = document.getElementById("XO" + i + "1") as HTMLInputElement;
    let XO_Row2 : HTMLInputElement = document.getElementById("XO" + i + "2") as HTMLInputElement;
    let XO_Row3 : HTMLInputElement = document.getElementById("XO" + i + "3") as HTMLInputElement;
    let XO_Column1 : HTMLInputElement = (i !== 1) ?  document.getElementById("XO1" + i) as HTMLInputElement : XO_Row1;
    let XO_Column2 : HTMLInputElement = (i !== 2) ?  document.getElementById("XO2" + i) as HTMLInputElement : XO_Row2;
    let XO_Column3 : HTMLInputElement = (i !== 3) ?  document.getElementById("XO3" + i) as HTMLInputElement : XO_Row3;

    // Checking per Row
    if (XO_Row1.value === XO_Row2.value && XO_Row1.value === XO_Row3.value && XO_Row1.value !== "") {
      announceWinner(XO_Row1, XO_Row2, XO_Row3);
      return true;
    }
    // Checking per Column
    if (XO_Column1.value === XO_Column2.value && XO_Column1.value === XO_Column3.value && XO_Column1.value !== "") {
      announceWinner(XO_Column1, XO_Column2, XO_Column3);
      return true;
    }
  }

  // Checking per Diagonal
  const XO11 = document.getElementById("XO11") as HTMLInputElement;
  const XO13 = document.getElementById("XO13") as HTMLInputElement;
  const XO22 = document.getElementById("XO22") as HTMLInputElement;
  const XO31 = document.getElementById("XO31") as HTMLInputElement;
  const XO33 = document.getElementById("XO33") as HTMLInputElement;
  if (XO11.value === XO22.value && XO11.value === XO33.value && XO11.value !== "") {
    announceWinner(XO11, XO22, XO33);
    return true;
  }
  if (XO13.value === XO22.value && XO13.value === XO31.value && XO13.value !== "") {
    announceWinner(XO13, XO22, XO31);
    return true;
  }
  return false;
}

export function announceWinner(firstXOElement: HTMLInputElement, secondXOElement: HTMLInputElement, thirdXOElement: HTMLInputElement): void {
  stylingTheWinningXOElement(firstXOElement);
  stylingTheWinningXOElement(secondXOElement);
  stylingTheWinningXOElement(thirdXOElement);
  // They are all equal to each other so no need to check that!
  gameTimeoutAlert(firstXOElement.value);
}

export function gameTimeoutAlert(value: string | boolean): void {
  let alertText: string = "";
  switch(value) {
    case "X":
      alertText = firstPlayer + " (X) Won!";
      firstPlayerWon++;
      break;
    case "O":
      alertText = secondPlayer + " (O) Won!";
      secondPlayerWon++;
      break;
    case false:
      if (XOCount !== 9) {
        return;
      }
      ties++;
      alertText = "Game Ended With a Tie!";
      break;
    default: return;
  }

  setTimeout(function(): void {
    alert(alertText);
  }, 10);
}

export function stylingTheWinningXOElement(XOElement: HTMLInputElement): void {
  XOElement.style.fontWeight = "bold";
  XOElement.style.backgroundColor = "#00FFBB";
}

export function restartTheBoard(restartResults : boolean): void {
  if (solved || XOCount === 9){
    XOCount = 0;
    solved = false;
    for (let i: number = 1; i <= 3; i++) {
      for (let j: number = 1; j <= 3; j++) {
        const XOElement = document.getElementById("XO" + i + j) as HTMLInputElement;
        XOElement.value = "";
        XOElement.disabled = false;
        XOElement.style.fontWeight = "";
        XOElement.style.backgroundColor = "black";
      }
    }
  } else if (XOCount !== 0) {
    alert("You can't go to the next game if the current game didn't end!");
  }

  if (restartResults) {
    firstPlayerWon = 0;
    secondPlayerWon = 0;
    ties = 0;
    resultScreen();
  }
}
