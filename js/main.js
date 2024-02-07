'use strict';

var gBoard = []
var gLevel = {
    SIZE: 4,
    MINES: 2,
}

const EMPTY = ''
const MINES_IMG = '💣'

function onInit() {
    // playSound()
    gBoard = buildBoard()
   // createMinesInBoard(gBoard)
    console.log(gBoard)
    setMinesNegsCount(gBoard)
    renderBoard(gBoard)

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
    // console.log(board)

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
            var className = (cell.isMine) ? 'bomb' : 'empty'
            const item = `${(cell.isMine) ? MINES_IMG : board[i][j].minesAroundCount}`

            strHTML += `\t<td data-i="${i}" data-j="${j}" title="Seat: ${item}" class="bordered  covered cell ${className}" 
                            onclick="onCellClicked(this, ${i}, ${j})" oncontextmenu=("onCellMarked(event)") >
                            <span >${item}</span>
                            
                         </td>\n`
        }
        strHTML += `</tr>\n`
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
            // console.log(indexMines)
            // console.log(1,j)
            constNegs = 0

        }

    }
    return constNegs
}

function onCellMarked(es) {
    es.preventDefault()

}

function onCellClicked(el, i, j) {
    // console.log(el)
    el.classList.remove('covered')
}