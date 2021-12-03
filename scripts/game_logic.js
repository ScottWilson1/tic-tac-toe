'use strict';

let currentPlayer = 'X';
let board = ['','','','','','','','',''];
let winner = '';
let messageElement = document.querySelector('#message');
let gameType = 'pvp';
let totalSeconds = 0;
let gameTimer;
let gameStarted = false;

const updateStartButton = (state) => {
    document.querySelector('#start').textContent = state;
}

const updatePlayAgainButton = (state) => {
    const playAgainButton = document.querySelector('#play_again')
    switch(state) {
        case 'enabled':
            playAgainButton.removeAttribute('disabled');
            break;
        case 'disabled':
            playAgainButton.setAttribute('disabled', 'true');
            break;
    }
        
}

const clearBoard = () => {
    board = ['','','','','','','','',''];
    const boardSpaces = document.querySelectorAll('#board div');
    for(let space of boardSpaces) {
        space.textContent = ''; 
    }
}

const runTimer = () => {
    gameTimer = setInterval(function () {
        totalSeconds++;
        const currentSeconds = totalSeconds % 60;
        const minutes = Math.floor(totalSeconds/60);
        if(minutes > 0) {
            document.querySelector('#time').innerHTML = minutes.toString() + ':' + currentSeconds.toString();
        } else {
            document.querySelector('#time').innerHTML = currentSeconds.toString();
        }
    }, 1000);
}

const resetTimer = () => {
    clearInterval(gameTimer);
    totalSeconds = 0;
}

const resetGame = () => {
    clearBoard();
    document.querySelector('#board').style.borderColor = 'black';
    document.querySelector('#board').style.borderWidth = '3px';
    document.querySelector('#message').setAttribute('class', 'messageNormal');
    document.querySelector('#time').textContent = '0';
    winner = '';
    resetTimer();
}

const determineGameType = () => {
    if(document.querySelector('#pvc').checked) {
        gameType = 'pvc';
    } else {
        gameType = 'pvp';
    }
}

const updateMessage = () => {
    if(winner !== '') {
        let boardElement = document.querySelector('#board');
        boardElement.style.borderWidth = '5px';
        document.querySelector('#message').setAttribute('class', 'messageGameEnd');
        if(winner === 'X' || winner === 'O') {
            messageElement.textContent = `${winner} wins!`;
            if(winner === 'X') {
                boardElement.style.borderColor = 'orange';
            } else {
                boardElement.style.borderColor = 'dodgerblue';
            }
        } else {
            messageElement.textContent = 'Cat\'s game';
            boardElement.style.borderColor = 'limegreen';
        }
    } else {
        messageElement.textContent = `It is ${currentPlayer}'s turn`;    
    }
}

const selectFirstPlayer = () => {
    if(Math.floor(Math.random() * 2) === 1) {
        currentPlayer = 'X';
    } else {
        currentPlayer = 'O';
    }
    updateMessage();
}

const selectOpenSpace = () => {
    let index;
    do {
        index = Math.floor(Math.random() * 9);
    } while(board[index] !== '');
    return index;
}

const addPiece = index => {
    // update html board
    const spaceId = '#c_' + index.toString();
    const cell = document.querySelector(spaceId);
    if(currentPlayer === 'X') {
        cell.style.color = 'orange';
    } else {
        cell.style.color = 'dodgerblue';
    }
    cell.textContent = currentPlayer;
    //update board array
    board[index] = currentPlayer;
}

const togglePlayer = () => {
    if(currentPlayer === 'X') {
        currentPlayer = 'O';
    } else {
        currentPlayer = 'X';
    }
}

const checkForWin = () => {
    //check rows
    for(let i = 0; i < 7; i+=3) {
        if(board[i] !== '' && board[i] === board[i+1] && board[i] === board[i+2]) {
            winner = board[i];
            updatePlayAgainButton('enabled');
        }
    }
    //check columns
    for(let j = 0; j < 3; j++) {
        if(board[j] !== '' && board[j] === board[j+3] && board[j] === board[j+6]) {
            winner = board[j];
        }
    }
    //check diagonals
    if(board[0] !== '' && board[0] === board[4] && board[0] === board[8]) {
        winner = board[0];
    }
    if(board[2] !== '' && board[2] === board[4] && board[2] === board[6]) {
        winner = board[2];
    }
    //check for tie
    if(!board.includes('') && winner === '') {
        winner = 'tie';
    }
    if(winner !== '') {
        updatePlayAgainButton('enabled');
        updateStartButton('Start');
        resetTimer();
    }
}

const selectBoardSpace = evt => {
    const idString = evt.currentTarget.getAttribute('id');
    const cellArray = idString.split('_');
    const cellIndex = parseInt(cellArray[1]);
    if(gameStarted === false) {
        startGame();
    }
    if(board[cellIndex] === '' && winner === '') {
        addPiece(cellIndex);
        togglePlayer();
        if(winner === ''){
            checkForWin();
        }
        updateMessage();
        if(gameType === 'pvc' && board.includes('') && currentPlayer === 'O' && winner === '') {
            computerTurn();
        }
    }
}

const computerTurn = () => {
    const cellIndex = selectOpenSpace();
    addPiece(cellIndex);
    togglePlayer();
    checkForWin();
    updateMessage();
}

const startGame = () => {
    gameStarted = true;
    updateStartButton('Restart');
    updatePlayAgainButton('disabled');
    resetGame();
    determineGameType();
    selectFirstPlayer();
    runTimer();
    if(gameType === 'pvc' && currentPlayer === 'O') {
        computerTurn();
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const boardSpaces = document.querySelectorAll('#board div');
    for(let space of boardSpaces) {
        space.addEventListener('click', selectBoardSpace);
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const startButton = document.querySelector('#start');
    startButton.addEventListener('click', startGame);
});

document.addEventListener('DOMContentLoaded', () => {
    const playAgainButton = document.querySelector('#play_again');
    playAgainButton.addEventListener('click', startGame);
});