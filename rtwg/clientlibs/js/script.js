window.onload = function() {
  var canvas = document.getElementById('game');
  canvas.width = document.body.clientWidth;
  canvas.height = document.body.clientHeight;

  var c = canvas.getContext('2d');

  var State = {
    _current: 0,
    INTRO: 0,
    LOADING: 1,
    LOADED: 2,
  };

  window.addEventListener('click', handleClick, false);
  window.addEventListener('resize', doResize, false);

  doResize();

  function handleClick() {
    State._current = State.LOADING;
    fadeToWhite(undefined);
  };

  function doResize() {
    canvas.width = document.body.clientWidth;
    canvas.height = document.body.clientHeight;

    switch (State._current) {
      case State.INTRO:
        showIntro();
        break;
    }
  };

  function showIntro() {
    var initialText = "Click or tap the screen to start the game";

    //Clear the canvas
    c.clearRect(0, 0, canvas.width, canvas.height);

    //Creates the gradient
    var grd = c.createLinearGradient(0, 0, canvas.width, canvas.height);
    grd.addColorStop(0, '#CEEFFF');
    grd.addColorStop(0.5, 'red');
    grd.addColorStop(1, '#52BCFF');

    c.fillStyle = grd;
    c.fillRect(0, 0, canvas.width, canvas.height);

    var logoImg = new Image();
    logoImg.src = '../rtwg/resources/images/logo.png';

    logoImg.onload = function() {

      var originalWidth = logoImg.width;
      logoImg.width = Math.round((50 * document.body.clientWidth) / 100);
      logoImg.height = Math.round((logoImg.width * logoImg.height) /
        originalWidth);

      var logo = {
        img: logoImg,
        x: (canvas.width / 2) - (logoImg.width / 2),
        y: (canvas.height / 2) - (logoImg.height / 2)
      }


      c.drawImage(logo.img, logo.x, logo.y, logo.img.width, logo.img.height);

      c.font = 'bold 16px Arial, sans-serif';
      c.fillStyle = '#FFF';

      var textLenght = c.measureText(initialText);
      var xTextPosition = (canvas.width / 2) - (textLenght.width / 2);
      c.fillText(initialText, xTextPosition, (logo.y + logo.img.height) +
        50);
    };
  };

  function fadeToWhite(aValue) {
    var aValue = (aValue == undefined) ? 0.02 : parseFloat(aValue) + 0.02;

    c.fillStyle = '#FFF';
    c.globalAlpha = aValue;

    c.fillRect(0, 0, canvas.width, canvas.height);

    if (aValue < 1.0) {
      setTimeout(function() {
        fadeToWhite(aValue);
      }, 30);
    }
  };
};
