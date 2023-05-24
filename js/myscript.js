const playButton = document.getElementById('play-button');
const helpButton = document.getElementById('help-button');
const gridWrapper = document.querySelector('div.grid-wrapper');
const difficultySelect = document.querySelector('select');
const playButtonAudio = document.getElementById('play-button-audio');
const helpButtonAudio = document.getElementById('help-button-audio');
const cellClickAudio = document.getElementById('cell-click-audio');
const cellClickBombAudio = document.getElementById('cell-click-bomb-audio');
const victoryAudio = document.getElementById('victory-audio');
let bombNumbers;
let helpRequest = false;

playButton.addEventListener('click', function () {
    
    playButtonAudio.load();
    playButtonAudio.play();
    gridWrapper.innerHTML = ' ';
    gridWrapper.classList.add('black-border');
    difficulty = difficultySelect.value;

    if (difficulty == 1) {
        bombNumbers = randomNumbersGenerator(1, 100, 16);
        minefieldGenerator (100, 'grid-cell', 'difficulty-1-cell-width', 'clicked-cell', 'bomb-cell', cellClickAudio, cellClickBombAudio, victoryAudio, gridWrapper, bombNumbers, helpRequest);

    } else if (difficulty == 2) {
        bombNumbers = randomNumbersGenerator(1, 81, 16);
        minefieldGenerator (81, 'grid-cell', 'difficulty-2-cell-width', 'clicked-cell', 'bomb-cell', cellClickAudio, cellClickBombAudio, victoryAudio, gridWrapper, bombNumbers, helpRequest);

    } else {
        bombNumbers = randomNumbersGenerator(1, 49, 16);
        minefieldGenerator (49, 'grid-cell', 'difficulty-3-cell-width', 'clicked-cell', 'bomb-cell', cellClickAudio, cellClickBombAudio, victoryAudio, gridWrapper, bombNumbers, helpRequest);
    }
})

helpButton.addEventListener('click', function () {
    helpButtonAudio.load();
    helpButtonAudio.play();
    gridWrapper.innerHTML = ' ';
    gridWrapper.classList.remove('black-border');

    if (helpRequest == false) {
        helpRequest = true;
        helpButton.innerHTML = "Aiuto: Si";
        addElement('h2', "Clicca su Gioca, visualizzerai le caselle in cui sono nascoste le bombe.", 'message', gridWrapper);

    } else {
        helpRequest = false;
        helpButton.innerHTML = "Aiuto: No";
        addElement('h2', "Clicca su Gioca, non visualizzerai più le caselle in cui sono nascoste le bombe.", 'message', gridWrapper);
    }
})


/* FUNCTIONS */

/**This function creates a set number of cells inside a container. Each cell will have a class that defines its style and one that defines its size. By clicking on one of the cells, a further class will be added to make it selected and, if this has not already been clicked before, a sound will be played and the variable "guessedCells" that keeps track of the total guessed cells will increase. A set array of numbers will define the cells that have bombs inside them. Clicking a cell that contains a bomb will add a different class to that cell, play another sound, and end the game. No further cell clicks will be allowed until the user starts a new game, and the correctly guessed cells number will be printed on screen with the defeat message. Clicking all the correct cells without clicking one that contains a bomb will play a different sound and end the game. No further cell clicks will be allowed until the user starts a new game, and the correctly guessed cells number will be printed on screen with the victory message.
 * 
 * @param {*} cellNumber The number of cells you want to generate.
 * @param {*} cellStyle The name of the class that defines the cell styling.
 * @param {*} cellSize The name of the class that defines the cell size.
 * @param {*} cellClick The name of the class that will be added to the cell only when clicking it.
 * @param {*} cellBomb The name of the class that will be added to the cell when clicking it only if it contains a bomb.
 * @param {*} cellSound The sound that will be played when clicking a cell that has not already been clicked.
 * @param {*} cellBombSound The sound that will be played when clicking a cell that have a bomb inside.
 * @param {*} victorySound The sound that will be played when all cells without a bomb have been clicked.
 * @param {*} cellWrapper The container inside which the cells will be created.
 * @param {*} cellBombList The array that contains the numbers of the cells that have a bomb inside them.
 */
function minefieldGenerator (cellNumber, cellStyle, cellSize, cellClick, cellBomb, cellSound, cellBombSound, victorySound, cellWrapper, cellBombList, helpRequest) {

    let guessedCells = 0;
    let bombExploded = false;
    let victory = false;

    for (let i = 1; i <= cellNumber; i++) {
            const cell = document.createElement('div');
            cell.classList.add(cellStyle, cellSize);
            
            if (helpRequest == true) {

                if (cellBombList.includes(i)) {
                    cell.classList.add('help-cell');
                }
            }

            cell.addEventListener('click', function () {
                
                if ((bombExploded !== true) && (victory !== true)) {

                    if (cellBombList.includes(i)) {

                        cellBombSound.load();
                        cellBombSound.play();
                        cell.classList.add(cellBomb);
                        console.log("Hai cliccato la cella n° " + i + ", ma contiene una bomba!");
                        addElement('h2', 'Hai perso! Hai indovinato ' + guessedCells + ' caselle!', 'message', gridWrapper);
                        cell.innerHTML = '<i class="fa-solid fa-bomb"></i>';
                        bombExploded = true;
    
                    } else {
    
                        if (!cell.classList.contains(cellClick)) {
                            cellSound.load();
                            cellSound.play();
                            guessedCells++;
                        }
                        
                        cell.innerHTML = '<i class="fa-solid fa-check"></i>';
                        cell.classList.add(cellClick);
                        console.log("Hai cliccato la cella n° " + i)
    
                        if (guessedCells == (cellNumber - cellBombList.length)) {
                            victory = true;
                            victorySound.load();
                            victorySound.play();
                            addElement('h2', 'Complimenti, hai vinto! Hai indovinato tutte le ' + (cellNumber - cellBombList.length) + ' caselle!', 'message', gridWrapper);
                        }
                    }
                }
            })
            cellWrapper.appendChild(cell);
        }
}

/**This function creates an array of random numbers. You can choose the min and max random number that will be generated, and how many elements will the array have.
 *
 * @param {*} minNumber The min random number that will be generated.
 * @param {*} maxNumber The max random number that will be generated.
 * @param {*} totalNumbers The number of elements that the array will have.
 */
function randomNumbersGenerator(minNumber, maxNumber, totalNumbers) {

    let randomNumbersList = [];

    if ( (maxNumber - minNumber) < totalNumbers ){
        console.log("Non è possibile generare abbastanza numeri casuali nel range selezionato.");

    } else {
        
        while (randomNumbersList.length < totalNumbers) {
            const randomNumber = Math.floor(Math.random() * (maxNumber - minNumber + 1) + minNumber);

            if (!randomNumbersList.includes(randomNumber)) {
                randomNumbersList.push(randomNumber);
            }
        }
    }
    return randomNumbersList;
}

/**This function creates an html element of the chosen type and class, with the chosen text, and adds it at the end of the selected container.
 * 
 * @param {*} type The type of html element that will be created. 
 * @param {*} innerText The text that the created element will have inside.
 * @param {*} class The name of the class that will be added to the created element.
 * @param {*} container The container at the end of which the element will be added.
 */
function addElement(type, innerText, elementClass, container) {
    type = document.createElement(type);
    type.innerHTML = innerText;
    type.classList.add(elementClass);
    container.append(type);
}