let startButton = document.querySelector(".control-buttons");
let blockContainer = document.querySelector(".memory-game-blocks");
let playerName = document.querySelector(".name span");
let blocks = Array.from(blockContainer.children);
let result = 0;
let tries = document.querySelector(".tries span");
let failed = document.querySelector(".failed");

startButton.onclick = function () {
  this.style.display = "none";
  let yourName = prompt("What's Your Name ?");
  playerName.innerHTML = yourName;
};
for (let i = 0; i < blocks.length; i++) {
  let arr = Array.from(Array(blocks.length).keys());
  let ran = Math.floor(Math.random() * arr.length);
  let numIndex = arr.indexOf(ran);
  arr.splice(numIndex, 1);
  blocks[i].style.order = ran;
}

blocks.forEach((block) => {
  block.onclick = function () {
    this.classList.add("is-flipped");
  };
  noClicking();
});

function noClicking() {
  blocks.forEach((element) => {
    element.onclick = function () {
      this.classList.add("is-flipped");
      let allFlipped = blocks.filter((ele) =>
        ele.classList.contains("is-flipped")
      );

      if (allFlipped.length === 2) {
        blockContainer.classList.add("no-clicking");
        if (
          allFlipped[0].dataset.technology !== allFlipped[1].dataset.technology
        ) {
          blockContainer.classList.remove("no-clicking");
          document.getElementById("fail").play();
          tries.innerHTML++;
          if (tries.innerHTML === "10") {
            failed.style.display = "block";
            blockContainer.classList.add("no-clicking");
          }
          setTimeout(() => {
            allFlipped[0].classList.remove("is-flipped");
            allFlipped[1].classList.remove("is-flipped");
          }, 1000);
        }
        if (
          allFlipped[0].dataset.technology === allFlipped[1].dataset.technology
        ) {
          document.getElementById("success").play();
          allFlipped[0].classList.remove("is-flipped");
          allFlipped[1].classList.remove("is-flipped");
          allFlipped[0].classList.add("has-match");
          allFlipped[1].classList.add("has-match");
          allFlipped.length = 0;
          blockContainer.classList.remove("no-clicking");
          result++;
          if (result === blocks.length / 2) {
            console.log("cong");
          }
        }
      }
    };
  });
}
