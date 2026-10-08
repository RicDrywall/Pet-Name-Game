// One round per supplied photo. Owner names come from the filename before the hyphen.
// Each entry needs only owner and image. The same owner may appear more than once.
const pets = [
  {
    "owner": "Brooke",
    "image": "images/Brooke-Lacey.png"
  },
  {
    "owner": "ChristinaI",
    "image": "images/ChristinaI-1.png"
  },
  {
    "owner": "ChristinaR",
    "image": "images/ChristinaR-1.png"
  },
  {
    "owner": "ChristinaR",
    "image": "images/ChristinaR-2.png"
  },
  {
    "owner": "ChristinaR",
    "image": "images/ChristinaR-3.png"
  },
  {
    "owner": "ChristinaR",
    "image": "images/ChristinaR-4.png"
  },
  {
    "owner": "ChristinaR",
    "image": "images/ChristinaR-5.png"
  },
  {
    "owner": "ChristinaR",
    "image": "images/ChristinaR-6.png"
  },
  {
    "owner": "ChristinaR",
    "image": "images/ChristinaR-7.png"
  },
  {
    "owner": "Dustin",
    "image": "images/Dustin-Biscuit.png"
  },
  {
    "owner": "Dustin",
    "image": "images/Dustin-Gravy.png"
  },
  {
    "owner": "Eireann",
    "image": "images/Eireann-1.png"
  },
  {
    "owner": "Eireann",
    "image": "images/Eireann-2.png"
  },
  {
    "owner": "Eireann",
    "image": "images/Eireann-3.png"
  },
  {
    "owner": "Eireann",
    "image": "images/Eireann-4.png"
  },
  {
    "owner": "Jasmine",
    "image": "images/Jasmine-Cheeto.png"
  },
  {
    "owner": "Jasmine",
    "image": "images/Jasmine-Jimmy.png"
  },
  {
    "owner": "Julia",
    "image": "images/Julia-1.png"
  },
  {
    "owner": "Kristen",
    "image": "images/Kristen-Kira.png"
  },
  {
    "owner": "Kristen",
    "image": "images/Kristen-Lucipurr.png"
  },
  {
    "owner": "Morgan",
    "image": "images/Morgan-1.png"
  },
  {
    "owner": "Rayna",
    "image": "images/Rayna-AlexAndSimon.png"
  },
  {
    "owner": "Rayna",
    "image": "images/Rayna-Bob.png"
  },
  {
    "owner": "Rayna",
    "image": "images/Rayna-Lucy.png"
  },
  {
    "owner": "Robin",
    "image": "images/Robin-1.png"
  },
  {
    "owner": "Robin",
    "image": "images/Robin-2.png"
  },
  {
    "owner": "Sadie",
    "image": "images/Sadie-Penta.png"
  },
  {
    "owner": "Sarah",
    "image": "images/Sarah-1.png"
  },
  {
    "owner": "Sarah",
    "image": "images/Sarah-2.png"
  },
  {
    "owner": "Sarah",
    "image": "images/Sarah-3.png"
  },
  {
    "owner": "Sarah",
    "image": "images/Sarah-4.png"
  },
  {
    "owner": "Stacie",
    "image": "images/Stacie-Fupa.png"
  }
];

const owners = [...new Set(pets.map(pet => pet.owner))];

const startScreen = document.getElementById("start-screen");
const gameScreen = document.getElementById("game-screen");
const endScreen = document.getElementById("end-screen");

const startButton = document.getElementById("start-button");
const restartButton = document.getElementById("restart-button");
const nextButton = document.getElementById("next-button");

const roundLabel = document.getElementById("round-label");
const scoreLabel = document.getElementById("score-label");
const petImage = document.getElementById("pet-image");
const answerGrid = document.getElementById("answer-grid");
const feedback = document.getElementById("feedback");
const finalScore = document.getElementById("final-score");
const finalMessage = document.getElementById("final-message");

document.getElementById("pet-count").textContent = pets.length;
document.getElementById("owner-count").textContent = owners.length;
startButton.disabled = pets.length === 0;
document.getElementById("setup-message").textContent =
  pets.length === 0 ? "The new pet photos and owner assignments are coming soon." : "";

let gamePets = [];
let currentRound = 0;
let score = 0;
let answered = false;

function shuffle(array) {
  const copy = [...array];

  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }

  return copy;
}

function showScreen(screen) {
  [startScreen, gameScreen, endScreen].forEach(section => {
    section.classList.remove("active");
  });

  screen.classList.add("active");
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function startGame() {
  if (pets.length === 0) return;
  gamePets = shuffle(pets);
  currentRound = 0;
  score = 0;
  answered = false;

  scoreLabel.textContent = score;
  showScreen(gameScreen);
  renderRound();
}

function renderRound() {
  answered = false;

  const currentPet = gamePets[currentRound];

  roundLabel.textContent = `Round ${currentRound + 1} of ${gamePets.length}`;
  scoreLabel.textContent = score;

  petImage.src = currentPet.image;
  petImage.alt = `Pet photo ${currentRound + 1} of ${gamePets.length}`;

  feedback.textContent = "";
  nextButton.classList.add("hidden");
  answerGrid.innerHTML = "";

  shuffle(owners).forEach(owner => {
    const button = document.createElement("button");
    button.className = "answer-button";
    button.type = "button";
    button.textContent = owner;

    button.addEventListener("click", () => {
      submitAnswer(button, owner, currentPet.owner);
    });

    answerGrid.appendChild(button);
  });
}

function submitAnswer(selectedButton, selectedOwner, correctOwner) {
  if (answered) return;
  answered = true;

  const buttons = [...document.querySelectorAll(".answer-button")];

  buttons.forEach(button => {
    button.disabled = true;

    if (button.textContent === correctOwner) {
      button.classList.add("correct");
    }
  });

  if (selectedOwner === correctOwner) {
    score += 1;
    feedback.textContent = `Correct! ${correctOwner} owns this pet.`;
  } else {
    selectedButton.classList.add("wrong");
    feedback.textContent = `Nope — ${correctOwner} is the owner.`;
  }

  scoreLabel.textContent = score;

  nextButton.textContent =
    currentRound === gamePets.length - 1 ? "See Final Score" : "Next Pet";

  nextButton.classList.remove("hidden");
}

function nextRound() {
  if (!answered) return;
  currentRound += 1;

  if (currentRound >= gamePets.length) {
    showResults();
    return;
  }

  renderRound();
}

function showResults() {
  finalScore.textContent = `${score} / ${gamePets.length}`;

  if (score === gamePets.length) {
    finalMessage.textContent = "Perfect score — you know everyone's pets.";
  } else if (score / gamePets.length >= 0.8) {
    finalMessage.textContent = "Excellent pet knowledge.";
  } else if (score / gamePets.length >= 0.6) {
    finalMessage.textContent = "Pretty good. You know the group well.";
  } else {
    finalMessage.textContent = "Time to spend a little more time with these pets.";
  }

  showScreen(endScreen);
}

startButton.addEventListener("click", startGame);
restartButton.addEventListener("click", startGame);
nextButton.addEventListener("click", nextRound);
