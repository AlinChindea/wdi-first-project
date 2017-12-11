// let numSquares = 12;
let mammalsAndSounds = [];
let gameBoard = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];
const mammals = ['bearded-seal.png', 'beluga-white-whale.png', 'leopard-seal.png', 'killer-whale.png', 'narwhal.png', 'common-dolphin.png'];

// const $messageDisplay = $('#display');
// const $resetButton = $('#reset');
// const $modeButtons = $('.mode');


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

  const $squares = $('.square');
  function matchImagesToSquares() {
    mammalsAndSounds.forEach((squareId, index)=> {
      $squares.each((i, square) => {
        const $square = $(square);
        if($square.attr('id') === squareId) {
          $square.css('background-image', `url(../images/${mammals[0]})`);
        }
      });
    });
  }


  // mammalsAndSounds = [];
  // while (mammals.length > 0) {
  //   const randomImage = Math.floor(Math.random() *mammals.length);
  //   const randomMammal = mammals.splice(randomImage, 1)[0];
  //   mammalsAndSounds.push(randomMammal);
  //   console.log(mammalsAndSounds);
  // }

  //creating an array to store all card objects
  let photosInPLay = [];
  let photos = [
    {
    name: 'bearded seal',
    imageSrc: '../images/bearded-seal.png',
    id: 1
  },
  {
    name: 'beluga white whale',
    imageSrc: '..images/beluga-white-whale.png',
    id: 2
  },
  {
    name: 'leopard seal',
    imageSrc: '..images/leopard-seal.png',
    id: 3
  },
  {
    name: 'killer whale',
    imageSrc: '..images/killer-whale.png',
    id: 4
  },
  {
    name: 'narwhal',
    imageSrc: '..images/narwhal.png',
    id: 5
  },
  {
    name: 'common dolphin',
    imageSrc: '..images/common-dolphin.png',
    id: 6
  }
  ];

  //check for matching

    }
  }
