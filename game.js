const app = document.querySelector('#app');
const game = document.querySelector('#game');

// Load the starting screen
const initialLoad = () => {
    // If content already exists, clear it out before continuing.
    if (document.querySelector('#content')) {
        const currentContent = document.querySelector('#content');
        game.removeChild(currentContent);
    }

    const indexDiv = document.createElement('div');
    indexDiv.id = 'content';

    // Start Game Button
    const startGameButton = document.createElement('button');
    startGameButton.classList.add('btn');
    startGameButton.id = 'start-game-btn';
    const startGameButtonText = document.createTextNode('Start Game');
    startGameButton.appendChild(startGameButtonText);
    startGameButton.addEventListener("click", startGame);
    indexDiv.appendChild(startGameButton);

    // How To Play Button
    const howToPlayBtn = document.createElement('button');
    howToPlayBtn.classList.add('btn');
    howToPlayBtn.id = 'how-to-play-btn';
    howToPlayBtn.addEventListener('click', renderHelp);
    const howToPlayBtnText = document.createTextNode('How To Play');
    howToPlayBtn.appendChild(howToPlayBtnText);
    indexDiv.appendChild(howToPlayBtn);


    game.appendChild(indexDiv);
};

// Load the first question of the game
const startGame = () => {
    // Clear the current content
    const currentContent = document.querySelector('#content');
    game.removeChild(currentContent);

    // Create a new content div
    const gameDiv = document.createElement('div');
    gameDiv.id = 'content';

    // Store number of correct answers in localStorage
    localStorage.setItem('correctAnswers', 0);

    // Put question count into localStorage
    localStorage.setItem('questionCount', 1);

    // Display the current question number
    const qCountDiv = document.createElement('div');
    qCountDiv.id = 'question-count';
    const currentQCount = parseInt(localStorage.getItem('questionCount'));
    const qCountText = document.createTextNode(`Question #${currentQCount}`);
    qCountDiv.appendChild(qCountText);
    gameDiv.appendChild(qCountDiv);

    // Put current score into localStorage
    localStorage.setItem('currentScore', 0);
    // The potential score (sum of the length of all words during a game)
    localStorage.setItem('potentialScore', 0);

    // Display the current score
    const scoreDiv = document.createElement('div');
    scoreDiv.id = 'score';
    const currentScore = parseInt(localStorage.getItem('currentScore'));
    const scoreDivText = document.createTextNode(`Your Score: ${currentScore}`);
    scoreDiv.appendChild(scoreDivText);
    gameDiv.appendChild(scoreDiv);


    // Display the first word
    const word = getWord();
    const currentWord = document.createElement('h3');
    currentWord.id = "current-word";
    const currentWordText = document.createTextNode(word);
    currentWord.appendChild(currentWordText);
    gameDiv.appendChild(currentWord);

    // Display the answer input
    const answerInput = document.createElement('input');
    answerInput.id = 'answer-input';
    answerInput.placeholder = "Your Answer";
    gameDiv.append(answerInput);

    // Display "Check Answer" button
    const checkAnswerBtn = document.createElement('button');
    checkAnswerBtn.classList.add('btn');
    checkAnswerBtn.id = "check-answer-btn";
    const checkAnswerBtnText = document.createTextNode('Check Answer');
    checkAnswerBtn.addEventListener("click", checkAnswer);
    checkAnswerBtn.appendChild(checkAnswerBtnText);
    gameDiv.append(checkAnswerBtn);

    game.appendChild(gameDiv);
};

// Returns a random word from words.js
const getWord = () => words[Math.floor(Math.random() * words.length)];

// Increment and update question counter
const incrementQuestionCount = () => {
    const currentQCount = parseInt(localStorage.getItem('questionCount'));
    localStorage.setItem('questionCount', currentQCount + 1);
    document.querySelector('#question-count').innerHTML = `Question #${localStorage.getItem('questionCount')}`;
};

// Increment the correct answer counter
const incrementCorrect = () => {
    const currentCount = parseInt(localStorage.getItem('correctAnswers'));
    localStorage.setItem('correctAnswers', currentCount + 1);
};

// Add the length of the current word to the potential score
const adjustPotentialScore = (points) => {
    const currentPotential = parseInt(localStorage.getItem('potentialScore'));
    localStorage.setItem('potentialScore', currentPotential + points);
};

// Check the user's answer
const checkAnswer = () => {
    const correctAnswer = document.querySelector('#current-word').innerHTML.split('').sort().join('');
    adjustPotentialScore(correctAnswer.length);
    const answerInputValue = document.querySelector('#answer-input').value;
    if (correctAnswer == answerInputValue) {
        // Increment the correct answer counter
        incrementCorrect();
        // If the answer is correct, give the user points (1 point for each letter).
        const currentScore = parseInt(localStorage.getItem('currentScore'));
        const pointsEarned = correctAnswer.length;
        localStorage.setItem('currentScore', currentScore + pointsEarned);
        document.querySelector('#score').innerHTML = `Your score: ${localStorage.getItem('currentScore')}`;
        // Get new question
        loadNewQuestion();
    } else {
        // If the answer is incorrect, take away points (0.5 points for each letter, rounded down).
        const currentScore = parseInt(localStorage.getItem('currentScore'));
        const pointsLost = Math.floor(correctAnswer.length / 2);
        localStorage.setItem('currentScore', currentScore - pointsLost);
        document.querySelector('#score').innerHTML = `Your score: ${localStorage.getItem('currentScore')}`;
        // Get new question
        loadNewQuestion();
    }
    incrementQuestionCount();
    checkIfGameOver();
};

// Get a new word from words.js
const loadNewQuestion = () => {
    document.querySelector('#answer-input').value = '';
    document.querySelector('#current-word').innerHTML = getWord();
};

// The game ends at question #20
const checkIfGameOver = () => {
    const currentQCount = parseInt(localStorage.getItem('questionCount'));
    if (currentQCount == 21) endGame();
};

const endGame = () => {
    // Clear the current content
    const currentContent = document.querySelector('#content');
    game.removeChild(currentContent);

    const endGameDiv = document.createElement('div');
    endGameDiv.id = 'content';

    // Game Over!
    const gameOverMsg = document.createElement('h3');
    gameOverMsg.id = 'game-over';
    const gameOverMsgText = document.createTextNode('Game Over!');
    gameOverMsg.appendChild(gameOverMsgText);
    endGameDiv.appendChild(gameOverMsg);

    // Final score
    const finalScore = localStorage.getItem('currentScore');
    // Potential score
    const potentialScore = localStorage.getItem('potentialScore');
    // Number of correct answers
    const correctAnswers = localStorage.getItem('correctAnswers');


    const summary = document.createElement('p');
    summary.id = 'summary';
    const summaryText = document.createTextNode(`
            You got ${correctAnswers} out of 20 questions right, scoring
            ${finalScore} points out of a potential ${potentialScore}.
        `);
    summary.appendChild(summaryText);
    endGameDiv.appendChild(summary);

    const playAgainBtn = document.createElement('button');
    playAgainBtn.classList.add('btn');
    const playAgainBtnText = document.createTextNode('Play Again!');
    playAgainBtn.appendChild(playAgainBtnText);
    playAgainBtn.addEventListener('click', startGame);
    endGameDiv.append(playAgainBtn);

    game.appendChild(endGameDiv);
}

window.addEventListener("load", initialLoad);
// Go "home" if logo is clicked
document.querySelector('#logo').addEventListener('click', initialLoad);
