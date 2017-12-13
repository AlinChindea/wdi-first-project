let mammalsAndSounds = []; //an emtpy array where matched images and sounds should be pushed

let gameBoard = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12']; //the ids of the gameboard
const mammals = ['bearded-seal.png', 'bearded-seal.png', 'beluga-white-whale.png', 'beluga-white-whale.png', 'leopard-seal.png', 'leopard-seal.png', 'killer-whale.png', 'killer-whale.png', 'narwhal.png', 'narwhal.png', 'common-dolphin.png', 'common-dolphin.png']; //the initial images to create a minimally running game; ideally, this would be empty and the game would randomly take 6 cards from teh images folder


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

//on window load,x cards are facedown and cards can't be clicked
  const initialBoard = function () {
    for (let i = 1; i <= mammals.length; i++) {
      const $card = $(`#card-${i}`);
      // console.log($card);
      $card.css('background-image', 'images/finback-whale.png');
      // $('.instructions').animate({zoom: '110%'}, 400, 'swing');
    }
  };
  initialBoard();

  //must match index[0] of const mammals with indexes [0] and [1] of the randomCard; index[1] of mammals with indexes 2 and 3 and so on
  const $squares = $('.square');
  function matchImagesToSquares() {
    createPairs();
    mammalsAndSounds.forEach((thingInArray, i)=> {
      // using jQuery, grab the square with the current squareId
      const $curentSquare = $(`#card-${thingInArray}`);
      const currentMammal = mammals[i];
      $curentSquare.css('background-image', `url(images/${currentMammal}`);
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
        if(timer  === 0) {
          clearInterval(timerId);
          // $timer.addClass('ringing');
        }
      }, 1000);
      timerIsRunning = true;
    }
  }

  //clicking new game starts the game: timer starts running and cards can be flipped
  function startTimer() {
    const oneMinute = 60;
    const $timerScreen = $('#time');
    $squares.on('click', flipCard);
    startStopTimer(oneMinute, $timerScreen);
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
      }, 1000);
    }
  }


  //if cards flipped are a pair, remove these from the grid; else turn them back and display "try again"

  let $messageDisplay = $('#display');


  function checkForMatch () {
    if (cardsInPlay[0] === cardsInPlay[1]) {
      $messageDisplay.text('Rock on!');//settimeout, duration then set it to an empty string
      setTimeout( ()=> {
        $messageDisplay.text('');
      }, 1000);
      $(`#card-${cardsInPlayIds[0]}`).css('visibility', 'hidden');
      $(`#card-${cardsInPlayIds[1]}`).css('visibility', 'hidden');
    } else {
      $(`#card-${cardsInPlayIds[0]}`).css('backgroundImage', 'url("images/finback-whale.png")');
      $(`#card-${cardsInPlayIds[1]}`).css('backgroundImage', 'url("images/finback-whale.png")');
      console.log($(`#card-${cardsInPlayIds[0]}`));
      $messageDisplay.text('Try again!');
      setTimeout( ()=> {
        $messageDisplay.text('');
      }, 1000);
    }
    cardsInPlayIds = [];
  }

  // function flip() {
  //
  // }

  //winning/losing - if all cards have been matched before time runs out, display, you rock; time stops at that particular time and result is logged in the result div -








});
