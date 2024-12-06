// Global Variables
let currentPlayer = "X";
let board = ["", "", "", "", "", "", "", "", ""];
let gameActive = true;

const cells = document.querySelectorAll(".cell"); // Cache the cells for better performance
const messageElement = document.getElementById("message"); // Cache message element
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

// Handle player move
function makeMove(index) {
    // Ignore moves on taken cells or if the game is not active
    if (!gameActive || board[index] !== "") return;

    // Update the board and UI
    board[index] = currentPlayer;
    cells[index].textContent = currentPlayer;
    cells[index].classList.add("taken");

    // Check for win or draw
    if (checkWinner()) {
        messageElement.textContent = `Player ${currentPlayer} Wins!`;
        gameActive = false;
        return;
    }

    if (board.every(cell => cell !== "")) {
        messageElement.textContent = "It's a Draw!";
        gameActive = false;
        return;
    }

    // Switch turns
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    messageElement.textContent = `Player ${currentPlayer}'s Turn`;
}

// Check if the current player has won
function checkWinner() {
    return winningCombinations.some(combination => {
        return combination.every(index => board[index] === currentPlayer);
    });
}

// Reset the game state
function resetGame() {
    board = ["", "", "", "", "", "", "", "", ""];
    gameActive = true;
    currentPlayer = "X";

    // Reset UI
    cells.forEach(cell => {
        cell.textContent = "";
        cell.classList.remove("taken");
    });
    messageElement.textContent = "Good Luck!";
}

// Add event listeners to cells and reset button
cells.forEach((cell, index) => {
    cell.addEventListener("click", () => makeMove(index));
});
document.getElementById("resetButton").addEventListener("click", resetGame);
