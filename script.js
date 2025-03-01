console.log("Welcome To Tic-Tac-Toe");

let audioTurn = new Audio("ting.mp3");
let gameover = new Audio("game-over.wav");

const cells = document.querySelectorAll(".cell");
const resultBanner = document.querySelector(".result-banner");
const resetButton = document.querySelector(".reset-button");
const scoreDisplays = document.querySelectorAll(".score");
const restartButton = document.querySelector(".restart-btn");

let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "star";
let scores = { star: 0, planet: 0 };
let totalGames = 0;
let isPlayerTurn = true;

cells.forEach((cell, index) => {
  cell.addEventListener("click", () => {
    if (isPlayerTurn) {
      handleMove(index, cell);
      audioTurn.play();
      console.log("Player clicked on cell", index);
    }
  });
});

restartButton.addEventListener("click", restart);
function restart() {
  location.reload();
  console.log("Game Restarted");
}

resetButton.addEventListener("click", resetGame);

function handleMove(index, cell) {
  if (board[index] !== "") return;

  board[index] = currentPlayer;
  addSymbol(cell, currentPlayer);

  if (checkWin()) {
    scores[currentPlayer]++;
    totalGames++;
    updateScore();
    endGame(`${capitalize(currentPlayer)} Wins!`);
    return;
  }

  if (!board.includes("")) {
    totalGames++;
    updateScore();
    endGame("It's a Draw!");
    return;
  }

  switchTurn();

  if (!isPlayerTurn) {
    setTimeout(computerMove, 500);
  }
}

function addSymbol(cell, player) {
  let img = cell.querySelector(".symbol-img");

  if (!img) {
    img = document.createElement("img");
    img.classList.add("symbol-img");
    cell.appendChild(img);
  }

  img.src =
    player === "star"
      ? "public/images/Star asset.png"
      : "public/images/Planet asset.svg";

  img.style.width = "80%";
  img.style.height = "80%";
  img.style.position = "absolute";
  img.style.top = "50%";
  img.style.left = "50%";
  img.style.transform = "translate(-50%, -50%)";
}

function switchTurn() {
  currentPlayer = currentPlayer === "star" ? "planet" : "star";
  isPlayerTurn = !isPlayerTurn;
}

function checkWin() {
  const winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  return winPatterns.some(
    (pattern) =>
      board[pattern[0]] &&
      board[pattern[0]] === board[pattern[1]] &&
      board[pattern[1]] === board[pattern[2]]
  );
}

function endGame(winner) {
  gameover.play();
  console.log(winner);

  document.querySelector(".game-container").style.display = "none";
  document.querySelector(".score-display").style.display = "none";
  document.querySelector(".restart-btn").style.display = "none";

  document.querySelector(".star").style.display = "none";
  document.querySelector(".draw").style.display = "none";
  document.querySelector(".planet").style.display = "none";

  let resultBanner = document.querySelector(".result-banner");

  if (winner === "Star Wins!") {
    document.querySelector(".star").style.display = "flex";
    resultText = "Star Wins!";
  } else if (winner === "It's a Draw!") {
    document.querySelector(".draw").style.display = "flex";
    resultText = "It's a Draw!";
  } else if (winner === "Planet Wins!") {
    document.querySelector(".planet").style.display = "flex";
    resultText = "Planet Wins!";
  }

  resultBanner.style.display = "flex";
  resultBanner.style.justifyContent = "center";
  resultBanner.style.alignItems = "center";
  resultBanner.style.alignContent = "center";
  resultBanner.style.position = "absolute";
  resultBanner.style.top = "50%";
  resultBanner.style.left = "50%";
  resultBanner.style.transform = "translate(-50%, -50%)";


  if(winner === "Star Wins!") {
  document.body.style.background = "rgba(71, 81, 84, 1)";
  } else if(winner === "Planet Wins!") {
  document.body.style.background = "rgba(124, 105, 87, 1)";
  } else if(winner === "It's a Draw!") {    
  document.body.style.background = "rgba(129, 129, 129, 1)";
  }


  isPlayerTurn = false;
}

document.addEventListener("DOMContentLoaded", () => {
  document
    .querySelectorAll(".next-round")
    .forEach((button) => button.addEventListener("click", nextRound));

  document
    .querySelectorAll(".restart")
    .forEach((button) => button.addEventListener("click", restartGame));
});

function nextRound() {
  let previousWinner = checkWin() ? currentPlayer : null;

  board = ["", "", "", "", "", "", "", "", ""];
  isPlayerTurn = true;
  if (previousWinner) {
    currentPlayer = previousWinner === "star" ? "planet" : "star";
  } else {
    switchTurn();
  }
  cells.forEach((cell) => {
    let img = cell.querySelector(".symbol-img");
    if (img) img.remove();
  });
  console.log("Next round started");
  document.querySelector(".result-banner").style.display = "none";

  if (!isPlayerTurn) {
    setTimeout(computerMove, 500);
  }

  document.body.style.backgroundColor = "";

  document.querySelector(".game-container").style.display = "block";
  document.querySelector(".score-display").style.display = "flex";
  document.querySelector(".restart-btn").style.display = "flex";
}

function restartGame() {
  console.log("Game restarted");
  document.querySelector(".result-banner").style.display = "none";
  location.reload();
  resetGame();

  document.body.style.backgroundColor = "";
}

function resetBoard() {
  console.log("Resetting board to next round...");
}

function resetGame() {
  console.log("Refreshing entire game...");
}

function computerMove() {
  let move = findBestMove();

  if (move === -1) return;

  let cell = cells[move];
  board[move] = currentPlayer;
  addSymbol(cell, currentPlayer);

  if (checkWin()) {
    scores[currentPlayer]++;
    totalGames++;
    updateScore();
    endGame(`${capitalize(currentPlayer)} Wins!`);
    return;
  }

  if (!board.includes("")) {
    totalGames++;
    updateScore();
    endGame("It's a Draw!");
    return;
  }

  switchTurn();
}

function findBestMove() {
  for (let i = 0; i < 9; i++) {
    if (board[i] === "") {
      board[i] = currentPlayer;
      if (checkWin()) {
        board[i] = "";
        return i;
      }
      board[i] = "";
    }
  }

  let opponent = currentPlayer === "star" ? "planet" : "star";
  for (let i = 0; i < 9; i++) {
    if (board[i] === "") {
      board[i] = opponent;
      if (checkWin()) {
        board[i] = "";
        return i;
      }
      board[i] = "";
    }
  }

  if (board[4] === "") return 4;

  let corners = [0, 2, 6, 8].filter((i) => board[i] === "");
  if (corners.length > 0)
    return corners[Math.floor(Math.random() * corners.length)];

  let sides = [1, 3, 5, 7].filter((i) => board[i] === "");
  if (sides.length > 0) return sides[Math.floor(Math.random() * sides.length)];

  return -1;
}

function updateScore() {
  let scoreDisplays = document.querySelectorAll(".score");

  scoreDisplays[0].textContent = `${scores.planet}/${totalGames}`;
  scoreDisplays[1].textContent = `${scores.star}/${totalGames}`;

  let planetIcon = document.querySelector(".planet-icon");
  let starIcon = document.querySelector(".star-icon");
  let resultBanner = document.querySelector(".result-banner");

  planetIcon.classList.remove("highlight", "loser");
  starIcon.classList.remove("highlight", "loser");

  let resultScore = parseInt(resultBanner.textContent) || 0;

  if (scores.planet === resultScore && scores.planet !== scores.star) {
    planetIcon.classList.add("highlight");
    // starIcon.classList.add("loser");
  } else if (scores.star === resultScore && scores.planet !== scores.star) {
    starIcon.classList.add("highlight");
    // planetIcon.classList.add("loser");
  }
}


function resetGame() {
  board = ["", "", "", "", "", "", "", "", ""];
  isPlayerTurn = true;
  currentPlayer = "planet";

  cells.forEach((cell) => {
    let img = cell.querySelector(".symbol-img");
    if (img) img.remove();
  });

  resultBanner.style.display = "none";
}

function capitalize(word) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}
