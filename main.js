'use strict';

var gBoard = []

var gLevel = {
    SIZE: 4,
    MINES: 2,
}

var gFirstMove = false
const EMPTY = ''
const MINES_IMG = '💣'
const FLAG = ' 🚩'

function onInit() {
    // playSound()
    // gFirstMove = false
    gBoard = buildBoard()
  //  createMinesInBoard(gBoard)
    //  console.log(gBoard)
    setMinesNegsCount(gBoard)
    renderBoard(gBoard)
    checkGameOver()
}

function levelsOfPlay(el) {
    const level = el.dataset.leve
    const mines = el.dataset.mines
    console.log(level, mines)
    gLevel.SIZE = level
    gLevel.MINES = mines
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
            var className = (!cell.isShown) ? 'bordered' : 'empty'
            const item = `${(cell.isMine) ? MINES_IMG : board[i][j].minesAroundCount}`
            const marked = (cell.isMarked) ? FLAG : ''
            //var marked= ()?'bordered':
            //var data={i,j}
            strHTML += `\t <td data-i="${i}" data-j="${j}" title="Seat:${item}" \n
                              class="  covered cell ${className}"\n
                               onclick="onCellClicked(this,${i},${j})" \n
                               oncontextmenu="onCellMarked(event)" >\n
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

function onCellMarked(es, i, j) {
    es.preventDefault()
    //  console.log(es)
    // gBoard[i][j]=true
    // es.innerText = FLAG

}

function onCellClicked(el, i, j) {
    el.classList.remove('covered')
    //if (!gFirstMove) createMinesInBoard(gBoard)
    //console.log(i,j)
    if (gBoard[i][j].isMine) return
    expandShown(i, j)
}

function expandShown(i, j) {
    var slots = getListNeighbors(gBoard, i, j)
    var cellsOpen = document.querySelectorAll('td')
    for (var i = 0; i < slots.length; i++) {
        var cell = slots[i]
       document.querySelector(`[data-i="${cell.i}"][data-j="${cell.j}"]`).classList.remove('covered')
    }
}
