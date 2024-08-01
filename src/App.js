import Board from "./project-files/Board";
import Page from "./project-files/Page";
import { createContext, useState } from "react";

export let BoardPartContext = createContext("");

function App() {
  const [activePiece, setActivePiece] = useState('');

  const [blocks, setBlocks] = useState([
    { num: 1, color: "white", isFilled: false },
    { num: 2, color: "black", isFilled: true },
    { num: 3, color: "white", isFilled: false },
    { num: 4, color: "black", isFilled: true },
    { num: 5, color: "white", isFilled: false },
    { num: 6, color: "black", isFilled: true },
    { num: 7, color: "white", isFilled: false },
    { num: 8, color: "black", isFilled: true },
    { num: 9, color: "black", isFilled: true },
    { num: 10, color: "white", isFilled: false },
    { num: 11, color: "black", isFilled: true },
    { num: 12, color: "white", isFilled: false },
    { num: 13, color: "black", isFilled: true },
    { num: 14, color: "white", isFilled: false },
    { num: 15, color: "black", isFilled: true },
    { num: 16, color: "white", isFilled: false },
    { num: 17, color: "white", isFilled: false },
    { num: 18, color: "black", isFilled: true },
    { num: 19, color: "white", isFilled: false },
    { num: 20, color: "black", isFilled: true },
    { num: 21, color: "white", isFilled: false },
    { num: 22, color: "black", isFilled: true },
    { num: 23, color: "white", isFilled: false },
    { num: 24, color: "black", isFilled: true },
    { num: 25, color: "black", isFilled: false },
    { num: 26, color: "white", isFilled: false },
    { num: 27, color: "black", isFilled: false },
    { num: 28, color: "white", isFilled: false },
    { num: 29, color: "black", isFilled: false },
    { num: 30, color: "white", isFilled: false },
    { num: 31, color: "black", isFilled: false },
    { num: 32, color: "white", isFilled: false },
    { num: 33, color: "white", isFilled: false },
    { num: 34, color: "black", isFilled: false },
    { num: 35, color: "white", isFilled: false },
    { num: 36, color: "black", isFilled: false },
    { num: 37, color: "white", isFilled: false },
    { num: 38, color: "black", isFilled: false },
    { num: 39, color: "white", isFilled: false },
    { num: 40, color: "black", isFilled: false },
    { num: 41, color: "black", isFilled: true },
    { num: 42, color: "white", isFilled: false },
    { num: 43, color: "black", isFilled: true },
    { num: 44, color: "white", isFilled: false },
    { num: 45, color: "black", isFilled: true },
    { num: 46, color: "white", isFilled: false },
    { num: 47, color: "black", isFilled: true },
    { num: 48, color: "white", isFilled: false },
    { num: 49, color: "white", isFilled: false },
    { num: 50, color: "black", isFilled: true },
    { num: 51, color: "white", isFilled: false },
    { num: 52, color: "black", isFilled: true },
    { num: 53, color: "white", isFilled: false },
    { num: 54, color: "black", isFilled: true },
    { num: 55, color: "white", isFilled: false },
    { num: 56, color: "black", isFilled: true },
    { num: 57, color: "black", isFilled: true },
    { num: 58, color: "white", isFilled: false },
    { num: 59, color: "black", isFilled: true },
    { num: 60, color: "white", isFilled: false },
    { num: 61, color: "black", isFilled: true },
    { num: 62, color: "white", isFilled: false },
    { num: 63, color: "black", isFilled: true },
    { num: 64, color: "white", isFilled: false },
  ]);

  const [pieces, setPieces] = useState({
    2: { color: "red", isActive: false, isKing: false },
    4: { color: "red", isActive: false, isKing: false },
    6: { color: "red", isActive: false, isKing: false },
    8: { color: "red", isActive: false, isKing: false },
    9: { color: "red", isActive: false, isKing: false },
    11: { color: "red", isActive: false, isKing: false },
    13: { color: "red", isActive: false, isKing: false },
    15: { color: "red", isActive: false, isKing: false },
    18: { color: "red", isActive: false, isKing: false },
    20: { color: "red", isActive: false, isKing: false },
    22: { color: "red", isActive: false, isKing: false },
    24: { color: "red", isActive: false, isKing: false },
    41: { color: "black", isActive: false, isKing: false },
    43: { color: "black", isActive: false, isKing: false },
    45: { color: "black", isActive: false, isKing: false },
    47: { color: "black", isActive: false, isKing: false },
    50: { color: "black", isActive: false, isKing: false },
    52: { color: "black", isActive: false, isKing: false },
    54: { color: "black", isActive: false, isKing: false },
    56: { color: "black", isActive: false, isKing: false },
    57: { color: "black", isActive: false, isKing: false },
    59: { color: "black", isActive: false, isKing: false },
    61: { color: "black", isActive: false, isKing: false },
    63: { color: "black", isActive: false, isKing: false },
  });

  console.log("refresh")
  return (
    <BoardPartContext.Provider
      value={{
        blocks: blocks,
        setBlocks: setBlocks,
        pieces: pieces,
        setPieces: setPieces,
        activePiece: activePiece,
        setActivePiece: setActivePiece
      }}
    >
      <Page>
        <Board />
      </Page>
    </BoardPartContext.Provider>
  );
}

export default App;
