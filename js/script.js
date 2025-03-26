const colors = [
  "#f9ca24",
  "#f0932b",
  "#be2edd",
  "#535c68",
  "#4834d4",
  "#ff7979",
];

const generateColorbtn = document.querySelector(".generate-color-btn");
const shuffleColorbtn = document.querySelector(".shuffle-color-btn");
const targetColorBox = document.querySelector(".target-color-box");
const shuffledColorBox = document.querySelector(".shuffled-color-box");
const gameStateMessage = document.querySelector(".game-state-message");
const shuffleSound = new Audio("../assets/music/shuffle.mp3");
const btnClickSound = new Audio("../assets/music/btn-click.mp3");

let hasColorGenerated = false,
  hasColorShuffled = false;

generateColorbtn.addEventListener("click", function () {
  if (!hasColorGenerated) {
    btnClickSound.play();
    gameStateMessage.textContent =
      "🎯 Target color set! Now, start shuffling to match it! 🔄⚡";
    targetColorBox.firstElementChild.textContent = "";
    targetColorBox.style.backgroundColor =
      colors[Math.floor(Math.random() * colors.length)];
    hasColorGenerated = true;
  }
});

shuffleColorbtn.addEventListener("click", function () {
  if (hasColorGenerated && !hasColorShuffled) {
    shuffledColorBox.firstElementChild.textContent = "";
    btnClickSound.play();
    gameStateMessage.textContent = "🎨 Shuffling colors... Hold tight! 🌈";
    shuffleSound.play();
    shuffleSound.loop = true;
    hasColorShuffled = true;
    let i = 1;
    const shuffleColor = () => {
      if (i === colors.length * 4) {
        shuffleSound.pause();
        gameStateMessage.textContent = "⏳ Hold on... Checking for a match! 🎯";
        new Audio("../assets/music/stop.wav").play();
        setTimeout(function () {
          hasColorShuffled = false;
          shuffleSound.pause();
          if (
            targetColorBox.style.backgroundColor ===
            shuffledColorBox.style.backgroundColor
          ) {
            gameStateMessage.textContent =
              "🎯 Boom! Perfect match! You've nailed it! 🎉 Generate a new target to play again! 🔄🌈";
            new Audio("../assets/music/correct-choice.mp3").play();
            setTimeout(function () {
              hasColorGenerated = false;
              targetColorBox.style.backgroundColor = "transparent";
              targetColorBox.firstElementChild.textContent =
                "🎯 Awaiting Target Color";
              shuffledColorBox.style.backgroundColor = "transparent";
              shuffledColorBox.firstElementChild.textContent =
                "🎰 Waiting to Shuffle...";
            }, 2000);
          } else {
            gameStateMessage.textContent =
              "😅 Oops, no match! Shuffle again and chase the win! 🔄🌈";
            new Audio("../assets/music/lose.mp3 ").play();
          }
        }, 2000);

        return;
      }
      shuffledColorBox.style.backgroundColor =
        colors[Math.floor(Math.random() * colors.length)];
      i++;
      setTimeout(shuffleColor, 150);
    };
    setTimeout(shuffleColor, 150);
  }
});
