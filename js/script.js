let mammalsAndSounds = []; //an emtpy array where matched images and sounds should be pushed

let gameBoard = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12']; //the ids of the gameboard
const mammals = ['bearded-seal.png', 'bearded-seal.png', 'beluga-white-whale.png', 'beluga-white-whale.png', 'leopard-seal.png', 'leopard-seal.png', 'killer-whale.png', 'killer-whale.png', 'narwhal.png', 'narwhal.png', 'common-dolphin.png', 'common-dolphin.png']; //the initial images to create a minimally running game; ideally, this would be empty and the game would randomly take 6 cards from teh images folder
let oneMinute = 60;

//function creating random ids in the mammalsAndSounds array
function createPairs() {
  mammalsAndSounds = [];
  while (gameBoard.length > 0) {
    const randomNumber = Math.floor(Math.random() * gameBoard.length);
    const randomCard = gameBoard.splice(randomNumber, 1)[0];
    mammalsAndSounds.push(randomCard);
  }
  gameBoard = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];
}


$(() => {
  const $timerScreen = $('#time');

  //on window load,x cards are facedown and cards can't be clicked
  function initialBoard () {
    for (let i = 1; i <= mammals.length; i++) {
      const $card = $(`#card-${i}`);
      // console.log($card);
      $card.css('background-image', 'url("images/finback-whale.png")');
    }
  }
  // initialBoard();

  //must match index[0] of const mammals with indexes [0] and [1] of the randomCard; index[1] of mammals with indexes 2 and 3 and so on
  const $squares = $('.square');
  function matchImagesToSquares() {
    createPairs();
    mammalsAndSounds.forEach((thingInArray, i)=> {
      // using jQuery, grab the square with the current squareId
      const $curentSquare = $(`#card-${thingInArray}`);
      const currentMammal = mammals[i];
      // $curentSquare.css('background-image', `url(images/${currentMammal}`);
      // using jQuery again, give that square a background image of the item in mammals that has the same index (not as squareId but as index which has been passed in as an argument)👆
    });
  }
  // matchImagesToSquares();

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
        if(timer === 0) {
          clearInterval(timerId);
          // $timer.addClass('ringing');
        }
      }, 1000);
      timerIsRunning = true;
    }
  }
  //clicking new game starts the game: timer starts running and cards can be flipped
  function startTimer() {
    $squares.on('click', flipCard);
    startStopTimer(oneMinute, $timerScreen);
    const $howToPlay = $('.instructions');
    $howToPlay.removeClass('pulse');
  }
  $startTime.on('click', startTimer);


  //flipping a card
  let cardsInPlay = [];
  let cardsInPlayIds = [];

  function flipCard (e) {
    const cardIdAttribute = $(e.target).attr('id');
    let cardId = parseInt(cardIdAttribute.substr(5,2));
    cardsInPlayIds.push(cardId);
    cardId = --cardId;
    cardsInPlay.push(mammals[cardId]);
    // console.log(cardsInPlay);
    $(e.target).css('background-image', `url(images/${mammals[cardId]})`);
    if (cardsInPlay.length === 2) {
      // If so, call the checkForMatch function
      setTimeout(() => {
        checkForMatch();
        // Empty cards in play array for next try
        cardsInPlay = [];
      }, 800);
    }
  }

  //if cards flipped are a pair, remove these from the grid; else turn them back and display "try again"

  const $messageDisplay = $('#display');
  let matchScore = 0;


  function checkForMatch () {
    if (cardsInPlay[0] === cardsInPlay[1]) {
      $messageDisplay.text('Science on!');
      setTimeout( ()=> {
        $messageDisplay.text('');
      }, 800);
      $(`#card-${cardsInPlayIds[0]}`).css('visibility', 'hidden');
      $(`#card-${cardsInPlayIds[1]}`).css('visibility', 'hidden');
      matchScore += 1;
      gameWon();
    } else {
      $(`#card-${cardsInPlayIds[0]}`).css('backgroundImage', 'url("images/finback-whale.png")');
      $(`#card-${cardsInPlayIds[1]}`).css('backgroundImage', 'url("images/finback-whale.png")');
      $messageDisplay.text('Try again!');
      setTimeout( ()=> {
        $messageDisplay.text('');
      }, 800);
    }
    cardsInPlayIds = [];
  }

  function gameWon () {
    if (matchScore === 6) {
      const $resultScreen = $('#finalScore');
      $resultScreen.text('You are a true ocean scientist!');
      // $startTime.text('Play again?');
      clearInterval(timerId);
      $('#restart').css('display', 'block');
    } else {
      flipCard;
    }
  }

  const $restartGame = $('#restart');
  function reset () {
    mammalsAndSounds = [];
    initialBoard();
    createPairs();
    matchImagesToSquares();
    oneMinute = 60;
    timerIsRunning = false;
    $timerScreen.text('01:00');
    startStopTimer(oneMinute, $timerScreen);
    for (let i=0; i < $squares.length; i++) {
      $($squares[i]).css('visibility', 'visible');
    }
  }
  $restartGame.on('click', reset);

  // toggles between easy and hard mode but those are not yet linked to anything and the reset function should be called inside but it doesn't work
  // const $modeButtons = $('.mode');
  // function setupModeButtons(){
  //   for(var i = 0; i < $modeButtons.length; i++){
  //     $($modeButtons[i]).on('click', function(){
  //       $($modeButtons[0]).removeClass('selected');
  //       $($modeButtons[1]).removeClass('selected');
  //       this.classList.add('selected');
  //     });
  //   }
  // }
  // setupModeButtons();










});
