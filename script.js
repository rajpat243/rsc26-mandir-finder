/* ------------------------------------------------------------------
   GAME LOGIC
   ------------------------------------------------------------------
   You shouldn't need to edit this file. To change questions, options,
   images, or the timer length, edit data.js instead.
------------------------------------------------------------------ */

// ------------------------------------------------------------------
// GAME STATE
// ------------------------------------------------------------------
let currentRound = 0;
let score = 0;
let answered = false;
let timeLeft = SECONDS_PER_ROUND;
let timerInterval = null;

// ------------------------------------------------------------------
// ELEMENT REFERENCES
// ------------------------------------------------------------------
const scoreDisplay = document.getElementById('scoreDisplay');
const roundDisplay = document.getElementById('roundDisplay');
const totalRounds = document.getElementById('totalRounds');
const timerDisplay = document.getElementById('timerDisplay');
const timerFill = document.getElementById('timerFill');
const clueText = document.getElementById('clueText');
const clueImage = document.getElementById('clueImage');
const feedback = document.getElementById('feedback');
const optionButtons = document.querySelectorAll('.option-btn');
const hintBtn = document.getElementById('hintBtn');
const nextBtn = document.getElementById('nextBtn');

totalRounds.textContent = ROUNDS.length;

// ------------------------------------------------------------------
// TIMER
// ------------------------------------------------------------------
function startTimer() {
  clearInterval(timerInterval);
  timeLeft = SECONDS_PER_ROUND;
  updateTimerDisplay();

  timerInterval = setInterval(() => {
    timeLeft--;
    updateTimerDisplay();

    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      handleTimeUp();
    }
  }, 1000);
}

function updateTimerDisplay() {
  timerDisplay.textContent = timeLeft;
  const percent = (timeLeft / SECONDS_PER_ROUND) * 100;
  timerFill.style.width = percent + '%';

  const isLow = timeLeft <= 3;
  timerDisplay.classList.toggle('time-low', isLow);
  timerFill.classList.toggle('time-low', isLow);
}

function handleTimeUp() {
  if (answered) return;
  answered = true;

  const round = ROUNDS[currentRound];
  optionButtons.forEach((btn, i) => {
    btn.disabled = true;
    if (i === round.answer) {
      btn.classList.add('correct');
    }
  });

  feedback.textContent = 'Time\'s up! The answer was "' + round.options[round.answer] + '".';
  feedback.className = 'feedback incorrect-text';
}

// ------------------------------------------------------------------
// LOAD A ROUND
// ------------------------------------------------------------------
function loadRound(index) {
  const round = ROUNDS[index];
  answered = false;
  feedback.textContent = '';
  feedback.className = 'feedback';

  clueText.textContent = round.clue;
  roundDisplay.textContent = index + 1;

  if (round.image && round.image.trim() !== '') {
    clueImage.src = round.image;
    clueImage.style.display = 'block';
  } else {
    clueImage.src = '';
    clueImage.style.display = 'none';
  }

  optionButtons.forEach((btn, i) => {
    btn.textContent = round.options[i];
    btn.classList.remove('correct', 'incorrect');
    btn.disabled = false;
  });

  startTimer();
}

// ------------------------------------------------------------------
// HANDLE ANSWER SELECTION
// ------------------------------------------------------------------
function handleAnswer(selectedIndex) {
  if (answered) return;
  answered = true;
  clearInterval(timerInterval);

  const round = ROUNDS[currentRound];
  const correctIndex = round.answer;

  optionButtons.forEach((btn, i) => {
    btn.disabled = true;
    if (i === correctIndex) {
      btn.classList.add('correct');
    } else if (i === selectedIndex) {
      btn.classList.add('incorrect');
    }
  });

  if (selectedIndex === correctIndex) {
    score++;
    scoreDisplay.textContent = score;
    feedback.textContent = 'Correct!';
    feedback.classList.add('correct-text');
  } else {
    feedback.textContent = 'Incorrect. The answer was "' + round.options[correctIndex] + '".';
    feedback.classList.add('incorrect-text');
  }
}

// ------------------------------------------------------------------
// NEXT ROUND
// ------------------------------------------------------------------
function nextRound() {
  if (currentRound < ROUNDS.length - 1) {
    currentRound++;
    loadRound(currentRound);
  } else {
    clearInterval(timerInterval);
    clueText.textContent = 'Game over! Final score: ' + score + ' / ' + ROUNDS.length;
    clueImage.style.display = 'none';
    timerFill.style.width = '0%';
    timerDisplay.textContent = '0';
    optionButtons.forEach((btn) => {
      btn.style.display = 'none';
    });
    hintBtn.disabled = true;
    nextBtn.disabled = true;
  }
}

// ------------------------------------------------------------------
// HINT (currently reveals the first letter; customize freely)
// ------------------------------------------------------------------
function showHint() {
  const round = ROUNDS[currentRound];
  const correctAnswer = round.options[round.answer];
  feedback.textContent = 'Hint: the answer starts with "' + correctAnswer.charAt(0) + '"';
  feedback.className = 'feedback';
}

// ------------------------------------------------------------------
// EVENT LISTENERS
// ------------------------------------------------------------------
optionButtons.forEach((btn) => {
  btn.addEventListener('click', () => {
    const index = parseInt(btn.getAttribute('data-index'), 10);
    handleAnswer(index);
  });
});

hintBtn.addEventListener('click', showHint);
nextBtn.addEventListener('click', nextRound);

// ------------------------------------------------------------------
// START GAME
// ------------------------------------------------------------------
loadRound(currentRound);