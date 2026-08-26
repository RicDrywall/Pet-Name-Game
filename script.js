const pets = [
  { name: "Higgins", owner: "Scott", image: "images/higgins.jpg" },
  { name: "Tom", owner: "Billy", image: "images/tom.jpg" },
  { name: "Mommy", owner: "Janet", image: "images/mommy.jpg" },
  { name: "Cuddles", owner: "Art", image: "images/cuddles.jpg" },
  { name: "TC", owner: "Broomhilda", image: "images/tc.jpg" }
];

const owners = ["Scott", "Billy", "Janet", "Art", "Broomhilda"];

const startScreen = document.getElementById("start-screen");
const gameScreen = document.getElementById("game-screen");
const endScreen = document.getElementById("end-screen");

const startButton = document.getElementById("start-button");
const restartButton = document.getElementById("restart-button");
const nextButton = document.getElementById("next-button");

const roundLabel = document.getElementById("round-label");
const scoreLabel = document.getElementById("score-label");
const petImage = document.getElementById("pet-image");
const petName = document.getElementById("pet-name");
const answerGrid = document.getElementById("answer-grid");
const feedback = document.getElementById("feedback");
const finalScore = document.getElementById("final-score");
const finalMessage = document.getElementById("final-message");

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
  petImage.alt = `Photo of ${currentPet.name}`;
  petName.textContent = currentPet.name;

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
  } else if (score >= 4) {
    finalMessage.textContent = "Excellent pet knowledge.";
  } else if (score >= 3) {
    finalMessage.textContent = "Pretty good. You know the group well.";
  } else {
    finalMessage.textContent = "Time to spend a little more time with these pets.";
  }

  showScreen(endScreen);
}

startButton.addEventListener("click", startGame);
restartButton.addEventListener("click", startGame);
nextButton.addEventListener("click", nextRound);
