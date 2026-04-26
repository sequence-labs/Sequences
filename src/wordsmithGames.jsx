import { useEffect, useMemo, useRef, useState } from "react";
import {
  GRIDLOCK_MODES,
  clearGridlockSelection,
  createGridlockGame,
  gridlockCurrentWord,
  submitGridlockWord,
  tickGridlockGame,
  toggleGridlockTile
} from "./games/gridlockEngine.js";
import {
  TILE_TANGLES_MODES,
  createTileTanglesGame,
  getTileAtPosition,
  getValidTileTanglesMoves,
  hideTileTanglesHint,
  moveTileTangle,
  requestTileTanglesHint,
  selectTileTangle,
  startTileTanglesDrag,
  tickTileTanglesGame,
  tileTanglesWords
} from "./games/tileTanglesEngine.js";

function formatTime(value) {
  const safeValue = Math.max(0, Math.ceil(value));
  const minutes = Math.floor(safeValue / 60);
  const seconds = safeValue % 60;
  return `${minutes}:${String(seconds).padStart(2, "0")}`;
}

function ModePicker({ modes, selectedMode, onSelect }) {
  return (
    <div className="mode-picker" role="list" aria-label="Game modes">
      {modes.map((mode) => (
        <button
          type="button"
          className={selectedMode === mode.id ? "selected" : ""}
          onClick={() => onSelect(mode.id)}
          key={mode.id}
        >
          <span>{mode.name}</span>
          <small>{mode.description}</small>
        </button>
      ))}
    </div>
  );
}

function GameStat({ label, value }) {
  return (
    <div className="arcade-stat">
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

function Stars({ count }) {
  return (
    <div className="stars" aria-label={`${count} star rating`}>
      {Array.from({ length: 5 }, (_, index) => (
        <span className={index < count ? "filled" : ""} key={index}>★</span>
      ))}
    </div>
  );
}

const gridlockTutorialSteps = [
  {
    label: "Step 1",
    title: "Build a word from the grid.",
    copy: "Tap letters in the order you want to spell. The current word updates as you choose tiles.",
    type: "gridlock-select"
  },
  {
    label: "Step 2",
    title: "Submit real words.",
    copy: "A valid word scores points, replaces the used tiles, and clears their warning state.",
    type: "gridlock-submit"
  },
  {
    label: "Step 3",
    title: "Watch unused tiles warm up.",
    copy: "Letters you do not use change from pale yellow to orange to coral. Gray means the board is about to lock.",
    type: "gridlock-warning"
  },
  {
    label: "Step 4",
    title: "Pick the mode pressure.",
    copy: "Classic is survival, Rush is two minutes, Time Trial adds bonus seconds, and Inferno gives only three mistakes.",
    type: "gridlock-modes"
  }
];

const tileTanglesTutorialSteps = [
  {
    label: "Step 1",
    title: "Two words are tangled.",
    copy: "Letters start in the two center rows. The dashed parking slots are the only empty spaces you can move into.",
    type: "tangles-start"
  },
  {
    label: "Step 2",
    title: "Move into a glowing slot.",
    copy: "Tap a tile, then move it into a glowing adjacent parking slot. Other dashed slots only light up when they are reachable.",
    type: "tangles-move"
  },
  {
    label: "Step 3",
    title: "Use hints carefully.",
    copy: "Each puzzle has two hints. A hint reveals clue text but costs one star.",
    type: "tangles-hint"
  },
  {
    label: "Step 4",
    title: "Finish both rows.",
    copy: "Use the parking slots to slide letters around. When the two center rows match the target words, either order counts.",
    type: "tangles-finish"
  }
];

function TutorialVisual({ type }) {
  if (type === "gridlock-warning") {
    return (
      <div className="tutorial-warning-strip" aria-hidden="true">
      {["A", "B", "C", "D", "E"].map((label, index) => (
          <span className={`warning-demo danger-${index}`} key={label}>{label}</span>
        ))}
      </div>
    );
  }

  if (type === "gridlock-modes") {
    return (
      <div className="tutorial-mode-stack" aria-hidden="true">
        {["Classic", "Rush", "Time Trial", "Inferno"].map((mode) => <span key={mode}>{mode}</span>)}
      </div>
    );
  }

  if (type.startsWith("gridlock")) {
    const letters = type === "gridlock-submit" ? ["W", "O", "R", "D"] : ["P", "L", "A", "Y"];
    return (
      <div className="tutorial-gridlock-board" aria-hidden="true">
        {letters.map((letter, index) => (
          <span className={index < 3 ? "selected" : ""} key={`${letter}-${index}`}>{letter}</span>
        ))}
      </div>
    );
  }

  const gap = null;
  const parking = (state = "") => ({ kind: "parking", state });
  const tile = (letter, state = "") => ({ kind: "tile", letter, state });
  const topParkingSlots = [gap, parking(), gap, parking(), gap];
  const noParkingSlots = [gap, gap, gap, gap, gap];
  const tangleCells = {
    "tangles-start": [
      ...topParkingSlots,
      ...["D", "A", "R", "P", "E"].map((letter) => tile(letter)),
      ...["C", "O", "R", "N", "A"].map((letter) => tile(letter)),
      ...noParkingSlots
    ],
    "tangles-move": [
      gap, parking("valid"), gap, parking(), gap,
      tile("D"), tile("A", "selected"), tile("R"), tile("P"), tile("E"),
      ...["C", "O", "R", "N", "A"].map((letter) => tile(letter)),
      ...noParkingSlots
    ],
    "tangles-hint": [
      ...topParkingSlots,
      ...["D", "A", "R", "P", "E"].map((letter) => tile(letter)),
      ...["C", "O", "R", "N", "A"].map((letter) => tile(letter)),
      ...noParkingSlots
    ],
    "tangles-finish": [
      ...topParkingSlots,
      ...["D", "R", "A", "P", "E"].map((letter) => tile(letter)),
      ...["A", "C", "O", "R", "N"].map((letter) => tile(letter)),
      ...noParkingSlots
    ]
  }[type] || [];

  const tangleNote = {
    "tangles-start": "Dashed spots are temporary parking slots, not target letters.",
    "tangles-move": "The selected A can move straight up because that parking slot is adjacent.",
    "tangles-hint": "Hints reveal clue text; the board still moves through the same parking slots.",
    "tangles-finish": "Only the two center rows need to spell the finished words."
  }[type];

  return (
    <div className="tutorial-tangles-demo">
      <div className="tutorial-tangles-board" aria-hidden="true">
        {tangleCells.map((cell, index) => {
          if (!cell) {
            return <span className="void" key={index} />;
          }

          return (
            <span className={`${cell.kind} ${cell.state}`} key={index}>
              {cell.letter}
            </span>
          );
        })}
      </div>
      <p className="tutorial-board-note">{tangleNote}</p>
    </div>
  );
}

function ArcadeTutorialModal({ title, steps, onClose }) {
  const [stepIndex, setStepIndex] = useState(0);
  const activeStep = steps[stepIndex];

  return (
    <div className="modal-backdrop" role="presentation" onClick={onClose}>
      <section className="help-modal arcade-tutorial-modal" role="dialog" aria-modal="true" aria-labelledby="arcade-tutorial-title" onClick={(event) => event.stopPropagation()}>
        <button type="button" className="modal-close" onClick={onClose}>Close</button>
        <h2 id="arcade-tutorial-title">{title}</h2>
        <div className="tutorial-runner">
          <div className="tutorial-copy">
            <p className="eyebrow">{activeStep.label}</p>
            <h3>{activeStep.title}</h3>
            <p>{activeStep.copy}</p>
          </div>
          <div className="tutorial-stage arcade-tutorial-stage">
            <TutorialVisual type={activeStep.type} />
          </div>
          <div className="tutorial-controls">
            <button
              type="button"
              disabled={stepIndex === 0}
              onClick={() => setStepIndex((current) => Math.max(0, current - 1))}
            >
              Back
            </button>
            <span>{stepIndex + 1} / {steps.length}</span>
            <button
              type="button"
              onClick={() => {
                if (stepIndex === steps.length - 1) {
                  onClose();
                } else {
                  setStepIndex((current) => Math.min(steps.length - 1, current + 1));
                }
              }}
            >
              {stepIndex === steps.length - 1 ? "Start playing" : "Next"}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

export function GamesHub({ href }) {
  const games = [
    {
      name: "Sequences",
      eyebrow: "Sliding hidden-word puzzle",
      copy: "Solve clue rows, shift each word, and read the hidden answer down the middle.",
      href: href("gamePage.html")
    },
    {
      name: "Gridlock",
      eyebrow: "Fast word-grid arcade",
      copy: "Chain letters into words across classic, rush, time-trial, and inferno modes.",
      href: href("games/gridlock.html")
    },
    {
      name: "Tile Tangles",
      eyebrow: "Two-word tile rearranger",
      copy: "Slide letter tiles through empty slots until two tangled words snap into place.",
      href: href("games/tile-tangles.html")
    }
  ];

  return (
    <main className="games-hub">
      <section className="games-hero">
        <p className="eyebrow">Eclipse Studios arcade</p>
        <h1>Choose your next word puzzle.</h1>
        <p>Three sharp little games, all playable in the browser and built for quick sessions.</p>
      </section>
      <section className="game-card-grid" aria-label="Playable games">
        {games.map((game, index) => (
          <a className="game-card" href={game.href} key={game.name}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <p>{game.eyebrow}</p>
            <h2>{game.name}</h2>
            <small>{game.copy}</small>
          </a>
        ))}
      </section>
    </main>
  );
}

export function GridlockGame() {
  const [mode, setMode] = useState("classic");
  const [gridSize, setGridSize] = useState(3);
  const [game, setGame] = useState(() => createGridlockGame({ mode: "classic", gridSize: 3 }));
  const [highScore, setHighScore] = useState(() => Number(localStorage.getItem("gridlockHighScore") || 0));
  const [showTutorial, setShowTutorial] = useState(false);
  const currentWord = gridlockCurrentWord(game);
  const modeConfig = GRIDLOCK_MODES.find((item) => item.id === mode);

  function newGame(nextMode = mode, nextGridSize = gridSize) {
    setMode(nextMode);
    setGridSize(nextGridSize);
    setGame(createGridlockGame({ mode: nextMode, gridSize: nextGridSize }));
  }

  useEffect(() => {
    const interval = window.setInterval(() => {
      setGame((current) => tickGridlockGame(current, 0.25));
    }, 250);
    return () => window.clearInterval(interval);
  }, []);

  useEffect(() => {
    if (game.score > highScore) {
      setHighScore(game.score);
      localStorage.setItem("gridlockHighScore", String(game.score));
    }
  }, [game.score, highScore]);

  useEffect(() => {
    if (!game.showBonusTime) return undefined;
    const timeout = window.setTimeout(() => {
      setGame((current) => ({ ...current, showBonusTime: false }));
    }, 1400);
    return () => window.clearTimeout(timeout);
  }, [game.showBonusTime]);

  return (
    <main className="arcade-game-page gridlock-page">
      <section className="arcade-game-header">
        <div>
          <p className="eyebrow">WordSmith port</p>
          <h1>Gridlock</h1>
          <p>Select letters, submit real words, and keep the grid alive before tiles burn out.</p>
        </div>
        <div className="arcade-actions">
          <button type="button" onClick={() => newGame()}>New game</button>
          <button type="button" onClick={() => setGame((current) => clearGridlockSelection(current))}>Clear</button>
        </div>
      </section>

      <section className="arcade-layout">
        <aside className="arcade-control-panel">
          <h2>Mode</h2>
          <ModePicker modes={GRIDLOCK_MODES} selectedMode={mode} onSelect={(nextMode) => newGame(nextMode, gridSize)} />
          <h2>Grid size</h2>
          <div className="segmented-control" aria-label="Grid size">
            {[3, 4].map((size) => (
              <button type="button" className={gridSize === size ? "selected" : ""} onClick={() => newGame(mode, size)} key={size}>
                {size}x{size}
              </button>
            ))}
          </div>
          <button type="button" className="how-to-play-launch" onClick={() => setShowTutorial(true)}>
            How to play
          </button>
        </aside>

        <section className="arcade-play-panel">
          <div className="arcade-stats-row">
            <GameStat label="Score" value={game.score} />
            <GameStat label="High" value={highScore} />
            {modeConfig?.timed && <GameStat label="Time" value={formatTime(game.timeRemaining)} />}
            {mode === "inferno" && <GameStat label="Mistakes" value={game.mistakesRemaining} />}
          </div>

          <div className="current-word-panel">
            <span>Current word</span>
            <strong>{currentWord || "Tap tiles"}</strong>
            {game.showBonusTime && <em>+{game.lastBonusAmount}s</em>}
          </div>

          <div className={`gridlock-board size-${gridSize}`} aria-label="Gridlock board">
            {game.tiles.map((tile) => (
              <button
                type="button"
                className={`gridlock-tile ${tile.isSelected ? "selected" : ""} danger-${Math.min(tile.turnCount, 4)}`}
                onClick={() => setGame((current) => toggleGridlockTile(current, tile.id))}
                disabled={game.isGameOver}
                key={tile.id}
              >
                <span>{tile.letter}</span>
              </button>
            ))}
          </div>

          <div className="arcade-submit-row">
            <button type="button" className="primary-action" onClick={() => setGame((current) => submitGridlockWord(current))} disabled={game.isGameOver}>
              Submit word
            </button>
            <p className={game.isGameOver ? "danger-message" : ""}>{game.message}</p>
          </div>

          {game.isGameOver && (
            <div className="arcade-game-over" role="status">
              <h2>Game Over</h2>
              <p>Final score: {game.score}</p>
              <button type="button" onClick={() => newGame()}>Play again</button>
            </div>
          )}
        </section>
      </section>

      {showTutorial && (
        <ArcadeTutorialModal
          title="How to play Gridlock"
          steps={gridlockTutorialSteps}
          onClose={() => setShowTutorial(false)}
        />
      )}
    </main>
  );
}

export function TileTanglesGame() {
  const boardRef = useRef(null);
  const [mode, setMode] = useState("classic");
  const [game, setGame] = useState(() => createTileTanglesGame({ mode: "classic" }));
  const [showTutorial, setShowTutorial] = useState(false);
  const words = tileTanglesWords(game);
  const modeConfig = TILE_TANGLES_MODES.find((item) => item.id === mode);

  function newGame(nextMode = mode) {
    setMode(nextMode);
    setGame(createTileTanglesGame({ mode: nextMode }));
  }

  function positionFromPointer(event) {
    const element = document.elementFromPoint(event.clientX, event.clientY)?.closest("[data-tangle-position]");
    return element ? Number(element.dataset.tanglePosition) : null;
  }

  function handleTilePointerUp(event) {
    if (!game.draggedTileId) return;
    const position = positionFromPointer(event);
    if (position != null) {
      setGame((current) => moveTileTangle(current, position));
    } else {
      setGame((current) => ({ ...current, draggedTileId: null }));
    }
  }

  useEffect(() => {
    const interval = window.setInterval(() => {
      setGame((current) => tickTileTanglesGame(current, 0.25));
    }, 250);
    return () => window.clearInterval(interval);
  }, []);

  const cells = useMemo(() => Array.from({ length: 20 }, (_, index) => index), []);

  return (
    <main className="arcade-game-page tile-tangles-page">
      <section className="arcade-game-header">
        <div>
          <p className="eyebrow">WordSmith port</p>
          <h1>Tile Tangles</h1>
          <p>Move letters through the open slots until the two hidden five-letter words are untangled.</p>
        </div>
        <div className="arcade-actions">
          <button type="button" onClick={() => newGame()}>New game</button>
          <button type="button" onClick={() => setGame((current) => requestTileTanglesHint(current))} disabled={game.hintsUsed >= 2 || game.isGameOver}>Hint</button>
        </div>
      </section>

      <section className="arcade-layout">
        <aside className="arcade-control-panel">
          <h2>Mode</h2>
          <ModePicker modes={TILE_TANGLES_MODES} selectedMode={mode} onSelect={(nextMode) => newGame(nextMode)} />
          <button type="button" className="how-to-play-launch" onClick={() => setShowTutorial(true)}>
            How to play
          </button>
          <div className="target-words-card">
            <span>Targets</span>
            <strong>{game.currentWordPair.words.join(" + ")}</strong>
          </div>
        </aside>

        <section className="arcade-play-panel">
          <div className="arcade-stats-row">
            <GameStat label="Moves" value={game.moveCount} />
            <GameStat label={mode === "timeAttack" ? "Time left" : "Time"} value={formatTime(game.elapsedTime)} />
            {modeConfig?.moveLimit && <GameStat label="Moves left" value={Math.max(0, modeConfig.moveLimit - game.moveCount)} />}
            <Stars count={game.stars} />
          </div>

          <div className="tile-tangles-words" aria-live="polite">
            <span>{words.firstWord || "-----"}</span>
            <span>{words.secondWord || "-----"}</span>
          </div>

          <div className="tile-tangles-board" ref={boardRef} aria-label="Tile Tangles board">
            {cells.map((position) => {
              const tile = getTileAtPosition(game, position);
              const isVisibleEmpty = game.emptyPositions.has(position) && game.visibleEmptyPositions.has(position);
              const isValidDrop = game.validDropPositions.has(position);
              return (
                <div
                  className={`tangle-cell ${isVisibleEmpty ? "empty visible" : ""} ${isValidDrop ? "valid-drop" : ""}`}
                  data-tangle-position={position}
                  key={position}
                >
                  {tile && (
                    <button
                      type="button"
                      className={`tangle-tile ${tile.isSelected ? "selected" : ""} ${game.draggedTileId === tile.id ? "dragging" : ""}`}
                      onClick={() => setGame((current) => selectTileTangle(current, tile.id))}
                      onPointerDown={(event) => {
                        event.currentTarget.setPointerCapture(event.pointerId);
                        setGame((current) => startTileTanglesDrag(current, tile.id));
                      }}
                      onPointerUp={handleTilePointerUp}
                      onPointerCancel={() => setGame((current) => ({ ...current, draggedTileId: null }))}
                      disabled={game.isGameOver}
                    >
                      {tile.letter}
                    </button>
                  )}
                  {!tile && isVisibleEmpty && (
                    <button
                      type="button"
                      className="tangle-drop-target"
                      onClick={() => setGame((current) => moveTileTangle(current, position))}
                      disabled={!isValidDrop || game.isGameOver}
                      aria-label={`Move selected tile to position ${position + 1}`}
                    />
                  )}
                </div>
              );
            })}
          </div>

          <div className="arcade-submit-row">
            <p className={game.isGameOver ? "danger-message" : ""}>{game.message}</p>
          </div>

          {game.showingHint && (
            <div className="hint-callout" role="status">
              <span>{game.hintsUsed === 1 ? "First hint" : "Second hint"}</span>
              <p>{game.hintText}</p>
              <button type="button" onClick={() => setGame((current) => hideTileTanglesHint(current))}>Got it</button>
            </div>
          )}

          {game.isGameOver && (
            <div className="arcade-game-over" role="status">
              <h2>{game.gameOverReason === "completed" ? "Puzzle solved" : "Game Over"}</h2>
              <p>{game.gameOverReason === "completed" ? `You solved it in ${game.moveCount} moves.` : game.message}</p>
              <p>Score: {game.score}</p>
              <button type="button" onClick={() => newGame()}>Play again</button>
            </div>
          )}
        </section>
      </section>

      {showTutorial && (
        <ArcadeTutorialModal
          title="How to play Tile Tangles"
          steps={tileTanglesTutorialSteps}
          onClose={() => setShowTutorial(false)}
        />
      )}
    </main>
  );
}
