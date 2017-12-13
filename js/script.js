let mammalsAndSounds = []; //an emtpy array where matched images and sounds should be pushed

let gameBoard = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12']; //the ids of the gameboard
const mammals = ['bearded-seal.png', 'bearded-seal.png', 'beluga-white-whale.png', 'beluga-white-whale.png', 'leopard-seal.png', 'leopard-seal.png', 'killer-whale.png', 'killer-whale.png', 'narwhal.png', 'narwhal.png', 'common-dolphin.png', 'common-dolphin.png']; //the initial images to create a minimally running game; ideally, this would be empty and the game would randomly take 6 cards from the images folder

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
  const $squares = $('.square');
  const $audio = $('#audio').get(0);
  const $startTime = $('#reset');
  let timerIsRunning = false;
  let timerId = null;
  let cardsInPlay = [];
  let cardsInPlayIds = [];
  const $messageDisplay = $('#display');
  let matchScore = 0;
  const $restartGame = $('#restart');
  const $howToPlay = $('.instructions');

  //on window load,x cards are facedown and cards can't be clicked
  function initialBoard () {
    for (let i = 1; i <= mammals.length; i++) {
      const $card = $(`#card-${i}`);
      // console.log($card);
      $card.css('background-image', 'url("images/finback-whale.png")');
    }
  }
  //must match index[0] of const mammals with indexes [0] and [1] of the randomCard; index[1] of mammals with indexes 2 and 3 and so on

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

  //TIMER

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
    $squares.on('click', playSound);
    startStopTimer(oneMinute, $timerScreen);
    $howToPlay.removeClass('pulse');
  }
  $startTime.on('click', startTimer);


  //flipping a card

  function flipCard (e) {
    const cardIdAttribute = $(e.target).attr('id');
    let cardId = parseInt(cardIdAttribute.substr(5,2));
    cardsInPlayIds.push(cardId);
    cardId = --cardId;
    cardsInPlay.push({backgroundImage: mammals[cardId], cardId: cardIdAttribute});
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

  //play the audio sounds
  // $squares.on('click', playSound);

  function playSound(e) {
    const filename = $(e.target).attr('id');
    $audio.src = `sounds/${filename}.wav`;
    $audio.play();
  }

  //if cards flipped are a pair, remove these from the grid; else turn them back and display "try again"

  function checkForMatch () {
    if (cardsInPlay[0].backgroundImage === cardsInPlay[1].backgroundImage && cardsInPlay[0].cardId !== cardsInPlay[1].cardId) {
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
      clearInterval(timerId);
      $('#restart').css('display', 'block');
    } else {
      flipCard;
    }
  }


  function reset () {
    mammalsAndSounds = [];
    initialBoard();
    // matchImagesToSquares();
    oneMinute = 60;
    timerIsRunning = false;
    $timerScreen.text('01:00');
    startStopTimer(oneMinute, $timerScreen);
    for (let i=0; i < $squares.length; i++) {
      $($squares[i]).css('visibility', 'visible');
    }
    $('#restart').css('display', 'none'); //hides the play again button

  }
  $restartGame.on('click', reset);

  












});
