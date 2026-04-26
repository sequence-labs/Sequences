import { gridlockWordSet } from "../content/gridlockWords.js";

export const GRIDLOCK_MODES = [
  {
    id: "classic",
    name: "Classic",
    description: "Create words from the letter grid.",
    timed: false
  },
  {
    id: "rush",
    name: "Rush",
    description: "Get the highest score in 2 minutes.",
    timed: true,
    duration: 120
  },
  {
    id: "timeTrial",
    name: "Time Trial",
    description: "Start with 30 seconds and earn bonus time.",
    timed: true,
    duration: 30
  },
  {
    id: "inferno",
    name: "Inferno",
    description: "20 seconds and only 3 wrong guesses.",
    timed: true,
    duration: 20
  }
];

const vowels = {
  E: 12.02,
  A: 8.12,
  O: 7.68,
  I: 7.31,
  U: 2.88
};

const consonants = {
  T: 9.1,
  N: 6.95,
  S: 6.28,
  R: 6.02,
  H: 5.92,
  D: 4.32,
  L: 3.98,
  C: 2.71,
  M: 2.61,
  F: 2.3,
  P: 2.09,
  G: 2.03,
  V: 0.98,
  K: 0.77,
  X: 0.15,
  J: 0.1,
  Z: 0.07,
  B: 1.49,
  Y: 0.02
};

function makeId(prefix = "tile") {
  return `${prefix}-${Math.random().toString(36).slice(2)}-${Date.now().toString(36)}`;
}

function pickWeighted(pool, usedLetters) {
  const entries = Object.entries(pool).filter(([letter]) => !usedLetters.has(letter));
  const choices = entries.length ? entries : Object.entries(pool);
  const total = choices.reduce((sum, [, weight]) => sum + weight, 0);
  let cursor = Math.random() * total;

  for (const [letter, weight] of choices) {
    cursor -= weight;
    if (cursor <= 0) {
      usedLetters.add(letter);
      return letter;
    }
  }

  return choices[0]?.[0] || "E";
}

function randomPositions(max, count) {
  const positions = new Set();
  while (positions.size < count) {
    positions.add(Math.floor(Math.random() * max));
  }
  return positions;
}

export function createGridlockGame({ mode = "classic", gridSize = 3 } = {}) {
  const safeGridSize = Math.min(Math.max(gridSize, 3), 4);
  const modeConfig = GRIDLOCK_MODES.find((item) => item.id === mode) || GRIDLOCK_MODES[0];

  return {
    tiles: createGridlockBoard(safeGridSize),
    selectedIds: [],
    score: 0,
    gridSize: safeGridSize,
    mode: modeConfig.id,
    timeRemaining: modeConfig.duration || 0,
    elapsedTime: 0,
    mistakesRemaining: 3,
    isGameOver: false,
    message: "Select letters to build a word.",
    lastWord: "",
    lastWordScore: 0,
    showBonusTime: false,
    lastBonusAmount: 0,
    wordsFound: []
  };
}

export function createGridlockBoard(gridSize) {
  const totalTiles = gridSize * gridSize;
  const requiredVowels = Math.max(3, Math.floor(totalTiles * 0.3));
  const vowelPositions = randomPositions(totalTiles, requiredVowels);
  const maxOccurrence = Math.max(2, Math.floor(totalTiles / 6));
  const usedLetters = new Set();
  const counts = new Map();
  const tiles = [];

  for (let index = 0; index < totalTiles; index += 1) {
    const pool = vowelPositions.has(index) ? vowels : consonants;
    let letter = pickWeighted(pool, usedLetters);
    let attempts = 0;

    while ((counts.get(letter) || 0) >= maxOccurrence && attempts < 20) {
      letter = pickWeighted(pool, usedLetters);
      attempts += 1;
    }

    counts.set(letter, (counts.get(letter) || 0) + 1);
    tiles.push({
      id: makeId(),
      letter,
      isSelected: false,
      turnCount: 0,
      isVowel: Object.prototype.hasOwnProperty.call(vowels, letter)
    });
  }

  return tiles;
}

export function gridlockCurrentWord(game) {
  return game.selectedIds
    .map((id) => game.tiles.find((tile) => tile.id === id)?.letter || "")
    .join("");
}

export function toggleGridlockTile(game, tileId) {
  if (game.isGameOver) return game;
  const isSelected = game.selectedIds.includes(tileId);
  const selectedIds = isSelected
    ? game.selectedIds.filter((id) => id !== tileId)
    : [...game.selectedIds, tileId];

  return {
    ...game,
    selectedIds,
    tiles: game.tiles.map((tile) => ({
      ...tile,
      isSelected: selectedIds.includes(tile.id)
    })),
    message: selectedIds.length ? "Submit the selected letters when they make a word." : "Select letters to build a word."
  };
}

export function clearGridlockSelection(game) {
  return {
    ...game,
    selectedIds: [],
    tiles: game.tiles.map((tile) => ({ ...tile, isSelected: false })),
    message: game.isGameOver ? game.message : "Selection cleared."
  };
}

function calculateWordScore(wordLength, gridSize) {
  const sizeMultiplier = gridSize / 3;
  switch (wordLength) {
    case 5:
      return Math.floor(7 * sizeMultiplier);
    case 6:
      return Math.floor(8 * sizeMultiplier);
    case 7:
      return Math.floor(9 * sizeMultiplier);
    case 8:
      return Math.floor(10 * sizeMultiplier);
    case 9:
      return Math.floor(20 * sizeMultiplier);
    default:
      return wordLength > 9 ? Math.floor((20 + (wordLength - 9) * 5) * sizeMultiplier) : wordLength;
  }
}

function calculateTimeBonus(wordLength) {
  if (wordLength === 2) return 2;
  if (wordLength === 3) return 3;
  if (wordLength === 4) return 5;
  if (wordLength === 5) return 7;
  if (wordLength === 6) return 9;
  if (wordLength === 7) return 12;
  if (wordLength === 8) return 15;
  return wordLength >= 9 ? 20 : wordLength;
}

function replaceSelectedTiles(tiles, selectedIds, gridSize) {
  const selectedSet = new Set(selectedIds);
  const totalVowelsNeeded = Math.max(3, Math.floor((gridSize * gridSize) * 0.3));
  const remainingVowels = tiles.filter((tile) => !selectedSet.has(tile.id) && tile.isVowel).length;
  let vowelsToAdd = Math.max(0, totalVowelsNeeded - remainingVowels);
  const usedLetters = new Set(tiles.filter((tile) => !selectedSet.has(tile.id)).map((tile) => tile.letter));

  return tiles.map((tile) => {
    if (!selectedSet.has(tile.id)) return tile;
    const needsVowel = vowelsToAdd > 0;
    if (needsVowel) vowelsToAdd -= 1;
    const letter = pickWeighted(needsVowel ? vowels : consonants, usedLetters);
    return {
      id: makeId(),
      letter,
      isSelected: false,
      turnCount: 0,
      isVowel: Object.prototype.hasOwnProperty.call(vowels, letter)
    };
  });
}

function updateTurnCounts(tiles, selectedIds) {
  const selectedSet = new Set(selectedIds);
  return tiles.map((tile) => ({
    ...tile,
    turnCount: selectedSet.has(tile.id) ? 0 : tile.turnCount + 1
  }));
}

function shouldEndFromTurnCounts(mode, tiles, selectedIds) {
  const selectedSet = new Set(selectedIds);
  if (mode === "classic") {
    return tiles.some((tile) => tile.turnCount >= 4 && !selectedSet.has(tile.id));
  }
  return tiles.some((tile) => tile.turnCount >= 4);
}

export function submitGridlockWord(game) {
  if (game.isGameOver) return game;

  const word = gridlockCurrentWord(game);
  if (game.selectedIds.length < 2) {
    const mistakesRemaining = game.mode === "inferno" ? game.mistakesRemaining - 1 : game.mistakesRemaining;
    return {
      ...game,
      mistakesRemaining,
      isGameOver: mistakesRemaining <= 0,
      message: mistakesRemaining <= 0 ? "Inferno ended. You ran out of mistakes." : "Select at least two letters."
    };
  }

  if (!gridlockWordSet.has(word)) {
    const mistakesRemaining = game.mode === "inferno" ? game.mistakesRemaining - 1 : game.mistakesRemaining;
    return {
      ...game,
      mistakesRemaining,
      isGameOver: mistakesRemaining <= 0,
      message: mistakesRemaining <= 0 ? "Inferno ended. You ran out of mistakes." : `${word} is not in the word list.`
    };
  }

  const wordScore = calculateWordScore(word.length, game.gridSize);
  const tilesWithTurns = updateTurnCounts(game.tiles, game.selectedIds);
  const isTurnGameOver = shouldEndFromTurnCounts(game.mode, tilesWithTurns, game.selectedIds);
  const bonus = game.mode === "timeTrial" ? calculateTimeBonus(word.length) : 0;
  const nextTime = game.mode === "inferno" ? 20 : game.timeRemaining + bonus;

  return {
    ...game,
    tiles: replaceSelectedTiles(tilesWithTurns, game.selectedIds, game.gridSize),
    selectedIds: [],
    score: game.score + wordScore,
    timeRemaining: nextTime,
    isGameOver: isTurnGameOver,
    message: isTurnGameOver ? "Game over. A tile stayed too long on the board." : `${word} scored ${wordScore}.`,
    lastWord: word,
    lastWordScore: wordScore,
    showBonusTime: bonus > 0,
    lastBonusAmount: bonus,
    wordsFound: [...game.wordsFound, word]
  };
}

export function tickGridlockGame(game, deltaSeconds) {
  if (game.isGameOver) return game;
  const modeConfig = GRIDLOCK_MODES.find((item) => item.id === game.mode);
  const elapsedTime = game.elapsedTime + deltaSeconds;

  if (!modeConfig?.timed) {
    return { ...game, elapsedTime };
  }

  const timeRemaining = Math.max(0, game.timeRemaining - deltaSeconds);
  return {
    ...game,
    elapsedTime,
    timeRemaining,
    isGameOver: timeRemaining <= 0,
    message: timeRemaining <= 0 ? "Time is up." : game.message
  };
}
