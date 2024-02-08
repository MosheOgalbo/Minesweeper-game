'use strict';

var gGame = {
    isOn: false,
    shownCount: 1,
    markedCount: 0,
    secsPassed: 0,
}


function checkGameOver() {
   if (gGame.shownCount===gGame.markedCount){
    document.querySelector('.bordered').style.opacity= 0 
    //alert('Game Over')
   }
 }
