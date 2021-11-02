"use strict";

const board = [
    ["I","I","I"],
    ["I","I","I"],
    ["I","I","I"]
]

const clearBoard = () => {
    let board = [];
    for(i = 0; i < 3; i++){
        let row = [];
        for(j = 0; j < 3; j++){
            row.push("");
        }
        board.push(row);
    }
    return board;
}

const printBoard = (newBoard) => {
    let boardString = newBoard.toString();
    let message2 = document.querySelector("#message2");
    message2.textContent = boardString;
}

const currentPlayer = "X";

const togglePlayer = () => {
    if(currentPlayer === "X") {
        currentPlayer = "O";
    } else {
        currentPlayer = "X";
    }
}

const updateMessage = () => {
    let message = document.querySelector("#message");
    message.textContent = `Player ${currentPlayer}'s turn`;
}

const updateBoardArray = () => {
    const gridElements = document.querySelectorAll("#board a");
    const e = [];
    for(let element of gridElements) {
        let text = element.firstChild.textContent;
        e.push(text);
    }
    let k = 0;
    for(let i = 0; i < 3; i++) {
        let row = [];
        for(let j = 0; j < 3; j++) {
            let text = gridElements[k].firstChild.textContent;
            row.push(text);
            k++;
        }
        newBoard.push(row);
    }
    // newBoard = [
    //     [e[0], e[1], e[2]],
    //     [e[3], e[4], e[5]],
    //     [e[6], e[7], e[8]]
    // ];
    
    this.board = newBoard;
    printBoard(newBoard);
}

const addMark = evt => {
    const boardSpace = evt.currentTarget.firstChild;
    boardSpace.textContent = currentPlayer;
}

const selectBoardSpace = evt => {
    addMark(evt);
    updateBoardArray();
    //togglePlayer();
    updateMessage();
}

document.addEventListener("DOMContentLoaded", () => {
    const boardSpaces = document.querySelectorAll("#board a");

    console.log(boardSpaces);

    for(let space of boardSpaces) {
        space.addEventListener("click", selectBoardSpace);
    }
});

