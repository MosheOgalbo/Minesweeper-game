'use strict';

var gGame = {
  isOn: false,
  shownCount: 2,
  markedCount: 0,
  secsPassed: 0,
  LiveInGame: 0,
}
var gStartTime;


function renderShownCount() {
  const constMines = document.querySelector('.score')
  constMines.innerText = gGame.shownCount
}

function startTimer() {

  if (gTimerInterval) clearInterval(gTimerInterval)

  gStartTime = Date.now()

  gTimerInterval = setInterval(() => {
    const timeDiff = Date.now() - gStartTime
    const seconds = getFormatSeconds(timeDiff)
    const milliseconds = getFormatMilliSeconds(timeDiff)
    gGame.secsPassed = seconds
    // console.log(gGame.secsPassed)
    document.querySelector('span.timer-seconds').innerText = seconds + ':'
    document.querySelector('span.timer-milli-seconds').innerText = milliseconds
  }, 100)
}

function checkGameOver() {
  if (gGame.shownCount === gGame.markedCount) {
    for (var i = 0; i < gBoard; i++) {
      for (var j = 0; j < gBoard.length; j++) {
        if (gBoard[i][j] === gGame.isShow || gBoard[i][j] === gGame.isMarked) continue
        else break

      }
    }
    userMode('victory')
    document.querySelector('.bordered').style.opacity = 0
    //alert('Game Over')
  }
}

function checkSlotMie(el) {
  console.log(el.innerText)
  if (el.innerText !== MINES_IMG) return false

  const cells = document.querySelectorAll('.cell')
  console.log(cells[0])
  for (const cell of cells) {
    cell.classList.add("blocked")
  }
}

function userMode(mod) {
  var changeState
  switch (mod) {
    case 'start':
      changeState = '🤓'
      break
    case 'step':
      changeState = '🥹'
      break
    case 'Fails':
      changeState = '🤯'
      break
    case 'victory':
      changeState = '🥳'
      break
  }
  document.querySelector('.user-play').innerText = changeState

}

function changesLifeGame(diff = 3) {

  // var sumLifeGame = gGame.LiveInGame +diff
  var sumLifeGame = gGame.LiveInGame += diff
  if (diff === 0) sumLifeGame
  console.log(gGame.LiveInGame)
  document.querySelector('.life-game').innerText = sumLifeGame
}
