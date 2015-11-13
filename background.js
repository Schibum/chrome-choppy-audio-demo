var started = false;
var tabStream;
var audioEl;
var objectUrl;

function playAudio() {
  audioEl = document.createElement('audio');
  audioEl.src = objectUrl;
  audioEl.volume = 1;
  audioEl.play();
}

function start() {
  console.log('starting...');
  chrome.tabCapture.capture({audio: true}, function(stream) {
    tabStream = stream;
    objectUrl = URL.createObjectURL(stream);
    playAudio();
    console.log('started');
  });
}

function stop() {
  console.log('stopping...');
  URL.revokeObjectURL(objectUrl);
  tabStream.getTracks().forEach(function(track) {
    track.stop();
  });
  console.log('stopped');
}

function onButtonClick() {
  if (started)
    stop();
  else
    start();
  started = !started;
}


chrome.browserAction.onClicked.addListener(onButtonClick);

