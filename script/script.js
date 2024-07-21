const board = document.querySelector(".board");

function addCheckersBlock() {
  let checkersContianer = "";

  for (var i = 1; i <= 64; i++) {
    checkersContianer += `<span class="box"></span>`;
  }

  board.innerHTML = checkersContianer;
}
addCheckersBlock();

console.log(board);
