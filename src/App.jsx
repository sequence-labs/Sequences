import { useEffect, useRef, useState } from "react";
import eclipseAppIcon from "./assets/eclipse-app-icon.png";
import eclipseSun from "./assets/eclipse-sun.png";
import { createPuzzle } from "./content/gameData.js";
import { docGroups, docs, supportEmail } from "./content/legalDocs.js";
import { GamesHub, GridlockGame, TileTanglesGame } from "./wordsmithGames.jsx";

const brand = "Eclipse Studios";
const tileSize = 72;
const tutorialTileSize = 64;
const tutorialMiniTileSize = 39;

const tutorialSteps = [
  {
    label: "Step 1",
    title: "Solve a clue word.",
    copy: "Start by typing the five-letter answer for each clue. Once the word is correct, it turns into a draggable strip.",
  },
  {
    label: "Step 2",
    title: "Drag the solved strip.",
    copy: "Try dragging the sample word left or right. The green tile is the letter that will be used for the hidden answer.",
  },
  {
    label: "Step 3",
    title: "Collect the green letters.",
    copy: "Each solved row contributes one highlighted letter. Together, those letters form the hidden word.",
  },
  {
    label: "Step 4",
    title: "Submit the answer.",
    copy: "When the highlighted letters read like a real hidden word, submit it. If it is wrong, slide the rows again.",
  },
];

const tutorialRows = [
  { clue: "A rectangular building block made of clay.", word: "BRICK", selectedIndex: 0 },
  { clue: "The planet we live on.", word: "EARTH", selectedIndex: 2 },
  { clue: "A sandy shore by the ocean.", word: "BEACH", selectedIndex: 2 },
  { clue: "A living thing that grows in soil.", word: "PLANT", selectedIndex: 3 },
  { clue: "Moving images you can watch.", word: "VIDEO", selectedIndex: 2 },
];

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function pathToRoot() {
  const rawPath = window.location.pathname;
  let sitePath = rawPath.replace(/^\/+/, "");
  if (rawPath.includes("/Studio987/")) {
    sitePath = rawPath.split("/Studio987/").pop();
  }
  if (sitePath.includes("dist/")) {
    sitePath = sitePath.split("dist/").pop();
  }
  if (window.location.hostname.endsWith("github.io") && sitePath.startsWith("Sequences/")) {
    sitePath = sitePath.slice("Sequences/".length);
  }
  const depth = sitePath.split("/").filter(Boolean).length - 1;
  return depth > 0 ? "../".repeat(depth) : "";
}

function href(path) {
  if (path.startsWith("mailto:") || path.startsWith("http")) return path;
  return `${pathToRoot()}${path}`;
}

function useBrandIcon() {
  useEffect(() => {
    const iconLinks = [
      { rel: "icon", type: "image/png" },
      { rel: "apple-touch-icon" }
    ];

    iconLinks.forEach((iconLink) => {
      let link = document.querySelector(`link[rel="${iconLink.rel}"]`);
      if (!link) {
        link = document.createElement("link");
        link.rel = iconLink.rel;
        document.head.appendChild(link);
      }
      if (iconLink.type) {
        link.type = iconLink.type;
      }
      link.href = eclipseAppIcon;
    });
  }, []);
}

function Shell({ children, tone = "dark" }) {
  return <div className={`site-shell ${tone}`}>{children}</div>;
}

function SiteNav({ compact = false, brandMode = "full" }) {
  return (
    <header className={`site-nav ${compact ? "compact" : ""}`}>
      <a className={`brand-mark ${brandMode === "mark" ? "mark-only" : ""}`} href={href("index.html")} aria-label="Eclipse Studios home">
        <span className="brand-glyph brand-glyph-image">
          <img src={eclipseAppIcon} alt="" />
        </span>
        {brandMode !== "mark" && <span>{brand}</span>}
      </a>
      <nav aria-label="Primary navigation">
        <a href={href("games/index.html")}>Play</a>
        <a href={href("docs/index.html")}>Docs</a>
        <a href={href("docs/support.html")}>Support</a>
      </nav>
    </header>
  );
}

function TileLogo({ animated = false }) {
  const rows = [
    ["C", "L", "U", "E", "S", ""],
    ["", "W", "O", "R", "D", "S"],
    ["S", "H", "I", "F", "T", ""],
    ["", "P", "L", "A", "Y", ""]
  ];

  return (
    <div className={`tile-logo ${animated ? "animated" : ""}`} aria-hidden="true">
      {rows.flatMap((row, rowIndex) =>
        row.map((letter, columnIndex) => (
          <span
            className={`tile-logo-cell ${letter ? "" : "empty"}`}
            style={{ "--delay": `${(rowIndex * 6 + columnIndex) * 55}ms` }}
            key={`${rowIndex}-${columnIndex}`}
          >
            {letter}
          </span>
        ))
      )}
    </div>
  );
}

function HomePage() {
  return (
    <Shell>
      <SiteNav brandMode="mark" />
      <main>
        <section className="hero-section">
          <div className="hero-copy">
            <p className="eyebrow">Puzzle apps and public docs</p>
            <h1>
              <span>Eclipse</span>
              <span>Studios</span>
            </h1>
            <p className="hero-text">
              A small studio for sharp little word games and public app documents.
            </p>
            <div className="hero-actions">
              <a className="primary-action" href={href("games/index.html")}>Explore games</a>
            </div>
            <p className="hero-doc-note">
              Looking for privacy policies, terms, or support? <a href={href("docs/index.html")}>Open docs</a>.
            </p>
          </div>
          <div className="hero-art">
            <img className="hero-eclipse-sun" src={eclipseSun} alt="" />
            <TileLogo animated />
            <div className="hero-word">
              <span>S</span>
              <span>O</span>
              <span>L</span>
              <span>V</span>
              <span>E</span>
            </div>
          </div>
        </section>

        <section className="feature-band" aria-labelledby="sequences-title">
          <div>
            <p className="eyebrow">Playable arcade</p>
            <h2 id="sequences-title">Sequences, Gridlock, and Tile Tangles now share one Eclipse home.</h2>
          </div>
          <p>
            Solve clues, build words from grids, or untangle two hidden five-letter answers.
          </p>
          <a className="text-link" href={href("games/index.html")}>Open the arcade</a>
        </section>

        <section className="apps-section" aria-labelledby="apps-title">
          <div className="section-heading">
            <p className="eyebrow">Current games</p>
            <h2 id="apps-title">Three web-playable word puzzles, each with its own rhythm.</h2>
          </div>
          <div className="app-list">
            <article>
              <span>01</span>
              <h3>Sequences</h3>
              <p>Clue words slide into a hidden answer down the center.</p>
              <a className="text-link" href={href("gamePage.html")}>Play Sequences</a>
            </article>
            <article>
              <span>02</span>
              <h3>Gridlock</h3>
              <p>Build real words from a living grid before the tiles time out.</p>
              <a className="text-link" href={href("games/gridlock.html")}>Play Gridlock</a>
            </article>
            <article>
              <span>03</span>
              <h3>Tile Tangles</h3>
              <p>Move letters through empty slots to restore two five-letter words.</p>
              <a className="text-link" href={href("games/tile-tangles.html")}>Play Tile Tangles</a>
            </article>
          </div>
        </section>

        <section className="docs-callout" aria-labelledby="docs-title">
          <div>
            <p className="eyebrow">Document hub</p>
            <h2 id="docs-title">Terms, privacy policies, and support stay in one place.</h2>
          </div>
          <a className="primary-action" href={href("docs/index.html")}>View all documents</a>
        </section>
      </main>
      <SiteFooter />
    </Shell>
  );
}

function SiteFooter() {
  return (
    <footer className="site-footer">
      <span>{brand}</span>
      <a href={href("terms-of-service.html")}>Terms</a>
      <a href={href("privacy-policy.html")}>Privacy</a>
      <a href={href("spy-privacy-policy.html")}>Spy Privacy</a>
      <a href={href("patchit-privacy-policy.html")}>PatchIt Privacy</a>
      <a href={href("user-support.html")}>Support</a>
    </footer>
  );
}

function GamePage() {
  const inputRefs = useRef(new Map());
  const [puzzle, setPuzzle] = useState(() => createPuzzle());
  const [showHelp, setShowHelp] = useState(false);
  const [tutorialStep, setTutorialStep] = useState(0);
  const [tutorialSelectedIndex, setTutorialSelectedIndex] = useState(3);
  const [tutorialDrag, setTutorialDrag] = useState({ active: false, startX: 0, origin: 3, px: 0 });
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("playing");
  const [rows, setRows] = useState(() => makeRows(puzzle));

  function resetGame() {
    const nextPuzzle = createPuzzle();
    setPuzzle(nextPuzzle);
    setRows(makeRows(nextPuzzle));
    setMessage("");
    setStatus("playing");
  }

  function makeRows(currentPuzzle) {
    return currentPuzzle.clues.map((clue) => ({
      ...clue,
      guess: Array(5).fill(""),
      solved: false,
      selectedIndex: 2,
      dragPx: 0,
      isDragging: false
    }));
  }

  function inputKey(rowIndex, letterIndex) {
    return `${rowIndex}-${letterIndex}`;
  }

  function registerInput(rowIndex, letterIndex, node) {
    const key = inputKey(rowIndex, letterIndex);
    if (node) {
      inputRefs.current.set(key, node);
    } else {
      inputRefs.current.delete(key);
    }
  }

  function normalizeLetter(value) {
    return value.replace(/[^a-z]/gi, "").slice(-1).toUpperCase();
  }

  function lettersFromValue(value) {
    return value.replace(/[^a-z]/gi, "").toUpperCase().split("");
  }

  function positionAfterLetters(rowIndex, letterIndex, lettersEntered) {
    const finalLinearIndex = rowIndex * 5 + letterIndex + lettersEntered - 1;
    return {
      rowIndex: Math.min(rows.length - 1, Math.floor(finalLinearIndex / 5)),
      letterIndex: finalLinearIndex % 5
    };
  }

  function findInputFrom(rowIndex, letterIndex, direction) {
    let nextRowIndex = rowIndex;
    let nextLetterIndex = letterIndex + direction;

    while (nextRowIndex >= 0 && nextRowIndex < rows.length) {
      while (nextLetterIndex >= 0 && nextLetterIndex < 5) {
        const node = inputRefs.current.get(inputKey(nextRowIndex, nextLetterIndex));
        if (node) {
          return { node, rowIndex: nextRowIndex, letterIndex: nextLetterIndex };
        }
        nextLetterIndex += direction;
      }

      nextRowIndex += direction;
      nextLetterIndex = direction > 0 ? 0 : 4;
    }

    return null;
  }

  function focusInputFrom(rowIndex, letterIndex, direction, shouldSelect = false) {
    const nextInput = findInputFrom(rowIndex, letterIndex, direction);
    if (!nextInput) return;
    nextInput.node.focus();
    if (shouldSelect) {
      nextInput.node.select();
    }
  }

  function updateGuess(rowIndex, letterIndex, value) {
    const nextValue = normalizeLetter(value);
    setRows((currentRows) =>
      currentRows.map((row, index) => {
        if (index !== rowIndex || row.solved) return row;
        const guess = [...row.guess];
        guess[letterIndex] = nextValue;
        const solved = guess.join("") === row.answer;
        return {
          ...row,
          guess,
          solved,
          selectedIndex: solved ? 2 : row.selectedIndex
        };
      })
    );
    setMessage("");
  }

  function updateGuesses(rowIndex, letterIndex, letters) {
    setRows((currentRows) => {
      const nextRows = currentRows.map((row) => ({
        ...row,
        guess: [...row.guess]
      }));
      let targetRowIndex = rowIndex;
      let targetLetterIndex = letterIndex;

      letters.forEach((letter) => {
        while (targetRowIndex < nextRows.length && nextRows[targetRowIndex].solved) {
          targetRowIndex += 1;
          targetLetterIndex = 0;
        }

        if (targetRowIndex >= nextRows.length) return;

        const row = nextRows[targetRowIndex];
        row.guess[targetLetterIndex] = letter;
        row.solved = row.guess.join("") === row.answer;
        row.selectedIndex = row.solved ? 2 : row.selectedIndex;

        targetLetterIndex += 1;
        if (targetLetterIndex >= 5) {
          targetRowIndex += 1;
          targetLetterIndex = 0;
        }
      });

      return nextRows;
    });
    setMessage("");
  }

  function changeGuess(rowIndex, letterIndex, value) {
    const letters = lettersFromValue(value);
    if (letters.length > 1) {
      updateGuesses(rowIndex, letterIndex, letters);
      const finalPosition = positionAfterLetters(rowIndex, letterIndex, letters.length);
      focusInputFrom(finalPosition.rowIndex, finalPosition.letterIndex, 1);
      return;
    }

    updateGuess(rowIndex, letterIndex, letters[0] || "");
    if (letters[0]) {
      focusInputFrom(rowIndex, letterIndex, 1);
    }
  }

  function handleGuessKeyDown(event, rowIndex, letterIndex) {
    if (event.metaKey || event.ctrlKey || event.altKey) return;

    if (/^[a-z]$/i.test(event.key)) {
      event.preventDefault();
      updateGuess(rowIndex, letterIndex, event.key);
      focusInputFrom(rowIndex, letterIndex, 1);
      return;
    }

    if (event.key !== "Backspace") return;

    const currentValue = rows[rowIndex]?.guess[letterIndex];
    if (currentValue) {
      event.preventDefault();
      updateGuess(rowIndex, letterIndex, "");
      focusInputFrom(rowIndex, letterIndex, -1, true);
      return;
    }

    const previousInput = findInputFrom(rowIndex, letterIndex, -1);
    if (!previousInput) return;
    event.preventDefault();
    updateGuess(previousInput.rowIndex, previousInput.letterIndex, "");
    previousInput.node.focus();
    previousInput.node.select();
  }

  function startDrag(event, rowIndex) {
    const row = rows[rowIndex];
    if (!row.solved) return;
    event.preventDefault();
    event.currentTarget.setPointerCapture(event.pointerId);
    setRows((currentRows) =>
      currentRows.map((item, index) =>
        index === rowIndex
          ? { ...item, isDragging: true, dragStart: event.clientX, dragOrigin: item.selectedIndex }
          : item
      )
    );
  }

  function moveDrag(event, rowIndex) {
    setRows((currentRows) =>
      currentRows.map((row, index) => {
        if (index !== rowIndex || !row.isDragging) return row;
        return { ...row, dragPx: event.clientX - row.dragStart };
      })
    );
  }

  function endDrag(rowIndex) {
    setRows((currentRows) =>
      currentRows.map((row, index) => {
        if (index !== rowIndex || !row.isDragging) return row;
        const dragSteps = Math.round(row.dragPx / tileSize);
        return {
          ...row,
          selectedIndex: clamp(row.dragOrigin - dragSteps, 0, 4),
          dragPx: 0,
          isDragging: false,
          dragStart: undefined,
          dragOrigin: undefined
        };
      })
    );
  }

  function selectRowLetter(rowIndex, letterIndex) {
    setRows((currentRows) =>
      currentRows.map((row, index) =>
        index === rowIndex && row.solved
          ? { ...row, selectedIndex: clamp(letterIndex, 0, row.answer.length - 1) }
          : row
      )
    );
  }

  function openTutorial() {
    setTutorialStep(0);
    setTutorialSelectedIndex(3);
    setTutorialDrag({ active: false, startX: 0, origin: 3, px: 0 });
    setShowHelp(true);
  }

  function startTutorialDrag(event) {
    event.preventDefault();
    event.currentTarget.setPointerCapture(event.pointerId);
    setTutorialDrag({ active: true, startX: event.clientX, origin: tutorialSelectedIndex, px: 0 });
  }

  function moveTutorialDrag(event) {
    setTutorialDrag((current) =>
      current.active
        ? { ...current, px: event.clientX - current.startX }
        : current
    );
  }

  function endTutorialDrag() {
    if (!tutorialDrag.active) return;
    const dragSteps = Math.round(tutorialDrag.px / tutorialTileSize);
    setTutorialSelectedIndex(clamp(tutorialDrag.origin - dragSteps, 0, 4));
    setTutorialDrag({ active: false, startX: 0, origin: tutorialSelectedIndex, px: 0 });
  }

  function submitAnswer() {
    if (!rows.every((row) => row.solved)) {
      setMessage("Solve all five clue words before submitting.");
      setStatus("playing");
      return;
    }

    const candidate = rows.map((row) => row.answer[row.selectedIndex]).join("");
    if (candidate === puzzle.hiddenWord) {
      setMessage(`Correct. The hidden word is ${puzzle.hiddenWord}.`);
      setStatus("won");
    } else {
      setMessage(`${candidate} is not the hidden word yet. Slide the solved rows again.`);
      setStatus("missed");
    }
  }

  const allSolved = rows.every((row) => row.solved);
  const activeTutorialStep = tutorialSteps[tutorialStep];
  const solvedTutorialCandidate = tutorialRows
    .map((row) => row.word[row.selectedIndex])
    .join("");
  const practiceTutorialCandidate = tutorialRows
    .map((row, index) => row.word[index === 0 ? tutorialSelectedIndex : row.selectedIndex])
    .join("");
  const tutorialCandidate = tutorialStep >= 2 ? solvedTutorialCandidate : practiceTutorialCandidate;

  return (
    <Shell>
      <SiteNav compact />
      <main className="game-page">
        <section className="game-header">
          <div>
            <p className="eyebrow">Sequences</p>
            <h1>Find the word hiding in the middle.</h1>
          </div>
          <div className="game-actions">
            <button type="button" onClick={openTutorial}>How to play</button>
            <button type="button" onClick={resetGame}>New puzzle</button>
          </div>
        </section>

        <section className={`game-board ${status}`} aria-label="Sequences puzzle board">
          <div className="center-guide" aria-hidden="true" />
          {rows.map((row, rowIndex) => (
            <article className={`game-row ${row.solved ? "solved" : ""}`} key={row.id}>
              <p className="clue">{row.hint}</p>
              <div className="row-playfield">
                <div className="track-window">
                  <div
                    className="letter-track"
                    onPointerDown={(event) => startDrag(event, rowIndex)}
                    onPointerMove={(event) => moveDrag(event, rowIndex)}
                    onPointerUp={() => endDrag(rowIndex)}
                    onPointerCancel={() => endDrag(rowIndex)}
                    style={{
                      transform: row.solved
                        ? `translateX(${(2 - row.selectedIndex) * tileSize + row.dragPx}px)`
                        : "translateX(0)"
                    }}
                  >
                    {row.answer.split("").map((letter, letterIndex) => (
                      row.solved ? (
                        <span
                          role="button"
                          tabIndex="0"
                          className={`game-tile ${letterIndex === row.selectedIndex ? "selected" : ""}`}
                          key={letterIndex}
                          onClick={() => selectRowLetter(rowIndex, letterIndex)}
                          onKeyDown={(event) => {
                            if (event.key === "Enter" || event.key === " ") {
                              event.preventDefault();
                              selectRowLetter(rowIndex, letterIndex);
                            }
                          }}
                          aria-label={`Choose ${letter} in row ${rowIndex + 1}`}
                        >
                          {letter}
                        </span>
                      ) : (
                        <input
                          key={letterIndex}
                          ref={(node) => registerInput(rowIndex, letterIndex, node)}
                          className="game-input"
                          aria-label={`Row ${rowIndex + 1} letter ${letterIndex + 1}`}
                          autoComplete="off"
                          autoCapitalize="characters"
                          inputMode="text"
                          maxLength="1"
                          spellCheck="false"
                          value={row.guess[letterIndex]}
                          onChange={(event) => changeGuess(rowIndex, letterIndex, event.target.value)}
                          onFocus={(event) => event.target.select()}
                          onKeyDown={(event) => handleGuessKeyDown(event, rowIndex, letterIndex)}
                        />
                      )
                    ))}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </section>

        <section className="submit-panel" aria-live="polite">
          <div>
            <p className="eyebrow">Hidden answer</p>
            <strong>{allSolved ? rows.map((row) => row.answer[row.selectedIndex]).join("") : "Solve all rows"}</strong>
          </div>
          <button type="button" className="primary-action" onClick={submitAnswer}>
            Submit
          </button>
          {message && <p className={`game-message ${status}`}>{message}</p>}
        </section>
      </main>

      {showHelp && (
        <div className="modal-backdrop" role="presentation" onClick={() => setShowHelp(false)}>
          <section className="help-modal" role="dialog" aria-modal="true" aria-labelledby="help-title" onClick={(event) => event.stopPropagation()}>
            <button type="button" className="modal-close" onClick={() => setShowHelp(false)}>Close</button>
            <h2 id="help-title">How to play</h2>
            <div className="tutorial-runner">
              <div className="tutorial-copy">
                <p className="eyebrow">{activeTutorialStep.label}</p>
                <h3>{activeTutorialStep.title}</h3>
                <p>{activeTutorialStep.copy}</p>
              </div>

              <div className={`tutorial-stage step-${tutorialStep + 1}`}>
                {tutorialStep === 0 && (
                  <div className="tutorial-demo-row">
                    <p className="tutorial-clue">Clue: A rectangular building block made of clay.</p>
                    <div className="tutorial-strip solved">
                      {"BRICK".split("").map((letter) => (
                        <span className="tutorial-tile typed" key={letter}>{letter}</span>
                      ))}
                    </div>
                    <p className="tutorial-note">The row locks in once the word is correct.</p>
                  </div>
                )}

                {tutorialStep === 1 && (
                  <div className="tutorial-demo-row">
                    <p className="tutorial-clue">Practice strip: BRICK</p>
                    <div
                      className="tutorial-strip solved draggable"
                      onPointerDown={startTutorialDrag}
                      onPointerMove={moveTutorialDrag}
                      onPointerUp={endTutorialDrag}
                      onPointerCancel={endTutorialDrag}
                      style={{
                        transform: `translateX(${(2 - tutorialSelectedIndex) * tutorialTileSize + tutorialDrag.px}px)`,
                      }}
                    >
                      {"BRICK".split("").map((letter, letterIndex) => (
                        <span
                          className={`tutorial-tile ${letterIndex === tutorialSelectedIndex ? "selected" : ""}`}
                          key={`${letter}-${letterIndex}`}
                        >
                          {letter}
                        </span>
                      ))}
                    </div>
                    <p className="tutorial-note">Press anywhere on the word and drag the whole strip.</p>
                  </div>
                )}

                {tutorialStep >= 2 && (
                  <div className="tutorial-word-list">
                    {tutorialRows.map((row, rowIndex) => {
                      const selectedIndex = row.selectedIndex;
                      return (
                        <div className="tutorial-mini-row" key={row.word}>
                          <p>{row.clue}</p>
                          <div className="tutorial-mini-strip-window">
                            <div
                              className="tutorial-mini-strip"
                              style={{ transform: `translateX(${(2 - selectedIndex) * tutorialMiniTileSize}px)` }}
                            >
                              {row.word.split("").map((letter, letterIndex) => (
                                <span
                                  className={`tutorial-tile ${letterIndex === selectedIndex ? "selected" : ""}`}
                                  key={`${row.word}-${letterIndex}`}
                                >
                                  {letter}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}

                {tutorialStep === 3 && (
                  <div className="tutorial-submit-demo">
                    <span>Ready?</span>
                    <button type="button">Submit</button>
                  </div>
                )}
              </div>

              <div className="tutorial-answer">
                <span>Sample hidden answer</span>
                <strong>{tutorialStep === 0 ? "-----" : tutorialCandidate}</strong>
              </div>

              <div className="tutorial-controls">
                <button
                  type="button"
                  disabled={tutorialStep === 0}
                  onClick={() => setTutorialStep((step) => Math.max(0, step - 1))}
                >
                  Back
                </button>
                <span>{tutorialStep + 1} / {tutorialSteps.length}</span>
                <button
                  type="button"
                  onClick={() => {
                    if (tutorialStep === tutorialSteps.length - 1) {
                      setShowHelp(false);
                    } else {
                      setTutorialStep((step) => Math.min(tutorialSteps.length - 1, step + 1));
                    }
                  }}
                >
                  {tutorialStep === tutorialSteps.length - 1 ? "Start playing" : "Next"}
                </button>
              </div>
            </div>
          </section>
        </div>
      )}
    </Shell>
  );
}

function DocsIndex() {
  return (
    <Shell tone="paper">
      <SiteNav compact />
      <main className="docs-index">
        <section className="docs-hero">
          <p className="eyebrow">Eclipse Studios documents</p>
          <h1>Terms, privacy policies, and support for every current app.</h1>
          <p>Use the clean docs links below, or keep using the legacy URLs already shipped in apps and App Store metadata.</p>
        </section>
        <section className="doc-groups" aria-label="Document groups">
          {docGroups.map((group) => (
            <article className="doc-group" key={group.appName}>
              <span>{group.appName}</span>
              <p>{group.summary}</p>
              <div>
                {group.links.map((docId) => (
                  <a key={docId} href={href(docs[docId].canonicalPath)}>{docs[docId].kind}</a>
                ))}
              </div>
            </article>
          ))}
        </section>
      </main>
      <SiteFooter />
    </Shell>
  );
}

function LegalPage({ docId }) {
  const doc = docs[docId] || docs.support;

  return (
    <Shell tone="paper">
      <SiteNav compact />
      <main className="legal-page">
        <aside className="legal-sidebar">
          <a href={href("docs/index.html")}>All documents</a>
          <span>{doc.appName}</span>
          <span>{doc.kind}</span>
          <span>Updated {doc.updated}</span>
        </aside>
        <article className="legal-document">
          <p className="eyebrow">{doc.appName}</p>
          <h1>{doc.title}</h1>
          <p className="legal-summary">{doc.summary}</p>
          <div className="canonical-row">
            <a href={href(doc.canonicalPath)}>Canonical docs link</a>
            {doc.legacyPath && <a href={href(doc.legacyPath)}>Legacy link</a>}
          </div>
          {doc.sections.map((section) => (
            <section key={section.heading}>
              <h2>{section.heading}</h2>
              {section.body.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              {section.links && (
                <div className="inline-links">
                  {section.links.map((link) => <a key={link.href} href={href(link.href)}>{link.label}</a>)}
                </div>
              )}
            </section>
          ))}
        </article>
      </main>
      <SiteFooter />
    </Shell>
  );
}

export default function App({ page, docId }) {
  useBrandIcon();

  if (page === "game") return <GamePage />;
  if (page === "games") return <Shell><SiteNav compact /><GamesHub href={href} /><SiteFooter /></Shell>;
  if (page === "gridlock") return <Shell><SiteNav compact /><GridlockGame /><SiteFooter /></Shell>;
  if (page === "tile-tangles") return <Shell><SiteNav compact /><TileTanglesGame /><SiteFooter /></Shell>;
  if (page === "docs") return <DocsIndex />;
  if (page === "legal") return <LegalPage docId={docId} />;
  return <HomePage />;
}
