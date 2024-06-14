const girl = document.getElementById("game-girl");
const staticGirl = document.getElementById("static-girl");
const dryer = document.getElementById("game-dryer");
const score = document.getElementById("game-score");
const gameBox = document.getElementById("game");
const background = document.getElementById("game-background");
const startScreen = document.getElementById("game-start");
const backgroundAudio = new Audio("assets/audio/background.mp3");
const POINTS_TO_WIN = 500;

let isGameActive = false; // Flag Variable für wenn Game nicht aktiv ist
let gameLoopInterval = 0;

// bei reloaden der Seite
document.addEventListener("DOMContentLoaded", () => {
  girl.classList.add("hidden");
  staticGirl.classList.remove("hidden");
  dryer.classList.add("new-pos");
  backgroundAudio.load(); // damit die Musik erneut von vorne anfängt
  });

//während des Games
const startGame = () => {
  girl.classList.remove("hidden");
  staticGirl.classList.add("hidden");
  dryer.classList.remove("new-pos");
  background.querySelector("#bg-layer-1").style.animationPlayState = "running";
  background.querySelector("#bg-layer-2").style.animationPlayState = "running";
  dryer.classList.add("dryer-animation");
  startScreen.classList.add("hidden");
  backgroundAudio.load();
  backgroundAudio.play();
  resetScore();
  startGameLoop();
  isGameActive = true;
};

const resetScore = () => {
  score.innerText = 0;
};

const jump = () => {
  if (isGameActive) {
    girl.classList.add("jump-animation");
    setTimeout(() => {
      girl.classList.remove("jump-animation");
    }, 500);
  }
};

const dieAnimation = () => {
  girl.classList.add("girl-dies");
  return new Promise((resolve) =>
    setTimeout(() => {
      girl.classList.remove("girl-dies");
      resolve();
    }, 500)
  );
};

gameBox.addEventListener("click", () => {
  if (!gameLoopInterval) {
    startGame();
  }
});


window.addEventListener("keydown", (event) => {
  event.preventDefault(); // scrollt Website nicht wenn man Taste drückt

  if (isGameActive && !girl.classList.contains("jump-animation")) {
    const jumpSound = new Audio("assets/audio/jump.mp3");
    jumpSound.play();
    jump();
  }
});

// nach dem Game
const stopGame = async () => {
  await dieAnimation();
  isGameActive = false;
  girl.classList.add("hidden");
  staticGirl.classList.remove("hidden");
  dryer.classList.add("new-pos");
  backgroundAudio.pause();
  background.querySelector('#bg-layer-1').style.animationPlayState = "paused";
  background.querySelector('#bg-layer-2').style.animationPlayState = "paused";
  dryer.classList.remove("dryer-animation");
  dryer.classList.remove("fast-dryer-animation");
  dryer.classList.remove("faster-dryer-animation");
  startScreen.classList.remove("hidden");
  gameLoopInterval = clearInterval(gameLoopInterval);

  checkWin();
  };

const startGameLoop = () => {
  gameLoopInterval = window.setInterval(() => {
    const girlTop = parseInt(
      window.getComputedStyle(girl).getPropertyValue("top")
    );
    const dryerLeft = parseInt(
      window.getComputedStyle(dryer).getPropertyValue("left")
    );
    score.innerText = Number(score.innerText) + 1;

    // Wenn Score über 200 und Föhn bei Anfangsposition ist, wird Föhn schneller
    if (Number(score.innerText) >= 200 && dryerLeft >= 520) {
      dryer.classList.remove("dryer-animation");
      dryer.classList.add("fast-dryer-animation");
    }

    // Wenn Score über 400 und Föhn bei Anfangsposition ist, wird Föhn schneller
    if (Number(score.innerText) >= 400 && dryerLeft >= 520) {
      dryer.classList.remove("fast-dryer-animation");
      dryer.classList.add("faster-dryer-animation");
    }

    if (dryerLeft < 0) {
      dryer.classList.add("hidden");
    } else {
      dryer.classList.remove("hidden");
    }
    if (dryerLeft < 79 && dryerLeft > 0 && girlTop > 125) {
      const screamSound = new Audio("assets/audio/scream.mp3");
      screamSound.play();
      stopGame();
    }
  }, 50);
};

// Popup Fenster
const checkWin = () => {
  const currentScore = Number(score.innerText);
  if (Number(score.innerText) >= POINTS_TO_WIN) {
    document.getElementById("pop-win").style.display = "flex";
    document.getElementById("win-score").innerText = `Deine Punktezahl ist ${currentScore}.`;
  } else {
    document.getElementById("pop-lose").style.display = "flex";
    document.getElementById("lose-score").innerText = `Deine Punktezahl ist ${currentScore}.`;
  }
};

document.getElementById("dismiss-win").addEventListener("click", function() {
  document.getElementById("pop-win").style.display = "none";
});

document.getElementById("dismiss-lose").addEventListener("click", function() {
  document.getElementById("pop-lose").style.display = "none";
});