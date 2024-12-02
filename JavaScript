// script.js

let currentPlayer = "X";
let board = ["", "", "", "", "", "", "", "", ""];
let gameActive = true;

const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function makeMove(index) {
    if (!gameActive || board[index] !== "") return;

    board[index] = currentPlayer;
    document.querySelectorAll(".cell")[index].textContent = currentPlayer;
    document.querySelectorAll(".cell")[index].classList.add("taken");

    if (checkWinner()) {
        document.getElementById("message").textContent = `Player ${currentPlayer} Wins!`;
        gameActive = false;
        return;
    }

    if (board.every(cell => cell !== "")) {
        document.getElementById("message").textContent = "It's a Draw!";
        gameActive = false;
        return;
    }

    currentPlayer = currentPlayer === "X" ? "O" : "X";
    document.getElementById("message").textContent = `Player ${currentPlayer}'s Turn`;
}

function checkWinner() {
    return winningCombinations.some(combination => {
        return combination.every(index => board[index] === currentPlayer);
    });
}

function resetGame() {
    board = ["", "", "", "", "", "", "", "", ""];
    gameActive = true;
    currentPlayer = "X";
    document.querySelectorAll(".cell").forEach(cell => {
        cell.textContent = "";
        cell.classList.remove("taken");
    });
    document.getElementById("message").textContent = "Good Luck!";
}
