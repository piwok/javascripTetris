//UTILS//
// adds two string format pair of numbers. example: '1,-2' + '2,3' = '3,1'. return is a string as well//
function sumTwoStrNums (str_num1, str_num2) {
    let temp = [];
    const num1 = str_num1.split(',');
    const num2 = str_num2.split(',');
    for(let i = 0; i < num1.length; i++) {
        temp[i] = parseInt(num1[i]) + parseInt(num2[i]);
    }
    return temp.toString();
}

//END UTILS//

class Piece {
static type_of_pieces = {
'purplePiece': [['0,-1', '1,0', '2,0'], ['1,0', '0,1', '0,2'], ['0,1', '-1,0', '-2,0'], ['-1,0', '0,-1','0,-2']],
'darkBluePiece': [['-1,0', '0,-1', '1,-1'], ['0,-1', '1,0', '1,1']],
'yellowPiece': [['0,-1', '-1,0', '-2,0'], ['1,0', '0,-1', '0,-2'], ['0,-1', '1,-1', '1,-2'], ['-1,0', '0,1', '0,2']],
'orangePiece': [['-1,0', '0,-1', '-1,-1'], ['0,1', '1,0', '1,-1']],
'redPiece': [['0,-1', '0,-2', '0,-3'], ['1,0', '2,0', '3,0']],
'greenPiece': [['-1,0', '1,0', '0,-1'], ['0,-1', '1,0', '0,1'], ['-1,0', '1,0', '0,1'], ['0,-1', '-1,0', '0,1']],
'bluePiece': [['0,-1', '1,-1', '1,0']]};
constructor (model, insert_point) {
    this.position = 0;
    this.anchor = insert_point;
    this.points = Piece.type_of_pieces[model];
    this.model = model;
    }

movePieceSpin (type) {
    const temp_anchor = this.anchor;
    const result = [temp_anchor];
    let temp_position = this.position;
    if (temp_position === this.points.length-1) {
        temp_position = 0;}
    else {
        temp_position++}
    for (let i=0; i<this.points[temp_position].length; i++) {
        result.push(sumTwoStrNums(temp_anchor, this.points[temp_position][i]))
    }
    if (type === true) {
        this.anchor = temp_anchor;
        this.position = temp_position;
    return result;
}
}
}

class PieceLoader {
    constructor() {
        this.pieces = ['purplePiece', 'darkBluePiece', 'bluePiece', 'yellowPiece', 'greenPiece', 'redPiece', 'orangePiece'];
        this.insert_point = '1,1';
        this.piece = false;
        this.RPG();

    }
    //Random Piece Generator//
    RPG ()  {
        const seed = Math.floor(Math.random()*this.pieces.length);
        if (seed === 7) {
            seed = 6;
        }
        this.piece = new Piece(this.pieces[seed], this.insert_point);
    }
    //Pop and return the piece and generate a new random piece// 
    popPiece () {
        const result = this.piece;
        this.RPG();
        return result;
    }
}

class Cell {
    constructor (position) {
        //Logical data
        this.position = position;
        this.piece = null;
        //Graphical data
        this.div = document.createElement ('div');
        this.div.setAttribute('class', 'emptyCell');
        
    }

    setClass (new_class) {
        this.div.setAttribute('class', new_class);
    }

    isOccupied () {
        if (this.cell != 'empty') {
            return true;
        }
        return false;
    }

    setPiece (piece) {
        this.cell = piece;
    }

}

class Grid {
    constructor (width, height, insert_point, css_grid_class) {
        this.width = width;
        this.height = height;
        this.insert_point = insert_point;
        this.active_piece = null;
        this.cells = {};        
        //Graphical variables//
        this.div = document.createElement('div');
        this.div.style.width = `${this.width*35}px`;
        this.div.style.height = `${this.height*35}px`;
        this.div.setAttribute('class', css_grid_class);
        document.getElementById('root').appendChild(this.div);
        for (let i = 0; i < this.width; i++) {
            for (let j = 0; j < this.height; j++) {
                let new_cell = new Cell(`${i},${j}`)
                this.addCell(new_cell);
            } 
        }
    }

    addCell (new_cell) {
        this.cells[new_cell.position] = new_cell;
        let coordinates = new_cell.position.split(',');
        coordinates = [parseInt(coordinates[0]), parseInt(coordinates[1])];
        new_cell.div.style.left = `${coordinates[0]*35}px`;
        new_cell.div.style.top = `${coordinates[1]*35}px`;
        this.div.appendChild(this.cells[new_cell.position].div);
    }
              
    addPiece (new_piece) {
        this.active_piece = new_piece;
        const points = this.movePieceStraight('0,0', false); // muevo la pieza 0 en los dos ejes para obtener los puntos de la pieza iniciales desde el insert point
        for (let i = 0; i < points.length; i++) {
            this.cells[points[i]].setClass(new_piece.model);
        }

    }

    isValidCoordinates (new_points) {
        for (let i = 0; i < new_points.length; i++) {
            if (!(new_points[i] in this.cells)) {
                return false;
            }
        }
        return true;
    }

    //step: movement to perform in puece in the format: '0,1' one step down
    //spin: movement to perform a clockwise spin of 90 degrees
    //type: there are two types: 'true' for real movementes. all the checks needed are done and ok the movement is valid and 'false' is used to probe a movement to know if is valid
    //the return are a list of points where the squares of the piece will be when the step is added or the spin performed
    movePieceStraight (step, type) {
        
        const temp_anchor = sumTwoStrNums(this.active_piece.anchor, step);
        let position = this.active_piece.position;
        const result = [temp_anchor];
        for (let i = 0; i<this.active_piece.points[position].length; i++) {
            let temp_new_element = sumTwoStrNums(temp_anchor, this.active_piece.points[position][i]);
            result.push(temp_new_element);
        }
        if (type === true) {
            this.active_piece.anchor = temp_anchor;
        }
        return result
    }
}



//MAIN CODE//
document.addEventListener('DOMContentLoaded', function () {
let intervals = {
    'main': null,
    'secondary': null
    }
    let grid = new Grid(10, 20, '5,5', 'mainGrid');
test_piece = new Piece('redPiece','4,4');

grid.addPiece(test_piece);


intervals['main'] = setInterval(updateGrid, 25);

//MAIN FUNCTIONS

let update_grid_counter = 0;
let left = null;
let right = null;
let spin = null;

function updateGrid (grid) {
    if (spin === true) {
        grid.movePieceSpin();
    }
    if (update_grid_counter === 4) {
        console.log(grid);
        if (grid.isValidCoordinates(grid.movePieceStraight('0,1', false))) {
            old_points = grid.active_piece.points[grid.active_piece.position];
            new_points = grid.movePieceStraight('0,1', true);
            for (let i = 0; i < old_points.length; i++) {
                grid.cells[old_points[i]].setClass('emptyCell');
            }
            for (let i = 0; i < new_points[i]; i++) {
                grid.cells[new_points[i]].setClass(grid.active_piece.setClass(grid.active_piece.model));
            }
        }
        else {
            grid.active_piece = null;
        }
    }
    if (left === true && right === false) {
        grid.movePieceStraight('-1,0', false)
    }
    else if (left === false && right === true) {
        grid.movePieceStraight('1,0', false);
    }
    if (update_grid_counter === 4) {
        update_grid_counter = 0
    }
    else {
        update_grid_counter++
    }
    update_grid_counter++
}
});









