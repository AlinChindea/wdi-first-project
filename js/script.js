let mammalsAndSounds = []; //an emtpy array where matched images and sounds should be pushed

let gameBoard = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12']; //the ids of the gameboard
const mammals = ['bearded-seal.png', 'bearded-seal.png', 'beluga-white-whale.png', 'beluga-white-whale.png', 'leopard-seal.png', 'leopard-seal.png', 'killer-whale.png', 'killer-whale.png', 'narwhal.png', 'narwhal.png', 'common-dolphin.png', 'common-dolphin.png']; //the initial images to create a minimally running game; ideally, this would be empty and the game would randomly take 6 cards from the images folder

let gameTime = 60;

//function creating random ids in the mammalsAndSounds array - needed to randomize cards and reshuffle
// function createPairs() {
//   mammalsAndSounds = [];
//   while (gameBoard.length > 0) {
//     const randomNumber = Math.floor(Math.random() * gameBoard.length);
//     const randomCard = gameBoard.splice(randomNumber, 1)[0];
//     mammalsAndSounds.push(randomCard);
//   }
//   gameBoard = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];
// }


$(() => {
  const $modeButtons = $('.mode');
  const $modeEasy = $('#easy');
  const $modeHard = $('#hard');
  const $modeExtreme = $('#extreme');
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
  const $resultScreen = $('#finalScore');
  let timer = 0;
  const $scoreBoard = $('.score');
  let gameMode = null;

  //on window load,x cards are facedown and cards can't be clicked
  function initialBoard () {
    for (let i = 1; i <= mammals.length; i++) {
      const $card = $(`#card-${i}`);
      // console.log($card);
      $card.css('background-image', 'url("images/finback-whale.png")');
    }
  }

  //difficulty levels buttons are loaded
  function setupModeButtons(){
    for(var i = 0; i < $modeButtons.length; i++){
      $($modeButtons[i]).on('click', function(){
        $modeHard.removeClass('selected');
        $modeEasy.removeClass('selected');
        this.classList.add('selected');
      });
    }
  }
  setupModeButtons();

  function modeEasy () {
    $modeEasy.on('click', () => {
      gameMode = 'Easy';
      gameTime = 60;
      $timerScreen.text('01:00');
    });
  }
  modeEasy();

  function modeHard () {
    $modeHard.on('click', () => {
      gameMode = 'Hard';
      gameTime = 30;
      $timerScreen.text('00:30');
    });
  }
  modeHard();

  function modeExtreme () {
    $modeExtreme.on('click', () => {
      gameMode = 'Extreme';
      gameTime = 15;
      $timerScreen.text('00:15');
    });
  }
  modeExtreme();


  //TIMER

  function startStopTimer(duration, $display) {
    timer = duration;
    // start the timer if it is NOT running
    if(!timerIsRunning){
      timerId = setInterval(() => {
        --timer;
        let minutes = parseInt(timer / 60, 10);
        let seconds = parseInt(timer % 60, 10);
        minutes = minutes < 10 ? '0' + minutes : minutes;
        seconds = seconds < 10 ? '0' + seconds : seconds;
        $display.text(minutes + ':' + seconds);
        checkResult();
        if(timer === 0) {
          clearInterval(timerId);
          $('#timer').addClass('ringing');
        }
      }, 1000);
      timerIsRunning = true;
    }
  }
  //clicking new game starts the game: timer starts running and cards can be flipped

  function startTimer() {
    $squares.on('click', flipCard);
    $squares.on('click', playSound);
    startStopTimer(gameTime, $timerScreen);
    $howToPlay.removeClass('pulse');
  }
  $startTime.on('click', startTimer);


  //flipping a card

  function flipCard (e) {
    if(timer <= 0) return; //
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

  function checkResult () {
    if (timer === 0 && matchScore < 6) {
      $scoreBoard.css('display', 'block');
      $resultScreen.text('Time is up! You are the George Constanza of memory games!');
      $('#restart').css('display', 'block');
    } else if (matchScore === 6 && gameMode === 'Extreme') {
      $scoreBoard.css('display', 'block');
      $resultScreen.text('You are Jacques Cousteau of memory games!');
      clearInterval(timerId);
      $('#restart').css('display', 'block');
    } else if (matchScore === 6 && gameMode === 'Hard') {
      $scoreBoard.css('display', 'block');
      $resultScreen.text('You are a memory champion!');
      clearInterval(timerId);
      $('#restart').css('display', 'block');
    } else if (matchScore === 6 && gameMode === 'Easy') {
      $scoreBoard.css('display', 'block');
      $resultScreen.text('You are a true ocean scientist!');
      clearInterval(timerId);
      $('#restart').css('display', 'block');
    }
  }

  //shuffling function - must match index[0] of const mammals with indexes [0] and [1] of the randomCard; index[1] of mammals with indexes 2 and 3 and so on

  // function matchImagesToSquares() {
  //   createPairs();
  //   mammalsAndSounds.forEach((thingInArray, i)=> {
  //     // using jQuery, grab the square with the current squareId
  //     const $curentSquare = $(`#card-${thingInArray}`);
  //     const currentMammal = mammals[i];
  //     $curentSquare.css('background-image', `url(images/${currentMammal}`);
  //     // using jQuery again, give that square a background image of the item in mammals that has the same index (not as squareId but as index which has been passed in as an argument)👆
  //   });
  // }

  function reset () {
    mammalsAndSounds = [];
    matchScore = 0;
    initialBoard();
    // matchImagesToSquares();
    gameTime = 60;
    timerIsRunning = false;
    $timerScreen.text('01:00');
    startStopTimer(gameTime, $timerScreen);
    $scoreBoard.css('display', 'none');
    $resultScreen.text('');
    for (let i=0; i < $squares.length; i++) {
      $($squares[i]).css('visibility', 'visible');
    }
    $restartGame.css('display', 'none'); //hides the play again button
  }
  $restartGame.on('click', reset);











});
