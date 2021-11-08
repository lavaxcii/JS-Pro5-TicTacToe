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
  let sqrStatusLocked = false;
  return {
    playerSqr,
    player2Sqr,
    aiSqr,
    sqrStatusLocked,
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

  let players = [];
  const addPlayer = (name) => {
    players.push(PlayerGen(name));
  };

  const removeMenuStartGame = () => {

    startGameBtn.addEventListener('click', () => {
      const player1Name = document.querySelector('#player1Name');
      const player2Name = document.querySelector('#player2Name');
        if (player1Name.value === '' || player1Name.value === ' ' || player2Name.value === '' || player2Name.value === ' ') {
          return;
        };

      const form = document.querySelector('form');
      introMenu.style.left = '-50%';
      for (let i = 0; i < 3; i++) {
        const createDiv = document.createElement('div');
        createDiv.classList.add(`gameGrid${i}`);
        gameContainer.appendChild(createDiv);
      };

      
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
            addPlayer(`${player1Name.value}`);
          } else if (divs.classList.contains('gameGrid2')) {
            addName.textContent = `${player2Name.value}`;
            addScore.textContent = 0;
            addPlayer(`${player2Name.value}`);
          };

          const createRestartBtn = document.createElement('button');
          createRestartBtn.classList.add('restartBtn');
          createRestartBtn.textContent = 'RESTART';
          divs.appendChild(createRestartBtn);
          
        } else if (divs.classList.contains('gameGrid1')) {
          for (let i = 1; i <= 9; i++) {
            const createDiv = document.createElement('div');
            createDiv.classList.add(`sqr${i}`);
            divs.appendChild(createDiv);
            addSqrs(`sqr${i}`);
          };
        };
      });
      form.reset();
      gameFlow();
      restartGame();
    });
  };

  const restartGame = () => {
    const restartBtn = document.querySelectorAll('.restartBtn');
    restartBtn.forEach((btns) => {
      btns.addEventListener('click', () => {
        const selectGameGrids = document.querySelectorAll('div');
        selectGameGrids.forEach((divs) => {
          if (divs.classList.contains('gameGrid0') || divs.classList.contains('gameGrid1') || divs.classList.contains('gameGrid2')) {
            divs.remove();
          };
        });
        players.splice(0);
        gameBoardSqrs.splice(0);
        introMenu.style.left = '39%';
      });
    })
  };

  const gameFlow = () => {
    let player1status = false;
    let player2status = true;
    const selectGameSqrs = document.querySelectorAll('div');
    let n = 1;
    selectGameSqrs.forEach((sqrs) => {
      if (sqrs.classList.contains(`sqr${n}`)) {  
        sqrs.addEventListener('click', (clicked) => {
          console.log(clicked.target.classList[0]);
          for (let n2 = 0; n2 < gameBoardSqrs.length; n2++) {
            if (player1status === false && gameBoardSqrs[`${n2}`].sqrStatusLocked === false && clicked.target.classList[0] === gameBoardSqrs[`${n2}`].id) {
              gameBoardSqrs[`${n2}`].playerSqr = true;
              gameBoardSqrs[`${n2}`].sqrStatusLocked = true;
              player1status = true;
              player2status = false;
              const addXToSqr = document.createElement('i');
              const selectGameSqrs = document.querySelector(`.${clicked.target.classList[0]}`);
              addXToSqr.classList.add('fas');
              addXToSqr.classList.add('fa-times');
              selectGameSqrs.appendChild(addXToSqr);
              console.dir(gameBoardSqrs);
            } else if (player2status === false && gameBoardSqrs[`${n2}`].sqrStatusLocked === false && clicked.target.classList[0] === gameBoardSqrs[`${n2}`].id) {
              gameBoardSqrs[`${n2}`].player2Sqr = true;
              gameBoardSqrs[`${n2}`].sqrStatusLocked = true;
              player2status = true;
              player1status = false;
              const addOToSqr = document.createElement('i');
              const selectGameSqrs = document.querySelector(`.${clicked.target.classList[0]}`);
              addOToSqr.classList.add('far');
              addOToSqr.classList.add('fa-circle');
              selectGameSqrs.appendChild(addOToSqr);
              console.dir(gameBoardSqrs);
            }
          }
        })
        n++;
      }
    })
  }

  const winConditions = () => {

  }

  return {
    removeMenuStartGame,
    gameBoardSqrs,
    players
  };
})();
gameBoard.removeMenuStartGame();

