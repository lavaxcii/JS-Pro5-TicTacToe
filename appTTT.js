const PlayerGen = (name) => {
  let score = 0;
  return {
    score,
    name
  };
};

const GridGen = (id) => {
  let playerSqr = false;
  let aiSqr = false;
  return {
    playerSqr,
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

  const removeMenu = () => {
    startGameBtn.addEventListener('click', () => {
      introMenu.style.left = '-50%';
      for (let i = 0; i < 3; i++) {
        const createDiv = document.createElement('div');
        createDiv.classList.add(`gameGrid${i}`);
        gameContainer.appendChild(createDiv);
      };
      const boardGrid = document.querySelector('.gameGrid1');
      for (let i = 1; i <= 9; i++) {
        const createDiv = document.createElement('div');
        createDiv.classList.add(`gridSqr${i}`);
        boardGrid.appendChild(createDiv);
        addSqrs(`${i}`);
      };
    });
  };

  let players = [];
  const addPlayer = (name) => {
    players.push(PlayerGen(name));
  };

  return {
    removeMenu,
    addPlayer,
    gameBoardSqrs,
    players
  };
})();
gameBoard.removeMenu();
gameBoard.addPlayer('Jack');
