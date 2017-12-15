let mammalsAndSounds = []; //an emtpy array where matched images and sounds should be pushed

let gameBoard = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12']; //the ids of the gameboard
const mammals = ['bearded-seal.png', 'bearded-seal.png', 'beluga-white-whale.png', 'beluga-white-whale.png', 'northern-right-whale.png', 'northern-right-whale.png', 'killer-whale.png', 'killer-whale.png', 'narwhal.png', 'narwhal.png', 'common-dolphin.png', 'common-dolphin.png']; //the initial images to create a minimally running game; ideally, this would be empty and the game would randomly take 6 cards from the images folder

let gameTime = 60;


$(() => {
  const $modeButtons = $('.mode');
  const $modeEasy = $('#easy');
  const $modeHard = $('#hard');
  const $modeExtreme = $('#extreme');
  let gameMode = 'Easy';
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


  //on window load,x cards are facedown and cards can't be clicked
  function initialBoard () {
    for (let i = 1; i <= mammals.length; i++) {
      const $card = $(`#card-${i}`);
      // console.log($card);
      $card.css('background-image', 'url("images/finback-whale.png")');
    }
  }

  //difficulty levels buttons are loaded and defined
  function setupModeButtons(){
    for(var i = 0; i < $modeButtons.length; i++){
      $($modeButtons[i]).on('click', function(){
        $modeHard.removeClass('selected');
        $modeEasy.removeClass('selected');
        $modeExtreme.removeClass('selected');
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
    $modeButtons.css('visibility', 'hidden');
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
    if(timer === 0 || matchScore === 6){
      $scoreBoard.css('display', 'block');
    }
    if (timer === 0 && matchScore < 6) {
      $resultScreen.text('Time is up! You are the George Constanza of memory games!');
      $scoreBoard.css('backgroundImage', 'url("https://goo.gl/m4541N")');
      $('#restart').css('display', 'block');
    } else if (matchScore === 6 && gameMode === 'Extreme') {
      $resultScreen.text('You are Jacques Cousteau of memory games!');
      clearInterval(timerId);
      $scoreBoard.css('backgroundImage', 'url("images/cousteau.jpg")');
      $('#restart').css('display', 'block');
    } else if (matchScore === 6 && gameMode === 'Hard') {
      $resultScreen.text('You are a memory champion!');
      clearInterval(timerId);
      $scoreBoard.css('backgroundImage', 'url("images/seaturtle.jpg")');
      $('#restart').css('display', 'block');
    } else if (matchScore === 6 && gameMode === 'Easy') {
      $resultScreen.text('You have it pretty easy!');
      $scoreBoard.css('backgroundImage', 'url("images/sloth.jpg")');
      clearInterval(timerId);
      $('#restart').css('display', 'block');
    }
  }

  function reset () {
    mammalsAndSounds = [];
    matchScore = 0;
    initialBoard();
    if (gameMode === 'Easy') {
      gameTime = 60;
      timerIsRunning = false;
      $timerScreen.text('01:00');
      startStopTimer(gameTime, $timerScreen);
    } else if (gameMode === 'Hard') {
      gameTime = 30;
      timerIsRunning = false;
      $timerScreen.text('00:30');
      startStopTimer(gameTime, $timerScreen);
    } else if (gameMode === 'Extreme') {
      gameTime = 15;
      timerIsRunning = false;
      $timerScreen.text('00:15');
      startStopTimer(gameTime, $timerScreen);
    }
    $scoreBoard.css('display', 'none');
    $resultScreen.text('');
    for (let i=0; i < $squares.length; i++) {
      $($squares[i]).css('visibility', 'visible');
    }
    $restartGame.css('display', 'none'); //hides the play again button
  }
  $restartGame.on('click', reset);


});
