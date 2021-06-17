function print(m) { console.log(m); }
/*  constantes  */
const STATUS_DISPLAY = document.querySelector('#jugador');
const GAME_STATE = ["", "", "", "", "", "", "", "", ""];
const WINNINGS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];
WIN_MESSAGE = () => `El jugador ${currentPayer} ha ganado!!`;
DRAW_MESSAGE = () => `Los jugadores han empatado!!`;
CURRENT_PLAYER_TURN = () => `Turno del jugador ${currentPayer}`;

/* Variables */
var gameActive = true,
    currentPayer = '✖️'; //⚫️

/* Funciones */
function main() {
    handleStatusDisplay(CURRENT_PLAYER_TURN());
    listeners();
}

function handleStatusDisplay(message) {
    STATUS_DISPLAY.innerHTML = message;

}

function listeners() {
    document.querySelector('#juego-contenedor').addEventListener("click", handelCellClick);
    document.querySelector('#juego-restablecido').addEventListener("click", handleRest);
}

function handelCellClick(clickedEvent) {
    const clickedCell = clickedEvent.target;
    if (clickedCell.classList.contains('game-cell')) {
        //console.log("clickedCell-> ",clickedCell);
        const clickedCellIndex = Array.from(clickedCell.parentNode.children).indexOf(clickedCell);
        //console.log(clickedCellIndex);
        //console.log("clickedCellIndex ",clickedCellIndex," GAME_STATE ",GAME_STATE[clickedCellIndex]," GameActive",gameActive);
        //console.log("CONDICIÓN-> GAME_STATE",GAME_STATE[clickedCellIndex]==''," GameActive ",!gameActive);

        if (GAME_STATE[clickedCellIndex] != '' || !gameActive) {
            return;
        }
        handleCellPlayer(clickedCell, clickedCellIndex);
        // * Validación del ganador
        handleResultValidation();
    }
}

function handleCellPlayer(clickedCell, clickedCellindex) {
    GAME_STATE[clickedCellindex] = currentPayer;
    clickedCell.innerHTML = currentPayer;
}

function handleResultValidation() {
    let roundWon = false;
    for (let i = 0; i < WINNINGS.length; i++) {
        const windCondition = WINNINGS[i];
        let position1 = GAME_STATE[windCondition[0]],
            position2 = GAME_STATE[windCondition[1]],
            position3 = GAME_STATE[windCondition[2]];
        //console.log("Index ", i, " P1->", position1, " P2->", position2, " P3->", position3);

        if (position1 === '' || position2 === '' || position3 === '') {
            continue;
        }
        if (position1 === position2 && position3 === position2) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        handleStatusDisplay(WIN_MESSAGE());
        gameActive = false;
        return;
    }

    let roundDraw = !GAME_STATE.includes('');
    if (roundDraw) {
        handleStatusDisplay(DRAW_MESSAGE())
        gameActive = false;
        return;
    }

    handlePlayerChange();

}

function handlePlayerChange() {
    currentPayer = (currentPayer === '✖️') ? '⚫️' : '✖️';
    handleStatusDisplay(CURRENT_PLAYER_TURN());
}

function handleRest() {
    gameActive = true;
    currentPayer = '✖️';
    restartGameState();
    handleStatusDisplay(CURRENT_PLAYER_TURN());
    document.querySelectorAll('.game-cell').forEach(cell=> cell.innerHTML='');
}

function restartGameState() {
    let i = GAME_STATE.length;
    while (i--) { //cuando llegen numeros negativos no se cumple la condicion!!
        GAME_STATE[i] = '';
    }
}

main();