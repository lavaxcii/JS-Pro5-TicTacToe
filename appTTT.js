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
  let sqrValue = 0;
  return {
    playerSqr,
    player2Sqr,
    aiSqr,
    sqrStatusLocked,
    sqrValue,
    id
  };
};

const gameBoard = (() => {
  const gameContainer = document.querySelector('.gameContainer');
  const introMenu = document.querySelector('.introMenu');
  const startGameBtn = document.querySelector('.startGameBtn');
  let aiSqrSelection = [0, 1, 2, 3, 4, 5, 6, 7, 8]
  let sqrCounter = 1;
  let player1winStatus = false;
  let clickedSameSqr = false;
  let roundStatusQuo = false;

  let gameBoardSqrs = [];
  const addSqrs = (id) => {
    gameBoardSqrs.push(GridGen(id))
  };

  let players = [];
  const addPlayer = (name) => {
    players.push(PlayerGen(name));
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
        introMenu.style.left = '32%';
        sqrCounter = 1;
      });
    })
  };

  const winConditions = () => {
    const winMessage = document.createElement('p');
    winMessage.classList.add('winMessage');
    const selectPlayersScore = document.querySelectorAll('.playerP2');
    const boardGrid = document.querySelectorAll('div');

    const resetGameBoard = () => {
      let n = 1;
      if (n === 10) {
        n = 1;
      };
      sqrCounter = 1;
      boardGrid.forEach((divs) => {
        if (divs.classList.contains(`sqr${n}`)) {
          deleteGameGrid(divs);
          gameBoardSqrs.splice(0);
          n++;
          console.log('DELETED BOARD AFTER ROUND!')
        };
      });
      boardGrid.forEach((divs) => {
        if (divs.classList.contains('gameGrid1')) {
          createGameGrid(divs);
          console.log('CREATED BOARD AFTER ROUND!')
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
          sqrCounter = 1;

          winMessage.textContent = `Winner is ${players[0].name}!`
          gameContainer.appendChild(winMessage);
          const selectWinMessage = document.querySelector('.winMessage');
          player1winStatus = true;

          setTimeout(() => {
            selectWinMessage.remove();
            resetGameBoard();
            player1winStatus = false;
          }, 1500)
          console.log('Player1 WON!')
          return;
        };
      });
    } else if ((gameBoardSqrs[0].player2Sqr && gameBoardSqrs[1].player2Sqr  &&gameBoardSqrs[2].player2Sqr === true) || (gameBoardSqrs[3].player2Sqr && gameBoardSqrs[4].player2Sqr  && gameBoardSqrs[5].player2Sqr === true) || (gameBoardSqrs[6].player2Sqr && gameBoardSqrs[7].player2Sqr  && gameBoardSqrs[8].player2Sqr === true) || (gameBoardSqrs[0].player2Sqr && gameBoardSqrs[4].player2Sqr  && gameBoardSqrs[8].player2Sqr === true) || (gameBoardSqrs[2].player2Sqr && gameBoardSqrs[4].player2Sqr  && gameBoardSqrs[6].player2Sqr === true) || (gameBoardSqrs[0].player2Sqr && gameBoardSqrs[3].player2Sqr  && gameBoardSqrs[6].player2Sqr === true) || (gameBoardSqrs[1].player2Sqr && gameBoardSqrs[4].player2Sqr  && gameBoardSqrs[7].player2Sqr === true) || (gameBoardSqrs[2].player2Sqr && gameBoardSqrs[5].player2Sqr  && gameBoardSqrs[8].player2Sqr === true)) {
      const selectGameBoardGrid = document.querySelector('.gameGrid1');
      selectGameBoardGrid.style.pointerEvents = 'none';
      selectPlayersScore.forEach((playerScore) => {
        if (playerScore.parentElement.classList.contains('gameGrid2')) {
          let newScore = players[1].score + 1;
          players[1].score = newScore;
          playerScore.textContent = players[1].score;
          sqrCounter = 1;

          winMessage.textContent = `Winner is ${players[1].name}!`
          gameContainer.appendChild(winMessage);
          const selectWinMessage = document.querySelector('.winMessage');

          setTimeout(() => {
            selectWinMessage.remove();
            resetGameBoard();
          }, 1500)
          return;
        };
      });
    } else if ((gameBoardSqrs[0].aiSqr && gameBoardSqrs[1].aiSqr  &&gameBoardSqrs[2].aiSqr === true) || (gameBoardSqrs[3].aiSqr && gameBoardSqrs[4].aiSqr  && gameBoardSqrs[5].aiSqr === true) || (gameBoardSqrs[6].aiSqr && gameBoardSqrs[7].aiSqr  && gameBoardSqrs[8].aiSqr === true) || (gameBoardSqrs[0].aiSqr && gameBoardSqrs[4].aiSqr  && gameBoardSqrs[8].aiSqr === true) || (gameBoardSqrs[2].aiSqr && gameBoardSqrs[4].aiSqr  && gameBoardSqrs[6].aiSqr === true) || (gameBoardSqrs[0].aiSqr && gameBoardSqrs[3].aiSqr  && gameBoardSqrs[6].aiSqr === true) || (gameBoardSqrs[1].aiSqr && gameBoardSqrs[4].aiSqr  && gameBoardSqrs[7].aiSqr === true) || (gameBoardSqrs[2].aiSqr && gameBoardSqrs[5].aiSqr  && gameBoardSqrs[8].aiSqr === true)) {
      const selectGameBoardGrid = document.querySelector('.gameGrid1');
      selectGameBoardGrid.style.pointerEvents = 'none';
      selectPlayersScore.forEach((playerScore) => {
        if (playerScore.parentElement.classList.contains('gameGrid2')) {
          let newScore = players[1].score + 1;
          players[1].score = newScore;
          playerScore.textContent = players[1].score;
          sqrCounter = 1;

          winMessage.textContent = `Winner is ${players[1].name}!`
          gameContainer.appendChild(winMessage);
          const selectWinMessage = document.querySelector('.winMessage');

          setTimeout(() => {
            selectWinMessage.remove();
            resetGameBoard();
          }, 1500)
          return;
        };
      });
    } else {
      console.log(sqrCounter);
      if (sqrCounter === 9) {
          winMessage.textContent = `Winner is you, the observer <3!`
          gameContainer.appendChild(winMessage);
          const selectWinMessage = document.querySelector('.winMessage');

          setTimeout(() => {
            selectWinMessage.remove();
            resetGameBoard();
          }, 1500)
        sqrCounter = 1;
        roundStatusQuo = true;
        return;
      }
      sqrCounter++
      return;
    };
  };

  const startGameMode = (userGameOptionChoice) => {

    const selectGameBoardGrid = document.querySelector('.gameGrid1');
    selectGameBoardGrid.style.pointerEvents = 'all';

    let player1status = false;
    let player2status = true;
    let player2AiRndStatus = false;
    let n = 1;


    if (n === 10) {
      n = 1;
    };

    const gameModePvp = (clicked) => {
      for (let n2 = 0; n2 < gameBoardSqrs.length; n2++) {
        if (gameBoardSqrs[`${n2}`].sqrStatusLocked === true && (clicked.target.classList[0] === gameBoardSqrs[`${n2}`].id || clicked.target.classList[0] === 'fas' || clicked.target.classList[0] === 'far')) {
          console.log('i clicked same again')
          clickedSameSqr = true;
        };
      };
      for (let n2 = 0; n2 < gameBoardSqrs.length; n2++) {
        if (player1status === false && gameBoardSqrs[`${n2}`].sqrStatusLocked === false && clicked.target.classList[0] === gameBoardSqrs[`${n2}`].id && clickedSameSqr === false) {
          gameBoardSqrs[`${n2}`].playerSqr = true;
          gameBoardSqrs[`${n2}`].sqrStatusLocked = true;
          player1status = true;
          player2status = false;
          const addXToSqr = document.createElement('i');
          const selectGameSqrs = document.querySelector(`.${clicked.target.classList[0]}`);
          addXToSqr.classList.add('fas');
          addXToSqr.classList.add('fa-times');
          selectGameSqrs.appendChild(addXToSqr);
          winConditions();
        } else if (player2status === false && gameBoardSqrs[`${n2}`].sqrStatusLocked === false && clicked.target.classList[0] === gameBoardSqrs[`${n2}`].id && clickedSameSqr === false) {
          gameBoardSqrs[`${n2}`].player2Sqr = true;
          gameBoardSqrs[`${n2}`].sqrStatusLocked = true;
          player2status = true;
          player1status = false;
          const addOToSqr = document.createElement('i');
          const selectGameSqrs = document.querySelector(`.${clicked.target.classList[0]}`);
          addOToSqr.classList.add('far');
          addOToSqr.classList.add('fa-circle');
          selectGameSqrs.appendChild(addOToSqr);
          winConditions();
        };
      };
      clickedSameSqr = false;
      roundStatusQuo = false;
    };

    const gameModePvairnd = (clicked) => {
      for (let n2 = 0; n2 < gameBoardSqrs.length; n2++) {
        if (gameBoardSqrs[`${n2}`].sqrStatusLocked === true && (clicked.target.classList[0] === gameBoardSqrs[`${n2}`].id || clicked.target.classList[0] === 'fas' || clicked.target.classList[0] === 'far')) {
          console.log('i clicked same again')
          clickedSameSqr = true;
        };
      };

      for (let n2 = 0; n2 < gameBoardSqrs.length; n2++) {
        if (player1status === false && gameBoardSqrs[`${n2}`].sqrStatusLocked === false && clicked.target.classList[0] === gameBoardSqrs[`${n2}`].id && clickedSameSqr === false) {
          gameBoardSqrs[`${n2}`].playerSqr = true;
          gameBoardSqrs[`${n2}`].sqrStatusLocked = true;
          player1status = true;
          player2AiRndStatus = false;
          const addXToSqr = document.createElement('i');
          const selectGameSqrs = document.querySelector(`.${clicked.target.classList[0]}`);
          addXToSqr.classList.add('fas');
          addXToSqr.classList.add('fa-times');
          selectGameSqrs.appendChild(addXToSqr);
          winConditions();
        };
      };

      console.log('STATUS QUO: ' + roundStatusQuo)

      let rndSqrAi = Math.floor(Math.random() * 9) + 0;
      if (gameBoardSqrs[`${rndSqrAi}`].sqrStatusLocked === true && player1winStatus === false && clickedSameSqr === false && roundStatusQuo === false) {

        do {
          console.log('SEARCHING FOR FREE SQUARE')
          rndSqrAi = Math.floor(Math.random() * 9) + 0
        } while (gameBoardSqrs[`${rndSqrAi}`].sqrStatusLocked === true)

        console.log(`FREE SQUARE IS: ${gameBoardSqrs[rndSqrAi].id}`)
        gameBoardSqrs[`${rndSqrAi}`].aiSqr = true;
        gameBoardSqrs[`${rndSqrAi}`].sqrStatusLocked = true;
        player2AiRndStatus = true;
        player1status = false;
        const addOToSqr = document.createElement('i');
        const selectGameSqrs = document.querySelector(`.${gameBoardSqrs[rndSqrAi].id}`);
        console.log(`AI SELECTED: ${gameBoardSqrs[rndSqrAi].id}`);
        addOToSqr.classList.add('far');
        addOToSqr.classList.add('fa-circle');
        selectGameSqrs.appendChild(addOToSqr);
        winConditions();
      } else if (gameBoardSqrs[`${rndSqrAi}`].sqrStatusLocked === false &&player1winStatus === false && clickedSameSqr === false && roundStatusQuo === false) {
        console.log(`FREE SQUARE IS: ${gameBoardSqrs[rndSqrAi].id}`)
        gameBoardSqrs[`${rndSqrAi}`].aiSqr = true;
        gameBoardSqrs[`${rndSqrAi}`].sqrStatusLocked = true;
        player2AiRndStatus = true;
        player1status = false;
        const addOToSqr = document.createElement('i');
        const selectGameSqrs = document.querySelector(`.${gameBoardSqrs[rndSqrAi].id}`);
        console.log(`AI SELECTED: ${gameBoardSqrs[rndSqrAi].id}`);
        addOToSqr.classList.add('far');
        addOToSqr.classList.add('fa-circle');
        selectGameSqrs.appendChild(addOToSqr);
        winConditions();
      }
      clickedSameSqr = false;
      roundStatusQuo = false;
      console.log(clickedSameSqr)
    };

    const valueUpSqrs = (sqrId, sqrLockStatus) => {
      let newSqrValue1 = 1;
      let newSqrValue2 = 2;
      if (sqrId === 'sqr1') {
        gameBoardSqrs[1].sqrValue = gameBoardSqrs[1].sqrValue + newSqrValue2;
        gameBoardSqrs[2].sqrValue = gameBoardSqrs[2].sqrValue + newSqrValue1;
        gameBoardSqrs[3].sqrValue = gameBoardSqrs[3].sqrValue + newSqrValue2;
        gameBoardSqrs[4].sqrValue = gameBoardSqrs[4].sqrValue + newSqrValue2;
        gameBoardSqrs[5].sqrValue = gameBoardSqrs[5].sqrValue + newSqrValue1;
        gameBoardSqrs[6].sqrValue = gameBoardSqrs[6].sqrValue + newSqrValue1;
        gameBoardSqrs[7].sqrValue = gameBoardSqrs[7].sqrValue + newSqrValue1;
        gameBoardSqrs[8].sqrValue = gameBoardSqrs[8].sqrValue + newSqrValue1;
      } else if (sqrId === 'sqr2') {
        gameBoardSqrs[0].sqrValue = gameBoardSqrs[0].sqrValue + newSqrValue2;
        gameBoardSqrs[2].sqrValue = gameBoardSqrs[2].sqrValue + newSqrValue2;
        // gameBoardSqrs[3].sqrValue = gameBoardSqrs[3].sqrValue + newSqrValue2;
        gameBoardSqrs[4].sqrValue = gameBoardSqrs[4].sqrValue + newSqrValue2;
        // gameBoardSqrs[5].sqrValue = gameBoardSqrs[5].sqrValue + newSqrValue2;
        // gameBoardSqrs[6].sqrValue = gameBoardSqrs[6].sqrValue + newSqrValue1;
        // gameBoardSqrs[7].sqrValue = gameBoardSqrs[7].sqrValue + newSqrValue1;
        // gameBoardSqrs[8].sqrValue = gameBoardSqrs[8].sqrValue + newSqrValue1;
      } else if (sqrId === 'sqr3') {
        gameBoardSqrs[0].sqrValue = gameBoardSqrs[0].sqrValue + newSqrValue1;
        gameBoardSqrs[1].sqrValue = gameBoardSqrs[1].sqrValue + newSqrValue2;
        gameBoardSqrs[3].sqrValue = gameBoardSqrs[3].sqrValue + newSqrValue1;
        gameBoardSqrs[4].sqrValue = gameBoardSqrs[4].sqrValue + newSqrValue2;
        gameBoardSqrs[5].sqrValue = gameBoardSqrs[5].sqrValue + newSqrValue2;
        gameBoardSqrs[6].sqrValue = gameBoardSqrs[6].sqrValue + newSqrValue1;
        gameBoardSqrs[7].sqrValue = gameBoardSqrs[7].sqrValue + newSqrValue1;
        gameBoardSqrs[8].sqrValue = gameBoardSqrs[8].sqrValue + newSqrValue1;
      } else if (sqrId === 'sqr4') {
        gameBoardSqrs[0].sqrValue = gameBoardSqrs[0].sqrValue + newSqrValue2;
        // gameBoardSqrs[1].sqrValue = gameBoardSqrs[1].sqrValue + newSqrValue2;
        // gameBoardSqrs[2].sqrValue = gameBoardSqrs[2].sqrValue + newSqrValue1;
        gameBoardSqrs[4].sqrValue = gameBoardSqrs[4].sqrValue + newSqrValue2;
        // gameBoardSqrs[5].sqrValue = gameBoardSqrs[5].sqrValue + newSqrValue1;
        gameBoardSqrs[6].sqrValue = gameBoardSqrs[6].sqrValue + newSqrValue2;
        // gameBoardSqrs[7].sqrValue = gameBoardSqrs[7].sqrValue + newSqrValue2;
        // gameBoardSqrs[8].sqrValue = gameBoardSqrs[8].sqrValue + newSqrValue1;
      } else if (sqrId === 'sqr5') {
        gameBoardSqrs[0].sqrValue = gameBoardSqrs[0].sqrValue + newSqrValue2;
        // gameBoardSqrs[1].sqrValue = gameBoardSqrs[1].sqrValue + newSqrValue1;
        gameBoardSqrs[2].sqrValue = gameBoardSqrs[2].sqrValue + newSqrValue2;
        // gameBoardSqrs[3].sqrValue = gameBoardSqrs[3].sqrValue + newSqrValue1;
        // gameBoardSqrs[5].sqrValue = gameBoardSqrs[5].sqrValue + newSqrValue1;
        gameBoardSqrs[6].sqrValue = gameBoardSqrs[6].sqrValue + newSqrValue2;
        // gameBoardSqrs[7].sqrValue = gameBoardSqrs[7].sqrValue + newSqrValue;
        gameBoardSqrs[8].sqrValue = gameBoardSqrs[8].sqrValue + newSqrValue2;
      } else if (sqrId === 'sqr6') {
        // gameBoardSqrs[0].sqrValue = gameBoardSqrs[0].sqrValue + newSqrValue1;
        // gameBoardSqrs[1].sqrValue = gameBoardSqrs[1].sqrValue + newSqrValue2;
        gameBoardSqrs[2].sqrValue = gameBoardSqrs[2].sqrValue + newSqrValue2;
        // gameBoardSqrs[3].sqrValue = gameBoardSqrs[3].sqrValue + newSqrValue1;
        gameBoardSqrs[4].sqrValue = gameBoardSqrs[4].sqrValue + newSqrValue2;
        // gameBoardSqrs[6].sqrValue = gameBoardSqrs[6].sqrValue + newSqrValue1;
        // gameBoardSqrs[7].sqrValue = gameBoardSqrs[7].sqrValue + newSqrValue2;
        gameBoardSqrs[8].sqrValue = gameBoardSqrs[8].sqrValue + newSqrValue2;
      } else if (sqrId === 'sqr7') {
        gameBoardSqrs[0].sqrValue = gameBoardSqrs[0].sqrValue + newSqrValue1;
        gameBoardSqrs[1].sqrValue = gameBoardSqrs[1].sqrValue + newSqrValue1;
        gameBoardSqrs[2].sqrValue = gameBoardSqrs[2].sqrValue + newSqrValue1;
        gameBoardSqrs[3].sqrValue = gameBoardSqrs[3].sqrValue + newSqrValue2;
        gameBoardSqrs[4].sqrValue = gameBoardSqrs[4].sqrValue + newSqrValue2;
        gameBoardSqrs[5].sqrValue = gameBoardSqrs[5].sqrValue + newSqrValue1;
        gameBoardSqrs[7].sqrValue = gameBoardSqrs[7].sqrValue + newSqrValue2;
        gameBoardSqrs[8].sqrValue = gameBoardSqrs[8].sqrValue + newSqrValue1;
      } else if (sqrId === 'sqr8') {
        // gameBoardSqrs[0].sqrValue = gameBoardSqrs[0].sqrValue + newSqrValue1;
        // gameBoardSqrs[1].sqrValue = gameBoardSqrs[1].sqrValue + newSqrValue1;
        // gameBoardSqrs[2].sqrValue = gameBoardSqrs[2].sqrValue + newSqrValue1;
        // gameBoardSqrs[3].sqrValue = gameBoardSqrs[3].sqrValue + newSqrValue2;
        gameBoardSqrs[4].sqrValue = gameBoardSqrs[4].sqrValue + newSqrValue2;
        // gameBoardSqrs[5].sqrValue = gameBoardSqrs[5].sqrValue + newSqrValue2;
        gameBoardSqrs[6].sqrValue = gameBoardSqrs[6].sqrValue + newSqrValue2;
        gameBoardSqrs[8].sqrValue = gameBoardSqrs[8].sqrValue + newSqrValue2;
      } else if (sqrId === 'sqr9') {
        gameBoardSqrs[0].sqrValue = gameBoardSqrs[0].sqrValue + newSqrValue1;
        gameBoardSqrs[1].sqrValue = gameBoardSqrs[1].sqrValue + newSqrValue1;
        gameBoardSqrs[2].sqrValue = gameBoardSqrs[2].sqrValue + newSqrValue1;
        gameBoardSqrs[3].sqrValue = gameBoardSqrs[3].sqrValue + newSqrValue1;
        gameBoardSqrs[4].sqrValue = gameBoardSqrs[4].sqrValue + newSqrValue2;
        gameBoardSqrs[5].sqrValue = gameBoardSqrs[5].sqrValue + newSqrValue2;
        gameBoardSqrs[6].sqrValue = gameBoardSqrs[6].sqrValue + newSqrValue1;
        gameBoardSqrs[7].sqrValue = gameBoardSqrs[7].sqrValue + newSqrValue2;
      }
    }

    const gameModePvaismart = (clicked) => {
      for (let n2 = 0; n2 < gameBoardSqrs.length; n2++) {
        if (gameBoardSqrs[`${n2}`].sqrStatusLocked === true && (clicked.target.classList[0] === gameBoardSqrs[`${n2}`].id || clicked.target.classList[0] === 'fas' || clicked.target.classList[0] === 'far')) {
          console.log('i clicked same again')
          clickedSameSqr = true;
        };
      };

      for (let n2 = 0; n2 < gameBoardSqrs.length; n2++) {
        if (player1status === false && gameBoardSqrs[`${n2}`].sqrStatusLocked === false && clicked.target.classList[0] === gameBoardSqrs[`${n2}`].id && clickedSameSqr === false) {
          gameBoardSqrs[`${n2}`].playerSqr = true;
          gameBoardSqrs[`${n2}`].sqrStatusLocked = true;
          player1status = true;
          player2AiRndStatus = false;
          const addXToSqr = document.createElement('i');
          const selectGameSqrs = document.querySelector(`.${clicked.target.classList[0]}`);
          addXToSqr.classList.add('fas');
          addXToSqr.classList.add('fa-times');
          selectGameSqrs.appendChild(addXToSqr);
          valueUpSqrs(gameBoardSqrs[`${n2}`].id, gameBoardSqrs[`${n2}`].sqrStatusLocked)
          winConditions();
        };
      };


      if (gameBoardSqrs[4].playerSqr === false && gameBoardSqrs[4].sqrStatusLocked === false && player1winStatus === false && clickedSameSqr === false && roundStatusQuo === false) {
        gameBoardSqrs[4].aiSqr = true;
        gameBoardSqrs[4].sqrStatusLocked = true;
        player2AiRndStatus = true;
        player1status = false;
        const addOToSqr = document.createElement('i');
        const selectGameSqrs = document.querySelector(`.${gameBoardSqrs[4].id}`);
        console.log(`AI SELECTED: ${gameBoardSqrs[4].id}`);
        addOToSqr.classList.add('far');
        addOToSqr.classList.add('fa-circle');
        selectGameSqrs.appendChild(addOToSqr);
        winConditions();
      } else if (player1winStatus === false && clickedSameSqr === false && roundStatusQuo === false) {
        let smartAiChoice = '';
        let smartAiValue = 0;
        console.log('AI START SQR VALUE: ' + smartAiValue)
        console.log('AI START CHOICE VALUE: ' + smartAiChoice)
        for (let nAi = 1; nAi < gameBoardSqrs.length; nAi++) {
          console.log('------------------------')
          let n1 = gameBoardSqrs[`${nAi - 1}`].sqrValue;
          let n2 = gameBoardSqrs[`${nAi}`].sqrValue;
          let n3 = 0;
          if (n1 >= n2 && gameBoardSqrs[`${nAi - 1}`].sqrStatusLocked === false || n1 >= smartAiValue && gameBoardSqrs[`${nAi - 1}`].sqrStatusLocked === false) {
            n3 = n1;
          };
          console.log('iterator nAi: ' + nAi)
          console.log('n1 is ' + gameBoardSqrs[`${nAi - 1}`].id + ' with VALUE ' + gameBoardSqrs[`${nAi - 1}`].sqrValue + ' VS n2 is ' + gameBoardSqrs[`${nAi}`].id + ' with VALUE ' + gameBoardSqrs[`${nAi}`].sqrValue)
          console.log('smartAiValue is: ' + smartAiValue)
          console.log('n3 is: ' + n3)
          console.log('gameboardsqr nAi - 1 lock status is: ' + gameBoardSqrs[`${nAi - 1}`].sqrStatusLocked)

          if (smartAiValue < n3 && gameBoardSqrs[`${nAi - 1}`].sqrStatusLocked === false || smartAiValue === n3 && gameBoardSqrs[`${nAi - 1}`].sqrStatusLocked === false) {
            console.log('%c change ai values', 'color: red')
            smartAiValue = n3;
            smartAiChoice = `${nAi - 1}`;
          } else if (smartAiValue < n3 && gameBoardSqrs[`${gameBoardSqrs.length - 1}`].sqrStatusLocked === false && gameBoardSqrs[`${gameBoardSqrs.length - 2}`].sqrStatusLocked === true && gameBoardSqrs[`${gameBoardSqrs.length - 4}`].sqrStatusLocked === true) {
            console.log('%c change ai values', 'color: blue')
            smartAiValue = n3;
            smartAiChoice = `${gameBoardSqrs.length - 1}`;
          };
          console.log('AI SQR VALUE: ' + smartAiValue)
          console.log('AI CHOICE VALUE: ' + smartAiChoice)
          console.log('------------------------')
        }
        console.dir(gameBoardSqrs)
        gameBoardSqrs[`${smartAiChoice}`].aiSqr = true;
        gameBoardSqrs[`${smartAiChoice}`].sqrStatusLocked = true;
        player2AiRndStatus = true;
        player1status = false;
        const addOToSqr = document.createElement('i');
        const selectGameSqrs = document.querySelector(`.${gameBoardSqrs[smartAiChoice].id}`);
        console.log(`AI SELECTED: ${gameBoardSqrs[smartAiChoice].id}`);
        addOToSqr.classList.add('far');
        addOToSqr.classList.add('fa-circle');
        selectGameSqrs.appendChild(addOToSqr);
        winConditions();
      }
      clickedSameSqr = false;
      roundStatusQuo = false;

    };


    const selectGameSqrs = document.querySelectorAll('div');

    selectGameSqrs.forEach((sqrs) => {
      if (sqrs.classList.contains(`sqr${n}`)) {
        sqrs.addEventListener('click', (clicked) => {
          console.log(clicked.target.classList[0]);
          if (userGameOptionChoice === 'gameModePvp') {
            gameModePvp(clicked);
          } else if (userGameOptionChoice === 'gameModePvairnd') {
            gameModePvairnd(clicked);
          } else if (userGameOptionChoice === 'gameModePvaismart') {
            gameModePvaismart(clicked);
          };
        });
        n++;
      };
    });
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

  return {
    initializeGame,
    gameBoardSqrs,
    players
  };
})();
gameBoard.initializeGame();

