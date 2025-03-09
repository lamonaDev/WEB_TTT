const cells = document.querySelectorAll(".cell");
const statusText = document.querySelector("#statusText");
const restartBtn = document.querySelector("#restartBtn");
const xWinCont = document.querySelector("#xWinsCount");
const oWinCont = document.querySelector("#oWinsCount");
const drawCont = document.querySelector("#drawCount");
const resetBtn = document.querySelector("#resetBtn");
const playWithComputerBtn = document.querySelector("#playWithComputerBtn");
let running = false;
playWithComputerBtn.addEventListener("click", () => {
    playWithComputer = !playWithComputer;
    playWithComputerBtn.textContent = playWithComputer ? "Play with Human" : "Play with Computer";
    restartGame();
});
resetBtn.addEventListener("click", () => {
    statusText.textContent = "The game has been reset!";
    xWinCont.textContent = 0; oWinCont.textContent = 0; drawCont.textContent = 0;
    cells.forEach(cell => cell.textContent = "");
});
const winConditions = [
    //* ROWS
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    //* COLUMNS
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    //* DIAGONALS
    [0, 4, 8], [2, 4, 6]
];
let options = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let playWithComputer = false;
initializeGame();
function initializeGame() {
    cells.forEach(cell => cell.addEventListener("click", cellClicked));
    restartBtn.addEventListener("click", restartGame);
    statusText.textContent = `${currentPlayer}'s turn`;
    running = true;
}
function cellClicked() {
    const cellIndex = this.getAttribute("cellIndex");
    if(options[cellIndex] != "" || !running) { return; }
    updateCell(this, cellIndex);
    checkWinner();
    if (playWithComputer && currentPlayer === "O" && running) {
        computerMove();
    }
}
function updateCell(cell, index) {
    options[index] = currentPlayer; cell.textContent = currentPlayer;
}
function changePlayer(){
    currentPlayer = (currentPlayer == "X") ? "O" : "X";
    statusText.textContent = `${currentPlayer}'s turn`;
}
function checkWinner(){
    let roundWon = false;
    for(let i = 0; i < winConditions.length; i++){
        const condition = winConditions[i];
        const cellA = options[condition[0]];
        const cellB = options[condition[1]];
        const cellC = options[condition[2]];
        if(cellA == "" || cellB == "" || cellC == "") { continue; }
        if(cellA == cellB && cellB == cellC) { roundWon = true; break; }
    }
    if (roundWon) {
        statusText.textContent = `${currentPlayer} wins!`; running = false;
        if (currentPlayer === "X") {
            xWinCont.textContent = parseInt(xWinCont.textContent) + 1;
        } else {
            oWinCont.textContent = parseInt(oWinCont.textContent) + 1;
        }
    } else if(!options.includes("")){
        statusText.textContent = `Draw!`;
        drawCont.textContent = parseInt(drawCont.textContent) + 1; running = false;
    } else { changePlayer(); }
}
function restartGame() {
    options = ["", "", "", "", "", "", "", "", ""];
    statusText.textContent = `${currentPlayer}'s turn`;
    cells.forEach(cell => cell.textContent = "");
    running = true;
    // changePlayer();
    if (playWithComputer && currentPlayer === "O") {
        computerMove();
    }
}
function computerMove() {
    let availableCells = [];
    options.forEach((cell, index) => {
        if (cell === "") {
            availableCells.push(index);
        }
    });
    if (availableCells.length > 0) {
        const randomCellIndex = availableCells[Math.floor(Math.random() * availableCells.length)];
        const cell = cells[randomCellIndex];
        updateCell(cell, randomCellIndex);
        checkWinner();
    }
}