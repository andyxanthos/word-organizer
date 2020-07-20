const renderHelp = () => {
    const currentContent = document.querySelector('#content');
    game.removeChild(currentContent);

    const helpDiv = document.createElement('div');
    helpDiv.id = 'content';

    const firstParagraph = document.createElement('p');
    firstParagraph.classList.add('help-paragraph');
    const firstParagraphText = document.createTextNode(`
        Word Organizer is a mindfulness game where you are given a word and tasked with putting the
        individual letters of that word in alphabetical order. There is no timer, so take your time on
        each of the twenty questions. The point of this game is to relax and focus on a menial task, not
        to challenge your knowledge of the alphabet.
    `);
    firstParagraph.appendChild(firstParagraphText);
    helpDiv.appendChild(firstParagraph);

    const secondParagraph = document.createElement('p');
    secondParagraph.classList.add('help-paragraph');
    const secondParagraphText = document.createTextNode(`
        As an example, let's say we're given the word "system." In that case, the correct answer would be,
        "emssty." Answering this question correctly will award us with 6 points, one point for each letter
        of the word. If we got it wrong, we'd lose 3 points (number of letters divided by 2, rounded down.)
    `);
    secondParagraph.appendChild(secondParagraphText);
    helpDiv.appendChild(secondParagraph);

    const backButton = document.createElement('button');
    backButton.classList.add('btn');
    backButton.addEventListener('click', initialLoad);
    const backButtonText = document.createTextNode('Got It!');
    backButton.appendChild(backButtonText);
    helpDiv.appendChild(backButton);

    game.appendChild(helpDiv);
}

