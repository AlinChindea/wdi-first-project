// let numSquares = 12;
let mammalsAndSounds = []; //an emtpy array where matched images and sounds should be pushed

let gameBoard = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12']; //the ids of the gameboard
const mammals = ['bearded-seal.png', 'bearded-seal.png', 'beluga-white-whale.png', 'beluga-white-whale.png', 'leopard-seal.png', 'leopard-seal.png', 'killer-whale.png', 'killer-whale.png', 'narwhal.png', 'narwhal.png', 'common-dolphin.png', 'common-dolphin.png']; //the initial images to create a minimally running game

// const $messageDisplay = $('#display');
// const $resetButton = $('#reset');
// const $modeButtons = $('.mode');

//function creating random ids in the mammalsAndSounds array
function createPairs() {
  mammalsAndSounds = [];
  while (gameBoard.length > 0) {
    const randomNumber = Math.floor(Math.random() * gameBoard.length);
    const randomCard = gameBoard.splice(randomNumber, 1)[0];
    mammalsAndSounds.push(randomCard);
    console.log(mammalsAndSounds);
  }
  gameBoard = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];
}

$(() => {
  // while ($squares.length > 0) {
  //   $squares[0] = mammalsAndSounds[i];
  //   mammalsAndSounds.splice(i, 1);
  //   $squares=[].slice.call(mammalsAndSounds, 1);
  // }

  //must match index[0] of const mammals with indexes [0] and [1] of the randomCard; index[1] of mammals with indexes 2 and 3 and so on
  const $squares = $('.square');
  function matchImagesToSquares() {
    createPairs();
    mammalsAndSounds.forEach((thingInArray, i)=> {
      // using jQuery, grab the square with the current squareId
      const $curentSquare = $(`#${thingInArray}`);
      const currentMammal = mammals[i];
      $curentSquare.css('background-image', `url(images/${currentMammal}`);
      // using jQuery again, give that square a background image of the item in mammals that has the same index (not as squareId but as index which has been passed in as an argument)👆
    });
  }
  matchImagesToSquares();

  //TIMER
  const $startTime = $('#reset');
  let timerIsRunning = false;
  let timerId = null;

  function startStopTimer(duration, $display) {
    let timer = duration;
    // start the timer if it is NOT running
    if(!timerIsRunning){
      timerId = setInterval(() => {
        --timer;
        let minutes = parseInt(timer / 60, 10);
        let seconds = parseInt(timer % 60, 10);
        minutes = minutes < 10 ? '0' + minutes : minutes;
        seconds = seconds < 10 ? '0' + seconds : seconds;
        $display.text(minutes + ':' + seconds);
        if(timer  === 0) {
          clearInterval(timerId);
          // $timer.addClass('ringing');
        }
      }, 1000);
      timerIsRunning = true;
    }
  }
  function startTimer() {
    const twoMinutes = 120;
    const $timerScreen = $('#time');
    startStopTimer(twoMinutes, $timerScreen);
  }
  $startTime.on('click', startTimer);





});
