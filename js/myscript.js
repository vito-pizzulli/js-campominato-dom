const playButton = document.querySelector('button');
const gridWrapper = document.querySelector('div.grid-wrapper');
const difficultySelect = document.querySelector('select');
const playButtonAudio = document.getElementById('play-button-audio');
const cellClickAudio = document.getElementById('cell-click-audio');

playButton.addEventListener('click', function () {
    
    playButtonAudio.load();
    playButtonAudio.play();
    gridWrapper.innerHTML = ' ';
    gridWrapper.classList.add('black-border')
    difficulty = difficultySelect.value;

    if (difficulty == 1) {
        divGenerator (100, 'grid-cell', 'difficulty-1-cell-width', 'clicked-cell', cellClickAudio, gridWrapper);

    } else if (difficulty == 2) {
        divGenerator (81, 'grid-cell', 'difficulty-2-cell-width', 'clicked-cell', cellClickAudio, gridWrapper);

    } else {
        divGenerator (49, 'grid-cell', 'difficulty-3-cell-width', 'clicked-cell', cellClickAudio, gridWrapper);
    }
})


/* FUNCTIONS */

/**
 * This function generates a set number of empty divs inside a container, applies 2 css classes to them, plus an additional class that is applied only when clicking on the div. The index (i) number will be added inside each div, from 1 to the last one. When clicking a div, the index (i) number will be printed into the console and, if it hasn't been already clicked before, it will play a sound.
 * @param {*} divNumber The number of the divs you want to generate.
 * @param {*} firstClass The name of the first class that will be added to the created div.
 * @param {*} secondClass The name of the second class that will be added to the created div.
 * @param {*} clickClass The name of the class that will be added to the div only when clicking on him.
 * * @param {*} clickSound The sound that will be played when clicking a div that has not already been clicked.
 *  * @param {*} divContainer The container inside which the divs will be created.
 */
function divGenerator (divNumber, firstClass, secondClass, clickClass, clickSound, divContainer) {

    for (let i = 1; i <= divNumber; i++) {
            const cell = document.createElement('div');
            cell.innerHTML = [i];
            cell.classList.add(firstClass, secondClass);
            
            cell.addEventListener('click', function () {

                if (!cell.classList.contains(clickClass)) {
                    clickSound.load();
                    clickSound.play();
                }

                cell.classList.add(clickClass);
                console.log("Hai cliccato la cella n° " + [i])
            })
            divContainer.appendChild(cell);
        }
}