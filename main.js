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
    renderBoard(gBoard)
    setMinesNegsCount(gBoard)
    // console.table(gBoard)

}

function buildBoard() {
    const board = []
    const sizeBoard = gLevel.SIZE
    const concatMinesInBoard = gLevel.MINES

    for (var i = 0; i < sizeBoard; i++) {
        board.push([])
        for (var j = 0; j < sizeBoard; j++) {
            board[i][j] = EMPTY
            for (var k = 0; k < concatMinesInBoard; k++) {
                board[i][j] = {
                    minesAroundCount: 0,
                    isShown: false,
                    isMine: false,
                    isMarked: false,
                }
                if (i === 1 && j === 1) {
                    board[i][j].isMine = true
                    console.log(board[i][j])
                    continue
                }
                if (i === 1 && j === 2) {
                    board[i][j].isMine = true
                    console.log(board[i][j])
                    continue
                }
            }

        }
    }
    return board
}

function setMinesNegsCount(board) {
    var constNegs = 0
    var indexMines = {}
    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board.length; j++) {
            indexMines = board[i][j]
            indexMines.minesAroundCount = countingNeighboringCells(board, i, j, indexMines.isMine)
            // console.log(indexMines)

        }

    }

}


/*                  minesAroundCount: 0,
                    isShown: false,
                    isMine: false,
                    isMarked: false,


const EMPTY = ''
const MINES_IMG = '💣'
                     */
function renderBoard(board) {

    var strHTML = ''

    for (var i = 0; i < board.length; i++) {
        strHTML += `<tr class="selection-box" >\n`
        for (var j = 0; j < board[0].length; j++) {
            const cell = board[i][j]
            var className = (cell.isMine) ? 'bomb' : ''
            const item = `${(cell.isMine) ? MINES_IMG : EMPTY}`

            strHTML += `\t<td data-i="${i}" data-j="${j}" title="Seat: ${item}" class="cell ${className}" 
                            onclick="onCellClicked(this, ${i}, ${j})" oncontextmenu=("onCellMarked(event)") >
                            ${item}
                         </td>\n`
        }
        strHTML += `</tr>\n`
    }
// console.log(strHTML)
    const elSeats = document.querySelector('.board')
    elSeats.innerHTML = strHTML
}

function onCellMarked(es) {
    es.preventDefault()

}       