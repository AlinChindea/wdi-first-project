// alert('Loaded JS');
$(() => {

  const $timer = $('#timer');
  const $timerScreen = $('.display');
  const $startTime = $('#reset');

  let timeRemaining = 120;
  let timerIsRunning = false;
  let timerId = null;

  function startStopTimer() {
    // stop the timer if it is running
    if(timerIsRunning) {
      clearInterval(timerId);
      timerIsRunning = false;
    } else {
      // start the timer if it is NOT running
      timerId = setInterval(() => {
        timeRemaining--;
        $timerScreen.text(timeRemaining);

        if(timeRemaining === 0) {
          clearInterval(timerId);
          $timer.addClass('ringing');
        }
      }, 1000);
      timerIsRunning = true;
    }
  }
  $startTime.on('click', startStopTimer);



});
