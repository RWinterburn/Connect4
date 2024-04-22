var playerRed = "R";
var playerYellow = "Y";
var currPlayer = playerRed;

var gameOver = false;
var board;
var currColumns;
var rows = 6;
var columns = 7;

window.onload = function(){
  setGame();
}

function setGame() {
  board = [];
  currColumns = [5, 5, 5, 5, 5, 5, 5];

  for(let r = 0; r < rows; r++){
    let row = [];
    for (let c=0; c < columns; c++){
      //js

      row.push(' ');

      //html 
      //<div id = "0-0" class ="tile"></div>
      let tile = document.createElement("div");
      tile.id = r.toString() + "-" + c.toString();
      tile.classList.add("tile");
      tile.addEventListener("click", setPiece);
      document.getElementById("board").append(tile);

    }
    board.push(row);
  }
}

function setPiece() {
  if(gameOver){
    return;
  }
  let coords = this.id.split("-");
  let r = parseInt(coords[0]);
  let c = parseInt(coords[1]);

  r = currColumns[c];
  if(r < 0){
    return;
  }
  board[r][c] = currPlayer;
  let tile = document.getElementById(r.toString() + "-" + c.toString());
  if (currPlayer == playerRed){
    tile.classList.add("red-piece");
    currPlayer = playerYellow;
  } else {
    tile.classList.add("yellow-piece");
    currPlayer = playerRed;
  }
  r -= 1;
  currColumns[c] = r;
  checkWinner(r, c);
}

function checkWinner(r, c) {
  // Check horizontally
  for (let i = 0; i < 4; i++) {
    if (
      c + i < columns &&
      board[r][c + i] === currPlayer &&
      board[r][c + i] === board[r][c + i + 1] &&
      board[r][c + i] === board[r][c + i + 2] &&
      board[r][c + i] === board[r][c + i + 3]
    ) {
      setWinner(r, c);
      return;
    }
  }

  // Check vertically
  for (let i = 0; i < 3; i++) {
    if (
      r + i < rows &&
      board[r + i][c] === currPlayer &&
      board[r + i][c] === board[r + i + 1][c] &&
      board[r + i][c] === board[r + i + 2][c] &&
      board[r + i][c] === board[r + i + 3][c]
    ) {
      setWinner(r, c);
      return;
    }
  }

  // Check diagonally
  for (let i = -3; i <= 0; i++) {
    if (
      r + i >= 0 &&
      r + i + 3 < rows &&
      c + i >= 0 &&
      c + i + 3 < columns &&
      board[r + i][c + i] === currPlayer &&
      board[r + i][c + i] === board[r + i + 1][c + i + 1] &&
      board[r + i][c + i] === board[r + i + 2][c + i + 2] &&
      board[r + i][c + i] === board[r + i + 3][c + i + 3]
    ) {
      setWinner(r, c);
      return;
    }
  }

  for (let i = -3; i <= 0; i++) {
    if (
      r + i >= 0 &&
      r + i + 3 < rows &&
      c - i < columns &&
      c - i - 3 >= 0 &&
      board[r + i][c - i] === currPlayer &&
      board[r + i][c - i] === board[r + i + 1][c - i - 1] &&
      board[r + i][c - i] === board[r + i + 2][c - i - 2] &&
      board[r + i][c - i] === board[r + i + 3][c - i - 3]
    ) {
      setWinner(r, c);
      return;
    }
  }
}

function setWinner(r, c) {
  let winner = document.getElementById("winner");
  if (board[r][c] === playerRed){
    winner.innerText = "Red Wins";
  } else {
    winner.innerText = "Yellow Wins";
  }

  gameOver = true;
}