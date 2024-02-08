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
    userMode('start')
    gGame.isOn = false
    if (gTimerInterval) clearInterval(gTimerInterval)
    document.querySelector('span.timer-seconds').innerText = ''
    document.querySelector('span.timer-milli-seconds').innerText = ''
    // playSound()
    // gFirstMove = false
    gBoard = buildBoard()
    //  createMinesInBoard(gBoard)
    //  console.log(gBoard)
    setMinesNegsCount(gBoard)
    renderShownCount()
    renderBoard(gBoard)
    
}

function levelsOfPlay(el) {
    const level = el.dataset.leve
    const mines = el.dataset.mines
   // console.log(level, mines)
    gLevel.SIZE = level
    gLevel.MINES = mines
    gGame.shownCount= mines
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
            if (i === 1 && j === 1) board[i][j].isMine = true
            if (i === 1 && j === 2) board[i][j].isMine = true
        }
    }
    return board
}

function createMinesInBoard(board) {
    var constMines = gLevel.MINES

    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[0].length; j++) {
            if (Math.random() > 0.5 && constMines > 0) {
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
            indexMines = board[i][j]
            constNegs = countingNeighboringCells(board, i, j)
            //console.log(constNegs)
            indexMines.minesAroundCount = constNegs
            constNegs = 0
        }
    }
    return constNegs
}

function onCellMarked(es, el, i, j) {
    es.preventDefault()
    el.classList.toggle('covered')
    if (el.innerText !== FLAG) el.innerText = FLAG
    else el.innerText = `${(gBoard[i][j].isMine) ? MINES_IMG : gBoard[i][j].minesAroundCount}`
 

}

function onCellClicked(el, i, j) {
    if (!gGame.isOn) {
        gGame.isOn = true
        startTimer()
    }
   
    el.classList.remove('covered')

    //if (!gFirstMove) createMinesInBoard(gBoard)
    //console.log(i,j)
    if (gBoard[i][j].isMine) {
        clearInterval(gTimerInterval)
        gBoard[i][j].isShown = true
        checkSlotMie(el)
        return
    }
    expandShown(i, j)
    gBoard[i][j].isShown = true

}

function expandShown(i, j) {
    var slots = getListNeighbors(gBoard, i, j)
    var cellsOpen = document.querySelectorAll('td')
    for (var i = 0; i < slots.length; i++) {
        var cell = slots[i]
        getItemDataBoard(cell.i, cell.j).classList.remove('covered')
        gBoard[cell.i][cell.j].isShown = true

    }
}

function getItemDataBoard(dataI, dataJ) {
    return document.querySelector(`[data-i="${dataI}"][data-j="${dataJ}"]`)

}