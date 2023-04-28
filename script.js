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
    if (board[row][column].getValue() !== 0) {
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

  return { getBoard, printBoard, playerMove };

};


function Box() {
  let value = 0;

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
      token: 1
      
    },
    {
      name: 'Player O',
      token: 2
    }
  ]

  const board = Gameboard();

  let currentPlayer = players[0];

  const switchPlayer = () => {
    currentPlayer = currentPlayer === players[0] ? players[1] : players[0]; 
  }

  const showBoard = () => {
    board.printBoard();
    console.log(`${currentPlayer.name}'s turn`);
  } 

  const playRound = (row, column) => {
    if (board.playerMove(row, column, currentPlayer.token) === false) {
      console.log(`${currentPlayer.name}, try again`)
      showBoard();
    } else {
      console.log('Switching players...')
      switchPlayer();
      showBoard();
    };
  }

  showBoard();

  return { playRound }

};

const game = GameController();