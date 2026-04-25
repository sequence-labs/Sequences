const hiddenWords = [
  "PLANT",
  "OCEAN",
  "LIGHT",
  "RIVER",
  "MAGIC",
  "SPACE",
  "TRAIN",
  "WATER",
  "SMILE",
  "CLOUD",
  "STONE",
  "BREAD",
  "QUEEN",
  "BRICK"
];

const cluePool = [
  { answer: "APPLE", hint: "A round fruit with red or green skin." },
  { answer: "ARROW", hint: "A pointed mark or object that shows direction." },
  { answer: "BEACH", hint: "A sandy shore by the ocean." },
  { answer: "BRICK", hint: "A rectangular building block made of clay." },
  { answer: "CANDY", hint: "A sweet treat." },
  { answer: "CHAIR", hint: "A piece of furniture for sitting." },
  { answer: "CLOCK", hint: "A device that tells time." },
  { answer: "CLOUD", hint: "A white or gray shape floating in the sky." },
  { answer: "DANCE", hint: "Move your body to music." },
  { answer: "EARTH", hint: "The planet we live on." },
  { answer: "FAIRY", hint: "A tiny magical creature with wings." },
  { answer: "FLAME", hint: "The hot glowing part of a fire." },
  { answer: "FRUIT", hint: "A sweet food that grows from a plant." },
  { answer: "GHOST", hint: "A spooky spirit in stories." },
  { answer: "HAPPY", hint: "Feeling joy." },
  { answer: "HOUSE", hint: "A place where people live." },
  { answer: "JUICE", hint: "A drink squeezed from fruit." },
  { answer: "LIGHT", hint: "What helps you see in the dark." },
  { answer: "MAGIC", hint: "The power to make impossible things happen." },
  { answer: "MUSIC", hint: "Sounds arranged into rhythm and melody." },
  { answer: "OCEAN", hint: "A huge body of salt water." },
  { answer: "PANDA", hint: "A black-and-white bear." },
  { answer: "PIZZA", hint: "A round meal often topped with cheese." },
  { answer: "QUEEN", hint: "A woman who rules a kingdom." },
  { answer: "QUIET", hint: "Not making much noise." },
  { answer: "RIVER", hint: "A long flowing body of water." },
  { answer: "SMILE", hint: "A happy expression on your face." },
  { answer: "SPACE", hint: "The area beyond Earth." },
  { answer: "STONE", hint: "A small piece of rock." },
  { answer: "SUNNY", hint: "Bright with sunlight." },
  { answer: "TIGER", hint: "A striped big cat." },
  { answer: "TRAIN", hint: "A vehicle that travels on tracks." },
  { answer: "VOICE", hint: "The sound made when someone speaks." },
  { answer: "WATER", hint: "A clear liquid people drink." },
  { answer: "WHEEL", hint: "A round part that helps things move." },
  { answer: "WHITE", hint: "The color of snow." },
  { answer: "BREAD", hint: "A baked food often used for sandwiches." },
  { answer: "CROWN", hint: "A royal headpiece." },
  { answer: "DRAMA", hint: "A serious story or performance." },
  { answer: "GLASS", hint: "A clear material used in windows." },
  { answer: "HORSE", hint: "A large animal people can ride." },
  { answer: "JELLY", hint: "A sweet wobbly food." },
  { answer: "LEMON", hint: "A sour yellow fruit." },
  { answer: "MANGO", hint: "A sweet tropical fruit." },
  { answer: "METAL", hint: "A strong material like iron or steel." },
  { answer: "NINJA", hint: "A stealthy warrior in stories." },
  { answer: "NORTH", hint: "The direction at the top of most maps." },
  { answer: "PEACH", hint: "A soft fruit with fuzzy skin." },
  { answer: "PEARL", hint: "A smooth gem from an oyster." },
  { answer: "PLANT", hint: "A living thing that grows in soil." },
  { answer: "RADIO", hint: "A device for listening to broadcasts." },
  { answer: "SALAD", hint: "A dish often made with leafy greens." },
  { answer: "SHARK", hint: "A large fish with sharp teeth." },
  { answer: "SHEEP", hint: "A woolly farm animal." },
  { answer: "SNAKE", hint: "A long reptile with no legs." },
  { answer: "SPARK", hint: "A tiny flash of fire or light." },
  { answer: "STORM", hint: "Wild weather with wind or rain." },
  { answer: "SWEET", hint: "Tasting like sugar." },
  { answer: "TRICK", hint: "A clever action meant to fool someone." },
  { answer: "TULIP", hint: "A cup-shaped spring flower." },
  { answer: "UNITY", hint: "The state of being joined together." },
  { answer: "VIDEO", hint: "Moving images you can watch." },
  { answer: "WATCH", hint: "A small timepiece worn on the wrist." },
  { answer: "WHISK", hint: "A kitchen tool used for mixing." },
  { answer: "WINGS", hint: "Body parts birds use to fly." },
  { answer: "YACHT", hint: "A fancy boat." },
  { answer: "ZEBRA", hint: "An animal with black and white stripes." }
];

function shuffle(items) {
  return [...items].sort(() => Math.random() - 0.5);
}

function pickClue(letter, usedAnswers) {
  const options = shuffle(cluePool).filter((item) => item.answer.includes(letter) && !usedAnswers.has(item.answer));
  const fallback = shuffle(cluePool).find((item) => item.answer.includes(letter));
  return options[0] || fallback;
}

export function createPuzzle() {
  const hiddenWord = hiddenWords[Math.floor(Math.random() * hiddenWords.length)];
  const usedAnswers = new Set();
  const clues = hiddenWord.split("").map((letter, rowIndex) => {
    const clue = pickClue(letter, usedAnswers);
    usedAnswers.add(clue.answer);
    return {
      id: `${letter}-${rowIndex}-${clue.answer}`,
      targetLetter: letter,
      targetIndex: clue.answer.indexOf(letter),
      answer: clue.answer,
      hint: clue.hint
    };
  });

  return {
    hiddenWord,
    clues
  };
}
