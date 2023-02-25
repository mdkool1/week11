const X_CLASS = 'x';
const CIRCLE_CLASS = 'circle';
const WINNING_COMBINATIONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]
const cellElements = document.querySelectorAll('[data-cell]');
const board = document.getElementById('board');

const winningMessageElement = document.getElementById('winningMessage');
const restart = document.querySelector('#restart');
const restartButton = document.getElementById('restartButton');
const winningMessageTextElement = document.querySelector('[data-winning-message-text]');
const turn = document.querySelector('.turn');
let circleTurn;

startGame();

restart.addEventListener('click', startGame);  
restartButton.addEventListener('click', startGame); 

function startGame() {
    circleTurn = false;
    cellElements.forEach(cell => {
        cell.classList.remove(X_CLASS);
        cell.classList.remove(CIRCLE_CLASS);
        console.log('Clearing board of both', `${X_CLASS} and ${CIRCLE_CLASS} marks.`);
        cell.removeEventListener('click', handleClick);
        cell.addEventListener('click', handleClick, { once: true })
    });
    setBoardHoverClass();
    winningMessageElement.classList.remove('show');
}

function handleClick(e) {
    const cell = e.target;
    const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS;
    placeMark(cell, currentClass);
    if (checkWin(currentClass)) {
        endGame(false);
    } else if (isDraw()) {
        endGame(true);
    } else {
        swapTurns();
        setBoardHoverClass();
    }
}

function endGame(draw) {
    if (draw) {
        winningMessageTextElement.innerText = 'Draw!';
        console.log(`Game ended in a ${winningMessageElement.innerText}!`)
    } else {
        winningMessageTextElement.innerText = `${circleTurn ? "O's" : "X's"} Win!`;
    }
    console.log(`${winningMessageElement.innerText} won!`);
    winningMessageElement.classList.add('show');
}

function isDraw() {
    return [...cellElements].every(cell => {
        return cell.classList.contains(X_CLASS) || cell.classList.contains(CIRCLE_CLASS);
    });
}

function placeMark(cell, currentClass) {
    cell.classList.add(currentClass);
    console.log(`Placing ${currentClass} into this cell:`, cell);
}

function swapTurns() {
    circleTurn = !circleTurn;
    console.log(`CIRCLE'S turn = ${circleTurn}`)
}

function setBoardHoverClass() {
    board.classList.remove(X_CLASS);
    board.classList.remove(CIRCLE_CLASS);
    if (circleTurn) {
        board.classList.add(CIRCLE_CLASS);
        turn.textContent = "It is O's turn";
    } else {
        board.classList.add(X_CLASS);
        turn.textContent = "It is X's turn";
    }
}

function checkWin(currentClass) {
    return WINNING_COMBINATIONS.some(combination => {
        return combination.every(index => {
            return cellElements[index].classList.contains(currentClass);
        });
    });
}