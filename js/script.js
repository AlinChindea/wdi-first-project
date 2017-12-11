$(() => {


  //TIMER
  // const $timer = $('#timer');
  // const $timerScreen = $('.screen');
  const $startTime = $('#reset');

  // const timeRemaining = 120;
  let timerIsRunning = false;
  let timerId = null;

  function startStopTimer(duration, display) {
    let timer = duration, minutes, seconds;
    // start the timer if it is NOT running
    if(!timerIsRunning){
      timerId = setInterval(() => {
        let minutes = parseInt(timer / 60, 10);
        let seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? '0' + minutes : minutes;
        seconds = seconds < 10 ? '0' + seconds : seconds;

        display.text(minutes + ':' + seconds);
        if (--timer < 0) {
          timer = duration;
        }
        // timeRemaining--;
        // $timerScreen.text(timeRemaining);

        if(timer === 0) {
          clearInterval(timerId);
          // $timer.addClass('ringing');
        }
      }, 1000);
      timerIsRunning = true;
    }
  }
  function startTimer() {
    const twoMinutes = 60 * 2;
    const $timerScreen = $('#time');
    startStopTimer(twoMinutes, $timerScreen);
  }
  $startTime.on('click', startTimer);


});
