import { useContext } from "react";
import { BoardPartContext } from "../App";

function ShowLegalMove({ block, handleMovePiece, handleRemovePiece }) {
  const boardContext = useContext(BoardPartContext);
  let content = "";

  if (block.color === "black") {
    if (boardContext.pieces[boardContext.activePiece] !== undefined) {
      if (block.isFilled === false) {
        if (boardContext.pieces[boardContext.activePiece].isKing === true) {
          if (
            block.num === boardContext.activePiece - 7 ||
            block.num === boardContext.activePiece - 9 ||
            block.num === boardContext.activePiece + 7 ||
            block.num === boardContext.activePiece + 9
          ) {
            content = (
              <span className="legal--move" onClick={handleMovePiece}></span>
            );
          }
        } else if (
          boardContext.pieces[boardContext.activePiece].isKing === false
        ) {
          if (boardContext.pieces[boardContext.activePiece].color === "red") {
            if (
              block.num === boardContext.activePiece + 7 ||
              block.num === boardContext.activePiece + 9
            ) {
              content = (
                <span className="legal--move" onClick={handleMovePiece}></span>
              );
            }
          } else if (
            boardContext.pieces[boardContext.activePiece].color === "black"
          ) {
            if (
              block.num === boardContext.activePiece - 7 ||
              block.num === boardContext.activePiece - 9
            ) {
              content = (
                <span className="legal--move" onClick={handleMovePiece}></span>
              );
            }
          }
        }
      } else if (block.isFilled === true) {
        if (
          boardContext.pieces[block.num].color ===
          boardContext.pieces[boardContext.activePiece].color
        )
          return;

        if (boardContext.pieces[boardContext.activePiece].isKing === true) {
          if (
            (block.num === boardContext.activePiece + 7 &&
              boardContext.blocks[boardContext.activePiece + 14 - 1]
                .isFilled === false) ||
            (block.num === boardContext.activePiece + 9 &&
              boardContext.blocks[boardContext.activePiece + 18 - 1]
                .isFilled === false) ||
            (block.num === boardContext.activePiece - 7 &&
              boardContext.blocks[boardContext.activePiece - 14 - 1]
                .isFilled === false) ||
            (block.num === boardContext.activePiece - 9 &&
              boardContext.blocks[boardContext.activePiece - 18 - 1]
                .isFilled === false)
          ) {
            content = (
              <span
                className="legal--move kick--enemy"
                onClick={handleRemovePiece}
              ></span>
            );
          }
        } else if (
          boardContext.pieces[boardContext.activePiece].isKing === false
        ) {
          if (boardContext.pieces[boardContext.activePiece].color === "red") {
            if (
              boardContext.blocks[boardContext.activePiece + 14 - 1].color !==
              "white"
            ) {
              if (
                block.num === boardContext.activePiece + 7 &&
                boardContext.blocks[boardContext.activePiece + 14 - 1]
                  .isFilled === false
              ) {
                content = (
                  <span
                    className="legal--move kick--enemy"
                    onClick={handleRemovePiece}
                  ></span>
                );
              }
            }

            if (
              boardContext.blocks[boardContext.activePiece + 18 - 1].color !==
              "white"
            ) {
              if (
                block.num === boardContext.activePiece + 9 &&
                boardContext.blocks[boardContext.activePiece + 18 - 1]
                  .isFilled === false
              ) {
                content = (
                  <span
                    className="legal--move kick--enemy"
                    onClick={handleRemovePiece}
                  ></span>
                );
              }
            }
          } else if (
            boardContext.pieces[boardContext.activePiece].color === "black"
          ) {
            if (
              boardContext.blocks[boardContext.activePiece - 14 - 1].color !==
              "white"
            ) {
              if (
                block.num === boardContext.activePiece - 7 &&
                boardContext.blocks[boardContext.activePiece - 14 - 1]
                  .isFilled === false
              ) {
                content = (
                  <span
                    className="legal--move kick--enemy"
                    onClick={handleRemovePiece}
                  ></span>
                );
              }
            }

            if (
              boardContext.blocks[boardContext.activePiece - 18 - 1].color !==
              "white"
            ) {
              if (
                block.num === boardContext.activePiece - 9 &&
                boardContext.blocks[boardContext.activePiece - 18 - 1]
                  .isFilled === false
              ) {
                content = (
                  <span
                    className="legal--move kick--enemy"
                    onClick={handleRemovePiece}
                  ></span>
                );
              }
            }
          }
        }
      }
    }
  }

  return content;
}

function Piece({ block }) {
  const boardContext = useContext(BoardPartContext);

  function handleMakeActive() {
    // only player who his turn is should play
    if (boardContext.playerTurn !== boardContext.pieces[block.num].color)
      return;

    let newObj = boardContext.pieces;
    let PieceKeys = Object.keys(boardContext.pieces);
    // after each click i want to have only one active piece
    for (let i = 0; i < PieceKeys.length; i++) {
      newObj[PieceKeys[i]].isActive = false;
    }
    newObj[block.num].isActive = true;

    boardContext.setPieces({ ...newObj });
    boardContext.setActivePiece(block.num);
  }

  function handleMovePiece() {
    // making a new blocks array
    let newPieceObj = boardContext.pieces;
    newPieceObj[block.num] = {
      ...newPieceObj[boardContext.activePiece],
      isActive: false,
    };
    delete newPieceObj[boardContext.activePiece];
    boardContext.setPieces({ ...newPieceObj });
    // making a new pieces object
    let newBlockArray = boardContext.blocks;
    newBlockArray[boardContext.activePiece - 1].isFilled = false;
    newBlockArray[block.num - 1].isFilled = true;
    boardContext.setBlocks([...newBlockArray]);
    // now there is no selected piece
    boardContext.setActivePiece("");
    // change turn
    boardContext.setPlayerTurn(
      boardContext.playerTurn === "red" ? "black" : "red"
    );
  }

  function handleCheckWinner() {
    const piecesNumbers = { red: 0, black: 0 };
    const piecesValues = Object.values(boardContext.pieces);

    for (var i = 0; i < piecesValues.length; i++) {
      if (piecesValues[i].color === "black") {
        piecesNumbers.black += 1;
      } else {
        piecesNumbers.red += 1;
      }
    }

    if (piecesNumbers.red === 0 || piecesNumbers.black === 0) {
      alert("we have winnner");
    }
  }

  function handleRemovePiece() {
    let newBlockNum = 0;
    if (boardContext.playerTurn === "red") {
      newBlockNum =
        boardContext.activePiece +
        2 * Math.abs(boardContext.activePiece - block.num);
    } else {
      newBlockNum =
        boardContext.activePiece -
        2 * Math.abs(boardContext.activePiece - block.num);
    }

    // making a new blocks array
    let newPieceObj = boardContext.pieces;
    newPieceObj[newBlockNum] = {
      ...newPieceObj[boardContext.activePiece],
      isActive: false,
    };
    delete newPieceObj[boardContext.activePiece];
    delete newPieceObj[block.num];
    boardContext.setPieces({ ...newPieceObj });

    // making a new pieces object
    let newBlockArray = boardContext.blocks;
    newBlockArray[boardContext.activePiece - 1].isFilled = false;
    newBlockArray[block.num - 1].isFilled = false;
    newBlockArray[newBlockNum - 1].isFilled = true;
    boardContext.setBlocks([...newBlockArray]);
    // now there is no selected piece
    boardContext.setActivePiece("");
    // change turn
    boardContext.setPlayerTurn(
      boardContext.playerTurn === "red" ? "black" : "red"
    );

    handleCheckWinner();
  }

  return (
    <div className={`block block--${block.color}`}>
      <span style={{ position: "absolute", top: "0", left: "0" }}>
        {block.num}
      </span>

      <ShowLegalMove
        block={block}
        handleMovePiece={handleMovePiece}
        handleRemovePiece={handleRemovePiece}
      />

      {block.isFilled && (
        <span
          onClick={handleMakeActive}
          className={`pieces piece--${boardContext.pieces[block.num].color} ${
            boardContext.pieces[block.num].isActive === true
              ? "piece--active"
              : ""
          }`}
        ></span>
      )}
    </div>
  );
}

export default function Board() {
  const boardContext = useContext(BoardPartContext);

  return (
    <div className={"board"}>
      {boardContext.blocks.map((block, index) => {
        return <Piece key={index} block={block} />;
      })}
    </div>
  );
}
