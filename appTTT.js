const PlayerGen = (name) => {
  let score = 0;
  return {
    score,
    name
  };
};

const GridGen = (id) => {
  let playerSqr = false;
  let player2Sqr = false;
  let aiSqr = false; 
  return {
    playerSqr,
    player2Sqr,
    aiSqr,
    id
  };
};

const gameBoard = (() => {
  const gameContainer = document.querySelector('.gameContainer');
  const introMenu = document.querySelector('.introMenu');
  const startGameBtn = document.querySelector('.startGameBtn');
  let gameBoardSqrs = [];
  const addSqrs = (id) => {
    gameBoardSqrs.push(GridGen(id))
  };

  const removeMenuStartGame = () => {
    startGameBtn.addEventListener('click', () => {
      const form = document.querySelector('form');
      introMenu.style.left = '-50%';
      for (let i = 0; i < 3; i++) {
        const createDiv = document.createElement('div');
        createDiv.classList.add(`gameGrid${i}`);
        gameContainer.appendChild(createDiv);
      };

      const player1Name = document.querySelector('#player1Name');
      const player2Name = document.querySelector('#player2Name');
      const boardGrid = document.querySelectorAll('div');
      boardGrid.forEach((divs) => {
        if (divs.classList.contains('gameGrid0') || divs.classList.contains('gameGrid2')) {
          for (let i = 1; i <= 2; i++) {
            const createP = document.createElement('p');
            createP.classList.add(`playerP${i}`);
            divs.appendChild(createP);
          }
          const addName = divs.querySelector(`.playerP1`);
          const addScore = divs.querySelector(`.playerP2`);
          if (divs.classList.contains('gameGrid0')) {
            addName.textContent = `${player1Name.value}`;
            addScore.textContent = 0;
          } else if (divs.classList.contains('gameGrid2')) {
            addName.textContent = `${player2Name.value}`;
            addScore.textContent = 0;
            console.log(true);
          };

          const createRestartBtn = document.createElement('button');
          createRestartBtn.classList.add('restartBtn');
          divs.appendChild(createRestartBtn);
          
        } else if (divs.classList.contains('gameGrid1')) {
          for (let i = 1; i <= 9; i++) {
            const createDiv = document.createElement('div');
            createDiv.classList.add(`sqr${i}`);
            divs.appendChild(createDiv);
            addSqrs(parseInt(`${i}`));
          };
        };
      });
      form.reset();
    });
  };

  let players = [];
  const addPlayer = (name) => {
    players.push(PlayerGen(name));
  };

  const gameLogic = () => {

  }

  return {
    removeMenuStartGame,
    addPlayer,
    gameBoardSqrs,
    players
  };
})();
gameBoard.removeMenuStartGame();
gameBoard.addPlayer('Jack');

