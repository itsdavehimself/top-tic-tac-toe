function Gameboard() {
  const rows = 3;
  const columns = 3;
  const board = [];

  for (let i = 0; i < rows; i++) {
    board[i] = [];
    for (let j = 0; j < columns; j++) {
      board[i].push(Box());
    }
  }

  const getBoard = () => board;

  const playerMove = (row, column, player) => {
    if (board[row][column].getValue() !== '') {
      console.log("Can't move there. Spot's taken.");
      return false;
    } else {
      console.log('Nice move') 
      board[row][column].markBox(player);
    }
  } 

  const printBoard = () => {
    const boardWithValues = board.map((row) => row.map((cell) => cell.getValue()));
    console.log(boardWithValues);
  }

  const checkCellValue = (row, column) => board[row][column].getValue();

  return { getBoard, printBoard, playerMove, checkCellValue };

};


function Box() {
  let value = '';

  const markBox = (player) => {
    value = player;
  }

  const getValue = () => value;

  return { getValue, markBox }
}


const GameController = function() {

  const players = [
    {
      name: 'Player X',
      token: 'X'
      
    },
    {
      name: 'Player O',
      token: 'O'
    }
  ]

  const board = Gameboard();

  let currentPlayer = players[0];

  let winningPlayer = '';

  const getWinningPlayer = () => winningPlayer;

  const switchPlayer = () => {
    currentPlayer = currentPlayer === players[0] ? players[1] : players[0]; 
  }

  const getCurrentPlayer = () => currentPlayer;

  const showBoard = () => {
    board.printBoard();
    console.log(`${currentPlayer.name}'s turn`);
  } 

  const checkCell = (row, column) => board.checkCellValue(row, column);

  const checkWin = () => {
    if (checkCell(0, 0) === checkCell(0, 1) && checkCell(0, 1) === checkCell(0, 2) && checkCell(0,0) !== ''
    || checkCell(1, 0) === checkCell(1, 1) && checkCell(1, 1) === checkCell(1, 2) && checkCell(1,0) !== ''
    || checkCell(2, 0) === checkCell(2, 1) && checkCell(2, 1) === checkCell(2, 2) && checkCell(2,0) !== ''
    || checkCell(0, 0) === checkCell(1, 0) && checkCell(1, 0) === checkCell(2, 0) && checkCell(0,0) !== ''
    || checkCell(0, 1) === checkCell(1, 1) && checkCell(1, 1) === checkCell(2, 1) && checkCell(0,1) !== ''
    || checkCell(0, 2) === checkCell(1, 2) && checkCell(1, 2) === checkCell(2, 2) && checkCell(0,2) !== ''
    || checkCell(0, 0) === checkCell(1, 1) && checkCell(1, 1) === checkCell(2, 2) && checkCell(0,0) !== ''
    || checkCell(0, 2) === checkCell(1, 1) && checkCell(1, 1) === checkCell(2, 0) && checkCell(0,2) !== '') {
      return true;
    } else {
      return false;
    }
  }

  const checkTie = () => {
    if ((checkCell(0, 0)
    && checkCell(0, 1)
    && checkCell(0, 2)
    && checkCell(1, 0)
    && checkCell(1, 1)
    && checkCell(1, 2)
    && checkCell(2, 0)
    && checkCell(2, 1)
    && checkCell(2, 2)) !== '') {
      return true
    }
  }

  const playRound = (row, column) => {
    if (board.playerMove(row, column, currentPlayer.token) === false) {
      console.log(`${currentPlayer.name}, try again`)
      showBoard();
    } else if (checkWin() === true) {
        console.log('Game over...');
        console.log(`${currentPlayer.name} wins!`)
        winningPlayer = `${currentPlayer.name}` + ' wins!';
    } else if (checkTie() === true) {
        console.log('Game over...');
        console.log('Tie game');
    } else {
        console.log('Switching players...')
        switchPlayer();
        showBoard();
    };
  }

  showBoard();

  return {
    playRound,
    getCurrentPlayer,
    getBoard: board.getBoard,
    getWinningPlayer
  }

};

function ScreenController() {
  const game = GameController();
  const playerDisplay = document.querySelector('.player-turn')
  const boardDiv = document.querySelector('.game-container');
  const winnerDisplay = document.querySelector('.winner-container')

  const updateScreen = () => {

    boardDiv.textContent = '';

    const board = game.getBoard();
    const activePlayer = game.getCurrentPlayer();

    winnerDisplay.textContent = `${game.getWinningPlayer()}`

    playerDisplay.textContent = `${game.getCurrentPlayer().name}` + ' make your move'

    board.forEach((row, rowIndex) => {
      row.forEach((cell, cellIndex) => {
        const cellButton = document.createElement('button');
        const cellValue = cell.getValue();
        cellButton.classList.add('button');
        cellButton.dataset.cellRow = `${rowIndex}`;
        cellButton.dataset.cellColumn = `${cellIndex}`;
        cellButton.dataset.cellValue = `${cellValue}`;
        cellButton.textContent = cell.getValue();
        boardDiv.appendChild(cellButton);
      })
    })
  }

  function clickHandlerBoard(e) {
    const clickedCellRow = e.target.dataset.cellRow;
    const clickedCellColumn = e.target.dataset.cellColumn;
    if (!clickedCellRow || !clickedCellColumn) return;
    game.playRound(clickedCellRow, clickedCellColumn);
    updateScreen();
  }

  boardDiv.addEventListener('click', clickHandlerBoard)

  updateScreen();

};

ScreenController();