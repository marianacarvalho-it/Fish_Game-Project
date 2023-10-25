window.onload = function () {
  //const startButton = document.getElementById("start-button");

  const player1Image = document.getElementById("player1");
  const player2Image = document.getElementById("player2");
  const restartButton = document.getElementById("restart-button");


  

  let game;

  if (player1Image){
    player1Image.addEventListener("click", function (){
    startGame("blue");
  });
}
  if (player2Image) {
    player2Image.addEventListener("click", function (){
    startGame("red");
  });
}

  /*choosePlayerButton.addEventListener("click", function () {
    // Hide the "Choose Player" button and show the player images
    choosePlayerButton.style.display = "none";
    player1Image.style.display = "inline";
    player2Image.style.display = "inline";
  });*/

  /*startButton.addEventListener("click", function () {
    startGame();
  });*/




  restartButton.addEventListener("click", function () {
    restartGame();
  });

  /*player1Image.addEventListener("click", function () {
    player1Image.style.display = "block";
    result = 1;
    game.pickPlayer(result);
  });

  player2Image.addEventListener("click", function () {
    player2Image.style.display = "block";
    result = 2;
    game.pickPlayer(result);
  });*/

  function startGame(color) {
    console.log("start game");
    game = new Game(color);
    game.start();
  }

  function restartGame() {
    location.reload();
  }

  // Function that handles keys events
  function handleKeydown(event) {
    const key = event.key;

    const possibleKeys = ["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"];
    if (possibleKeys.includes(key)) {
      event.preventDefault();

      if (game) {
        switch (key) {
          case "ArrowLeft":
            game.player.directionX = -2;
            break;

          case "ArrowRight":
            game.player.directionX = 2;
            break;

          case "ArrowUp":
            game.player.directionY = -2;
            break;

          case "ArrowDown":
            game.player.directionY = 2;
            break;
        }
      }
    }
  }

  // Function that handles keyup events
  function handleKeyup(event) {
    const key = event.key;

    const possibleKeys = ["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"];
    if (possibleKeys.includes(key)) {
      event.preventDefault();

      if (game) {
        switch (key) {
          case "ArrowLeft":
            game.player.directionX = 0;
            break;

          case "ArrowRight":
            game.player.directionX = 0;
            break;

          case "ArrowUp":
            game.player.directionY = 0;
            break;

          case "ArrowDown":
            game.player.directionY = 0;
            break;
        }
      }
    }
  }

  window.addEventListener("keydown", handleKeydown);
  window.addEventListener("keyup", handleKeyup);
};
