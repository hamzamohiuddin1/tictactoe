const gameBoard = (() => {
    //render - render contents param: self
    //makeMove - make move based on player term param: (self, coord: tuple, playerTurn: char)
    //checkWinner - return winner if there is one, null if not (X, O, null) param: self
    //getGameboard - returns gameBoard
    
    //initialize private board
    let board = [...Array(6)].map(e=>Array(6));
    let initialRender = false;
    let turn = 'X';
    const grid = document.querySelector('.grid');

    const getGameboard = () => {
        return board;
    };

    const render = () => {
        for (let i=0;i<3;i++) {
            for (let j=0; j<3;j++) {
                let cell;
                cell = document.createElement(`div`);
                if (initialRender === false) {
                    cell = document.createElement(`div`);
                    cell.classList.add('cell')
                }
                else {
                    cell = document.querySelector(`.cell:nth-child(${3*i+j+1})`);
                }
                cell.textContent = board[i][j];
                if(!initialRender){
                    grid.appendChild(cell);
                }
            }
        }
        if (!initialRender) {
            displayController.renderTurn('X');
        }
        initialRender = true;
        console.log('Successfully rendered');
    }

    const checkWinner = () => {
        //check rows
        if (board[0].every(board[0][0])) {
            return board[0][0];
        }
        else if (board[1].every(board[1][0])) {
            return board[1][0];
        }
        else if (board[2].every(board[2][0])) {
            return board[2][0];
        }
        //check columns
        else if (board[0][0] === board[1][0] && board[1][0] === board[2][0]) {
            return board[0][0];
        }   
        else if (board[0][1] === board[1][1] && board[1][1] === board[2][1]) {
            return board[0][1];
        }
        else if (board[0][2] === board[1][2] && board[1][2] === board[2][2]) {
            return board[0][2];
        }
        // Check diagonals
        else if (board[0][0] === board[1][1] && board[1][1] === board[2][2]) {
            return board[0][0];
        }
        else if (board[0][2] === board[1][1] && board[1][1] === board[2][0]) {
            return board[0][2];
        }
        else {
            return null;
        }
    };

    const makeMove = (coord, playerTurn) => {
        console.log("MakeMove being called");
        board[coord[0]][coord[1]] = playerTurn;
        let cell = document.querySelector(`.cell:nth-child(${3*coord[0]+coord[1]+1})`);
        if (playerTurn === 'X'){
            turn = 'O';
        }
        else {
            turn = 'X';
        }
        render();
        displayController.renderTurn(turn);
    };

    return {getGameboard, render, checkWinner, makeMove};

})();

const displayController = (() => {
    const turnText = document.querySelector('.turn');
    //renderTurn: Remove all and add event listeners for each cell that can be filled, display whos turn it is param: (self, turn)
    function listener(i, j, turn) {
        gameBoard.makeMove([i, j], turn);
    }

    renderTurn = (turn) => {
        turnText.textContent = `Turn: ${turn}`;
        for(let i=0;i<3;i++) {
            for(let j=0;j<3; j++) {
                let cell = document.querySelector(`.cell:nth-child(${3*i+j+1})`);
                cell.replaceWith(cell.cloneNode(true));
                console.log(cell.textContent);
                if (cell.textContent === '') {
                    console.log("Adding event listener");
                    cell.addEventListener('click', listener(i, j, turn));
                }
            }
        }
    };

    return {renderTurn};

})();

gameBoard.render();

