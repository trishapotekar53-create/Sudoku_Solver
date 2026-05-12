const board = document.getElementById('board');

/* Create Sudoku Grid */

for (let row = 0; row < 9; row++) {

    for (let col = 0; col < 9; col++) {

        let input = document.createElement('input');

        input.type = 'text';
        input.maxLength = 1;

        input.classList.add('cell');

        input.addEventListener('input', () => {
            input.value = input.value.replace(/[^1-9]/g, '');
        });

        board.appendChild(input);
    }
}

/* Clear Board */

function clearBoard() {

    document.querySelectorAll('.cell').forEach(cell => {
        cell.value = '';
    });
}

/* Generate Puzzle */

function generatePuzzle() {

    let puzzle = [

        5, 3, '', '', 7, '', '', '', '',
        6, '', '', 1, 9, 5, '', '', '',
        '', 9, 8, '', '', '', '', 6, '',
        8, '', '', '', 6, '', '', '', 3,
        4, '', '', 8, '', 3, '', '', 1,
        7, '', '', '', 2, '', '', '', 6,
        '', 6, '', '', '', '', 2, 8, '',
        '', '', '', 4, 1, 9, '', '', 5,
        '', '', '', '', 8, '', '', 7, 9
    ];

    let cells = document.querySelectorAll('.cell');

    for (let i = 0; i < 81; i++) {
        cells[i].value = puzzle[i];
    }
}

/* Solve Puzzle */
function solvePuzzle() {

    let cells = document.querySelectorAll('.cell');

    let boardData = [];

    cells.forEach(cell => {
        boardData.push(cell.value);
    });

    fetch('http://127.0.0.1:5000/solve', {

        method: 'POST',

        headers: {
            'Content-Type': 'application/json'
        },

        body: JSON.stringify({
            board: boardData
        })

    })

        .then(response => response.json())

        .then(data => {

            let solved = data.solution;

            for (let i = 0; i < 81; i++) {

                cells[i].value = solved[i];
            }

        })

        .catch(error => {

            console.log(error);

            alert("Solver connection failed");
        });
}




/* Save Puzzle to Database */

function savePuzzle() {

    let cells = document.querySelectorAll('.cell');

    let boardData = [];

    cells.forEach(cell => {
        boardData.push(cell.value);
    });

    fetch('http://127.0.0.1:5000/save', {

        method: 'POST',

        headers: {
            'Content-Type': 'application/json'
        },

        body: JSON.stringify({
            board: boardData
        })

    })

        .then(response => response.json())

        .then(data => {
            alert(data.message);
        })

        .catch(error => {
            console.log(error);
            alert("Error saving puzzle");
        });
}