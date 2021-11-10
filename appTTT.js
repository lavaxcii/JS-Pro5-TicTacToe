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

  const initializeGame = () => {
    startGameBtn.addEventListener('click', () => {
      const userGameOptionChoice = document.querySelector('input[name="go"]:checked').value;
      let remeberGameMode2 = '';
      removeMenu();
      addPlayerAndGameGrid(userGameOptionChoice);
      enableRestartGame();
    });
  };

  const removeMenu = () => {
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
    form.reset();
  };

  const deleteGameGrid = (divs) => {
    divs.remove();
  };

  const createGameGrid = (divs, userGameOptionChoice) => {
    for (let i = 1; i <= 9; i++) {
      const createDiv = document.createElement('div');
      createDiv.classList.add(`sqr${i}`);
      divs.appendChild(createDiv);
      console.log('Push to array!')
      addSqrs(`sqr${i}`);
      console.log(gameBoardSqrs);
    };

    if (userGameOptionChoice === undefined && remeberGameMode2 !== undefined) {
      startGameMode(`${remeberGameMode2}`);
      console.log('Same mode: ' + remeberGameMode2)
    } else {
      remeberGameMode2 = userGameOptionChoice;
      startGameMode(`${remeberGameMode2}`)
      console.log('I changed mode ' + remeberGameMode2)
    };
  }

  const addPlayerAndGameGrid = (userGameOptionChoice) => {
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
        createGameGrid(divs, userGameOptionChoice);
      };
    });
  };

  const enableRestartGame = () => {
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
        introMenu.style.left = '35%';
      });
    })
  };

  const winConditions = (clicked) => {
    const winMessage = document.createElement('p');
    winMessage.classList.add('winMessage');
    winMessage.textContent = 'Winner is player!'
    // gameContainer.appendChild(winMessage);
    const selectPlayersScore = document.querySelectorAll('.playerP2');
    const boardGrid = document.querySelectorAll('div');

    const resetGameBoard = () => {
      let n = 1;
      if (n === 10) {
        n = 1;
      };
      boardGrid.forEach((divs) => {
        if (divs.classList.contains(`sqr${n}`)) {
          deleteGameGrid(divs);
          gameBoardSqrs.splice(0);
          n++;
        };
      });
      boardGrid.forEach((divs) => {
        if (divs.classList.contains('gameGrid1')) {
          createGameGrid(divs);
        };
      });
    };

    if ((gameBoardSqrs[0].playerSqr && gameBoardSqrs[1].playerSqr  &&gameBoardSqrs[2].playerSqr === true) || (gameBoardSqrs[3].playerSqr && gameBoardSqrs[4].playerSqr  && gameBoardSqrs[5].playerSqr === true) || (gameBoardSqrs[6].playerSqr && gameBoardSqrs[7].playerSqr  && gameBoardSqrs[8].playerSqr === true) || (gameBoardSqrs[0].playerSqr && gameBoardSqrs[4].playerSqr  && gameBoardSqrs[8].playerSqr === true) || (gameBoardSqrs[2].playerSqr && gameBoardSqrs[4].playerSqr  && gameBoardSqrs[6].playerSqr === true) || (gameBoardSqrs[0].playerSqr && gameBoardSqrs[3].playerSqr  && gameBoardSqrs[6].playerSqr === true) || (gameBoardSqrs[1].playerSqr && gameBoardSqrs[4].playerSqr  && gameBoardSqrs[7].playerSqr === true) || (gameBoardSqrs[2].playerSqr && gameBoardSqrs[5].playerSqr  && gameBoardSqrs[8].playerSqr === true)) {
      const selectGameBoardGrid = document.querySelector('.gameGrid1');
      selectGameBoardGrid.style.pointerEvents = 'none';
      selectPlayersScore.forEach((playerScore) => {
        if (playerScore.parentElement.classList.contains('gameGrid0')) {
          let newScore = players[0].score + 1;
          players[0].score = newScore;
          playerScore.textContent = players[0].score;
          resetGameBoard();
          return;
        }
      })
    } else if ((gameBoardSqrs[0].player2Sqr && gameBoardSqrs[1].player2Sqr  &&gameBoardSqrs[2].player2Sqr === true) || (gameBoardSqrs[3].player2Sqr && gameBoardSqrs[4].player2Sqr  && gameBoardSqrs[5].player2Sqr === true) || (gameBoardSqrs[6].player2Sqr && gameBoardSqrs[7].player2Sqr  && gameBoardSqrs[8].player2Sqr === true) || (gameBoardSqrs[0].player2Sqr && gameBoardSqrs[4].player2Sqr  && gameBoardSqrs[8].player2Sqr === true) || (gameBoardSqrs[2].player2Sqr && gameBoardSqrs[4].player2Sqr  && gameBoardSqrs[6].player2Sqr === true) || (gameBoardSqrs[0].player2Sqr && gameBoardSqrs[3].player2Sqr  && gameBoardSqrs[6].player2Sqr === true) || (gameBoardSqrs[1].player2Sqr && gameBoardSqrs[4].player2Sqr  && gameBoardSqrs[7].player2Sqr === true) || (gameBoardSqrs[2].player2Sqr && gameBoardSqrs[5].player2Sqr  && gameBoardSqrs[8].player2Sqr === true)) {
      const selectGameBoardGrid = document.querySelector('.gameGrid1');
      selectGameBoardGrid.style.pointerEvents = 'none';
      selectPlayersScore.forEach((playerScore) => {
        if (playerScore.parentElement.classList.contains('gameGrid2')) {
          let newScore = players[1].score + 1;
          players[1].score = newScore;
          playerScore.textContent = players[1].score;
          resetGameBoard();
          return;
        }
      })
    } else {
      console.log('Nobody wins!? (sadFace)')
    }

  }

  const startGameMode = (userGameOptionChoice) => {

    const selectGameBoardGrid = document.querySelector('.gameGrid1');
    selectGameBoardGrid.style.pointerEvents = 'all';

    let player1status = false;
    let player2status = true;
    let n = 1;

    if (n === 10) {
      n = 1;
    };

    const gameModePvp = (clicked) => {
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
          winConditions(clicked);
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
          winConditions(clicked);
        };
      };
    };

    const selectGameSqrs = document.querySelectorAll('div');

    selectGameSqrs.forEach((sqrs) => {
      if (sqrs.classList.contains(`sqr${n}`)) {
        sqrs.addEventListener('click', (clicked) => {
          console.log(clicked.target.classList[0]);
          if (userGameOptionChoice === 'gameModePvp') {
            gameModePvp(clicked);
          } else if (userGameOptionChoice === 'gameModePvairnd') {
            console.log('Hey random boy!');
          } else if (userGameOptionChoice === 'gameModePvaismart') {
            console.log('Hey smart boy!');
          };
        });
        n++;
      };

    });

  };

  return {
    initializeGame,
    gameBoardSqrs,
    players
  };
})();
gameBoard.initializeGame();

