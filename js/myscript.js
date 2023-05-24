const playButton = document.querySelector('button');
const gridWrapper = document.querySelector('div.grid-wrapper');
const difficultySelect = document.querySelector('select');
const playButtonAudio = document.getElementById('play-button-audio');
const cellClickAudio = document.getElementById('cell-click-audio');
const cellClickBombAudio = document.getElementById('cell-click-bomb-audio');
const victoryAudio = document.getElementById('victory-audio');
let bombNumbers;

playButton.addEventListener('click', function () {
    
    playButtonAudio.load();
    playButtonAudio.play();
    gridWrapper.innerHTML = ' ';
    gridWrapper.classList.add('black-border')
    difficulty = difficultySelect.value;

    if (difficulty == 1) {
        bombNumbers = randomNumbersGenerator(1, 100, 16);
        minefieldGenerator (100, 'grid-cell', 'difficulty-1-cell-width', 'clicked-cell', 'bomb-cell', cellClickAudio, cellClickBombAudio, victoryAudio, gridWrapper, bombNumbers);

    } else if (difficulty == 2) {
        bombNumbers = randomNumbersGenerator(1, 81, 16);
        minefieldGenerator (81, 'grid-cell', 'difficulty-2-cell-width', 'clicked-cell', 'bomb-cell', cellClickAudio, cellClickBombAudio, victoryAudio, gridWrapper, bombNumbers);

    } else {
        bombNumbers = randomNumbersGenerator(1, 49, 16);
        minefieldGenerator (49, 'grid-cell', 'difficulty-3-cell-width', 'clicked-cell', 'bomb-cell', cellClickAudio, cellClickBombAudio, victoryAudio, gridWrapper, bombNumbers);
    }
})


/* FUNCTIONS */

/**This function creates a set number of cells inside a container. Each cell will have a class that defines its style and one that defines its size. By clicking on one of the cells, a further class will be added and, if this has not already been clicked before, a sound will be played and a counter that keeps track of guessed cells will increase. Some of the cells will have bombs inside, they are defined from a set array of numbers. Clicking a cell that contains a bomb will add a different class to that cell and play a different sound. It will be no more possible to click other cells, and the total guessed cells number will be printed in console. If all cells without a bomb are clicked, a sound will be played and a victory message with the total guessed cell number will be printed in console.
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
function minefieldGenerator (cellNumber, cellStyle, cellSize, cellClick, cellBomb, cellSound, cellBombSound, victorySound, cellWrapper, cellBombList) {

    let guessedCells = 0;
    let bombExploded = false;

    for (let i = 1; i <= cellNumber; i++) {
            const cell = document.createElement('div');
            cell.classList.add(cellStyle, cellSize);
            
            cell.addEventListener('click', function () {
                
                if (bombExploded !== true) {

                    if (cellBombList.includes(i)) {

                        cellBombSound.load();
                        cellBombSound.play();
                        cell.classList.add(cellBomb);
                        console.log("Hai cliccato la cella n° " + i + ", ma contiene una bomba!");
                        addElement('h2', 'Hai perso! Hai indovinato ' + guessedCells + ' caselle!', 'results-message', gridWrapper);
                        bombExploded = true;
    
                    } else {
    
                        if (!cell.classList.contains(cellClick)) {
                            cellSound.load();
                            cellSound.play();
                            guessedCells++;
                        }
    
                        cell.classList.add(cellClick);
                        console.log("Hai cliccato la cella n° " + i)
    
                        if (guessedCells == (cellNumber - cellBombList.length)) {
                            victorySound.load();
                            victorySound.play();
                            addElement('h2', 'Complimenti, hai vinto! Hai indovinato tutte le ' + (cellNumber - cellBombList.length) + ' caselle!', 'results-message', gridWrapper);
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