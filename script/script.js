const board = document.querySelector(".board");
const whiteBlock = new Set([
  1, 3, 5, 7, 10, 12, 14, 16, 17, 19, 21, 23, 26, 28, 30, 32, 33, 35, 37, 39,
  42, 44, 46, 48, 49, 51, 53, 55, 58, 60, 62, 64,
]);

function addCheckersBlock() {
  let checkersContianer = "";

  for (var i = 1; i <= 64; i++) {
    let spanValue = "";

    if (i <= 24 && !whiteBlock.has(i)) {
      spanValue = `<span pieceNum="${i}" class="piece redPiece"></span>`;
    } else if (i >= 41 && !whiteBlock.has(i)) {
      spanValue = `<span pieceNum="${i}" class="piece blackPiece"></span>`;
    }

    checkersContianer += `<span isPieceInBlock="${
      (i <= 24 || i >= 41) && !whiteBlock.has(i) ? true : false
    }" blockNum="${i}" class="box ${
      whiteBlock.has(i) ? "whiteBlock" : "blackBlock"
    }">${spanValue} ${i}</span>`;
  }

  board.innerHTML = checkersContianer;
}
addCheckersBlock();

const pieces = document.querySelectorAll(".piece");
const blackBlocks = document.querySelectorAll(".blackBlock");
let blackBlockObj = {};

blackBlocks.forEach((currentValue) => {
  blackBlockObj[currentValue.getAttribute("blockNum")] = currentValue;
});

pieces.forEach(makeClickAble);

function makeClickAble(currentValue) {
  currentValue.addEventListener("click", () => {
    showLegalMove(currentValue);
  });
}

function showLegalMove(currentValue) {
  let pieceNum = Number(currentValue.getAttribute("pieceNum"));
  let legalBlocks = [
    blackBlockObj[pieceNum + 7],
    blackBlockObj[pieceNum - 7],
    blackBlockObj[pieceNum + 9],
    blackBlockObj[pieceNum - 9],
  ];

  for (let member of legalBlocks) {
    if (member === undefined) continue;

    if (member.getAttribute("isPieceInBlock") === "false") {
      console.log(member);
    }
  }
}
