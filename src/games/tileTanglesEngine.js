export const TILE_TANGLES_MODES = [
  {
    id: "classic",
    name: "Classic",
    description: "Take your time to solve the puzzle."
  },
  {
    id: "timeAttack",
    name: "Time Attack",
    description: "Race against the clock to arrange the words.",
    timeLimit: 180
  },
  {
    id: "perfectionist",
    name: "Perfectionist",
    description: "Complete the puzzle with minimal moves.",
    moveLimit: 25
  }
];

const wordHintPairs = [
  ["APPLE", "A round fruit with red or green skin."],
  ["ALIVE", "Being full of life and energy."],
  ["ANGEL", "A spiritual being often depicted with wings."],
  ["ALARM", "A device that makes a loud noise to wake you up."],
  ["ACORN", "A small nut that comes from an oak tree."],
  ["APRON", "A protective garment worn while cooking."],
  ["ANKLE", "The joint connecting your foot to your leg."],
  ["ALIEN", "A creature from another planet."],
  ["ARROW", "A thin, pointed stick shot from a bow."],
  ["BEACH", "A sandy shore by the ocean."],
  ["BRAVE", "Not afraid to face challenges."],
  ["BRUSH", "An object used to clean or style hair."],
  ["BRICK", "A rectangular building block made of clay."],
  ["BROOM", "A tool used for sweeping the floor."],
  ["BADGE", "A small emblem that shows identity or rank."],
  ["BAKER", "A person who makes delicious baked goods."],
  ["BEARD", "Hair that grows on a man's face."],
  ["CLOUD", "White fluffy thing in the sky."],
  ["CANDY", "Sweet treats that you love to eat."],
  ["CHEER", "Shouting to show happiness and support."],
  ["COUCH", "A comfy piece of furniture for sitting."],
  ["CLIMB", "To go up something, like a tree or a mountain."],
  ["CROWD", "A large group of people gathered together."],
  ["CURVE", "A line that gently bends or arches."],
  ["CLOCK", "A device that tells you the time."],
  ["DAISY", "A simple flower with white petals and a yellow center."],
  ["DANCE", "Moving your body to music."],
  ["DREAM", "A story your mind creates while you sleep."],
  ["DIRTY", "When something is covered in mud or dust."],
  ["DRAPE", "A piece of cloth hung over something."],
  ["DRIVE", "Operating a vehicle to go somewhere."],
  ["DRINK", "What you do when you're thirsty."],
  ["EARTH", "The planet we live on."],
  ["EMAIL", "A message you send using the computer."],
  ["EAGLE", "A big bird that soars high in the sky."],
  ["EARLY", "Before the expected or usual time."],
  ["ELBOW", "The bend in the middle of your arm."],
  ["EMPTY", "Having nothing inside."],
  ["ENJOY", "To take pleasure in something."],
  ["ERASE", "To remove something you've written."],
  ["EVENT", "A happening or occurrence."],
  ["EXACT", "Precise and accurate."],
  ["FRUIT", "Delicious and healthy things to eat."],
  ["FAIRY", "A tiny magical creature with wings."],
  ["FLAME", "The hot, glowing thing on a candle."],
  ["FUNNY", "Something that makes you laugh."],
  ["FLOCK", "A group of birds flying together."],
  ["FLOAT", "To stay on the surface of water."],
  ["FLUFF", "Soft and light pieces of material."],
  ["FROWN", "Turning your mouth downward to show unhappiness."],
  ["FRAME", "A structure that holds a picture or mirror."],
  ["FROST", "Ice crystals that form on cold surfaces."],
  ["GLOBE", "A model of the Earth."],
  ["GRAPE", "A small round fruit you can eat."],
  ["GRASS", "The green stuff that grows in your yard."],
  ["HEART", "The organ that pumps blood."],
  ["HAPPY", "Feeling full of joy."],
  ["HORSE", "A big animal you can ride."],
  ["LIGHT", "The thing that lets you see in the dark."],
  ["MUSIC", "Sounds that make you want to dance."],
  ["MAGIC", "The power to make impossible things happen."],
  ["NIGHT", "The time when the sun is down."],
  ["OCEAN", "A big body of saltwater."],
  ["PEACE", "A state of calm and quiet."],
  ["QUEEN", "A woman who rules a kingdom."],
  ["QUIET", "When it's very silent."],
  ["SMILE", "A happy expression on your face."],
  ["SUNNY", "When the sky is clear and bright."],
  ["TABLE", "A piece of furniture for eating or working."],
  ["TIGER", "A big cat with orange fur and black stripes."],
  ["WATER", "Clear liquid that you drink."],
  ["YOUNG", "Not old."]
];

const adjacentPositions = {
  0: [1, 5],
  1: [0, 2, 6],
  2: [1, 3, 7],
  3: [2, 4, 8],
  4: [3, 9],
  5: [0, 6, 10],
  6: [1, 5, 7, 11],
  7: [2, 6, 8, 12],
  8: [3, 7, 9, 13],
  9: [4, 8, 14],
  10: [5, 11, 15],
  11: [6, 10, 12, 16],
  12: [7, 11, 13, 17],
  13: [8, 12, 14, 18],
  14: [9, 13, 19],
  15: [10, 16],
  16: [11, 15, 17],
  17: [12, 16, 18],
  18: [13, 17, 19],
  19: [14, 18]
};

function makeId(prefix = "tangle") {
  return `${prefix}-${Math.random().toString(36).slice(2)}-${Date.now().toString(36)}`;
}

function shuffle(items) {
  const next = [...items];
  for (let index = next.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [next[index], next[swapIndex]] = [next[swapIndex], next[index]];
  }
  return next;
}

function pickWordPair() {
  const first = wordHintPairs[Math.floor(Math.random() * wordHintPairs.length)];
  let second = wordHintPairs[Math.floor(Math.random() * wordHintPairs.length)];
  while (second[0] === first[0]) {
    second = wordHintPairs[Math.floor(Math.random() * wordHintPairs.length)];
  }
  return {
    words: [first[0], second[0]],
    hints: [first[1], second[1]]
  };
}

function randomVisibleEmptyPositions() {
  const positions = shuffle([...Array.from({ length: 5 }, (_, index) => index), ...Array.from({ length: 5 }, (_, index) => index + 15)]);
  return new Set(positions.slice(0, 2));
}

function generateTiles(pair) {
  const positions = shuffle(Array.from({ length: 10 }, (_, index) => index + 5));
  return [...pair.words[0], ...pair.words[1]].map((letter, index) => ({
    id: makeId(),
    letter,
    position: positions[index],
    isSelected: false
  }));
}

export function createTileTanglesGame({ mode = "classic" } = {}) {
  const modeConfig = TILE_TANGLES_MODES.find((item) => item.id === mode) || TILE_TANGLES_MODES[0];
  const pair = pickWordPair();
  return {
    mode: modeConfig.id,
    currentWordPair: pair,
    tiles: generateTiles(pair),
    emptyPositions: new Set([...Array.from({ length: 5 }, (_, index) => index), ...Array.from({ length: 5 }, (_, index) => index + 15)]),
    visibleEmptyPositions: randomVisibleEmptyPositions(),
    selectedTileId: null,
    draggedTileId: null,
    validDropPositions: new Set(),
    moveCount: 0,
    elapsedTime: modeConfig.timeLimit || 0,
    score: 0,
    stars: 5,
    hintsUsed: 0,
    showingHint: false,
    hintText: "",
    isGameOver: false,
    gameOverReason: "completed",
    message: "Move tiles into two five-letter words."
  };
}

export function getTileAtPosition(game, position) {
  return game.tiles.find((tile) => tile.position === position);
}

export function tileTanglesWords(game) {
  const firstWord = [5, 6, 7, 8, 9].map((position) => getTileAtPosition(game, position)?.letter || "").join("");
  const secondWord = [10, 11, 12, 13, 14].map((position) => getTileAtPosition(game, position)?.letter || "").join("");
  return { firstWord, secondWord };
}

export function getValidTileTanglesMoves(game, fromPosition) {
  const adjacent = adjacentPositions[fromPosition] || [];
  return new Set(adjacent.filter((position) => game.emptyPositions.has(position) && game.visibleEmptyPositions.has(position)));
}

export function selectTileTangle(game, tileId) {
  if (game.isGameOver) return game;
  const tile = game.tiles.find((item) => item.id === tileId);
  if (!tile) return game;
  return {
    ...game,
    selectedTileId: tileId,
    validDropPositions: getValidTileTanglesMoves(game, tile.position),
    tiles: game.tiles.map((item) => ({ ...item, isSelected: item.id === tileId })),
    message: "Move the selected tile into a glowing empty slot."
  };
}

export function startTileTanglesDrag(game, tileId) {
  const selected = selectTileTangle(game, tileId);
  return { ...selected, draggedTileId: tileId };
}

function updateStars(game, nextMoveCount = game.moveCount) {
  if (game.mode === "timeAttack") {
    if (game.elapsedTime > 150) return 5;
    if (game.elapsedTime > 120) return 4;
    if (game.elapsedTime > 90) return 3;
    if (game.elapsedTime > 60) return 2;
    return 1;
  }
  if (nextMoveCount <= 10) return 5;
  if (nextMoveCount <= 15) return 4;
  if (nextMoveCount <= 20) return 3;
  if (nextMoveCount <= 25) return 2;
  return 1;
}

function calculateScore(game, stars) {
  let baseScore = 100;
  if (game.mode === "classic") {
    baseScore -= Math.floor(game.elapsedTime / 30);
    baseScore -= Math.floor(game.moveCount / 2);
  } else if (game.mode === "timeAttack") {
    baseScore += Math.floor(game.elapsedTime * 2);
    baseScore -= Math.floor(game.moveCount / 4);
  } else if (game.mode === "perfectionist") {
    baseScore += Math.max(0, (25 - game.moveCount) * 10);
    baseScore -= Math.floor(game.elapsedTime / 60);
  }
  return Math.max(0, baseScore + stars * 20);
}

function checkWin(game) {
  const { firstWord, secondWord } = tileTanglesWords(game);
  const [targetOne, targetTwo] = game.currentWordPair.words;
  return (firstWord === targetOne && secondWord === targetTwo) || (firstWord === targetTwo && secondWord === targetOne);
}

export function moveTileTangle(game, toPosition) {
  if (game.isGameOver || !game.selectedTileId) return game;
  const tile = game.tiles.find((item) => item.id === game.selectedTileId);
  if (!tile || !game.validDropPositions.has(toPosition)) {
    return { ...game, draggedTileId: null, message: "That tile cannot move there." };
  }

  const oldPosition = tile.position;
  const nextMoveCount = game.moveCount + 1;
  const nextTiles = game.tiles.map((item) => item.id === tile.id ? { ...item, position: toPosition, isSelected: false } : { ...item, isSelected: false });
  const visibleEmptyPositions = new Set(game.visibleEmptyPositions);
  if (visibleEmptyPositions.has(toPosition)) {
    visibleEmptyPositions.delete(toPosition);
    visibleEmptyPositions.add(oldPosition);
  }
  const nextGame = {
    ...game,
    tiles: nextTiles,
    emptyPositions: new Set([...Array.from(game.emptyPositions).filter((position) => position !== toPosition), oldPosition]),
    visibleEmptyPositions,
    selectedTileId: null,
    draggedTileId: null,
    validDropPositions: new Set(),
    moveCount: nextMoveCount,
    stars: updateStars(game, nextMoveCount),
    message: "Nice move. Keep untangling."
  };

  if (checkWin(nextGame)) {
    const stars = updateStars(nextGame, nextMoveCount);
    return {
      ...nextGame,
      stars,
      score: calculateScore(nextGame, stars),
      isGameOver: true,
      gameOverReason: "completed",
      message: `Solved in ${nextMoveCount} moves.`
    };
  }

  if (nextGame.mode === "perfectionist" && nextMoveCount >= 25) {
    return {
      ...nextGame,
      isGameOver: true,
      gameOverReason: "movesUp",
      message: "Move limit reached."
    };
  }

  return nextGame;
}

export function requestTileTanglesHint(game) {
  if (game.hintsUsed >= 2 || game.showingHint || game.isGameOver) return game;
  const baseStars = updateStars(game);
  return {
    ...game,
    hintsUsed: game.hintsUsed + 1,
    showingHint: true,
    hintText: game.currentWordPair.hints[game.hintsUsed],
    stars: Math.max(1, baseStars - 1),
    message: "Hint revealed."
  };
}

export function hideTileTanglesHint(game) {
  return { ...game, showingHint: false };
}

export function tickTileTanglesGame(game, deltaSeconds) {
  if (game.isGameOver) return game;
  if (game.mode === "timeAttack") {
    const elapsedTime = Math.max(0, game.elapsedTime - deltaSeconds);
    const nextGame = { ...game, elapsedTime, stars: updateStars({ ...game, elapsedTime }) };
    if (elapsedTime <= 0) {
      return {
        ...nextGame,
        isGameOver: true,
        gameOverReason: "timeUp",
        message: "Time is up."
      };
    }
    return nextGame;
  }
  return { ...game, elapsedTime: game.elapsedTime + deltaSeconds };
}
