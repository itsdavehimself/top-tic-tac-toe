function gameBoard () {
  let rows = 3;
  let columns = 3;
  let board = [];

  for (let i = 0; i < rows; i++) {
    board[i] = [];
    for (let j = 0; j < columns; j++) {
      board[i].push(Cell());
    }};

  const grid = document.querySelector('.game-container');

  let dataValue = 0;
  board.forEach((row) => {
    row.forEach((element) => {
      dataValue++;
      const gameBtn = document.createElement('button');
      gameBtn.classList.add('button');
      gameBtn.setAttribute('id', [dataValue]);
      gameBtn.textContent = '';
      grid.appendChild(gameBtn);
    });
  });

  const getBoard = () => board;

  return {
    getBoard,
  }
};

function Cell() {
  let value = 0;

  const addPlayerValue = (player) => {
    value = player;
  };

  const getValue = () => value;

  return {
    addPlayerValue,
    getValue
  }
};

function gameFlow(
  playerOneName = "Player X",
  PlayerTwoName = "Player O"
) {
  const board = gameBoard();

  const players = [
    {
      name: playerOneName,
      token: 1
    },
    {
      name: PlayerTwoName,
      token: 2
    }
  ];

  let activePlayer = players[0];

  const switchPlayerTurn = () => {
    activePlayer = activePlayer === players[0] ? players[1] : players[0];
  };

  const getActivePlayer = () => activePlayer;

  const btnsArr = Array.from(document.querySelectorAll('.button'));

  for (let i = 0; i < btnsArr.length; i++) {
    btnsArr[i].addEventListener('click', () => {
      if (activePlayer === players[0]) {
        btnsArr[i].classList.add('X')
        btnsArr[i].textContent = 'X';
        btnsArr[i].disabled = true;
        switchPlayerTurn();
      } else {
        btnsArr[i].classList.add('O')
        btnsArr[i].textContent = 'O';
        btnsArr[i].disabled = true;
        switchPlayerTurn();
      }

    });
  };

}

const game = gameFlow();