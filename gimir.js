'use strict';

var gGame = {
  isOn: false,
  shownCount: 0,
  markedCount: 0,
  secsPassed: 0,
  LiveInGame: 0,
}
var gStartTime;

function renderShownCount(reset) {
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
    renderShownCount()
    checkGameOver()
  }, 100)
}

function checkGameOver() {
  if (gGame.markedCount === gLevel.MINES &&
    gGame.markedCount + gGame.shownCount === SIZE * SIZE) {
    document.querySelector('.bordered').style.opacity = 0
    userMode('victory')
  } else return


}

function checkSlotMieGameOver(el) {
  console.log(el.innerText)
  if (el.innerText !== MINES_IMG) return false

  const cells = document.querySelectorAll('.cell')
  // console.log(cells[0])
  for (const cell of cells) {
    cell.classList.add("blocked")
    console.log(cell)
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
  if (diff === 3) gGame.LiveInGame = diff
  else gGame.LiveInGame += diff
  console.log(gGame.LiveInGame)
  document.querySelector('.life-game').innerText = gGame.LiveInGame
}
