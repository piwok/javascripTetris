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
'yellowPiece': [['0,-1', '-1,0', '-2,0'], ['1,0', '0,-1', '0,-2'], ['0,-1', '1,-1', '2,-1'], ['-1,0', '0,1', '0,2']],
'orangePiece': [['-1,-1', '0,-1', '1,0'], ['1,-1', '1,0', '0,1']],
'redPiece': [['0,-1', '0,-2', '0,-3'], ['1,0', '2,0', '3,0']],
'greenPiece': [['-1,0', '1,0', '0,-1'], ['0,-1', '1,0', '0,1'], ['-1,0', '1,0', '0,1'], ['0,-1', '-1,0', '0,1']],
'bluePiece': [['0,-1', '1,-1', '1,0']]};
static piece_ID = 0;
constructor (model, insert_point) {
    this.position = 0;
    this.anchor = insert_point;
    this.points = Piece.type_of_pieces[model];
    this.model = model;
    this.id = Piece.piece_ID;
    Piece.piece_ID++;

}
}

class PieceLoader {
    constructor(grid) {
        this.grid = grid;
        this.pieces = ['purplePiece', 'darkBluePiece', 'bluePiece', 'yellowPiece', 'greenPiece', 'redPiece', 'orangePiece'];
        this.insert_point = '4,4';
        this.piece = null;
        this.RPG();
        //this.grid.addPiece(this.piece);

    }
    //Random Piece Generator//
    RPG ()  {
        const seed = Math.floor(Math.random()*this.pieces.length);
        if (seed === 7) {
            seed = 6;
        }
        if (this.piece !== null) {
            const old_points = this.grid.movePieceStraight('0,0', false);
            for (let i = 0; i < old_points.length; i++) {
                this.grid.cells[old_points[i]].setClass('NextPieceGridCell');
            this.piece = new Piece(this.pieces[seed], this.insert_point);
            this.grid.addPiece(this.piece);
            }
        }
        else {
            this.piece = new Piece(this.pieces[seed], this.insert_point);
            this.grid.addPiece(this.piece);
        }
        
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

    setPiece (piece) {
        this.piece = piece;
    }

}

class Grid {
    constructor (width, height, insert_point, css_grid_class, css_cell_initial_class) {
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
                this.addCell(new_cell, css_cell_initial_class);
            } 
        }
    }

    addCell (new_cell, css_cell_initial_class) {
        this.cells[new_cell.position] = new_cell;
        let coordinates = new_cell.position.split(',');
        coordinates = [parseInt(coordinates[0]), parseInt(coordinates[1])];
        new_cell.div.style.left = `${coordinates[0]*35}px`;
        new_cell.div.style.top = `${coordinates[1]*35}px`;
        new_cell.div.setAttribute('class', css_cell_initial_class);
        this.div.appendChild(this.cells[new_cell.position].div);
    }
              
    addPiece (new_piece) {
        this.active_piece = new_piece;
        const points = this.movePieceStraight('0,0', false); // muevo la pieza 0 en los dos ejes para obtener los puntos de la pieza iniciales desde el insert point
        for (let i = 0; i < points.length; i++) {
            this.cells[points[i]].setClass(new_piece.model);
            this.cells[points[i]].piece = this.active_piece;
        }

    }

    isValidCoordinates (new_points) {
        let old_points = this.movePieceStraight('0,0', false);
        let valid_points = [];
        
        for (let i = 0; i < new_points.length; i++) {
            if (!(new_points[i] in this.cells)) {
                return false;
            }
        }
        for (let i = 0; i < new_points.length; i++) {
            if (!(old_points.includes(new_points[i]))) {
                valid_points.push(new_points[i]);
            }
        }
        for (let i = 0; i < valid_points.length; i++) {
            if ((this.cells[valid_points[i]].piece !== null)) {
                if (this.cells[valid_points[i]].piece.id !== this.active_piece.id) {
                    return false
                }

            }
            
            }
        return true
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
    
    movePieceSpin (type) {
        let temp_anchor = this.active_piece.anchor;
        let result = [temp_anchor];
        let temp_position = this.active_piece.position;
        if (temp_position === this.active_piece.points.length-1) {
            temp_position = 0;}
        else {
            temp_position++}
        for (let i=0; i<this.active_piece.points[temp_position].length; i++) {
            result.push(sumTwoStrNums(temp_anchor, this.active_piece.points[temp_position][i]))
        }
        if (type === true) {
            this.active_piece.anchor = temp_anchor;
            this.active_piece.position = temp_position;
        }
        return result;
        
    }

    checkAndClearLines () {
        const lines_to_clear = [];
        for (let i = 0; i < 20; i++) {
            let flag = false;
            for (let j = 0; j < 10; j++) {
                if (this.cells[`${j},${i}`].piece === null) {
                    flag = true;
                }

            }
            if (flag === false) {
                lines_to_clear.push(i);
            }
        }
        console.log(lines_to_clear);
        for (let i = 0; i < lines_to_clear.length; i++) {
            for (let j = 0; j < 10; j++) {
                console.log(this.cells[`${j},${lines_to_clear[i]}`]);
                this.cells[`${j},${lines_to_clear[i]}`].setClass('emptyCell');
                this.cells[`${j},${lines_to_clear[i]}`].piece = null;
            }
        }

    }
}



//MAIN CODE//
document.addEventListener('DOMContentLoaded', function () {
    let grid = new Grid(10, 20, '5,3', 'mainGrid', 'emptyCell');
    let next_piece_grid = new Grid(9, 9, '4,4', 'nextPieceGrid', 'NextPieceGridCell');
    let intervals = {
        'main': null,
        'secondary': null
    }
    piece_loader = new PieceLoader(next_piece_grid);
    test_piece = piece_loader.popPiece();
    grid.addPiece(test_piece);
    let update_grid_counter = 0;
    let left = false;
    let right = false;
    let spin = false;
    window.addEventListener("keydown", function(event) {
        if (event.code === "ArrowLeft") {
            left = true;
        } 
        else if (event.code === "ArrowRight"){
            right = true;
        }
        else if (event.code === 'Space') {
            spin = true;
        }
    }, true);

    window.addEventListener("keyup", function(event) {
        if (event.code === "ArrowLeft") {
            left = false;
        } 
        else if (event.code === "ArrowRight"){
            right = false;
        }
        else if (event.code === 'Space') {
            spin = false;;
        }
    }, true);
    

    intervals['main'] = setInterval((grid) => {
        
        //MAIN FUNCTIONS
        if (spin === true) {
            
            if (grid.isValidCoordinates(grid.movePieceSpin(false))) {
                old_points = grid.movePieceStraight('0,0', false);
                new_points = grid.movePieceSpin(true);
                for (let i = 0; i < old_points.length; i++) {
                    grid.cells[old_points[i]].setClass('emptyCell');
                    grid.cells[old_points[i]].piece = null;
                }
                for (let i = 0; i < new_points.length; i++) {
                    grid.cells[new_points[i]].setClass(grid.active_piece.model);
                    grid.cells[new_points[i]].piece = grid.active_piece;
                }
            spin = false;
            }
            
            else {
                spin = false;
            }  
        }
        if ((update_grid_counter === 4) && (grid.active_piece != null)) {
            if (grid.isValidCoordinates(grid.movePieceStraight('0,1', false))) {
                old_points = grid.movePieceStraight('0,0', false);
                new_points = grid.movePieceStraight('0,1', true);
                for (let i = 0; i < old_points.length; i++) {
                    grid.cells[old_points[i]].setClass('emptyCell');
                    grid.cells[old_points[i]].piece = null;
                }
                for (let i = 0; i < new_points.length; i++) {
                    grid.cells[new_points[i]].setClass(grid.active_piece.model);
                    grid.cells[new_points[i]].piece = grid.active_piece;
                }
            }
            else {
                grid.active_piece = null
                grid.checkAndClearLines();
                grid.addPiece(piece_loader.popPiece());
            }   
        }
        if (left === true && right === false) {
            if (grid.isValidCoordinates(grid.movePieceStraight('-1,0', false))) {
                old_points = grid.movePieceStraight('0,0', false);
                new_points = grid.movePieceStraight('-1,0', true);
                for (let i = 0; i < old_points.length; i++) {
                    grid.cells[old_points[i]].setClass('emptyCell');
                    grid.cells[old_points[i]].piece = null;
                }
                for (let i = 0; i < new_points.length; i++) {
                    grid.cells[new_points[i]].setClass(grid.active_piece.model);
                    grid.cells[new_points[i]].piece = grid.active_piece;
                }
                
            }
        }
        else if (left === false && right === true) {
            if (grid.isValidCoordinates(grid.movePieceStraight('1,0', false))) {
                old_points = grid.movePieceStraight('0,0', false);
                new_points = grid.movePieceStraight('1,0', true);
                for (let i = 0; i < old_points.length; i++) {
                    grid.cells[old_points[i]].setClass('emptyCell');
                    grid.cells[old_points[i]].piece = null;
                }
                for (let i = 0; i < new_points.length; i++) {
                    grid.cells[new_points[i]].setClass(grid.active_piece.model);
                    grid.cells[new_points[i]].piece = grid.active_piece;
                }
                
            }
        }
        if (update_grid_counter === 4) {
            update_grid_counter = 0
        }
        else {
            update_grid_counter++
        }
        
    }, 100, grid);
});









