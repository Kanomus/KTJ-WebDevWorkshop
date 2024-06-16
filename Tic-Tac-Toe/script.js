let currentPlayer = "X";
let currsize = 3;
let gridCells = [];
let player1Score = parseInt(localStorage.getItem('player1Score')) || 0;
let player2Score = parseInt(localStorage.getItem('player2Score')) || 0;
// let player1name = localStorage.getItem('player1name')||"Player 1";
// let player2name = localStorage.getItem('player2name')||"Player 2";

document.addEventListener('DOMContentLoaded', ()=>{
    createGrid(3);
    fetchscores();
});

function createGrid(size)
{
    const container = document.getElementById("grid");
    container.innerHTML='';
    gridCells=[];

    const baseSize = 50;
    const gridSize = baseSize + (size - 3) * 4;
    container.style.width = `${gridSize}vh`;
    container.style.height = `${gridSize}vh`;

    container.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    container.style.gridTemplateRows = `repeat(${size}, 1fr)`;

    for (let i = 0; i < size * size; i++) {
        const cell = document.createElement('div');
        cell.classList.add('grid-cell');
        cell.addEventListener('click', () => handleCellClick(cell));
        container.appendChild(cell);
        gridCells.push(cell);
    }
    currentPlayer = 'X';
    updateTurnIndicator();
    currsize = size;
    updateCursor();
}
function createSameGrid()
{
    createGrid(currsize);
}

function showResetModal() {
    const modal = document.getElementById('reset-modal');
    modal.style.display = 'block';
}

function hideResetModal() {
    const modal = document.getElementById('reset-modal');
    modal.style.display = 'none';
}

function confirmReset() {
    hideResetModal();
    createSameGrid();
}

function handleCellClick(cell)
{

    if (!cell.textContent) {
        cell.textContent = currentPlayer;
        if(checkWin(currentPlayer)){
            displayResult(`Player ${currentPlayer==='X'?'1':'2'} won!`, ()=>createSameGrid());
            updateScore(currentPlayer);
        }
        else if(checkTie())
            displayResult("It's a tie!", ()=>createSameGrid());
        else{
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            updateTurnIndicator();
            updateCursor();
        }
    }
}
function updateTurnIndicator()
{
    const turn_indicator = document.getElementById('turn-indicator');
    turn_indicator.textContent = `Current Turn: ${currentPlayer}`;
}
function updateCursor()
{
    document.getElementById("grid").style.cursor = currentPlayer === 'X' 
    ? 'url("data:image/svg+xml,<svg xmlns=\'http://www.w3.org/2000/svg\' width=\'16\' height=\'16\' viewBox=\'0 0 32 32\'><text x=\'0\' y=\'32\' font-size=\'32\' fill=\'black\' font-family=\'sans-serif\'>X</text></svg>") 16 16, auto' 
    : 'url("data:image/svg+xml,<svg xmlns=\'http://www.w3.org/2000/svg\' width=\'16\' height=\'16\' viewBox=\'0 0 32 32\'><text x=\'0\' y=\'32\' font-size=\'32\' fill=\'black\' font-family=\'sans-serif\'>O</text></svg>") 16 16, auto';
}
function checkWin(player)
{
    for(let row=0; row<currsize; row++){
        let count = 0;
        for(let col=0; col<currsize; col++){
            const index = (row*currsize)+col;
            if(gridCells[index].textContent === player) count++;
            else break;
        }
        if(count === currsize) return true;
    }
    for(let col=0; col<currsize; col++){
        let count = 0;
        for(let row=0; row<currsize; row++){
            const index = (row*currsize)+col;
            if(gridCells[index].textContent === player) count++;
            else break;
        }
        if(count === currsize) return true;
    }
    let diagcount1 = 0;
    for(let row=0; row<currsize; row++){
        const index = (row*currsize) + row;
        if(gridCells[index].textContent === player) diagcount1++;
        else break;
        if(diagcount1 === currsize) return true;
    }
    let diagcount2 = 0;
    for(let row=0; row<currsize; row++){
        const index = (row * currsize) + (currsize - 1 - row);
        if(gridCells[index].textContent === player) diagcount2++;
        else break;
        if(diagcount2 === currsize) return true;
    }
    return false
}
function checkTie()
{
    return gridCells.every(cell => {
        return cell.textContent==='X' || cell.textContent==='O';
    })
}
function displayResult(message, callback) {
    const resultElement = document.getElementById('result');
    resultElement.textContent = message;
    resultElement.style.display = 'block';

    setTimeout(() => {
        resultElement.style.display = 'none';
        callback();
    }, 5000); // Display for 5 seconds (5000 milliseconds)
}
function updateScore(player) {
    if (player === 'X') {
        player1Score++;
        localStorage.setItem('player1Score', player1Score);
    } else if (player === 'O') {
        player2Score++;
        localStorage.setItem('player2Score', player2Score);
    }
    fetchscores();
}
// function changename(player)
// {
//     if(player === 'X'){
        
//     }
// }
function resetScores() {
    localStorage.removeItem('player1Score');
    localStorage.removeItem('player2Score');
    player1Score = 0;
    player2Score = 0;
    fetchscores();
}
function fetchscores()
{    
    document.getElementById('player1-score-value').textContent = player1Score;
    document.getElementById('player2-score-value').textContent = player2Score;
}
// function fetchnames()
// {
//     document.getElementById('player1name').textContent = player1name;
//     document.getElementById('player2name').textContent = player2name;
// }