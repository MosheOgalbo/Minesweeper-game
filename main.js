'use strict';

var gBoard = []

var gLevel = {
    SIZE: 4,
    MINES: 2,
}

var gTimerInterval
var gFirstMove = false
const EMPTY = ''
const MINES_IMG = '💣'
const FLAG = ' 🚩'

function onInit() {
    gGame.markedCount = 0
    gGame.shownCount = 0
    changesLifeGame(3)
    userMode('start')
    gGame.isOn = false
    if (gTimerInterval) clearInterval(gTimerInterval)
    document.querySelector('span.timer-seconds').innerText = ''
    document.querySelector('span.timer-milli-seconds').innerText = ''
    // playSound()
    // gFirstMove = false
    gBoard = buildBoard()
    // createMinesInBoard(gBoard)
    //  console.log(gBoard)
    //setMinesNegsCount(gBoard)
    renderBoard(gBoard)

}

function levelsOfPlay(el) {
    gGame.shownCount = 0
    renderShownCount()
    const level = el.dataset.leve
    const mines = el.dataset.mines
    // console.log(level, mines)
    gLevel.SIZE = level
    gLevel.MINES = mines
    //gGame.shownCount = mines
    // console.log(gLevel)

    onInit()
}

function buildBoard() {
    const board = []
    const sizeBoard = gLevel.SIZE

    for (var i = 0; i < sizeBoard; i++) {
        board.push([])
        for (var j = 0; j < sizeBoard; j++) {
            board[i][j] = {
                minesAroundCount: 0,
                isShown: false,
                isMine: false,
                isMarked: false,
            }
            // if (i === 1 && j === 1) board[i][j].isMine = true
            // if (i === 1 && j === 2) board[i][j].isMine = true
        }
    }
    return board
}

function createMinesInBoard(board, indexI, indexJ) {
    var constMines = gLevel.MINES
    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[0].length; j++) {
            if (Math.random() > 0.5 && constMines > 0 && board[indexI][indexJ]) {
                board[i][j].isMine = true
                constMines--

            }
        }
    }
}

function renderBoard(board) {

    var strHTML = ''

    for (var i = 0; i < board.length; i++) {
        strHTML += `<tr class="selection-box" >\n`
        for (var j = 0; j < board[0].length; j++) {
            const cell = board[i][j]
            var className = (!cell.isShown) ? 'covered ' : 'open'
            const item = `${(cell.isMine) ? MINES_IMG : board[i][j].minesAroundCount}`
            const marked = (cell.isMarked) ? FLAG : ''

            strHTML += `\t <td data-i="${i}" data-j="${j}" title="Seat:${item}" \n
                              class="   bordered cell ${className}"\n
                               onclick="onCellClicked(this,${i},${j})" \n
                               oncontextmenu="onCellMarked(event,this,${i},${j})" >\n
                           <div >${marked}\n
                                 <span > ${item}</span>\n
                            </div > \n
                        </td> \n`
        }
        strHTML += `</tr> \n`
    }
    const elSeats = document.querySelector('.board')
    elSeats.innerHTML = strHTML
}

function setMinesNegsCount(board) {
    var constNegs = 0
    var indexMines = {}
    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board.length; j++) {
            constNegs = 0
            indexMines = board[i][j]
            constNegs = countingNeighboringCells(board, i, j)
            //console.log(constNegs)
            indexMines.minesAroundCount = constNegs

        }
    }
    return constNegs
}

function onCellMarked(es, el, i, j) {
    es.preventDefault()
    console.log(gBoard[i][j])
    if (gBoard[i][j].isShown) return
    if (el.innerText !== FLAG) {
        el.classList.toggle('covered')
        el.innerText = FLAG
        gBoard[i][j].isMarked = true
        if (gBoard[i][j].isMine) gGame.markedCount--
        console.log(gGame.markedCount)
    }
    else {
        el.classList.toggle('covered')
        if (gBoard[i][j].isMine) gGame.markedCount++
        gBoard[i][j].isMarked = false
        el.innerText = `${(gBoard[i][j].isMine) ? MINES_IMG : gBoard[i][j].minesAroundCount}`
    }
    console.log(gBoard[i][j].isMarked)
}

function onCellClicked(el, i, j) {
    if (gBoard[i][j].isMarked) return
    firstStepGame(el, i, j)
    userMode('step')

    el.classList.remove('covered')

    //if (!gFirstMove) createMinesInBoard(gBoard)
    //console.log(i,j)
    if (gBoard[i][j].isMine) {
        //* Because the next attraction arc decreases the life and then gives more life and therefore compares to 1
        if (gGame.LiveInGame <= 1) {
            clearInterval(gTimerInterval)
            gBoard[i][j].isShown = true
            userMode('Fails')
            checkSlotMieGameOver(el)
            changesLifeGame(-1)
            return
        }
        else {

            changesLifeGame(-1)
            gBoard[i][j].isShown = true
        }
        return
    } else {
        gBoard[i][j].isShown = true
        getItemDataBoard(i, j).classList.remove('covered')
        gGame.shownCount++
        if (gGame.isOn) expandShown(i, j)
    }


}

function expandShown(i, j) {
    var slots = getListNeighbors(gBoard, i, j)
    //var cellsOpen = document.querySelectorAll('td')
    for (var i = 0; i < slots.length; i++) {
        var cell = slots[i]
        getItemDataBoard(cell.i, cell.j).classList.remove('covered')
        gGame.shownCount++
        gBoard[cell.i][cell.j].isShown = true
    }
}

// function expandShown(i, j) {
//     const slots = getListNeighbors(gBoard, i, j);

//     for (const slot of slots) {
//         const cell = getItemDataBoard(slot.i, slot.j);

//         if (!cell.classList.contains('covered')) {
//             continue; // Already shown
//         }

//         cell.classList.remove('covered');
//         gGame.shownCount++;
//         gBoard[slot.i][slot.j].isShown = true;

//         expandShown(slot.i, slot.j); // Recursive call
//     }
// }

function getItemDataBoard(dataI, dataJ) {
    return document.querySelector(`[data-i="${dataI}"][data-j="${dataJ}"]`)

}

function firstStepGame(el, i, j) {
    if (!gGame.isOn) {
        gGame.isOn = true
        createMinesInBoard(gBoard, i, j)
        setMinesNegsCount(gBoard)
        renderBoard(gBoard)
        startTimer()
        return true
    }
    return false
}