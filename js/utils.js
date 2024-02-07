'use strict'

function createMat(ROWS, COLS) {
    const mat = []
    for (var i = 0; i < ROWS; i++) {
        const row = []
        for (var j = 0; j < COLS; j++) {
            row.push('')
        }
        mat.push(row)
    }
    return mat
}

function makeId(length = 6) {
    var txt = ''
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length))
    }

    return txt
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function countingNeighboringCells(board, rowIdx, colIdx) {
    var count = 0;
    for (var i = rowIdx - 1; i <= rowIdx + 1; i++) {
      if (i < 0 || i >= board.length) continue;
      for (var j = colIdx - 1; j <= colIdx + 1; j++) {
        if (i === rowIdx && j === colIdx) continue;
        if (j < 0 || j >= board[0].length) continue;
        
        // Check if this neighbor cell is a mine  
        if (board[i][j].isMine) count++; 
      }
    }
    return count;
  }

var gNums = [1, 2, 3, 4, 5, 6, 7]
// console.log('gNums', gNums)
// shuffle(gNums)
// console.log('gNums', gNums)


// var num = drawNum();
// console.log('num:', num);
// console.log('gNums:', gNums);

// num = drawNum();
// console.log('num:', num);
// console.log('gNums:', gNums);

function drawNum() {
    return gNums.pop()
}

function shuffle(items) {
    for (var i = items.length - 1; i > 0; i--) {
        var randIdx = getRandomInt(0, i + 1);
        var keep = items[i];
        items[i] = items[randIdx];
        items[randIdx] = keep;
    }
    return items;
}

var gNums2 = [1, 2, 3, 4, 5, 6, 7]

function drawNum2() {
    var randIdx = getRandomInt(0, gNums2.length)
    var num = gNums2[randIdx]
    gNums2.splice(randIdx, 1)
    return num
}

function resetNums() {
    gNums2 = []
    for (var i = 1; i < 100; i++) {
        gNums2.push(i)
    }
}
// var board = [
//     [{ val: 13, isHit: true }, { val: 66, isHit: false }],
//     [{ val: 1, isHit: false }, { val: 6, isHit: false }]
// ]
// console.table(board)
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

function startTimer() {

    if (gTimerInterval) clearInterval(gTimerInterval)

    gTimerInterval = setInterval(() => {
        const timeDiff = Date.now() - startTime

        const seconds = getFormatSeconds(timeDiff)
        const milliSeconds = getFormatMilliSeconds(timeDiff)

        document.querySelector('span.seconds').innerText =  seconds
        document.querySelector('span.milli-seconds').innerText = milliSeconds

    }, 10)
}

function getEmptyPos(board) {
    const emptyCells = []
    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard[0].length; j++) {
            if (gBoard[i][j] === EMPTY) {
                emptyCells.push({ i, j })
            }
        }
    }
    var randInt = getRandomInt(0, emptyCells.length);
    return emptyCells[randInt]
}
function playSound() {
    const sound = new Audio('./sound/ariana')
    sound.play()
}